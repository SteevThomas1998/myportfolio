import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

// Generate static params for all known posts to allow static export (optional but good practice)
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = blogPosts.find((p) => p.slug === params.slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="container relative max-w-3xl py-10 md:py-20">
            <Link
                href="/blog"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-[-200px] top-14 hidden xl:inline-flex"
                )}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                See all posts
            </Link>

            <div className="mb-6 block xl:hidden">
                <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to blog
                </Link>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {post.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                    {post.date}
                </p>
            </div>

            <div className="mt-12">
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
        </article>
    )
}
