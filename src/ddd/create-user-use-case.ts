import { err, ok, Result } from "neverthrow";
import { CreateUserUseCaseDTO } from "./create-user-dto";
import { User } from "./domain/user";
import { ResultError } from "./result-error";

export async function createUserUseCase(
    userProps: CreateUserUseCaseDTO,
): Promise<Result<User, ResultError>> {
    const userOrError = await User.create({
        createdAt: new Date().toISOString(),
        email: userProps.email,
        firstName: userProps.firstName,
        lastName: userProps.lastName,
        password: { value: userProps.password, hashed: false },
        username: userProps.username,
    });

    if (userOrError.isErr()) {
        return err(userOrError.error);
    }

    const user = userOrError.value;
    return ok(user);
}
