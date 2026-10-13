import React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'h2' | 'h3' | 'h4';
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className = '',
  as: Component = 'p',
  ...rest
}) => {
  return (
    <Component
      className={`text-[11px] md:text-xs font-semibold tracking-[0.16em] uppercase text-[#5C6360] ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
};
