import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Eyebrow } from '../../components/common/Eyebrow';
import { Button } from '../../components/common/Button';
import { dataService } from '../../services/dataService';
import { Appointment, ClinicSettings } from '../../types';

export const BookingConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference') || '';
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      reference ? dataService.getAppointmentById(reference) : dataService.getAppointments().then(l => l[0] || null),
      dataService.getSettings()
    ]).then(([appt, setts]) => {
      setAppointment(appt || null);
      setSettings(setts);
      setLoading(false);
    });
  }, [reference]);

  if (loading) {
    return (
      <div className="bg-[#F6F3EE] min-h-[60vh] flex items-center justify-center p-6">
        <p className="text-sm text-[#5C6360]">Loading appointment confirmation...</p>
      </div>
    );
  }

  const phone = settings?.phone || '+1 (229) 232-0933';
  const rawPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <div className="bg-[#F6F3EE] py-12 md:py-20 min-h-screen">
      <Container narrow>
        <div className="max-w-[640px] mx-auto space-y-10">

          {/* Calm Header */}
          <div className="space-y-3 text-center sm:text-left border-b border-[#DDD8CF] pb-6">
            <Eyebrow>Booking Confirmed</Eyebrow>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1B1F1E] tracking-tight">
              Your appointment is booked.
            </h1>
            <p className="text-sm text-[#5C6360]">
              We have reserved your slot in the clinic diary. A reference number has been generated below.
            </p>
          </div>

          {/* Calm Summary Card */}
          {appointment && (
            <div className="bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] p-6 sm:p-8 space-y-6">
              {/* Reference */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#DDD8CF] pb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#5C6360]">
                  Booking Reference
                </span>
                <span className="font-mono text-xl font-bold text-[#1B1F1E]">
                  {appointment.referenceNumber}
                </span>
              </div>

              {/* Service, Date, Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#5C6360] block mb-1">
                    Treatment
                  </span>
                  <p className="font-serif text-xl text-[#1B1F1E]">
                    {appointment.serviceName}
                  </p>
                  <p className="text-xs text-[#5C6360] mt-0.5">
                    Duration: ~{appointment.durationMinutes} mins
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-[#5C6360] block mb-1">
                    Date & Time
                  </span>
                  <p className="font-medium text-[#1B1F1E]">
                    {appointment.appointmentDate}
                  </p>
                  <p className="text-xs font-mono text-[#0F4C4A]">
                    {appointment.appointmentTime}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-[#5C6360] block mb-1">
                    Patient Name
                  </span>
                  <p className="font-medium text-[#1B1F1E]">
                    {appointment.patientName}
                  </p>
                  <p className="text-xs text-[#5C6360]">
                    {appointment.patientPhone}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-[#5C6360] block mb-1">
                    Contact Email
                  </span>
                  <p className="text-[#1B1F1E] font-medium truncate">
                    {appointment.patientEmail}
                  </p>
                </div>
              </div>

              {/* Clinic address and phone */}
              <div className="pt-4 border-t border-[#DDD8CF] text-xs space-y-1.5 text-[#5C6360]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] block mb-1">
                  Clinic Location & Phone
                </span>
                <p className="text-[#1B1F1E]">
                  Ever Brooks Dentals — {settings?.addressLine1 || '580 California St'}{settings?.addressLine2 ? `, ${settings.addressLine2}` : ''}, {settings?.city || 'San Francisco'}, {settings?.postalCode || 'CA 94104'}
                </p>
                <p>
                  Reception Telephone:{' '}
                  <a href={`tel:${rawPhone}`} className="text-[#0F4C4A] font-medium hover:underline">
                    {phone}
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Next-steps note: arrive 10 min early, reschedule (call), what to bring */}
          <div className="bg-[#EFEBE4]/70 border border-[#DDD8CF] rounded-[2px] p-6 space-y-3 text-xs sm:text-sm text-[#5C6360]">
            <h3 className="font-serif text-xl text-[#1B1F1E]">
              What to know before you arrive
            </h3>
            <ul className="space-y-2 list-disc list-inside leading-relaxed text-[#1B1F1E]">
              <li>
                <strong>Arrive 10 minutes early:</strong> This gives you time to complete any medical intake details at reception in an unhurried manner.
              </li>
              <li>
                <strong>What to bring:</strong> Bring a list of any current prescription medications or details of private dental insurance if you intend to claim.
              </li>
              <li>
                <strong>How to reschedule:</strong> If you need to change your appointment, please call the clinic at least 24 hours in advance so we can offer the slot to another patient.
              </li>
            </ul>
          </div>

          {/* Buttons: Back to home, Call the clinic */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button to="/" variant="secondary" size="md" className="w-full sm:w-auto">
              Back to home
            </Button>
            <a
              href={`tel:${rawPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center font-medium text-center text-xs uppercase tracking-wider px-6 py-2.5 min-h-[42px] rounded-full border border-[#DDD8CF] bg-[#FFFFFF] text-[#1B1F1E] hover:bg-[#EFEBE4] transition-colors focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
            >
              Call the clinic
            </a>
          </div>

        </div>
      </Container>
    </div>
  );
};
