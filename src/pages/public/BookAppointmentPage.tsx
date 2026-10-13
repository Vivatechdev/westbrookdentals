import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { dataService } from '../../services/dataService';
import { DentalService, Dentist, ClinicSettings } from '../../types';

export const BookAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Wizard Step (1: Service, 2: Date & time, 3: Your details, 4: Confirm)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Data collections
  const [services, setServices] = useState<DentalService[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [allStandardSlots, setAllStandardSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  // Selected state
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Patient form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    isExistingPatient: false,
    isEmergency: false,
    notes: '',
  });

  // Inline Validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // 1. Calculate minimum booking date (respecting 4-hour advance notice)
  const today = new Date();
  const minDateStr = today.toISOString().split('T')[0];

  // 2. Calculate maximum booking date (60-day window)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Initialize data and check URL search params
  useEffect(() => {
    Promise.all([
      dataService.getServices(),
      dataService.getDentists(),
      dataService.getSettings(),
    ]).then(([srvs, docs, setts]) => {
      const activeSrvs = srvs.filter((s) => s.isActive);
      const activeDocs = docs.filter((d) => d.isActive);
      setServices(activeSrvs);
      setDentists(activeDocs);
      setSettings(setts);

      // Check query params
      const paramService = searchParams.get('serviceId');
      if (paramService && activeSrvs.some((s) => s.id === paramService)) {
        setSelectedServiceId(paramService);
      } else if (activeSrvs.length > 0) {
        setSelectedServiceId(activeSrvs[0].id);
      }

      // Default selected date: tomorrow (skip Sunday)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (tomorrow.getDay() === 0) {
        tomorrow.setDate(tomorrow.getDate() + 1);
      }
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setSelectedDate(`${yyyy}-${mm}-${dd}`);

      setInitialLoading(false);
    });
  }, [searchParams]);

  // Automatically scroll to the top of the page when advancing or returning across wizard steps
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Fetch slots whenever date changes (automatically checks overall clinic availability)
  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);

    dataService.getAvailableTimeSlots(selectedDate).then((slots) => {
      // 4-hour notice check for same-day booking
      const now = new Date();
      const isToday = selectedDate === now.toISOString().split('T')[0];
      const minAllowedHour = now.getHours() + (settings?.requireAdvanceNoticeHours || 4);
      const minAllowedMinute = now.getMinutes();

      const validSlots = slots.filter((slot) => {
        if (!isToday) return true;
        const [h, m] = slot.split(':').map(Number);
        return h > minAllowedHour || (h === minAllowedHour && m >= minAllowedMinute);
      });

      setAvailableSlots(validSlots);

      // Standard daytime clinic slots
      const standardList = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
      ];
      const unionSet = Array.from(new Set([...standardList, ...slots])).sort();
      setAllStandardSlots(unionSet);

      if (validSlots.length > 0 && !validSlots.includes(selectedTime)) {
        setSelectedTime(validSlots[0]);
      } else if (validSlots.length === 0) {
        setSelectedTime('');
      }
      setLoadingSlots(false);
    });
  }, [selectedDate, settings]);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  // Validate patient details step (Step 3)
  const validateStep3 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = 'Full name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please provide an email address for your confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedServiceId) {
        setFormErrors({ service: 'Please select a service to continue.' });
        return;
      }
      setFormErrors({});
      setCurrentStep(2);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!selectedDate) {
        setFormErrors({ date: 'Please choose an appointment date.' });
        return;
      }
      if (!selectedTime) {
        setFormErrors({ time: 'Please select an available time slot.' });
        return;
      }
      setFormErrors({});
      setCurrentStep(3);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setFormErrors({});
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedService) return;
    setIsSubmitting(true);

    try {
      // Clinician selection removed: system automatically assigns the on-duty clinician
      const assignedDentist = dentists[0] || { id: 'doc-1', name: 'Clinical Team' };

      const newAppt = await dataService.createAppointment({
        patientName: formData.fullName.trim(),
        patientEmail: formData.email.trim(),
        patientPhone: formData.phone.trim(),
        patientDob: formData.dob || undefined,
        isExistingPatient: formData.isExistingPatient,
        isEmergency: formData.isEmergency,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        dentistId: assignedDentist.id,
        dentistName: assignedDentist.name,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        durationMinutes: selectedService.durationMinutes,
        notes: formData.notes.trim() || undefined,
      });

      navigate(`/booking-confirmation?reference=${encodeURIComponent(newAppt.referenceNumber)}`);
    } catch (err) {
      console.error('Booking failed:', err);
      setFormErrors({ submit: 'An error occurred while booking. Please try again.' });
      setIsSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="bg-[#F6F3EE] min-h-[60vh] flex items-center justify-center p-6">
        <p className="text-sm text-[#5C6360]">Loading clinic diary...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F3EE] py-12 md:py-20 min-h-screen">
      <Container narrow>
        {/* Single clean column layout */}
        <div className="max-w-[680px] mx-auto space-y-10">

          {/* Stepped Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#DDD8CF] pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5C6360]">
                Step {currentStep} of 4
              </span>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] hover:text-[#0F4C4A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
                >
                  ← Back
                </button>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1B1F1E] tracking-tight">
              {currentStep === 1 && 'Select a service'}
              {currentStep === 2 && 'Choose date and time'}
              {currentStep === 3 && 'Your details'}
              {currentStep === 4 && 'Review and confirm'}
            </h1>
            <p className="text-sm text-[#5C6360]">
              {currentStep === 1 && 'Choose the type of appointment you need.'}
              {currentStep === 2 && 'Appointments can be booked up to 60 days in advance.'}
              {currentStep === 3 && 'We need your contact information to send booking confirmation.'}
              {currentStep === 4 && 'Check your appointment summary before booking.'}
            </p>
          </div>

          {/* STEP 1: SERVICE */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {formErrors.service && (
                <p className="text-xs text-[#991B1B] bg-[#FEE2E2] p-3 rounded-[2px]">
                  {formErrors.service}
                </p>
              )}

              <div className="space-y-2">
                {services.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(srv.id);
                        setFormErrors({});
                      }}
                      className={`w-full text-left p-5 rounded-[2px] transition-colors cursor-pointer border flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#0F4C4A] bg-[#0F4C4A]/5'
                          : 'border-[#DDD8CF] bg-[#FFFFFF] hover:border-[#1B1F1E]'
                      } focus-visible:outline-2 focus-visible:outline-[#0F4C4A]`}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-serif text-xl sm:text-2xl text-[#1B1F1E]">
                          {srv.name}
                        </span>
                        <span className="font-mono text-xs text-[#5C6360] shrink-0">
                          {srv.durationMinutes} mins
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5C6360] mt-1.5 leading-relaxed">
                        {srv.shortDescription}
                      </p>
                      <div className="mt-3 pt-3 border-t border-[#DDD8CF]/60 flex items-center justify-between text-xs">
                        <span className="text-[#5C6360]">
                          Category: {srv.category}
                        </span>
                        <span className="text-[#5C6360]">
                          ~{srv.durationMinutes} mins
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Date Input */}
              <div className="space-y-2">
                <label
                  htmlFor="appointmentDate"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]"
                >
                  Choose date
                </label>
                <input
                  id="appointmentDate"
                  type="date"
                  min={minDateStr}
                  max={maxDateStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                />
                <p className="text-xs text-[#5C6360]">
                  Selected day:{' '}
                  <span className="font-medium text-[#1B1F1E]">
                    {new Date(selectedDate).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
                {formErrors.date && (
                  <p className="text-xs text-[#991B1B]">{formErrors.date}</p>
                )}
              </div>

              {/* Time Slots */}
              <div className="space-y-3 pt-4 border-t border-[#DDD8CF]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]">
                    Available slots for this date
                  </span>
                  {loadingSlots && (
                    <span className="text-xs text-[#5C6360]">Checking slots...</span>
                  )}
                </div>

                {availableSlots.length === 0 && !loadingSlots ? (
                  <div className="p-6 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-center space-y-1">
                    <p className="font-serif text-lg text-[#1B1F1E]">
                      No available appointment slots on this date
                    </p>
                    <p className="text-xs text-[#5C6360]">
                      The surgery is either closed or fully booked on this date. Please select another date.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {allStandardSlots.map((slot) => {
                      const isAvailable = availableSlots.includes(slot);
                      const isSelected = selectedTime === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => {
                            if (isAvailable) setSelectedTime(slot);
                          }}
                          className={`py-3 px-3 text-center text-sm font-mono transition-colors rounded-[2px] border ${
                            isSelected && isAvailable
                              ? 'border-[#0F4C4A] bg-[#0F4C4A] text-white font-semibold'
                              : isAvailable
                              ? 'border-[#DDD8CF] bg-[#FFFFFF] text-[#1B1F1E] hover:border-[#1B1F1E] cursor-pointer'
                              : 'border-[#DDD8CF]/50 bg-[#EFEBE4]/60 text-[#5C6360]/50 line-through cursor-not-allowed'
                          } focus-visible:outline-2 focus-visible:outline-[#0F4C4A]`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}

                {formErrors.time && (
                  <p className="text-xs text-[#991B1B]">{formErrors.time}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: YOUR DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]"
                >
                  Full name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                />
                {formErrors.fullName && (
                  <p className="text-xs text-[#991B1B]">{formErrors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]"
                >
                  Email address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                />
                {formErrors.email && (
                  <p className="text-xs text-[#991B1B]">{formErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]"
                >
                  Phone number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +1 (229) 232-0933"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                />
                {formErrors.phone && (
                  <p className="text-xs text-[#991B1B]">{formErrors.phone}</p>
                )}
              </div>

              {/* Optional Note */}
              <div className="space-y-1.5">
                <label
                  htmlFor="notes"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]"
                >
                  Optional note or symptoms
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Let us know if you feel nervous or have a specific tooth of concern..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                />
              </div>

              {/* Checkboxes: Existing patient and Emergency */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isExistingPatient}
                    onChange={(e) =>
                      setFormData({ ...formData, isExistingPatient: e.target.checked })
                    }
                    className="mt-0.5 rounded-[2px] border-[#DDD8CF] text-[#0F4C4A] focus:ring-[#0F4C4A]"
                  />
                  <span className="text-xs text-[#5C6360]">
                    I am an existing patient at Ever Brooks Dentals
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isEmergency}
                    onChange={(e) =>
                      setFormData({ ...formData, isEmergency: e.target.checked })
                    }
                    className="mt-0.5 rounded-[2px] border-[#DDD8CF] text-[#0F4C4A] focus:ring-[#0F4C4A]"
                  />
                  <span className="text-xs text-[#5C6360]">
                    This is an urgent problem or acute toothache
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRM & REVIEW */}
          {currentStep === 4 && selectedService && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] p-6 space-y-4">
                <div className="border-b border-[#DDD8CF] pb-4">
                  <span className="text-xs uppercase tracking-wider text-[#5C6360] font-semibold block mb-1">
                    Selected Treatment
                  </span>
                  <h3 className="font-serif text-2xl text-[#1B1F1E]">
                    {selectedService.name}
                  </h3>
                  <p className="text-xs text-[#5C6360] mt-1">
                    Duration: ~{selectedService.durationMinutes} minutes
                  </p>
                </div>

                <div className="py-2 border-b border-[#DDD8CF] text-xs">
                  <span className="text-[#5C6360] block">Appointment Slot:</span>
                  <span className="font-semibold text-[#1B1F1E] text-sm">
                    {selectedDate} at {selectedTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs py-2 border-b border-[#DDD8CF]">
                  <div>
                    <span className="text-[#5C6360] block">Patient Name:</span>
                    <span className="font-semibold text-[#1B1F1E] text-sm">
                      {formData.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5C6360] block">Contact Details:</span>
                    <span className="text-[#1B1F1E]">
                      {formData.phone} • {formData.email}
                    </span>
                  </div>
                </div>

                {formData.notes && (
                  <div className="text-xs pt-1">
                    <span className="text-[#5C6360] block mb-0.5">Note:</span>
                    <p className="text-[#1B1F1E] italic">{formData.notes}</p>
                  </div>
                )}
              </div>

              {formErrors.submit && (
                <p className="text-xs text-[#991B1B] bg-[#FEE2E2] p-3 rounded-[2px]">
                  {formErrors.submit}
                </p>
              )}
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="pt-6 border-t border-[#DDD8CF] space-y-4">
            <div className="flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="secondary"
                  size="md"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  variant="primary"
                  size="md"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleConfirmBooking}
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Confirming booking...' : 'Confirm appointment'}
                </Button>
              )}
            </div>

            {/* Privacy Policy link line under the submit button */}
            <p className="text-xs text-[#5C6360] text-center pt-2">
              By booking you agree to our{' '}
              <Link to="/privacy" className="underline hover:text-[#1B1F1E]">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

        </div>
      </Container>
    </div>
  );
};
