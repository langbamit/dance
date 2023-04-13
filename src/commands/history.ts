import * as vscode from "vscode";

import type { CommandArguments, CommandDescriptor } from ".";
import { ActiveRecording, Cursor, Entry } from "../state/recorder";
import { Register } from "../state/registers";
import { ArgumentError } from "../utils/errors";
import { newRegExp } from "../utils/regexp";

/**
 * Interact with history.
 */
declare module "./history";

/**
 * Undo.
 *
 * @keys `u` (helix: normal), `u` (helix: select)
 */
export function undo() {
  return vscode.commands.executeCommand("undo");
}

/**
 * Redo.
 *
 * @keys `s-u` (helix: normal), `s-u` (helix: select)
 */
export function redo() {
  return vscode.commands.executeCommand("redo");
}

/**
 * Undo a change of selections.
 *
 * @keys `a-u` (helix: normal), `a-u` (helix: select)
 */
export function undo_selections() {
  return vscode.commands.executeCommand("cursorUndo");
}

/**
 * Redo a change of selections.
 *
 * @keys `s-a-u` (helix: normal), `s-a-u` (helix: select)
 */
export function redo_selections() {
  return vscode.commands.executeCommand("cursorRedo");
}

/**
 * Repeat last change.
 *
 * @noreplay
 *
 * @commands
 *
 * | Title                        | Identifier         | Keybinding              | Commands                                                                      |
 * | ---------------------------- | ------------------ | ----------------------- | ----------------------------------------------------------------------------- |
 * | Repeat last selection change | `repeat.selection` |                         | `[".history.repeat", { filter: "dance\\.(seek|select|selections)", +count }]` |
 * | Repeat last seek             | `repeat.seek`      | `a-.` (kakoune: normal) | `[".history.repeat", { filter: "dance\\.seek", +count }]`                     |
 */
export async function repeat({
  _,
  repetitions,
  filter = /.+/,
}: CommandArguments<{ filter?: string | RegExp }>) {
  if (typeof filter === "string") {
    filter = newRegExp(filter, "u");
  }

  let commandDescriptor: CommandDescriptor, commandArgument: object;

  const cursor = _.extension.recorder.cursorFromEnd();

  for (;;) {
    if (cursor.is(Entry.ExecuteCommand)) {
      const entry = cursor.entry(),
        descriptor = entry.descriptor();

      if (descriptor.shouldBeReplayed && filter.test(descriptor.identifier)) {
        commandDescriptor = descriptor;
        commandArgument = entry.argument();
        break;
      }
    }

    if (!cursor.previous()) {
      throw new Error("no previous command matching " + filter);
    }
  }

  for (let i = 0; i < repetitions; i++) {
    await commandDescriptor.replay(_, commandArgument);
  }
}

/**
 * Repeat last edit without a command.
 *
 * @keys `.` (helix: normal), `.` (helix: select)
 * @noreplay
 */
export async function repeat_edit({ _, repetitions }: CommandArguments) {
  _.doNotRecord();

  const recorder = _.extension.recorder,
    cursor = recorder.cursorFromEnd();
  let startCursor: Cursor | undefined, endCursor: Cursor | undefined;

  for (;;) {
    if (cursor.is(Entry.ChangeTextEditorMode)) {
      const modeName = cursor.entry().mode().name;

      if (modeName === "normal") {
        cursor.previous();

        endCursor = cursor.clone();
      } else if (modeName === "insert" && endCursor !== undefined) {
        cursor.next();

        startCursor = cursor.clone();
        break;
      }
    }

    if (!cursor.previous()) {
      throw new Error("cannot find switch to normal or insert mode");
    }
  }

  for (let i = 0; i < repetitions; i++) {
    for (
      let cursor = startCursor.clone();
      cursor.isBeforeOrEqual(endCursor);
      cursor.next()
    ) {
      await cursor.replay(_);
    }
  }
}

/**
 * Replay recording.
 *
 * @keys `q` (helix: normal), `q` (helix: select)
 * @noreplay
 */
export async function recording_play({
  _,
  repetitions,
  getRegister,
}: CommandArguments<{}, false>) {
  const register = getRegister("arobase", Register.Flags.CanReadWriteMacros);
  const recording = register.getRecording();

  ArgumentError.validate(
    "recording",
    recording !== undefined,
    () => `register "${register.name}" does not hold a recording`,
  );

  for (let i = 0; i < repetitions; i++) {
    await recording.replay(_);
  }
}

const recordingPerRegister = new WeakMap<Register, ActiveRecording>();

/**
 * Start recording.
 *
 * @keys `s-q` (helix: normal, !recording), `s-q` (helix: select, !recording)
 * @noreplay
 */
export function recording_start({ _, getRegister }: CommandArguments) {
  const register = getRegister("arobase", Register.Flags.CanReadWriteMacros);
  ArgumentError.validate(
    "register",
    !recordingPerRegister.has(register),
    "a recording is already active",
  );

  const recording = _.extension.recorder.startRecording();

  recordingPerRegister.set(register, recording);
}

/**
 * Stop recording.
 *
 * @keys `escape` (helix: normal, recording), `s-q` (helix: normal, recording), `escape` (helix: select, recording), `s-q` (helix: select, recording)
 * @noreplay
 */
export function recording_stop({ getRegister }: CommandArguments) {
  const register = getRegister("arobase", Register.Flags.CanReadWriteMacros);
  const recording = recordingPerRegister.get(register);

  ArgumentError.validate(
    "register",
    recording !== undefined,
    "no recording is active in the given register",
  );

  recordingPerRegister.delete(register);
  register.setRecording(recording.complete());
}
