import React from 'react';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';
import { Accordion } from '../common/Accordion';
import { CLINIC_FAQS } from '../../services/initialData';

export const FaqSection: React.FC = () => {
  const accordionItems = CLINIC_FAQS.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  return (
    <section className="bg-[#F6F3EE] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container narrow>
        <div className="space-y-4 mb-12">
          <Eyebrow>Common Questions</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1F1E] tracking-tight">
            Frequently asked questions.
          </h2>
          <p className="text-base text-[#5C6360] leading-relaxed">
            Here are answers to typical questions about our appointments, policies, and clinic visits.
          </p>
        </div>

        <Accordion items={accordionItems} defaultOpenId="faq-0" />
      </Container>
    </section>
  );
};
