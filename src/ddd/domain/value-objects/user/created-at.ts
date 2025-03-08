import { ok, Result } from "neverthrow";
import { ValueObject } from "../../../core/value-object";
import { ResultError } from "../../../result-error";

interface CreatedAtProps {
    createdAt: Date;
}

export class InvalidCreatedAtError extends ResultError {
    constructor(message?: string) {
        super("createdAt", message ?? "Invalid Date");
    }
}

export class CreatedAt extends ValueObject<CreatedAtProps> {
    get value(): Date {
        return this._props.createdAt;
    }

    private constructor(props: CreatedAtProps) {
        super(props);
    }

    public static create(createdAt: string): Result<CreatedAt, ResultError> {
        // const test = Date.parse(createdAt);
        // const usernameResult = Guard.againstNullOrUndefined("lastLogin", lastLogin);

        // const result = combine([usernameResult]);

        // if (result.isErr()) {
        //     return err(new InvalidLastLoginError(result.error));
        // }
        return ok(new CreatedAt({ createdAt: new Date(createdAt) }));
    }
}
