import React, { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'fail';
}


export const ValidationPage: React.FC = () => {
  const { addAuditLog, user } = useAuth();
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([
    {
      id: '1',
      name: 'Correct Piston Selected',
      description: 'Verify that the correct piston model is selected in the system',
      status: 'pass',
    },
    {
      id: '2',
      name: 'Correct Ring Selected',
      description: 'Ensure all required rings are scanned and selected',
      status: 'pass',
    },
    {
      id: '3',
      name: 'Correct Sequence',
      description: 'Validate that assembly sequence follows the specification',
      status: 'fail',
    },
    {
      id: '4',
      name: 'Quality Check',
      description: 'All components pass visual and dimensional inspection',
      status: 'pass',
    },
    {
      id: '5',
      name: 'Traceability Data Complete',
      description: 'All required QR codes and serial numbers are captured',
      status: 'pass',
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setValidationRules(prev =>
        prev.map(rule => ({
          ...rule,
          status: Math.random() > 0.3 ? 'pass' : 'fail',
        }))
      );
      if (user && ['Administrator', 'Inspector'].includes(user.role)) {
        addAuditLog('Validation', 'Refreshed validation rules', 'N/A', 'N/A');
      }
      setIsRefreshing(false);
    }, 1000);
  };

  const passCount = validationRules.filter(r => r.status === 'pass').length;
  const failCount = validationRules.filter(r => r.status === 'fail').length;
  const passPercentage = Math.round((passCount / validationRules.length) * 100);

  return (
    <AppShell title="Validation Rules">
      <div className="h-full flex flex-col overflow-hidden p-4 gap-3">
        {/* Overall Status */}
        <div className="flex-shrink-0 bg-white border border-gray-200 shadow-sm p-3 rounded-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-tight text-navy-dark">Overall Status</h3>
              <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-wider">LAST_CHK: {new Date().toLocaleTimeString()}</p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-1.5 bg-navy-dark text-white rounded-sm hover:bg-navy-dark/90 disabled:opacity-50 font-semibold text-xs tracking-wide transition-smooth"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              REFRESH
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex items-center gap-3">
              <div className="text-xl font-mono font-bold text-status-success">{passPercentage}%</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-wider">
                <p>Pass Rate</p>
                <p className="font-bold text-status-success">{passCount}/{validationRules.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
              <div className="text-xl font-mono font-bold text-status-success">{passCount}</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-wider">
                <p>Validated</p>
                <p className="font-bold text-status-success">Rules</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
              <div className="text-xl font-mono font-bold text-status-error">{failCount}</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-wider">
                <p>Rejected</p>
                <p className="font-bold text-status-error">Rules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Log */}
        <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-sm shadow-sm p-3 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest px-1">Details Log</h3>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Live validation feed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full overflow-hidden">
            {validationRules.map(rule => {
              const isPass = rule.status === 'pass';
              return (
                <div
                  key={rule.id}
                  className="flex items-center justify-between p-2 rounded border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-smooth min-w-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2.5 h-2.5 flex-shrink-0 rounded-sm ${rule.status === 'pass' ? 'bg-status-success' : 'bg-status-error'}`} />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-navy-dark uppercase tracking-tight truncate">{rule.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{rule.description}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-sm border text-[10px] font-bold whitespace-nowrap tracking-wider shrink-0 ${
                      isPass
                        ? 'border-status-success/30 bg-status-success/10 text-status-success'
                        : 'border-status-error/30 bg-status-error/10 text-status-error'
                    }`}
                  >
                    {isPass ? 'VALIDATED' : 'REJECTED'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
