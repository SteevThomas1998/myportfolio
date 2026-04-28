import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    link: string
    liveLink?: string
    githubLink?: string
    image?: string
}

export function ProjectCard({ title, description, tags, link, image }: ProjectCardProps) {
    return (
        <Card className="group flex flex-col overflow-hidden border transition-all duration-300 hover:border-emerald-500/50 glow-emerald">
            <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-emerald-500/10 via-teal-400/5 to-emerald-600/10 dark:from-emerald-500/15 dark:via-teal-400/8 dark:to-emerald-600/15">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <svg
                            className="h-12 w-12 text-emerald-500/30 dark:text-emerald-400/30"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1 text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            className="font-normal bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Link href={link} className="w-full">
                    <Button className="w-full transition-all duration-300 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white" variant="outline">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
