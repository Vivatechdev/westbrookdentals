import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Database,
  CalendarCheck,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Appointment, DentalService, Dentist, AppointmentStatus } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminDashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<DentalService[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    const [appts, srvs, docs] = await Promise.all([
      dataService.getAppointments(),
      dataService.getServices(),
      dataService.getDentists()
    ]);
    setAppointments(appts);
    setServices(srvs);
    setDentists(docs);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    await dataService.updateAppointmentStatus(id, newStatus);
    await loadAllData();
  };

  const totalAppts = appointments.length;
  const pendingAppts = appointments.filter(a => a.status === 'pending').length;
  const confirmedAppts = appointments.filter(a => a.status === 'confirmed').length;
  const completedAppts = appointments.filter(a => a.status === 'completed').length;
  const activeServices = services.filter(s => s.isActive).length;
  const activeDentists = dentists.filter(d => d.isActive).length;

  const supabaseActive = isSupabaseConfigured();

  return (
    <div className="space-y-8">
      {/* Top Welcome & System Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#15324B] tracking-tight">
            Clinic Overview Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#5f7488] mt-1">
            Real-time appointment schedule, patient bookings, and clinic operational metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {supabaseActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Supabase Cloud Connected</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200" title="Data stored in local persistence. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to sync to Supabase.">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Local Storage Mode (Ready for Supabase)</span>
            </span>
          )}

          <Link
            to="/book"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#087F70] hover:bg-[#066559] transition-all shadow-xs"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>New Walk-in Booking</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Appointments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
            <p className="text-2xl font-black text-[#15324B] mt-1">{totalAppts}</p>
            <span className="text-[11px] text-emerald-600 font-semibold">{confirmedAppts} Confirmed • {completedAppts} Done</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#EAF7F4] flex items-center justify-center text-[#087F70]">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Action */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Review</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{pendingAppts}</p>
            <span className="text-[11px] text-slate-500 font-medium">Awaiting clinical sign-off</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Dental Services */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dental Treatments</span>
            <p className="text-2xl font-black text-[#15324B] mt-1">{activeServices}</p>
            <span className="text-[11px] text-[#087F70] font-semibold">{services.length} Total Registered</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#EAF7F4] flex items-center justify-center text-[#087F70]">
            <Stethoscope className="w-6 h-6" />
          </div>
        </div>

        {/* Clinicians */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Clinicians</span>
            <p className="text-2xl font-black text-[#15324B] mt-1">{activeDentists}</p>
            <span className="text-[11px] text-slate-500 font-medium">On clinical rotation</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/appointments"
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#087F70]/50 transition-all hover:shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] flex items-center justify-center text-[#087F70]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#15324B]">Manage Appointments</p>
              <p className="text-xs text-[#5f7488]">Filter, reschedule or update patient statuses</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/admin/schedule"
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#087F70]/50 transition-all hover:shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#15324B]">Clinic Schedule Rules</p>
              <p className="text-xs text-[#5f7488]">Configure open hours, breaks & slot intervals</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/admin/services"
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#087F70]/50 transition-all hover:shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#15324B]">Dental Services Catalog</p>
              <p className="text-xs text-[#5f7488]">Add treatments, edit pricing guides & durations</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#15324B]">
              Recent Clinic Appointments
            </h2>
            <p className="text-xs text-[#5f7488]">
              Latest reservations booked online or at reception desk.
            </p>
          </div>
          <Link
            to="/admin/appointments"
            className="text-xs font-bold text-[#087F70] hover:underline flex items-center gap-1"
          >
            <span>View All ({totalAppts})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F5F7FA] text-slate-500 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Treatment</th>
                <th className="py-3 px-4">Clinician</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.slice(0, 6).map((appt) => (
                <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#15324B]">
                    {appt.referenceNumber}
                    {appt.isEmergency && (
                      <span className="ml-1.5 text-[10px] bg-rose-100 text-rose-700 px-1 py-0.5 rounded font-bold">
                        URGENT
                      </span>
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
                    {appt.appointmentDate} <span className="text-[#087F70]">@{appt.appointmentTime}</span>
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
                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {appt.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(appt.id, 'confirmed')}
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold"
                      >
                        Approve
                      </button>
                    )}
                    {appt.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(appt.id, 'completed')}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold"
                      >
                        Complete
                      </button>
                    )}
                    {appt.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(appt.id, 'cancelled')}
                        className="px-2 py-1 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 rounded text-[11px] font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
