"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { blogPosts } from "@/lib/blog-data"
import { SceneHeader } from "@/components/cinema/scene-header"

export default function BlogPage() {
    return (
        <div className="overflow-x-clip pb-24">
            <SceneHeader
                kicker={`Director's notes · ${blogPosts.length} entries`}
                title={
                    <>
                        Notes from the <span className="italic">edit</span>
                    </>
                }
                lede="Thoughts on software development, design, and what I learn building things."
            />

            <ol className="mx-4 border-t border-reel-bone/10 sm:mx-[6vw]">
                {blogPosts.map((post, i) => (
                    <motion.li
                        key={post.slug}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-reel-bone/10"
                    >
                        <Link href={`/blog/${post.slug}`} className="group grid gap-3 py-10 md:grid-cols-[12rem_1fr_auto] md:gap-10">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-reel-bone/50">
                                <span className="text-reel-sodium">No. {String(blogPosts.length - i).padStart(2, "0")}</span>
                                <br />
                                {post.date}
                            </p>
                            <div className="min-w-0">
                                <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] text-reel-bone transition-colors group-hover:text-reel-sodium">
                                    {post.title}
                                </h2>
                                <p className="mt-3 line-clamp-3 max-w-3xl font-serif text-lg text-reel-bone/65">{post.excerpt}</p>
                                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-reel-bone/40">{post.tags.join(" · ")}</p>
                            </div>
                            <span className="hidden self-center font-mono text-xs uppercase tracking-[0.25em] text-reel-sodium transition-transform group-hover:translate-x-1 md:block">
                                Read →
                            </span>
                        </Link>
                    </motion.li>
                ))}
            </ol>
        </div>
    )
}
