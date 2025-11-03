"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = void 0;
const fastify_1 = __importDefault(require("fastify"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const services_1 = require("./services");
const buildApp = async () => {
    const fastify = (0, fastify_1.default)({
        logger: {
            level: config_1.default.logger.level
        }
    });
    await fastify.register(routes_1.default, { prefix: '/api' });
    fastify.get('/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });
    const queueProcessor = (0, services_1.getQueueProcessor)();
    queueProcessor.start();
    fastify.addHook('onClose', async () => {
        queueProcessor.stop();
    });
    return fastify;
};
exports.buildApp = buildApp;
//# sourceMappingURL=app.js.map