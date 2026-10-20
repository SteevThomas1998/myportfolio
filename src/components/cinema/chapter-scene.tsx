"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

export interface Chapter {
    number: string
    place: string
    years: string
    heading: string
    body: string
    image: string
}

/** A full-bleed chapter card: the still drifts slower than the page while the text rises over it. */
export function ChapterScene({ chapter }: { chapter: Chapter }) {
    const ref = useRef<HTMLElement>(null)
    const reduce = useReducedMotion()
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(p, [0, 1], ["-12%", "12%"])
    const textY = useTransform(p, [0.2, 0.55], [60, 0])
    const textOpacity = useTransform(p, [0.2, 0.45], [0, 1])

    return (
        <section ref={ref} className="reel-night relative h-[85svh] min-h-[520px] overflow-hidden" aria-label={`Chapter ${chapter.number}: ${chapter.place}`}>
            <motion.div
                aria-hidden
                style={{ ...(reduce ? {} : { y }), backgroundImage: `url(${chapter.image})` }}
                className="absolute inset-x-0 inset-y-[-14%] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-reel-ink via-reel-ink/40 to-reel-ink/10" />
            <motion.div
                style={reduce ? undefined : { y: textY, opacity: textOpacity }}
                className="absolute inset-x-4 bottom-12 max-w-2xl sm:inset-x-[6vw] sm:bottom-16"
            >
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-reel-bone/70 sm:text-xs">
                    <span className="text-reel-sodium">Ch. {chapter.number}</span> · {chapter.place} · {chapter.years}
                </p>
                <h3 className="mt-3 font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] text-reel-bone">
                    {chapter.heading}
                </h3>
                <p className="mt-4 font-serif text-base leading-relaxed text-reel-bone/80 sm:text-lg">{chapter.body}</p>
            </motion.div>
        </section>
    )
}
