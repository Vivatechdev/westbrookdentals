import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-[#DDD8CF] border-y border-[#DDD8CF] ${className}`.trim()}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-btn-${item.id}`}
              className="w-full flex items-center justify-between py-5 md:py-6 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C4A]"
            >
              <span className="font-serif text-xl md:text-2xl text-[#1B1F1E] group-hover:text-[#0F4C4A] transition-colors pr-6">
                {item.title}
              </span>
              <span
                className="w-7 h-7 flex items-center justify-center shrink-0 border border-[#DDD8CF] rounded-[2px] text-[#5C6360] group-hover:border-[#1B1F1E] group-hover:text-[#1B1F1E] transition-colors"
                aria-hidden="true"
              >
                {isOpen ? (
                  <span className="text-lg leading-none font-light">−</span>
                ) : (
                  <span className="text-lg leading-none font-light">+</span>
                )}
              </span>
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-btn-${item.id}`}
                className="pb-6 pt-1 text-sm md:text-base leading-relaxed text-[#5C6360] max-w-[760px]"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
