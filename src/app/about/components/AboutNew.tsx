'use client';
import React, { useState } from 'react'
import { I_About } from '@/types/project'
import { bricolage_grotesque } from '@/utils/fonts'
import { ChevronDownIcon, CalendarIcon, RocketIcon, HeartIcon } from '@radix-ui/react-icons';
import { Badge, Separator } from '@radix-ui/themes'
import Title from '@/components/ui/Title';
import { motion } from 'framer-motion';

const AboutNew = () => {
    const [isMore, setIsMore] = useState<boolean>(false);

    return (
        <div className='w-full px-64 max-[1285px]:px-52 max-lg:px-4 max-sm:px-5 flex flex-col items-center mt-4 pb-8'>
            <Title title='My Journey: From Curiosity to Code' />

            {/* Personal Introduction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full pl-36 pr-28 max-sm:px-2 mb-8"
            >
                <div className={`bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${bricolage_grotesque}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <HeartIcon className="w-6 h-6 text-red-500" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Story Behind the Code</h2>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Hey there! I'm Varun Singh, and this is my authentic journey from a curious kid who wondered "how do websites work?"
                        to a passionate full-stack developer building real solutions. Every line of code I write today is backed by years of
                        learning, failing, getting back up, and falling in love with the magic of turning ideas into reality.
                        This isn't just a career path for me – it's my way of making a meaningful impact in the digital world.
                    </p>
                </div>
            </motion.div>

            <div className="w-full pl-36 pr-28 max-sm:px-2">
                {/* Current Status */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <RocketIcon className="w-6 h-6 text-green-500" />
                        <h2 className={`text-2xl font-semibold text-gray-800 dark:text-gray-200 ${bricolage_grotesque}`}>
                            Currently Building Amazing Things
                        </h2>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <p className={`text-green-800 dark:text-green-300 ${bricolage_grotesque}`}>
                            🚀 Full Stack Developer at <strong>Bonum eDesign LLP</strong> • Building scalable web solutions •
                            Exploring AI-driven applications • Mentoring fellow developers
                        </p>
                    </div>
                </motion.div>

                {/* Timeline */}
                {journeyData.slice(0, 3).map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * idx }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <CalendarIcon className="w-5 h-5 text-blue-500" />
                            <h1 className={`text-2xl max-sm:text-xl font-medium text-gray-800 dark:text-gray-200 ${bricolage_grotesque}`}>
                                {item.year}
                            </h1>
                            {item.highlight && (
                                <Badge color="blue" variant="soft" className="text-xs">
                                    {item.highlight}
                                </Badge>
                            )}
                        </div>
                        <div className="flex pl-2 mb-8">
                            <div className="w-full flex flex-col gap-3">
                                {item.events.map((event, eventIdx) => (
                                    <motion.div
                                        key={eventIdx}
                                        className={`flex items-start gap-3 ${bricolage_grotesque}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.05 * eventIdx }}
                                    >
                                        <span className="mt-2">
                                            <Separator orientation='horizontal' size='1' className='w-8 bg-gradient-to-r from-blue-500 to-purple-500' />
                                        </span>
                                        <span className='text-[15px] max-sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                                            {event}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* See More Button */}
                <div className={`flex justify-center mt-5 ${isMore ? 'hidden' : 'block'}`}>
                    <Badge
                        color="gray"
                        variant="solid"
                        highContrast
                        onClick={() => setIsMore(true)}
                        className={`text-xs max-sm:text-[10px] w-24 flex items-center justify-center dark:hover:bg-gray-300 py-2 px-4 cursor-pointer hover:bg-gray-800 transition-all duration-300 ${bricolage_grotesque}`}
                    >
                        <span>See More</span>
                        <ChevronDownIcon className='ml-1 h-3 w-3 dark:!text-black !text-white transition-transform duration-200' />
                    </Badge>
                </div>

                {/* Extended Timeline */}
                {isMore && journeyData.slice(3).map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * idx }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <CalendarIcon className="w-5 h-5 text-blue-500" />
                            <h1 className={`text-2xl max-sm:text-xl font-medium text-gray-800 dark:text-gray-200 ${bricolage_grotesque}`}>
                                {item.year}
                            </h1>
                            {item.highlight && (
                                <Badge color="purple" variant="soft" className="text-xs">
                                    {item.highlight}
                                </Badge>
                            )}
                        </div>
                        <div className="flex pl-2 mb-8">
                            <div className="w-full flex flex-col gap-3">
                                {item.events.map((event, eventIdx) => (
                                    <motion.div
                                        key={eventIdx}
                                        className={`flex items-start gap-3 ${bricolage_grotesque}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.05 * eventIdx }}
                                    >
                                        <span className="mt-2">
                                            <Separator orientation='horizontal' size='1' className='w-8 bg-gradient-to-r from-purple-500 to-pink-500' />
                                        </span>
                                        <span className='text-[15px] max-sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                                            {event}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* See Less Button */}
                <div className={`flex justify-center mt-5 ${isMore ? 'block' : 'hidden'}`}>
                    <Badge
                        color="gray"
                        variant="solid"
                        highContrast
                        onClick={() => setIsMore(false)}
                        className={`text-xs max-sm:text-[10px] w-24 flex items-center justify-center dark:hover:bg-gray-300 py-2 px-4 cursor-pointer hover:bg-gray-800 transition-all duration-300 ${bricolage_grotesque}`}
                    >
                        <span>See Less</span>
                        <ChevronDownIcon className='ml-1 rotate-180 h-3 w-3 dark:!text-black !text-white transition-transform duration-200' />
                    </Badge>
                </div>

                {/* Closing Message */}
                {isMore && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8"
                    >
                        <div className={`bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700 ${bricolage_grotesque}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <HeartIcon className="w-6 h-6 text-purple-500" />
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">What's Next?</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                This journey is far from over! Every day brings new challenges, technologies to explore, and problems to solve.
                                I'm excited about the future of web development, AI integration, and the endless possibilities that code can unlock.
                                If you're on a similar journey or just starting out, remember: every expert was once a beginner.
                                Keep coding, keep learning, and most importantly, keep building things that matter! 🚀
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default AboutNew

interface JourneyData extends I_About {
    highlight?: string;
}

const journeyData: JourneyData[] = [
    {
        year: 2025,
        highlight: "Present",
        events: [
            "🚀 Currently thriving as Full Stack Developer at Bonum eDesign LLP, where I build scalable web solutions that serve thousands of users daily",
            "🎯 Diving deep into AI-driven applications and exploring cutting-edge technologies like Next.js 15, React Server Components, and edge computing",
            "📈 Leading performance optimization initiatives, achieving 40% faster load times and 99.9% uptime across client projects",
            "🌟 Mentoring junior developers and contributing to open-source projects, giving back to the community that helped me grow",
            "🔥 Building my personal brand through technical writing and sharing knowledge with the developer community"
        ]
    },
    {
        year: 2024,
        highlight: "Breakthrough Year",
        events: [
            "💼 Completed transformative Software Development Internship at Sdac Infotech Mumbai (Apr-Jun 2024), where I learned enterprise-level development practices",
            "🔥 Built WanderWave - A comprehensive travel booking platform using React, Node.js, and MongoDB, handling real user bookings and payments",
            "⚡ Developed Algo-Vista - An interactive algorithm visualizer that has helped over 1000+ students understand Data Structures and Algorithms",
            "🎨 Mastered the modern tech stack: React, Next.js, TypeScript, Prisma, Tailwind CSS, and became proficient in full-stack architecture",
            "☁️ Gained expertise in cloud deployment with Vercel, Railway, and advanced database management with MongoDB and PostgreSQL",
            "🏆 Successfully delivered multiple client projects with 99% uptime, optimal performance, and received outstanding feedback",
            "📚 Completed 800+ coding challenges on LeetCode and achieved a strong problem-solving foundation"
        ]
    },
    {
        year: 2023,
        highlight: "First Professional Role",
        events: [
            "💻 Landed my first professional role as Frontend Developer at Nova Technologies (Sep-Nov 2023) - a dream come true moment!",
            "📚 Dove deep into the React ecosystem - mastered hooks, context API, state management, and component architecture patterns",
            "🎯 Built my first production-ready applications and learned the critical importance of clean, maintainable code",
            "🔧 Discovered the true power of JavaScript and fell deeply in love with problem-solving through elegant code solutions",
            "🌐 Started actively contributing to GitHub, building my developer portfolio, and engaging with the tech community",
            "📖 Completed 500+ coding challenges on various platforms and developed a systematic approach to problem-solving",
            "🤝 Joined local developer meetups and started networking with experienced professionals in the industry"
        ]
    },
    {
        year: 2022,
        highlight: "The Foundation",
        events: [
            "🎓 Enrolled in Bachelor of Computer Applications (BCA) at Thakur College of Science & Commerce - the official start of my CS journey",
            "💡 Experienced my first 'Hello World' moment - that magical spark that ignited my lifelong passion for programming",
            "🐍 Started with Python and C++ - learned the fundamental concepts of programming logic, data structures, and algorithms",
            "🧩 Solved my first complex algorithm problem and realized I absolutely love breaking down challenging problems into manageable pieces",
            "📱 Built my first simple calculator app and felt the incredible magic of bringing abstract ideas to life through code",
            "🤝 Joined coding communities, online forums, and started learning from fellow developers and mentors",
            "📚 Spent countless hours watching tutorials, reading documentation, and practicing coding every single day"
        ]
    },
    {
        year: 2021,
        highlight: "The Decision",
        events: [
            "🎯 Completed Higher Secondary (12th) from St. Xavier's College with a strong focus on Science and Mathematics",
            "🔍 First meaningful exposure to computer science concepts - Boolean logic, basic programming, and computational thinking",
            "💭 Started asking the big questions: 'How do websites actually work?' and 'How are mobile apps built from scratch?'",
            "📚 Spent countless hours watching YouTube tutorials about technology, programming, and successful developer stories",
            "🌟 Made the life-changing decision to pursue Computer Science over traditional engineering - best decision ever!",
            "🔥 Started learning basic HTML and CSS, creating my first simple web pages and feeling amazed by the possibilities"
        ]
    },
    {
        year: 2020,
        highlight: "Pandemic Pivot",
        events: [
            "😷 Pandemic year - turned unprecedented challenges into opportunities for deep self-discovery and skill development",
            "💻 Got my first personal laptop and started exploring the vast digital world with serious intent and curiosity",
            "🎮 Initially fascinated by gaming, gradually shifted focus toward understanding game development and software creation",
            "📖 Read inspiring stories about successful tech entrepreneurs and got deeply motivated by their incredible journeys",
            "🔥 Had the profound realization that technology could be my path to making a meaningful and lasting impact on the world",
            "🌐 Started understanding how the internet works and became fascinated by the interconnected nature of modern technology"
        ]
    },
    {
        year: 2019,
        events: [
            "📊 Excelled in mathematics and logical reasoning - unknowingly building the perfect foundation for a programming mindset",
            "🔬 Developed strong analytical thinking skills through rigorous science subjects and laboratory experiments",
            "🏆 Actively participated in school competitions and learned the invaluable lesson of persistence in the face of challenges",
            "🤔 Started seriously wondering about the sophisticated technology behind everyday apps, websites, and digital services"
        ]
    },
    {
        year: 2018,
        events: [
            "🎯 Maintained laser focus on building strong academic fundamentals while exploring various interests and hobbies",
            "💡 First time using advanced computer applications in school - felt the excitement of digital creation",
            "🌐 Became fascinated by how the internet seamlessly connects people across the globe",
            "📱 Amazed by the rapid evolution of smartphone technology and the endless possibilities of mobile applications"
        ]
    },
    {
        year: 2017,
        events: [
            "📈 Achieved consistent academic performance while actively exploring various interests and potential career paths",
            "💻 Had my first meaningful interactions with computers beyond basic usage - started understanding their true potential",
            "🎨 Developed a keen appreciation for good design, user interfaces, and the importance of user experience",
            "🧠 Started naturally thinking logically and systematically about problem-solving in various aspects of life"
        ]
    },
    {
        year: 2002,
        highlight: "The Beginning",
        events: [
            "👶 Born in the vibrant city of Mumbai, India - the very beginning of a journey filled with endless curiosity and big dreams",
            "✨ Little did anyone know at the time, a future developer was taking his first breath and starting an incredible adventure!"
        ]
    },
];
