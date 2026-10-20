"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion"

const FRAME_COUNT = 72
const frameSrc = (set: "lg" | "sm", i: number) => `/cinema/desk-seq/${set}/${String(i + 1).padStart(3, "0")}.webp`

const beats = [
    { at: [0.05, 0.12, 0.28, 0.34], text: "Every build starts here.", sub: "Int. Loft — Night" },
    { at: [0.38, 0.45, 0.6, 0.66], text: "A brief, a blank editor, a pot of chai.", sub: "Sc. 02" },
    { at: [0.7, 0.76, 0.9, 0.96], text: "Four of them made the final cut.", sub: "Now showing" },
]

function Beat({ p, beat }: { p: ReturnType<typeof useScroll>["scrollYProgress"]; beat: (typeof beats)[number] }) {
    const opacity = useTransform(p, beat.at, [0, 1, 1, 0])
    const y = useTransform(p, [beat.at[0], beat.at[3]], [40, -40])
    return (
        <motion.div style={{ opacity, y }} className="absolute inset-x-4 bottom-[18vh] text-center sm:inset-x-[10vw]">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-reel-sodium sm:text-xs">{beat.sub}</p>
            <p className="text-balance font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] text-reel-bone">{beat.text}</p>
        </motion.div>
    )
}

/**
 * Sc. 02. A Higgsfield dolly-in shot, exported as frames and scrubbed by
 * scroll on a canvas. Frames load lazily once the section is near.
 */
export function DeskSequence() {
    const ref = useRef<HTMLElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const frames = useRef<HTMLImageElement[]>([])
    const current = useRef(0)
    const [ready, setReady] = useState(false)
    const reduce = useReducedMotion()
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

    const draw = (index: number) => {
        const canvas = canvasRef.current
        const img = frames.current[index]
        if (!canvas || !img?.complete || !img.naturalWidth) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        const { width: cw, height: ch } = canvas
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
        const w = img.naturalWidth * scale
        const h = img.naturalHeight * scale
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
    }

    // Size canvas to the viewport at device pixel ratio
    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current
            if (!canvas) return
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            draw(current.current)
        }
        resize()
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    }, [])

    // Preload frames when the section approaches the viewport
    useEffect(() => {
        if (reduce || !ref.current) return
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || frames.current.length) return
                io.disconnect()
                const set = window.innerWidth < 768 ? "sm" : "lg"
                let loaded = 0
                frames.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
                    const img = new Image()
                    img.decoding = "async"
                    img.src = frameSrc(set, i)
                    img.onload = () => {
                        loaded++
                        if (i === 0) draw(0)
                        if (loaded === FRAME_COUNT) setReady(true)
                    }
                    return img
                })
            },
            { rootMargin: "150% 0px" }
        )
        io.observe(ref.current)
        return () => io.disconnect()
    }, [reduce])

    useMotionValueEvent(p, "change", (v) => {
        const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v * 0.92 * (FRAME_COUNT - 1))))
        if (index === current.current) return
        current.current = index
        requestAnimationFrame(() => draw(index))
    })

    // Pinned before the opening title lets go, so the loft dissolves in over the city
    const enter = useTransform(p, [0, 0.12], [0, 1])
    const glow = useTransform(p, [0.85, 1], [0, 1])
    const timecode = useTransform(p, (v) => {
        const total = Math.round(v * 5 * 24)
        const s = Math.floor(total / 24)
        const f = total % 24
        return `00:02:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`
    })

    return (
        // -mt overlaps the last 30vh of the opening title's pinned run (see OpeningTitle)
        <section ref={ref} className="reel-night relative -mt-[130vh] h-[320vh]" aria-label="Into the work">
            <motion.div style={{ opacity: enter }} className="sticky top-0 h-[100svh] overflow-hidden bg-reel-ink">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/cinema/desk.webp)", opacity: ready && !reduce ? 0 : 1 }}
                />
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
                <div className="vignette pointer-events-none absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-reel-ink/90 via-transparent to-reel-ink/30" />

                {beats.map((b) => (
                    <Beat key={b.text} p={p} beat={b} />
                ))}

                <div className="absolute left-4 top-20 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/60 sm:left-[6vw] sm:text-xs">
                    <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500 align-middle" />
                    Rec <motion.span>{timecode}</motion.span>
                </div>

                <motion.div style={{ opacity: glow }} className="pointer-events-none absolute inset-0 bg-reel-page" />
            </motion.div>
        </section>
    )
}
