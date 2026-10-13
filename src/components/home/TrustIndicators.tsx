import React, { useEffect, useState } from 'react';
import { Container } from '../common/Container';
import { dataService } from '../../services/dataService';

export const TrustIndicators: React.FC = () => {
  const [stats, setStats] = useState({
    dentistsCount: 4,
    servicesCount: 9,
    workingDays: '6 days a week',
  });

  useEffect(() => {
    Promise.all([
      dataService.getDentists(),
      dataService.getServices(),
      dataService.getScheduleRules(),
    ]).then(([dentists, services, rules]) => {
      const activeDentists = dentists.filter((d) => d.isActive).length;
      const activeServices = services.filter((s) => s.isActive).length;
      const openDaysCount = rules.filter((r) => r.isOpen).length;

      setStats({
        dentistsCount: activeDentists || 4,
        servicesCount: activeServices || 9,
        workingDays: `${openDaysCount || 6} days a week`,
      });
    }).catch(() => {});
  }, []);

  return (
    <section className="bg-[#FFFFFF] border-y border-[#DDD8CF] py-10 md:py-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DDD8CF]">
          {/* Stat 1 */}
          <div className="py-4 sm:py-0 sm:px-6 first:pl-0">
            <span className="font-serif text-3xl md:text-4xl text-[#1B1F1E] block">
              {stats.dentistsCount}
            </span>
            <p className="text-xs uppercase tracking-wider text-[#5C6360] mt-1 font-medium">
              Registered clinicians
            </p>
          </div>

          {/* Stat 2 */}
          <div className="py-4 sm:py-0 sm:px-6">
            <span className="font-serif text-3xl md:text-4xl text-[#1B1F1E] block">
              {stats.servicesCount}
            </span>
            <p className="text-xs uppercase tracking-wider text-[#5C6360] mt-1 font-medium">
              Preventative & clinical services
            </p>
          </div>

          {/* Stat 3 */}
          <div className="py-4 sm:py-0 sm:px-6">
            <span className="font-serif text-3xl md:text-4xl text-[#1B1F1E] block">
              {stats.workingDays}
            </span>
            <p className="text-xs uppercase tracking-wider text-[#5C6360] mt-1 font-medium">
              Practice opening schedule
            </p>
          </div>

          {/* Stat 4 */}
          <div className="py-4 sm:py-0 sm:px-6">
            <span className="font-serif text-3xl md:text-4xl text-[#1B1F1E] block">
              30–60 min
            </span>
            <p className="text-xs uppercase tracking-wider text-[#5C6360] mt-1 font-medium">
              Unhurried appointment slots
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
