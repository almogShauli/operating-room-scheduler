import { SchedulerService } from './scheduler';
export declare class QueueProcessor {
    private scheduler;
    private intervalId;
    private intervalMs;
    constructor(scheduler: SchedulerService, intervalMs?: number);
    start(): void;
    stop(): void;
    processOnce(): void;
}
//# sourceMappingURL=queueProcessor.d.ts.map