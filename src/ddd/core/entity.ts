import { UniqueEntityID } from "./unique-entity-id";

const isEntity = (v: unknown): v is Entity<unknown, unknown> => {
    return v instanceof Entity;
};

//T is the external props and U the internal Props
export abstract class Entity<T, U> {
    protected readonly _id: UniqueEntityID;
    protected readonly _props: U;

    protected constructor(props: U, id?: UniqueEntityID) {
        this._id = id ? id : new UniqueEntityID();
        this._props = props;
    }

    public equals(object?: Entity<T, U>): boolean {
        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id);
    }
}
