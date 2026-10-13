import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Eyebrow } from '../../components/common/Eyebrow';
import { ImageSlot } from '../../components/common/ImageSlot';
import { Button } from '../../components/common/Button';
import { dataService } from '../../services/dataService';
import { Dentist } from '../../types';

export const DentistsPage: React.FC = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getDentists().then((data) => {
      setDentists(data.filter((d) => d.isActive));
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl space-y-4 mb-16">
          <Eyebrow>Clinical Direction</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1B1F1E] tracking-tight leading-[1.05]">
            Meet the Dentists
          </h1>
          <p className="text-base sm:text-lg text-[#5C6360] leading-relaxed">
            Our registered clinicians bring dedicated post-graduate training, calm clinical skill, and open communication to your care.
          </p>
        </div>

        {/* Image-led Grid (4:5), name, specialty, short bio from data, "Book with Dr. X" link */}
        {loading ? (
          <div className="py-12 text-sm text-[#5C6360]">Loading team profiles...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-16 border-b border-[#DDD8CF]">
            {dentists.map((dentist) => (
              <div key={dentist.id} className="space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* 4:5 ImageSlot */}
                  <ImageSlot
                    aspectRatio="4:5"
                    src={dentist.avatarUrl}
                    alt={`Portrait of ${dentist.name}`}
                    className="object-cover"
                  />

                  <div className="space-y-1">
                    <h2 className="font-serif text-2xl text-[#1B1F1E] leading-tight">
                      {dentist.name}
                    </h2>
                    <p className="text-xs uppercase tracking-wider text-[#5C6360] font-medium">
                      {dentist.title}
                    </p>
                    <p className="text-xs text-[#5C6360]">
                      {dentist.qualifications} · {dentist.registrationNumber}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C6360] leading-relaxed line-clamp-3">
                    {dentist.bio}
                  </p>

                  <div className="pt-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#5C6360] block font-semibold mb-1">
                      Specialties
                    </span>
                    <p className="text-xs text-[#1B1F1E]">
                      {dentist.specialties.join(', ')}
                    </p>
                  </div>
                </div>

                {/* "Book with Dr. X" Link */}
                <div className="pt-4 border-t border-[#DDD8CF]">
                  <Link
                    to="/book"
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0F4C4A] hover:underline"
                  >
                    Book with {dentist.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Booking Summary */}
        <div className="pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl text-[#1B1F1E]">
              Schedule your consultation
            </h3>
            <p className="text-sm text-[#5C6360]">
              Browse available slots in our real-time clinic diary.
            </p>
          </div>
          <Button to="/book" variant="primary" size="md">
            Book appointment
          </Button>
        </div>
      </Container>
    </div>
  );
};
