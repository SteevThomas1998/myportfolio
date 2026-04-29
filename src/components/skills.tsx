"use client"
import { motion } from "framer-motion"

const skills = [
    "JavaScript (ES6+)", "React", "Angular", "Node.js",
    "HTML5 / CSS3", "Supabase", "MySQL", "AWS",
    "Git / GitHub", "REST APIs", "WordPress", "Shopify (Liquid)"
]

const emeraldShades = [
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800",
]

export function Skills() {
    return (
        <section className="relative container py-8 md:py-12 lg:py-24 overflow-hidden">
            {/* Section gradient background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/40 to-transparent dark:via-emerald-950/20 rounded-3xl" />

            <div className="relative mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                    Skills &{" "}
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                        Technologies
                    </span>
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    The stack I use to build scalable and performant applications.
                </p>
            </div>
            <div className="relative mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4 lg:grid-cols-5 mt-8">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
                        whileHover={{ scale: 1.08 }}
                    >
                        <div className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold w-full cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/20 ${emeraldShades[index % emeraldShades.length]}`}>
                            {skill}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
