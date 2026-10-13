import React, { useState } from 'react';

export interface ImageSlotProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: '4:5' | '3:2' | '1:1' | '16:9';
  alt: string; // Required for accessibility and guardrails
  src?: string;
  className?: string;
  wrapperClassName?: string;
  placeholderText?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  aspectRatio = '4:5',
  alt,
  src,
  className = '',
  wrapperClassName = '',
  placeholderText,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const ratioClass = {
    '4:5': 'aspect-[4/5]',
    '3:2': 'aspect-[3/2]',
    '1:1': 'aspect-square',
    '16:9': 'aspect-[16/9]',
  }[aspectRatio];

  const showPlaceholder = !src || hasError;

  return (
    <div
      className={`relative overflow-hidden bg-[#E7E2D9] rounded-[2px] ${ratioClass} ${wrapperClassName}`.trim()}
    >
      {showPlaceholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none bg-[#E7E2D9] text-[#5C6360]">
          <span className="text-[11px] uppercase tracking-[0.12em] font-medium opacity-70">
            {placeholderText || alt}
          </span>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#E7E2D9] animate-pulse" />
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`.trim()}
            {...rest}
          />
        </>
      )}
    </div>
  );
};
