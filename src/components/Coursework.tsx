'use client'

import { MagicCard } from './ui/magic-card'
import Image from 'next/image';
import { Link } from '@radix-ui/themes';
import { I_Coursework } from '@/types/project';
import { inter, bricolage_grotesque } from '@/utils/fonts';
import Title from './ui/Title';
import { useDarkMode } from '@/hooks/useDarkMode';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Coursework = () => {
    const { isDarkMode } = useDarkMode()
    return (
        <div className='w-1/2 max-lg:w-full max-lg:px-20 max-sm:w-full max-sm:px-5 flex flex-col items-center mt-4 pb-8'>
            <Title title='Coursework' />

            <span className='mt-2'></span>
            {data.map((course, idx) => (
                <MagicCard key={idx} className="cursor-pointer dark:shadow-2xl h-fit mt-2 !bg-transparent border-none" gradientColor={`${isDarkMode ? '#262626' : 'rgba(197, 241, 241, 0.4)'}`}>
                    <div className="flex !justify-between w-[50vw] max-lg:w-full max-sm:w-full px-5 max-sm:px-0 py-3">
                        <div className="w-full flex">
                            <div className="w-24 h-12 flex justify-center">
                                <Link href={course.course_link} target='_blank'>
                                    <Image src={course.course_company_logo} alt='100xdevs' width={50} height={50} className='rounded-full' />
                                </Link>
                            </div>
                            <div className="w-full">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <div className={`max-lg:w-[68vw] w-full flex justify-between max-[350px]:justify-start ${bricolage_grotesque}`}>
                                            <AccordionTrigger>
                                                <h2 className='text-base max-sm:text-[15px] font-semibold text-start'>{course.course_title}</h2>
                                            </AccordionTrigger>
                                            <span className='text-xs max-sm:text-[10px] max-sm:hidden pr-1'>{course.duration}</span>
                                        </div>
                                        <p className={`text-sm max-sm:text-xs ${inter}`}>{course.course_company_name} </p>
                                        <AccordionContent className='mt-2 max-sm:text-[11px]'>
                                            {course.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </MagicCard>
            ))}
        </div>
    )
}

export default Coursework


const data: I_Coursework[] = [
    {
        course_link: 'https://app.100xdevs.com/',
        course_company_logo: "/100xdevs.jpeg",
        course_title: "Full Stack + DevOps + Web3 Cohort",
        duration: 'Aug 2024 - March 2025',
        course_company_name: "100xDevs by Harkirat Singh",
        description: "Comprehensive program covering advanced full-stack development, DevOps practices, and Web3 technologies. Gained hands-on experience with CI/CD pipelines, cloud infrastructure (AWS), Docker, Kubernetes, and blockchain development. Built production-ready applications with modern deployment strategies and learned decentralized application (dApp) development.",
    },
    {
        course_link: 'https://www.coderarmy.in/',
        course_company_logo: "https://cdn.discordapp.com/icons/1152852753400479787/c1e616df16d105fa53ba5f58e12afb67.webp?size=60",
        course_title: "Data Structures & Algorithms Mastery",
        duration: 'Aug 2023 - Feb 2024',
        course_company_name: "Coder Army",
        description: "Intensive DSA program focusing on competitive programming and technical interview preparation. Mastered complex data structures (trees, graphs, heaps), advanced algorithms (dynamic programming, greedy algorithms), and problem-solving techniques. Solved 200+ coding problems across LeetCode, CodeChef, and Codeforces platforms.",
    },
    {
        course_link: 'https://www.youtube.com/@ChaiAurCode',
        course_company_logo: "/chai-code-logo.png",
        course_title: "JavaScript & React Fundamentals",
        duration: 'Jan 2023 - Aug 2023',
        course_company_name: "Chai aur Code",
        description: "Comprehensive JavaScript and React course covering ES6+ features, DOM manipulation, asynchronous programming, React hooks, state management, and modern development practices. Built multiple projects including todo apps, weather applications, and interactive web components.",
    },
    {
        course_link: 'https://leetcode.com/u/enigma-09/',
        course_company_logo: "/leetcode-logo.png",
        course_title: "Competitive Programming",
        duration: '2023 - Present',
        course_company_name: "LeetCode & Online Platforms",
        description: "Active competitive programmer with consistent practice on LeetCode, CodeChef, and Codeforces. Solved 300+ problems across various difficulty levels, participated in weekly contests, and maintained a strong problem-solving streak. Focus on optimizing time and space complexity.",
    },
];