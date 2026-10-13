import React, { useState, useEffect } from 'react';
import { Clock, Check, Save, AlertCircle, Calendar } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { ClinicScheduleRule } from '../../types';

export const SchedulePage: React.FC = () => {
  const [rules, setRules] = useState<ClinicScheduleRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewDay, setPreviewDay] = useState<string>('Monday');
  const [previewSlots, setPreviewSlots] = useState<string[]>([]);

  useEffect(() => {
    dataService.getScheduleRules().then((data) => {
      setRules(data);
      setLoading(false);
    });
  }, []);

  // Update preview slots whenever rules change
  useEffect(() => {
    const today = new Date();
    // Get next occurrence of previewDay
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDayIndex = days.indexOf(previewDay);
    const diff = (targetDayIndex - today.getDay() + 7) % 7 || 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');

    dataService.getAvailableTimeSlots(`${yyyy}-${mm}-${dd}`).then((slots) => {
      setPreviewSlots(slots);
    });
  }, [rules, previewDay]);

  const handleRuleChange = (index: number, field: keyof ClinicScheduleRule, value: any) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [field]: value };
    setRules(updated);
  };

  const handleSave = async () => {
    await dataService.saveScheduleRules(rules);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <p className="text-sm font-semibold text-[#15324B]">Loading schedule parameters...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#15324B]">
            Availability & Clinic Schedule
          </h1>
          <p className="text-xs sm:text-sm text-[#5f7488]">
            Manage weekly clinic opening hours, lunch breaks, and appointment slot increments.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#087F70] hover:bg-[#066559] transition-all shadow-xs text-xs sm:text-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Schedule Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Clinic operating hours and slot rules successfully updated!</span>
        </div>
      )}

      {/* Rules Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-base font-bold text-[#15324B]">
            Weekly Operating Schedule
          </h2>
          <p className="text-xs text-[#5f7488]">
            Patients can only book online during open windows outside scheduled staff breaks.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {rules.map((rule, idx) => (
            <div key={rule.dayOfWeek} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Day & Open Toggle */}
              <div className="flex items-center gap-4 md:w-48">
                <input
                  type="checkbox"
                  id={`open-${rule.dayOfWeek}`}
                  checked={rule.isOpen}
                  onChange={(e) => handleRuleChange(idx, 'isOpen', e.target.checked)}
                  className="w-4 h-4 text-[#087F70] rounded border-slate-300 focus:ring-[#087F70]"
                />
                <label htmlFor={`open-${rule.dayOfWeek}`} className="text-sm font-bold text-[#15324B]">
                  {rule.dayOfWeek}
                </label>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${rule.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                  {rule.isOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </div>

              {/* Hours Config if Open */}
              {rule.isOpen ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">Open Time</label>
                    <input
                      type="time"
                      value={rule.openTime}
                      onChange={(e) => handleRuleChange(idx, 'openTime', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">Close Time</label>
                    <input
                      type="time"
                      value={rule.closeTime}
                      onChange={(e) => handleRuleChange(idx, 'closeTime', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">Break Start</label>
                    <input
                      type="time"
                      value={rule.breakStart || ''}
                      onChange={(e) => handleRuleChange(idx, 'breakStart', e.target.value || undefined)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">Break End</label>
                    <input
                      type="time"
                      value={rule.breakEnd || ''}
                      onChange={(e) => handleRuleChange(idx, 'breakEnd', e.target.value || undefined)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic flex-1">
                  Clinic is closed on this day. No slots will be generated.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Slot Generator Preview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-[#15324B]">
              Slot Calculation Preview
            </h2>
            <p className="text-xs text-[#5f7488]">
              Verify generated booking slots for any day under the current schedule rules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Preview day:</span>
            <select
              value={previewDay}
              onChange={(e) => setPreviewDay(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-[#15324B] bg-[#F5F7FA]"
            >
              {rules.map(r => (
                <option key={r.dayOfWeek} value={r.dayOfWeek}>{r.dayOfWeek}</option>
              ))}
            </select>
          </div>
        </div>

        {previewSlots.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No slots generated (Clinic is closed or fully booked on {previewDay}).</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {previewSlots.map((slot) => (
              <span
                key={slot}
                className="p-2 text-center rounded-lg bg-[#EAF7F4] text-[#087F70] font-mono text-xs font-bold"
              >
                {slot}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
