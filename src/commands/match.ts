import { CommandArguments } from ".";
import { Direction, showMenuByName } from "../api";
import * as vscode from "vscode";

import type { InputOr } from ".";
import {
  Context,
  edit,
  keypress,
  moveToExcluded,
  Selections,
  Shift,
} from "../api";
import type { Register } from "../state/registers";
import { insert } from "./edit";
/**
 * Match menu.
 *
 * @commands
 *
 * | Title                                | Keybinding            | Command                                  |
 * | ------------------------------------ | --------------------- | ---------------------------------------- |
 * | Show match menu                      | `m` (helix: normal)   | `[".openMenu", { menu: "match", ... }]` |
 * | Show match menu (extend)             | `m` (helix: select)   | `[".openMenu", { menu: "match", pass: [{shift: "extend"}], ... }]` |
 * | Show match menu (backward )          | `s-m` (helix: normal) | `[".openMenu", { menu: "match", pass: [{direction: -1}], ... }]` |
 * | Show match menu (backward, extend)   | `s-m` (helix: select) | `[".openMenu", { menu: "match", pass: [{direction: -1, shift: "extend"}], ... }]` |
 */
declare module "./match";

export function show({ argument }: CommandArguments) {
  // TODO: Make just merely opening the menu not count as a command execution
  // and do not record it.
  return showMenuByName("match", [argument]);
}

export function match({
  direction = Direction.Forward,
  shift = Shift.Select,
  type,
}: CommandArguments<{
  direction?: Direction;
  shift?: Shift;
  type?: "object" | "surround";
}>) {}

// /**
//  * Replace stuff surround
//  *
//  */
export async function surroundreplace({ _ }: CommandArguments) {
  //   const inputOr = getInputOr("input")
  //   const inputFind = await inputOr(() => keypress(_));
  //   const inputReplace = await inputOr(() => keypress(_));
  //   const specialCharIndexFind = defaultEnclosingPatternsMatches.findIndex((x => x.some(symbol => symbol === inputFind)));
  //   let startTextFind = inputFind;
  //   let endTextFind = inputFind;
  //   if (specialCharIndexFind !== -1) {
  //     startTextFind = defaultEnclosingPatternsMatches[specialCharIndexFind][0];
  //     endTextFind = defaultEnclosingPatternsMatches[specialCharIndexFind][1];
  //   }
  //   const specialCharIndexReplace = defaultEnclosingPatternsMatches.findIndex((x => x.some(symbol => symbol === inputReplace)));
  //   let startTextReplace = inputReplace;
  //   let endTextReplace = inputReplace;
  //   if (specialCharIndexReplace !== -1) {
  //     startTextReplace = defaultEnclosingPatternsMatches[specialCharIndexReplace][0];
  //     endTextReplace = defaultEnclosingPatternsMatches[specialCharIndexReplace][1];
  //   }
  //   const positions = Selections.mapByIndex((_i, selection, document) => {
  //     const pos = Selections.seekFrom(selection, Direction.Backward);
  //     const pos2 = Selections.seekFrom(selection, Direction.Backward);
  //     console.warn(startTextFind);
  //     const matchForward = moveToExcluded(Direction.Backward, startTextFind, pos2, document);
  //     const matchBackward = moveToExcluded(Direction.Forward, endTextFind, pos, document);
  //     // throw new Error("Bla: " + JSON.stringify(selection.active, null, 2) + " " +  JSON.stringify(pos, null, 2)
  //     // + " " +  JSON.stringify(matchBackward, null, 2) + " " +  JSON.stringify(matchForward, null, 2));
  //     return [matchBackward, matchForward];
  //   });
  //   const flatPositions = [...positions.flat()];
  //   // Check if any position of found target is the same
  //   // TODO: Optimize. Theres probably an easier/faster way...
  //   flatPositions.forEach((outer, i) => {
  //     flatPositions.forEach((inner, o) => {
  //       if (i === o) {
  //         return false;
  //       }
  //       if (inner?.line === outer?.line && inner?.character === outer?.character) {
  //         throw new Error("Cursors overlap for a single surround pair range");
  //       }
  //       return;
  //     });
  //   });
  //   return _.run(() => edit((editBuilder, selections, document) => {
  //     for (const pos of positions) {
  //       const endRange = new vscode.Range(pos[0]!, new vscode.Position(pos[0]!.line, pos[0]?.character! + 1));
  //       const startRange = new vscode.Range(pos[1]!, new vscode.Position(pos[1]!.line, pos[1]?.character! - 1));
  //       editBuilder.replace(endRange, endTextReplace);
  //       editBuilder.replace(startRange, startTextReplace);
  //     }
  //   }));
}

// /**
//  * Delete stuff surround
//  *
//  */
// export async function surrounddelete(
//   _: Context,
//   inputOr: InputOr<"input", string>,
// ) {
//   const inputFind = await inputOr(() => keypress(_));

//   const specialCharIndexFind = defaultEnclosingPatternsMatches.findIndex((x => x.some(symbol => symbol === inputFind)));

//   let startTextFind = inputFind;
//   let endTextFind = inputFind;
//   if (specialCharIndexFind !== -1) {
//     startTextFind = defaultEnclosingPatternsMatches[specialCharIndexFind][0];
//     endTextFind = defaultEnclosingPatternsMatches[specialCharIndexFind][1];
//   }

//   const positions = Selections.mapByIndex((_i, selection, document) => {

//     const pos = Selections.seekFrom(selection, Direction.Backward);
//     const pos2 = Selections.seekFrom(selection, Direction.Backward);

//     console.warn(startTextFind);
//     const matchForward = moveToExcluded(Direction.Backward, startTextFind, pos2, document);
//     const matchBackward = moveToExcluded(Direction.Forward, endTextFind, pos, document);

//     // throw new Error("Bla: " + JSON.stringify(selection.active, null, 2) + " " +  JSON.stringify(pos, null, 2)
//     // + " " +  JSON.stringify(matchBackward, null, 2) + " " +  JSON.stringify(matchForward, null, 2));
//     return [matchBackward, matchForward];
//   });

//   const flatPositions = [...positions.flat()];

//   // Check if any position of found target is the same
//   // TODO: Optimize. Theres probably an easier/faster way...
//   flatPositions.forEach((outer, i) => {
//     flatPositions.forEach((inner, o) => {
//       if (i === o) {
//         return false;
//       }
//       if (inner?.line === outer?.line && inner?.character === outer?.character) {
//         throw new Error("Cursors overlap for a single surround pair range");
//       }
//       return;
//     });
//   });

//   return _.run(() => edit((editBuilder, selections, document) => {
//     for (const pos of positions) {

//       const endRange = new vscode.Range(pos[0]!, new vscode.Position(pos[0]!.line, pos[0]?.character! + 1));
//       const startRange = new vscode.Range(pos[1]!, new vscode.Position(pos[1]!.line, pos[1]?.character! - 1));

//       editBuilder.replace(endRange, "");
//       editBuilder.replace(startRange, "");

//     }
//   }));
// }

// /**
//  * Add stuff surround
//  *
//  */
// export async function surround(
//   _: Context,
//   selections: readonly vscode.Selection[],
//   register: RegisterOr<"dquote", Register.Flags.CanRead>,
//   inputOr: InputOr<"input", string>,
// ) {
//   const input = await inputOr(() => keypress(_));

//   // const languageConfig = vscode.workspace.getConfiguration("editor.language", _.document),
//   //       bracketsConfig = languageConfig.get<readonly [string, string][]>("brackets");
//   // TODO: investigate why this always seems to return null. Static list is good enough for now

//   const specialCharIndex = defaultEnclosingPatternsMatches.findIndex((x => x.some(symbol => symbol === input)));

//   let startText;
//   let endText;
//   if (specialCharIndex !== -1) {
//     startText = defaultEnclosingPatternsMatches[specialCharIndex][0];
//     endText = defaultEnclosingPatternsMatches[specialCharIndex][1];
//   } else {
//     startText = input;
//     endText = input;
//   }

//   await insert(_, selections, register, true, false, false, 0, undefined, endText, "end");
//   await insert(_, selections, register, true, false, false, 0, undefined, startText, "start");

// }

// const defaultEnclosingPatternsMatches = [
//   ["[", "]"],
//   ["(", ")"],
//   ["{", "}"],
//   ["<", ">"],
// ];
