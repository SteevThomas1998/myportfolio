"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
    id: string
    role: "user" | "ai"
    content: string
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Hi! I'm Steev's AI assistant. Ask me anything about his projects, skills, or experience!"
        }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isTyping])

    const handleSend = () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsTyping(true)

        // Mock AI response delay
        setTimeout(() => {
            const aiResponse = generateResponse(userMessage.content)
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponse
            }])
            setIsTyping(false)
        }, 1000)
    }

    const generateResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase()

        if (lowerQuery.includes("project") || lowerQuery.includes("work")) {
            return "Steev has worked on various full-stack projects using Next.js and Tailwind. You can check out the Projects page for more details!"
        }
        if (lowerQuery.includes("skill") || lowerQuery.includes("stack") || lowerQuery.includes("tech")) {
            return "Steev specializes in React, Next.js, TypeScript, Node.js, and Tailwind CSS. He is also proficient in backend technologies like PostgreSQL and AWS."
        }
        if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("hire")) {
            return "You can reach Steev at email@example.com. He is currently open to new opportunities!"
        }
        if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
            return "Hello there! How can I help you today?"
        }

        return "That's an interesting question! While I'm just a simple AI, I recommend looking through the portfolio to find more about what you're looking for."
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 z-50 w-[350px] shadow-xl"
                    >
                        <Card className="h-[500px] flex flex-col">
                            <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-primary" />
                                    AI Assistant
                                </CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-1 p-0 overflow-hidden">
                                <ScrollArea className="h-full p-4">
                                    <div className="flex flex-col gap-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                                    {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                </div>
                                                <div
                                                    className={`rounded-lg p-3 text-sm max-w-[80%] ${message.role === "user"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted text-foreground"
                                                        }`}
                                                >
                                                    {message.content}
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex gap-2 flex-row">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                                                    <Bot className="w-4 h-4" />
                                                </div>
                                                <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                                </div>
                                            </div>
                                        )}
                                        <div ref={scrollRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-4 border-t">
                                <form
                                    onSubmit={(e: React.FormEvent) => {
                                        e.preventDefault()
                                        handleSend()
                                    }}
                                    className="flex w-full gap-2"
                                >
                                    <Input
                                        placeholder="Type a message..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed bottom-4 right-4 z-50"
            >
                <Button
                    size="lg"
                    className="h-12 w-12 rounded-full shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                </Button>
            </motion.div>
        </>
    )
}
