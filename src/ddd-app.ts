import cors from "cors";
import express, { Request, Response } from "express";
import { createUserUseCase } from "./ddd/create-user-use-case";
import { CreateUserUseCaseDTO } from "./ddd/create-user-dto";

export class AppServer {
    private server: express.Application;

    constructor() {}

    startServer = async () => {
        this.buildServer();

        this.createHttpServer();
    };

    private createHttpServer() {
        this.server.listen(process.env.DDD_PORT, async () => {
            console.log("##------------SERVER STARTED-------------##");
            console.log(`listening: ${process.env.DDD_PORT}`);
        });
    }

    private buildServer() {
        this.server = express();
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
        this.server.use(cors());

        this.server.post("/users", async (req, res) => {
            try {
                const userRaw = req.body as CreateUserUseCaseDTO;
                const result = await createUserUseCase(userRaw);

                if (result.isErr()) {
                    return res.status(400).json({
                        message: "validation error",
                        error: result.error.toJSON(),
                    });
                }
            } catch (error: unknown) {
                console.error("Error creating user:", error);

                return res.status(500).json({
                    message: "Internal Server Error",
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unknown error",
                });
                /* empty */
            }
            return res.json({ message: "Welcome to the API!" });
        });
    }
}
