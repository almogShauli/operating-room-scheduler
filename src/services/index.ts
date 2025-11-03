import { SchedulerService } from './scheduler';
import { QueueProcessor } from './queueProcessor';

let schedulerInstance: SchedulerService | null = null;
let queueProcessorInstance: QueueProcessor | null = null;

export function getSchedulerService(): SchedulerService {
  if (!schedulerInstance) {
    schedulerInstance = new SchedulerService();
  }
  return schedulerInstance;
}

export function getQueueProcessor(): QueueProcessor {
  if (!queueProcessorInstance) {
    queueProcessorInstance = new QueueProcessor(getSchedulerService(), 60000);
  }
  return queueProcessorInstance;
}

