import { allProjects } from "@/lib/projects"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { reelArt } from "@/lib/reels"

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

    const art = reelArt(project.slug)
    const image = art
        ? { url: art.og, width: 1200, height: 630, alt: `${project.title} key art` }
        : { url: "/og.jpg", width: 1200, height: 630, alt: "Steev Thomas, Full Stack Developer" }

    return {
        title: `${project.title} - Projects`,
        description: project.description,
        openGraph: {
            type: "article",
            title: project.title,
            description: project.description,
            url: `/projects/${project.slug}`,
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description,
            images: [image.url],
        },
    }
}

export default function ProjectDetailPage({ params }: Props) {
    const project = allProjects.find((p) => p.slug === params.slug)

    if (!project) {
        notFound()
    }

    const art = reelArt(project.slug)
    const [name, subtitle] = project.title.split(" — ")
    const shots = project.images?.length ? project.images : project.image ? [project.image] : []
    const label = "font-mono text-[10px] uppercase tracking-[0.35em] text-reel-bone/50 sm:text-xs"

    return (
        <div className="overflow-x-clip pb-24">
            {art && (
                <div className="relative h-[46vh] min-h-[280px] w-full overflow-hidden">
                    <Image src={art.poster} alt={`${project.title} key art`} fill priority sizes="100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-reel-page via-reel-page/30 to-transparent" />
                    <div className="absolute inset-x-4 bottom-6 sm:inset-x-[6vw]">
                        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-reel-bone/70 sm:text-xs">
                            Reel {art.number} · {art.reel.genre} · {art.reel.year}
                        </p>
                    </div>
                </div>
            )}

            <div className="px-4 pt-10 sm:px-[6vw]">
                <Link
                    href="/projects"
                    className="group inline-flex items-center py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-reel-bone/55 transition-colors hover:text-reel-sodium"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Filmography
                </Link>

                <header className="mt-6 max-w-4xl">
                    {project.inDevelopment && (
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-sodium">In production</p>
                    )}
                    <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] text-reel-bone">{name}</h1>
                    {subtitle && <p className="mt-2 font-display text-2xl italic text-reel-bone/60 sm:text-3xl">{subtitle}</p>}
                    <p className="mt-6 font-serif text-lg text-reel-bone/75 sm:text-xl">{art ? art.reel.logline : project.description}</p>
                </header>

                <div className="mt-14 grid gap-14 lg:grid-cols-[2fr_1fr] lg:gap-16">
                    <div className="min-w-0 space-y-16">
                        {shots.length > 0 && (
                            <section aria-label="Screenshots" className="space-y-4">
                                {shots.map((src, i) => (
                                    <figure key={src} className="bg-[rgb(var(--reel-film))] p-1.5">
                                        <div className="relative aspect-video w-full overflow-hidden">
                                            <Image
                                                src={src}
                                                alt={`${project.title} — screenshot ${i + 1}`}
                                                fill
                                                className="object-cover object-top"
                                                sizes="(max-width: 1024px) 100vw, 66vw"
                                                priority={i === 0 && !art}
                                            />
                                        </div>
                                    </figure>
                                ))}
                            </section>
                        )}

                        {art && (
                            <section aria-label="The story" className="space-y-10">
                                {art.reel.acts.map((act) => (
                                    <div key={act.label} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
                                        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-reel-sodium sm:text-xs">{act.label}</p>
                                        <div>
                                            <h2 className="font-display text-3xl leading-tight text-reel-bone">{act.heading}</h2>
                                            <p className="mt-2 font-serif text-lg leading-relaxed text-reel-bone/70">{act.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        <section aria-label="About the project">
                            <p className={label}>Synopsis</p>
                            <div className="mt-4 space-y-4 font-serif text-lg leading-relaxed text-reel-bone/75">
                                {project.longDescription.split("\n\n").map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </section>

                        <section aria-label="Key features">
                            <p className={label}>Key scenes</p>
                            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                {project.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 font-serif text-reel-bone/75">
                                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-reel-sodium" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-reel-bone/10 lg:pl-10">
                        <div>
                            <p className={label}>Screenings</p>
                            <div className="mt-4 flex flex-col gap-3">
                                {project.liveLink && (
                                    <Link
                                        href={project.liveLink}
                                        target="_blank"
                                        className="inline-flex items-center justify-center gap-2 bg-reel-sodium px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-reel-ink transition-opacity hover:opacity-85"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Watch it live
                                    </Link>
                                )}
                                {project.githubLink && (
                                    <Link
                                        href={project.githubLink}
                                        target="_blank"
                                        className="inline-flex items-center justify-center gap-2 border border-reel-bone/25 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-reel-bone transition-colors hover:border-reel-sodium hover:text-reel-sodium"
                                    >
                                        <Github className="h-4 w-4" />
                                        Source code
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className={label}>Cast & crew</p>
                            <ul className="mt-4 space-y-1">
                                {project.tags.map((tag) => (
                                    <li key={tag} className="font-display text-xl text-reel-bone">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
