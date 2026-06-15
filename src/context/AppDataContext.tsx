import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PistonMasterRecord, ShiftConfiguration } from '../types';

interface AppDataContextType {
  shiftConfig: ShiftConfiguration[];
  setShiftConfig: React.Dispatch<React.SetStateAction<ShiftConfiguration[]>>;
  currentShift: string;
  pistonMasters: PistonMasterRecord[];
  addPistonMaster: (record: Omit<PistonMasterRecord, 'id'>) => void;
  updatePistonMaster: (id: string, record: Omit<PistonMasterRecord, 'id'>) => void;
  deletePistonMaster: (id: string) => void;
}

const DEFAULT_SHIFT_CONFIG: ShiftConfiguration[] = [
  { shiftName: 'Shift 1', startTime: '06:00', endTime: '14:00' },
  { shiftName: 'Shift 2', startTime: '14:00', endTime: '22:00' },
  { shiftName: 'Shift 3', startTime: '22:00', endTime: '06:00' },
];

const DEFAULT_PISTON_MASTERS: PistonMasterRecord[] = [
  { id: '1', pistonCode: 'TATA-7082-B', topRingCode: 'TR-001', middleRingCode: 'MR-001', oilRingCode: 'OR-001' },
  { id: '2', pistonCode: 'TATA-7090-C', topRingCode: 'TR-002', middleRingCode: 'MR-002', oilRingCode: 'OR-002' },
  { id: '3', pistonCode: 'BHEL-4500-A', topRingCode: 'TR-003', middleRingCode: 'MR-003', oilRingCode: 'OR-001' },
  { id: '4', pistonCode: 'CUMMINS-ISM-X', topRingCode: 'TR-004', middleRingCode: 'MR-004', oilRingCode: 'OR-002' },
];

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const parseTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const getShiftForTime = (date: Date, shifts: ShiftConfiguration[]) => {
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  for (const shift of shifts) {
    const startMinutes = parseTimeToMinutes(shift.startTime);
    const endMinutes = parseTimeToMinutes(shift.endTime);
    const isOvernight = endMinutes <= startMinutes;

    const matches = isOvernight
      ? currentMinutes >= startMinutes || currentMinutes < endMinutes
      : currentMinutes >= startMinutes && currentMinutes < endMinutes;

    if (matches) {
      return shift.shiftName;
    }
  }

  return shifts[0]?.shiftName || 'Shift 1';
};

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shiftConfig, setShiftConfig] = useState<ShiftConfiguration[]>(DEFAULT_SHIFT_CONFIG);
  const [pistonMasters, setPistonMasters] = useState<PistonMasterRecord[]>(DEFAULT_PISTON_MASTERS);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentShift = useMemo(() => getShiftForTime(now, shiftConfig), [now, shiftConfig]);

  const addPistonMaster = useCallback((record: Omit<PistonMasterRecord, 'id'>) => {
    setPistonMasters(prev => [
      {
        id: Math.random().toString(36).slice(2, 9),
        ...record,
      },
      ...prev,
    ]);
  }, []);

  const updatePistonMaster = useCallback((id: string, record: Omit<PistonMasterRecord, 'id'>) => {
    setPistonMasters(prev => prev.map(item => (item.id === id ? { id, ...record } : item)));
  }, []);

  const deletePistonMaster = useCallback((id: string) => {
    setPistonMasters(prev => prev.filter(item => item.id !== id));
  }, []);

  const value: AppDataContextType = {
    shiftConfig,
    setShiftConfig,
    currentShift,
    pistonMasters,
    addPistonMaster,
    updatePistonMaster,
    deletePistonMaster,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};