import { allProjects } from "@/lib/projects"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    return allProjects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = allProjects.find((p) => p.slug === params.slug)
    if (!project) return { title: "Project Not Found" }

    return {
        title: `${project.title} - Projects`,
        description: project.description,
    }
}

export default function ProjectDetailPage({ params }: Props) {
    const project = allProjects.find((p) => p.slug === params.slug)

    if (!project) {
        notFound()
    }

    return (
        <div className="container py-10 min-h-screen">
            <Link
                href="/projects"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
            </Link>

            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-semibold mb-4">About the Project</h3>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            {project.longDescription}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Key Features</h3>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {project.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-8 lg:border-l lg:pl-8">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">Project Links</h3>
                        <div className="flex flex-col gap-3">
                            <Link href={project.githubLink || "#"} target="_blank">
                                <Button className="w-full gap-2" variant="outline">
                                    <Github className="h-4 w-4" />
                                    View Source Code
                                </Button>
                            </Link>
                            <Link href="#" target="_blank">
                                <Button className="w-full gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Live Demo
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl bg-muted/30 p-6">
                        <h4 className="font-medium mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="text-sm text-muted-foreground">
                                    • {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
