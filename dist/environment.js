"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logLevel = exports.host = exports.port = void 0;
const env_var_1 = __importDefault(require("env-var"));
exports.port = env_var_1.default.get('PORT').default('3000').asIntPositive();
exports.host = env_var_1.default.get('HOST').default('0.0.0.0').asString();
exports.logLevel = env_var_1.default.get('LOG_LEVEL').default('info').asString();
//# sourceMappingURL=environment.js.map