"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

function CommandTrigger() {
    return (
        <button
            onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
                document.dispatchEvent(event)
            }}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground w-full max-w-[200px]"
        >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline-flex">Search...</span>
            <kbd className="ml-auto hidden sm:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
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

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            <span className="hidden font-bold sm:inline-block">MyPortfolio</span>
                        </Link>
                        <nav className="flex items-center gap-4 text-sm lg:gap-6">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex md:hidden">
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            onClick={() => setOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open Menu</span>
                        </Button>
                    </div>

                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
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
                        className="fixed inset-0 z-[100] bg-background flex flex-col md:hidden"
                    >
                        {/* Close button */}
                        <div className="flex justify-end p-5">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-full border border-emerald-500 p-1.5 text-emerald-500 hover:bg-emerald-500/10 transition-colors"
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
                                        className="text-5xl font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
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
                                    className="w-full tracking-widest uppercase text-sm border-foreground/30 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
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
