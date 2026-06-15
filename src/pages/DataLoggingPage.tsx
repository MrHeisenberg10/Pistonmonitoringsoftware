import React, { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { mockPistonModels, mockComponentData } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';

export const DataLoggingPage: React.FC = () => {
  const { user } = useAuth();
  const [activeModel, setActiveModel] = useState(mockPistonModels[0]);
  const [pendingModel, setPendingModel] = useState(mockPistonModels[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleConfirmModel = () => {
    setActiveModel(pendingModel);
  };

  const isPendingDifferent = pendingModel.id !== activeModel.id;

  return (
    <AppShell title="Data Logging Dashboard">
      <div className="h-full flex flex-col overflow-hidden p-2 gap-1.5">
        <div className="grid grid-cols-1 xl:grid-cols-[250px_minmax(0,1fr)] gap-2 items-start flex-1 min-h-0">
          {/* Left: Image Section */}
          <div className="card border border-gray-200 p-2 min-h-48 overflow-hidden">
            <div className="h-full min-h-44 rounded-2xl bg-slate-900 text-white p-3 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/70">
                <span>Product Preview</span>
                <span className="truncate max-w-[110px]">{activeModel.name}</span>
              </div>
              <div className="flex items-center justify-center flex-1 py-2">
                <div className="w-24 h-24 rounded-full bg-white/8 border border-white/15 flex items-center justify-center shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                    <div className="text-2xl">⚙️</div>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Model Code</p>
                  {/* Increased font size for industrial visibility */}
                  <p className="text-base font-bold truncate">{activeModel.modelCode}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Target</p>
                  {/* Increased font size for industrial visibility */}
                  <p className="text-base font-bold text-white">{activeModel.targetCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Vertical Stack */}
          <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
            {/* Model Selector */}
            <div className="w-full max-w-[420px]">
              <label className="block text-xs font-semibold text-navy-dark mb-2 uppercase tracking-wide">Select Model</label>
              <div className="flex gap-2 items-start">
                <div className="relative flex-1 min-w-0">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3 py-2 bg-teal-accent/10 border border-teal-accent rounded-xl flex items-center justify-between hover:bg-teal-accent/20 transition-smooth text-left font-semibold text-navy-dark shadow-sm"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-gray-600">Pending Selection</div>
                      <div className="text-sm truncate">{pendingModel.modelCode}</div>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-teal-accent flex-shrink-0 transition-smooth ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      {mockPistonModels.map(model => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setPendingModel(model);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-teal-accent/10 border-b border-gray-100 last:border-b-0 transition-smooth text-sm"
                        >
                          <div className="font-semibold text-navy-dark">{model.modelCode}</div>
                          <div className="text-xs text-gray-600">{model.name}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleConfirmModel}
                  disabled={!isPendingDifferent}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap shadow-sm transition-smooth ${
                    isPendingDifferent
                      ? 'bg-navy-dark text-white hover:bg-navy-dark/90'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Model
                </button>
              </div>

              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className={`rounded-lg border px-3 py-2 ${isPendingDifferent ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white'}`}>
                  <p className="uppercase tracking-wide text-gray-500 font-semibold">Active Model</p>
                  <p className="font-bold text-navy-dark text-sm truncate">{activeModel.modelCode}</p>
                </div>
                <div className={`rounded-lg border px-3 py-2 ${isPendingDifferent ? 'border-teal-accent bg-teal-accent/5' : 'border-gray-200 bg-white'}`}>
                  <p className="uppercase tracking-wide text-gray-500 font-semibold">Pending Model</p>
                  <p className={`font-bold text-sm truncate ${isPendingDifferent ? 'text-teal-accent' : 'text-navy-dark'}`}>{pendingModel.modelCode}</p>
                </div>
              </div>
            </div>

            {/* Operator Info */}
            <div className="card p-2 space-y-1.5 min-h-[84px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-2">
                  {/* Increased label and counter sizes */}
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Production Counter</p>
                  <p className="text-4xl font-bold text-teal-accent leading-none">{mockComponentData[0]?.currentCount || 0}</p>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Target Status</p>
                  {/* Increased target info font size */}
                  <p className="text-sm font-bold text-navy-dark">{activeModel.targetCount} units planned</p>
                  <div className="mt-1.5 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-accent h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((mockComponentData[0]?.currentCount / activeModel.targetCount) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((mockComponentData[0]?.currentCount / activeModel.targetCount) * 100)}% complete
                  </p>
                </div>
              </div>
            </div>

            {/* Assembly Components */}
            <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
              <div className="flex items-center justify-between flex-shrink-0">
                {/* Increased section heading size */}
                <h3 className="text-base font-bold text-navy-dark">Assembly Components</h3>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  {mockComponentData.length} components
                </span>
              </div>

              <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden pr-1">
                {mockComponentData.map(component => (
                  <div
                    key={component.id}
                    className="card-hover p-3 flex items-center gap-3 border border-gray-200 min-w-0 w-full min-h-[76px]"
                  >
                    <div
                      className={`w-1.5 self-stretch rounded-full ${
                        component.status === 'validated' ? 'bg-status-success' : 'bg-status-error'
                      }`}
                    ></div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {/* Increased component name size significantly */}
                        <h4 className="font-bold text-base text-navy-dark truncate">{component.componentName}</h4>
                        {/* Increased count badge size */}
                        <span className="status-badge text-sm font-bold whitespace-nowrap px-2.5 py-0.5">
                          {component.currentCount}/{component.targetCount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                        <div
                          className="bg-teal-accent h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(component.currentCount / component.targetCount) * 100}%`,
                          }}
                        ></div>
                      </div>
                      {/* Slightly larger QR code label */}
                      <div className="text-xs font-mono text-gray-500 truncate" title={component.qrCode}>
                        {component.qrCode}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-1 rounded text-sm font-semibold whitespace-nowrap shrink-0">
                      {component.status === 'validated' ? (
                        <>
                          <CheckCircle2 size={16} className="text-status-success flex-shrink-0" />
                          <span className="text-status-success">OK</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} className="text-status-error flex-shrink-0" />
                          <span className="text-status-error">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
