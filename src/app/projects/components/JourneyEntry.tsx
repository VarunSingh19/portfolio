'use client'

import { MagicCard } from '@/components/ui/magic-card'
import ShineBorder from '@/components/ui/shine-border'
import { useDarkMode } from '@/hooks/useDarkMode'
import { I_CompanyProjects, Project } from '@/types/project'
import { bricolage_grotesque, inter } from '@/utils/fonts'
import { ArrowRightIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { Badge, Link } from '@radix-ui/themes'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import ProjectCard from './ProjectCard'

interface JourneyEntryProps {
    company: I_CompanyProjects
    isOpen: boolean
    onToggle: () => void
    index: number
}

/** Pulls the leading year out of "Aug 2024 - Oct 2025" for the rail marker. */
const startYear = (duration: string) => duration.match(/\d{4}/)?.[0] ?? ''

const JourneyEntry = ({ company, isOpen, onToggle, index }: JourneyEntryProps) => {
    const { isDarkMode } = useDarkMode()
    const reduceMotion = useReducedMotion()
    const count = company.projects.length
    const isCurrent = /present/i.test(company.duration)

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.32), ease: 'easeOut' }}
            className='relative pl-12 sm:pl-14 lg:pl-32 pb-10 last:pb-0'
        >
            {/* Year marker — only where the rail has room to breathe */}
            <div className={`hidden lg:block absolute left-0 top-[1.55rem] w-16 text-right text-xs tracking-widest text-neutral-400 dark:text-neutral-500 ${bricolage_grotesque}`}>
                {startYear(company.duration)}
            </div>

            {/* Node on the spine */}
            <span
                className='absolute left-4 sm:left-5 lg:left-24 top-[1.6rem] -translate-x-1/2 flex items-center justify-center'
                aria-hidden
            >
                {isCurrent && (
                    <span className='absolute h-3.5 w-3.5 rounded-full bg-[#138808]/30 motion-safe:animate-ping' />
                )}
                <span
                    className={`relative h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-black transition-colors ${isOpen || isCurrent
                        ? 'bg-gradient-to-br from-[#FF9933] to-[#138808]'
                        : 'bg-neutral-300 dark:bg-neutral-700'
                        }`}
                />
            </span>

            <MagicCard
                className='cursor-pointer rounded-xl dark:shadow-2xl w-full h-fit border-none !bg-transparent [&>div:first-child]:w-full [&>div:first-child]:min-w-0'
                gradientColor={`${isDarkMode ? '#262626' : 'rgba(197, 241, 241, 0.4)'}`}
            >
                <ShineBorder
                    borderRadius={12}
                    className='border h-full w-full relative rounded-xl flex flex-col justify-center items-start md:shadow-xl !bg-transparent !pointer-events-none'
                    color={['#FF9933', '#FFFFFF', '#138808']}
                >
                    <div className='w-full px-4 py-4 sm:px-5 sm:py-5'>
                        <div className='flex items-start gap-3 sm:gap-4'>
                            <div className='shrink-0 !pointer-events-auto rounded-full p-[2px] bg-gradient-to-br from-[#FF9933] via-transparent to-[#138808]'>
                                {company.company_link && company.company_link !== '#' ? (
                                    <Link href={company.company_link} target='_blank'>
                                        <Image src={company.company_logo} alt={`${company.company_name} logo`} width={42} height={42} className='rounded-full bg-white dark:bg-black object-cover h-[42px] w-[42px]' />
                                    </Link>
                                ) : (
                                    <Image src={company.company_logo} alt={`${company.company_name} logo`} width={42} height={42} className='rounded-full bg-white dark:bg-black object-cover h-[42px] w-[42px]' />
                                )}
                            </div>

                            <div className='w-full min-w-0'>
                                <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                                    <h2 className={`text-base sm:text-lg text-black dark:text-white font-bold tracking-tight ${bricolage_grotesque}`}>
                                        {company.company_name}
                                    </h2>
                                    {isCurrent && (
                                        <span className={`text-[9px] uppercase tracking-wider px-1.5 py-[1px] rounded-full border border-[#138808]/40 text-[#138808] dark:text-[#4ade80] dark:border-[#4ade80]/40 ${bricolage_grotesque}`}>
                                            Now
                                        </span>
                                    )}
                                </div>

                                <p className={`text-xs sm:text-sm mt-1 text-neutral-600 dark:text-[#D1D5DB] ${inter}`}>
                                    {company.role}
                                    <span className='mx-1.5 text-neutral-300 dark:text-neutral-700'>|</span>
                                    <span className='whitespace-nowrap'>{company.duration}</span>
                                </p>

                                <div className='flex gap-1 mt-3 flex-wrap !pointer-events-auto'>
                                    {company.techStack.map((tech, idx) => (
                                        <Badge key={idx} color='gray' variant='outline' highContrast className={`text-[10px] dark:hover:!bg-white hover:!bg-black hover:!text-white dark:hover:!text-black !pointer-events-auto ${bricolage_grotesque}`}>
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>

                                <div className='mt-4 !pointer-events-auto'>
                                    <button
                                        type='button'
                                        onClick={onToggle}
                                        aria-expanded={isOpen}
                                        className={`group/btn inline-flex items-center gap-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1 text-[11px] transition-colors hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white ${bricolage_grotesque}`}
                                    >
                                        <span>{isOpen ? 'Hide projects' : 'View all projects'}</span>
                                        {count > 0 && (
                                            <span className='opacity-60 tabular-nums'>{count}</span>
                                        )}
                                        {isOpen ? (
                                            <ChevronDownIcon className='h-3 w-3 shrink-0 rotate-180 transition-transform duration-300' />
                                        ) : (
                                            <ArrowRightIcon className='h-3 w-3 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5' />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Branch off the journey */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    key='projects'
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    className='overflow-hidden !pointer-events-auto'
                                >
                                    <div className='mt-5 pt-5 border-t border-dashed border-neutral-200 dark:border-neutral-800'>
                                        {count > 0 ? (
                                            <div className='relative sm:pl-5'>
                                                {/* sub-rail: the branch */}
                                                <span className='hidden sm:block absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-[#FF9933]/50 via-neutral-200 to-transparent dark:via-neutral-800' aria-hidden />
                                                <div className='flex w-full flex-col lg:flex-row gap-4 flex-wrap items-stretch'>
                                                    {company.projects.map((project: Project, idx: number) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.08 + idx * 0.06 }}
                                                            className='w-full lg:w-[calc(50%-0.5rem)] flex'
                                                        >
                                                            <ProjectCard
                                                                logo={project.logo}
                                                                title={project.title}
                                                                description={project.description}
                                                                techStack={project.techStack}
                                                                link={project.link}
                                                                source={project.source}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className={`text-xs sm:text-sm text-center py-5 text-neutral-500 dark:text-neutral-400 ${inter}`}>
                                                Projects from this chapter are being written up soon.
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ShineBorder>
            </MagicCard>
        </motion.div>
    )
}

export default JourneyEntry
