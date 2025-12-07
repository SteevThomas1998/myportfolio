export interface Project {
    title: string
    slug: string
    description: string
    longDescription: string
    tags: string[]
    link: string
    githubLink?: string
    features: string[]
}

export const allProjects: Project[] = [
    {
        title: "E-Commerce Platform",
        slug: "e-commerce-platform",
        description: "A full-stack e-commerce solution built with Next.js, Prisma, and Stripe integration for payments.",
        longDescription: "A comprehensive e-commerce solution designed for scalability and performance. This platform features a custom-built cart and checkout system, real-time inventory tracking, and a secure admin dashboard for managing products and orders. The frontend is optimized for SEO and core web vitals, ensuring a seamless shopping experience.",
        tags: ["Next.js", "TypeScript", "Stripe", "Prisma", "Web Development"],
        link: "/projects/e-commerce-platform",
        githubLink: "https://github.com",
        features: [
            "Secure Stripe Payment Integration",
            "Real-time Inventory Management",
            "Admin Dashboard with Analytics",
            "Server-side Rendering for SEO",
            "Responsive Mobile-First Design"
        ]
    },
    {
        title: "Task Management App",
        slug: "task-management-app",
        description: "Real-time task collaboration tool using Socket.io and React for seamless team updates.",
        longDescription: "A collaborative task management tool that helps teams stay organized. Built with real-time capabilities at its core, users can see updates instantly as team members create, move, or complete tasks. It includes features like drag-and-drop boards, comments, and file attachments.",
        tags: ["React", "Node.js", "Socket.io", "Express", "Web Development"],
        link: "/projects/task-management-app",
        githubLink: "https://github.com",
        features: [
            "Real-time Updates via Socket.io",
            "Drag-and-Drop Kanaban Board",
            "Team Collaboration & Comments",
            "User Authentication & Permissions",
            "Dark Mode Support"
        ]
    },
    {
        title: "AI Content Generator",
        slug: "ai-content-generator",
        description: "SaaS application that uses OpenAI API to generate marketing content for businesses.",
        longDescription: "Leveraging the power of GPT models, this SaaS application helps marketers create high-quality content in seconds. Users can generate blog posts, social media captions, and email newsletters based on simple prompts. The system includes template management and export options.",
        tags: ["Next.js", "OpenAI API", "Tailwind CSS", "AI/ML"],
        link: "/projects/ai-content-generator",
        githubLink: "https://github.com",
        features: [
            "OpenAI GPT-4 Integration",
            "Custom Tone & Style Settings",
            "History & Draft Management",
            "Export to Markdown/HTML",
            "Usage Quotas & Subscription Management"
        ]
    },
    {
        title: "Finance Dashboard",
        slug: "finance-dashboard",
        description: "Interactive dashboard for personal finance tracking with data visualization.",
        longDescription: "A data-driven personal finance tracker that helps users visualize their spending habits. Using D3.js and Recharts, it turns complex financial data into intuitive charts and graphs. Users can verify recurring transactions, set budgets, and view monthly trends.",
        tags: ["React", "Recharts", "D3.js", "Web Development"],
        link: "/projects/finance-dashboard",
        githubLink: "https://github.com",
        features: [
            "Interactive Data Visualization",
            "Budget Planning & Alerts",
            "Transaction Categorization",
            "CSV Data Import/Export",
            "Secure Local Storage"
        ]
    },
    {
        title: "Social Media API",
        slug: "social-media-api",
        description: "Robust REST API for social media features including posts, comments, and likes.",
        longDescription: "A scalable backend service designed to power social networking applications. It handles complex relationships between users, posts, and interactions efficiently. Built with performance and security in mind, it includes rate limiting, caching, and comprehensive test coverage.",
        tags: ["Node.js", "PostgreSQL", "Docker", "Jest", "Backend"],
        link: "/projects/social-media-api",
        githubLink: "https://github.com",
        features: [
            "RESTful Architecture",
            "JWT Authentication",
            "PostgreSQL Complex Queries",
            "Redis Caching Strategy",
            "Docker Containerization"
        ]
    },
    {
        title: "Portfolio Website",
        slug: "portfolio-website",
        description: "Modern portfolio website with dark mode, animations, and premium UI design.",
        longDescription: "The website you are looking at right now. It serves as a digital business card and portfolio showcase. Built with the latest web technologies, it emphasizes performance, accessibility, and modern aesthetics.",
        tags: ["Next.js", "Shadcn UI", "Framer Motion", "Web Development"],
        link: "/projects/portfolio-website",
        githubLink: "https://github.com",
        features: [
            "Next.js App Router",
            "Framer Motion Animations",
            "Responsive & Accessible",
            "Dynamic Content Loading",
            "SEO Optimized"
        ]
    },
    {
        title: "Mobile Fitness Tracker",
        slug: "mobile-fitness-tracker",
        description: "React Native application for tracking workouts and nutrition with offline support.",
        longDescription: "A cross-platform mobile application for fitness enthusiasts. It functions completely offline, syncing data when a connection is available. Features include workout logging, nutrition tracking, and progress visualization charts.",
        tags: ["React Native", "Firebase", "Mobile"],
        link: "/projects/mobile-fitness-tracker",
        githubLink: "https://github.com",
        features: [
            "Cross-Platform (iOS & Android)",
            "Offline-First Architecture",
            "Real-time Sync with Firebase",
            "Biometric Login",
            "Push Notifications"
        ]
    },
    {
        title: "Image Classification Model",
        slug: "image-classification-model",
        description: "Python-based deep learning model for classifying plant diseases from leaf images.",
        longDescription: "A research project focusing on agricultural technology. This deep learning model achieves high accuracy in identifying common plant diseases from simple smartphone photos. It uses a convolutional neural network (CNN) trained on a publicly available dataset.",
        tags: ["Python", "TensorFlow", "OpenCV", "AI/ML"],
        link: "/projects/image-classification-model",
        githubLink: "https://github.com",
        features: [
            "Convolutional Neural Network (CNN)",
            "Data Augmentation Pipeline",
            "High Accuracy > 95%",
            "Model Optimization for Edge Devices",
            "Python & TensorFlow Implementation"
        ]
    }
]
