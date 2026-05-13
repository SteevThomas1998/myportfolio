"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

const skills = [
    { name: "React",      value: 120, fullMark: 150 },
    { name: "Next.js",    value: 110, fullMark: 150 },
    { name: "TypeScript", value: 130, fullMark: 150 },
    { name: "Node.js",    value: 100, fullMark: 150 },
    { name: "Tailwind",   value: 140, fullMark: 150 },
    { name: "Backend",    value: 95,  fullMark: 150 },
]

const CX = 200
const CY = 200
const MAX_R = 130
const LABEL_R = 158
const RINGS = [0.25, 0.5, 0.75, 1]
const ORIGIN = `${CX}px ${CY}px`

function getAngle(i: number) {
    return (i * 2 * Math.PI) / skills.length - Math.PI / 2
}

function polar(r: number, i: number) {
    const a = getAngle(i)
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

function ringPoints(frac: number) {
    return skills.map((_, i) => { const p = polar(frac * MAX_R, i); return `${p.x},${p.y}` }).join(" ")
}

function dataPoints() {
    return skills.map((s, i) => {
        const p = polar((s.value / s.fullMark) * MAX_R, i)
        return `${p.x},${p.y}`
    }).join(" ")
}

interface TechStackRadarProps {
    hideHeader?: boolean
    className?: string
}

export function TechStackRadar({ hideHeader = false, className = "" }: TechStackRadarProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true })
    const [hovered, setHovered] = useState<number | null>(null)

    const dp = dataPoints()

    return (
        <section className={`container py-8 md:py-12 lg:py-24 ${className}`}>
            {!hideHeader && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8"
                >
                    <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                        Tech Stack Radar
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        A visual representation of my technical proficiency.
                    </p>
                </motion.div>
            )}

            <div ref={ref} className="h-[400px] w-full max-w-[560px] mx-auto select-none">
                <svg
                    viewBox="0 0 400 400"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                    overflow="visible"
                >
                    {/* Grid rings — scale in from center, staggered */}
                    {RINGS.map((frac, i) => (
                        <motion.polygon
                            key={`ring-${i}`}
                            points={ringPoints(frac)}
                            fill="none"
                            stroke="hsl(var(--muted-foreground))"
                            strokeOpacity={0.18}
                            strokeWidth={1}
                            style={{ transformOrigin: ORIGIN }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                    ))}

                    {/* Axis spokes — draw outward from center, staggered */}
                    {skills.map((_, i) => {
                        const outer = polar(MAX_R, i)
                        return (
                            <motion.path
                                key={`spoke-${i}`}
                                d={`M ${CX} ${CY} L ${outer.x} ${outer.y}`}
                                stroke="hsl(var(--muted-foreground))"
                                strokeOpacity={0.18}
                                strokeWidth={1}
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ duration: 0.45, delay: 0.18 + i * 0.05, ease: "easeOut" }}
                            />
                        )
                    })}

                    {/* Data fill polygon — springs in from center */}
                    <motion.polygon
                        points={dp}
                        fill="hsl(var(--primary))"
                        fillOpacity={0.35}
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        style={{ transformOrigin: ORIGIN }}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.52 }}
                    />

                    {/* Pulse overlay — breathes continuously after entrance */}
                    <motion.polygon
                        points={dp}
                        fill="hsl(var(--primary))"
                        stroke="none"
                        style={{ transformOrigin: ORIGIN }}
                        initial={{ scale: 0, fillOpacity: 0 }}
                        animate={isInView ? {
                            scale: 1,
                            fillOpacity: [0, 0.12, 0],
                        } : {}}
                        transition={{
                            scale: { type: "spring", stiffness: 120, damping: 14, delay: 0.52 },
                            fillOpacity: { duration: 2.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
                        }}
                    />

                    {/* Vertex dots + skill labels */}
                    {skills.map((skill, i) => {
                        const dataPt = polar((skill.value / skill.fullMark) * MAX_R, i)
                        const labelPt = polar(LABEL_R, i)
                        const cosA = Math.cos(getAngle(i))
                        const sinA = Math.sin(getAngle(i))
                        const textAnchor = cosA > 0.2 ? "start" : cosA < -0.2 ? "end" : "middle"
                        const labelDy = sinA > 0.2 ? 5 : sinA < -0.2 ? -3 : 4
                        const isHov = hovered === i

                        return (
                            <g
                                key={`skill-${i}`}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                style={{ cursor: "pointer" }}
                            >
                                {/* Glow halo */}
                                <motion.circle
                                    cx={dataPt.x}
                                    cy={dataPt.y}
                                    r={16}
                                    fill="hsl(var(--primary))"
                                    style={{ transformOrigin: `${dataPt.x}px ${dataPt.y}px` }}
                                    animate={isHov
                                        ? { scale: 1, opacity: 0.22 }
                                        : { scale: 0.3, opacity: 0 }
                                    }
                                    transition={{ duration: 0.18 }}
                                />

                                {/* Dot */}
                                <motion.circle
                                    cx={dataPt.x}
                                    cy={dataPt.y}
                                    r={5}
                                    fill="hsl(var(--primary))"
                                    stroke="hsl(var(--background))"
                                    strokeWidth={2}
                                    style={{ transformOrigin: `${dataPt.x}px ${dataPt.y}px` }}
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: isHov ? 1.5 : 1 } : {}}
                                    transition={isHov
                                        ? { duration: 0.15 }
                                        : { type: "spring", stiffness: 380, damping: 14, delay: 0.65 + i * 0.07 }
                                    }
                                />

                                {/* Label */}
                                <motion.text
                                    x={labelPt.x}
                                    y={labelPt.y + labelDy}
                                    textAnchor={textAnchor}
                                    fontSize={12}
                                    fill={isHov ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                                    fontWeight={isHov ? 600 : 400}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.35, delay: 0.8 + i * 0.06 }}
                                >
                                    {skill.name}
                                </motion.text>
                            </g>
                        )
                    })}

                    {/* Center info on hover */}
                    <AnimatePresence mode="wait">
                        {hovered !== null && (
                            <motion.g key={`center-${hovered}`}>
                                <motion.text
                                    x={CX}
                                    y={CY - 8}
                                    textAnchor="middle"
                                    fontSize={11}
                                    fill="hsl(var(--muted-foreground))"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.12 }}
                                >
                                    {skills[hovered].name}
                                </motion.text>
                                <motion.text
                                    x={CX}
                                    y={CY + 18}
                                    textAnchor="middle"
                                    fontSize={26}
                                    fontWeight={700}
                                    fill="hsl(var(--primary))"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.12 }}
                                >
                                    {Math.round((skills[hovered].value / skills[hovered].fullMark) * 100)}%
                                </motion.text>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>
            </div>
        </section>
    )
}
