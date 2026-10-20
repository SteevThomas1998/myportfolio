"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { locations, type Location } from "@/lib/travel-data"
import { MAP_DOTS, MAP_FRAME } from "@/lib/travel-map-dots"

const W = MAP_FRAME.east - MAP_FRAME.west
const H = MAP_FRAME.north - MAP_FRAME.south

const toXY = ([lon, lat]: [number, number]) => [lon - MAP_FRAME.west, MAP_FRAME.north - lat] as const

const home = locations.find((l) => l.tag === "Home")
const base = locations.find((l) => l.tag === "Based here")

/** A gentle arc between two locations, bowed away from the equator like a flight path */
function arc(a: Location, b: Location) {
    const [x1, y1] = toXY(a.pins[0].coords)
    const [x2, y2] = toXY(b.pins[0].coords)
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const d = Math.hypot(x2 - x1, y2 - y1)
    let nx = (y2 - y1) / d
    let ny = -(x2 - x1) / d
    if (ny > 0) [nx, ny] = [-nx, -ny]
    return `M${x1},${y1} Q${mx + nx * d * 0.22},${my + ny * d * 0.22} ${x2},${y2}`
}

const routes = [
    ...(home && base ? [{ id: "home", d: arc(home, base), status: "home" as const }] : []),
    ...(base
        ? locations
              .filter((l) => l !== base && l !== home)
              .map((l) => ({ id: l.name, d: arc(base, l), status: l.status }))
        : []),
]

// One entry per pin; home and base are the key pins, labelled on every screen size
const pins = locations.flatMap((l, i) =>
    l.pins.map((p) => ({ l, i, ...p, side: p.side ?? "right", key: l === home || l === base }))
)

const dotFill = (k: number) =>
    k < 0 ? "rgb(var(--reel-bone) / 0.16)" : locations[k].status === "visited" ? "rgb(var(--reel-sodium) / 0.75)" : "rgb(var(--reel-bone) / 0.45)"

/**
 * Location scout map: land as a dot matrix, countries lit by status, and
 * routes that draw in from home to base and out to each location.
 */
export function TravelMap() {
    const reduce = useReducedMotion()
    // One trigger for the whole map, so pins near the frame edge play in sequence too
    const ref = useRef<HTMLElement>(null)
    const shown = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })

    return (
        <figure ref={ref} className="relative w-full overflow-hidden border border-reel-bone/15 bg-reel-bone/[0.03]">
            <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
                <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
                    {MAP_DOTS.map(([x, y, k], i) => (
                        <circle key={i} cx={x} cy={y} r={0.36} fill={dotFill(k)} />
                    ))}
                    {routes.map((r, i) => (
                        <motion.path
                            key={r.id}
                            d={r.d}
                            fill="none"
                            stroke={r.status === "next" ? "rgb(var(--reel-bone) / 0.5)" : "rgb(var(--reel-sodium))"}
                            strokeWidth={r.status === "home" ? 0.3 : 0.2}
                            strokeDasharray={r.status === "next" ? "0.6 0.8" : undefined}
                            strokeLinecap="round"
                            initial={reduce ? false : r.status === "next" ? { opacity: 0 } : { pathLength: 0 }}
                            animate={shown ? (r.status === "next" ? { opacity: 1 } : { pathLength: 1 }) : undefined}
                            transition={{ duration: r.status === "home" ? 1.8 : 1.1, delay: r.status === "home" ? 0.2 : 1.6 + i * 0.15, ease: [0.65, 0, 0.35, 1] }}
                        />
                    ))}
                </svg>

                {/* Pins are HTML so labels stay a readable size at any width */}
                {pins.map(({ l, i, label, coords, side, key }) => {
                    const [x, y] = toXY(coords)
                    const visited = l.status === "visited"
                    return (
                        <motion.div
                            key={label}
                            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                            animate={shown ? { opacity: 1, scale: 1 } : undefined}
                            transition={{ delay: key ? 0.2 : 1.6 + i * 0.12, duration: 0.5 }}
                            className="absolute"
                            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
                            title={`${l.tag} · ${label}, ${l.name}`}
                        >
                            <span
                                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
                                    visited ? "h-2 w-2 bg-reel-sodium sm:h-2.5 sm:w-2.5" : "h-2 w-2 border border-reel-bone/70 bg-reel-ink sm:h-2.5 sm:w-2.5"
                                }`}
                            />
                            {key && !reduce && (
                                <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-reel-sodium/60" />
                            )}
                            <span
                                className={`absolute top-0 -translate-y-1/2 whitespace-nowrap bg-reel-ink/85 px-1 py-0.5 font-mono text-[9px] uppercase leading-tight tracking-[0.2em] sm:text-[10px] ${
                                    side === "right" ? "left-2.5 sm:left-3.5" : "right-2.5 text-right sm:right-3.5"
                                } ${key ? "" : "hidden sm:block"} ${visited ? "text-reel-bone" : "text-reel-bone/60"}`}
                            >
                                {label}
                                {key && <span className="block text-reel-sodium">{l.tag}</span>}
                            </span>
                        </motion.div>
                    )
                })}
            </div>

            {/* Frame chrome */}
            <figcaption className="pointer-events-none absolute inset-x-3 top-3 flex justify-between font-mono [&>span]:bg-reel-ink/85 [&>span]:px-1 [&>span]:py-0.5 text-[9px] uppercase tracking-[0.25em] text-reel-bone/55 sm:inset-x-4 sm:top-4 sm:text-[10px]">
                <span>
                    <span className="text-reel-sodium">Fig. 01</span> — Location scout
                </span>
                {base && (
                    <span className="hidden sm:inline">
                        Base {base.pins[0].coords[1].toFixed(2)}° N, {Math.abs(base.pins[0].coords[0]).toFixed(2)}° W
                    </span>
                )}
            </figcaption>
            <div className="pointer-events-none absolute bottom-3 left-3 flex gap-4 bg-reel-ink/85 px-1 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-reel-bone/60 sm:bottom-4 sm:left-4 sm:text-[10px]">
                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-reel-sodium" />
                    Shot
                </span>
                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full border border-reel-bone/70" />
                    Storyboarded
                </span>
            </div>
        </figure>
    )
}
