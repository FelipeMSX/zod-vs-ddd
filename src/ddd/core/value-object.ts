interface ValueObjectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    protected readonly _props: T;

    public constructor(props: T) {
        this._props = props;
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined || vo._props === undefined) {
            return false;
        }

        return JSON.stringify(this._props) === JSON.stringify(vo._props);
    }
}
