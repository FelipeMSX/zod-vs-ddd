import { GuardResult, ValidGuard } from "./types";
import { onlyAlphaNumeric } from "../utils/string-utils";
import { err } from "neverthrow";
import { ResultError } from "../result-error";

export class Guard {
    private static fail(argName: string, message: string): GuardResult {
        const stringValue = argName.toString();
        return err(new ResultError(stringValue, message));
    }

    public static greaterThan<T>(
        argName: keyof T,
        value: number,
        minValue: number,
    ): GuardResult {
        const stringKey = argName.toString();
        if (!this.isNumber(value)) {
            return this.fail(stringKey, `${stringKey} - is not a number.`);
        }

        return value > minValue
            ? ValidGuard
            : this.fail(
                  stringKey,
                  `${stringKey} ${value} should be greater than ${minValue}`,
              );
    }

    public static lessThan<T>(
        argName: keyof T,
        value: number,
        minValue: number,
    ): GuardResult {
        const stringKey = argName.toString();
        if (!this.isNumber(value))
            return this.fail(stringKey, `${stringKey} - is not a number.`);

        return value < minValue
            ? ValidGuard
            : this.fail(
                  stringKey,
                  `${stringKey} ${value} should be less than ${minValue}`,
              );
    }

    /**
     * The input must has at least N chars defined in the options.
     *
     * Text with same length will be invalid, negative numbers are not allowed in the "limit".
     *
     * Fails: Test, limit: 6.
     *
     * Pass: Test, limit: 3.
     *
     */
    public static againstTextAtLeast<T>(
        argName: keyof T,
        input: string,
        options: { limit: number },
    ): GuardResult {
        const stringKey = argName.toString();

        if (options.limit <= 0)
            return this.fail(stringKey, "negative numbers are not allowed.");

        const okOrError = Guard.againstNullOrUndefined(argName, input);
        if (okOrError.isErr()) return okOrError;

        if (input.length <= options.limit) {
            return this.fail(
                stringKey,
                `${stringKey} has ${input.length}, it should be at least ${options.limit}.`,
            );
        }

        return ValidGuard;
    }

    /**
     * The input should not pass the numbers of chars defined in the options.
     *
     * Text with same length will be invalid, negative numbers are not allowed in the "limit".
     *
     * Fails: Test, limit: 3.
     *
     * Pass: Test, limit: 6.
     */
    public static againstTextAtMost<T>(
        argName: keyof T,
        text: string,
        options: { limit: number },
    ): GuardResult {
        const stringKey = argName.toString();

        if (options.limit <= 0)
            return this.fail(stringKey, "negative numbers are not allowed.");

        const okOrError = Guard.againstNullOrUndefined(argName, text);

        if (okOrError.isErr()) return okOrError;

        if (text.length >= options.limit) {
            return this.fail(
                stringKey,
                `${stringKey} has ${text.length}, it should be at max ${options.limit}.`,
            );
        }

        return ValidGuard;
    }

    /**
     *  Checks if the input is Null or Undefined.
     */
    public static againstNullOrUndefined<T>(
        argName: keyof T,
        input: unknown,
    ): GuardResult {
        const stringKey = argName.toString();

        const isInvalid = input === null || input === undefined;
        return isInvalid
            ? this.fail(stringKey, "null or undefined is not valid")
            : ValidGuard;
    }

    /**
     * Checks if the text contains only alphanumeric characteres and underscore
     *
     */
    public static againstNonAlphanumeric<T>(
        argName: keyof T,
        text: string,
    ): GuardResult {
        const stringKey = argName.toString();

        const okOrError = Guard.againstNullOrUndefined(argName, text);
        if (okOrError.isErr()) return okOrError;

        return onlyAlphaNumeric(text)
            ? ValidGuard
            : this.fail(
                  stringKey,
                  `${stringKey} - ${text} has invalid characteres.`,
              );
    }

    /**
     * Checks if a given number is in the interval.
     *
     * @param value Number to be compared.
     * @param min The lower limit.
     * @param max the upper limit.
     * @returns GuardOK if the value is in the range, otherwise will be a GuardError.
     */
    public static inRange<T>(
        argName: keyof T,
        value: number,
        options: { min: number; max: number },
    ): GuardResult {
        const stringKey = argName.toString();

        const { max, min } = options;
        if (!this.isNumber(value))
            return this.fail(stringKey, `${stringKey} - is not a number.`);

        const isInRange = value >= min && value <= max;

        if (!isInRange)
            return this.fail(
                stringKey,
                `${stringKey} - '${value}' is not within range ${min} to ${max}.`,
            );

        return ValidGuard;
    }

    /**
     *  Valid if the value is a number
     */
    public static againstNotNumber<T>(
        argName: keyof T,
        input: unknown,
    ): GuardResult {
        const stringKey = argName.toString();

        if (!this.isNumber(input))
            return this.fail(stringKey, "value is not a number.");

        return ValidGuard;
    }

    private static isNumber(value?: string | number | unknown): boolean {
        return (
            value != null && value !== "" && !isNaN(Number(value.toString()))
        );
    }
}
