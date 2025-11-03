"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const config_1 = __importDefault(require("./config"));
const start = async () => {
    try {
        const app = await (0, app_1.buildApp)();
        await app.listen({
            port: config_1.default.server.port,
            host: config_1.default.server.host
        });
        app.log.info(`Server is running on http://${config_1.default.server.host}:${config_1.default.server.port}`);
    }
    catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map