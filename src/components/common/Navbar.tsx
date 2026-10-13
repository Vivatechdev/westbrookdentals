import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { dataService } from '../../services/dataService';
import { ClinicSettings } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    dataService.getSettings().then(setSettings).catch(() => {});
  }, []);

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  // Raw telephone number for tel: link, stripped of non-digit/plus characters
  const rawTel = settings?.phone ? settings.phone.replace(/[^0-9+]/g, '') : '+12292320933';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#EAE4DB] border-b border-[#D8D2C5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Wordmark Left */}
          <Logo />

          {/* Minimal Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-normal transition-colors py-1 border-b ${
                    isActive
                      ? 'text-[#1B1F1E] border-[#1B1F1E] font-medium'
                      : 'text-[#5C6360] border-transparent hover:text-[#1B1F1E]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Solid Teal Book Button Right */}
          <div className="hidden md:block">
            <Button to="/book" variant="primary" size="sm" id="nav-book-btn">
              Book appointment
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1B1F1E] focus-visible:outline-2 focus-visible:outline-[#0F4C4A] rounded-[2px]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-sm font-mono tracking-widest uppercase">
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#EAE4DB] border-b border-[#D8D2C5] px-6 py-6 space-y-3">
            <nav className="space-y-2" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 text-base transition-colors ${
                      isActive ? 'text-[#1B1F1E] font-medium' : 'text-[#5C6360]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="pt-4 border-t border-[#D8D2C5]">
              <Button to="/book" variant="primary" size="md" className="w-full">
                Book appointment
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Bar (Call now + Book online) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#EAE4DB] border-t border-[#D8D2C5] px-4 py-3 flex items-center gap-3">
        <a
          href={`tel:${rawTel}`}
          className="flex-1 text-center py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#1B1F1E] border border-[#DDD8CF] rounded-full bg-[#FFFFFF] hover:bg-[#EFEBE4] transition-colors focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
          aria-label="Call clinic now"
        >
          Call now
        </a>
        <Link
          to="/book"
          className="flex-1 text-center py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#0F4C4A] hover:bg-[#0B3A38] rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#0F4C4A]"
        >
          Book online
        </Link>
      </div>
    </>
  );
};
