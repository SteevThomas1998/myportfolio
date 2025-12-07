"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import ReCAPTCHA from "react-google-recaptcha"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage("")

        if (!captchaToken && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
            setErrorMessage("Please complete the captcha.")
            setStatus('error')
            return
        }

        setStatus('submitting')

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, captchaToken }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setFormData({ name: "", email: "", message: "" })
                setCaptchaToken(null)
                // Reset success message after 3 seconds
                setTimeout(() => setStatus('idle'), 3000)
            } else {
                setErrorMessage(data.error || "Something went wrong.")
                setStatus('error')
            }
        } catch (error) {
            console.error(error)
            setErrorMessage("Failed to send message.")
            setStatus('error')
        }
    }

    return (
        <section className="container py-12 md:py-24 lg:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12"
            >
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                    Get in Touch
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Me</CardTitle>
                            <CardDescription>
                                Fill out the form below and I&apos;ll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4" onSubmit={handleSubmit}>
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Your message..."
                                        className="min-h-[120px]"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <ReCAPTCHA
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Use dummy key for dev if missing
                                        onChange={setCaptchaToken}
                                        theme="dark"
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                </Button>
                                {status === 'success' && (
                                    <p className="text-sm text-green-600 dark:text-green-400 text-center mt-2">
                                        Message sent successfully!
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-sm text-red-600 dark:text-red-400 text-center mt-2">
                                        {errorMessage || "Something went wrong. Please try again."}
                                    </p>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col justify-center gap-8"
                >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-bold">Connect with me</h3>
                        <p className="text-muted-foreground">
                            I&apos;m always open to discussing web development work or partnership opportunities.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <Link href="https://github.com/SteevThomas1998" target="_blank" className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                            <Github className="h-6 w-6" />
                            <div className="flex-1">
                                <h4 className="font-semibold">GitHub</h4>
                                <p className="text-sm text-muted-foreground">Check out my open source projects</p>
                            </div>
                        </Link>
                        <Link href="https://linkedin.com/in/steve-thomas-2788641a9" target="_blank" className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                            <Linkedin className="h-6 w-6" />
                            <div className="flex-1">
                                <h4 className="font-semibold">LinkedIn</h4>
                                <p className="text-sm text-muted-foreground">Connect with me professionally</p>
                            </div>
                        </Link>
                        <Link href="mailto:steevthomaswk@gmail.com" className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                            <Mail className="h-6 w-6" />
                            <div className="flex-1">
                                <h4 className="font-semibold">Email</h4>
                                <p className="text-sm text-muted-foreground">steevthomaswk@gmail.com</p>
                            </div>
                        </Link>
                        {/* Removed Twitter as it wasn't on the resume, keeping generic GitHub/LinkedIn/Email */}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
