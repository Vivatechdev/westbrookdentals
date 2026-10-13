import React, { useEffect, useState } from 'react';

export function useScrollFade<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, []);

  return { ref, isVisible, className: `fade-up-enter ${isVisible ? 'fade-up-active' : ''}` };
}
