import React from 'react';
import { Link } from 'react-router-dom';

interface CoreService {
  title: string;
  description: string;
}

export const ServicesSection: React.FC = () => {
  const services: CoreService[] = [
    {
      title: 'General Dentistry',
      description: 'Comprehensive examinations, digital diagnostics, and clear treatment planning tailored to your individual oral health.'
    },
    {
      title: 'Preventive Care',
      description: 'Professional hygiene appointments, periodontal care, and gentle cleanings to help protect natural teeth over time.'
    },
    {
      title: 'Restorative Dentistry',
      description: 'Tooth-colored composite fillings, ceramic crowns, and repairs focused on preserving healthy tooth structure.'
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Supervised whitening, subtle bonding, and ceramic restorations designed for a natural, balanced appearance.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#EAE8E3]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Section Heading Column */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#202421] tracking-tight">
              Clinical Services
            </h2>
            <p className="text-sm text-[#6E7571] leading-relaxed">
              We provide essential treatments with an emphasis on preventative care and patient comfort.
            </p>
            <p className="text-xs text-[#6E7571] pt-2">
              Note: Listed services represent editable demonstration offerings subject to clinical verification.
            </p>
            <div className="pt-2">
              <Link
                to="/services"
                className="text-sm font-medium text-[#315B50] hover:underline"
              >
                View all services & fee guide →
              </Link>
            </div>
          </div>

          {/* Clean Editorial List Column */}
          <div className="lg:col-span-8 divide-y divide-[#EAE8E3]">
            {services.map((service, index) => (
              <div key={index} className="py-7 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8">
                <h3 className="text-lg font-medium text-[#202421] sm:w-1/3 shrink-0">
                  {service.title}
                </h3>
                <p className="text-sm text-[#6E7571] leading-relaxed sm:w-2/3">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
