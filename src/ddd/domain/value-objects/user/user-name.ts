import { err, ok, Result } from "neverthrow";
import { ValueObject } from "../../../core/value-object";
import { ResultError } from "../../../result-error";
import { Guard } from "../../../validations/guards";

interface NameProps {
    name: string;
}

export class InvalidNameError extends ResultError {
    constructor(errors: ResultError[]) {
        super("name", "invalid name", errors);
    }
}

export class UserName extends ValueObject<NameProps> {
    public static maxLength: number = 15;
    public static minLength: number = 2;

    get value(): string {
        return this._props.name;
    }

    private constructor(props: NameProps) {
        super(props);
    }

    public static create(props: NameProps): Result<UserName, ResultError> {
        const usernameResult = Guard.againstNullOrUndefined<NameProps>(
            "name",
            props.name,
        );
        const minLengthResult = Guard.againstTextAtLeast<NameProps>(
            "name",
            props.name,
            {
                limit: this.minLength,
            },
        );
        const maxLengthResult = Guard.againstTextAtMost<NameProps>(
            "name",
            props.name,
            {
                limit: this.maxLength,
            },
        );
        const onlyAlphaNumeric = Guard.againstNonAlphanumeric<NameProps>(
            "name",
            props.name,
        );

        const result = Result.combineWithAllErrors([
            usernameResult,
            minLengthResult,
            maxLengthResult,
            onlyAlphaNumeric,
        ]);

        if (result.isErr()) {
            return err(result.error[0]);
        }
        return ok(new UserName(props));
    }
}
