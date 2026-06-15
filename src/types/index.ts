// Type definitions for Artivus Systems

export type UserRole = 'Administrator' | 'Inspector' | 'Operator';

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  email?: string;
}

export interface PlcStatus {
  isConnected: boolean;
  fixedScannerConnected: boolean;
  handScannerConnected: boolean;
  lastUpdate: Date;
}

export interface PistonModel {
  id: string;
  modelCode: string;
  name: string;
  description?: string;
  targetCount: number;
}

export interface PistonConfiguration {
  id: string;
  pistonCode: string;
  topRingCode: string;
  middleRingCode: string;
  oilRingCode: string;
}

export interface ShiftDefinition {
  id: string;
  name: 'Shift 1' | 'Shift 2' | 'Shift 3';
  startTime: string;
  endTime: string;
}

export interface ShiftConfigState {
  shifts: ShiftDefinition[];
}

export interface PistonMasterRecord {
  id: string;
  pistonCode: string;
  topRingCode: string;
  middleRingCode: string;
  oilRingCode: string;
}

export interface ShiftConfiguration {
  shiftName: 'Shift 1' | 'Shift 2' | 'Shift 3';
  startTime: string;
  endTime: string;
}

export interface RingType {
  id: string;
  code: string;
  name: string;
  ringPosition: 'Top' | 'Mid' | 'Oil' | 'Oil Side Rail';
  description?: string;
}

export interface ComponentData {
  id: string;
  componentName: string;
  currentCount: number;
  targetCount: number;
  qrCode: string;
  status: 'pending' | 'validated';
}

export interface AssemblyData {
  id: string;
  modelId: string;
  operatorId: string;
  operatorName: string;
  shift: string;
  components: ComponentData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InspectionReport {
  testNo: string;
  testDate: string;
  pistonModel: string;
  pistonNumber: string;
  topRingCode: string;
  midRingCode: string;
  oilRingCode: string;
  userName: string;
  shift: string;
  status: 'pass' | 'fail';
}

export interface IoSetting {
  id: string;
  dataName: string;
  registerNo: string;
  ioType: 'Input' | 'Output';
  description?: string;
}

export interface CameraSetting {
  id: string;
  cameraName: string;
  serialNo: string;
  triggerMode: 'Edge' | 'Level';
  triggerSource: string;
}

export interface Role {
  id: string;
  name: UserRole;
  permissions?: string[];
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'fail';
  icon: string;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  role: UserRole;
  shift: string;
  module: string;
  action: string;
  oldValue?: string;
  newValue?: string;
}

export interface ShiftReport {
  id: string;
  shiftName: string;
  operator: string;
  productionCount: number;
  passCount: number;
  failCount: number;
  startTime: Date;
  endTime: Date;
}
