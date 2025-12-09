"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TechStackRadar } from "@/components/tech-stack-radar"

export function Hero() {
    return (
        <section className="container grid lg:grid-cols-2 items-center gap-6 pb-8 pt-6 md:py-20">
            <div className="flex flex-col items-start gap-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
                >
                    <span className="font-mono text-base md:text-xl text-primary font-bold mb-4 block">
                        &lt;Hi I am Steev Thomas /&gt;
                    </span>
                    Building beautiful web experiences. <br className="hidden sm:inline" />
                    <span className="text-primary">Full Stack Developer</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-[700px] text-lg text-muted-foreground sm:text-xl"
                >
                    I specialize in building accessible, semantic, and performant web applications using modern technologies like Next.js, Tailwind CSS, and Shadcn UI.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex gap-4"
                >
                    <Link href="/projects">
                        <Button size="lg" className="rounded-full">
                            View Projects
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline" size="lg" className="rounded-full">
                            About Me
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <div className="block">
                <TechStackRadar hideHeader className="py-0 md:py-0 lg:py-0" />
            </div>
        </section >
    )
}
