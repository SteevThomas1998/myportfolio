"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"


export function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">MyPortfolio</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm lg:gap-6">
                        <Link
                            href="/projects"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                        <Link
                            href="/travel"
                            className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Travel
                        </Link>
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                                <span className="font-bold">MyPortfolio</span>
                            </Link>
                            <div className="flex flex-col gap-4 mt-8">
                                <Link
                                    href="/projects"
                                    className="font-medium hover:text-foreground/80 text-foreground/60"
                                    onClick={() => setOpen(false)}
                                >
                                    Projects
                                </Link>
                                <Link
                                    href="/blog"
                                    className="font-medium hover:text-foreground/80 text-foreground/60"
                                    onClick={() => setOpen(false)}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/about"
                                    className="font-medium hover:text-foreground/80 text-foreground/60"
                                    onClick={() => setOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/travel"
                                    className="font-medium hover:text-foreground/80 text-foreground/60"
                                    onClick={() => setOpen(false)}
                                >
                                    Travel
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other items */}
                    </div>
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
