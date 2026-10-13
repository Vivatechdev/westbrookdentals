import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Users, Award, Clock } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Dentist } from '../../types';

export const DentistManagementPage: React.FC = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDentist, setEditingDentist] = useState<Dentist | null>(null);
  const [isNew, setIsNew] = useState(false);

  const availableDays: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  useEffect(() => {
    loadDentists();
  }, []);

  const loadDentists = async () => {
    setLoading(true);
    const data = await dataService.getDentists();
    setDentists(data);
    setLoading(false);
  };

  const handleToggleActive = async (dentist: Dentist) => {
    const updated = { ...dentist, isActive: !dentist.isActive };
    await dataService.saveDentist(updated);
    await loadDentists();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this dentist profile?')) {
      await dataService.deleteDentist(id);
      await loadDentists();
    }
  };

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingDentist({
      id: `doc-${Date.now()}`,
      name: 'Dr. ',
      title: 'Dental Surgeon',
      qualifications: 'BDS (Placeholder)',
      registrationNumber: 'Reg #GDC-Demo (Placeholder)',
      bio: 'Dedicated dental clinician focusing on patient wellness and preventative care.',
      specialties: ['General Dentistry', 'Preventive Care'],
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      consultationFee: 65,
      isActive: true
    });
  };

  const handleDayToggle = (day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday') => {
    if (!editingDentist) return;
    const current = editingDentist.workingDays;
    const updated = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day];
    setEditingDentist({ ...editingDentist, workingDays: updated });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDentist || !editingDentist.name.trim()) return;

    await dataService.saveDentist(editingDentist);
    setEditingDentist(null);
    setIsNew(false);
    await loadDentists();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#15324B]">
            Clinician & Dentist Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5f7488]">
            Manage clinical staff, bios, clinical specialties, and weekly duty days.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#087F70] hover:bg-[#066559] transition-all shadow-xs text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Clinician</span>
        </button>
      </div>

      {/* Clinicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.map((dentist) => (
          <div
            key={dentist.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={dentist.avatarUrl}
                  alt={dentist.name}
                  className="w-16 h-16 rounded-xl object-cover object-top border border-slate-200 shrink-0"
                />
                <div className="flex-1 truncate">
                  <h3 className="text-base font-bold text-[#15324B] truncate">{dentist.name}</h3>
                  <p className="text-xs text-[#087F70] font-semibold">{dentist.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{dentist.registrationNumber}</p>
                </div>
              </div>

              <p className="text-xs text-[#5f7488] line-clamp-3 mb-3 leading-relaxed">
                {dentist.bio}
              </p>

              <div className="text-[11px] text-slate-600 mb-3 space-y-1">
                <p><strong>Clinical Days:</strong> {dentist.workingDays.join(', ')}</p>
                <p><strong>Fee Guide:</strong> ${dentist.consultationFee}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleActive(dentist)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  dentist.isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {dentist.isActive ? 'Active' : 'Inactive'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsNew(false);
                    setEditingDentist(dentist);
                  }}
                  className="p-1.5 text-slate-600 hover:text-[#087F70] rounded-lg hover:bg-slate-100"
                  title="Edit Clinician"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(dentist.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                  title="Delete Clinician"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingDentist && (
        <div className="fixed inset-0 z-50 bg-[#15324B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-bold text-[#15324B]">
                {isNew ? 'Register New Clinician' : 'Edit Clinician Profile'}
              </h2>
              <button
                type="button"
                onClick={() => setEditingDentist(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#15324B] mb-1">Clinician Name *</label>
                  <input
                    type="text"
                    required
                    value={editingDentist.name}
                    onChange={(e) => setEditingDentist({ ...editingDentist, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#15324B] mb-1">Title / Role</label>
                  <input
                    type="text"
                    required
                    value={editingDentist.title}
                    onChange={(e) => setEditingDentist({ ...editingDentist, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#15324B] mb-1">Qualifications (Placeholder)</label>
                  <input
                    type="text"
                    value={editingDentist.qualifications}
                    onChange={(e) => setEditingDentist({ ...editingDentist, qualifications: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#15324B] mb-1">Registration # (Placeholder)</label>
                  <input
                    type="text"
                    value={editingDentist.registrationNumber}
                    onChange={(e) => setEditingDentist({ ...editingDentist, registrationNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#15324B] mb-1">Clinician Biography</label>
                <textarea
                  rows={3}
                  value={editingDentist.bio}
                  onChange={(e) => setEditingDentist({ ...editingDentist, bio: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#15324B] mb-1">Photo Avatar URL</label>
                <input
                  type="url"
                  value={editingDentist.avatarUrl}
                  onChange={(e) => setEditingDentist({ ...editingDentist, avatarUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              {/* Working Days Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-[#15324B] mb-2">Duty Days at Clinic:</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDays.map((d) => {
                    const checked = editingDentist.workingDays.includes(d);
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => handleDayToggle(d)}
                        className={`p-2 rounded-lg text-xs font-bold border transition-colors ${
                          checked
                            ? 'bg-[#EAF7F4] text-[#087F70] border-[#087F70]'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDentist(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#087F70] hover:bg-[#066559]"
                >
                  Save Clinician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
