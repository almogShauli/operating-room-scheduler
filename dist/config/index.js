"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const environment_1 = require("../environment");
const config = {
    server: {
        port: environment_1.port,
        host: environment_1.host
    },
    logger: {
        enabled: true,
        level: environment_1.logLevel
    }
};
exports.default = config;
//# sourceMappingURL=index.js.map