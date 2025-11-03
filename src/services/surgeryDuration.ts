import { DoctorType, EquipmentType, OperatingRoom } from '../types';
import { ORRoomsService } from './orRooms';

export class SurgeryDurationService {
  getSurgeryDuration(doctorType: DoctorType, room: OperatingRoom): number {
    if (doctorType === DoctorType.HEART_SURGEON) {
      return ORRoomsService.SURGERY_DURATION.HEART_SURGEON;
    }

    if (doctorType === DoctorType.BRAIN_SURGEON) {
      const hasCT = room.equipment.has(EquipmentType.CT);
      return hasCT 
        ? ORRoomsService.SURGERY_DURATION.BRAIN_SURGEON_WITH_CT
        : ORRoomsService.SURGERY_DURATION.BRAIN_SURGEON_WITHOUT_CT;
    }

    throw new Error(`Unknown doctor type: ${doctorType}`);
  }

  canRoomAccommodate(doctorType: DoctorType, room: OperatingRoom): boolean {
    if (doctorType === DoctorType.HEART_SURGEON) {
      return room.equipment.has(EquipmentType.ECG);
    }

    if (doctorType === DoctorType.BRAIN_SURGEON) {
      return room.equipment.has(EquipmentType.MRI);
    }

    return false;
  }
}

