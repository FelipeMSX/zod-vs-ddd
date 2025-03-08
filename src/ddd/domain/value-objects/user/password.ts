import * as bcrypt from "bcrypt";

import { ValueObject } from "../../../core/value-object";
import { ResultError } from "../../../result-error";
import { Guard } from "../../../validations/guards";
import { err, ok, Result } from "neverthrow";
import { hashPassword } from "../../../utils/encripty";

export interface PasswordProps {
    value: string;
    hashed?: boolean;
}

export class InvalidPasswordError extends ResultError {
    constructor(message?: string) {
        super("password", message ?? "invalid Password");
    }
}

export class Password extends ValueObject<PasswordProps> {
    public static minLength: number = 8;

    get value(): string {
        return this._props.value;
    }

    private constructor(props: PasswordProps) {
        super(props);
    }

    private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
        return new Promise((resolve) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if (err) return resolve(false);
                return resolve(compareResult);
            });
        });
    }

    public async comparePassword(plainTextPassword: string): Promise<boolean> {
        return this.bcryptCompare(plainTextPassword, this._props.value);
    }

    public static async create(
        props: PasswordProps,
    ): Promise<Result<Password, ResultError>> {
        const propsResult = Guard.againstNullOrUndefined(
            "password",
            props.value,
        );

        if (propsResult.isErr()) return err(propsResult.error);

        if (!props.hashed) {
            const guardAtLeastResult = Guard.againstTextAtLeast<PasswordProps>(
                "value",
                props.value,
                { limit: this.minLength - 1 },
            );

            if (guardAtLeastResult.isErr()) {
                return err(
                    new InvalidPasswordError(
                        `password should have at least ${this.minLength} digits`,
                    ),
                );
            }
        }

        let hasedPassword = props.value;
        if (!props.hashed) {
            hasedPassword = await hashPassword(props.value);
        }

        return ok(
            new Password({
                value: hasedPassword,
                hashed: !!props.hashed,
            }),
        );
    }
}
