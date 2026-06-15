import React, { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { mockInspectionReports, mockPistonModels, mockUsers } from '../data/mockData';
import { Search, Download } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const filteredReports = mockInspectionReports.filter(report => {
    if (selectedModel && report.pistonModel !== selectedModel) return false;
    if (selectedUser && report.userName !== selectedUser) return false;
    return true;
  });

  const stats = {
    total: filteredReports.length,
    pass: filteredReports.filter(r => r.status === 'pass').length,
    fail: filteredReports.filter(r => r.status === 'fail').length,
  };

  return (
    <AppShell title="Inspection Reports">
      <div className="h-full flex flex-col overflow-hidden p-6 gap-4">
        {/* Filter Section (Fixed Height) */}
        <div className="flex-shrink-0 space-y-3">
          {/* Filters */}
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy-dark mb-1">Model</label>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm"
              >
                <option value="">All Models</option>
                {mockPistonModels.map(model => (
                  <option key={model.id} value={model.modelCode}>
                    {model.modelCode}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-dark mb-1">User</label>
              <select
                value={selectedUser}
                onChange={e => setSelectedUser(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm"
              >
                <option value="">All Users</option>
                {mockUsers.map(user => (
                  <option key={user.id} value={user.fullName}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-dark mb-1">From</label>
              <input type="date" className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-dark mb-1">To</label>
              <input type="date" className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm" />
            </div>
          </div>

          {/* Search & Export */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search test number..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-gray-300 rounded text-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-teal-accent text-white rounded hover:bg-teal-accent/90 font-semibold text-sm whitespace-nowrap">
              <Download size={14} />
              Export
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
               <p className="text-xs uppercase tracking-wide text-gray-500">Total Inspections</p>
              <p className="text-3xl font-semibold text-gray-900 mt-1">{stats.total}  </p>
            </div>
             <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm">
               <p className="text-xs uppercase tracking-wide text-gray-500">  Pass</p>
               <p className="text-3xl font-semibold text-green-600 mt-1"> {stats.pass}</p>
            </div>
            <div className="bg-white border border-red-200 rounded-lg p-3 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-500">Fail</p>
              <p className="text-3xl font-semibold text-red-600 mt-1">{stats.fail}</p>
            </div>
          </div>
        </div>

        {/* Table Section (Scrollable) */}
        <div className="flex-1 overflow-hidden min-h-0 card flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-300 sticky top-0 bg-white">
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Test No</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Date</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Model</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Piston#</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Top Ring</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Mid Ring</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Oil Ring</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">User</th>
                  <th className="text-left py-2 px-2 font-semibold text-navy-dark">Shift</th>
                  <th className="text-center py-2 px-2 font-semibold text-navy-dark">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, idx) => (
                    <tr
                      key={report.testNo}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-smooth ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="py-1.5 px-2 font-mono text-teal-accent">{report.testNo}</td>
                      <td className="py-1.5 px-2">{report.testDate}</td>
                      <td className="py-1.5 px-2">{report.pistonModel}</td>
                      <td className="py-1.5 px-2 font-mono">{report.pistonNumber}</td>
                      <td className="py-1.5 px-2 font-mono text-gray-600">{report.topRingCode}</td>
                      <td className="py-1.5 px-2 font-mono text-gray-600">{report.midRingCode}</td>
                      <td className="py-1.5 px-2 font-mono text-gray-600">{report.oilRingCode}</td>
                      <td className="py-1.5 px-2">{report.userName}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200 rounded text-[10px] font-semibold">
                          {report.shift}
                        </span>
                      </td>
                      <td className="py-1.5 px-2">
                        <div className="flex justify-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${
                            report.status === 'pass'
                              ? 'bg-status-success/20 text-status-success'
                              : 'bg-status-error/20 text-status-error'
                          }`}>
                            {report.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-8 px-2 text-center text-gray-600 text-xs">
                      No records found
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
