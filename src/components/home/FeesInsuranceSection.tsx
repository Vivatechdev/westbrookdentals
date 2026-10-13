import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';

export const FeesInsuranceSection: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 space-y-4">
            <Eyebrow>Insurance & Policies</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1F1E] tracking-tight leading-[1.08]">
              Insurance accepted for your treatment.
            </h2>
            <p className="text-base text-[#5C6360] leading-relaxed">
              We provide comprehensive clinical documentation. You can submit our diagnostic receipts directly to private healthcare insurers.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8 border-t lg:border-t-0 lg:border-l border-[#DDD8CF] pt-8 lg:pt-0 lg:pl-12">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#1B1F1E]">
                Insurance coverage
              </h3>
              <p className="text-sm text-[#5C6360] leading-relaxed">
                Insurance accepted. We supply detailed clinical receipts and claim documentation for your provider reimbursement.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="text-xs font-semibold uppercase tracking-wider text-[#0F4C4A] hover:underline"
              >
                Questions about insurance documentation? Contact our team →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
