"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedulerService = getSchedulerService;
exports.getQueueProcessor = getQueueProcessor;
const scheduler_1 = require("./scheduler");
const queueProcessor_1 = require("./queueProcessor");
let schedulerInstance = null;
let queueProcessorInstance = null;
function getSchedulerService() {
    if (!schedulerInstance) {
        schedulerInstance = new scheduler_1.SchedulerService();
    }
    return schedulerInstance;
}
function getQueueProcessor() {
    if (!queueProcessorInstance) {
        queueProcessorInstance = new queueProcessor_1.QueueProcessor(getSchedulerService(), 60000);
    }
    return queueProcessorInstance;
}
//# sourceMappingURL=index.js.map