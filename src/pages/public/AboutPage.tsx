import React from 'react';
import { Container } from '../../components/common/Container';
import { Eyebrow } from '../../components/common/Eyebrow';
import { ImageSlot } from '../../components/common/ImageSlot';
import { Button } from '../../components/common/Button';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl space-y-4 mb-16">
          <Eyebrow>About the Clinic</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1B1F1E] tracking-tight leading-[1.05]">
            Quiet, preventative dentistry in San Francisco.
          </h1>
          <p className="text-base sm:text-lg text-[#5C6360] leading-relaxed">
            Ever Brooks Dentals was planned as a calm practice focused on long-term oral health rather than rushed appointments.
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-[#DDD8CF]">
          {/* Left Column (7 cols): Short plain story */}
          <div className="lg:col-span-7 space-y-8 text-[#1B1F1E]">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1B1F1E]">
                Our approach to dental health
              </h2>
              <p className="text-base text-[#5C6360] leading-relaxed">
                We believe that good dental care begins with prevention and clear explanation. Rather than waiting until teeth cause discomfort, we help patients understand their mouth, identify subtle changes early, and protect natural enamel.
              </p>
            </div>

            <div className="space-y-3 border-t border-[#DDD8CF] pt-6">
              <h3 className="font-serif text-2xl text-[#1B1F1E]">
                Care for nervous patients
              </h3>
              <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
                Many people feel uneasy about dental visits. We take time to explain each instrument before starting, agree on stop signals, and never rush a procedure. You remain in control of the pace of your treatment.
              </p>
            </div>

            <div className="space-y-3 border-t border-[#DDD8CF] pt-6">
              <h3 className="font-serif text-2xl text-[#1B1F1E]">
                Diagnostics and sterilization
              </h3>
              <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
                Our surgery operates digital diagnostics with low-dose digital radiographs and optical intraoral scanners. All instruments follow audited multi-stage autoclave sterilization cycles between patients.
              </p>
            </div>

            <div className="space-y-2 border-t border-[#DDD8CF] pt-6">
              <h3 className="font-serif text-2xl text-[#1B1F1E]">
                Practice credentials & governance
              </h3>
              <p className="text-sm text-[#5C6360] leading-relaxed">
                Our clinicians are licensed with the Dental Board of California (DBC) and practice in accordance with American Dental Association (ADA) clinical guidelines and regulatory health standards.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): One 3:2 ImageSlot */}
          <div className="lg:col-span-5 space-y-4">
            <ImageSlot
              aspectRatio="3:2"
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
              alt="Consultation room in Ever Brooks Dentals with natural light"
              className="object-cover"
            />
            <p className="text-xs text-[#5C6360] italic">
              Surgery consultation suite at Ever Brooks Dentals.
            </p>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-2xl text-[#1B1F1E]">
              Would you like to speak with our reception team?
            </h4>
            <p className="text-sm text-[#5C6360]">
              You can contact us with any questions or reserve your appointment directly online.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button to="/contact" variant="secondary" size="md">
              Contact us
            </Button>
            <Button to="/book" variant="primary" size="md">
              Book appointment
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
