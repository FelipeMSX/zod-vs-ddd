import dotenv from "dotenv";
dotenv.config();

import { AppServer } from "./ddd-app";

const appServer = new AppServer();

appServer.startServer();
