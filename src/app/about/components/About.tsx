'use client';
import React, { useState } from 'react'
import { I_About } from '@/types/project'
import { bricolage_grotesque } from '@/utils/fonts'
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Badge, Separator } from '@radix-ui/themes'
import Title from '@/components/ui/Title';


const About = () => {
    const [isMore, setIsMore] = useState<boolean>(false);
    return (
        <div className='w-full px-64 max-[1285px]:px-52 max-lg:px-4 max-sm:px-5 flex flex-col items-center mt-4 pb-8'>
            <Title title='My Journey to Full-Stack Development' />

            <div className="w-full pl-36 pr-28 max-sm:px-2">

                {data.slice(0, 3).map((item, idx) => (
                    <div key={idx}>
                        <h1 className={`text-2xl max-sm:text-xl mt-8 font-medium ${bricolage_grotesque}`}>{item.year}</h1>
                        <div className="flex pl-2 mt-4">
                            <div className={`w-full flex flex-col gap-3`}>

                                {item.events.map((event, idx) => (
                                    <div key={idx} className={`flex items-center gap-2 ${bricolage_grotesque}`}>
                                        <span><Separator orientation='horizontal' size='1' className='w-8 bg-black dark:bg-gray-400' /></span>
                                        <span className='text-[15px] max-sm:text-sm dark:text-[#dfdede]'>{event}</span>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                ))}

                <div className={`flex justify-center mt-5 ${isMore ? 'hidden' : 'block'}`}>
                    <Badge color="gray" variant="solid" highContrast onClick={() => setIsMore(true)} className={`text-xs max-sm:text-[10px] w-20 flex items-center text-center dark:hover:bg-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-800 ${bricolage_grotesque}`}>
                        <span>See More</span>
                        <span className='!ml-[-3px] mt-[1px]'>
                            <ChevronDownIcon className='h-3 w-3 dark:!text-black !text-white  shrink-0 text-muted-foreground transition-transform duration-200' />
                        </span>
                    </Badge>
                </div>

                {
                    isMore && data.slice(3).map((item, idx) => (
                        <div key={idx}>
                            <h1 className={`text-2xl mt-8 font-medium ${bricolage_grotesque}`}>{item.year}</h1>
                            <div className="flex pl-2 mt-4">
                                <div className={`w-full flex flex-col gap-3 ${bricolage_grotesque}`}>

                                    {item.events.map((event, idx) => (
                                        <div key={idx} className={`flex items-center gap-2 ${bricolage_grotesque}`}>
                                            <span><Separator orientation='horizontal' size='1' className='w-8 bg-black dark:bg-gray-400' /></span>
                                            <span className='text-[15px] dark:text-[#dfdede]'>{event}</span>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    ))
                }


                <div className={`flex justify-center mt-5 ${isMore ? 'block' : 'hidden'}`}>
                    <Badge color="gray" variant="solid" highContrast onClick={() => setIsMore(false)} className={`text-xs max-sm:text-[10px] w-20 flex items-center text-center dark:hover:bg-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-800 ${bricolage_grotesque}`}>
                        <span>See Less</span>
                        <span className='!ml-[-3px] mt-[1px]'>
                            <ChevronDownIcon className='rotate-180 h-3 w-3 dark:!text-black !text-white shrink-0 text-muted-foreground transition-transform duration-200' />
                        </span>
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default About


const data: I_About[] = [
    {
        year: 2025,
        events: [
            "Expanding my expertise in AI-driven web applications and exploring advanced full-stack architectures. 🚀",
            "Building innovative projects that combine modern web technologies with intelligent features."
        ]
    },
    {
        year: 2024,
        events: [
            "Mastered full-stack development with React, Next.js, Node.js, and MongoDB, building scalable web applications. �",
            "Developed expertise in modern web technologies including TypeScript, Prisma, and cloud deployment. ⚡",
            "Created multiple projects showcasing proficiency in both frontend and backend development.",
            "Gained hands-on experience with authentication systems, database design, and API development. 🔧"
        ]
    },
    {
        year: 2023,
        events: [
            "Dove deep into web development, learning React and JavaScript fundamentals. 📚",
            "Started building my first web applications and discovered my passion for creating user-friendly interfaces. 🎨",
            "Began exploring backend technologies and database management systems.",
            "Completed various coding challenges and projects to strengthen my programming skills. �"
        ]
    },
    {
        year: 2022,
        events: [
            "Started my journey in computer science and programming fundamentals. 🎓",
            "Learned the basics of programming languages including C, C++, and Python.",
            "Discovered the world of web development and became fascinated by the possibilities. 🌐"
        ]
    },
    {
        year: 2021,
        events: [
            "Completed higher secondary education and decided to pursue computer science. 📖",
            "First exposure to programming concepts and logical thinking.",
            "Developed interest in technology and problem-solving through code. 🧩"
        ]
    },
    {
        year: 2020,
        events: [
            "Navigated through challenging times during the pandemic while focusing on academics. 😷",
            "Used the time to explore different career paths and discovered my interest in technology. 🔍"
        ]
    },
    {
        year: 2019,
        events: [
            "Focused on academic excellence and exploring various subjects to find my true calling. 📚",
            "Developed strong analytical and problem-solving skills through mathematics and science. 🧮"
        ]
    },
    {
        year: 2018,
        events: [
            "Continued building a strong foundation in academics and extracurricular activities. 🏆",
            "Started developing an interest in how technology works behind the scenes. 🔧"
        ]
    },
    {
        year: 2017,
        events: [
            "Maintained consistent academic performance while exploring different interests. 📈",
            "First meaningful interactions with computers and technology in school. �"
        ]
    },
    {
        year: 2002,
        events: [
            "The beginning of my journey - born with curiosity and destined to become a developer! 👶🏼 ✨"
        ]
    },
];
