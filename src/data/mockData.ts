import {
  PistonModel,
  RingType,
  ComponentData,
  InspectionReport,
  IoSetting,
  CameraSetting,
  Role,
  AuditLog,
  ShiftReport,
} from '../types';

export const mockPistonModels: PistonModel[] = [
  {
    id: '1',
    modelCode: 'TATA-7082-B',
    name: 'TATA 7082 Series B',
    description: 'Diesel Engine Piston Assembly',
    targetCount: 182,
  },
  {
    id: '2',
    modelCode: 'TATA-7090-C',
    name: 'TATA 7090 Series C',
    description: 'High-Performance Piston',
    targetCount: 200,
  },
  {
    id: '3',
    modelCode: 'BHEL-4500-A',
    name: 'BHEL 4500 Series A',
    description: 'Industrial Grade Piston',
    targetCount: 150,
  },
  {
    id: '4',
    modelCode: 'CUMMINS-ISM-X',
    name: 'Cummins ISM Series X',
    description: 'Commercial Vehicle Engine',
    targetCount: 220,
  },
];

export const mockRingTypes: RingType[] = [
  {
    id: '1',
    code: 'TR-001',
    name: 'Top Compression Ring',
    ringPosition: 'Top',
    description: 'Primary compression ring',
  },
  {
    id: '2',
    code: 'MR-001',
    name: 'Middle Compression Ring',
    ringPosition: 'Mid',
    description: 'Secondary compression ring',
  },
  {
    id: '3',
    code: 'OR-001',
    name: 'Oil Control Ring',
    ringPosition: 'Oil',
    description: 'Main oil control ring',
  },
  {
    id: '4',
    code: 'OR-002',
    name: 'Oil Ring Side Rail',
    ringPosition: 'Oil Side Rail',
    description: 'Oil ring side rail spacer',
  },
];

export const mockComponentData: ComponentData[] = [
  {
    id: '1',
    componentName: 'Piston',
    currentCount: 45,
    targetCount: 182,
    qrCode: 'PST-2024-001-12345',
    status: 'validated',
  },
  {
    id: '2',
    componentName: 'Top Ring',
    currentCount: 45,
    targetCount: 182,
    qrCode: 'TR-2024-001-54321',
    status: 'validated',
  },
  {
    id: '3',
    componentName: 'Mid Ring',
    currentCount: 43,
    targetCount: 182,
    qrCode: 'MR-2024-001-98765',
    status: 'pending',
  },
  {
    id: '4',
    componentName: 'Oil Ring',
    currentCount: 41,
    targetCount: 182,
    qrCode: 'OR-2024-001-11111',
    status: 'pending',
  },
  {
    id: '5',
    componentName: 'Oil Ring Side Rail',
    currentCount: 40,
    targetCount: 182,
    qrCode: 'OSR-2024-001-22222',
    status: 'validated',
  },
];

export const mockInspectionReports: InspectionReport[] = [
  {
    testNo: 'TST-2024-001',
    testDate: '2024-06-10 14:30',
    pistonModel: 'TATA-7082-B',
    pistonNumber: 'PST-2024-001',
    topRingCode: 'TR-2024-001',
    midRingCode: 'MR-2024-001',
    oilRingCode: 'OR-2024-001',
    userName: 'John Operator',
    shift: 'Shift 1',
    status: 'pass',
  },
  {
    testNo: 'TST-2024-002',
    testDate: '2024-06-10 14:45',
    pistonModel: 'TATA-7082-B',
    pistonNumber: 'PST-2024-002',
    topRingCode: 'TR-2024-002',
    midRingCode: 'MR-2024-002',
    oilRingCode: 'OR-2024-002',
    userName: 'Admin User',
    shift: 'Shift 1',
    status: 'pass',
  },
  {
    testNo: 'TST-2024-003',
    testDate: '2024-06-10 15:00',
    pistonModel: 'TATA-7090-C',
    pistonNumber: 'PST-2024-003',
    topRingCode: 'TR-2024-003',
    midRingCode: 'MR-2024-003',
    oilRingCode: 'OR-2024-003',
    userName: 'John Operator',
    shift: 'Shift 1',
    status: 'fail',
  },
  {
    testNo: 'TST-2024-004',
    testDate: '2024-06-10 15:15',
    pistonModel: 'BHEL-4500-A',
    pistonNumber: 'PST-2024-004',
    topRingCode: 'TR-2024-004',
    midRingCode: 'MR-2024-004',
    oilRingCode: 'OR-2024-004',
    userName: 'Sarah Tech',
    shift: 'Shift 2',
    status: 'pass',
  },
  {
    testNo: 'TST-2024-005',
    testDate: '2024-06-10 15:30',
    pistonModel: 'TATA-7082-B',
    pistonNumber: 'PST-2024-005',
    topRingCode: 'TR-2024-005',
    midRingCode: 'MR-2024-005',
    oilRingCode: 'OR-2024-005',
    userName: 'Admin User',
    shift: 'Shift 2',
    status: 'pass',
  },
];

export const mockIoSettings: IoSetting[] = [
  {
    id: '1',
    dataName: 'PLC_Connection_Status',
    registerNo: '0x00001',
    ioType: 'Input',
    description: 'PLC connection status flag',
  },
  {
    id: '2',
    dataName: 'Fixed_Scanner_Status',
    registerNo: '0x00002',
    ioType: 'Input',
    description: 'Fixed scanner connection state',
  },
  {
    id: '3',
    dataName: 'Hand_Scanner_Status',
    registerNo: '0x00003',
    ioType: 'Input',
    description: 'Handheld scanner state',
  },
  {
    id: '4',
    dataName: 'Production_Counter',
    registerNo: '0x00100',
    ioType: 'Output',
    description: 'Total production count',
  },
  {
    id: '5',
    dataName: 'Error_Flag',
    registerNo: '0x00200',
    ioType: 'Output',
    description: 'Assembly error indicator',
  },
];

export const mockCameraSettings: CameraSetting[] = [
  {
    id: '1',
    cameraName: 'Main Inspection Camera',
    serialNo: 'CAM-2024-001',
    triggerMode: 'Edge',
    triggerSource: 'GPIO_PIN_5',
  },
  {
    id: '2',
    cameraName: 'Secondary Quality Camera',
    serialNo: 'CAM-2024-002',
    triggerMode: 'Level',
    triggerSource: 'GPIO_PIN_6',
  },
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    permissions: ['read', 'write', 'delete', 'configure'],
  },
  {
    id: '2',
    name: 'Inspector',
    permissions: ['read', 'write', 'validate'],
  },
  {
    id: '3',
    name: 'Operator',
    permissions: ['read', 'write'],
  },
];

export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    fullName: 'Administrator',
    role: 'Administrator' as const,
    email: 'admin@artivus.local',
  },
  {
    id: '2',
    username: 'john_op',
    fullName: 'John Operator',
    role: 'Operator' as const,
    email: 'john@artivus.local',
  },
  {
    id: '3',
    username: 'sarah_tech',
    fullName: 'Sarah Tech',
    role: 'Operator' as const,
    email: 'sarah@artivus.local',
  },
  {
    id: '4',
    username: 'mike_insp',
    fullName: 'Mike Inspector',
    role: 'Inspector' as const,
    email: 'mike@artivus.local',
  },
];

export const mockProductConfigurations = [
  {
    id: '1',
    name: 'Standard Assembly',
    description: 'Standard piston assembly with 4 rings',
    componentIds: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    name: 'High-Performance Assembly',
    description: 'Performance variant with enhanced rings',
    componentIds: ['1', '2', '3', '4'],
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: new Date(new Date().getTime() - 3600000 * 2),
    user: 'admin',
    role: 'Administrator',
    shift: 'Shift 1',
    module: 'Settings',
    action: 'Updated Camera Trigger Mode',
    oldValue: 'Level',
    newValue: 'Edge',
  },
  {
    id: '2',
    timestamp: new Date(new Date().getTime() - 3600000 * 5),
    user: 'mike_insp',
    role: 'Inspector',
    shift: 'Shift 1',
    module: 'Validation',
    action: 'Manual Override Approval',
    oldValue: 'Fail',
    newValue: 'Pass',
  },
];

export const mockShiftReports: ShiftReport[] = [
  {
    id: '1',
    shiftName: 'Shift 1',
    operator: 'John Operator',
    productionCount: 150,
    passCount: 145,
    failCount: 5,
    startTime: new Date(new Date().setHours(6, 0, 0, 0)),
    endTime: new Date(new Date().setHours(14, 0, 0, 0)),
  },
  {
    id: '2',
    shiftName: 'Shift 3',
    operator: 'Sarah Tech',
    productionCount: 200,
    passCount: 198,
    failCount: 2,
    startTime: new Date(new Date().setHours(22, 0, 0, 0) - 86400000),
    endTime: new Date(new Date().setHours(6, 0, 0, 0)),
  },
];
