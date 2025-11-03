export enum DoctorType {
  HEART_SURGEON = 'heart_surgeon',
  BRAIN_SURGEON = 'brain_surgeon'
}

export enum EquipmentType {
  ECG = 'ECG',
  MRI = 'MRI',
  CT = 'CT'
}

export interface OperatingRoom {
  id: number;
  equipment: Set<EquipmentType>;
}

export interface SurgeryRequest {
  doctorType: DoctorType;
  requestTime: Date;
}

export interface QueueEntry {
  doctorType: DoctorType;
  requestTime: Date;
  queuePosition: number;
}

export interface ScheduledSurgery {
  orId: number;
  startTime: Date;
  endTime: Date;
  doctorType: DoctorType;
  duration: number;
}

export interface SurgeryAssignment {
  orId: number;
  scheduledTime: Date;
}

export interface QueueResponse {
  queuePosition: number;
}

export type RequestResponse = SurgeryAssignment | QueueResponse;

