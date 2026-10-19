"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/** Opening title card shared by the inner pages: slate line, big display title, serif lede. */
export function SceneHeader({
    kicker,
    title,
    lede,
    children,
    aside,
}: {
    kicker: ReactNode
    title: ReactNode
    lede?: ReactNode
    children?: ReactNode
    aside?: ReactNode
}) {
    return (
        <header className="grid gap-10 px-4 pb-12 pt-16 sm:px-[6vw] md:pt-24 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] uppercase tracking-[0.4em] text-reel-sodium sm:text-xs"
                >
                    {kicker}
                </motion.p>
                <h1 className="mt-4 overflow-hidden pb-[0.06em] font-display text-[clamp(3.25rem,10vw,9rem)] leading-[0.9] text-reel-bone">
                    <motion.span
                        className="block"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {title}
                    </motion.span>
                </h1>
                {lede && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-6 max-w-2xl font-serif text-lg text-reel-bone/70 sm:text-xl"
                    >
                        {lede}
                    </motion.div>
                )}
                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="mt-8"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
            {aside}
        </header>
    )
}

/** Small section heading: mono slate label over an italic display title. */
export function SectionTitle({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-reel-bone/50 sm:text-xs">{label}</p>
            <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,4.5rem)] italic leading-none text-reel-bone">{children}</h2>
        </div>
    )
}
