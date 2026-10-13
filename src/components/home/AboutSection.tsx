import React from 'react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-t border-[#EAE8E3]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#202421] tracking-tight">
              Our approach to care
            </h2>

            <p className="text-base text-[#6E7571] leading-relaxed">
              We believe a dental visit should feel calm, transparent, and respectful of your time. Our clinicians take an unhurried, conservative approach—explaining findings openly, discussing options without pressure, and helping you make informed decisions about your oral health.
            </p>

            <div>
              <Link
                to="/about"
                className="text-sm font-medium text-[#315B50] hover:underline"
              >
                Read more about our practice →
              </Link>
            </div>
          </div>

          {/* Right Photograph */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F4F2ED]">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
                alt="Clinician in a calm consultation setting"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
