'use client'

import { MagicCard } from '@/components/ui/magic-card'
import ShineBorder from '@/components/ui/shine-border'
import { useDarkMode } from '@/hooks/useDarkMode'
import { I_CompanyProjects, Project } from '@/types/project'
import { bricolage_grotesque, inter } from '@/utils/fonts'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Badge, Link } from '@radix-ui/themes'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import ProjectCard from './ProjectCard'

interface CompanyCardProps {
    company: I_CompanyProjects
    isOpen: boolean
    onToggle: () => void
}

const CompanyCard = ({ company, isOpen, onToggle }: CompanyCardProps) => {
    const { isDarkMode } = useDarkMode()
    const count = company.projects.length

    return (
        <div className='w-full'>
            <MagicCard className="cursor-pointer rounded-lg dark:shadow-2xl w-full h-fit border-none !bg-transparent [&>div:first-child]:w-full [&>div:first-child]:min-w-0" gradientColor={`${isDarkMode ? '#262626' : 'rgba(197, 241, 241, 0.4)'}`}>
                <ShineBorder className={`border h-full w-full relative rounded-lg flex flex-col justify-center items-start md:shadow-xl !bg-transparent !pointer-events-none`} color={["#FF9933", "#FFFFFF", "#138808"]}>

                    <div className='w-full px-4 py-4 max-sm:px-3'>
                        <div className='flex items-start gap-4 max-sm:gap-3'>
                            <div className='shrink-0 !pointer-events-auto'>
                                {company.company_link ? (
                                    <Link href={company.company_link} target='_blank'>
                                        <Image src={company.company_logo} alt={`${company.company_name}-logo`} width={44} height={44} className='rounded-full' />
                                    </Link>
                                ) : (
                                    <Image src={company.company_logo} alt={`${company.company_name}-logo`} width={44} height={44} className='rounded-full' />
                                )}
                            </div>

                            <div className='w-full min-w-0'>
                                <div className='flex items-start justify-between gap-2'>
                                    <h1 className={`text-lg max-sm:text-base text-black dark:text-white font-bold tracking-tight text-start ${bricolage_grotesque}`}>
                                        {company.company_name}
                                    </h1>
                                    <span className={`text-xs max-sm:text-[10px] shrink-0 mt-1 dark:text-[#D1D5DB] ${bricolage_grotesque}`}>
                                        {company.duration}
                                    </span>
                                </div>
                                <p className={`text-sm max-sm:text-xs mt-[2px] dark:text-[#D1D5DB] ${inter}`}>{company.role}</p>

                                <div className='flex gap-1 mt-3 flex-wrap !pointer-events-auto'>
                                    {company.techStack.map((tech, idx) => (
                                        <Badge key={idx} color="gray" variant="outline" highContrast className={`text-[10px] dark:hover:!bg-white hover:!bg-black hover:!text-white dark:hover:!text-black !pointer-events-auto ${bricolage_grotesque}`}>
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>

                                <div className='mt-4 !pointer-events-auto'>
                                    <Badge
                                        color="gray"
                                        variant="solid"
                                        highContrast
                                        onClick={onToggle}
                                        className={`text-[10px] py-[3px] px-2 flex items-center gap-1 cursor-pointer dark:hover:bg-gray-300 hover:bg-gray-800 ${bricolage_grotesque}`}
                                    >
                                        <span>{isOpen ? 'Hide Projects' : 'View All Projects'}</span>
                                        <span className={`${count ? '' : 'hidden'}`}>({count})</span>
                                        <ChevronDownIcon
                                            className={`h-3 w-3 dark:!text-black !text-white shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    key='projects'
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className='overflow-hidden !pointer-events-auto'
                                >
                                    <div className='pt-5 mt-5 border-t border-neutral-200 dark:border-neutral-800'>
                                        {count > 0 ? (
                                            <div className='flex w-full flex-col gap-4 lg:flex-row flex-wrap items-stretch'>
                                                {company.projects.map((project: Project, idx: number) => (
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
                                        ) : (
                                            <p className={`text-sm max-sm:text-xs text-center py-6 dark:text-[#D1D5DB] ${inter}`}>
                                                Projects from this role are being added soon.
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ShineBorder>
            </MagicCard>
        </div>
    )
}

export default CompanyCard
