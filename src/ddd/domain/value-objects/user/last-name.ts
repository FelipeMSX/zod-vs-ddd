import { err, ok, Result } from "neverthrow";
import { ValueObject } from "../../../core/value-object";
import { ResultError } from "../../../result-error";
import { Guard } from "../../../validations/guards";

interface LastNameProps {
    lastName: string;
}

export class InvalidLastNameError extends ResultError {
    constructor(errors: ResultError[]) {
        super(InvalidLastNameError.name, "last name is invalid", errors);
    }
}

export class LastName extends ValueObject<LastNameProps> {
    public static maxLength: number = 31;
    public static minLength: number = 2;

    get value(): string {
        return this._props.lastName;
    }

    private constructor(props: LastNameProps) {
        super(props);
    }

    public static create({
        lastName,
    }: LastNameProps): Result<LastName, ResultError> {
        const usernameResult = Guard.againstNullOrUndefined<LastNameProps>(
            "lastName",
            lastName,
        );
        const minLengthResult = Guard.againstTextAtLeast<LastNameProps>(
            "lastName",
            lastName,
            {
                limit: this.minLength,
            },
        );
        const maxLengthResult = Guard.againstTextAtMost<LastNameProps>(
            "lastName",
            lastName,
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
        return ok(new LastName({ lastName }));
    }
}
