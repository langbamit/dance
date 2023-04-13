import * as vscode from "vscode";

import type { CommandArguments } from ".";
import { Selections } from "../api";

/**
 * Moving the editor view.
 *
 * @commands
 *
 * | Title                   | Keybinding                                       | Command                                              |
 * | ----------------------- | ------------------------------------------------ | ---------------------------------------------------- |
 * | Show view menu          | `z` (helix: normal), `z` (helix: select)     | `[".openMenu", { menu: "view", ...               }]` |
 * | Show view menu (locked) | `s-z` (helix: normal), `s-z` (helix: select) | `[".openMenu", { menu: "view", locked: true, ... }]` |
 */
declare module "./view";

/**
 * Reveals a position based on the main cursor.
 */
export function line({
  _,
  at = "center",
}: CommandArguments<{ at?: "top" | "center" | "bottom" }>) {
  return vscode.commands.executeCommand("revealLine", {
    at,
    lineNumber: Selections.activeLine(_.mainSelection),
  });
}
