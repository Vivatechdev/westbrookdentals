import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileText, 
  User, 
  Phone, 
  Mail,
  Edit3
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Appointment, AppointmentStatus, Dentist } from '../../types';

export const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dentistFilter, setDentistFilter] = useState<string>('all');

  // Detail Modal
  const [activeModalAppt, setActiveModalAppt] = useState<Appointment | null>(null);
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [appts, docs] = await Promise.all([
      dataService.getAppointments(),
      dataService.getDentists()
    ]);
    setAppointments(appts);
    setDentists(docs);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    await dataService.updateAppointmentStatus(id, status);
    if (activeModalAppt && activeModalAppt.id === id) {
      setActiveModalAppt(prev => prev ? { ...prev, status } : null);
    }
    await loadData();
  };

  const handleSaveNotes = async () => {
    if (!activeModalAppt) return;
    await dataService.updateAppointmentStatus(activeModalAppt.id, activeModalAppt.status, editNotes);
    setActiveModalAppt(prev => prev ? { ...prev, notes: editNotes } : null);
    await loadData();
  };

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.patientEmail.toLowerCase().includes(search.toLowerCase()) ||
      a.patientPhone.includes(search);

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesDentist = dentistFilter === 'all' || a.dentistId === dentistFilter;

    return matchesSearch && matchesStatus && matchesDentist;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#15324B]">
          Appointments Management
        </h1>
        <p className="text-xs sm:text-sm text-[#5f7488]">
          Review and update all patient consultations, statuses, and clinical notes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference, patient, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#087F70]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={dentistFilter}
              onChange={(e) => setDentistFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#15324B] focus:outline-none focus:ring-2 focus:ring-[#087F70] bg-white"
            >
              <option value="all">All Clinicians</option>
              {dentists.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-[#15324B] text-white'
                  : 'bg-[#F5F7FA] text-[#5f7488] hover:bg-slate-200/70'
              }`}
            >
              {st} ({appointments.filter(a => st === 'all' ? true : a.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F5F7FA] text-slate-500 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ref #</th>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Treatment</th>
                <th className="py-3.5 px-4">Clinician</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Details & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No matching appointments found.
                  </td>
                </tr>
              ) : (
                filtered.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#15324B]">
                      {appt.referenceNumber}
                      {appt.isEmergency && (
                        <span className="block text-[10px] text-rose-600 font-extrabold">EMERGENCY</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#15324B]">{appt.patientName}</p>
                      <p className="text-[11px] text-slate-400">{appt.patientPhone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-[#253746]">
                      {appt.serviceName}
                    </td>
                    <td className="py-3.5 px-4 text-[#5f7488]">
                      {appt.dentistName}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#15324B]">
                      {appt.appointmentDate} @ {appt.appointmentTime}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                        appt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : appt.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : appt.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {appt.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModalAppt(appt);
                          setEditNotes(appt.notes || '');
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#087F70] bg-[#EAF7F4] hover:bg-[#087F70] hover:text-white transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Appointment Management Modal */}
      {activeModalAppt && (
        <div className="fixed inset-0 z-50 bg-[#15324B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-[#087F70]">
                  {activeModalAppt.referenceNumber}
                </span>
                <h3 className="text-xl font-bold text-[#15324B] mt-0.5">
                  Appointment Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalAppt(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 bg-[#F5F7FA] p-4 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-xs">Patient Name:</span>
                  <p className="font-bold text-[#15324B]">{activeModalAppt.patientName}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Contact Info:</span>
                  <p className="text-slate-700">{activeModalAppt.patientPhone}</p>
                  <p className="text-slate-500">{activeModalAppt.patientEmail}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Treatment:</span>
                  <p className="font-semibold text-[#15324B]">{activeModalAppt.serviceName}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Assigned Clinician:</span>
                  <p className="font-semibold text-[#15324B]">{activeModalAppt.dentistName}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Scheduled Slot:</span>
                  <p className="font-bold text-[#087F70]">{activeModalAppt.appointmentDate} at {activeModalAppt.appointmentTime}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Patient Type:</span>
                  <p className="font-medium text-slate-700">
                    {activeModalAppt.isExistingPatient ? 'Existing Patient' : 'New Registration'}
                  </p>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Change Appointment Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(activeModalAppt.id, 'confirmed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeModalAppt.status === 'confirmed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    Confirmed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(activeModalAppt.id, 'pending')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeModalAppt.status === 'pending'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(activeModalAppt.id, 'completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeModalAppt.status === 'completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(activeModalAppt.id, 'cancelled')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeModalAppt.status === 'cancelled'
                        ? 'bg-rose-600 text-white'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>

              {/* Clinical / Reception Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Clinical & Reception Notes:
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record symptoms, chair observations, or reschedule reasons..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F70] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-[#15324B] hover:bg-[#204667] text-white text-xs font-bold"
                >
                  Save Notes
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalAppt(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
