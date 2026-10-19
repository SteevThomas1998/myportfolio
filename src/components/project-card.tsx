import Link from "next/link"
import Image from "next/image"
import { reelArt } from "@/lib/reels"

interface ProjectCardProps {
    title: string
    slug: string
    description: string
    tags: string[]
    link: string
    image?: string
    inDevelopment?: boolean
    index?: number
}

export function ProjectCard({ title, slug, description, tags, link, image, inDevelopment, index }: ProjectCardProps) {
    // Higgsfield key art when the project has a reel, otherwise the site screenshot
    const art = reelArt(slug)
    const src = art?.poster ?? image
    const [name, subtitle] = title.split(" — ")

    return (
        <Link href={link} className="group block h-full">
            <article className="flex h-full flex-col">
                <div className="bg-[rgb(var(--reel-film))] p-1.5">
                    <div className="relative aspect-video w-full overflow-hidden bg-reel-bone/5">
                        {src && (
                            <Image
                                src={src}
                                alt={title}
                                fill
                                className={`transition-transform duration-700 ease-out group-hover:scale-105 ${art ? "object-cover" : "object-cover object-top"}`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        {inDevelopment && (
                            <span className="absolute left-3 top-3 border border-reel-sodium bg-black/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#ff8a3d] backdrop-blur-sm">
                                In production
                            </span>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                    {index !== undefined && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-reel-sodium">
                            No. {String(index + 1).padStart(2, "0")}
                            {art && <span className="text-reel-bone/45"> · Reel {art.number}</span>}
                        </p>
                    )}
                    <h3 className="mt-1 font-display text-3xl leading-tight text-reel-bone transition-colors group-hover:text-reel-sodium">
                        {name}
                    </h3>
                    {subtitle && <p className="font-serif italic text-reel-bone/55">{subtitle}</p>}
                    <p className="mt-3 line-clamp-3 font-serif text-reel-bone/70">{description}</p>
                    <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-reel-bone/45">
                        {tags.slice(0, 5).join(" · ")}
                    </p>
                </div>
            </article>
        </Link>
    )
}
