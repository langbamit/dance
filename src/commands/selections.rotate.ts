import type { CommandArguments } from ".";
import { rotate, rotateContents, rotateSelections } from "../api";

/**
 * Rotate selection indices and contents.
 */
declare module "./selections.rotate";

/**
 * Rotate selections clockwise.
 *
 * @keys `a-(` (helix: normal), `a-(` (helix: select)
 * @commands
 *
 * The following keybinding is also available:
 *
 * | Title                               | Identifier     | Keybinding                                   | Command                                          |
 * | ----------------------------------- | -------------- | -------------------------------------------- | ------------------------------------------------ |
 * | Rotate selections counter-clockwise | `both.reverse` | `a-)` (helix: normal), `a-)` (helix: select) | `[".selections.rotate.both", { reverse: true }]` |
 
 */
export function both({
  repetitions,
  reverse = false,
}: CommandArguments<{ reverse?: boolean }>) {
  if (reverse) {
    repetitions = -repetitions;
  }

  return rotate(repetitions);
}

/**
 * Rotate selections clockwise (contents only).
 *
 * @commands
 *
 * The following command is also available:
 *
 * | Title                                               | Identifier         | Command                                              |
 * | --------------------------------------------------- | ------------------ | ---------------------------------------------------- |
 * | Rotate selections counter-clockwise (contents only) | `contents.reverse` | `[".selections.rotate.contents", { reverse: true }]` |
 */
export function contents({
  repetitions,
  reverse = false,
}: CommandArguments<{ reverse?: boolean }>) {
  if (reverse) {
    repetitions = -repetitions;
  }

  return rotateContents(repetitions);
}

/**
 * Rotate selections clockwise (selections only).
 *
 * @keys `(` (helix: normal), `(` (helix: select)
 *
 * @commands
 *
 * The following keybinding is also available:
 *
 * | Title                                                 | Identifier           | Keybinding                               | Command                                                |
 * | ----------------------------------------------------- | -------------------- | ---------------------------------------- | ------------------------------------------------------ |
 * | Rotate selections counter-clockwise (selections only) | `selections.reverse` | `)` (helix: normal), `)` (helix: select) | `[".selections.rotate.selections", { reverse: true }]` |
 */
export function selections({
  repetitions,
  reverse = false,
}: CommandArguments<{ reverse?: boolean }>) {
  if (reverse) {
    repetitions = -repetitions;
  }

  return rotateSelections(repetitions);
}
