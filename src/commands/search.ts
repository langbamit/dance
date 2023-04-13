import * as vscode from "vscode";

import type { CommandArguments } from ".";
import {
  search as apiSearch,
  Direction,
  EmptySelectionsError,
  manipulateSelectionsInteractively,
  Positions,
  promptRegexpOpts,
  Selections,
  Shift,
} from "../api";
import { Register } from "../state/registers";
import { CharSet, getCharSetFunction } from "../utils/charset";
import { escapeForRegExp, newRegExp } from "../utils/regexp";

/**
 * Search for patterns and replace or add selections.
 */
declare module "./search";

/**
 * Search.
 *
 * @keys `/` (helix: normal), `NumPad_Divide` (helix: normal), `/` (helix: select), `NumPad_Divide` (helix: select)
 * @commands
 *
 * | Title                    | Identifier        | Keybinding                                   | Command                                                |
 * | ------------------------ | ----------------- | -------------------------------------------- | ------------------------------------------------------ |
 * | Search (extend)          | `extend`          | `?` (helix: normal), `?` (helix: select)     | `[".search", {                shift: "extend", ... }]` |
 * | Search backward          | `backward`        | `a-/` (helix: normal), `a-/` (helix: select) | `[".search", { direction: -1                 , ... }]` |
 * | Search backward (extend) | `backward.extend` | `a-?` (helix: normal)                        | `[".search", { direction: -1, shift: "extend", ... }]` |
 
 */
export async function search({
  _,
  getRegister,
  repetitions,
  add = false,
  direction = Direction.Forward,
  interactive = true,
  shift = Shift.Jump,
  re,
}: CommandArguments<{
  direction?: Direction;
  shift?: Shift;
  add?: boolean;
  interactive?: boolean;
  re?: string | (RegExp & { originalSource?: string });
}>) {
  const register = getRegister(
    "slash",
    Register.Flags.CanRead,
    Register.Flags.CanWrite,
  );
  return manipulateSelectionsInteractively(
    _,
    "re",
    { re },
    interactive,
    {
      ...promptRegexpOpts("mu"),
      value: (await register.get())?.[0],
    },
    async (re, selections) => {
      if (typeof re === "string") {
        re = newRegExp(re, "mu");
      }

      register.set([re.originalSource ?? re.source]);

      const newSelections = add ? selections.slice() : [],
        regexpMatches = [] as RegExpMatchArray[];

      newSelections.push(
        ...Selections.mapByIndex((_i, selection, document) => {
          let newSelection = selection;

          for (let j = 0; j < repetitions; j++) {
            const searchResult = nextImpl(
              re as RegExp,
              direction,
              newSelection,
              undefined,
              undefined,
              document,
              /* allowWrapping= */ shift !== Shift.Extend,
              regexpMatches,
              regexpMatches.length,
            );

            if (searchResult === undefined) {
              return undefined;
            }

            newSelection = searchResult;
          }

          if (shift === Shift.Jump) {
            return newSelection;
          }

          const position =
            direction === Direction.Forward
              ? newSelection.end
              : newSelection.start;

          return Selections.shift(selection, position, shift, _);
        }, selections),
      );

      Selections.set(newSelections);
      _.extension.registers.updateRegExpMatches(regexpMatches);

      await register.set([re.originalSource ?? re.source]);

      return re;
    },
  );
}

/**
 * Search current selection.
 *
 * @keys `a-*` (kakoune: normal), `a-NumPad_Multiply` (kakoune: normal), `a-*` (kakoune: select), `a-NumPad_Multiply` (kakoune: select)
 * @commands
 *
 * | Title                            | Identifier        | Keybinding                                                 | Command                                             |
 * | -------------------------------- | ----------------- | ---------------------------------------------------------- | --------------------------------------------------- |
 * | Search current selection (smart) | `selection.smart` | `*` (helix: normal), `NumPad_Multiply` (helix: normal), `*` (helix: select), `NumPad_Multiply` (helix: select) | `[".search.selection", { smart: true, +register }]` |
 */
export function selection({
  document,
  selections,
  getRegister,
  smart = false,
}: CommandArguments<{
  smart?: boolean;
}>) {
  const register = getRegister("slash", Register.Flags.CanWrite);
  const texts = [] as string[],
    isWord = smart ? getCharSetFunction(CharSet.Word, document) : undefined;

  for (const selection of selections) {
    let text = escapeForRegExp(document.getText(selection));

    if (text.length === 0) {
      continue;
    }

    if (smart) {
      let firstLine: string | undefined,
        isBeginningOfWord = isWord!(text.charCodeAt(0));

      const firstLineStart = selection.start.character;

      if (isBeginningOfWord && firstLineStart > 0) {
        firstLine = document.lineAt(selection.start).text;
        isBeginningOfWord = !isWord!(firstLine.charCodeAt(firstLineStart - 1));
      }

      const lastLineEnd = selection.end.character,
        lastLine =
          selection.isSingleLine && firstLine !== undefined
            ? firstLine
            : document.lineAt(selection.end).text,
        isEndOfWord =
          lastLineEnd + 1 < lastLine.length &&
          isWord!(lastLine.charCodeAt(lastLineEnd - 1)) &&
          !isWord!(lastLine.charCodeAt(lastLineEnd));

      if (isBeginningOfWord) {
        const prefix = text.charCodeAt(0) < 0x80 ? "\\b" : "(?<=^|\\P{L})";

        text = prefix + text;
      }

      if (isEndOfWord) {
        const suffix =
          text.charCodeAt(text.length - 1) < 0x80 ? "\\b" : "(?=\\P{L}|$)";

        text += suffix;
      }
    }

    texts.push(text);
  }

  if (texts.length === 0) {
    throw new Error("all selections are empty");
  }

  register.set(texts);
}

/**
 * Select next match.
 *
 * @keys `n` (helix: normal), `n` (helix: select)
 * @commands
 *
 * | Title                 | Identifier     | Keybinding                | Command                                               |
 * | --------------------- | -------------- | ------------------------- | ----------------------------------------------------- |
 * | Select previous match | `previous`     | `s-n` (helix: normal), `s-n` (helix: select)   | `[".search.next", { direction: -1           , ... }]` |
 
 */
export async function next({
  _,
  document,
  getRegister,
  repetitions,
  direction = Direction.Forward,
}: CommandArguments<{
  direction?: Direction;
}>) {
  const register = getRegister("slash", Register.Flags.CanRead);
  const add = _.isSelectMode;
  const reStrs = await register.get();

  if (reStrs === undefined || reStrs.length === 0) {
    return;
  }

  const re = newRegExp(reStrs[0], "mu"),
    allRegexpMatches = [] as RegExpMatchArray[],
    selections = _.selections.slice();
  let mainSelection = selections[0];

  if (!add) {
    for (let j = 0; j < repetitions; j++) {
      const next = nextImpl(
        re,
        direction,
        mainSelection,
        undefined,
        undefined,
        document,
        /* allowWrapping= */ true,
        allRegexpMatches,
        allRegexpMatches.length,
      );

      if (next === undefined) {
        return;
      }

      mainSelection = next;
    }

    selections[0] = mainSelection;
  } else {
    for (let i = 0; i < repetitions; i++) {
      const regexpMatches = [] as RegExpMatchArray[],
        next = nextImpl(
          re,
          direction,
          mainSelection,
          undefined,
          undefined,
          document,
          /* allowWrapping= */ true,
          regexpMatches,
          regexpMatches.length,
        );

      if (next !== undefined) {
        selections.unshift(next);
        mainSelection = next;
      } else {
        const target = direction === Direction.Backward ? "previous" : "next",
          times = repetitions === 1 ? "time" : "times";

        throw new EmptySelectionsError(
          `main selection could not advance to ${target} match ${repetitions} ${times}`,
        );
      }

      allRegexpMatches.unshift(...regexpMatches);
    }
  }

  Selections.set(selections);
  _.extension.registers.updateRegExpMatches(allRegexpMatches);
}

function nextImpl(
  re: RegExp,
  direction: Direction,
  selection: vscode.Selection,
  searchStart: vscode.Position | undefined,
  searchEnd: vscode.Position | undefined,
  document: vscode.TextDocument,
  allowWrapping: boolean,
  matches: RegExpMatchArray[] | undefined,
  matchesIndex: number,
): vscode.Selection | undefined {
  searchStart ??=
    direction === Direction.Backward ? selection.start : selection.end;

  const searchResult = apiSearch(direction, re, searchStart, searchEnd);

  if (searchResult === undefined) {
    if (allowWrapping) {
      if (direction === Direction.Backward) {
        searchStart = Positions.last(document);
        searchEnd = Positions.zero;
      } else {
        searchStart = Positions.zero;
        searchEnd = Positions.last(document);
      }

      return nextImpl(
        re,
        direction,
        selection,
        searchStart,
        searchEnd,
        document,
        false,
        matches,
        matchesIndex,
      );
    }

    return;
  }

  if (matches !== undefined) {
    matches[matchesIndex] = searchResult[1];
  }

  return Selections.fromLength(
    searchResult[0],
    searchResult[1][0].length,
    /* isReversed= */ false,
    document,
  );
}
