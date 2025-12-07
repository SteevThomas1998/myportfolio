"use client"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
    "JavaScript", "React", "Angular", "Node.js",
    "Next.js", "AWS", "SQL", "NoSQL",
    "HTML5/CSS", "Git", "RESTful APIs"
]

export function Skills() {
    return (
        <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                    Skills & Technologies
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    The stack I use to build scalable and performant applications.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4 lg:grid-cols-5 mt-8">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <Badge variant="outline" className="text-lg py-2 px-6 w-full justify-center hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors duration-300">
                            {skill}
                        </Badge>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
