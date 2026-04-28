export interface Project {
    title: string
    slug: string
    description: string
    longDescription: string
    tags: string[]
    link: string
    liveLink?: string
    githubLink?: string
    image?: string
    features: string[]
}

export const allProjects: Project[] = [
    {
        title: "Stealeen — AI Job Application Tracker",
        slug: "stealeen-job-tracker",
        description: "Full-stack AI-powered job application tracker with automated Gmail scanning and intelligent job detail parsing.",
        longDescription: "Stealeen is a full-stack application that takes the friction out of job hunting. It automatically scans your Gmail inbox via Google Apps Script to detect job application emails, then uses AI to parse and extract structured job details — company, role, status, and more — directly into a clean dashboard built on Supabase (PostgreSQL). Designed end-to-end with maintainability and real-world API integration in mind.",
        tags: ["React", "Node.js", "Supabase", "PostgreSQL", "Google Apps Script", "AI"],
        link: "/projects/stealeen-job-tracker",
        liveLink: "https://www.stealeen.com",
        githubLink: "https://github.com/SteevThomas1998/job-tracker",
        image: "/images/projects/stealeen.png",
        features: [
            "Automated Gmail scanning via Google Apps Script",
            "AI-powered job detail parsing and extraction",
            "Supabase (PostgreSQL) database with relational schema",
            "Full-stack React + Node.js architecture",
            "REST API design and integration",
            "End-to-end maintainable codebase"
        ]
    },
    {
        title: "Physio de Casa — Real-Time Physiotherapy App",
        slug: "physio-de-casa",
        description: "Real-time physiotherapy web app using webcam-based pose detection powered by TensorFlow.js for guided exercises.",
        longDescription: "Physio de Casa brings physiotherapy guidance into the browser using live webcam-based pose detection. Built with React and TensorFlow.js, it analyses body position in real time and provides feedback on exercise form — no app download or wearable required. Built to production-ready quality with clean component architecture, solid state management, and a focus on accessibility and performance.",
        tags: ["React", "TensorFlow.js", "Pose Detection", "JavaScript", "CSS3"],
        link: "/projects/physio-de-casa",
        liveLink: "https://physio-de-casa.vercel.app/",
        githubLink: "https://github.com/SteevThomas1998/Physio-de-casa",
        image: "/images/projects/physio-de-casa.png",
        features: [
            "Real-time webcam-based pose detection via TensorFlow.js",
            "Live exercise form feedback in the browser",
            "Clean, reusable React component architecture",
            "Robust state management across sessions",
            "Production-ready code quality",
            "Zero-install — runs entirely in the browser"
        ]
    },
    {
        title: "Portfolio Website",
        slug: "portfolio-website",
        description: "This portfolio — built with Next.js, Tailwind CSS, Shadcn UI, and Framer Motion with a VS Code-style command palette.",
        longDescription: "The site you are on right now. A modern developer portfolio built with Next.js 14 App Router, Tailwind CSS, and Shadcn UI. Features include a ⌘K command palette for instant navigation, Framer Motion animations, dark/light mode, an interactive tech stack radar chart, a contact form with email integration, and full responsiveness across all devices.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
        link: "/projects/portfolio-website",
        githubLink: "https://github.com/SteevThomas1998/myportfolio",
        image: "/images/projects/portfolio.png",
        features: [
            "⌘K Command palette for instant navigation",
            "Next.js 14 App Router with TypeScript",
            "Framer Motion entrance and scroll animations",
            "Dark / light mode with system detection",
            "Interactive tech stack radar chart (Recharts)",
            "Contact form with Resend email integration"
        ]
    }
]
