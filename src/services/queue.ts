import { DoctorType, QueueEntry } from '../types';

export class QueueService {
  private queue: QueueEntry[] = [];

  addToQueue(doctorType: DoctorType): number {
    const position = this.queue.length + 1;
    this.queue.push({
      doctorType,
      requestTime: new Date(),
      queuePosition: position
    });
    return position;
  }

  getQueue(): QueueEntry[] {
    return [...this.queue];
  }

  removeFromQueue(position: number): QueueEntry | null {
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

  processNextFromQueue(): QueueEntry | null {
    if (this.queue.length === 0) {
      return null;
    }

    return this.removeFromQueue(1);
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}

