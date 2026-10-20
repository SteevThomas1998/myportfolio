"use client"

import { motion } from "framer-motion"
import { TravelMap } from "@/components/travel-map"
import { LocationStrip, Storyboards } from "@/components/cinema/location-strip"
import { locations } from "@/lib/travel-data"

const visited = locations.filter((l) => l.status === "visited")
const upcoming = locations.filter((l) => l.status === "next")

export default function TravelPage() {
    return (
        <div className="overflow-x-clip">

            <header className="px-4 pb-12 pt-16 sm:px-[6vw] md:pt-24">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] uppercase tracking-[0.4em] text-reel-sodium sm:text-xs"
                >
                    Location scouting · {visited.length} shot, {upcoming.length} storyboarded
                </motion.p>
                <h1 className="mt-4 overflow-hidden font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] text-reel-bone">
                    <motion.span
                        className="block"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        On <span className="italic">location</span>
                    </motion.span>
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-6 max-w-xl font-serif text-lg text-reel-bone/70 sm:text-xl"
                >
                    Every film needs its locations. From my roots in Kerala to Manchester, across Europe and Southeast
                    Asia, with more scenes still on the storyboard.
                </motion.p>
                <div className="mt-12">
                    <TravelMap />
                </div>
            </header>

            <div className="px-4 pb-4 pt-12 sm:px-[6vw]">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-reel-bone/50 sm:text-xs">In the can</p>
                <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,4.5rem)] italic leading-none text-reel-bone">
                    Places I&apos;ve shot
                </h2>
            </div>
            <LocationStrip locations={visited} />

            <section className="px-4 pb-24 pt-20 sm:px-[6vw]" aria-label="Upcoming destinations">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-reel-bone/50 sm:text-xs">Pre-production</p>
                <h2 className="mb-10 mt-2 font-display text-[clamp(2.25rem,5vw,4.5rem)] italic leading-none text-reel-bone">
                    Up next
                </h2>
                <Storyboards locations={upcoming} offset={visited.length} />
            </section>
        </div>
    )
}
