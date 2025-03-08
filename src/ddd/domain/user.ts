import { err, ok, Result } from "neverthrow";
import { Entity } from "../core/entity";
import {
    CreatedAt,
    Email,
    FirstName,
    LastName,
    Password,
    PasswordProps,
    UserName,
} from "./value-objects/user";
import { ResultError } from "../result-error";
import { UserId } from "./value-objects/user/user-id";

interface UserProps {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: PasswordProps;
    createdAt: string;
}

interface UserPropsInternal {
    username: UserName;
    email: Email;
    password: Password;
    firstName: FirstName;
    lastName: LastName;
    createdAt: CreatedAt;
}

export class InvalidUserError extends ResultError {
    constructor(errors: ResultError[]) {
        super(InvalidUserError.name, "invalid user", errors);
    }
}

export class User extends Entity<UserProps, UserPropsInternal> {
    private constructor(props: UserPropsInternal, id?: UserId) {
        super(props, id);
    }

    get id(): UserId {
        return this._id;
    }

    get email(): Email {
        return this._props.email;
    }

    get username(): UserName {
        return this._props.username;
    }

    get firstName(): FirstName {
        return this._props.firstName;
    }

    get lastName(): LastName {
        return this._props.lastName;
    }

    get password(): Password {
        return this._props.password;
    }

    get createdAt(): CreatedAt {
        return this._props.createdAt;
    }

    public static async create(
        props: UserProps,
        id?: UserId,
    ): Promise<Result<User, InvalidUserError>> {
        const userNameOrError = UserName.create({ name: props.username });
        const firstNameOrError = FirstName.create({
            firstName: props.firstName,
        });
        const lastNameOrError = LastName.create({ lastName: props.lastName });

        const userPasswordOrError = await Password.create({
            ...props.password,
        });
        const userEmailOrError = Email.create(props.email);
        const userDateOrError = CreatedAt.create(props.createdAt);

        const resultOrError = Result.combineWithAllErrors([
            userNameOrError,
            userPasswordOrError,
            userEmailOrError,
            userDateOrError,
            firstNameOrError,
            lastNameOrError,
        ]);

        if (resultOrError.isOk()) {
            //TODO expose the values like keys ex: result.value.username
            const username: UserName = resultOrError.value[0];
            const password: Password = resultOrError.value[1];
            const email: Email = resultOrError.value[2];
            const createdAt: CreatedAt = resultOrError.value[3];
            const firstName: FirstName = resultOrError.value[4];
            const lastName: LastName = resultOrError.value[5];

            const user = new User(
                {
                    username: username,
                    email: email,
                    password: password,
                    createdAt: createdAt,
                    firstName: firstName,
                    lastName: lastName,
                },
                id,
            );

            return ok(user);
        }

        return err(new InvalidUserError(resultOrError.error));
    }
}
