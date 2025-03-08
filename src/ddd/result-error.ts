export class ResultError {
    public get Code() {
        return this._code;
    }

    public get Description() {
        return this._description;
    }

    private _errors: ResultError[];

    constructor(
        private readonly _code: string,
        private readonly _description: string,
        errors?: ResultError | ResultError[],
    ) {
        if (!errors) return;

        this._errors = Array.isArray(errors) ? errors : [errors];
    }

    toJSON() {
        if (this._errors) {
            return {
                [this._code]: {
                    code: this._code,
                    description: this._description,
                    errors:
                        this._errors?.length > 0
                            ? this._errors.map((error) => error?.toJSON())
                            : [],
                },
            };
        } else {
            return {
                [this._code]: {
                    code: this._code,
                    description: this._description,
                },
            };
        }
    }
}
