import { showMenuByName } from "../api";

/**
 * Window menu.
 *
 * @commands
 *
 * | Title                                | Keybinding                                   | Command                                  |
 * | ------------------------------------ | -------------------------------------------- | ---------------------------------------- |
 * | Show left bracket menu        | `[` (helix: normal), `[` (helix: select) | `[".openMenu", { menu: "left-bracket", ... }]` |
 * | Show right bracket  menu        | `]` (helix: normal), `]` (helix: select) | `[".openMenu", { menu: "right-bracket", ... }]` |
 */
declare module "./bracket";

/**
 * Open window menu.
 */
export function openLeftBracket() {
  return showMenuByName("left", []);
}

export function openRightBracket() {
  return showMenuByName("right", []);
}
