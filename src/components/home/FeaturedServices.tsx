import React, { useEffect, useState } from 'react';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';
import { NumberedRow } from '../common/NumberedRow';
import { Button } from '../common/Button';
import { dataService } from '../../services/dataService';
import { DentalService } from '../../types';

export const FeaturedServices: React.FC = () => {
  const [services, setServices] = useState<DentalService[]>([]);

  useEffect(() => {
    dataService.getServices().then((data) => {
      setServices(data.filter((s) => s.isActive));
    }).catch(() => {});
  }, []);

  return (
    <section className="bg-[#F6F3EE] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7 space-y-3">
            <Eyebrow>Services & Treatments</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1F1E] tracking-tight">
              Clinical services designed for long-term health.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end lg:justify-end">
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed max-w-sm">
              From routine preventative checks to gentle restorative procedures, each treatment begins with clear advice and unhurried consultation.
            </p>
          </div>
        </div>

        {/* NumberedRow List with Hairline Dividers */}
        <div className="border-t border-[#DDD8CF]">
          {services.map((service, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');
            return (
              <NumberedRow
                key={service.id}
                number={numStr}
                title={service.name}
                description={service.shortDescription}
                linkTo={`/book?serviceId=${service.id}`}
                linkLabel="Book"
              />
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-between flex-wrap gap-4 pt-4">
          <p className="text-xs uppercase tracking-wider text-[#5C6360]">
            All treatments are preceded by an initial consultation and personalized care plan.
          </p>
          <Button to="/services" variant="secondary" size="sm">
            View full service catalog
          </Button>
        </div>
      </Container>
    </section>
  );
};
