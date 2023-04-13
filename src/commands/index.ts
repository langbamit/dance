import * as vscode from "vscode";

import {
  ArgumentError,
  Context,
  Direction,
  EditorRequiredError,
  Shift,
} from "../api";
import type { Extension } from "../state/extension";
import { Register } from "../state/registers";

/**
 * Indicates that an input is expected; if no input is given, the specified
 * function will be used to update the input value in subsequent executions of
 * this command.
 */
export interface InputOr<_ArgumentName extends string, T> {
  (promptDefaultInput: () => T): T;
  (promptDefaultInput: () => Thenable<T>): Thenable<T>;
}

/**
 * The type of a `Context` passed to a command, based on whether the command
 * requires an active text editor or not.
 */
export type ContextType<RequiresActiveEditor extends boolean = boolean> =
  RequiresActiveEditor extends true ? Context : Context.WithoutActiveEditor;

/**
 * The type of the handler of a `CommandDescriptor`.
 */
export interface Handler<RequiresActiveEditor extends boolean = boolean> {
  (context: ContextType<RequiresActiveEditor>, argument: Record<string, any>):
    | unknown
    | Thenable<unknown>;
}

/**
 * The descriptor of a command.
 */
export class CommandDescriptor<
  Flags extends CommandDescriptor.Flags = CommandDescriptor.Flags,
> {
  public get requiresActiveEditor() {
    return (this.flags & CommandDescriptor.Flags.RequiresActiveEditor) !== 0;
  }

  public get shouldBeReplayed() {
    return (this.flags & CommandDescriptor.Flags.DoNotReplay) === 0;
  }

  public constructor(
    /**
     * The unique identifier of the command.
     */
    public readonly identifier: string,

    /**
     * The handler of the command.
     */
    public readonly handler: Handler<
      Flags extends CommandDescriptor.Flags.RequiresActiveEditor ? true : false
    >,

    /**
     * The flags of the command.
     */
    public readonly flags: Flags,
  ) {
    Object.freeze(this);
  }

  /**
   * Executes the command with the given argument.
   */
  public replay(
    context: ContextType<
      Flags extends CommandDescriptor.Flags.RequiresActiveEditor ? true : false
    >,
    argument: Record<string, any>,
  ) {
    return this.handler(context, argument);
  }

  /**
   * Invokes the command with the given argument.
   */
  public async invoke(extension: Extension, argument: unknown) {
    const context = Context.create(extension, this);

    if (this.requiresActiveEditor && !(context instanceof Context)) {
      throw new EditorRequiredError();
    }

    const ownedArgument = Object.assign({}, argument) as Record<
      string,
      unknown
    >;

    if (ownedArgument["count"] === undefined && extension.currentCount !== 0) {
      ownedArgument["count"] = extension.currentCount;
    }
    if (
      ownedArgument["register"] === undefined &&
      extension.currentRegister !== undefined
    ) {
      ownedArgument["register"] = extension.currentRegister;
    }
    if (ownedArgument["record"] === false) {
      context.doNotRecord();
    }

    extension.currentCount = 0;
    extension.currentRegister = undefined;

    let result: unknown;

    try {
      result = await this.handler(context as any, ownedArgument);
    } catch (e) {
      if ((ownedArgument as { readonly try: boolean }).try) {
        return;
      }

      throw e;
    }

    // Record command *after* executing it, to ensure it did not encounter
    // an error.
    if (context.shouldRecord()) {
      extension.recorder.recordCommand(this, ownedArgument);
    }

    if (this.requiresActiveEditor) {
      await (context as Context).insertUndoStop();
    }

    return result;
  }

  /**
   * Invokes the command with the given argument, ensuring that errors are
   * reporting to the user instead of throwing them.
   */
  public invokeSafely(extension: Extension, argument: unknown) {
    return extension.runPromiseSafely(
      () => this.invoke(extension, argument),
      () => undefined,
      (e) => `error executing command "${this.identifier}": ${e.message}`,
    );
  }

  /**
   * Registers the command for use by VS Code.
   */
  public register(extension: Extension): vscode.Disposable {
    return vscode.commands.registerCommand(
      this.identifier,
      (argument, ...args) => {
        console.log(this.identifier, argument, args);
        this.invokeSafely(extension, argument);
      },
    );
  }
}
type DirectionError = {
  ___directionError: "direction must be type Direction | undefined";
};
type ShiftError = {
  ___shiftError: "shift must be type Shift | undefined";
};
type ResolveDirectionType<T> = T extends { direction?: any }
  ? T extends { direction?: Direction }
    ? { direction: T["direction"] }
    : DirectionError
  : {};
type ResolveShiftType<T> = T extends { shift?: any }
  ? T extends { shift?: Shift }
    ? { shift: T["shift"] }
    : ShiftError
  : {};

export type CommandArguments<
  T = {},
  RequiredActiveEditor extends boolean = true,
> = {
  readonly _: ContextType<RequiredActiveEditor>;
  readonly extension: Extension;
  readonly count: number;
  readonly repetitions: number;
  readonly getRegister: <F extends Register.Flags[]>(
    defaultRegisterName: string,
    ...requiredFlags: F
  ) => Register.WithFlags<F>;
  getInputOr<U extends string>(
    argumentName: U,
  ): InputOr<
    U,
    U extends keyof (T & RequiredArgument)
      ? Exclude<(T & RequiredArgument)[U], undefined>
      : string
  >;
  argument: Record<string, any>;
} & (RequiredActiveEditor extends true
  ? {
      readonly document: vscode.TextDocument;
      readonly selections: readonly vscode.Selection[];
    }
  : {}) &
  Omit<T, "direction" | "shift"> &
  ResolveDirectionType<T> &
  ResolveShiftType<T>;

type RequiredArgument = {
  readonly count?: number;
  register?: string | Register;
  readonly record?: boolean;
  readonly try?: boolean;
  readonly direction?: number | string;
  readonly shift?: number | string;
};

function getCount(
  _: Context.WithoutActiveEditor,
  argument: { count?: number },
) {
  const count = +(argument.count as any);

  if (count >= 0 && Number.isInteger(count)) {
    return count;
  }

  return (argument.count = 0);
}
function getRepetitions(
  _: Context.WithoutActiveEditor,
  argument: { count?: number },
) {
  const count = getCount(_, argument);

  if (count <= 0) {
    return 1;
  }

  return count;
}

function getRegister<F extends Register.Flags[]>(
  _: Context.WithoutActiveEditor,
  argument: { register?: string | Register },
  defaultRegisterName: string,
  ...requiredFlags: F
): Register.WithFlags<F> {
  let register = argument.register;
  const extension = _.extension;

  if (typeof register === "string") {
    if (register.startsWith(" ")) {
      if (!(_ instanceof Context)) {
        throw new EditorRequiredError();
      }

      register = extension.registers
        .forDocument(_.document)
        .get(register.slice(1));
    } else {
      register = extension.registers.get(register);
    }
  } else if (!(register instanceof Register)) {
    register = extension.registers.get(defaultRegisterName);
  }

  register.checkFlags(
    requiredFlags
      .slice(1)
      .reduce(
        (flags, flag) => flags | flag,
        requiredFlags[0] ?? Register.Flags.None,
      ),
  );

  return (argument.register = register as any);
}

function getDirection(argument: { direction?: number | string }) {
  const direction = argument.direction;

  if (direction === undefined) {
    return undefined;
  }

  if (typeof direction === "number") {
    if (direction === 1 || direction === -1) {
      return direction as Direction;
    }
  } else if (typeof direction === "string") {
    if (direction === "forward") {
      return Direction.Forward;
    }

    if (direction === "backward") {
      return Direction.Backward;
    }
  }

  throw new ArgumentError(
    '"direction" must be "forward", "backward", 1, -1, or undefined',
    "direction",
  );
}

function getShift(argument: { shift?: number | string }) {
  const shift = argument.shift;

  if (shift === undefined) {
    return undefined;
  }

  if (typeof shift === "number") {
    if (shift === 0 || shift === 1 || shift === 2) {
      return shift as Shift;
    }
  } else if (typeof shift === "string") {
    if (shift === "jump") {
      return Shift.Jump;
    }

    if (shift === "select") {
      return Shift.Select;
    }

    if (shift === "extend") {
      return Shift.Extend;
    }
  }

  throw new ArgumentError(
    '"shift" must be "jump", "select", "extend", 0, 1, 2, or undefined',
    "shift",
  );
}

function getInputOr(argumentName: string, argument: Record<string, any>): any {
  // TODO: remove fallback to deprecated "input" name.
  const defaultInput = argument[argumentName] ?? argument["input"];

  if (defaultInput != null) {
    return () => defaultInput;
  }

  return (promptDefaultInput: () => any) => {
    const result = promptDefaultInput();

    if (typeof result.then === "function") {
      return (result as Thenable<any>).then(
        (x) => (argument[argumentName] = x),
      );
    }

    return (argument[argumentName] = result);
  };
}
export function createCommandArguments<
  T extends RequiredArgument,
  RequiredActiveEditor extends boolean,
>(_: ContextType<RequiredActiveEditor>, argument: T) {
  console.log(_, argument);
  return {
    ...argument,
    get _() {
      return _;
    },
    get document() {
      return (_ as Context).document;
    },
    get selections() {
      return (_ as Context).selections;
    },
    get extension() {
      return _.extension;
    },
    get count() {
      return getCount(_, argument);
    },
    get repetitions() {
      return getRepetitions(_, argument);
    },
    getRegister<F extends Register.Flags[]>(
      defaultRegisterName: string,
      ...requiredFlags: F
    ) {
      return getRegister(_, argument, defaultRegisterName, ...requiredFlags);
    },
    get direction() {
      return getDirection(argument);
    },
    get shift() {
      return getShift(argument);
    },
    getInputOr(argumentName: string) {
      return getInputOr(argumentName, argument);
    },
    argument,
  } as unknown as CommandArguments<T, RequiredActiveEditor>;
  //   get(target, property) {
  //     console.log(property)
  //     if (property === "_") {
  //       return _;
  //     } else if (property === "extension") {
  //       return _.extension;
  //     } else if (property === "document") {
  //       return (_ as Context).document;
  //     } else if (property === "selections") {
  //       return (_ as Context).selections;
  //     } else if (property === "count") {
  //       return getCount(_, target);
  //     } else if (property === "repetitions") {
  //       return getRepetitions(_, target);
  //     } else if (property === "getRegister") {
  //       return <F extends Register.Flags[]>(
  //         defaultRegisterName: string,
  //         ...requiredFlags: F
  //       ) => getRegister(_, target, defaultRegisterName, ...requiredFlags);
  //     } else if (property === "direction") {
  //       return getDirection(target);
  //     } else if (property === "shift") {
  //       return getShift(target);
  //     } else if (property === "getInputOr") {
  //       return (argumentName: string) => getInputOr(argumentName, target);
  //     }
  //     return target[property as keyof T];
  //   },
  // }) as unknown as CommandArguments<T>;
}

export declare namespace CommandDescriptor {
  /**
   * Flags describing the behavior of some commands.
   */
  export const enum Flags {
    /** No specific behavior. */
    None = 0b0000,

    /** An active editor must be available. */
    RequiresActiveEditor = 0b0001,

    /** The command should not be replayed in macros and repeats. */
    DoNotReplay = 0b0010,
  }
}

/**
 * A record from command identifier to command descriptor.
 */
export interface Commands {
  readonly [commandIdentifier: string]: CommandDescriptor;
}
