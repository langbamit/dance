import type { CommandArguments } from ".";
import { Context, prompt, toMode } from "../api";

/**
 * Set modes.
 */
declare module "./modes";
/**
 * Set Dance mode.
 *
 * @commands
 *
 * | Title              | Identifier   | Keybinding                                                                    | Command                                                     |
 * | ------------------ | ------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
 * | Set mode to Normal | `set.normal` | `escape` (helix: insert, "!suggestWidgetVisible"), `escape` (helix: select), `v` (helix: select)       | `[".modes.set", { mode: "normal" }], ["hideSuggestWidget"]` |
 * | Set mode to Insert | `set.insert` |                                                                               | `[".modes.set", { mode: "insert" }]`                        |
 * | Set mode to Select | `set.select` | `v` (helix: normal)                                                           | `[".modes.set", { mode: "select" }]`                        |
 *
 * Other variants are provided to switch to insert mode:
 *
 * | Title                | Identifier         | Keybinding              | Commands                                                                                                                                                                            |
 * | -------------------- | ------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 * | Insert before        | `insert.before`    | `i` (helix: normal)   | `[".selections.faceBackward", { record: false }],           [".modes.set", { mode: "insert", +mode }], [".selections.reduce", { where: "start", record: false, empty: true, ... }]` |
 * | Insert after         | `insert.after`     | `a` (helix: normal)   | `[".selections.faceForward" , { record: false }],           [".modes.set", { mode: "insert", +mode }], [".selections.reduce", { where: "end"  , record: false, empty: true, ... }]` |
 * | Insert at line start | `insert.lineStart` | `s-i` (helix: normal) | `[".select.lineStart", { shift: "jump", skipBlank: true }], [".modes.set", { mode: "insert", +mode }], [".selections.reduce", { where: "start", record: false, empty: true, ... }]` |
 * | Insert at line end   | `insert.lineEnd`   | `s-a` (helix: normal) | `[".select.lineEnd"  , { shift: "jump"                  }], [".modes.set", { mode: "insert", +mode }], [".selections.reduce", { where: "end"  , record: false, empty: true, ... }]` |
 *
 * @noreplay
 */
export async function set({ getInputOr }: CommandArguments<{ mode: string }>) {
  const modeOr = getInputOr("mode");
  await toMode(await modeOr(() => prompt(validateModeName())));
}

/**
 * Set Dance mode temporarily.
 *
 * @commands
 *
 * | Title                 | Identifier               | Keybindings             | Commands                                         |
 * | --------------------- | ------------------------ | ----------------------- | ------------------------------------------------ |
 * | Temporary Normal mode | `set.temporarily.normal` | `c-v` (helix: insert) | `[".modes.set.temporarily", { mode: "normal" }]` |
 * | Temporary Insert mode | `set.temporarily.insert` | `c-v` (helix: normal) | `[".modes.set.temporarily", { mode: "insert" }]` |
 *
 * @noreplay
 */
export async function set_temporarily({
  repetitions,
  getInputOr,
}: CommandArguments<{ mode: string }>) {
  const modeOr = getInputOr("mode");
  await toMode(await modeOr(() => prompt(validateModeName())), repetitions);
}

const modeHistory: string[] = [];

function validateModeName(ctx = Context.WithoutActiveEditor.current) {
  const modes = ctx.extension.modes;

  return {
    prompt: "Mode name",
    validateInput(value) {
      if (modes.get(value) !== undefined) {
        return;
      }

      return `mode ${JSON.stringify(value)} does not exist`;
    },
    placeHolder: [...modes.userModes()]
      .map((m) => m.name)
      .sort()
      .join(", "),
    history: modeHistory,
  } as prompt.Options;
}
