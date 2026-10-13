import React from 'react';
import { Container } from '../../components/common/Container';
import { Eyebrow } from '../../components/common/Eyebrow';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 sm:py-24">
      <Container narrow>
        {/* Readable single column, max ~680px, clear headings */}
        <div className="max-w-[680px] mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#DDD8CF] pb-8">
            <Eyebrow>Clinical Data & Privacy</Eyebrow>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1B1F1E] tracking-tight leading-[1.08]">
              Privacy Policy & Health Records Notice
            </h1>
            <p className="text-sm text-[#5C6360]">
              Last updated: October 2026 • Ever Brooks Dentals Clinic Information Governance
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#1B1F1E]">
              1. Introduction & Data Controller
            </h2>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              Ever Brooks Dentals is committed to protecting your personal information and clinical health records in accordance with relevant healthcare confidentiality standards and data protection legislation.
            </p>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              This notice outlines how personal and clinical information is collected, stored, and managed when you book an appointment, submit an enquiry, or undergo treatment at our surgery.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-[#DDD8CF] pt-8">
            <h2 className="font-serif text-2xl text-[#1B1F1E]">
              2. Information We Collect
            </h2>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              To provide safe and accurate dental examinations, treatments, and appointments, we collect the following details:
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm sm:text-base text-[#5C6360] leading-relaxed">
              <li>
                <strong className="text-[#1B1F1E]">Contact details:</strong> Full name, email address, telephone numbers, and residential address.
              </li>
              <li>
                <strong className="text-[#1B1F1E]">Medical & dental history:</strong> Prescription medications, medical alerts, existing tooth sensitivity, and prior dental restorations.
              </li>
              <li>
                <strong className="text-[#1B1F1E]">Clinical notes & imaging:</strong> Low-dose radiographs, 3D intraoral scans, periodontal pocket charts, and diagnostic treatment records.
              </li>
              <li>
                <strong className="text-[#1B1F1E]">Financial records:</strong> Itemized estimates, payment transactions, and private dental insurance invoices.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-[#DDD8CF] pt-8">
            <h2 className="font-serif text-2xl text-[#1B1F1E]">
              3. How We Store and Protect Your Records
            </h2>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              Clinical records and dental imagery are stored securely within encrypted practice software compliant with healthcare data security requirements. Access is restricted exclusively to authorized clinical and administrative personnel involved in your immediate care.
            </p>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              We do not share, sell, or disclose patient information to third-party marketing companies. Data is shared with specialized external dental laboratories solely when constructing laboratory prosthetics (such as ceramic crowns or custom clear aligners) with your clinical consent.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-[#DDD8CF] pt-8">
            <h2 className="font-serif text-2xl text-[#1B1F1E]">
              4. Retention of Records
            </h2>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              In accordance with dental regulatory standards, clinical dental records for adult patients are retained for a minimum of 11 years following the last date of consultation or treatment. For children and young adults, records are retained until age 25 or 11 years after treatment, whichever is longer.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-[#DDD8CF] pt-8">
            <h2 className="font-serif text-2xl text-[#1B1F1E]">
              5. Your Legal Rights
            </h2>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              You are entitled to request access to your dental chart and digital radiographs, update your contact details, or discuss how your records are maintained.
            </p>
            <p className="text-sm sm:text-base text-[#5C6360] leading-relaxed">
              To submit a subject access enquiry, write to our Data Protection Officer at{' '}
              <a href="mailto:hello@everbrook.sbs" className="text-[#0F4C4A] font-medium hover:underline">
                hello@everbrook.sbs
              </a>{' '}
              or contact reception at 580 California St, San Francisco, CA 94104.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
};
