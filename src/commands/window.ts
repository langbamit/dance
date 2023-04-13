import { showMenuByName } from "../api";

/**
 * Window menu.
 *
 * @commands
 *
 * | Title                   | Keybinding                                   | Command                                  |
 * | ----------------------- | -------------------------------------------- | ---------------------------------------- |
 * | Show window menu        | `c-w` (helix: normal), `c-w` (helix: select) | `[".openMenu", { menu: "window", ... }]` |
 */
declare module "./window";

/**
 * Open window menu.
 */
export function open() {
  return showMenuByName("window", []);
}
