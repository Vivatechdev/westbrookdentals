import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Eyebrow } from '../common/Eyebrow';
import { ImageSlot } from '../common/ImageSlot';
import { dataService } from '../../services/dataService';
import { Dentist } from '../../types';

export const MeetDentistsSection: React.FC = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    dataService.getDentists().then((data) => {
      setDentists(data.filter((d) => d.isActive).slice(0, 4));
    }).catch(() => {});
  }, []);

  return (
    <section className="bg-[#F6F3EE] py-16 md:py-24 border-b border-[#DDD8CF]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <Eyebrow>Clinical Team</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1F1E] tracking-tight">
              Meet the dentists.
            </h2>
          </div>
          <Link
            to="/dentists"
            className="text-xs uppercase tracking-wider font-semibold text-[#0F4C4A] hover:underline"
          >
            All clinicians & credentials →
          </Link>
        </div>

        {/* Image-led Grid, Name and Specialty beneath, No cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dentists.map((dentist) => (
            <div key={dentist.id} className="space-y-4 group">
              <Link to={`/book?dentistId=${dentist.id}`} className="block focus-visible:outline-2 focus-visible:outline-[#0F4C4A]">
                <ImageSlot
                  aspectRatio="4:5"
                  src={dentist.avatarUrl}
                  alt={`Portrait of ${dentist.name}`}
                  className="transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </Link>

              <div className="space-y-1">
                <Link
                  to={`/book?dentistId=${dentist.id}`}
                  className="font-serif text-2xl text-[#1B1F1E] hover:text-[#0F4C4A] transition-colors block leading-tight"
                >
                  {dentist.name}
                </Link>
                <p className="text-xs uppercase tracking-wider text-[#5C6360] font-medium">
                  {dentist.title}
                </p>
                <p className="text-xs text-[#5C6360] line-clamp-1 pt-1">
                  {dentist.specialties.join(' • ')}
                </p>
                <div className="pt-2">
                  <Link
                    to={`/book?dentistId=${dentist.id}`}
                    className="inline-flex text-xs font-medium text-[#0F4C4A] hover:underline"
                  >
                    Book with {dentist.name.split(' ')[1] || 'clinician'} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
