import { I_CompanyProjects, I_Education, I_Experience } from "@/types/project";

export const experienceData: I_Experience[] = [
  {
    company_link: "#",
    company_logo: "/company-icon.png",
    company_name: "ZAP Solutionz",
    duration: "Oct 2025 - Present",
    job_title: "Full Stack Engineer",
    description:
      "Building and shipping full-stack features end to end, owning both the frontend and the backend services behind them. Set up and maintain CI/CD pipelines with Docker-based builds and deployments to keep releases fast and repeatable. Work closely with the team to refine requirements, review code, and keep the codebase maintainable as it grows.",
  },
  {
    company_link: "https://bonum.in/",
    company_logo: "/bonum.webp",
    company_name: "Bonum eDesign LLP",
    duration: "Aug 2024 - Oct 2025",
    job_title: "Full-stack Developer",
    description:
      "Engineered and deployed responsive UIs using modern frontend technologies, leading to a 30% increase in user interaction. Enhanced page performance and reduced load time by 40%, positively impacting SEO and bounce rates. Integrated RESTful APIs and collaborated with backend developers to ensure seamless full-stack delivery.",
  },
  {
    company_link: "#",
    company_logo: "/company-icon.png",
    company_name: "Yanaca Global Technologies Private Limited",
    duration: "Jan 2024 - Aug 2024",
    job_title: "Full Stack Engineer",
    description:
      "Developed and maintained full-stack web applications, contributing to both client-facing interfaces and the APIs powering them. Collaborated on-site with the engineering team to translate product requirements into shipped features and resolve production issues.",
  },
  {
    company_link: "http://www.sdacinfotech.com/",
    company_logo: "/sdac.webp",
    company_name: "Sdac Infotech",
    duration: "Apr 2024 - Jun 2024",
    job_title: "Software Development Intern",
    description:
      "Orchestrated end-to-end development using Java, integrating generative AI models to automate content generation. Analyzed user behavior and market trends to design product roadmaps that increased feature adoption by 25%. Collaborated across Agile teams to implement scalable CRUD systems and improve product reliability by 35%.",
  },
];

export const educationData: I_Education[] = [
  {
    institute_link: "https://www.thakurcollegeofscience.ac.in/",
    institute_logo: "/tcsc.webp",
    course_title: "Bachelor of Science in Computer Science (BSc CS)",
    ending_date: "2025",
    institute_name: "Thakur College Of Science And Commerce",
    cgpa: 8.0,
    description:
      "Completed Computer Science degree with comprehensive coursework in programming fundamentals, data structures, algorithms, database management, software engineering, and web technologies. Actively participated in coding competitions, hackathons, and technical workshops. Built strong foundation in both theoretical concepts and practical application development.",
  },
  {
    institute_link: "https://www.thakurcollegeofscience.ac.in/",
    institute_logo: "/tcsc.webp",
    course_title: "Higher Secondary Education (XII) - Science",
    ending_date: "2022",
    institute_name: "Thakur College Of Science And Commerce, Kandivali East",
    cgpa: 7.5,
    description:
      "Completed Higher Secondary Education with Science stream (Physics, Chemistry, Mathematics). Achieved 75% marks with strong foundation in analytical thinking, problem-solving, and mathematical concepts. Participated in science exhibitions and academic competitions.",
  },
  {
    institute_link: "https://stxaviershighschool.edu.in/",
    institute_logo: "/xaviers.jpg",
    course_title: "Secondary Education (X) - ICSE",
    ending_date: "2020",
    institute_name: "St Xaviers High School",
    cgpa: 7.5,
    description:
      "Completed Secondary Education under ICSE board with 75% marks. Strong academic performance across all subjects with particular excellence in Mathematics and Science. Developed foundational skills in logical reasoning and analytical thinking.",
  },
  {
    institute_link: "https://itechcomputer.edu.in/",
    institute_logo: "/itech.webp",
    course_title: "Computer Fundamentals Certification",
    ending_date: "February 2022",
    institute_name: "I Tech Computer Education, Mumbai",
    cgpa: 8.5,
    description:
      "Completed comprehensive computer education program covering basic programming concepts, computer fundamentals, and digital literacy. Gained early exposure to programming languages and software development concepts, laying the foundation for future technical learning.",
  },
];

export const companyProjectsData: I_CompanyProjects[] = [
  {
    slug: "zap-solutionz",
    company_name: "ZAP Solutionz",
    company_logo: "/company-icon.png",
    company_link: "#",
    role: "Full Stack Engineer",
    duration: "Oct 2025 - Present",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "CI/CD"],
    projects: [],
  },
  {
    slug: "bonum-edesign",
    company_name: "Bonum eDesign LLP",
    company_logo: "/bonum.webp",
    company_link: "https://bonum.in/",
    role: "Full-stack Developer",
    duration: "Aug 2024 - Oct 2025",
    techStack: ["React", "Next.js", "Tailwind CSS", "REST API", "MongoDB"],
    projects: [],
  },
  {
    slug: "yanaca-global",
    company_name: "Yanaca Global Technologies",
    company_logo: "/company-icon.png",
    company_link: "#",
    role: "Full Stack Engineer",
    duration: "Jan 2024 - Aug 2024",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "REST API"],
    projects: [],
  },
  {
    slug: "sdac-infotech",
    company_name: "Sdac Infotech",
    company_logo: "/sdac.webp",
    company_link: "http://www.sdacinfotech.com/",
    role: "Software Development Intern",
    duration: "Apr 2024 - Jun 2024",
    techStack: ["Java", "Generative AI", "CRUD Systems", "Agile"],
    projects: [],
  },
  {
    slug: "personal",
    company_name: "Personal & Open Source",
    company_logo: "/company-icon.png",
    role: "Solo Builder",
    duration: "2023 - Present",
    techStack: ["Next.js", "TypeScript", "MERN", "Tailwind CSS", "Vercel"],
    projects: [
      {
        logo: "/wanderwave.png",
        title: "WanderWave",
        description:
          "A full-stack MERN SaaS platform for trip planning, digital wallets, and social coordination; secured with JWT, RESTful APIs, and optimized MongoDB for 2x faster data retrieval.",
        techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "REST API"],
        link: "https://wanderwaveus.vercel.app/",
        source: "https://github.com/VarunSingh19/WanderWave",
      },
      {
        logo: "/vibe-armor.png",
        title: "Vibe Armor",
        description:
          "An algorithm visualization tool built with Next.js and TypeScript; leverages SSR and static site generation to cut load times by 60%, deployed with CI/CD on Vercel.",
        techStack: ["Next.js", "TypeScript", "SSR", "Vercel", "CI/CD"],
        link: "https://www.vibearmor.com/",
        source: "https://github.com/VarunSingh19/vibe-armor",
      },
      {
        logo: "/student-showcase.png",
        title: "Student Showcase",
        description:
          "A dynamic portfolio builder allowing students to create and customize digital showcases with tagged metadata, boosting recruiter engagement by 45%.",
        techStack: ["React", "Tailwind CSS", "Modular UI", "Searchable Metadata"],
        link: "https://student-showcase-sepia.vercel.app/",
        source: "https://github.com/VarunSingh19/StudentShowcase",
      },
    ],
  },
];
