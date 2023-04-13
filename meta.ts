import * as assert from "assert";
import * as fs from "fs/promises";
import * as G from "glob";
import * as path from "path";
import { Project, SourceFile, ts } from "ts-morph";

const verbose = process.argv.includes("--verbose");

const keyMapping: Record<string, keyof Builder.AdditionalCommand> = {
  Command: "commands",
  Commands: "commands",
  Identifier: "identifier",
  Identifiers: "identifier",
  Keys: "keys",
  Keybinding: "keys",
  Keybindings: "keys",
  Title: "title",
};

const valueConverter: Record<
  keyof Builder.AdditionalCommand,
  (x: string) => string
> = {
  commands(commands) {
    return commands
      .replace(/^`+|`+$/g, "")
      .replace(/ +/g, " ")
      .replace(
        /\.{3}(?= })/g,
        () =>
          "-" +
          [...commands.matchAll(/(?<=\+)([a-zA-Z,]+)/g)]
            .map((x) => x[0])
            .join(","),
      )
      .replace(
        /-([a-zA-Z,]*)(?= })/g,
        (_, exclude) =>
          `$exclude: ${
            exclude === "" ? "[]" : JSON.stringify(exclude.split(","))
          }`,
      )
      .replace(
        /\+([a-zA-Z,]+)(?= })/g,
        (_, include) => `$include: ${JSON.stringify(include.split(","))}`,
      )
      .replace(/MAX_INT/g, `${2 ** 31 - 1}`); // Max integer supported in JSON.
  },
  identifier(identifier) {
    return identifier.replace(/^`+|`+$/g, "");
  },
  keys(keys) {
    return keys;
  },
  title(title) {
    return title;
  },
  qualifiedIdentifier(qualifiedIdentifier) {
    return qualifiedIdentifier;
  },
  line() {
    throw new Error("this should not be called");
  },
};

function parseAdditional(
  qualificationPrefix: string,
  text: string,
  textStartLine: number,
) {
  const lines = text.split("\n"),
    additional: Builder.AdditionalCommand[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.length > 2 && line.startsWith("| ") && line.endsWith(" |")) {
      const keys = line
        .slice(2, line.length - 2) // Remove start and end |.
        .split(" | ") // Split into keys.
        .map((k) => keyMapping[k.trim()]); // Normalize keys.

      i++;

      if (/^\|[-| ]+\|$/.test(lines[i])) {
        i++;
      }

      while (i < lines.length) {
        const line = lines[i];

        if (!line.startsWith("| ") || !line.endsWith(" |")) {
          break;
        }

        i++;

        const obj: Builder.AdditionalCommand = { line: textStartLine + i },
          values = line.slice(2, line.length - 2).split(" | ");

        for (let j = 0; j < values.length; j++) {
          const key = keys[j],
            value = valueConverter[key](values[j].trim());

          (obj as Record<string, any>)[key] = value;
        }

        if ("identifier" in obj) {
          obj.qualifiedIdentifier = qualificationPrefix + obj.identifier;
        }

        additional.push(obj);
      }
    }
  }

  return additional;
}

export function trim(str: string, strip: string) {
  let begin = 0;
  while (begin < str.length && strip.includes(str[begin])) {
    begin++;
  }

  let end = str.length;
  while (end > 0 && strip.includes(str[end - 1])) {
    end--;
  }

  return str.slice(begin, end);
}
export function trimLeft(str: string, strip: string) {
  let begin = 0;
  while (begin < str.length && strip.includes(str[begin])) {
    begin++;
  }
  return str.slice(begin);
}
export function trimRight(str: string, strip: string) {
  let end = str.length;
  while (end > 0 && strip.includes(str[end - 1])) {
    end--;
  }
  return str.slice(0, end);
}

/**
 * Parses all the doc comments of functions in the given string of TypeScript
 * code. Examples will be parsed using the given function.
 */
function parseDocComments(rootDir: string, sourceFile: SourceFile) {
  const modulePath = sourceFile.getFilePath();
  let moduleDoc = "",
    moduleDocStartLine = 0,
    moduleName = path.basename(modulePath, ".ts");

  // Module doc comment.
  const modules = sourceFile.getModules();
  if (modules.length > 0) {
    const mod = modules[0];
    const doc = mod.getJsDocs()[0];
    if (doc) {
      moduleName = mod
        .getName()
        .replace(/^["']|["']$/g, "")
        .replace(/^\.\//, "");
      moduleDoc = doc.getInnerText() + "\n";
      moduleDocStartLine = doc.getStartLineNumber();
    }
  }

  if (verbose) {
    console.log("Parsing doc comments in module", moduleName);
  }

  const modulePrefix = moduleName === "misc" ? "" : moduleName + ".",
    functions: Builder.ParsedFunction[] = [];

  for (const f of sourceFile.getFunctions()) {
    const jsDoc = f.getJsDocs()[0];
    if (f.isNamedExport() && jsDoc) {
      if (jsDoc.getTags().some((t) => t.getTagName() === "internal")) {
        continue;
      }

      const name = f.getName()!,
        nameWithDot = name.replace(/_/g, ".");

      let qualifiedName = modulePrefix;

      if (nameWithDot === moduleName) {
        qualifiedName = qualifiedName.replace(/\.$/, "");
      } else {
        qualifiedName += nameWithDot;
      }

      const doc = trim(jsDoc.getDescription(), "\n");

      const endFirstGraph = doc.indexOf("\n\n");
      const summary = trimRight(
        endFirstGraph === -1 ? doc : doc.slice(0, endFirstGraph),
        ".",
      );

      const properties: Record<string, string[]> = {};
      const examples: string[] = [];
      const hasArgs = f.getParameters().length > 0;
      const firstParamNames: string[] = [];
      const parameters: [name: string, type: string][] = f
        .getParameters()
        .map((p, i) => {
          const obp =
            i === 0 &&
            p.getFirstChildByKind(ts.SyntaxKind.ObjectBindingPattern);
          if (obp) {
            const bindingProps = obp.getChildrenOfKind(
              ts.SyntaxKind.BindingElement,
            );
            const names: string[] = [];
            bindingProps.forEach((node) => {
              const name = node
                .getFirstChildByKind(ts.SyntaxKind.Identifier)
                ?.getText();
              if (name) {
                names.push(name);
              }
            });
            firstParamNames.push(...names);
          }
          // const type = p.getType();
          // const defaultTypeStr =
          //   type.getSymbol()?.getName() ||
          //   type.getAliasSymbol()?.getName() ||
          //   type.getText();
          let typeStr = "";
          const typeNode = p.getTypeNode();
          if (typeNode) {
            typeStr = typeNode.getText();
          }
          if (p.isOptional()) {
            typeStr += " | undefined";
          }
          if (typeStr.startsWith("import(")) {
            console.error(
              `${moduleName} function ${name}, parameter ${i} has import type: ${typeStr}`,
            );
          }
          if (!typeStr) {
            console.error(
              `typeStr is empty for ${moduleName} function ${name}, parameter ${i}`,
            );
          }
          return [p.getName(), typeStr.replace(/\n */g, "")];
        });
      const additional: Builder.AdditionalCommand[] = [];
      jsDoc
        .getTags()
        .reverse()
        .forEach((tag) => {
          const name = tag.getTagName();
          if (!(name in properties)) {
            properties[name] = [];
          }
          let text = tag.getCommentText() ?? "";

          if (name === "keys") {
            text = trim(text, " \n");
          }

          if (name === "commands" && text) {
            additional.push(
              ...parseAdditional(modulePrefix, text, tag.getStartLineNumber()),
            );
          } else if (name === "example") {
            examples.push(trim(text, " \n") + "\n");
          } else {
            properties[name].push(text);
          }
        });

      functions.push({
        name,
        nameWithDot,
        qualifiedName,
        line: f.getStartLineNumber(),
        hasArgs,
        parameters,
        firstParamNames,
        summary,
        examples,
        properties,
        doc,
        additional,
      });
    }
  }

  return {
    path: path
      .relative(path.dirname(__dirname), modulePath)
      .replace(/\\/g, "/"),
    name: moduleName,
    doc: moduleDoc,

    additional: parseAdditional(modulePrefix, moduleDoc, moduleDocStartLine),

    functions,
    functionNames: [...new Set(functions.map((f) => f.name))],

    get commands() {
      return getCommands(this);
    },
    get keybindings() {
      return getKeybindings(this);
    },
  } as Builder.ParsedModule;
}
/**
 * Mapping from character to corresponding VS Code keybinding.
 */
export const specialCharacterMapping = {
  "~": "s-`",
  "!": "s-1",
  "@": "s-2",
  "#": "s-3",
  $: "s-4",
  "%": "s-5",
  "^": "s-6",
  "&": "s-7",
  "*": "s-8",
  "(": "s-9",
  ")": "s-0",
  _: "s--",
  "+": "s-=",
  "{": "s-[",
  "}": "s-]",
  "|": "s-\\",
  ":": "s-;",
  '"': "s-'",
  "<": "s-,",
  ">": "s-.",
  "?": "s-/",
};

/**
 * RegExp for keys of `specialCharacterMapping`.
 */
export const specialCharacterRegExp = /[~!@#$%^&*()+{}|:"<>?]|(?<!NumPad)_/g;

/**
 * Async wrapper around the `glob` package.
 */
export function glob(
  pattern: string,
  options: { ignore?: string; cwd: string },
) {
  return new Promise<string[]>((resolve, reject) => {
    G(pattern, options, (err, matches) =>
      err ? reject(err) : resolve(matches),
    );
  });
}

/**
 * A class used in .build.ts files.
 */
export class Builder {
  private _apiModules?: Builder.ParsedModule[];
  private _commandModules?: Builder.ParsedModule[];
  private _beingBuilt = new Map<string, Promise<void>>();
  private rootDir = __dirname;
  private _project = new Project({
    tsConfigFilePath: path.join(__dirname, "tsconfig.json"),
    // skipFileDependencyResolution: true,
  });

  /**
   * Returns all modules for API files.
   */
  public getApiModules() {
    if (this._apiModules !== undefined) {
      return this._apiModules;
    }

    const sourceFiles = this._project.getSourceFiles([
        "src/api/**/*.ts",
        "!src/api/**/*.build.ts",
      ]),
      apiModules = sourceFiles.map((s) => parseDocComments(this.rootDir, s));

    return (this._apiModules = apiModules.sort((a, b) =>
      a.name.localeCompare(b.name),
    ));
  }

  /**
   * Returns all modules for command files.
   */
  public getCommandModules() {
    if (this._commandModules !== undefined) {
      return this._commandModules;
    }
    const commandsGlobs = [
        `src/commands/**/*.ts`,
        `!src/commands/**/*.build.ts`,
      ],
      commandModules = this._project
        .getSourceFiles(commandsGlobs)
        .map((s) => parseDocComments(this.rootDir, s))
        .filter((m) => m.doc.length > 0);

    return (this._commandModules = commandModules.sort((a, b) =>
      a.name.localeCompare(b.name),
    ));
  }

  /**
   * Waits until the given files have been processed.
   */
  public async waitFor(...files: readonly `${string}.build.ts`[]) {
    await Promise.all(
      files.map(async (file) => {
        await this._beingBuilt.get(path.resolve(file));
      }),
    );
  }

  /**
   * Updates all the given .build.ts files in parallel.
   */
  public async buildFiles(
    filesToBuild: readonly string[],
    onError: (e: unknown) => void,
  ) {
    await Promise.all(
      filesToBuild.map(async (fileToBuild) => {
        const absolutePath = path.resolve(fileToBuild),
          promise = this._buildFile(fileToBuild).finally(() =>
            this._beingBuilt.delete(absolutePath),
          );
        this._beingBuilt.set(absolutePath, promise);

        await promise.catch(onError);
      }),
    );
  }

  /**
   * Updates a .build.ts file.
   */
  private async _buildFile(fileName: string) {
    const relativeName = path.relative(__dirname, fileName),
      relativeNameWithoutBuild = relativeName.replace(/build\.ts$/, ""),
      modulePath = `./${relativeNameWithoutBuild}build`;

    // Clear module cache if any.
    delete require.cache[require.resolve(modulePath)];

    const module: {
        build(builder: Builder): Promise<string> | string;
      } = require(modulePath),
      generatedContent = await module.build(this);

    if (typeof generatedContent === "string") {
      // Write result of `build` to the first file we find that has the same name
      // as the build.ts file, but with any extension.
      const prefix = path.basename(relativeNameWithoutBuild),
        outputName = (await fs.readdir(path.dirname(fileName))).find(
          (path) => path.startsWith(prefix) && !path.endsWith(".build.ts"),
        )!,
        outputPath = path.join(path.dirname(fileName), outputName),
        outputContent = await fs.readFile(outputPath, "utf-8"),
        outputContentHeader =
          /^(?:[\s\S]+?\n)?.+Content below this line was auto-generated.+\n/m.exec(
            outputContent,
          )![0];

      await fs.writeFile(
        outputPath,
        outputContentHeader + generatedContent,
        "utf-8",
      );
    }
  }
}

export declare namespace Builder {
  export interface ParsedFunction {
    readonly name: string;
    readonly nameWithDot: string;
    readonly qualifiedName: string;

    readonly line: number;

    readonly doc: string;
    readonly properties: Record<string, string[]>;
    readonly summary: string;
    readonly examples: string[];
    readonly additional: AdditionalCommand[];

    readonly hasArgs: boolean;
    readonly parameters: readonly [name: string, type: string][];
    readonly firstParamNames: readonly string[];
  }

  export interface AdditionalCommand {
    title?: string;
    identifier?: string;
    qualifiedIdentifier?: string;
    keys?: string;
    commands?: string;
    line: number;
  }

  export interface ParsedModule {
    readonly path: string;
    readonly name: string;
    readonly doc: string;

    readonly additional: readonly AdditionalCommand[];
    readonly functions: readonly ParsedFunction[];
    readonly functionNames: readonly string[];

    readonly commands: {
      readonly id: string;
      readonly title: string;
      readonly when?: string;
    }[];

    readonly keybindings: {
      readonly title?: string;
      readonly key: string;
      readonly when: string;
      readonly command: string;
      readonly args?: any;
    }[];
  }
}

/**
 * Parses the short "`s-a-b` (category: mode)"-like syntax for defining
 * keybindings into a format compatible with VS Code keybindings.
 */
export function parseKeys(keys: string) {
  if (keys.length === 0) {
    return [];
  }
  if (verbose) {
    console.log(`Parsing keys: ${keys}`);
  }
  return keys
    .replace(/[\n]/g, ", ")
    .split(/ *, (?=`)/g)
    .map((keyString) => {
      const [, , rawKeybinding, rawMetadata] = /^(`+)(.+?)\1 \((.+?)\)$/.exec(
          keyString,
        )!,
        keybinding = rawKeybinding
          .trim()
          .replace(
            specialCharacterRegExp,
            (m) => (specialCharacterMapping as Record<string, string>)[m],
          ),
        [, category, tags] = /(\w+): (.+)/.exec(rawMetadata)!;

      // Reorder to match Ctrl+Shift+Alt+_
      let key = "";

      if (keybinding.includes("c-")) {
        key += "Ctrl+";
      }

      if (keybinding.includes("s-")) {
        key += "Shift+";
      }

      if (keybinding.includes("a-")) {
        key += "Alt+";
      }

      const remainingKeybinding = keybinding.replace(/[csa]-/g, ""),
        whenClauses = ["editorTextFocus"];

      for (let tag of tags.split(", ")) {
        const negate = tag.startsWith("!");
        if (negate) {
          tag = tag.slice(1);
        }
        switch (tag) {
          case "normal":
          case "insert":
          case "select":
          case "input":
            whenClauses.push(`dance.mode ${negate ? "!=" : "=="} '${tag}'`);
            break;

          case "recording":
            whenClauses.push(`${negate ? "!" : ""}dance.isRecording`);
            break;

          case "prompt":
            assert(!negate);
            whenClauses.splice(whenClauses.indexOf("editorTextFocus"), 1);
            whenClauses.push("inputFocus && !textInputFocus");
            break;

          default: {
            const match = /^"(!?\w+)"$/.exec(tag);

            if (match === null) {
              throw new Error("unknown keybinding tag " + tag);
            }

            whenClauses.push((negate ? "!" : "") + match[1]);
            break;
          }
        }
      }

      key +=
        remainingKeybinding[0].toUpperCase() + remainingKeybinding.slice(1);

      return {
        category,
        key,
        when: whenClauses.join(" && "),
      };
    });
}

/**
 * Returns all defined commands in the given module.
 */
function getCommands(module: Omit<Builder.ParsedModule, "commands">) {
  // TODO: improve conditions
  return [
    ...module.functions.map((f) => ({
      id: `dance.${f.qualifiedName}`,
      title: f.summary,
      when: "dance.mode == 'normal'",
    })),
    ...module.additional
      .concat(...module.functions.flatMap((f) => f.additional))
      .filter((a) => a.identifier !== undefined && a.title !== undefined)
      .map((a) => ({
        id: `dance.${a.qualifiedIdentifier}`,
        title: a.title!,
        when: "dance.mode == 'normal'",
      })),
  ].sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Returns all defined keybindings in the given module.
 */
function getKeybindings(module: Omit<Builder.ParsedModule, "keybindings">) {
  return [
    ...module.functions.flatMap((f) =>
      (f.properties["keys"] ?? []).flatMap((keys) =>
        parseKeys(keys).map((key) => ({
          key: key.key,
          when: key.when,
          title: f.summary,
          command: `dance.${f.qualifiedName}`,
        })),
      ),
    ),

    ...module.additional
      .concat(...module.functions.flatMap((f) => f.additional))
      .flatMap(({ title, keys, commands, qualifiedIdentifier }) => {
        const parsedKeys = parseKeys(keys ?? "");

        if (qualifiedIdentifier !== undefined) {
          return parsedKeys.map((key) => ({
            key: key.key,
            when: key.when,
            title,
            command: `dance.${qualifiedIdentifier}`,
          }));
        }

        const parsedCommands = JSON.parse(
          "[" + commands!.replace(/([$\w]+):/g, '"$1":') + "]",
        ) as any[];

        if (parsedCommands.length === 1) {
          let [command]: [string] = parsedCommands[0];

          if (command[0] === ".") {
            command = "dance" + command;
          }

          return parsedKeys.map((key) => ({
            key: key.key,
            when: key.when,
            title,
            command,
            args: parsedCommands[0][1],
          }));
        }

        return parsedKeys.map((key) => ({
          key: key.key,
          when: key.when,
          title,
          command: "dance.run",
          args: {
            commands: parsedCommands,
          },
        }));
      }),
  ].sort((a, b) => a.command.localeCompare(b.command));
}

/**
 * Given a multiline string, returns the same string with all lines starting
 * with an indentation `>= by` reduced by `by` spaces.
 */
export function unindent(by: number): {
  (strings: TemplateStringsArray, ...args: any[]): string;
} {
  const re = new RegExp(`^ {${by}}`, "gm");

  return (strings: TemplateStringsArray, ...args: any[]) => {
    const unindented = strings.map((s) => s.replace(re, ""));

    return String.raw(
      Object.assign(unindented, { raw: unindented }),
      ...args,
    ).replace(/^ +$/gm, "");
  };
}

/**
 * The main entry point of the script.
 */
async function main() {
  let success = true;

  const ensureUpToDate = process.argv.includes("--ensure-up-to-date"),
    check = process.argv.includes("--check"),
    buildIndex = process.argv.indexOf("--build"),
    build = buildIndex === -1 ? "**/*.build.ts" : process.argv[buildIndex + 1];

  const contentsBefore: string[] = [],
    fileNames = [
      `${__dirname}/package.json`,
      `${__dirname}/src/commands/README.md`,
      `${__dirname}/src/commands/index.ts`,
    ];

  if (ensureUpToDate) {
    contentsBefore.push(
      ...(await Promise.all(
        fileNames.map((name) => fs.readFile(name, "utf-8")),
      )),
    );
  }

  const filesToBuild = await glob(build, { cwd: __dirname }),
    builder = new Builder(),
    buildErrors: unknown[] = [];

  await builder.buildFiles(filesToBuild, (e) => buildErrors.push(e));

  if (buildErrors.length > 0) {
    console.error(buildErrors);
  }

  if (ensureUpToDate) {
    const contentsAfter = await Promise.all(
      fileNames.map((name) => fs.readFile(name, "utf-8")),
    );

    for (let i = 0; i < fileNames.length; i++) {
      if (verbose) {
        console.log("Checking file", fileNames[i], "for diffs...");
      }

      // The built-in "assert" module displays a multiline diff if the strings
      // are different, so we use it instead of comparing manually.
      assert.strictEqual(contentsBefore[i], contentsAfter[i]);
    }
  }

  if (check) {
    const filesToCheck = await glob("src/commands/**/*.ts", {
        cwd: __dirname,
        ignore: "**/*.build.ts",
      }),
      contentsToCheck = await Promise.all(
        filesToCheck.map((f) => fs.readFile(f, "utf-8")),
      );

    for (let i = 0; i < filesToCheck.length; i++) {
      const fileToCheck = filesToCheck[i],
        contentToCheck = contentsToCheck[i];

      if (contentToCheck.includes("editor.selections")) {
        console.error(
          "File",
          fileToCheck,
          "includes forbidden access to editor.selections.",
        );
        success = false;
      }

      if (/^(export )?namespace/m.test(contentToCheck)) {
        console.error(
          "File",
          fileToCheck,
          "includes a non-`declare` namespace.",
        );
        success = false;
      }
    }
  }

  return success;
}

if (require.main === module) {
  main().then(async (success) => {
    if (!process.argv.includes("--watch")) {
      process.exit(success ? 0 : 1);
    }

    const chokidar = await import("chokidar");
    const watcher = chokidar.watch(
      [
        "**/*.build.ts",
        "src/api/*.ts",
        "src/commands/*.ts",
        "test/suite/commands/*.md",
      ],
      {
        ignored: "src/commands/load-all.ts",
      },
    );

    let isGenerating = false;

    watcher.on("change", async (path) => {
      if (isGenerating) {
        return;
      }

      console.log(
        "Change detected at " + path + ", updating generated files...",
      );
      isGenerating = true;

      try {
        await main();
      } finally {
        isGenerating = false;
      }
    });
  });
}
