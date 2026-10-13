import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { FeaturedServices } from '../../components/home/FeaturedServices';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { HowToBookSection } from '../../components/home/HowToBookSection';
import { FeesInsuranceSection } from '../../components/home/FeesInsuranceSection';
import { FaqSection } from '../../components/home/FaqSection';
import { BookingCtaBanner } from '../../components/home/BookingCtaBanner';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero: 7/5 split, 4:5 image, facts row beneath */}
      <HeroSection />

      {/* 2. Featured services: NumberedRow list with hairline dividers */}
      <FeaturedServices />

      {/* 3. Why choose us: two columns, short paragraphs, no icons */}
      <WhyChooseUs />

      {/* 4. How to book: 3 plain numbered steps */}
      <HowToBookSection />

      {/* 5. Fees & insurance: plain text on payment & insurance with placeholders */}
      <FeesInsuranceSection />

      {/* 6. FAQ: Accordion */}
      <FaqSection />

      {/* 7. Final CTA: full-width teal block, one sentence, one button */}
      <BookingCtaBanner />
    </div>
  );
};
