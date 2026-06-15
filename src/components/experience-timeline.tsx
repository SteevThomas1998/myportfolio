"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

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
        <div className="relative border-l border-emerald-500/30 ml-4 md:ml-6 space-y-12">
            {experienceData.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.2, delay: index * 0.07 }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Timeline Dot */}
                    <span className="absolute top-0 left-[-5px] md:left-[-6px] rounded-full h-3 w-3 bg-emerald-500 ring-4 ring-background" />

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-emerald-600 dark:text-emerald-400 font-mono mb-1">
                            {item.year}
                        </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold leading-none">{item.title}</h3>
                            <span className="text-muted-foreground">{item.company}</span>
                        </div>
                        <ul className="mt-2 max-w-2xl space-y-1.5">
                            {item.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {item.skills.map((skill) => (
                                <Badge key={skill} className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
