"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

const credits: { role: string; names: string[] }[] = [
    { role: "Written, directed & developed by", names: ["Steev Thomas"] },
    { role: "Front of house", names: ["React", "Angular", "Next.js", "TypeScript", "HTML5 / CSS3"] },
    { role: "Back of house", names: ["Node.js", "Express", "REST APIs"] },
    { role: "Data & storage", names: ["Supabase", "PostgreSQL", "MySQL"] },
    { role: "Commerce & content", names: ["Shopify (Liquid)", "WordPress", "Elementor"] },
    { role: "Cloud & crew", names: ["AWS", "Vercel", "Railway", "Git / GitHub"] },
    { role: "Special effects", names: ["TensorFlow.js", "OpenAI", "Framer Motion"] },
    { role: "Filmed on location in", names: ["Manchester, United Kingdom"] },
]

/**
 * Skills presented as end credits, rolling with the scroll. The roll stops
 * with "Fin." centred and holds there before the contact section follows.
 */
export function CreditsRoll() {
    const ref = useRef<HTMLElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const finRef = useRef<HTMLDivElement>(null)
    const [dist, setDist] = useState({ from: 0, to: 0 })
    const reduce = useReducedMotion()
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

    useLayoutEffect(() => {
        const measure = () => {
            const fin = finRef.current
            const finCentre = fin ? fin.offsetTop + fin.offsetHeight / 2 : listRef.current?.offsetHeight ?? 0
            setDist({ from: window.innerHeight * 0.85, to: window.innerHeight / 2 - finCentre })
        }
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [])

    const y = useTransform(p, [0, 0.88, 1], [dist.from, dist.to, dist.to])

    return (
        <section ref={ref} className={reduce ? "relative py-24" : "relative h-[260vh]"} aria-label="Skills credits">
            <div className={reduce ? "" : "sticky top-0 h-[100svh] overflow-hidden"}>
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-reel-ink to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-reel-ink to-transparent" />
                <motion.div ref={listRef} style={reduce ? undefined : { y }} className="mx-auto max-w-2xl space-y-14 px-4 text-center">
                    {/* Starring: a Higgsfield film still of Steev, dusk or daybreak with the theme */}
                    <figure className="mx-auto w-56 sm:w-72">
                        <div className="relative bg-[rgb(var(--reel-film))] p-2 shadow-[0_40px_100px_-30px_rgb(var(--reel-sodium)/0.35)] sm:p-3">
                            <div
                                role="img"
                                aria-label="Portrait of Steev Thomas in a black tuxedo on a Manchester rooftop"
                                className="plate-portrait aspect-[4/5] w-full bg-cover bg-center"
                            />
                        </div>
                        <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-reel-bone/45">
                            Starring Steev Thomas as himself
                        </figcaption>
                    </figure>
                    {credits.map((c, i) => (
                        <div key={c.role}>
                            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-reel-bone/45 sm:text-xs">{c.role}</p>
                            <div className="mt-4 space-y-1">
                                {c.names.map((n) => (
                                    <p
                                        key={n}
                                        className={
                                            i === 0
                                                ? "font-display text-5xl italic text-reel-sodium sm:text-7xl"
                                                : "font-display text-2xl text-reel-bone sm:text-4xl"
                                        }
                                    >
                                        {n}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div ref={finRef} className="pt-[20vh]">
                        <p className="font-display text-[clamp(4rem,14vw,12rem)] italic leading-none text-reel-bone">Fin.</p>
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-reel-sodium sm:text-xs">
                            Or the opening scene of yours
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
