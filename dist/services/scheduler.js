"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const orRooms_1 = require("./orRooms");
const queue_1 = require("./queue");
const surgeryDuration_1 = require("./surgeryDuration");
class SchedulerService {
    constructor() {
        this.schedulingLock = Promise.resolve();
        this.lastRoomIndex = new Map();
        this.orRooms = new orRooms_1.ORRoomsService();
        this.queue = new queue_1.QueueService();
        this.durationService = new surgeryDuration_1.SurgeryDurationService();
    }
    async requestSurgery(doctorType) {
        await this.schedulingLock;
        let resolveLock;
        this.schedulingLock = new Promise(resolve => {
            resolveLock = resolve;
        });
        try {
            const assignment = this.findAvailableRoom(doctorType);
            if (assignment) {
                const duration = this.getSurgeryDurationForDoctor(doctorType, assignment.orId);
                const endTime = new Date(assignment.scheduledTime);
                endTime.setHours(endTime.getHours() + duration);
                if (this.orRooms.isRoomAvailable(assignment.orId, assignment.scheduledTime, endTime)) {
                    this.orRooms.addSurgery(assignment.orId, assignment.scheduledTime, endTime, doctorType, duration);
                    this.processQueue();
                    resolveLock();
                    return assignment;
                }
                else {
                    resolveLock();
                    const queuePosition = this.queue.addToQueue(doctorType);
                    return { queuePosition };
                }
            }
            const queuePosition = this.queue.addToQueue(doctorType);
            resolveLock();
            return { queuePosition };
        }
        catch (error) {
            resolveLock();
            throw error;
        }
    }
    findAvailableRoom(doctorType) {
        const now = new Date();
        const oneWeekLater = new Date(now);
        oneWeekLater.setDate(oneWeekLater.getDate() + 7);
        const rooms = this.orRooms.getAllRooms();
        const compatibleRooms = rooms.filter(room => this.durationService.canRoomAccommodate(doctorType, room));
        if (compatibleRooms.length === 0)
            return null;
        const lastIndex = this.lastRoomIndex.get(doctorType) ?? -1;
        const startIndex = (lastIndex + 1) % compatibleRooms.length;
        const orderedRooms = [
            ...compatibleRooms.slice(startIndex),
            ...compatibleRooms.slice(0, startIndex)
        ];
        let bestRoom = null;
        for (let i = 0; i < orderedRooms.length; i++) {
            const room = orderedRooms[i];
            const duration = this.durationService.getSurgeryDuration(doctorType, room);
            const slots = this.orRooms.getAvailableTimeSlots(room.id, now, oneWeekLater, duration);
            if (slots.length > 0) {
                if (!bestRoom || slots[0].getTime() < bestRoom.slot.getTime()) {
                    bestRoom = {
                        roomId: room.id,
                        slot: slots[0],
                        roomIndex: i
                    };
                }
            }
        }
        if (!bestRoom)
            return null;
        const actualIndexInCompatible = compatibleRooms.findIndex(r => r.id === bestRoom.roomId);
        this.lastRoomIndex.set(doctorType, actualIndexInCompatible);
        return {
            orId: bestRoom.roomId,
            scheduledTime: bestRoom.slot
        };
    }
    getSurgeryDurationForDoctor(doctorType, orId) {
        const room = this.orRooms.getRoomById(orId);
        if (!room)
            throw new Error(`Room ${orId} not found`);
        return this.durationService.getSurgeryDuration(doctorType, room);
    }
    processQueue() {
        let consecutiveFailures = 0;
        const maxFailures = this.queue.getQueueLength();
        while (!this.queue.isEmpty() && consecutiveFailures < maxFailures) {
            const nextEntry = this.queue.processNextFromQueue();
            if (!nextEntry)
                break;
            const assignment = this.findAvailableRoom(nextEntry.doctorType);
            if (!assignment) {
                this.queue.addToQueue(nextEntry.doctorType);
                consecutiveFailures++;
                continue;
            }
            const duration = this.getSurgeryDurationForDoctor(nextEntry.doctorType, assignment.orId);
            const endTime = new Date(assignment.scheduledTime);
            endTime.setHours(endTime.getHours() + duration);
            if (this.orRooms.isRoomAvailable(assignment.orId, assignment.scheduledTime, endTime)) {
                this.orRooms.addSurgery(assignment.orId, assignment.scheduledTime, endTime, nextEntry.doctorType, duration);
                consecutiveFailures = 0;
            }
            else {
                this.queue.addToQueue(nextEntry.doctorType);
                consecutiveFailures++;
            }
        }
    }
    getQueueService() {
        return this.queue;
    }
    getORRoomsService() {
        return this.orRooms;
    }
}
exports.SchedulerService = SchedulerService;
//# sourceMappingURL=scheduler.js.map