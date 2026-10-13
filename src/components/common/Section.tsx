import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  surface?: 'bg' | 'surface' | 'surface-alt';
}

export const Section: React.FC<SectionProps> = ({
  className = '',
  children,
  dividerTop = true,
  dividerBottom = false,
  surface = 'bg',
  ...rest
}) => {
  const bgStyles = {
    bg: 'bg-[#F6F3EE]',
    surface: 'bg-[#FFFFFF]',
    'surface-alt': 'bg-[#EFEBE4]',
  }[surface];

  return (
    <section
      className={`relative py-16 md:py-24 ${bgStyles} ${
        dividerTop ? 'border-t border-[#DDD8CF]' : ''
      } ${dividerBottom ? 'border-b border-[#DDD8CF]' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </section>
  );
};
