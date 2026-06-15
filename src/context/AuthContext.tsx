import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, PlcStatus, AuditLog, UserRole } from '../types';
import { mockAuditLogs } from '../data/mockData';
import { useAppData } from './AppDataContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  plcStatus: PlcStatus;
  login: (username: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  setPlcStatus: (status: Partial<PlcStatus>) => void;
  currentShift: string;
  auditLogs: AuditLog[];
  addAuditLog: (module: string, action: string, oldValue?: string, newValue?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { currentShift } = useAppData();
  const [plcStatus, setPlcStatusState] = useState<PlcStatus>({
    isConnected: true,
    fixedScannerConnected: true,
    handScannerConnected: false,
    lastUpdate: new Date(),
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const login = useCallback(async (username: string, _password: string, role: string) => {
    const fullNameMap: Record<string, string> = {
      admin: 'Administrator',
      mike_insp: 'Mike Inspector',
      john_op: 'John Operator',
      sarah_tech: 'Sarah Tech',
    };
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      username,
      fullName: fullNameMap[username] ?? username,
      role: (role as UserRole) || 'Operator',
      email: `${username}@artivus.local`,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addAuditLog = useCallback((module: string, action: string, oldValue?: string, newValue?: string) => {
    setAuditLogs(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        user: user?.username || 'System',
        role: user?.role || 'Operator',
        shift: currentShift,
        module,
        action,
        oldValue,
        newValue,
      },
      ...prev,
    ]);
  }, [user, currentShift]);

  const setPlcStatus = useCallback((status: Partial<PlcStatus>) => {
    setPlcStatusState(prev => ({
      ...prev,
      ...status,
      lastUpdate: new Date(),
    }));
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    plcStatus,
    login,
    logout,
    setPlcStatus,
    currentShift,
    auditLogs,
    addAuditLog,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
