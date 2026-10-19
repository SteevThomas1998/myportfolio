"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

const FIRST = "Steev".split("")
const LAST = "Thomas".split("")

function TitleWord({ letters, delay, italic }: { letters: string[]; delay: number; italic?: boolean }) {
    return (
        <span className="block overflow-hidden pb-[0.08em]">
            {letters.map((l, i) => (
                <motion.span
                    key={i}
                    className={`inline-block ${italic ? "italic" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                    {l}
                </motion.span>
            ))}
        </span>
    )
}

/**
 * Scene 01. A Higgsfield video plate of dusk Manchester dissolves into three
 * depth layers (sky, skyline, rooftop) that separate as you scroll. The title
 * sits between the skyline and the rooftop, so the foreground swallows it.
 */
export function OpeningTitle() {
    const ref = useRef<HTMLElement>(null)
    const reduce = useReducedMotion()
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const { resolvedTheme } = useTheme()
    const [clip, setClip] = useState<string | null>(null)
    useEffect(() => {
        if (resolvedTheme) setClip(resolvedTheme === "dark" ? "/cinema/hero-loop" : "/cinema/dawn/hero-loop")
    }, [resolvedTheme])

    const videoOpacity = useTransform(p, [0.12, 0.4], [1, 0])
    const videoScale = useTransform(p, [0, 0.4], [1, 1.18])
    const skyY = useTransform(p, [0, 1], ["0%", "-12%"])
    const skylineY = useTransform(p, [0.1, 0.7], ["45%", "6%"])
    const skylineScale = useTransform(p, [0.1, 0.7], [1.25, 1.05])
    const roofY = useTransform(p, [0.25, 0.85], ["75%", "0%"])
    const titleY = useTransform(p, [0, 0.8], ["0%", "38%"])
    const titleTracking = useTransform(p, [0, 0.6], ["-0.04em", "0.06em"])
    const titleOpacity = useTransform(p, [0.6, 0.85], [1, 0.25])
    const slateOpacity = useTransform(p, [0, 0.12], [1, 0])
    const taglineOpacity = useTransform(p, [0.62, 0.78, 0.92, 1], [0, 1, 1, 0])
    const taglineY = useTransform(p, [0.62, 0.78], [30, 0])
    const bars = useTransform(p, [0, 0.5], ["0vh", "8vh"])
    const fade = useTransform(p, [0.9, 1], [0, 1])

    return (
        <section ref={ref} className="relative h-[280vh]" aria-label="Opening title">
            <div className="sticky top-0 h-[100svh] overflow-hidden">
                {/* Depth layers */}
                <motion.div
                    aria-hidden
                    style={reduce ? undefined : { y: skyY }}
                    className="plate-sky absolute inset-0 h-[115%] w-full bg-cover bg-center"
                />
                <motion.div
                    aria-hidden
                    style={reduce ? { y: "6%" } : { y: skylineY, scale: skylineScale }}
                    className="plate-skyline absolute inset-x-0 bottom-0 h-full w-full origin-bottom bg-cover bg-bottom"
                />

                {/* Video plate on top of the layers, dissolving away */}
                <motion.div
                    style={reduce ? undefined : { opacity: videoOpacity, scale: videoScale }}
                    className="plate-hero absolute inset-0 bg-cover bg-center"
                >
                    {/* Dusk or daybreak footage, chosen once the theme is known; the plate shows meanwhile */}
                    {clip && (
                        <video
                            key={clip}
                            className="h-full w-full object-cover"
                            autoPlay={!reduce}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src={`${clip}.webm`} type="video/webm" />
                            <source src={`${clip}.mp4`} type="video/mp4" />
                        </video>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-reel-ink via-transparent via-35% to-transparent dark:via-reel-ink/10 dark:via-50% dark:to-reel-ink/40" />
                </motion.div>

                {/* Title, sandwiched between skyline and rooftop */}
                <motion.h1
                    style={reduce ? undefined : { y: titleY, letterSpacing: titleTracking, opacity: titleOpacity }}
                    className="absolute left-4 top-[16vh] font-display text-[clamp(4.5rem,17vw,17rem)] font-medium leading-[0.82] tracking-[-0.04em] text-reel-bone sm:left-[6vw]"
                >
                    <TitleWord letters={FIRST} delay={0.3} />
                    <span className="block pl-[0.6em]">
                        <TitleWord letters={LAST} delay={0.6} italic />
                    </span>
                </motion.h1>

                <motion.div
                    aria-hidden
                    style={reduce ? { y: "0%" } : { y: roofY }}
                    className="plate-roof absolute inset-x-0 bottom-0 h-full w-full bg-cover bg-bottom"
                />
                <div className="vignette pointer-events-none absolute inset-0" />

                {/* Slate */}
                <motion.div
                    style={{ opacity: slateOpacity }}
                    className="absolute inset-x-4 bottom-8 flex flex-col gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/70 sm:inset-x-[6vw] sm:bottom-12 sm:flex-row sm:items-end sm:justify-between sm:text-xs"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="max-w-md space-y-3"
                    >
                        <p><span className="text-reel-sodium">Sc. 01</span> — Manchester, dusk</p>
                        <p className="font-serif text-base normal-case tracking-normal text-reel-bone/85 sm:text-lg">
                            Full Stack Developer. MSc Computing, four years shipping production web apps across
                            JavaScript frameworks, Shopify, WordPress and the cloud.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        className="flex items-center gap-3"
                    >
                        <span>Scroll to roll film</span>
                        <span className="relative block h-10 w-px overflow-hidden bg-reel-bone/20">
                            <motion.span
                                className="absolute inset-x-0 top-0 h-1/2 bg-reel-sodium"
                                animate={reduce ? undefined : { y: ["-100%", "200%"] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </span>
                    </motion.div>
                </motion.div>

                {/* Tagline that lands on the rooftop */}
                <motion.p
                    style={{ opacity: taglineOpacity, y: taglineY }}
                    className="absolute inset-x-0 bottom-[8vh] bg-[radial-gradient(ellipse_at_center,rgb(var(--reel-ink)/0.8),transparent_65%)] px-4 py-[4vh] text-center font-display text-[clamp(1.75rem,4.5vw,4rem)] italic leading-tight text-reel-bone [text-shadow:0_0_24px_rgb(var(--reel-ink)),0_0_60px_rgb(var(--reel-ink))]"
                >
                    Built in Manchester.{" "}<span className="underline decoration-reel-sodium decoration-2 underline-offset-[0.2em] dark:text-reel-sodium dark:no-underline">Shipped everywhere.</span>
                </motion.p>

                {/* Letterbox + fade to black */}
                <motion.div style={{ height: bars }} className="absolute inset-x-0 top-0 bg-reel-ink" />
                <motion.div style={{ height: bars }} className="absolute inset-x-0 bottom-0 bg-reel-ink" />
                <motion.div style={{ opacity: fade }} className="pointer-events-none absolute inset-0 bg-reel-ink" />
            </div>
        </section>
    )
}
