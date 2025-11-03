import { DoctorType, QueueEntry } from '../types';
export declare class QueueService {
    private queue;
    addToQueue(doctorType: DoctorType): number;
    getQueue(): QueueEntry[];
    removeFromQueue(position: number): QueueEntry | null;
    processNextFromQueue(): QueueEntry | null;
    isEmpty(): boolean;
    getQueueLength(): number;
}
//# sourceMappingURL=queue.d.ts.map