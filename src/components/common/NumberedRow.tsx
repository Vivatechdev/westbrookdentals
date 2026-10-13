import React from 'react';
import { Link } from 'react-router-dom';

export interface NumberedRowProps {
  number: string; // e.g. "01", "02"
  title: string;
  description: string;
  linkTo?: string;
  linkLabel?: string;
  className?: string;
  onClick?: () => void;
}

export const NumberedRow: React.FC<NumberedRowProps> = ({
  number,
  title,
  description,
  linkTo,
  linkLabel = 'Explore',
  className = '',
  onClick,
}) => {
  const content = (
    <div
      className={`group w-full py-6 md:py-8 border-b border-[#DDD8CF] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-colors hover:bg-[#EFEBE4]/40 px-2 -mx-2 rounded-[2px] ${className}`.trim()}
      onClick={onClick}
    >
      {/* Number */}
      <div className="md:col-span-2">
        <span className="font-mono text-xs md:text-sm tracking-wider text-[#5C6360]">
          {number}
        </span>
      </div>

      {/* Title */}
      <div className="md:col-span-4">
        <h3 className="font-serif text-2xl md:text-3xl text-[#1B1F1E] group-hover:text-[#0F4C4A] transition-colors">
          {title}
        </h3>
      </div>

      {/* One-liner description */}
      <div className="md:col-span-4">
        <p className="text-sm md:text-base text-[#5C6360] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Arrow link */}
      <div className="md:col-span-2 flex items-center md:justify-end pt-2 md:pt-0">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-[#0F4C4A] group-hover:translate-x-1 transition-transform">
          <span>{linkLabel}</span>
          <span aria-hidden="true" className="text-sm">→</span>
        </span>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="block no-underline focus-visible:outline-2 focus-visible:outline-[#0F4C4A] rounded-[2px]">
        {content}
      </Link>
    );
  }

  return content;
};
