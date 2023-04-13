import { showMenuByName } from "../api";
/**
 * Space commands
 *
 * @commands
 *
 * | Title                   | Keybinding                                       | Command                                 |
 * | ----------------------- | ------------------------------------------------ | --------------------------------------- |
 * | Show space menu         | `space` (helix: normal), `space` (helix: select) | `[".openMenu", { menu: "space", ... }]` |
 */
declare module "./space";

/**
 * Open space menu.
 */
export function open() {
  return showMenuByName("space", []);
}
