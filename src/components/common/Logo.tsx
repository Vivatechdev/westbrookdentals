import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-baseline no-underline group focus-visible:outline-2 focus-visible:outline-[#0F4C4A] ${className}`.trim()}
    >
      <span className="font-serif text-2xl tracking-tight text-[#1B1F1E] group-hover:text-[#0F4C4A] transition-colors leading-none">
        Ever Brooks
      </span>
      <span className="ml-2 font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-[#5C6360]">
        Dentals
      </span>
    </Link>
  );
};
