import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    link: string
}

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
    return (
        <Card className="group flex flex-col overflow-hidden border transition-all hover:border-foreground/50 hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 transition-transform duration-300 group-hover:scale-105">
                    <svg
                        className="h-12 w-12 opacity-20"
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
            </div>
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="line-clamp-1 text-xl">{title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2 text-sm">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Link href={link} className="w-full">
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
