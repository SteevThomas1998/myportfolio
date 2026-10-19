// Scrollytelling beats for the home page case-study reels.
// Each reel is narrated in three acts: the brief, the build, the cut.

export interface Reel {
    slug: string
    title: string
    logline: string
    image: string
    year: string
    genre: string
    acts: { label: string; heading: string; body: string }[]
    stack: string[]
}

export const reels: Reel[] = [
    {
        slug: "macromade-shopify-theme",
        title: "MacroMade",
        logline: "A meal-prep brand that needed a storefront built around the subscription, not a template.",
        image: "/images/projects/macromade-home.png",
        year: "2026",
        genre: "Commerce",
        acts: [
            {
                label: "I. The brief",
                heading: "Sell a week of food, not a product.",
                body: "Customers had to discover macro-tracked meals, filter by training goal, and build a weekly box. No off-the-shelf theme came close.",
            },
            {
                label: "II. The build",
                heading: "A custom box builder in Liquid.",
                body: "Box sizes, meal picks and a sticky summary of macros, price and savings. Subscriptions run through a client-side BoxSession and ReCharge selling plans. One-off orders use the AJAX Cart API.",
            },
            {
                label: "III. The cut",
                heading: "Every step is measured.",
                body: "GA4 events from view_item through to purchase, a cart drawer that gates checkout on macros, and theme-editor schema so the brand team can run it without me.",
            },
        ],
        stack: ["Shopify OS 2.0", "Liquid", "JavaScript", "ReCharge", "GA4"],
    },
    {
        slug: "stealeen-job-tracker",
        title: "Stealeen",
        logline: "Job hunting is a data problem hiding in your inbox.",
        image: "/images/projects/stealeen.png",
        year: "2025",
        genre: "AI / SaaS",
        acts: [
            {
                label: "I. The brief",
                heading: "Stop copy-pasting applications into spreadsheets.",
                body: "Application confirmations, rejections and interview invites were scattered across Gmail with no single view.",
            },
            {
                label: "II. The build",
                heading: "Gmail in, structured data out.",
                body: "Google Apps Script watches the inbox, and an AI parser pulls out company, role and status into a relational Supabase schema behind a React and Node dashboard.",
            },
            {
                label: "III. The cut",
                heading: "Live at stealeen.com.",
                body: "A full-stack product with real API integrations, designed end to end so it stays easy to maintain.",
            },
        ],
        stack: ["React", "Node.js", "Supabase", "PostgreSQL", "Apps Script", "AI"],
    },
    {
        slug: "physio-de-casa",
        title: "Physio de Casa",
        logline: "A physiotherapist that lives in your webcam.",
        image: "/images/projects/physio-de-casa.png",
        year: "2024",
        genre: "Computer Vision",
        acts: [
            {
                label: "I. The brief",
                heading: "Guided rehab with no app and no wearable.",
                body: "Patients doing exercises at home get no feedback on their form, so the browser had to become the coach.",
            },
            {
                label: "II. The build",
                heading: "Pose detection, live in the browser.",
                body: "TensorFlow.js tracks body landmarks frame by frame, and React components turn joint angles into real-time cues.",
            },
            {
                label: "III. The cut",
                heading: "Zero install. Runs anywhere.",
                body: "Production-grade component architecture and session state, with attention to accessibility and frame-rate performance.",
            },
        ],
        stack: ["React", "TensorFlow.js", "Pose Detection", "JavaScript"],
    },
    {
        slug: "kerelite",
        title: "Kerelite",
        logline: "Banana leaf, slow-dum biryani, and a brand that tastes like home.",
        image: "/images/projects/kerelite.png",
        year: "2026",
        genre: "Brand",
        acts: [
            {
                label: "I. The brief",
                heading: "Kerala catering, from weddings to boardrooms.",
                body: "A catering company needed a site that carried the warmth of its food: tadka on banana leaf, karimeen polichathu, backwater feasts.",
            },
            {
                label: "II. The build",
                heading: "Hand-built, no framework.",
                body: "Vanilla HTML, CSS and JS on a Node and Express backend, with a curated menu, an event gallery and an enquiry flow.",
            },
            {
                label: "III. The cut",
                heading: "Deployed on Railway. Still cooking.",
                body: "In active development, adding more dishes and more stories with each release.",
            },
        ],
        stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    },
]

// Higgsfield key art per reel: a wide poster for the project page and a 1200x630 link preview
export function reelArt(slug: string) {
    const index = reels.findIndex((r) => r.slug === slug)
    if (index === -1) return null
    return {
        reel: reels[index],
        number: String(index + 1).padStart(2, "0"),
        poster: `/cinema/reels/${slug}.webp`,
        og: `/cinema/reels/og/${slug}.jpg`,
    }
}
