import React from 'react';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';
import { Button } from '../common/Button';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Heading and ethos (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Eyebrow>Clinical Approach</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1F1E] tracking-tight leading-[1.08]">
              A quiet, methodical way of practicing dentistry.
            </h2>
            <p className="text-base text-[#5C6360] leading-relaxed pt-2">
              We know dental appointments can cause anxiety. Our clinicians work at your pace, explain each step in plain language, and never pressure you into unnecessary treatment.
            </p>
            <div className="pt-4">
              <Button to="/about" variant="secondary" size="sm">
                About the practice
              </Button>
            </div>
          </div>

          {/* Column 2: Short paragraphs, no icons (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            <div className="space-y-2 border-t border-[#DDD8CF] pt-4">
              <h3 className="font-serif text-xl text-[#1B1F1E]">
                Unhurried consultations
              </h3>
              <p className="text-sm text-[#5C6360] leading-relaxed">
                We schedule longer appointment slots so there is time to talk, ask questions, and take breaks whenever you need one.
              </p>
            </div>

            <div className="space-y-2 border-t border-[#DDD8CF] pt-4">
              <h3 className="font-serif text-xl text-[#1B1F1E]">
                Clear treatment options
              </h3>
              <p className="text-sm text-[#5C6360] leading-relaxed">
                You receive a clear explanation with alternatives before any procedure begins. We prioritize open, transparent clinical care.
              </p>
            </div>

            <div className="space-y-2 border-t border-[#DDD8CF] pt-4">
              <h3 className="font-serif text-xl text-[#1B1F1E]">
                Minimally invasive care
              </h3>
              <p className="text-sm text-[#5C6360] leading-relaxed">
                Our first priority is preserving your natural teeth. We intervene only when necessary and recommend preventative routines first.
              </p>
            </div>

            <div className="space-y-2 border-t border-[#DDD8CF] pt-4">
              <h3 className="font-serif text-xl text-[#1B1F1E]">
                Strict infection control
              </h3>
              <p className="text-sm text-[#5C6360] leading-relaxed">
                Every instrument undergoes audited autoclave sterilization. Our surgeries are sanitized between patients without compromise.
              </p>
            </div>
          </div>
        </div>

        {/* Two-image editorial strip below the cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="overflow-hidden rounded-[2px]">
            <img
              src="/images/clinic-interior.jpg"
              alt="Bright consultation room with natural light and modern dental chair"
              width={800}
              height={533}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[3/2]"
            />
          </div>
          <div className="overflow-hidden rounded-[2px]">
            <img
              src="/images/clinic-instruments.jpg"
              alt="Neatly arranged dental instruments on a sterile tray with warm lighting"
              width={800}
              height={600}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[4/3] md:aspect-[3/2]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
