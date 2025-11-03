"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORRoomsService = void 0;
const types_1 = require("../types");
class ORRoomsService {
    constructor() {
        this.rooms = [
            { id: 1, equipment: new Set([types_1.EquipmentType.MRI, types_1.EquipmentType.CT, types_1.EquipmentType.ECG]) },
            { id: 2, equipment: new Set([types_1.EquipmentType.CT, types_1.EquipmentType.MRI]) },
            { id: 3, equipment: new Set([types_1.EquipmentType.MRI, types_1.EquipmentType.ECG]) },
            { id: 4, equipment: new Set([types_1.EquipmentType.MRI, types_1.EquipmentType.ECG]) },
            { id: 5, equipment: new Set([types_1.EquipmentType.CT, types_1.EquipmentType.MRI]) }
        ];
        this.scheduledSurgeries = new Map();
    }
    getAllRooms() {
        return [...this.rooms];
    }
    getRoomById(id) {
        return this.rooms.find(room => room.id === id);
    }
    getRoomSchedules() {
        return new Map(this.scheduledSurgeries);
    }
    addSurgery(orId, startTime, endTime, doctorType, duration) {
        if (!this.scheduledSurgeries.has(orId)) {
            this.scheduledSurgeries.set(orId, []);
        }
        const schedules = this.scheduledSurgeries.get(orId);
        const newSurgery = {
            orId,
            startTime,
            endTime,
            doctorType,
            duration
        };
        const startTimeMs = startTime.getTime();
        const insertIndex = this.binarySearchInsertIndex(schedules, startTimeMs);
        schedules.splice(insertIndex, 0, newSurgery);
    }
    binarySearchInsertIndex(schedules, targetTime) {
        let left = 0;
        let right = schedules.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (schedules[mid].startTime.getTime() < targetTime) {
                left = mid + 1;
            }
            else {
                right = mid;
            }
        }
        return left;
    }
    isRoomAvailable(orId, startTime, endTime) {
        const schedules = this.scheduledSurgeries.get(orId);
        if (!schedules || schedules.length === 0)
            return true;
        const now = new Date();
        this.cleanupPastSurgeries(orId, now);
        const activeSchedules = this.scheduledSurgeries.get(orId) || [];
        if (activeSchedules.length === 0)
            return true;
        const startTimeMs = startTime.getTime();
        const endTimeMs = endTime.getTime();
        const relevantIndex = this.findRelevantSurgeriesStartIndex(activeSchedules, startTimeMs, endTimeMs);
        for (let i = relevantIndex; i < activeSchedules.length; i++) {
            const surgery = activeSchedules[i];
            const surgeryStart = surgery.startTime.getTime();
            const surgeryEnd = surgery.endTime.getTime();
            if (surgeryStart >= endTimeMs) {
                break;
            }
            if ((startTimeMs >= surgeryStart && startTimeMs < surgeryEnd) ||
                (endTimeMs > surgeryStart && endTimeMs <= surgeryEnd) ||
                (startTimeMs <= surgeryStart && endTimeMs >= surgeryEnd)) {
                return false;
            }
        }
        return true;
    }
    findRelevantSurgeriesStartIndex(schedules, startTime, endTime) {
        let left = 0;
        let right = schedules.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (schedules[mid].endTime.getTime() <= startTime) {
                left = mid + 1;
            }
            else {
                right = mid;
            }
        }
        return left;
    }
    cleanupPastSurgeries(orId, now) {
        const schedules = this.scheduledSurgeries.get(orId);
        if (!schedules || schedules.length === 0)
            return;
        const nowMs = now.getTime();
        const firstActiveIndex = this.findFirstActiveSurgeryIndex(schedules, nowMs);
        if (firstActiveIndex > 0) {
            this.scheduledSurgeries.set(orId, schedules.slice(firstActiveIndex));
        }
    }
    findFirstActiveSurgeryIndex(schedules, nowMs) {
        let left = 0;
        let right = schedules.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (schedules[mid].endTime.getTime() <= nowMs) {
                left = mid + 1;
            }
            else {
                right = mid;
            }
        }
        return left;
    }
    getAvailableTimeSlots(orId, fromDate, toDate, durationHours) {
        const now = new Date();
        this.cleanupPastSurgeries(orId, now);
        const schedules = this.scheduledSurgeries.get(orId) || [];
        const slots = [];
        let currentSlot = this.getNextWorkingHourStart(fromDate);
        const toDateMs = toDate.getTime();
        const durationMs = durationHours * 60 * 60 * 1000;
        let scheduleIndex = 0;
        while (currentSlot.getTime() <= toDateMs) {
            const slotEnd = new Date(currentSlot.getTime() + durationMs);
            if (this.doesSlotExceedWorkHours(slotEnd)) {
                currentSlot = this.getNextDayStart(currentSlot);
                scheduleIndex = 0;
                continue;
            }
            const conflictResult = this.checkSlotConflict(currentSlot, slotEnd, schedules, scheduleIndex);
            if (conflictResult.isAvailable) {
                slots.push(new Date(currentSlot));
                currentSlot = this.getNextSlotAfterAvailable(currentSlot, schedules, conflictResult.nextScheduleIndex);
                scheduleIndex = conflictResult.nextScheduleIndex;
                if (this.isAfterWorkHours(currentSlot)) {
                    currentSlot = this.getNextDayStart(currentSlot);
                    scheduleIndex = 0;
                }
            }
            else {
                currentSlot = this.jumpToAfterConflict(conflictResult.conflictEndTime, currentSlot);
                scheduleIndex = conflictResult.nextScheduleIndex;
                if (this.isBeforeWorkHours(currentSlot)) {
                    currentSlot = this.setToWorkHoursStart(currentSlot);
                }
                else if (this.isAfterWorkHours(currentSlot)) {
                    currentSlot = this.getNextDayStart(currentSlot);
                    scheduleIndex = 0;
                }
            }
        }
        return slots;
    }
    getNextWorkingHourStart(fromDate) {
        const workingHours = { start: 10, end: 18 };
        const current = new Date(fromDate);
        const hour = current.getHours();
        const minute = current.getMinutes();
        if (hour < workingHours.start) {
            current.setHours(workingHours.start, 0, 0, 0);
        }
        else if (hour >= workingHours.end) {
            current.setDate(current.getDate() + 1);
            current.setHours(workingHours.start, 0, 0, 0);
        }
        else {
            const nextHour = minute > 0 ? hour + 1 : hour;
            current.setHours(nextHour, 0, 0, 0);
        }
        return current;
    }
    doesSlotExceedWorkHours(slotEnd) {
        const workingHours = { start: 10, end: 18 };
        return slotEnd.getHours() > workingHours.end ||
            (slotEnd.getHours() === workingHours.end && slotEnd.getMinutes() > 0);
    }
    checkSlotConflict(slotStart, slotEnd, schedules, startIndex) {
        const slotStartMs = slotStart.getTime();
        const slotEndMs = slotEnd.getTime();
        for (let i = startIndex; i < schedules.length; i++) {
            const surgery = schedules[i];
            const surgeryStart = surgery.startTime.getTime();
            const surgeryEnd = surgery.endTime.getTime();
            if (surgeryStart >= slotEndMs) {
                return {
                    isAvailable: true,
                    conflictEndTime: 0,
                    nextScheduleIndex: i
                };
            }
            if (this.hasTimeOverlap(slotStartMs, slotEndMs, surgeryStart, surgeryEnd)) {
                return {
                    isAvailable: false,
                    conflictEndTime: surgeryEnd,
                    nextScheduleIndex: i
                };
            }
        }
        return {
            isAvailable: true,
            conflictEndTime: 0,
            nextScheduleIndex: schedules.length
        };
    }
    hasTimeOverlap(start1, end1, start2, end2) {
        return (start1 >= start2 && start1 < end2) ||
            (end1 > start2 && end1 <= end2) ||
            (start1 <= start2 && end1 >= end2);
    }
    moveToNextHour(date) {
        const next = new Date(date);
        next.setHours(next.getHours() + 1);
        return next;
    }
    getNextSlotAfterAvailable(currentSlot, schedules, scheduleIndex) {
        const nextHour = this.moveToNextHour(currentSlot);
        if (scheduleIndex >= schedules.length) {
            return nextHour;
        }
        const nextSurgery = schedules[scheduleIndex];
        const nextSurgeryStart = nextSurgery.startTime;
        const nextSurgeryStartHour = nextSurgeryStart.getHours();
        const nextHourValue = nextHour.getHours();
        if (nextSurgeryStartHour > nextHourValue) {
            const lastSlotBeforeSurgery = new Date(nextSurgeryStart);
            lastSlotBeforeSurgery.setHours(nextSurgeryStartHour - 1, 0, 0, 0);
            if (lastSlotBeforeSurgery.getTime() >= nextHour.getTime()) {
                return lastSlotBeforeSurgery;
            }
        }
        return nextHour;
    }
    jumpToAfterConflict(conflictEndTime, currentDate) {
        const jumpTo = Math.max(currentDate.getTime(), conflictEndTime);
        return new Date(jumpTo);
    }
    isBeforeWorkHours(date) {
        const workingHours = { start: 10, end: 18 };
        return date.getHours() < workingHours.start;
    }
    isAfterWorkHours(date) {
        const workingHours = { start: 10, end: 18 };
        return date.getHours() >= workingHours.end;
    }
    setToWorkHoursStart(date) {
        const workingHours = { start: 10, end: 18 };
        date.setHours(workingHours.start, 0, 0, 0);
        return date;
    }
    getNextDayStart(date) {
        const workingHours = { start: 10, end: 18 };
        const next = new Date(date);
        next.setDate(next.getDate() + 1);
        next.setHours(workingHours.start, 0, 0, 0);
        return next;
    }
}
exports.ORRoomsService = ORRoomsService;
ORRoomsService.SURGERY_DURATION = {
    HEART_SURGEON: 3,
    BRAIN_SURGEON_WITH_CT: 2,
    BRAIN_SURGEON_WITHOUT_CT: 3
};
//# sourceMappingURL=orRooms.js.map