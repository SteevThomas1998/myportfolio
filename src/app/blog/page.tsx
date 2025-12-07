"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/blog-data"
import { motion } from "framer-motion"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export default function BlogPage() {
    return (
        <div className="container py-10 md:py-20 min-h-screen">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-12">
                <div className="flex-1 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block font-bold text-4xl tracking-tight lg:text-5xl"
                    >
                        Blog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Thoughts on software development, design, and more.
                    </motion.p>
                </div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
            >
                {blogPosts.map((post) => (
                    <motion.div key={post.slug} variants={item}>
                        <Link href={`/blog/${post.slug}`} className="h-full block">
                            <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-muted/30 border-muted">
                                <CardHeader>
                                    <div className="flex gap-2 mb-3">
                                        {post.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="font-normal text-xs">{tag}</Badge>
                                        ))}
                                    </div>
                                    <CardTitle className="text-2xl leading-tight group-hover:text-primary transition-colors">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                                    <div className="flex items-center text-sm text-muted-foreground mt-auto">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {post.date}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-primary font-medium flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                                        Read article
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
