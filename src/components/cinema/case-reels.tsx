"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion"
import { reels, type Reel } from "@/lib/reels"

function FilmFrame({ reel, p, reduce }: { reel: Reel; p: MotionValue<number>; reduce: boolean | null }) {
    const y = useTransform(p, [0, 1], ["4%", "-4%"])
    const scale = useTransform(p, [0, 0.3], [1.06, 1])
    const clip = useTransform(p, [0, 0.18], ["inset(18% 12% 18% 12%)", "inset(0% 0% 0% 0%)"])
    const sprocketY = useTransform(p, [0, 1], ["0px", "-440px"])

    return (
        <motion.div
            style={reduce ? undefined : { clipPath: clip }}
            className="relative flex h-full w-full gap-0 bg-[rgb(var(--reel-film))] shadow-[0_40px_120px_-30px_rgb(var(--reel-sodium)/0.3)]"
        >
            <motion.div style={reduce ? undefined : { backgroundPositionY: sprocketY }} className="sprockets w-5 shrink-0 sm:w-7" />
            <div className="relative flex-1 overflow-hidden">
                <motion.div style={reduce ? undefined : { y, scale }} className="absolute inset-[-5%]">
                    <Image
                        src={reel.image}
                        alt={`${reel.title} screenshot`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-top"
                    />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-reel-ink/70 via-transparent to-transparent" />
            </div>
            <motion.div style={reduce ? undefined : { backgroundPositionY: sprocketY }} className="sprockets w-5 shrink-0 sm:w-7" />
        </motion.div>
    )
}

function ReelScene({ reel, index }: { reel: Reel; index: number }) {
    const ref = useRef<HTMLElement>(null)
    const reduce = useReducedMotion()
    const [act, setAct] = useState(0)
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

    useMotionValueEvent(p, "change", (v) => setAct(v < 0.36 ? 0 : v < 0.68 ? 1 : 2))

    const numberY = useTransform(p, [0, 1], ["30%", "-30%"])
    const progress = useTransform(p, [0, 1], ["0%", "100%"])
    const number = String(index + 1).padStart(2, "0")

    return (
        <section ref={ref} className="relative h-[340vh]" aria-label={`Reel ${number}: ${reel.title}`}>
            <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-4 pb-6 pt-20 sm:px-[6vw] lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-[5vw] lg:pb-12">
                {/* Giant outlined reel number drifting behind */}
                <motion.span
                    aria-hidden
                    style={reduce ? undefined : { y: numberY }}
                    className="text-outline pointer-events-none absolute -right-[4vw] top-[8vh] select-none font-display text-[42vw] leading-none lg:text-[30vw]"
                >
                    {number}
                </motion.span>

                {/* Picture */}
                <div className="relative h-[32svh] w-full shrink-0 lg:h-[68vh]">
                    <FilmFrame reel={reel} p={p} reduce={reduce} />
                    <div className="absolute -bottom-6 left-0 flex w-full justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/50">
                        <span>Reel {number} / {String(reels.length).padStart(2, "0")}</span>
                        <span>{reel.genre} · {reel.year}</span>
                    </div>
                </div>

                {/* Narration */}
                <div className="relative mt-10 flex flex-1 flex-col lg:mt-0 lg:h-[68vh] lg:justify-between">
                    <div>
                        <h2 className="font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.9] text-reel-bone">
                            {reel.title}
                        </h2>
                        <p className="mt-2 max-w-md font-serif text-sm italic sm:mt-3 text-reel-bone/60 sm:text-lg">{reel.logline}</p>
                    </div>

                    <div className="relative mt-4 min-h-[10rem] flex-1 lg:mt-0 lg:flex-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={act}
                                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-reel-sodium sm:text-xs">
                                    {reel.acts[act].label}
                                </p>
                                <h3 className="mt-2 font-display text-xl leading-tight text-reel-bone sm:text-3xl">
                                    {reel.acts[act].heading}
                                </h3>
                                <p className="mt-2 max-w-lg font-serif text-[14px] leading-relaxed text-reel-bone/70 sm:text-lg">
                                    {reel.acts[act].body}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="space-y-4">
                        {/* Act scrubber */}
                        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-reel-bone/40">
                            {reel.acts.map((a, i) => (
                                <span key={a.label} className={i === act ? "text-reel-bone" : ""}>
                                    {["I", "II", "III"][i]}
                                </span>
                            ))}
                            <span className="relative h-px flex-1 bg-reel-bone/15">
                                <motion.span style={{ width: progress }} className="absolute inset-y-0 left-0 bg-reel-sodium" />
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-reel-bone/50 sm:text-[11px]">
                                {reel.stack.join(" · ")}
                            </p>
                            <Link
                                href={`/projects/${reel.slug}`}
                                className="group inline-flex items-center gap-2 border-b border-reel-sodium/50 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-reel-sodium hover:border-reel-sodium"
                            >
                                Watch the full cut
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function CaseReels() {
    return (
        <div id="work">
            <div className="flex flex-col items-center px-4 pb-10 pt-24 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-reel-sodium sm:text-xs">Now showing</p>
                <h2 className="mt-4 font-display text-[clamp(2.75rem,8vw,7.5rem)] italic leading-none text-reel-bone">
                    Four reels
                </h2>
                <p className="mt-4 max-w-md font-serif text-reel-bone/60">
                    Selected work, told in three acts each. Keep scrolling.
                </p>
            </div>
            {reels.map((reel, i) => (
                <ReelScene key={reel.slug} reel={reel} index={i} />
            ))}
            <div className="flex justify-center pb-24 pt-4">
                <Link
                    href="/projects"
                    className="inline-block py-3 font-mono text-xs uppercase tracking-[0.3em] text-reel-bone/60 underline-offset-8 hover:text-reel-sodium hover:underline"
                >
                    Full filmography →
                </Link>
            </div>
        </div>
    )
}
