import cors from "cors";
import express from "express";
import { Server as HttpServer } from "http";

export class AppServer {
    private server: express.Application;

    constructor() {}

    startServer = async () => {
        this.buildServer();
        this.createHttpServer();
    };

    private createHttpServer() {
        this.server.listen(process.env.PORT, async () => {
            console.log("##------------SERVER STARTED-------------##");
        });
    }

    private buildServer() {
        this.server = express();
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
        this.server.use(cors());
    }
}
