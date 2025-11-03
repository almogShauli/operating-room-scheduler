"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const surgery_1 = __importDefault(require("./surgery"));
async function routes(fastify, options) {
    await fastify.register(surgery_1.default);
}
exports.default = routes;
//# sourceMappingURL=index.js.map