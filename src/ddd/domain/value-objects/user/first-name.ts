import { err, ok, Result } from "neverthrow";
import { ValueObject } from "../../../core/value-object";
import { ResultError } from "../../../result-error";
import { Guard } from "../../../validations/guards";

interface FirstNameProps {
    firstName: string;
}

export class InvalidFirstNameError extends ResultError {
    constructor(errors: ResultError[]) {
        super("firstName", "first name is invalid", errors);
    }
}

export class FirstName extends ValueObject<FirstNameProps> {
    public static maxLength: number = 31;
    public static minLength: number = 2;

    get value(): string {
        return this._props.firstName;
    }

    private constructor(props: FirstNameProps) {
        super(props);
    }

    public static create({
        firstName,
    }: FirstNameProps): Result<FirstName, InvalidFirstNameError> {
        const usernameResult = Guard.againstNullOrUndefined<FirstNameProps>(
            "firstName",
            firstName,
        );
        const minLengthResult = Guard.againstTextAtLeast<FirstNameProps>(
            "firstName",
            firstName,
            {
                limit: this.minLength,
            },
        );
        const maxLengthResult = Guard.againstTextAtMost<FirstNameProps>(
            "firstName",
            firstName,
            {
                limit: this.maxLength,
            },
        );

        const result = Result.combineWithAllErrors([
            usernameResult,
            minLengthResult,
            maxLengthResult,
        ]);

        if (result.isErr()) {
            return err(result.error[0]);
        }
        return ok(new FirstName({ firstName }));
    }
}
