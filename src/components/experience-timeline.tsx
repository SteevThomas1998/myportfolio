"use client"

import { motion } from "framer-motion"

const experienceData = [
    {
        year: "Jun 2026 – Present",
        title: "AI & Web Developer",
        company: "NutreeLife Ltd · United Kingdom",
        bullets: [
            "Building and maintaining web applications with a focus on integrating AI-driven features into product workflows.",
            "Developing intelligent tools and automation pipelines to support the company's food-tech platform.",
            "Collaborating across design and product teams to deliver responsive, user-focused interfaces.",
        ],
        skills: ["AI Integration", "React", "Next.js", "Shopify", "Liquid", "Git"]
    },
    {
        year: "Sep 2024 – Dec 2025",
        title: "E-Commerce Developer (Part-time)",
        company: "Ledivano Italia · Dublin, Ireland",
        bullets: [
            "Built and maintained a full Shopify storefront using Liquid templating — managing 100+ product listings with 99%+ data accuracy.",
            "Wrote JavaScript customisations and theme modifications, introducing card-based layouts and embedded video — improving session duration by ~20%.",
            "Delivered a full platform migration (WordPress → Shopify) in under 6 weeks with zero downtime.",
            "Implemented on-page SEO and Google Analytics instrumentation, driving a ~15% improvement in add-to-cart conversion rate.",
        ],
        skills: ["Shopify", "Liquid", "JavaScript", "SEO", "Google Analytics", "Git"]
    },
    {
        year: "Feb 2022 – Jan 2024",
        title: "Web Developer (Remote)",
        company: "Stride Real Estate LLC · Dallas, TX, USA",
        bullets: [
            "Developed and maintained 3 production Angular and React applications supporting real estate operations — achieving 99.5%+ uptime.",
            "Reduced average page load time by ~30% through AWS CloudFront CDN integration and front-end performance optimisation.",
            "Managed 4–6 concurrent projects with remote teams across 3+ time zones — delivering all major milestones on or ahead of schedule.",
            "Resolved client-reported bugs with an average turnaround of under 48 hours, maintaining consistently high satisfaction ratings.",
        ],
        skills: ["Angular", "React", "Node.js", "AWS CloudFront", "EC2", "REST APIs"]
    },
    {
        year: "Mar 2021 – Feb 2022",
        title: "WordPress Developer",
        company: "Winsoft Solutions · Kochi, India",
        bullets: [
            "Delivered 12+ full-scale WordPress websites across retail, hospitality, and services — all launched on schedule with zero post-launch critical defects.",
            "Reduced average site deployment time by ~25% by standardising reusable theme and plugin configuration workflows.",
            "Contributed to SEO-optimised product pages achieving top-3 Google rankings for 3 client accounts within 90 days.",
        ],
        skills: ["WordPress", "MySQL", "PHP", "cPanel", "Plesk", "SEO"]
    }
]

export function ExperienceTimeline() {
    return (
        <div className="divide-y divide-reel-bone/10 border-y border-reel-bone/10">
            {experienceData.map((item, index) => (
                <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-10"
                >
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-reel-bone/50">
                        <span className="text-reel-sodium">Take {String(experienceData.length - index).padStart(2, "0")}</span>
                        <br />
                        {item.year}
                    </div>
                    <div>
                        <h3 className="font-display text-3xl leading-tight text-reel-bone sm:text-4xl">{item.title}</h3>
                        <p className="mt-1 font-serif text-lg italic text-reel-bone/60">{item.company}</p>
                        <ul className="mt-5 max-w-3xl space-y-2.5">
                            {item.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3 font-serif text-reel-bone/75 sm:text-[17px]">
                                    <span className="mt-[0.6em] h-px w-4 shrink-0 bg-reel-sodium" />
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-reel-bone/45 sm:text-[11px]">
                            {item.skills.join(" · ")}
                        </p>
                    </div>
                </motion.article>
            ))}
        </div>
    )
}
