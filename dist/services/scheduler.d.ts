import { DoctorType, RequestResponse } from '../types';
import { ORRoomsService } from './orRooms';
import { QueueService } from './queue';
export declare class SchedulerService {
    private orRooms;
    private queue;
    private durationService;
    private schedulingLock;
    private lastRoomIndex;
    constructor();
    requestSurgery(doctorType: DoctorType): Promise<RequestResponse>;
    private findAvailableRoom;
    private getSurgeryDurationForDoctor;
    processQueue(): void;
    getQueueService(): QueueService;
    getORRoomsService(): ORRoomsService;
}
//# sourceMappingURL=scheduler.d.ts.map