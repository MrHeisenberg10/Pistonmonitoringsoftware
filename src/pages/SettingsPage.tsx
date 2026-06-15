import React, { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { mockRoles, mockIoSettings, mockCameraSettings } from '../data/mockData';
import { Edit, Trash2, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { ShiftConfiguration } from '../types';

type SettingsTab = 'roles' | 'io' | 'camera' | 'scanner' | 'shifts';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('roles');
  const { addAuditLog, user } = useAuth();
  const { shiftConfig, setShiftConfig } = useAppData();

  // Local state for shift editor — a copy to allow editing before save
  const [localShifts, setLocalShifts] = useState<ShiftConfiguration[]>(shiftConfig);
  const [shiftSaved, setShiftSaved] = useState(false);

  const handleMockAction = (action: string, oldVal?: string, newVal?: string) => {
    if (user && ['Administrator', 'Inspector'].includes(user.role)) {
      addAuditLog('Settings', action, oldVal, newVal);
    }
  };

  const handleShiftTimeChange = (
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    setLocalShifts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setShiftSaved(false);
  };

  const handleSaveShifts = () => {
    setShiftConfig(localShifts);
    setShiftSaved(true);
    addAuditLog(
      'Settings',
      'Updated Shift Configuration',
      JSON.stringify(shiftConfig.map(s => `${s.shiftName}: ${s.startTime}-${s.endTime}`)),
      JSON.stringify(localShifts.map(s => `${s.shiftName}: ${s.startTime}-${s.endTime}`))
    );
    setTimeout(() => setShiftSaved(false), 3000);
  };

  const tabs = [
    { id: 'roles', label: 'Roles & Users' },
    { id: 'io', label: 'IO Settings' },
    { id: 'camera', label: 'Camera' },
    { id: 'scanner', label: 'Scanner' },
    { id: 'shifts', label: 'Shift Configuration' },
  ];

  // Validate that no shifts overlap (basic check)
  const hasTimeConflict = false; // Could implement overlap detection if needed

  return (
    <AppShell title="Settings">
      <div className="h-full flex flex-col overflow-hidden p-6 gap-4">
        {/* Tab Navigation (Fixed Height) */}
        <div className="flex-shrink-0 flex gap-2 border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`px-4 py-2 font-semibold transition-smooth border-b-2 whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? 'border-teal-accent text-teal-accent'
                  : 'border-transparent text-gray-600 hover:text-navy-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section (Scrollable) */}
        <div className="flex-1 overflow-hidden min-h-0">
          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="h-full flex flex-col gap-3">
              <button onClick={() => handleMockAction('Added Role', 'None', 'New Role')} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/90 transition-smooth font-semibold text-sm w-fit">
                <Plus size={16} />
                Add Role
              </button>
              <div className="card flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 sticky top-0 bg-white">
                        <th className="text-left py-2.5 px-3 font-semibold text-navy-dark">Role</th>
                        <th className="text-left py-2.5 px-3 font-semibold text-navy-dark">Permissions</th>
                        <th className="text-center py-2.5 px-3 font-semibold text-navy-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRoles.map((role, idx) => (
                        <tr key={role.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-smooth ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="py-2 px-3 font-semibold text-navy-dark text-sm">{role.name}</td>
                          <td className="py-2 px-3">
                            <div className="flex gap-1 flex-wrap">
                              {role.permissions?.map(perm => (
                                <span key={perm} className="px-2 py-1 bg-teal-accent/10 text-teal-accent rounded text-xs">
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => handleMockAction(`Edited Role ${role.name}`, role.name, 'Updated Name')} className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-smooth">
                                <Edit size={14} />
                              </button>
                              <button onClick={() => handleMockAction(`Deleted Role ${role.name}`, role.name, 'None')} className="p-1 hover:bg-red-50 rounded text-red-600 transition-smooth">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* IO Settings Tab */}
          {activeTab === 'io' && (
            <div className="h-full flex flex-col gap-3">
              <button className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/90 transition-smooth font-semibold text-sm w-fit">
                <Plus size={16} />
                Add Setting
              </button>
              <div className="card flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 sticky top-0 bg-white">
                        <th className="text-left py-2.5 px-3 font-semibold text-navy-dark">Data Name</th>
                        <th className="text-left py-2.5 px-3 font-semibold text-navy-dark">Register</th>
                        <th className="text-left py-2.5 px-3 font-semibold text-navy-dark">Type</th>
                        <th className="text-center py-2.5 px-3 font-semibold text-navy-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockIoSettings.map((setting, idx) => (
                        <tr key={setting.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-smooth ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="py-2 px-3 font-medium text-navy-dark text-sm">{setting.dataName}</td>
                          <td className="py-2 px-3 font-mono text-xs text-gray-600">{setting.registerNo}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              setting.ioType === 'Input'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {setting.ioType}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex justify-center gap-2">
                              <button className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-smooth">
                                <Edit size={14} />
                              </button>
                              <button className="p-1 hover:bg-red-50 rounded text-red-600 transition-smooth">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Camera Settings Tab */}
          {activeTab === 'camera' && (
            <div className="overflow-y-auto space-y-2 pr-2">
              {mockCameraSettings.map(camera => (
                <div key={camera.id} className="card p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-navy-dark">{camera.cameraName}</h4>
                      <p className="text-xs text-gray-600">S/N: {camera.serialNo}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-smooth">
                        <Edit size={14} />
                      </button>
                      <button className="p-1 hover:bg-red-50 rounded text-red-600 transition-smooth">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Trigger Mode</span>
                      <p className="font-semibold text-navy-dark">{camera.triggerMode}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Trigger Source</span>
                      <p className="font-semibold text-navy-dark">{camera.triggerSource}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scanner Configuration Tab */}
          {activeTab === 'scanner' && (
            <div className="overflow-y-auto pr-2">
              <div className="card p-4 max-w-2xl">
                <h3 className="text-sm font-bold text-navy-dark mb-4">Scanner Settings</h3>

                <div className="space-y-4">
                  {/* Fixed Scanner */}
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-sm text-navy-dark mb-2">Fixed Scanner</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">COM Port</label>
                        <input type="text" placeholder="COM1" className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Baud Rate</label>
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm">
                          <option>9600</option>
                          <option>19200</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Hand Scanner */}
                  <div>
                    <h4 className="font-semibold text-sm text-navy-dark mb-2">Hand Scanner</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">COM Port</label>
                        <input type="text" placeholder="COM2" className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Baud Rate</label>
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm">
                          <option>9600</option>
                          <option>19200</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => handleMockAction('Saved Scanner Settings', 'Old Settings', 'New Settings')} className="px-4 py-2 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/90 transition-smooth font-semibold text-sm">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shift Configuration Tab */}
          {activeTab === 'shifts' && (
            <div className="h-full overflow-y-auto pr-2">
              <div className="max-w-2xl space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-teal-accent/10 text-teal-accent rounded-lg">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-dark">Shift Configuration</h3>
                    <p className="text-xs text-gray-500">
                      Define start and end times for each production shift. Changes apply globally across all modules.
                    </p>
                  </div>
                </div>

                {/* Shift rows */}
                <div className="card border border-gray-200 overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-[180px_1fr_1fr] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-bold text-navy-dark uppercase tracking-wider">Shift</span>
                    <span className="text-xs font-bold text-navy-dark uppercase tracking-wider">Start Time</span>
                    <span className="text-xs font-bold text-navy-dark uppercase tracking-wider">End Time</span>
                  </div>

                  {localShifts.map((shift, index) => (
                    <div
                      key={shift.shiftName}
                      className={`grid grid-cols-[180px_1fr_1fr] gap-4 items-center px-5 py-4 ${
                        index < localShifts.length - 1 ? 'border-b border-gray-100' : ''
                      } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                    >
                      {/* Shift label */}
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-amber-400' : 'bg-purple-400'
                        }`} />
                        <span className="font-semibold text-navy-dark text-sm">{shift.shiftName}</span>
                      </div>

                      {/* Start time */}
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={shift.startTime}
                          onChange={e => handleShiftTimeChange(index, 'startTime', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent text-sm font-mono bg-white w-full max-w-[140px]"
                        />
                      </div>

                      {/* End time */}
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={shift.endTime}
                          onChange={e => handleShiftTimeChange(index, 'endTime', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent text-sm font-mono bg-white w-full max-w-[140px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info note */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-800">
                  <p className="font-semibold mb-1">⚠ Overnight Shifts Supported</p>
                  <p>If a shift's end time is earlier than its start time (e.g., 22:00 → 06:00), it is automatically treated as an overnight shift spanning midnight.</p>
                </div>

                {/* Current shift indicator */}
                <div className="card border border-gray-200 p-4 flex items-center gap-4">
                  <div className="p-2 bg-teal-accent/10 rounded-lg">
                    <Clock size={16} className="text-teal-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Currently Active Shift</p>
                    <p className="text-base font-bold text-navy-dark">
                      {shiftConfig.find(s => {
                        const now = new Date();
                        const currentMinutes = now.getHours() * 60 + now.getMinutes();
                        const start = s.startTime.split(':').map(Number);
                        const end = s.endTime.split(':').map(Number);
                        const startMin = start[0] * 60 + start[1];
                        const endMin = end[0] * 60 + end[1];
                        const isOvernight = endMin <= startMin;
                        return isOvernight
                          ? currentMinutes >= startMin || currentMinutes < endMin
                          : currentMinutes >= startMin && currentMinutes < endMin;
                      })?.shiftName || 'Shift 1'}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Based on saved configuration</p>
                  </div>
                </div>

                {/* Save button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveShifts}
                    className="px-5 py-2.5 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/90 transition-smooth font-semibold text-sm"
                  >
                    Save Shift Configuration
                  </button>
                  {shiftSaved && (
                    <div className="flex items-center gap-2 text-sm text-status-success font-semibold">
                      <CheckCircle2 size={16} />
                      Saved successfully
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
