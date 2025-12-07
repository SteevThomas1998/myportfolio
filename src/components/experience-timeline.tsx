"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experienceData = [
    {
        year: "Sep 2024 – Present",
        title: "Web Developer (Part Time)",
        company: "Ledivano Italia",
        description: "Maintained and optimized a dynamic WordPress website, ensuring accurate stock updates and custom templates. Enhanced site performance and usability through front-end adjustments.",
        skills: ["WordPress", "PHP", "HTML", "CSS"]
    },
    {
        year: "Feb 2022 – Jan 2024",
        title: "Full Stack Developer - Remote",
        company: "Stride Real Estate LLC",
        description: "Built and maintained Angular and React applications for real estate operations. Added data visualization features and contributed to the development of KOSEApp.",
        skills: ["Angular", "React", "React Native", "Node.js", "AWS"]
    },
    {
        year: "Mar 2021 – Feb 2022",
        title: "WordPress Developer",
        company: "Winsoft Solutions",
        description: "Delivered full-scale WordPress sites using premium themes and plugins. Managed deployments via cPanel and Plesk.",
        skills: ["WordPress", "MySQL", "cPanel", "Plesk"]
    }
]

export function ExperienceTimeline() {
    return (
        <div className="relative border-l border-muted-foreground/30 ml-4 md:ml-6 space-y-12">
            {experienceData.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Timeline Dot */}
                    <span className="absolute top-0 left-[-5px] md:left-[-6px] rounded-full h-2.5 w-2.5 bg-primary ring-4 ring-background" />

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted-foreground font-mono mb-1">
                            {item.year}
                        </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold leading-none">{item.title}</h3>
                            <span className="text-muted-foreground">{item.company}</span>
                        </div>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {item.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
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
