import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Circle } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { plcStatus } = useAuth();

  const StatusPill: React.FC<{
    label: string;
    isConnected: boolean;
  }> = ({ label, isConnected }) => (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
        isConnected
          ? 'bg-status-success/10 text-status-success'
          : 'bg-status-error/10 text-status-error'
      }`}
    >
      <Circle
        size={10}
        className={`fill-current flex-shrink-0 ${isConnected ? 'text-status-success' : 'text-status-error'}`}
      />
      {label}
    </div>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg h-12 flex items-center justify-between px-6 flex-shrink-0 z-40">
      <div className="text-xs text-gray-500">Artivus Systems - Piston O-Ring Assembly</div>

      <div className="flex items-center gap-3">
        <StatusPill label="PLC" isConnected={plcStatus.isConnected} />
        <StatusPill label="Fixed Scanner" isConnected={plcStatus.fixedScannerConnected} />
        <StatusPill label="Hand Scanner" isConnected={plcStatus.handScannerConnected} />
      </div>
    </div>
  );
};
