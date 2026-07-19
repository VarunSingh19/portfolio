'use client'

import Title from '@/components/ui/Title';
import { I_CompanyProjects } from '@/types/project';
import { companyProjectsData } from '@/utils/constant';
import { inter } from '@/utils/fonts';
import { useState } from 'react';
import CompanyCard from './CompanyCard';

const ProjectCardList = () => {
  const [openCompany, setOpenCompany] = useState<string | null>(null);

  const toggleCompany = (slug: string) => {
    setOpenCompany((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className='w-full h-fit px-64 max-[1025px]:px-4 max-[1285px]:px-40 max-lg:px-6 max-sm:px-4 flex flex-col items-center mt-4 pb-8'>
      <Title title='Proof of Work' />
      <p className={`text-sm max-sm:text-xs text-center mt-2 dark:text-[#D1D5DB] ${inter}`}>
        The places I have built at, and what I shipped there.
      </p>

      <div className='flex w-full flex-col gap-4 mt-8'>
        {companyProjectsData.map((company: I_CompanyProjects) => (
          <CompanyCard
            key={company.slug}
            company={company}
            isOpen={openCompany === company.slug}
            onToggle={() => toggleCompany(company.slug)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectCardList;
