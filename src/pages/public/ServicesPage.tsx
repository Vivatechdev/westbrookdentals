import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Eyebrow } from '../../components/common/Eyebrow';
import { NumberedRow } from '../../components/common/NumberedRow';
import { Button } from '../../components/common/Button';
import { dataService } from '../../services/dataService';
import { DentalService, ServiceCategory } from '../../types';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<DentalService[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: ServiceCategory[] = [
    'General & Preventive',
    'Restorative',
    'Cosmetic',
    'Orthodontics',
    'Pediatric',
    'Emergency',
  ];

  useEffect(() => {
    dataService.getServices().then((data) => {
      setServices(data.filter((s) => s.isActive));
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl space-y-4 mb-16">
          <Eyebrow>Services & Treatments</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1B1F1E] tracking-tight leading-[1.05]">
            Clinical Dental Services
          </h1>
          <p className="text-base sm:text-lg text-[#5C6360] leading-relaxed">
            All appointments begin with an examination and open clinical advice. Below is our catalog of treatments grouped by discipline.
          </p>
        </div>

        {/* Grouped by Category as NumberedRow Lists with Hairline Dividers */}
        {loading ? (
          <div className="py-12 text-sm text-[#5C6360]">Loading service catalog...</div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryServices = services.filter((s) => s.category === category);
              if (categoryServices.length === 0) return null;

              return (
                <div key={category} className="space-y-4">
                  <div className="border-b border-[#DDD8CF] pb-3 flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1B1F1E]">
                      {category}
                    </h2>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#5C6360]">
                      {categoryServices.length} treatment{categoryServices.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="divide-y divide-[#DDD8CF]">
                    {categoryServices.map((service, index) => {
                      const numStr = (index + 1).toString().padStart(2, '0');
                      return (
                        <NumberedRow
                          key={service.id}
                          number={numStr}
                          title={service.name}
                          description={`${service.shortDescription} (~${service.durationMinutes} mins)`}
                          linkTo={`/book?serviceId=${service.id}`}
                          linkLabel="Book"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Insurance note at the bottom */}
        <div className="mt-20 pt-12 border-t border-[#DDD8CF]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-baseline">
            <div className="md:col-span-5 space-y-2">
              <Eyebrow>Insurance & Policies</Eyebrow>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1B1F1E]">
                Insurance coverage and claim documentation.
              </h3>
            </div>

            <div className="md:col-span-7 space-y-4 text-sm text-[#5C6360] leading-relaxed">
              <p>
                <strong>Insurance:</strong> Insurance accepted. We provide formal diagnostic invoices and treatment breakdown statements for direct submission to your private dental insurer.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0F4C4A] hover:underline"
                >
                  Contact reception about insurance claim documentation →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Booking CTA */}
        <div className="mt-16 pt-8 border-t border-[#DDD8CF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-2xl text-[#1B1F1E]">Ready to book a checkup?</h4>
            <p className="text-sm text-[#5C6360]">Choose a convenient date and time in our online booking calendar.</p>
          </div>
          <Button to="/book" variant="primary" size="md">
            Book appointment
          </Button>
        </div>
      </Container>
    </div>
  );
};
