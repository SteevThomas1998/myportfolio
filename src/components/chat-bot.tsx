"use client"

import { useState, useRef, useEffect } from "react"
import { X, ArrowUp, Sparkles } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useChat } from "ai/react"
import ReactMarkdown from "react-markdown"

const PROMPTS = ["What has Steev built?", "What's his tech stack?", "Is he open to new roles?"]

// Markdown inherits the panel's reel colours instead of the prose palette.
const PROSE =
    "prose prose-sm max-w-none prose-p:my-0 prose-p:leading-relaxed prose-ul:my-1 prose-li:my-0 " +
    "[--tw-prose-body:currentColor] [--tw-prose-bold:currentColor] [--tw-prose-bullets:currentColor] " +
    "[--tw-prose-counters:currentColor] [--tw-prose-headings:currentColor] [--tw-prose-code:currentColor] " +
    "[--tw-prose-links:rgb(var(--reel-sodium))]"

/**
 * Director's commentary: an AI assistant that talks about Steev's work,
 * styled as a film slate so it reads as part of the picture.
 */
export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const reduce = useReducedMotion()

    const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
        initialMessages: [
            {
                id: "welcome",
                role: "assistant",
                content: "Hi, I'm Steev's AI assistant. Ask me anything about his projects, skills or experience.",
            },
        ],
    })

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isLoading])

    useEffect(() => {
        if (isOpen) inputRef.current?.focus()
    }, [isOpen])

    const fresh = messages.length === 1

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="dialog"
                        aria-label="AI assistant"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-20 right-4 z-50 flex h-[min(520px,calc(100svh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col border border-reel-bone/15 bg-reel-ink/95 text-reel-bone shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl"
                    >
                        {/* Slate header */}
                        <div className="flex items-start justify-between border-b border-reel-bone/15 px-5 py-4">
                            <div className="space-y-1.5">
                                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/60">
                                    <span className="text-reel-sodium">Bonus</span> — Director&apos;s commentary
                                </p>
                                <p className="flex items-center gap-2 font-display text-xl italic">
                                    Ask about my work
                                    <span className="inline-flex items-center gap-1 border border-reel-sodium/50 px-1.5 py-0.5 font-mono text-[9px] not-italic uppercase tracking-[0.2em] text-reel-sodium">
                                        <Sparkles className="h-2.5 w-2.5" aria-hidden />
                                        AI
                                    </span>
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="-mr-2 -mt-1 flex h-9 w-9 items-center justify-center text-reel-bone/60 hover:text-reel-bone"
                                aria-label="Close assistant"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Transcript */}
                        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
                            {messages.map((message) =>
                                message.role === "user" ? (
                                    <div key={message.id} className="flex justify-end">
                                        <div className="max-w-[85%] bg-reel-bone px-3.5 py-2.5 text-sm text-reel-ink">
                                            {message.content}
                                        </div>
                                    </div>
                                ) : (
                                    <div key={message.id} className="space-y-1.5">
                                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-reel-sodium">AI</p>
                                        <div className={`${PROSE} font-serif text-[15px] text-reel-bone/90`}>
                                            <ReactMarkdown>{message.content}</ReactMarkdown>
                                        </div>
                                    </div>
                                )
                            )}
                            {isLoading && messages[messages.length - 1]?.role === "user" && (
                                <div className="space-y-1.5" aria-live="polite">
                                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-reel-sodium">AI</p>
                                    <p className="flex items-center gap-1 text-reel-bone/60">
                                        <span className="sr-only">Thinking</span>
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                className="h-1.5 w-1.5 rounded-full bg-current"
                                                animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                        ))}
                                    </p>
                                </div>
                            )}
                            {fresh && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {PROMPTS.map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => append({ role: "user", content: p })}
                                            className="border border-reel-bone/20 px-3 py-1.5 text-left font-serif text-sm text-reel-bone/80 hover:border-reel-sodium hover:text-reel-bone"
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-reel-bone/15 px-4 py-3">
                            <input
                                ref={inputRef}
                                placeholder="Ask a question…"
                                value={input}
                                onChange={handleInputChange}
                                aria-label="Message the AI assistant"
                                className="min-w-0 flex-1 bg-transparent py-2 font-serif text-base text-reel-bone placeholder:text-reel-bone/40 focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                aria-label="Send"
                                className="flex h-9 w-9 shrink-0 items-center justify-center bg-reel-sodium text-reel-page disabled:opacity-30"
                            >
                                <ArrowUp className="h-4 w-4" />
                            </button>
                        </form>
                        <p className="px-5 pb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-reel-bone/40">
                            AI-generated · may be imperfect
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher: a slate tag rather than a generic bubble */}
            <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
                className="group fixed bottom-4 right-4 z-50 flex h-12 items-center gap-3 border border-reel-bone/20 bg-reel-ink/85 pl-3 pr-4 text-reel-bone shadow-[0_12px_40px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md hover:border-reel-sodium"
            >
                <span className="relative flex h-7 w-7 items-center justify-center bg-reel-sodium text-reel-page">
                    {isOpen ? <X className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                    {!isOpen && !reduce && (
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-ping rounded-full bg-reel-sodium" aria-hidden />
                    )}
                </span>
                <span className="flex flex-col items-start leading-none">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-reel-bone/60">AI assistant</span>
                    <span className="mt-1 font-display text-base italic">{isOpen ? "Close" : "Ask my AI"}</span>
                </span>
            </motion.button>
        </>
    )
}
