import React, { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import { History, Search, Filter } from 'lucide-react';

export const AuditTrailPage: React.FC = () => {
  const { auditLogs } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    log =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (date: Date | string | number) => {
    return new Date(date).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <AppShell title="Audit Trail">
      <div className="h-full flex flex-col p-6 gap-4">
        {/* Header & Controls */}
        <div className="flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-accent/10 text-teal-accent rounded-lg">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-dark">Change History</h2>
              <p className="text-xs text-gray-500">Track all system modifications</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-accent focus:ring-1 focus:ring-teal-accent w-64 transition-smooth"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-smooth">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="card flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 sticky top-0 bg-gray-50">
                  <th className="text-left py-3 px-4 font-bold text-navy-dark whitespace-nowrap">Date & Time</th>
                  <th className="text-left py-3 px-4 font-bold text-navy-dark">User</th>
                  <th className="text-left py-3 px-4 font-bold text-navy-dark">Role</th>
                  <th className="text-left py-3 px-4 font-bold text-navy-dark">Shift</th>
                  <th className="text-left py-3 px-4 font-bold text-navy-dark">Module</th>
                  <th className="text-left py-3 px-4 font-bold text-navy-dark">Action Performed</th>
                  <th className="text-left py-3 px-4 font-bold text-navy-dark">Old Value</th>
                  <th className="text-left py-3 px-4 font-bold text-navy-dark">New Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, idx) => (
                  <tr
                    key={log.id}
                    className={`border-b border-gray-100 hover:bg-gray-50/80 transition-smooth ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{formatDateTime(log.timestamp)}</td>
                    <td className="py-3 px-4 font-semibold text-navy-dark whitespace-nowrap">{log.user}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200">
                        {log.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{log.shift}</td>
                    <td className="py-3 px-4 font-medium text-navy-dark">{log.module}</td>
                    <td className="py-3 px-4 text-gray-700">{log.action}</td>
                    <td className="py-3 px-4 text-red-500 font-mono text-xs">{log.oldValue || '-'}</td>
                    <td className="py-3 px-4 text-status-success font-mono text-xs">{log.newValue || '-'}</td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      No audit logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
