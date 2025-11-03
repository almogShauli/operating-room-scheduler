"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueProcessor = void 0;
class QueueProcessor {
    constructor(scheduler, intervalMs = 60000) {
        this.intervalId = null;
        this.scheduler = scheduler;
        this.intervalMs = intervalMs;
    }
    start() {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(() => {
            this.scheduler.processQueue();
        }, this.intervalMs);
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    processOnce() {
        this.scheduler.processQueue();
    }
}
exports.QueueProcessor = QueueProcessor;
//# sourceMappingURL=queueProcessor.js.map