import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { dataService } from '../../services/dataService';
import { ClinicSettings } from '../../types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);

  useEffect(() => {
    dataService.getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <footer className="border-t border-[#D8D2C5] bg-[#EAE4DB] text-[#1B1F1E] py-14 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Practice Details & Direct Contact Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#D8D2C5]">
          {/* Practice Wordmark & Ethos */}
          <div className="md:col-span-6 space-y-3">
            <Logo />
            <p className="text-sm text-[#5C6360] leading-relaxed max-w-sm pt-1">
              Thoughtful, personal dental care provided in a calm clinical environment.
            </p>
          </div>

          {/* Practice Location & Contact */}
          <div className="md:col-span-6 md:flex md:justify-end">
            <address className="not-italic text-sm text-[#5C6360] space-y-1">
              <span className="block text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] mb-1">
                Practice Location & Enquiries
              </span>
              <p>{settings?.addressLine1 || '580 California St'}</p>
              {settings?.addressLine2 && <p>{settings.addressLine2}</p>}
              <p>
                {settings?.city || 'San Francisco'}, {settings?.postalCode || 'CA 94104'}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${settings?.phone || '+12292320933'}`}
                  className="text-[#1B1F1E] hover:text-[#0F4C4A] transition-colors font-medium focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
                >
                  {settings?.phone || '+1 (229) 232-0933'}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${settings?.email || 'hello@everbrook.sbs'}`}
                  className="hover:text-[#0F4C4A] transition-colors focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
                >
                  {settings?.email || 'hello@everbrook.sbs'}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Privacy Policy */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C6360]">
          <p>© {new Date().getFullYear()} Ever Brooks Dentals. All rights reserved.</p>
          <div>
            <Link to="/privacy" className="hover:text-[#1B1F1E] transition-colors focus-visible:outline-2 focus-visible:outline-[#0F4C4A]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
