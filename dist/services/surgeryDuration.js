"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurgeryDurationService = void 0;
const types_1 = require("../types");
const orRooms_1 = require("./orRooms");
class SurgeryDurationService {
    getSurgeryDuration(doctorType, room) {
        if (doctorType === types_1.DoctorType.HEART_SURGEON) {
            return orRooms_1.ORRoomsService.SURGERY_DURATION.HEART_SURGEON;
        }
        if (doctorType === types_1.DoctorType.BRAIN_SURGEON) {
            const hasCT = room.equipment.has(types_1.EquipmentType.CT);
            return hasCT
                ? orRooms_1.ORRoomsService.SURGERY_DURATION.BRAIN_SURGEON_WITH_CT
                : orRooms_1.ORRoomsService.SURGERY_DURATION.BRAIN_SURGEON_WITHOUT_CT;
        }
        throw new Error(`Unknown doctor type: ${doctorType}`);
    }
    canRoomAccommodate(doctorType, room) {
        if (doctorType === types_1.DoctorType.HEART_SURGEON) {
            return room.equipment.has(types_1.EquipmentType.ECG);
        }
        if (doctorType === types_1.DoctorType.BRAIN_SURGEON) {
            return room.equipment.has(types_1.EquipmentType.MRI);
        }
        return false;
    }
}
exports.SurgeryDurationService = SurgeryDurationService;
//# sourceMappingURL=surgeryDuration.js.map