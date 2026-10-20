"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import type { Location } from "@/lib/travel-data"

function Plate({ loc, className = "" }: { loc: Location; className?: string }) {
    return "src" in loc.plate ? (
        <div
            role="img"
            aria-label={`${loc.place}, ${loc.name}`}
            className={`bg-cover bg-center ${className}`}
            style={{ backgroundImage: `url(${loc.plate.src})` }}
        />
    ) : (
        <div role="img" aria-label={`${loc.place}, ${loc.name}`} className={`bg-cover bg-center ${loc.plate.className} ${className}`} />
    )
}

function Frame({ loc, index }: { loc: Location; index: number }) {
    return (
        <article className="w-full shrink-0 md:w-[62vw] lg:w-[54vw]">
            <div className="bg-[rgb(var(--reel-film))] px-2 py-6 md:px-3">
                <Plate loc={loc} className="aspect-video w-full" />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/50 sm:text-xs">
                <span>
                    <span className="text-reel-sodium">Loc. {String(index + 1).padStart(2, "0")}</span> · {loc.place}
                </span>
                <span>{loc.tag}</span>
            </div>
            <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none text-reel-bone">{loc.name}</h3>
            <p className="mt-3 max-w-xl font-serif text-reel-bone/70 sm:text-lg">{loc.description}</p>
        </article>
    )
}

/**
 * Visited places as one long film strip. On wide screens the section pins and
 * vertical scroll drives the strip sideways; on phones it stacks.
 */
export function LocationStrip({ locations }: { locations: Location[] }) {
    const ref = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [dist, setDist] = useState(0)
    const reduce = useReducedMotion()
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const x = useTransform(p, [0, 1], [0, -dist])

    useLayoutEffect(() => {
        const measure = () => {
            const track = trackRef.current
            const wide = window.innerWidth >= 768 && !reduce
            setDist(wide && track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0)
        }
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [reduce])

    const pinned = dist > 0

    return (
        <section
            ref={ref}
            aria-label="Places visited"
            style={pinned ? { height: `calc(100svh + ${dist}px)` } : undefined}
            className="relative"
        >
            <div className={pinned ? "sticky top-0 flex h-[100svh] items-center overflow-hidden" : ""}>
                <motion.div
                    ref={trackRef}
                    style={pinned ? { x } : undefined}
                    className="flex flex-col gap-16 px-4 py-12 sm:px-[6vw] md:w-max md:flex-row md:gap-[4vw] md:py-0"
                >
                    {locations.map((loc, i) => (
                        <Frame key={loc.name} loc={loc} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

/** Upcoming places as pencil storyboard panels: scenes not yet shot. */
export function Storyboards({ locations, offset }: { locations: Location[]; offset: number }) {
    return (
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {locations.map((loc, i) => (
                <motion.article
                    key={loc.name}
                    initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1.2 : -1.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative bg-[#f3ecdf] p-2 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.5)]">
                        <Plate loc={loc} className="aspect-video w-full mix-blend-multiply" />
                        <span className="absolute right-4 top-4 rotate-6 border-2 border-reel-sodium px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-reel-sodium">
                            Not yet shot
                        </span>
                    </div>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/50 sm:text-xs">
                        <span className="text-reel-sodium">Sc. {String(offset + i + 1).padStart(2, "0")}</span> · {loc.place}
                    </p>
                    <h3 className="mt-1 font-display text-3xl text-reel-bone">{loc.name}</h3>
                    <p className="mt-2 font-serif text-reel-bone/70">{loc.description}</p>
                </motion.article>
            ))}
        </div>
    )
}
