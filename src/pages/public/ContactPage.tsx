import React, { useState, useEffect } from 'react';
import { Container } from '../../components/common/Container';
import { Eyebrow } from '../../components/common/Eyebrow';
import { Button } from '../../components/common/Button';
import { dataService } from '../../services/dataService';
import { ClinicSettings, ClinicScheduleRule } from '../../types';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [schedule, setSchedule] = useState<ClinicScheduleRule[]>([]);

  // Simple enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    dataService.getSettings().then(setSettings).catch(() => {});
    dataService.getScheduleRules().then(setSchedule).catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter your message or enquiry.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 400);
  };

  const phone = settings?.phone || '+1 (229) 232-0933';
  const rawPhone = phone.replace(/[^0-9+]/g, '');

  // Check if WhatsApp is configured or specified in settings
  const whatsAppPhone = (settings as any)?.whatsAppPhone || (settings as any)?.whatsapp || null;

  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl space-y-4 mb-16">
          <Eyebrow>Get in Touch</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1B1F1E] tracking-tight leading-[1.05]">
            Contact & Practice Location
          </h1>
          <p className="text-base sm:text-lg text-[#5C6360] leading-relaxed">
            Have questions about clinical treatments, emergency appointments, or insurance receipts? Reach us by phone, email, or message our team below.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-[#DDD8CF]">
          {/* Column 1 (6 cols): Simple enquiry form with inline validation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1B1F1E]">
                Send an enquiry
              </h2>
              <p className="text-sm text-[#5C6360]">
                We reply to email messages within one working day.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] space-y-3">
                <h3 className="font-serif text-2xl text-[#1B1F1E]">
                  Thank you, {formData.name}.
                </h3>
                <p className="text-sm text-[#5C6360] leading-relaxed">
                  Your message has been received. Our team will get back to you at {formData.email}.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#0F4C4A] hover:underline"
                  >
                    Send another message →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-6 sm:p-8 border border-[#DDD8CF] rounded-[2px]">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]">
                    Your name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                  />
                  {errors.name && <p className="text-xs text-[#991B1B]">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]">
                    Email address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                  />
                  {errors.email && <p className="text-xs text-[#991B1B]">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]">
                    Telephone <span className="text-[#5C6360] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E]">
                    Message or question *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DDD8CF] rounded-[2px] text-sm text-[#1B1F1E] focus:outline-none focus:border-[#0F4C4A]"
                  />
                  {errors.message && <p className="text-xs text-[#991B1B]">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSending}
                  >
                    {isSending ? 'Sending enquiry...' : 'Send message'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Column 2 (6 cols): Address, phone, WhatsApp if present, hours table, map slot */}
          <div className="lg:col-span-6 space-y-8 text-sm">
            {/* Address and telephone */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1B1F1E]">
                Practice details
              </h2>

              <div className="space-y-2 text-[#5C6360]">
                <address className="not-italic leading-relaxed text-[#1B1F1E]">
                  <strong>Ever Brooks Dentals</strong><br />
                  {settings?.addressLine1 || '580 California St'}<br />
                  {settings?.addressLine2 ? <>{settings.addressLine2}<br /></> : null}
                  {settings?.city || 'San Francisco'}, {settings?.postalCode || 'CA 94104'}
                </address>

                <p className="pt-2">
                  Telephone:{' '}
                  <a href={`tel:${rawPhone}`} className="text-[#0F4C4A] font-semibold hover:underline">
                    {phone}
                  </a>
                </p>

                <p>
                  Email:{' '}
                  <a href={`mailto:${settings?.email || 'hello@everbrook.sbs'}`} className="text-[#1B1F1E] hover:underline">
                    {settings?.email || 'hello@everbrook.sbs'}
                  </a>
                </p>

                {/* WhatsApp Link if present in settings */}
                {whatsAppPhone && (
                  <p className="pt-1">
                    WhatsApp:{' '}
                    <a
                      href={`https://wa.me/${whatsAppPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0F4C4A] font-medium hover:underline"
                    >
                      Chat on WhatsApp ({whatsAppPhone}) ↗
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Hours Table */}
            <div className="space-y-3 pt-4 border-t border-[#DDD8CF]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] block">
                Opening Hours
              </span>
              <table className="w-full text-left text-xs sm:text-sm text-[#1B1F1E]">
                <tbody className="divide-y divide-[#DDD8CF]">
                  {schedule.map((rule) => (
                    <tr key={rule.dayOfWeek}>
                      <td className="py-2 font-medium">{rule.dayOfWeek}</td>
                      <td className="py-2 text-right text-[#5C6360]">
                        {rule.isOpen ? `${rule.openTime} – ${rule.closeTime}` : 'Closed'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
        </div>

        {/* Bottom Booking Action */}
        <div className="pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl text-[#1B1F1E]">
              Would you rather schedule your visit now?
            </h3>
            <p className="text-sm text-[#5C6360]">
              Our online booking tool lets you choose treatments and time slots 24/7.
            </p>
          </div>
          <Button to="/book" variant="primary" size="md">
            Book appointment
          </Button>
        </div>
      </Container>
    </div>
  );
};
