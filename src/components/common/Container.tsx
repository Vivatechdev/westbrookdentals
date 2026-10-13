import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  narrow?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  className = '',
  children,
  narrow = false,
  ...rest
}) => {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-8 lg:px-12 ${
        narrow ? 'max-w-[840px]' : 'max-w-[1200px]'
      } ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
};
