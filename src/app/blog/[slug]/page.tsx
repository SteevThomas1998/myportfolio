import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { ArrowLeft } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = blogPosts.find((p) => p.slug === params.slug)
    if (!post) return { title: "Post not found" }
    return {
        title: `${post.title} — Steev Thomas`,
        description: post.excerpt,
        openGraph: {
            type: "article",
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Steev Thomas, Full Stack Developer" }],
        },
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = blogPosts.find((p) => p.slug === params.slug)

    if (!post) {
        notFound()
    }

    // The markdown repeats the title as its first heading; the page header already shows it
    const body = post.content.trim().replace(/^#\s+.*\n+/, "")
    const words = body.split(/\s+/).length
    const minutes = Math.max(1, Math.round(words / 220))

    return (
        <article className="px-4 pb-24 pt-10 sm:px-[6vw]">
            <Link
                href="/blog"
                className="group inline-flex items-center py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-reel-bone/55 transition-colors hover:text-reel-sodium"
            >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Director&apos;s notes
            </Link>

            <header className="mx-auto mt-10 max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-reel-sodium sm:text-xs">
                    {post.date} · {minutes} min read
                </p>
                <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] text-reel-bone">{post.title}</h1>
                <p className="mt-5 font-serif text-xl italic text-reel-bone/65">{post.excerpt}</p>
                <p className="mt-6 border-b border-reel-bone/10 pb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-reel-bone/45">
                    {post.tags.join(" · ")}
                </p>
            </header>

            <div className="prose prose-lg mx-auto mt-10 max-w-3xl font-serif prose-headings:font-display prose-headings:font-normal prose-h2:text-4xl prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:overflow-x-auto prose-img:w-full">
                <ReactMarkdown>{body}</ReactMarkdown>
            </div>
        </article>
    )
}
