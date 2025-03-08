import { ok, Result } from "neverthrow";
import { ResultError } from "../result-error";

export type GuardOk = void;
export type GuardError = ResultError;

export const ValidGuard = ok<void>();

export interface IGuardArgument {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    argument: any;
    argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export type GuardResult = Result<GuardOk, GuardError>;
