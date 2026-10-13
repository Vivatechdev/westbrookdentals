import React from 'react';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';
import { Button } from '../common/Button';

export const HowToBookSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose your service',
      description: 'Select a routine examination, dental hygiene, or a treatment consultation with your preferred clinician.',
    },
    {
      num: '02',
      title: 'Pick a date and time',
      description: 'Browse current appointment slots. We offer early mornings and extended Thursday evening availability.',
    },
    {
      num: '03',
      title: 'Receive your confirmation',
      description: 'You will receive an immediate reference code with your booking details and directions to the clinic.',
    },
  ];

  return (
    <section className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container>
        <div className="max-w-2xl mb-12 space-y-3">
          <Eyebrow>Appointments</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1F1E] tracking-tight">
            How to book an appointment.
          </h2>
          <p className="text-base text-[#5C6360] leading-relaxed">
            Our booking system is available online at any time. You can also call reception directly during surgery hours.
          </p>
        </div>

        {/* 3 Plain Numbered Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[#DDD8CF] pt-10">
          {steps.map((step) => (
            <div key={step.num} className="space-y-3">
              <span className="font-mono text-sm tracking-wider text-[#5C6360] block">
                {step.num}
              </span>
              <h3 className="font-serif text-2xl text-[#1B1F1E]">
                {step.title}
              </h3>
              <p className="text-sm text-[#5C6360] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6">
          <Button to="/book" variant="primary" size="md">
            Book appointment
          </Button>
        </div>
      </Container>
    </section>
  );
};
