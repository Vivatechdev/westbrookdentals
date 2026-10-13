import React, { useState, useEffect } from 'react';
import { Save, Check, Building, Phone, Mail, MapPin, Database, ShieldCheck } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { ClinicSettings } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase';

export const ClinicSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    dataService.getSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await dataService.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <p className="text-sm font-semibold text-[#15324B]">Loading clinic settings...</p>
      </div>
    );
  }

  const supabaseConfigured = isSupabaseConfigured();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#15324B]">
            Clinic Settings & Configuration
          </h1>
          <p className="text-xs sm:text-sm text-[#5f7488]">
            Manage practice identity, contact placeholders, booking rules, and database connection.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#087F70] hover:bg-[#066559] transition-all shadow-xs text-xs sm:text-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Clinic Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Clinic settings successfully updated across the website!</span>
        </div>
      )}

      {/* Supabase Connection Status Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              supabaseConfigured ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#15324B]">Database Connection State</h2>
              <p className="text-xs text-[#5f7488]">
                {supabaseConfigured
                  ? 'Active Supabase project configured via environment variables.'
                  : 'Currently operating in resilient Local Storage Mode. All features and bookings are completely active!'}
              </p>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            supabaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {supabaseConfigured ? 'Connected' : 'Standalone / Local'}
          </span>
        </div>

        {!supabaseConfigured && (
          <div className="text-xs bg-[#F5F7FA] p-3.5 rounded-xl text-slate-600 space-y-1.5 border border-slate-200">
            <p className="font-semibold text-[#15324B]">To connect to a live Supabase project:</p>
            <p>1. Copy <code className="bg-white px-1 py-0.5 rounded border border-slate-200">.env.example</code> to <code className="bg-white px-1 py-0.5 rounded border border-slate-200">.env</code> and set <code className="font-mono text-[#087F70]">VITE_SUPABASE_URL</code> and <code className="font-mono text-[#087F70]">VITE_SUPABASE_ANON_KEY</code>.</p>
            <p>2. Run the SQL schema from <code className="font-mono text-[#087F70]">supabase/schema.sql</code> in your Supabase SQL Editor.</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Practice Identity Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#15324B] border-b border-slate-100 pb-2">
            Practice Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Clinic Brand Name</label>
              <input
                type="text"
                value={settings.clinicName}
                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#15324B] border-b border-slate-100 pb-2">
            Contact Channels (Placeholders)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Reception Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Emergency Dental Phone</label>
              <input
                type="text"
                value={settings.emergencyPhone}
                onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-rose-600 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Clinic Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Physical Address Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#15324B] border-b border-slate-100 pb-2">
            Address & Facility Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Address Line 1</label>
              <input
                type="text"
                value={settings.addressLine1}
                onChange={(e) => setSettings({ ...settings, addressLine1: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Address Line 2 / Suite</label>
              <input
                type="text"
                value={settings.addressLine2}
                onChange={(e) => setSettings({ ...settings, addressLine2: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">City</label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#15324B] mb-1">Postal Code</label>
              <input
                type="text"
                value={settings.postalCode}
                onChange={(e) => setSettings({ ...settings, postalCode: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Booking Rules Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#15324B] border-b border-slate-100 pb-2">
            Online Booking Governance
          </h2>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="onlineBooking"
              checked={settings.onlineBookingEnabled}
              onChange={(e) => setSettings({ ...settings, onlineBookingEnabled: e.target.checked })}
              className="w-4 h-4 text-[#087F70] rounded border-slate-300"
            />
            <label htmlFor="onlineBooking" className="text-sm font-bold text-[#15324B]">
              Allow patients to reserve appointment slots online 24/7
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#15324B] mb-1">
              Cancellation Policy Notice
            </label>
            <textarea
              rows={2}
              value={settings.cancellationPolicyNotice}
              onChange={(e) => setSettings({ ...settings, cancellationPolicyNotice: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-white bg-[#087F70] hover:bg-[#066559] transition-all shadow-sm text-sm"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};
