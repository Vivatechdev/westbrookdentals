import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  children,
  className = '',
  ...rest
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C4A] disabled:opacity-50 disabled:pointer-events-none rounded-full whitespace-nowrap cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-4 py-1.5 min-h-[32px] tracking-wide',
    md: 'text-sm px-6 py-2.5 min-h-[42px] tracking-normal',
    lg: 'text-base px-8 py-3.5 min-h-[50px] tracking-normal',
  }[size];

  const variantStyles = {
    primary: 'bg-[#0F4C4A] text-white hover:bg-[#0B3A38] border border-transparent shadow-none active:bg-[#0B3A38]',
    secondary: 'bg-transparent text-[#1B1F1E] border border-[#DDD8CF] hover:border-[#1B1F1E] hover:bg-[#EFEBE4] active:bg-[#E7E2D9]',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};
