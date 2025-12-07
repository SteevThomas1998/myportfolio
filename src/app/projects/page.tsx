"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { allProjects } from "@/lib/projects"

// Extract unique tags for the filter list
const allTags = Array.from(new Set(allProjects.flatMap(p => p.tags))).sort()

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const filteredProjects = allProjects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag))

        return matchesSearch && matchesTags
    })

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    return (
        <div className="container py-10 min-h-screen">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-bold text-4xl tracking-tight">Projects</h1>
                    <p className="text-xl text-muted-foreground">
                        A showcasing of my recent open source and commercial work.
                    </p>
                </div>
            </div>

            <div className="space-y-6 mb-12">
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {selectedTags.length > 0 && (
                        <Badge
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() => setSelectedTags([])}
                        >
                            Clear Filters <X className="ml-1 h-3 w-3" />
                        </Badge>
                    )}
                </div>

                {/* Tag Cloud */}
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12"
                        >
                            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedTags([]) }}
                                className="text-primary hover:underline mt-2"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
