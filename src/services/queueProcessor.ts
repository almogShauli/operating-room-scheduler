import { SchedulerService } from './scheduler';

export class QueueProcessor {
  private scheduler: SchedulerService;
  private intervalId: NodeJS.Timeout | null = null;
  private intervalMs: number;

  constructor(scheduler: SchedulerService, intervalMs: number = 60000) {
    this.scheduler = scheduler;
    this.intervalMs = intervalMs;
  }

  start(): void {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.scheduler.processQueue();
    }, this.intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  processOnce(): void {
    this.scheduler.processQueue();
  }
}

