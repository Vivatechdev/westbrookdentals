import React from 'react';
import { Link } from 'react-router-dom';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-t border-[#EAE8E3]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Title & Introduction */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#202421] tracking-tight">
              Hours & Location
            </h2>
            <p className="text-sm text-[#6E7571] leading-relaxed">
              We welcome new and returning patients. Reach us by phone, email, or schedule your visit directly online.
            </p>
            <div className="pt-2">
              <Link
                to="/book"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-medium text-white bg-[#315B50] hover:bg-[#25473E] transition-colors"
              >
                Book an Appointment
              </Link>
            </div>
          </div>

          {/* Details Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Opening Hours */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#202421]">
                Opening Hours <span className="font-normal text-xs text-[#6E7571] lowercase">(placeholder)</span>
              </h3>
              <div className="space-y-2 text-sm text-[#6E7571]">
                <div className="flex justify-between py-1 border-b border-[#EAE8E3]">
                  <span>Monday – Wednesday</span>
                  <span className="text-[#202421] font-medium">8:30 – 18:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAE8E3]">
                  <span>Thursday</span>
                  <span className="text-[#202421] font-medium">8:30 – 19:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAE8E3]">
                  <span>Friday</span>
                  <span className="text-[#202421] font-medium">8:30 – 17:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAE8E3]">
                  <span>Saturday</span>
                  <span className="text-[#202421] font-medium">9:00 – 14:00</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Location & Telephone */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#202421] mb-2">
                  Location
                </h3>
                <address className="not-italic text-sm text-[#6E7571] leading-relaxed">
                  Ever Brooks Dentals<br />
                  580 California St<br />
                  CA 94104
                </address>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#202421] mb-2">
                  Direct Contact
                </h3>
                <div className="text-sm text-[#6E7571] space-y-1">
                  <p>
                    Telephone:{' '}
                    <a href="tel:+12292320933" className="text-[#202421] hover:underline font-medium">
                      +1 (229) 232-0933
                    </a>
                  </p>
                  <p>
                    Email:{' '}
                    <a href="mailto:hello@everbrook.sbs" className="text-[#202421] hover:underline font-medium">
                      hello@everbrook.sbs
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
