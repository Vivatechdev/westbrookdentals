import React, { useEffect, useState } from 'react';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';
import { Button } from '../common/Button';
import { dataService } from '../../services/dataService';
import { ClinicSettings, ClinicScheduleRule } from '../../types';

export const OpeningHoursContact: React.FC = () => {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [schedule, setSchedule] = useState<ClinicScheduleRule[]>([]);

  useEffect(() => {
    dataService.getSettings().then(setSettings).catch(() => {});
    dataService.getScheduleRules().then(setSchedule).catch(() => {});
  }, []);

  const phone = settings?.phone || '+1 (229) 232-0933';
  const rawPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <section className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Clinic details & location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Eyebrow>Location & Contact</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1F1E] tracking-tight">
                Visiting our clinic.
              </h2>
            </div>

            <p className="text-base text-[#5C6360] leading-relaxed">
              We are located at 580 California Street. Walk-ins during surgery hours are welcome.
            </p>

            <div className="space-y-4 border-t border-[#DDD8CF] pt-6 text-sm text-[#5C6360]">
              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] mb-1">
                  Address
                </span>
                <address className="not-italic leading-relaxed text-[#1B1F1E]">
                  {settings?.addressLine1 || '580 California St'}<br />
                  {settings?.addressLine2 ? <>{settings.addressLine2}<br /></> : null}
                  {settings?.city || 'San Francisco'}, {settings?.postalCode || 'CA 94104'}
                </address>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] mb-1">
                  Telephone
                </span>
                <a
                  href={`tel:${rawPhone}`}
                  className="text-[#1B1F1E] hover:text-[#0F4C4A] transition-colors font-medium"
                >
                  {phone}
                </a>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${settings?.email || 'hello@everbrook.sbs'}`}
                  className="text-[#1B1F1E] hover:text-[#0F4C4A] transition-colors"
                >
                  {settings?.email || 'hello@everbrook.sbs'}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Button to="/book" variant="primary" size="sm">
                Book appointment
              </Button>
            </div>
          </div>

          {/* Column 2: Hours as a clean table (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-[#DDD8CF] rounded-[2px] p-6 sm:p-8 bg-[#F6F3EE]/60">
              <h3 className="font-serif text-2xl text-[#1B1F1E] mb-6">
                Clinical schedule
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[#1B1F1E]">
                  <thead>
                    <tr className="border-b border-[#DDD8CF] text-xs uppercase tracking-wider text-[#5C6360]">
                      <th className="py-2.5 font-semibold">Day</th>
                      <th className="py-2.5 font-semibold">Opening Hours</th>
                      <th className="py-2.5 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD8CF]/70">
                    {schedule.map((rule) => (
                      <tr key={rule.dayOfWeek} className="hover:bg-[#EFEBE4]/50 transition-colors">
                        <td className="py-3 font-medium text-[#1B1F1E]">
                          {rule.dayOfWeek}
                        </td>
                        <td className="py-3 text-[#5C6360]">
                          {rule.isOpen ? `${rule.openTime} – ${rule.closeTime}` : 'Closed'}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`text-xs uppercase tracking-wider font-semibold ${
                              rule.isOpen ? 'text-[#0F4C4A]' : 'text-[#5C6360]'
                            }`}
                          >
                            {rule.isOpen ? 'Open' : 'Closed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {settings?.emergencyPhone && (
                <div className="mt-6 pt-6 border-t border-[#DDD8CF] text-xs text-[#5C6360]">
                  <span className="font-semibold text-[#1B1F1E] block mb-0.5">
                    Urgent or Emergency Care:
                  </span>
                  We reserve emergency appointment slots each working day. Call{' '}
                  <a
                    href={`tel:${settings.emergencyPhone.replace(/[^0-9+]/g, '')}`}
                    className="font-semibold text-[#0F4C4A] hover:underline"
                  >
                    {settings.emergencyPhone}
                  </a>{' '}
                  for priority clinical triage.
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
