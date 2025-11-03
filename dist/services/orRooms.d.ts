import { OperatingRoom, ScheduledSurgery, DoctorType } from '../types';
export declare class ORRoomsService {
    private rooms;
    static readonly SURGERY_DURATION: {
        readonly HEART_SURGEON: 3;
        readonly BRAIN_SURGEON_WITH_CT: 2;
        readonly BRAIN_SURGEON_WITHOUT_CT: 3;
    };
    private scheduledSurgeries;
    getAllRooms(): OperatingRoom[];
    getRoomById(id: number): OperatingRoom | undefined;
    getRoomSchedules(): Map<number, ScheduledSurgery[]>;
    addSurgery(orId: number, startTime: Date, endTime: Date, doctorType: DoctorType, duration: number): void;
    private binarySearchInsertIndex;
    isRoomAvailable(orId: number, startTime: Date, endTime: Date): boolean;
    private findRelevantSurgeriesStartIndex;
    private cleanupPastSurgeries;
    private findFirstActiveSurgeryIndex;
    getAvailableTimeSlots(orId: number, fromDate: Date, toDate: Date, durationHours: number): Date[];
    private getNextWorkingHourStart;
    private doesSlotExceedWorkHours;
    private checkSlotConflict;
    private hasTimeOverlap;
    private moveToNextHour;
    private getNextSlotAfterAvailable;
    private jumpToAfterConflict;
    private isBeforeWorkHours;
    private isAfterWorkHours;
    private setToWorkHoursStart;
    private getNextDayStart;
}
//# sourceMappingURL=orRooms.d.ts.map