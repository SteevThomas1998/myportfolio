"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "ai/react"
import ReactMarkdown from "react-markdown"

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {
                id: "welcome",
                role: "assistant",
                content: "Hi! I'm Steev's AI assistant. Ask me anything about his projects, skills, or experience!"
            }
        ]
    })

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isLoading])

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
                                                    <div
                                                        className={`prose text-sm max-w-none prose-p:leading-normal prose-p:m-0 ${message.role === "user" ? "prose-invert" : "dark:prose-invert"}`}
                                                    >
                                                        <ReactMarkdown>
                                                            {message.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex gap-2 flex-row">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                                                    <Bot className="w-4 h-4" />
                                                </div>
                                                <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-2 text-muted-foreground">
                                                    <Loader2 className="h-3 w-3 animate-spin" />
                                                    Typing...
                                                </div>
                                            </div>
                                        )}
                                        <div ref={scrollRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-4 border-t">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex w-full gap-2"
                                >
                                    <Input
                                        placeholder="Type a message..."
                                        value={input}
                                        onChange={handleInputChange}
                                        className="flex-1"
                                    />
                                    <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
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
