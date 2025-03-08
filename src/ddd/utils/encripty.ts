import * as bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
            if (err) return reject(err);
            resolve(hash);
        });
    });
}

export { hashPassword };
