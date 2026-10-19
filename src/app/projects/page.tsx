"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { SceneHeader, SectionTitle } from "@/components/cinema/scene-header"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { allProjects } from "@/lib/projects"

const currentProjects = allProjects.filter(p => !p.isPreviousWork)
const previousProjects = allProjects.filter(p => p.isPreviousWork)
const allTags = Array.from(new Set(allProjects.flatMap(p => p.tags))).sort()

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const filterProject = (project: typeof allProjects[0]) => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag))
        return matchesSearch && matchesTags
    }

    const filteredCurrent = currentProjects.filter(filterProject)
    const filteredPrevious = previousProjects.filter(filterProject)

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    const grid = (projects: typeof allProjects, offset: number) => (
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ProjectCard {...project} index={offset + i} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )

    return (
        <div className="overflow-x-clip pb-24">
            <SceneHeader
                kicker={`Filmography · ${allProjects.length} titles`}
                title={
                    <>
                        Selected <span className="italic">work</span>
                    </>
                }
                lede="Commercial builds, side projects and earlier client work, from Shopify themes to AI tools."
            />

            <div className="space-y-6 px-4 pb-14 sm:px-[6vw]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <label className="relative block w-full md:w-96">
                        <span className="sr-only">Search projects</span>
                        <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-reel-bone/40" />
                        <input
                            placeholder="Search the filmography…"
                            className="w-full border-b border-reel-bone/25 bg-transparent py-2 pl-7 font-serif text-lg text-reel-bone placeholder:text-reel-bone/35 focus:border-reel-sodium focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </label>
                    {selectedTags.length > 0 && (
                        <button
                            onClick={() => setSelectedTags([])}
                            className="inline-flex items-center gap-1 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-reel-sodium hover:underline"
                        >
                            Clear filters <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => {
                        const on = selectedTags.includes(tag)
                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                aria-pressed={on}
                                className={`border px-3 py-2.5 font-mono sm:py-1 text-[10px] uppercase tracking-[0.15em] transition-colors ${
                                    on
                                        ? "border-reel-sodium bg-reel-sodium text-reel-ink"
                                        : "border-reel-bone/15 text-reel-bone/60 hover:border-reel-sodium/60 hover:text-reel-bone"
                                }`}
                            >
                                {tag}
                            </button>
                        )
                    })}
                </div>
            </div>

            <section className="px-4 sm:px-[6vw]" aria-label="Current work">
                {filteredCurrent.length > 0 ? (
                    grid(filteredCurrent, 0)
                ) : (
                    <div className="py-16 text-center">
                        <p className="font-display text-3xl italic text-reel-bone/70">Nothing in the archive matches that.</p>
                        <button
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedTags([])
                            }}
                            className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-reel-sodium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </section>

            {filteredPrevious.length > 0 && (
                <section className="px-4 pt-24 sm:px-[6vw]" aria-label="Previous work">
                    <SectionTitle label="Archive · WordPress, Elementor & Plesk">Earlier works</SectionTitle>
                    {grid(filteredPrevious, currentProjects.length)}
                </section>
            )}
        </div>
    )
}
