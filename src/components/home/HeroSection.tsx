import React, { useEffect, useState } from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ImageSlot } from '../common/ImageSlot';
import { Eyebrow } from '../common/Eyebrow';
import { dataService } from '../../services/dataService';
import { ClinicSettings, ClinicScheduleRule } from '../../types';

export const HeroSection: React.FC = () => {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<string>('08:30 – 18:00');

  useEffect(() => {
    dataService.getSettings().then(setSettings).catch(() => {});
    dataService.getScheduleRules().then((rules) => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = days[new Date().getDay()];
      const rule = rules.find((r) => r.dayOfWeek === currentDay);
      if (rule) {
        if (!rule.isOpen) {
          setTodaySchedule('Closed today');
        } else {
          setTodaySchedule(`Today: ${rule.openTime} – ${rule.closeTime}`);
        }
      }
    }).catch(() => {});
  }, []);

  const phone = settings?.phone || '+1 (229) 232-0933';
  const rawPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <section className="bg-[#F6F3EE] pt-12 pb-16 md:pt-20 md:pb-24">
      <Container>
        {/* 7/5 Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 7 Columns: Left-aligned Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <Eyebrow>Ever Brooks Dentals</Eyebrow>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1B1F1E] tracking-tight leading-[1.02]">
                Careful, unhurried dental care for every patient.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#5C6360] leading-relaxed max-w-xl">
              We focus on preventative health, gentle treatments, and clear communication in a quiet clinical environment.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button to="/book" variant="primary" size="md">
                Book appointment
              </Button>
              <Button to="/services" variant="secondary" size="md">
                View services
              </Button>
            </div>
          </div>

          {/* 5 Columns: Tall 4:5 ImageSlot */}
          <div className="lg:col-span-5">
            <ImageSlot
              aspectRatio="4:5"
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
              alt="Quiet, tidy dental examination room with natural light"
              className="object-cover"
            />
          </div>
        </div>

        {/* Beneath: Facts Row separated by hairline */}
        <div className="mt-14 pt-8 border-t border-[#DDD8CF] grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#5C6360]">
          <div>
            <span className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] mb-1">
              Opening Hours
            </span>
            <p className="font-normal text-[#1B1F1E]">{todaySchedule}</p>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] mb-1">
              Reception Phone
            </span>
            <a
              href={`tel:${rawPhone}`}
              className="text-[#1B1F1E] hover:text-[#0F4C4A] transition-colors focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
            >
              {phone}
            </a>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] mb-1">
              Urgent Support
            </span>
            <p>
              Toothache or urgent problem?{' '}
              <a
                href={`tel:${rawPhone}`}
                className="font-medium text-[#0F4C4A] hover:underline focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
              >
                Call us
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
