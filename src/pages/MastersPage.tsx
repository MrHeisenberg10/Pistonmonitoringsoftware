import React, { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { PistonMasterRecord } from '../types';

type ModalMode = 'add' | 'edit';

interface ModalState {
  isOpen: boolean;
  mode: ModalMode;
  itemId?: string;
}

interface FormState {
  pistonCode: string;
  topRingCode: string;
  middleRingCode: string;
  oilRingCode: string;
}

const EMPTY_FORM: FormState = {
  pistonCode: '',
  topRingCode: '',
  middleRingCode: '',
  oilRingCode: '',
};

export const MastersPage: React.FC = () => {
  const { user, addAuditLog } = useAuth();
  const { pistonMasters, addPistonMaster, updatePistonMaster, deletePistonMaster } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<ModalState>({ isOpen: false, mode: 'add' });
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const filteredMasters = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return pistonMasters;

    return pistonMasters.filter(master =>
      [master.pistonCode, master.topRingCode, master.middleRingCode, master.oilRingCode]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [pistonMasters, searchTerm]);

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setModal({ isOpen: true, mode: 'add' });
  };

  const openEditModal = (record: PistonMasterRecord) => {
    setForm({
      pistonCode: record.pistonCode,
      topRingCode: record.topRingCode,
      middleRingCode: record.middleRingCode,
      oilRingCode: record.oilRingCode,
    });
    setModal({ isOpen: true, mode: 'edit', itemId: record.id });
  };

  const closeModal = () => {
    setModal({ isOpen: false, mode: 'add' });
    setForm(EMPTY_FORM);
  };

  const handleDelete = (record: PistonMasterRecord) => {
    const confirmed = window.confirm(`Delete piston mapping ${record.pistonCode}?`);
    if (!confirmed) return;

    deletePistonMaster(record.id);
    if (user) {
      addAuditLog('Masters', `Deleted piston mapping ${record.pistonCode}`, record.pistonCode, 'Deleted');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (modal.mode === 'add') {
      addPistonMaster(form);
      if (user) {
        addAuditLog('Masters', `Created piston mapping ${form.pistonCode}`, 'New', form.pistonCode);
      }
    } else if (modal.itemId) {
      updatePistonMaster(modal.itemId, form);
      if (user) {
        addAuditLog('Masters', `Updated piston mapping ${form.pistonCode}`, 'Old', form.pistonCode);
      }
    }

    closeModal();
  };

  useEffect(() => {
    if (!modal.isOpen) return;
  }, [modal.isOpen]);

  return (
    <AppShell title="Masters">
      <div className="h-full flex flex-col overflow-hidden p-5 gap-4">
        <div className="flex-shrink-0 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-navy-dark">Piston Ring Code Master</h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage piston codes and their associated ring codes for validation and traceability.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-3 py-2 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/90 transition-smooth font-semibold text-sm whitespace-nowrap"
          >
            <Plus size={16} />
            Add Record
          </button>
        </div>

        <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="card p-3 border border-gray-200">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Total Records</p>
            <p className="text-2xl font-bold text-navy-dark mt-1">{pistonMasters.length}</p>
          </div>
          <div className="card p-3 border border-gray-200">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Filtered Results</p>
            <p className="text-2xl font-bold text-teal-accent mt-1">{filteredMasters.length}</p>
          </div>
          <div className="card p-3 border border-gray-200">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Managed By</p>
            <p className="text-sm font-bold text-navy-dark mt-1">Administrator</p>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search piston or ring codes..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent text-sm bg-white"
            />
          </div>
        </div>

        <div className="flex-1 min-h-0 card border border-gray-200 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 sticky top-0 bg-white z-10">
                  <th className="text-left py-3 px-4 font-semibold text-navy-dark">Piston Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-dark">Top Ring Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-dark">Middle Ring Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-dark">Oil Ring Code</th>
                  <th className="text-center py-3 px-4 font-semibold text-navy-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMasters.length > 0 ? (
                  filteredMasters.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-smooth ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                    >
                      <td className="py-3 px-4 font-mono text-teal-accent font-semibold text-sm">{record.pistonCode}</td>
                      <td className="py-3 px-4 font-mono text-gray-700">{record.topRingCode}</td>
                      <td className="py-3 px-4 font-mono text-gray-700">{record.middleRingCode}</td>
                      <td className="py-3 px-4 font-mono text-gray-700">{record.oilRingCode}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEditModal(record)}
                            className="p-1.5 hover:bg-blue-50 rounded text-blue-600 transition-smooth"
                            aria-label={`Edit ${record.pistonCode}`}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(record)}
                            className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-smooth"
                            aria-label={`Delete ${record.pistonCode}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      No piston master records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
            <h2 className="text-lg font-bold text-navy-dark mb-1">
              {modal.mode === 'add' ? 'Add Piston Record' : 'Edit Piston Record'}
            </h2>
            <p className="text-xs text-gray-500 mb-5">
              Enter the piston code and the associated ring codes used for validation and traceability.
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-navy-dark mb-1">Piston Code</label>
                <input
                  type="text"
                  required
                  value={form.pistonCode}
                  onChange={e => setForm(prev => ({ ...prev, pistonCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent text-sm"
                  placeholder="Example: TATA-7082-B"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-dark mb-1">Top Ring Code</label>
                <input
                  type="text"
                  required
                  value={form.topRingCode}
                  onChange={e => setForm(prev => ({ ...prev, topRingCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent text-sm"
                  placeholder="TR-001"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-dark mb-1">Middle Ring Code</label>
                <input
                  type="text"
                  required
                  value={form.middleRingCode}
                  onChange={e => setForm(prev => ({ ...prev, middleRingCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent text-sm"
                  placeholder="MR-001"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-navy-dark mb-1">Oil Ring Code</label>
                <input
                  type="text"
                  required
                  value={form.oilRingCode}
                  onChange={e => setForm(prev => ({ ...prev, oilRingCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent text-sm"
                  placeholder="OR-001"
                />
              </div>

              <div className="md:col-span-2 flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/90 transition-smooth font-medium text-sm"
                >
                  {modal.mode === 'add' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
};
