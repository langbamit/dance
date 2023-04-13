import { Builder, unindent } from "../../meta";

export function build(builder: Builder) {
  const modules = builder.getCommandModules(),
    availableCommands = new Set(
      modules.flatMap((m) =>
        m.functions.map((f) => "dance." + f.qualifiedName),
      ),
    ),
    additionalCommands = [] as Builder.AdditionalCommand[];

  // Build list of additional commands, only adding new commands when all their
  // dependencies have already been added as well.
  let unorderedAdditionalCommands = modules.flatMap((module) =>
    module.additional
      .concat(...module.functions.map((f) => f.additional))
      .filter((x) => x.identifier !== undefined && x.commands !== undefined),
  );

  while (unorderedAdditionalCommands.length > 0) {
    const commandsWithMissingDependencies = [] as Builder.AdditionalCommand[];

    outer: for (const command of unorderedAdditionalCommands) {
      const dependencies = command.commands!.matchAll(/"(\.[\w.-]+)"/g);

      for (const match of dependencies) {
        const dependency = "dance" + match[1];

        if (!availableCommands.has(dependency)) {
          commandsWithMissingDependencies.push(command);

          continue outer;
        }
      }

      availableCommands.add(`dance.${command.qualifiedIdentifier}`);
      additionalCommands.push(command);
    }

    if (
      unorderedAdditionalCommands.length ===
      commandsWithMissingDependencies.length
    ) {
      throw new Error(
        `cannot resolve dependencies: ${JSON.stringify(
          commandsWithMissingDependencies,
        )}`,
      );
    }
    unorderedAdditionalCommands = commandsWithMissingDependencies;
  }

  return unindent(4)`
    ${modules
      .map((module) =>
        unindent(8)`
        import {${module.functions
          .map(
            (f) => `\n  ${f.name} as ${f.qualifiedName.replace(/\./g, "_")},`,
          )
          .sort()
          .join("")}
        } from "./${module.name}";
    `.trim(),
      )
      .join("\n\n")}

    /**
     * All defined Dance commands.
     */
    export const commands: Commands = function () {
      // Normal commands.
      const commands = {${modules
        .flatMap((m) => m.functions)
        .map(
          (f) => unindent(8)`
            "dance.${f.qualifiedName}": new CommandDescriptor(
              "dance.${f.qualifiedName}",
              ${determineFunctionExpression(f)},
              ${determineFunctionFlags(f)},
            ),`,
        )
        .sort()
        .join("")}
      };

      // Additional commands.${additionalCommands
        .map(
          (x) => unindent(10)`
            describeAdditionalCommand(
              commands,
              "dance.${x.qualifiedIdentifier}",
              CommandDescriptor.Flags.RequiresActiveEditor | CommandDescriptor.Flags.DoNotReplay,
              [${x.commands}],
            );`,
        )
        .join("")}

      // Finalize \`commands\`.
      return Object.freeze(commands);
    }();
  `;
}

function determineFunctionExpression(f: Builder.ParsedFunction) {
  const takeArgument = f.hasArgs;

  return `(_, ${takeArgument ? `argument` : ""}) => _.runAsync((${
    takeArgument ? "_" : ""
  }) => 
    ${f.qualifiedName.replace(/\./g, "_")}(${
    takeArgument ? "createCommandArguments(_, argument) as any" : ""
  })
  )`;
}

function determineFunctionFlags(f: Builder.ParsedFunction) {
  const flags = [] as string[];
  let requiresActiveEditor = true;
  if (f.hasArgs) {
    const typeName = f.parameters[0][1];
    if (
      typeName.startsWith("CommandArguments") &&
      typeName.endsWith(",false>")
    ) {
      requiresActiveEditor = false;
    }
  }
  if (requiresActiveEditor) {
    flags.push("RequiresActiveEditor");
  }

  if ("noreplay" in f.properties) {
    flags.push("DoNotReplay");
  }

  if (flags.length === 0) {
    return "CommandDescriptor.Flags.None";
  }

  return flags.map((flag) => "CommandDescriptor.Flags." + flag).join(" | ");
}
