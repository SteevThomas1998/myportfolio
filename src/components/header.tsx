"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

function CommandTrigger() {
    return (
        <button
            onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
                document.dispatchEvent(event)
            }}
            aria-label="Search the site"
            className="inline-flex h-10 w-10 items-center justify-center gap-2 border border-reel-bone/15 bg-reel-bone/[0.04] font-mono text-xs text-reel-bone/60 sm:w-[200px] sm:justify-start sm:px-3 transition-colors hover:border-reel-sodium/60 hover:text-reel-bone"
        >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline-flex">Search...</span>
            <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 border border-reel-bone/15 px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
                <span className="text-xs">⌘</span>K
            </kbd>
        </button>
    )
}

const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/travel", label: "Travel" },
]

export function Header() {
    const [open, setOpen] = useState(false)
    // The home page is a dark, full-bleed film; the header floats over it
    const pathname = usePathname()
    const cinematic = pathname === "/"

    return (
        <>
            <header className={cn("sticky top-0 z-50 w-full", cinematic ? "border-transparent bg-gradient-to-b from-reel-page/70 to-transparent" : "border-b border-reel-bone/10 bg-reel-page/80 backdrop-blur-md")}>
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link href="/" className="mr-8 flex items-center py-1.5">
                            <Logo />
                        </Link>
                        <nav className="flex items-center gap-4 text-sm lg:gap-6">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn("font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-reel-sodium", pathname.startsWith(link.href) ? "text-reel-bone" : "text-reel-bone/55")}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex items-center gap-1 md:hidden">
                        <Button
                            variant="ghost"
                            className="h-10 w-10 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            onClick={() => setOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open Menu</span>
                        </Button>
                        <Link href="/" className="flex items-center py-1.5">
                            <Logo className="[&_.font-mono]:hidden min-[400px]:[&_.font-mono]:block" />
                        </Link>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                        <div>
                            <CommandTrigger />
                        </div>
                        <nav className="flex items-center">
                            <ModeToggle />
                        </nav>
                    </div>
                </div>
            </header>

            {/* Full-screen mobile menu overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-reel-page md:hidden"
                    >
                        {/* Close button */}
                        <div className="flex justify-end p-5">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-full border border-reel-sodium p-1.5 text-reel-sodium transition-colors hover:bg-reel-sodium/10"
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close Menu</span>
                            </button>
                        </div>

                        {/* Nav links */}
                        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="font-display text-5xl italic text-reel-bone/70 transition-colors duration-200 hover:text-reel-sodium"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.35 }}
                            className="flex justify-center pb-12 px-8"
                        >
                            <Link href="/#contact" onClick={() => setOpen(false)} className="w-full max-w-xs">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full rounded-none border-reel-bone/30 bg-transparent font-mono text-xs uppercase tracking-[0.3em] transition-colors hover:border-reel-sodium hover:text-reel-sodium"
                                >
                                    Get in Touch →
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
