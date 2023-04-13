import * as vscode from "vscode";

import { CommandArguments } from ".";
import { SelectionBehavior } from "../api";

/**
 * Developer utilities for Dance.
 */
declare module "./dev";

/**
 * Set the selection behavior of the specified mode.
 */

export function setSelectionBehavior({
  _,
  mode,
  value,
}: CommandArguments<{ mode?: string; value?: "caret" | "character" }>) {
  const selectedMode =
    mode === undefined ? _.mode : _.extension.modes.get(mode);

  if (selectedMode !== undefined) {
    if (value === undefined) {
      value =
        selectedMode.selectionBehavior === SelectionBehavior.Caret
          ? "character"
          : "caret";
    }

    selectedMode.update(
      "_selectionBehavior",
      value === "character"
        ? SelectionBehavior.Character
        : SelectionBehavior.Caret,
    );
  }
}

/**
 * Copies the last encountered error message.
 */
export function copyLastErrorMessage({ _ }: CommandArguments<{}, false>) {
  if (_.extension.lastErrorMessage === undefined) {
    return Promise.resolve();
  }

  return vscode.env.clipboard.writeText(_.extension.lastErrorMessage);
}
