import { err, ok, Result } from "neverthrow";
import { ValueObject } from "../../../core/value-object";
import { ResultError } from "../../../result-error";
import { isValidEmail } from "../../../utils/email-utils";

export class InvalidEmailError extends ResultError {
    constructor(message: string) {
        super("email", message ?? "Email is not valid");
    }
}

export interface EmailProps {
    value: string;
}

export class Email extends ValueObject<EmailProps> {
    get value(): string {
        return this._props.value;
    }

    private constructor(props: EmailProps) {
        super(props);
    }

    public static create(email: string): Result<Email, InvalidEmailError> {
        if (!isValidEmail(email)) {
            return err(
                new InvalidEmailError(`the "${email}" address is not valid`),
            );
        }

        return ok(new Email({ value: email }));
    }
}
