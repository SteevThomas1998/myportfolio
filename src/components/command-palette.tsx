"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    Home,
    FolderKanban,
    User,
    BookOpen,
    MapPin,
    Mail,
    Github,
    Linkedin,
    Download,
    Moon,
    Sun,
    Code2,
    Briefcase,
    GraduationCap,
    Award,
} from "lucide-react"
import { useTheme } from "next-themes"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { allProjects } from "@/lib/projects"

export function CommandPalette() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const { setTheme, theme } = useTheme()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const run = (cb: () => void) => {
        setOpen(false)
        cb()
    }

    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Navigate">
                        <CommandItem onSelect={() => run(() => router.push("/"))}>
                            <Home className="mr-2 h-4 w-4" />
                            Home
                            <CommandShortcut>↩</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => router.push("/projects"))}>
                            <FolderKanban className="mr-2 h-4 w-4" />
                            Projects
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => router.push("/about"))}>
                            <User className="mr-2 h-4 w-4" />
                            About
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => router.push("/blog"))}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Blog
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => router.push("/travel"))}>
                            <MapPin className="mr-2 h-4 w-4" />
                            Travel
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Projects">
                        {allProjects.map((project) => (
                            <CommandItem
                                key={project.slug}
                                value={`project ${project.title} ${project.tags.join(" ")}`}
                                onSelect={() => run(() => router.push(`/projects/${project.slug}`))}
                            >
                                <Code2 className="mr-2 h-4 w-4" />
                                {project.title}
                                <span className="ml-2 text-xs text-muted-foreground truncate max-w-[200px]">
                                    {project.tags.slice(0, 2).join(" · ")}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="About Steev">
                        <CommandItem value="experience work history jobs" onSelect={() => run(() => router.push("/about#experience"))}>
                            <Briefcase className="mr-2 h-4 w-4" />
                            Work Experience
                        </CommandItem>
                        <CommandItem value="education university degree college" onSelect={() => run(() => router.push("/about#education"))}>
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Education
                        </CommandItem>
                        <CommandItem value="certifications aws meta" onSelect={() => run(() => router.push("/about#certifications"))}>
                            <Award className="mr-2 h-4 w-4" />
                            Certifications
                        </CommandItem>
                        <CommandItem value="download cv resume" onSelect={() => run(() => router.push("/about"))}>
                            <Download className="mr-2 h-4 w-4" />
                            Download CV
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Contact">
                        <CommandItem
                            value="email contact"
                            onSelect={() => run(() => window.location.href = "mailto:stevethomaswk@gmail.com")}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                            <CommandShortcut>stevethomaswk@gmail.com</CommandShortcut>
                        </CommandItem>
                        <CommandItem
                            value="github code repositories"
                            onSelect={() => run(() => window.open("https://github.com/SteevThomas1998", "_blank"))}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub Profile
                        </CommandItem>
                        <CommandItem
                            value="linkedin professional network"
                            onSelect={() => run(() => window.open("https://linkedin.com/in/steve-thomas-2788641a9", "_blank"))}
                        >
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn Profile
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Appearance">
                        <CommandItem onSelect={() => run(() => setTheme("light"))}>
                            <Sun className="mr-2 h-4 w-4" />
                            Light Mode
                            {theme === "light" && <CommandShortcut>✓</CommandShortcut>}
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => setTheme("dark"))}>
                            <Moon className="mr-2 h-4 w-4" />
                            Dark Mode
                            {theme === "dark" && <CommandShortcut>✓</CommandShortcut>}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
