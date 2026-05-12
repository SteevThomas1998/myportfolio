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
    images?: string[]
    features: string[]
    inDevelopment?: boolean
    isPreviousWork?: boolean
}

export const allProjects: Project[] = [
    {
        title: "MacroMade — Custom Shopify Theme",
        slug: "macromade-shopify-theme",
        description: "Custom Shopify theme for a performance meal-prep brand — featuring a box builder, subscription workflow, macro tracking, cart drawer, and GA4 ecommerce analytics.",
        longDescription: "MacroMade is a fully custom Shopify Online Store 2.0 theme built for a performance-focused meal-prep brand. Rather than adapting a generic storefront, the entire experience is designed around the meal subscription journey: customers discover macro-tracked meals, filter by training goals and dietary needs, build a weekly meal box, and choose between weekly subscription and one-time purchase options.\n\nThe centrepiece is a custom box builder on the product page — customers select a box size, pick meals, and track their progress through a sticky summary bar showing meal count, macros, pricing, and savings. Weekly subscription mode stores selections in a client-side BoxSession using localStorage, then adds the weekly box product with ReCharge selling plan data at checkout. One-time purchase mode uses the Shopify AJAX Cart API directly.\n\nThe theme also includes a filterable menu page (goal, diet, protein, calories, chef's picks), a custom cart drawer with macro totals and checkout gating, GA4 ecommerce event tracking, and a fully configurable theme editor schema for brand, pricing, analytics, and social settings.",
        tags: ["Shopify", "Liquid", "JavaScript", "CSS3", "AJAX Cart API", "GA4", "ReCharge"],
        link: "/projects/macromade-shopify-theme",
        liveLink: "https://macromade-3.myshopify.com",
        githubLink: "https://github.com/SteevThomas1998",
        image: "/images/projects/macromade-home.png",
        images: [
            "/images/projects/macromade-home.png",
            "/images/projects/macromade-box.png",
        ],
        features: [
            "Custom box builder — select size, pick meals, track macros and progress",
            "Weekly subscription mode with client-side BoxSession and ReCharge selling plan support",
            "One-time purchase mode via Shopify AJAX Cart API",
            "Cart drawer with meal progress, macro totals, and checkout gating",
            "Filterable menu page by goal, diet, protein, calories, and chef's picks",
            "GA4 ecommerce tracking — view_item, add_to_cart, begin_checkout, purchase",
            "Shopify Online Store 2.0 — modular Liquid sections and JSON templates",
            "Theme editor schema for brand, pricing, analytics, and social config"
        ]
    },
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
        title: "Kerelite — Kerala Catering Website",
        slug: "kerelite",
        description: "Brand website for a Kerala catering company — showcasing authentic dishes, event gallery, and catering services for weddings, backwaters, and boardrooms.",
        longDescription: "Kerelite is a brand website built for an authentic Kerala catering company. The site showcases the brand's identity around traditional dishes — tadka on banana leaf, slow-dum biryani, and karimeen polichathu — served at weddings, corporate events, and celebrations. Built with vanilla HTML, CSS, and JavaScript on a Node.js/Express backend, the site features a curated menu display, photo gallery, service overview, and contact enquiry flow. Deployed on Railway and currently in active development.",
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
        link: "/projects/kerelite",
        liveLink: "https://kerelite-production.up.railway.app",
        image: "/images/projects/kerelite.png",
        images: ["/images/projects/kerelite.png"],
        inDevelopment: true,
        features: [
            "Brand identity design centred on authentic Kerala cuisine",
            "Curated menu showcase with dish descriptions",
            "Event and catering services overview",
            "Photo gallery of dishes and events",
            "Contact and enquiry flow",
            "Node.js/Express backend deployed on Railway"
        ]
    },
    {
        title: "Rehoboth Pentecostal Church — Website & Admin",
        slug: "rehoboth-church",
        description: "Full church website for Rehoboth Pentecostal Church Dublin, with a built-in admin panel for managing sermons, events, gallery, and content.",
        longDescription: "Rehoboth is a full church website built for Rehoboth Pentecostal Church Dublin. The public-facing site includes pages for Home, About Us, Ministries, Sermons, Events, Gallery, and Contact. Behind the scenes, a custom admin panel allows church staff to manage all site content — including sermon uploads, event listings, and gallery images — without touching code. Built with vanilla HTML/CSS/JS on a Node.js/Express backend, the site is deployed on Railway and is currently in active development.",
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
        link: "/projects/rehoboth-church",
        liveLink: "https://rehoboth-church-website-production.up.railway.app",
        image: "/images/projects/rehoboth.png",
        images: ["/images/projects/rehoboth.png"],
        inDevelopment: true,
        features: [
            "Public site: Home, About, Ministries, Sermons, Events, Gallery, Contact",
            "Custom admin panel for non-technical content management",
            "Sermon upload and listing management",
            "Event scheduling and announcements",
            "Gallery management for photos",
            "Node.js/Express backend deployed on Railway"
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
    },
    {
        title: "Morth Mariam Knanaya Church — Philadelphia",
        slug: "morth-mariam-church",
        description: "Church website for Morth Mariam Knanaya Church, Philadelphia — built with WordPress and Elementor, hosted on Plesk.",
        longDescription: "A full church website built for Morth Mariam Knanaya Church in Philadelphia, PA. The site includes pages for About, QURBONO (liturgy), Gallery, News & Events, and Contact. Built with WordPress using the Elementor page builder and various plugins, hosted on Plesk.",
        tags: ["WordPress", "Elementor", "PHP", "Plesk"],
        link: "/projects/morth-mariam-church",
        liveLink: "https://morthmariamknanayachurch.org",
        image: "/images/projects/morth-mariam.png",
        images: ["/images/projects/morth-mariam.png"],
        isPreviousWork: true,
        features: [
            "Multi-page church website with About, Gallery, News & Events",
            "QURBONO (liturgy) section with structured content",
            "Photo gallery for church events and community",
            "Contact and enquiry page",
            "Built with WordPress + Elementor page builder",
            "Hosted and managed on Plesk"
        ]
    },
    {
        title: "Bethel Prayer Fellowship — Stevenage, UK",
        slug: "bethel-prayer-fellowship",
        description: "Church website for Bethel Prayer Fellowship Stevenage — built with WordPress and Elementor, hosted on Plesk.",
        longDescription: "A church website built for Bethel Prayer Fellowship in Stevenage, UK. The site covers Home, About, Events, Gallery, and Connect sections, providing the congregation with a central hub for updates and community engagement. Built with WordPress using the Elementor page builder and plugins, hosted on Plesk.",
        tags: ["WordPress", "Elementor", "PHP", "Plesk"],
        link: "/projects/bethel-prayer-fellowship",
        liveLink: "https://bethelpfstevenage.org",
        image: "/images/projects/bethel-pf.png",
        images: ["/images/projects/bethel-pf.png"],
        isPreviousWork: true,
        features: [
            "Multi-page church website with About, Events, Gallery, Connect",
            "Events listing for congregation updates",
            "Community photo gallery",
            "Contact and connect page",
            "Built with WordPress + Elementor page builder",
            "Hosted and managed on Plesk"
        ]
    },
    {
        title: "Hadaeq Est. Al-Kharj — Corporate Website",
        slug: "hadaeq-al-kharj",
        description: "Corporate website for Hadaeq Est. Al-Kharj, a construction and facilities management company in Saudi Arabia — built with WordPress and Elementor.",
        longDescription: "A corporate website built for Hadaeq Est. Al-Kharj, a construction and facilities management establishment based in Al-Kharj, Saudi Arabia. The site presents the company's services, quality management practices, and completed projects, along with a downloadable company profile. Built with WordPress using the Elementor page builder and plugins, hosted on Plesk.",
        tags: ["WordPress", "Elementor", "PHP", "Plesk"],
        link: "/projects/hadaeq-al-kharj",
        liveLink: "https://alhadaeq.com",
        image: "/images/projects/alhadaeq.png",
        images: ["/images/projects/alhadaeq.png"],
        isPreviousWork: true,
        features: [
            "Corporate site with About, Quality Management, Projects, Contact",
            "Company profile download (PDF)",
            "Project portfolio showcase",
            "Quality management standards section",
            "Built with WordPress + Elementor page builder",
            "Hosted and managed on Plesk"
        ]
    }
]
