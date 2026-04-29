"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TechStackRadar } from "@/components/tech-stack-radar"
import { Keyboard } from "lucide-react"
import { useEffect, useState } from "react"

const TYPEWRITER_TEXT = `console.log("Hello World! I'm Steev Thomas 👋")`

function Typewriter() {
    const [displayed, setDisplayed] = useState("")
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        if (!deleting && displayed.length < TYPEWRITER_TEXT.length) {
            timeout = setTimeout(() => {
                setDisplayed(TYPEWRITER_TEXT.slice(0, displayed.length + 1))
            }, 28)
        } else if (!deleting && displayed.length === TYPEWRITER_TEXT.length) {
            timeout = setTimeout(() => setDeleting(true), 1800)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => {
                setDisplayed(TYPEWRITER_TEXT.slice(0, displayed.length - 1))
            }, 18)
        } else if (deleting && displayed.length === 0) {
            timeout = setTimeout(() => setDeleting(false), 400)
        }

        return () => clearTimeout(timeout)
    }, [displayed, deleting])

    return (
        <span className="font-mono text-base md:text-xl font-bold mb-4 block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
            {displayed}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[2px] h-[1em] bg-emerald-500 ml-0.5 align-middle"
            />
        </span>
    )
}

const headingWords = ["Building", "production", "web", "apps."]

export function Hero() {
    return (
        <section className="relative container grid lg:grid-cols-2 items-center gap-6 pb-8 pt-6 md:py-20 overflow-hidden">

            {/* Dot grid background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.25) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Animated gradient blobs */}
            <motion.div
                className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/5"
                animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 0.95, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="pointer-events-none absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-400/5"
                animate={{ x: [0, -25, 15, 0], y: [0, 20, -25, 0], scale: [1, 0.95, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] rounded-full bg-emerald-400/5 blur-3xl dark:bg-emerald-400/5"
                animate={{ x: [0, 20, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            <div className="relative flex flex-col items-start gap-4">
                {/* Typewriter greeting */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Typewriter />
                </motion.div>

                {/* Word-by-word heading */}
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                    <span className="flex flex-wrap gap-x-3">
                        {headingWords.map((word, i) => (
                            <motion.span
                                key={word}
                                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.15 + i * 0.07,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                    <motion.span
                        className="block bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            duration: 0.4,
                            delay: 0.15 + headingWords.length * 0.07 + 0.04,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        Junior Software Developer
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.55 }}
                    className="max-w-[700px] text-lg text-muted-foreground sm:text-xl"
                >
                    MSc Computing graduate with 4+ years building production web applications across JavaScript frameworks, WordPress, and cloud infrastructure. Based in Manchester.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="flex gap-4"
                >
                    <Link href="/projects">
                        <Button size="lg" className="rounded-full">
                            View Projects
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline" size="lg" className="rounded-full border-emerald-500/40 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                            About Me
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.85 }}
                    className="flex items-center gap-2 mt-2"
                >
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center gap-2 text-xs text-muted-foreground border border-emerald-500/30 rounded-full px-3 py-1.5 bg-emerald-50/50 dark:bg-emerald-950/30"
                    >
                        <Keyboard className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Press</span>
                        <kbd className="inline-flex items-center gap-0.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                            <span>⌘</span><span>K</span>
                        </kbd>
                        <span>to explore</span>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="relative block"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
                <TechStackRadar hideHeader className="py-0 md:py-0 lg:py-0" />
            </motion.div>
        </section>
    )
}
