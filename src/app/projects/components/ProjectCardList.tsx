'use client'

import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';
import Title from '@/components/ui/Title';
import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Badge } from '@radix-ui/themes';
import { bricolage_grotesque } from '@/utils/fonts';

const ProjectCardList = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  return (
    <div className='w-full h-fit px-64 max-[1025px]:px-4 max-[1285px]:px-40 max-lg:px-0 max-sm:px-4 flex flex-col items-center mt-4 pb-8'>
      <Title title='Proof of Work' />

      <div className="flex w-full flex-col gap-4 lg:flex-row mt-4 px-32 max-lg:px-0 max-sm:px-0 flex-wrap items-center ml-14 max-sm:ml-0 max-lg:ml-0 max-[350px]:mr-5 max-[321px]:mr-10">
        {data.slice(0, visibleProjects).map((project: Project, idx: number) => (
          <ProjectCard
            key={idx}
            logo={project.logo}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            link={project.link}
            source={project.source}
          />
        ))}
      </div>
      {visibleProjects < data.length && (
        <Badge color="gray" variant="solid" highContrast onClick={loadMoreProjects} className={`text-xs max-sm:text-[10px] flex items-center text-center dark:hover:bg-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-800 mt-6 ${bricolage_grotesque}`}>
          <span>Load More</span>
          <span className='!ml-[-3px] mt-[1px]'>
            <ChevronDownIcon className='h-3 w-3 dark:!text-black !text-white shrink-0 text-muted-foreground transition-transform duration-200' />
          </span>
        </Badge>
      )}
    </div>
  )
}

export default ProjectCardList;

const data: Project[] = [
  {
    logo: '/wanderwave.png',
    title: 'WanderWave',
    description: 'A full-stack MERN SaaS platform for trip planning, digital wallets, and social coordination; secured with JWT, RESTful APIs, and optimized MongoDB for 2× faster data retrieval.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'REST API'],
    link: 'https://wanderwaveus.vercel.app/',
    source: 'https://github.com/VarunSingh19/WanderWave',
  },
  {
    logo: '/vibe-armor.png',
    title: 'Vibe Armor',
    description: 'An algorithm visualization tool built with Next.js and TypeScript; leverages SSR and static site generation to cut load times by 60%, deployed with CI/CD on Vercel.',
    techStack: ['Next.js', 'TypeScript', 'SSR', 'Vercel', 'CI/CD'],
    link: 'https://www.vibearmor.com/',
    source: 'https://github.com/VarunSingh19/vibe-armor',
  },
  {
    logo: '/student-showcase.png',
    title: 'Student Showcase',
    description: 'A dynamic portfolio builder allowing students to create and customize digital showcases with tagged metadata, boosting recruiter engagement by 45%.',
    techStack: ['React', 'Tailwind CSS', 'Modular UI', 'Searchable Metadata'],
    link: 'https://student-showcase-sepia.vercel.app/',
    source: 'https://github.com/VarunSingh19/StudentShowcase',
  },
];
