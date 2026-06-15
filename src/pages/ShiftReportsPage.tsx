import React from 'react';
import { AppShell } from '../components/AppShell';
import { mockShiftReports } from '../data/mockData';
import { ClipboardList, Clock, CheckCircle, XCircle, Settings2 } from 'lucide-react';

export const ShiftReportsPage: React.FC = () => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const calculateEfficiency = (pass: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((pass / total) * 100);
  };

  return (
    <AppShell title="Shift Reports">
      <div className="h-full flex flex-col p-6 gap-6">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-accent/10 text-teal-accent rounded-lg">
              <ClipboardList size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-dark">Production Shift Reports</h2>
              <p className="text-xs text-gray-500">View performance metrics by shift</p>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockShiftReports.map(report => {
              const efficiency = calculateEfficiency(report.passCount, report.productionCount);
              return (
                <div key={report.id} className="card p-5 flex flex-col gap-4 hover:shadow-md transition-smooth">
                  <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="font-bold text-navy-dark text-lg">{report.shiftName}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock size={12} />
                        <span>
                          {formatTime(report.startTime)} - {formatTime(report.endTime)}
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                      <span className="text-xs font-semibold text-navy-dark">{report.operator}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Settings2 size={14} />
                        <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
                      </div>
                      <span className="text-2xl font-bold text-navy-dark">{report.productionCount}</span>
                    </div>
                    
                    <div className="bg-teal-accent/5 p-3 rounded-lg border border-teal-accent/20">
                      <div className="flex items-center gap-2 text-teal-accent mb-1">
                        <Settings2 size={14} />
                        <span className="text-xs font-semibold uppercase tracking-wider">Efficiency</span>
                      </div>
                      <span className="text-2xl font-bold text-teal-accent">{efficiency}%</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <div className="flex-1 flex items-center justify-between px-3 py-2 bg-status-success/10 rounded-lg border border-status-success/20">
                      <div className="flex items-center gap-2 text-status-success">
                        <CheckCircle size={14} />
                        <span className="text-xs font-bold uppercase">Pass</span>
                      </div>
                      <span className="font-mono font-bold text-status-success">{report.passCount}</span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-between px-3 py-2 bg-status-error/10 rounded-lg border border-status-error/20">
                      <div className="flex items-center gap-2 text-status-error">
                        <XCircle size={14} />
                        <span className="text-xs font-bold uppercase">Fail</span>
                      </div>
                      <span className="font-mono font-bold text-status-error">{report.failCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
