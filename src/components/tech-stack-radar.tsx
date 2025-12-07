"use client"

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    PolarRadiusAxis
} from "recharts"
import { motion } from "framer-motion"

const data = [
    {
        subject: "React",
        A: 120,
        fullMark: 150,
    },
    {
        subject: "Next.js",
        A: 110,
        fullMark: 150,
    },
    {
        subject: "TypeScript",
        A: 130,
        fullMark: 150,
    },
    {
        subject: "Node.js",
        A: 100,
        fullMark: 150,
    },
    {
        subject: "Tailwind",
        A: 140,
        fullMark: 150,
    },
    {
        subject: "Backend",
        A: 95,
        fullMark: 150,
    },
]

interface TechStackRadarProps {
    hideHeader?: boolean
    className?: string
}

export function TechStackRadar({ hideHeader = false, className = "" }: TechStackRadarProps) {
    return (
        <section className={`container py-8 md:py-12 lg:py-24 ${className}`}>
            {!hideHeader && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8"
                >
                    <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                        Tech Stack Radar
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        A visual representation of my technical proficiency.
                    </p>
                </motion.div>
            )}
            <div className="h-[400px] w-full max-w-[600px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid className="stroke-muted-foreground/20" />
                        <PolarAngleAxis dataKey="subject" className="text-sm font-medium" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.4}
                            isAnimationActive={true}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}
