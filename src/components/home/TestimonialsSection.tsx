import React, { useState } from 'react';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';
import { DEMO_TESTIMONIALS } from '../../services/initialData';

export const TestimonialsSection: React.FC = () => {
  const testimonials = DEMO_TESTIMONIALS || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) {
    return (
      <section className="bg-[#F6F3EE] py-16 md:py-24 border-b border-[#DDD8CF]">
        <Container narrow>
          <Eyebrow>Patient Feedback</Eyebrow>
          <div className="mt-6 p-8 border border-dashed border-[#DDD8CF] rounded-[2px] text-center text-[#5C6360]">
            <p className="font-serif text-2xl text-[#1B1F1E] mb-2">[No patient testimonials added yet]</p>
            <p className="text-sm">Patient reviews will appear here once submitted and verified.</p>
          </div>
        </Container>
      </section>
    );
  }

  const current = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-[#F6F3EE] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container narrow>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Eyebrow>Patient Experiences</Eyebrow>
            <span className="font-mono text-xs text-[#5C6360]">
              {currentIndex + 1} / {testimonials.length}
            </span>
          </div>

          {/* Large Serif Quote */}
          <blockquote className="space-y-6">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B1F1E] leading-[1.2] tracking-tight">
              “{current.review}”
            </p>

            {/* Small Name & Context Beneath */}
            <footer className="pt-2">
              <div className="text-sm font-medium text-[#1B1F1E]">
                Patient {current.patientInitials}
              </div>
              <div className="text-xs text-[#5C6360] mt-0.5">
                {current.service} • {current.date}
              </div>
            </footer>
          </blockquote>

          {/* Minimal Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={prevTestimonial}
                aria-label="Previous patient testimonial"
                className="w-9 h-9 flex items-center justify-center border border-[#DDD8CF] rounded-full text-[#1B1F1E] hover:bg-[#EFEBE4] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next patient testimonial"
                className="w-9 h-9 flex items-center justify-center border border-[#DDD8CF] rounded-full text-[#1B1F1E] hover:bg-[#EFEBE4] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
              >
                →
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
