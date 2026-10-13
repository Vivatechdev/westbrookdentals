import React from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

export const BookingCtaBanner: React.FC = () => {
  return (
    <section className="bg-[#0F4C4A] text-white py-20 md:py-24">
      <Container narrow className="text-center space-y-6">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
          Book an appointment with our team.
        </h2>
        <p className="text-base sm:text-lg text-[#EFEBE4] max-w-xl mx-auto leading-relaxed">
          Reserve your routine checkup or clinical consultation online.
        </p>
        <div className="pt-2">
          <Button
            to="/book"
            variant="secondary"
            size="lg"
            className="bg-white text-[#0F4C4A] border-white hover:bg-[#EFEBE4] hover:text-[#0B3A38] hover:border-white shadow-none"
          >
            Book appointment
          </Button>
        </div>
      </Container>
    </section>
  );
};
