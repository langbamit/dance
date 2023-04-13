import type { Builder } from "./meta";

// Shared values
// ============================================================================

const commandType = {
  type: "array",
  items: {
    type: ["array", "object", "string"],
    properties: {
      command: {
        type: "string",
      },
      args: {},
    },
    required: ["command"],
  },
};

const builtinModesAreDeprecatedMessage =
  "Built-in modes are deprecated. Use `#dance.modes#` instead.";

const modeNamePattern = {
  pattern: /^[a-zA-Z]\w*$/.source,
  patternErrorMessage: "",
};

const colorPattern = {
  pattern:
    /^(#[a-fA-F0-9]{3}|#[a-fA-F0-9]{6}|#[a-fA-F0-9]{8}|\$([a-zA-Z]+(\.[a-zA-Z]+)+))$/
      .source,
  patternErrorMessage:
    "Color should be an hex color or a '$' sign followed by a color identifier.",
};

const selectionDecorationType = {
  type: "object",
  properties: {
    applyTo: {
      enum: ["all", "main", "secondary"],
      default: "all",
      description: "The selections to apply this style to.",
      enumDescriptions: [
        "Apply to all selections.",
        "Apply to main selection only.",
        "Apply to all selections except main selection.",
      ],
    },
    backgroundColor: {
      type: "string",
      ...colorPattern,
    },
    borderColor: {
      type: "string",
      ...colorPattern,
    },
    borderStyle: {
      type: "string",
    },
    borderWidth: {
      type: "string",
    },
    borderRadius: {
      type: "string",
    },
    isWholeLine: {
      type: "boolean",
      default: false,
    },
    after: {
      type: "object",
    },
    before: {
      type: "object",
    },
  },
};

// Package information
// ============================================================================

const version = "0.0.1",
  preRelease = 8;

export const pkg = (modules: Builder.ParsedModule[]) => ({
  // Common package.json properties.
  // ==========================================================================

  name: "ballet",
  description:
    "Helix-inspired key bindings - Modified version of Dance Extension",
  version,
  license: "ISC",

  author: {
    name: "Uther Pally",
    email: "langbamit@gmail.com",
  },

  repository: {
    type: "git",
    url: "https://github.com/utherpally/dance.git",
  },

  main: "./out/src/extension.js",
  browser: "./out/web/extension.js",

  engines: {
    vscode: "^1.63.0",
  },

  scripts: {
    check:
      "eslint . && depcruise -v .dependency-cruiser.js src && prettier . --check",
    lint: "eslint . --fix",
    fmt: "prettier --write .",
    generate: "ts-node ./meta.ts",
    "generate:watch": "ts-node ./meta.ts --watch",
    "vscode:prepublish":
      "yarn run generate && yarn run compile && yarn run compile-web",
    compile: "tsc -p ./",
    "compile:watch": "tsc -watch -p ./",
    "compile-web":
      "webpack --mode production --devtool hidden-source-map --config ./webpack.web.config.js",
    "compile-web:watch": "webpack --watch --config ./webpack.web.config.js",
    test: "yarn run compile && node ./out/test/run.js",
    package: "vsce package --allow-star-activation",
    publish: "vsce publish --allow-star-activation",
    "publish:pre": `vsce publish --allow-star-activation --pre-release --no-git-tag-version --no-update-package-json ${version.replace(
      /\d+$/,
      "$&" + preRelease.toString().padStart(3, "0"),
    )}`,
  },

  devDependencies: {
    "@types/glob": "^7.2.0",
    "@types/mocha": "^9.1.1",
    "@types/node": "^17.0.33",
    "@types/vscode": "^1.63.0",
    "@typescript-eslint/eslint-plugin": "^5.57.1",
    "@typescript-eslint/parser": "^5.57.1",
    "eslint-config-prettier": "^8.8.0",
    prettier: "^2.8.7",
    "@vscode/test-electron": "^2.1.3",
    chokidar: "^3.5.3",
    "dependency-cruiser": "^11.7.0",
    eslint: "^8.37.0",
    glob: "^8.0.3",
    mocha: "^10.0.0",
    "source-map-support": "^0.5.21",
    "ts-loader": "^9.4.2",
    "ts-node": "^10.9.1",
    "ts-morph": "^18.0.0",
    typescript: "^5.0.3",
    unexpected: "^13.1.0",
    "@vscode/vsce": "^2.18.0",
    webpack: "^5.78.0",
    "webpack-cli": "^5.0.1",
    "deep-diff": "^1.0.2",
    yaml: "^2.2.1",
    "magic-string": "^0.30.0",
  },

  // VS Code-specific properties.
  // ==========================================================================

  displayName: "Ballet",
  publisher: "langbamit",
  categories: ["Keymaps", "Other"],
  readme: "README.md",
  icon: "assets/ballet.jpg",

  activationEvents: ["*"],
  extensionKind: ["ui", "workspace"],

  // Dance-specific properties.
  // ==========================================================================

  // The two properties below can be set when distributing Dance to ensure it
  // cannot execute arbitrary code (with `dance.run`) or system commands (with
  // `dance.selections.{filter,pipe}`).
  "dance.disableArbitraryCodeExecution": false,
  "dance.disableArbitraryCommandExecution": false,

  // Capabilities.
  // ==========================================================================

  capabilities: {
    untrustedWorkspaces: {
      supported: "limited",
      description:
        "Existing menu items and mode commands can only be updated if the current workspace is " +
        "trusted in order to ensure untrusted workspaces do not execute malicious commands.",
    },
    virtualWorkspaces: true,
  },

  contributes: {
    // Configuration.
    // ========================================================================

    configuration: {
      type: "object",
      title: "Ballet",
      properties: {
        "dance.defaultMode": {
          type: "string",
          scope: "language-overridable",
          default: "normal",
          description:
            "Controls which mode is set by default when an editor is opened.",
          ...modeNamePattern,
        },
        "dance.modes": {
          type: "object",
          scope: "language-overridable",
          additionalProperties: {
            type: "object",
            propertyNames: modeNamePattern,
            properties: {
              inheritFrom: {
                type: ["string", "null"],
                description:
                  "Controls how default configuration options are obtained for this mode. " +
                  "Specify a string to inherit from the mode with the given name, " +
                  "and null to inherit from the VS Code configuration.",
                ...modeNamePattern,
              },
              cursorStyle: {
                enum: [
                  "line",
                  "block",
                  "underline",
                  "line-thin",
                  "block-outline",
                  "underline-thin",
                  "inherit",
                  null,
                ],
                description: "Controls the cursor style.",
              },
              lineHighlight: {
                type: ["string", "null"],
                markdownDescription:
                  "Controls the line highlighting applied to active lines. " +
                  "Can be an hex color, a [theme color](" +
                  "https://code.visualstudio.com/api/references/theme-color) or null.",
                deprecationMessage:
                  "`lineHighlight` is deprecated. Use `dance.modes.*.backgroundColor` instead.",
                markdownDeprecationMessage:
                  "`lineHighlight` is deprecated. Use `#dance.modes#.*.backgroundColor` instead.",
                ...colorPattern,
              },
              lineNumbers: {
                enum: ["off", "on", "relative", "inherit", null],
                description: "Controls the display of line numbers.",
                enumDescriptions: [
                  "No line numbers.",
                  "Absolute line numbers.",
                  "Relative line numbers.",
                  "Inherit from `editor.lineNumbers`.",
                ],
              },
              onEnterMode: {
                ...commandType,
                description:
                  "Controls what commands should be executed upon entering this mode.",
              },
              onLeaveMode: {
                ...commandType,
                description:
                  "Controls what commands should be executed upon leaving this mode.",
              },
              selectionBehavior: {
                enum: ["caret", "character", null],
                default: "caret",
                description: "Controls how selections behave within VS Code.",
                markdownEnumDescriptions: [
                  "Selections are anchored to carets, which is the native VS Code behavior; " +
                    "that is, they are positioned *between* characters and can therefore be " +
                    "empty.",
                  "Selections are anchored to characters, like Kakoune; that is, they are " +
                    "positioned *on* characters, and therefore cannot be empty. " +
                    "Additionally, one-character selections will behave as if they were " +
                    "non-directional, like Kakoune.",
                ],
              },
              decorations: {
                ...selectionDecorationType,
                type: ["array", "object", "null"],
                description: "The decorations to apply to selections.",
                items: selectionDecorationType,
              },
              hiddenSelectionsIndicatorsDecoration: {
                ...selectionDecorationType,
                type: ["object", "null"],
                description:
                  "The decorations to apply to the hidden selections indicator, shown when " +
                  "some selections are below or above the lines currently shown in the editor. " +
                  "Specify an empty object {} to disable this indicator.",
              },
            },
            additionalProperties: false,
          },
          default: {
            "": {
              hiddenSelectionsIndicatorsDecoration: {
                after: {
                  color: "$list.warningForeground",
                },
                backgroundColor: "$inputValidation.warningBackground",
                borderColor: "$inputValidation.warningBorder",
                borderStyle: "solid",
                borderWidth: "1px",
                isWholeLine: true,
              },
            },
            input: {
              cursorStyle: "underline-thin",
            },
            insert: {
              onLeaveMode: [
                [
                  ".selections.save",
                  {
                    register: " insert",
                  },
                ],
              ],
            },
            normal: {
              lineNumbers: "relative",
              cursorStyle: "block",
              selectionBehavior: "character",
              // decorations: {
              //   applyTo: "main",
              //   backgroundColor: "$editor.hoverHighlightBackground",
              //   isWholeLine: true,
              // },
              onEnterMode: [
                [".selections.restore", { register: " ^", try: true }],
              ],
              onLeaveMode: [
                [
                  ".selections.save",
                  {
                    register: " ^",
                    style: {
                      borderColor: "$editor.selectionBackground",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderRadius: "1px",
                    },
                    until: [
                      ["mode-did-change", { include: "normal" }],
                      ["mode-did-change", { include: "select" }],
                      ["selections-did-change"],
                    ],
                  },
                ],
              ],
            },
            select: {
              lineNumbers: "relative",
              cursorStyle: "underline",
              selectionBehavior: "character",
              // decorations: {
              //   applyTo: "main",
              //   backgroundColor: "$merge.incomingContentBackground",
              //   isWholeLine: true,
              // },
              onEnterMode: [
                [".selections.restore", { register: " ^", try: true }],
              ],
              onLeaveMode: [
                [
                  ".selections.save",
                  {
                    register: " ^",
                    style: {
                      borderColor: "$editor.selectionBackground",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderRadius: "1px",
                    },
                    until: [
                      ["mode-did-change", { include: "normal" }],
                      ["mode-did-change", { include: "select" }],
                      ["selections-did-change"],
                    ],
                  },
                ],
              ],
            },
          },
          description: "Controls the different modes available in Dance.",
        },

        "dance.menus": {
          type: "object",
          scope: "language-overridable",
          description: "Controls the different menus available in Dance.",
          additionalProperties: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              items: {
                type: "object",
                additionalProperties: {
                  type: "object",
                  properties: {
                    text: {
                      type: "string",
                      description: "Text shown in the menu.",
                    },
                    command: {
                      type: "string",
                      description: "Command to execute on item selection.",
                    },
                    args: {
                      type: "array",
                      description: "Arguments to the command to execute.",
                    },
                  },
                  required: ["command"],
                },
              },
            },
            additionalProperties: false,
          },
          default: {
            "left-bracket": {
              title: "Left Bracket Menu",
              items: {
                d: {
                  text: "Goto previous diagnostic",
                  command: "editor.action.marker.prev",
                },
                g: {
                  text: "Goto previous change",
                  command: "workbench.action.editor.previousChange",
                },
                s: {
                  text: "Goto previous symbol",
                  command: "dance.run",
                  args: [
                    {
                      commands: ["breadcrumbs.focusAndSelect"],
                    },
                  ],
                },
              },
            },
            "right-bracket": {
              title: "Right Bracket Menu",
              items: {
                d: {
                  text: "Goto next diagnostic",
                  command: "editor.action.marker.next",
                },
                g: {
                  text: "Goto next change",
                  command: "workbench.action.editor.nextChange",
                },
              },
            },
            object: {
              title: "Select object...",
              items: ((command = "dance.seek.object") => ({
                "b()": {
                  command,
                  args: [{ input: "\\((?#inner)\\)" }],
                  text: "parenthesis block",
                },
                "B{}": {
                  command,
                  args: [{ input: "\\{(?#inner)\\}" }],
                  text: "braces block",
                },
                "r[]": {
                  command,
                  args: [{ input: "\\[(?#inner)\\]" }],
                  text: "brackets block",
                },
                "a<>": {
                  command,
                  args: [{ input: "<(?#inner)>" }],
                  text: "angle block",
                },
                'Q"': {
                  command,
                  args: [{ input: '(?#noescape)"(?#inner)(?#noescape)"' }],
                  text: "double quote string",
                },
                "q'": {
                  command,
                  args: [{ input: "(?#noescape)'(?#inner)(?#noescape)'" }],
                  text: "single quote string",
                },
                "g`": {
                  command,
                  args: [{ input: "(?#noescape)`(?#inner)(?#noescape)`" }],
                  text: "grave quote string",
                },
                w: {
                  command,
                  args: [{ input: "[\\p{L}_\\d]+(?<after>[^\\S\\n]+)" }],
                  text: "word",
                },
                W: {
                  command,
                  args: [{ input: "[\\S]+(?<after>[^\\S\\n]+)" }],
                  text: "WORD",
                },
                s: {
                  command,
                  args: [{ input: "(?#predefined=sentence)" }],
                  text: "sentence",
                },
                p: {
                  command,
                  args: [{ input: "(?#predefined=paragraph)" }],
                  text: "paragraph",
                },
                " ": {
                  command,
                  args: [
                    { input: "(?<before>[\\s]+)[^\\S\\n]+(?<after>[\\s]+)" },
                  ],
                  text: "whitespaces",
                },
                i: {
                  command,
                  args: [{ input: "(?#predefined=indent)" }],
                  text: "indent",
                },
                n: {
                  command,
                  args: [
                    { input: "(?#singleline)-?[\\d_]+(\\.[0-9]+)?([eE]\\d+)?" },
                  ],
                  text: "number",
                },
                u: {
                  command,
                  args: [{ input: "(?#predefined=argument)" }],
                  text: "argument",
                },
                c: {
                  command,
                  text: "custom object desc",
                },
              }))(),
            },

            "file-explorer": {
              title: "File explorer",
              items: {
                y: { text: "Yank file", command: "filesExplorer.copy" },
                p: { text: "Paste file", command: "filesExplorer.paste" },
                c: { text: "Rename file", command: "renameFile" },
                d: { text: "Delete file", command: "moveFileToTrash" },
                x: { text: "Cut file", command: "filesExplorer.cut" },
                r: {
                  text: "Reveal in file explorer",
                  command: "revealFileInOS",
                },
                o: { text: "Open with...", command: "explorer.openWith" },
                O: { text: "Open", command: "explorer.openAndPassFocus" },
                v: {
                  text: "View",
                  command: "filesExplorer.openFilePreserveFocus",
                },
                f: { text: "Copy file path", command: "copyFilePath" },
                F: {
                  text: "Copy relative file path",
                  command: "copyRelativeFilePath",
                },
                n: { text: "New folder", command: "explorer.newFile" },
                N: { text: "New file", command: "explorer.newFolder" },
              },
            },
            goto: {
              title: "Go...",
              items: {
                g: {
                  text: "Goto first line",
                  command: "dance.select.lineStart",
                  args: [{ count: 1 }],
                },
                e: {
                  text: "Goto last line",
                  command: "dance.select.lastLine",
                },
                E: {
                  text: "Goto last char of last line",
                  command: "dance.select.lineEnd",
                  args: [{ count: 2 ** 31 - 1 }],
                },
                h: {
                  text: "Goto line start",
                  command: "dance.select.lineStart",
                },
                l: {
                  text: "Goto line end",
                  command: "dance.select.lineEnd",
                },
                s: {
                  text: "Goto first non-blank in line",
                  command: "dance.select.lineStart",
                  args: [{ skipBlank: true }],
                },
                d: {
                  text: "Goto definition",
                  command: "editor.action.revealDefinition",
                },
                // "D": {
                //   text: "Goto declaration",
                //   command: "",
                // },
                y: {
                  text: "Goto type definition",
                  command: "editor.action.goToTypeDefinition",
                },
                r: {
                  text: "Goto reference",
                  command: "editor.action.goToReferences",
                },
                i: {
                  text: "Goto implementation",
                  command: "editor.action.goToImplementation",
                },
                t: {
                  text: "Goto first displayed line",
                  command: "dance.select.firstVisibleLine",
                },
                c: {
                  text: "Goto middle displayed line",
                  command: "dance.select.middleVisibleLine",
                },
                b: {
                  text: "Goto last displayed line",
                  command: "dance.select.lastVisibleLine",
                },
                a: {
                  text: "Goto last accessed file",
                  command:
                    "workbench.action.openPreviousRecentlyUsedEditorInGroup",
                },
                A: {
                  text: "Goto last accessed files",
                  command:
                    "workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup",
                },
                // "m": {
                //   text: "Goto last modified file",
                // },
                p: {
                  text: "Goto previous buffer",
                  command: "workbench.action.previousEditor",
                },
                n: {
                  text: "Goto next buffer",
                  command: "workbench.action.nextEditor",
                },
                f: {
                  text: "Goto file whose name is selected",
                  command: "dance.selections.open",
                },
                ".": {
                  text: "Goto last buffer modification position",
                  command: "dance.selections.restore",
                  args: [{ register: " insert" }],
                },
              },
            },
            match: {
              title: "Select match...",
              items: {
                m: {
                  text: "Goto matching bracket",
                  command: "editor.action.jumpToBracket",
                },
                p: {
                  text: "Goto next matching bracket",
                  command: "dance.seek.enclosing",
                  args: [{ direction: -1 }],
                },
                n: {
                  text: "Goto previous matching bracket",
                  command: "dance.seek.enclosing",
                },
                // s: {
                //   text: "Surround add",
                //   command,
                //   args: [{ surround: "()" }],
                // },
                // r: {
                //   text: "Surround replace",
                //   command,
                // },
                d: {
                  text: "Surround delete",
                  command: "editor.action.removeBrackets",
                },
                a: {
                  text: "Select around object",
                  command: "dance.seek.askObject",
                },
                i: {
                  text: "Select inside object",
                  command: "dance.seek.askObject.inner",
                },
              },
            },

            space: {
              title: "Space",
              items: {
                f: {
                  text: "Open file picker",
                  command: "workbench.action.quickOpen",
                },
                // "F": {
                //   text: "Open file picker at current working directory?",
                //   command: "",
                // },
                b: {
                  text: "Open buffer picker",
                  command: "workbench.action.showAllEditors",
                },
                // "s": {
                //   text: "Open symbol picker",
                //   command: "workbench.action.gotoSymbol",
                // },
                // "S": {
                //   text: "Global symbol picker",
                //   command: "Currently not possible?",
                // },
                d: {
                  text: "Toggle diagnostics(problems) ",
                  command: "workbench.actions.view.problems",
                },
                a: {
                  text: "Perform code action",
                  command: "editor.action.quickFix",
                },
                // "'": {
                //   text: "Open last picker",
                //   command: "Currently not possible/necessary?",
                // },
                g: {
                  text: "Start debug",
                  command: "workbench.action.debug.start",
                },
                w: {
                  text: "Window",
                  command: "dance.window.open",
                },
                y: {
                  text: "Join and yank selections to clipboard",
                  command: "dance.selections.saveText",
                  args: [
                    {
                      register: "",
                    },
                  ],
                },
                // "Y": {
                //   text: "Yank main selection to clipboard",
                //   command: "dance.selections.saveText",
                // },
                p: {
                  text: "Paste clipboard after selections",
                  command: "dance.edit.insert",
                  args: [
                    {
                      handleNewLine: true,
                      where: "end",
                    },
                  ],
                },
                // There is a zero width space (U+200B) behind the P.
                // This is a dirty hack. Otherwise vscode will think its the same as lowecase p
                // Any other symbol would also work, but this one is invisible
                "P​": {
                  text: "Paste clipboard before selections",
                  command: "dance.edit.insert",
                  args: [
                    {
                      handleNewLine: true,
                      where: "start",
                    },
                  ],
                },
                "/": {
                  text: "Global Search in workspace folder",
                  command: "workbench.action.findInFiles",
                },
                k: {
                  text: "Show docs for item under cursor (hover)",
                  command: "editor.action.showHover",
                },
                r: {
                  text: "Rename symbol",
                  command: "editor.action.rename",
                },
              },
            },
            view: {
              title: "View",
              items: {
                // AFAIK, we can't implement these yet since VS Code only
                // exposes vertical view ranges:
                // - m, center cursor horizontally
                // - h, scroll left
                // - l, scroll right
                zc: {
                  text: "Align view center",
                  command: "dance.view.line",
                  args: [{ at: "center" }],
                },
                t: {
                  text: "Align view top",
                  command: "dance.view.line",
                  args: [{ at: "top" }],
                },
                b: {
                  text: "Align view bottom",
                  command: "dance.view.line",
                  args: [{ at: "bottom" }],
                },
                j: {
                  text: "Scroll view down",
                  command: "editorScroll",
                  args: [{ to: "down", by: "line", revealCursor: true }],
                },
                k: {
                  text: "Scroll view up",
                  command: "editorScroll",
                  args: [{ to: "up", by: "line", revealCursor: true }],
                },
              },
            },
            window: {
              title: "Window",
              items: {
                w: {
                  text: "Goto next window",
                  command: "workbench.action.nextEditor",
                },
                s: {
                  text: "Horizontal bottom split",
                  command: "workbench.action.splitEditorDown",
                },
                v: {
                  text: "Vertical right split",
                  command: "workbench.action.splitEditor",
                },
                t: {
                  text: "Transpose splits",
                  command: "workbench.action.toggleEditorGroupLayout",
                },
                // "f": {
                //   text: "Open files in selection (hsplit)",
                //   command: "dance.selections.open", function needs to be modified
                // },
                // "F": {
                //   text: "Open files in selection (vsplit)",
                //   command: "dance.selections.open", function needs to be modified
                // },
                q: {
                  text: "Close window",
                  command: "workbench.action.closeActiveEditor",
                },
                o: {
                  text: "Close all other windows (Current window only)",
                  command: "workbench.action.closeOtherEditors",
                },
                h: {
                  text: "Jump to the split on the left",
                  command: "workbench.action.focusLeftGroup",
                },
                j: {
                  text: "Jump to the split below",
                  command: "workbench.action.focusBelowGroup",
                },
                k: {
                  text: "Jump to the split above",
                  command: "workbench.action.focusAboveGroup",
                },
                l: {
                  text: "Jump to the split to the right",
                  command: "workbench.action.focusRightGroup",
                },
                H: {
                  text: "Swap with the split to the left",
                  command: "workbench.action.moveActiveEditorGroupLeft",
                },
                J: {
                  text: "Swap with the split below",
                  command: "workbench.action.moveActiveEditorGroupDown",
                },
                K: {
                  text: "Swap with the split above",
                  command: "workbench.action.moveActiveEditorGroupUp",
                },
                L: {
                  text: "Swap with the split to the right",
                  command: "workbench.action.moveActiveEditorGroupRight",
                },
                // "n": { Not easily possible. Neccessary?
                //   text: "New split scratch buffer",
                //   command: "",
                // },
              },
            },
          } satisfies Record<
            string,
            {
              title: string;
              items: Record<
                string,
                { text: string; command: string; args?: any[] }
              >;
            }
          >,
        },

        // Deprecated configuration:
        "dance.enabled": {
          type: "boolean",
          default: true,
          description: "Controls whether the Dance keybindings are enabled.",
          deprecationMessage:
            "dance.enabled is deprecated; disable the Dance extension instead.",
        },

        "dance.normalMode.lineHighlight": {
          type: ["string", "null"],
          default: "editor.hoverHighlightBackground",
          markdownDescription:
            "Controls the line highlighting applied to active lines in normal mode. " +
            "Can be an hex color, a [theme color](" +
            "https://code.visualstudio.com/api/references/theme-color) or null.",
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
        "dance.insertMode.lineHighlight": {
          type: ["string", "null"],
          default: null,
          markdownDescription:
            "Controls the line highlighting applied to active lines in insert mode. " +
            "Can be an hex color, a [theme color](" +
            "https://code.visualstudio.com/api/references/theme-color) or null.",
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
        "dance.normalMode.lineNumbers": {
          enum: ["off", "on", "relative", "inherit"],
          default: "relative",
          description: "Controls the display of line numbers in normal mode.",
          enumDescriptions: [
            "No line numbers.",
            "Absolute line numbers.",
            "Relative line numbers.",
            "Inherit from `editor.lineNumbers`.",
          ],
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
        "dance.insertMode.lineNumbers": {
          enum: ["off", "on", "relative", "inherit"],
          default: "inherit",
          description: "Controls the display of line numbers in insert mode.",
          enumDescriptions: [
            "No line numbers.",
            "Absolute line numbers.",
            "Relative line numbers.",
            "Inherit from `editor.lineNumbers`.",
          ],
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
        "dance.normalMode.cursorStyle": {
          enum: [
            "line",
            "block",
            "underline",
            "line-thin",
            "block-outline",
            "underline-thin",
            "inherit",
          ],
          default: "inherit",
          description: "Controls the cursor style in normal mode.",
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
        "dance.insertMode.cursorStyle": {
          enum: [
            "line",
            "block",
            "underline",
            "line-thin",
            "block-outline",
            "underline-thin",
            "inherit",
          ],
          default: "inherit",
          description: "Controls the cursor style in insert mode.",
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
        "dance.insertMode.selectionStyle": {
          type: "object",
          default: {
            borderColor: "$editor.selectionBackground",
            borderStyle: "solid",
            borderWidth: "2px",
            borderRadius: "1px",
          },
          description: "The style to apply to selections in insert mode.",
          properties: (Object as any).fromEntries(
            [
              "backgroundColor",
              "borderColor",
              "borderStyle",
              "borderWidth",
              "borderRadius",
            ].map((x) => [x, { type: "string" }]),
          ),
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
        "dance.selectionBehavior": {
          enum: ["caret", "character"],
          default: "caret",
          description: "Controls how selections behave within VS Code.",
          markdownEnumDescriptions: [
            "Selections are anchored to carets, which is the native VS Code behavior; that is, " +
              "they are positioned *between* characters and can therefore be empty.",
            "Selections are anchored to characters, like Kakoune; that is, they are positioned " +
              "*on* characters, and therefore cannot be empty. Additionally, one-character " +
              "selections will behave as if they were non-directional, like Kakoune.",
          ],
          markdownDeprecationMessage: builtinModesAreDeprecatedMessage,
        },
      },
    },

    // Views.
    // ========================================================================

    viewsContainers: {
      activitybar: [
        {
          id: "dance",
          title: "Dance",
          icon: "assets/dance-white.svg",
        },
      ],
    },

    views: {
      dance: [
        {
          id: "registers",
          name: "Registers",
        },
      ],
    },

    // Commands.
    // ========================================================================

    commands: modules.flatMap((module) =>
      module.commands.map((x) => ({
        command: x.id,
        title: x.title,
        category: "Dance",
      })),
    ),

    menus: {
      commandPalette: modules.flatMap((module) =>
        module.commands.map((x) => ({
          command: x.id,
          when: x.when,
        })),
      ),
    },

    // Keybindings.
    // ========================================================================

    // TODO: unassign default keybindings, and force the user to explicitly set
    // them up.
    keybindings: (() => {
      const keybindings = modules.flatMap((module) => module.keybindings),
        alphanum = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"],
        symbols = [...",'-=", "Tab", "Space", "NumPad_Add", "NumPad_Subtract"],
        keysToAssign = new Set([
          ...alphanum,
          ...alphanum.map((x) => `Shift+${x}`),
          ...symbols,
          ...symbols.map((x) => `Shift+${x}`),
        ]);

      for (const keybinding of keybindings) {
        keysToAssign.delete(keybinding.key);
      }

      for (const keyToAssign of keysToAssign) {
        keybindings.push({
          command: "dance.ignore",
          key: keyToAssign,
          when: "editorTextFocus && dance.mode == 'normal'",
        });
        keybindings.push({
          command: "dance.ignore",
          key: keyToAssign,
          when: "editorTextFocus && dance.mode == 'select'",
        });
      }

      keybindings.push(...getMiscKeybindings());

      return keybindings;
    })(),
  },
});

function getMiscKeybindings() {
  return [
    // Code actions.
    {
      key: "k",
      when: "dance.mode == 'normal' && codeActionMenuVisible",
      command: "selectPrevCodeAction",
    },
    {
      key: "j",
      when: "dance.mode == 'normal' && codeActionMenuVisible",
      command: "selectNextCodeAction",
    },
    // Documentation hovers.
    {
      key: "k",
      when: "editorHoverFocused",
      command: "editor.action.scrollUpHover",
    },
    {
      key: "j",
      when: "editorHoverFocused",
      command: "editor.action.scrollDownHover",
    },
    {
      key: "h",
      when: "editorHoverFocused",
      command: "editor.action.scrollLeftHover",
    },
    {
      key: "l",
      when: "editorHoverFocused",
      command: "editor.action.scrollRightHover",
    },
    {
      key: "ctrl+b",
      when: "editorHoverFocused",
      command: "editor.action.pageUpHover",
    },
    {
      key: "ctrl+f",
      when: "editorHoverFocused",
      command: "editor.action.pageDownHover",
    },
    // Suggest widget (e.g. IntelliSense, snippets, autocomplete).
    {
      key: "ctrl+k",
      when: "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus",
      command: "selectPrevSuggestion",
    },
    {
      key: "ctrl+j",
      when: "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus",
      command: "selectNextSuggestion",
    },
    // List Panel (e.g. Outline, Problems, Search, etc.)
    {
      key: "h",
      command: "list.collapse",
      when: "listFocus && !inputFocus",
    },
    {
      key: "j",
      command: "list.focusDown",
      when: "listFocus && !inputFocus",
    },
    {
      key: "k",
      command: "list.focusUp",
      when: "listFocus && !inputFocus",
    },
    {
      key: "l",
      command: "list.select",
      when: "listFocus && !inputFocus",
    },
    {
      key: "o",
      command: "list.toggleExpand",
      when: "listFocus && !inputFocus",
    },
    // Files Explorer.
    {
      key: "y",
      command: "filesExplorer.copy",
      when: "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus",
    },
    {
      key: "x",
      command: "filesExplorer.cut",
      when: "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus",
    },
    {
      key: "p",
      command: "filesExplorer.paste",
      when: "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus",
    },
    {
      key: "d",
      command: "moveFileToTrash",
      when: "explorerResourceMoveableToTrash && explorerViewletVisible && filesExplorerFocus && !explorerResourceReadonly && !inputFocus",
    },
    {
      key: "c",
      command: "renameFile",
      when: "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus",
    },
    {
      key: "shift+o",
      command: "explorer.openAndPassFocus",
      when: "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus",
    },
    {
      key: "v",
      command: "filesExplorer.openFilePreserveFocus",
      when: "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus",
    },
    {
      key: ",",
      command: "dance.openMenu",
      args: { input: "file-explorer" },
      when: "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus",
    },
  ];
}

// Save to package.json
// ============================================================================

export async function build(builder: Builder) {
  const fs = await import("fs/promises");

  await fs.writeFile(
    `${__dirname}/package.json`,
    JSON.stringify(pkg(builder.getCommandModules()), undefined, 2) + "\n",
    "utf-8",
  );
}
