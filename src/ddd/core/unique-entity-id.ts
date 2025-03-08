import { err, ok, Result } from "neverthrow";
import { uniqueIdentifier } from "../../shared";
import { Guard } from "../validations/guards";
import { ResultError } from "../result-error";

export class InvalidUniqueEntityIDError extends ResultError {
    constructor(errors: ResultError) {
        super("id", "invalid unique entity id", errors);
    }
}
export class UniqueEntityID {
    private id;

    /**
     * Return raw value of identifier
     */
    get value(): string {
        return this.id;
    }

    constructor(id?: string) {
        this.id = id ? id : uniqueIdentifier();
    }

    equals(identifier: UniqueEntityID): boolean {
        if (identifier === null || identifier === undefined) {
            return false;
        }
        if (!(identifier instanceof this.constructor)) {
            return false;
        }

        return identifier.id === this.id;
    }

    toString() {
        return this.id;
    }

    public static create(id: string): Result<UniqueEntityID, ResultError> {
        const idOrError = Guard.againstNullOrUndefined("id", id);

        if (idOrError.isOk()) {
            return ok(new UniqueEntityID(id));
        }

        return err(new InvalidUniqueEntityIDError(idOrError.error));
    }
}
