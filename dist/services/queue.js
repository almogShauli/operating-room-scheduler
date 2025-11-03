"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
class QueueService {
    constructor() {
        this.queue = [];
    }
    addToQueue(doctorType) {
        const position = this.queue.length + 1;
        this.queue.push({
            doctorType,
            requestTime: new Date(),
            queuePosition: position
        });
        return position;
    }
    getQueue() {
        return [...this.queue];
    }
    removeFromQueue(position) {
        if (position < 1 || position > this.queue.length) {
            return null;
        }
        const index = position - 1;
        const removed = this.queue.splice(index, 1)[0];
        this.queue.forEach((entry, idx) => {
            entry.queuePosition = idx + 1;
        });
        return removed;
    }
    processNextFromQueue() {
        if (this.queue.length === 0) {
            return null;
        }
        return this.removeFromQueue(1);
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    getQueueLength() {
        return this.queue.length;
    }
}
exports.QueueService = QueueService;
//# sourceMappingURL=queue.js.map