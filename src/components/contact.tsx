"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import ReCAPTCHA from "react-google-recaptcha"
import { useTheme } from "next-themes"

const SHEET = [
    { role: "Repository", name: "GitHub", note: "Check out my open source projects", href: "https://github.com/SteevThomas1998" },
    { role: "Network", name: "LinkedIn", note: "Connect with me professionally", href: "https://linkedin.com/in/steve-thomas-2788641a9" },
    { role: "Direct line", name: "stevethomaswk@gmail.com", note: "Write to me directly", href: "mailto:stevethomaswk@gmail.com" },
]

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
}

const label = "font-mono text-[10px] uppercase tracking-[0.35em] text-reel-bone/55 sm:text-xs"
const field =
    "w-full border-0 border-b border-reel-bone/25 bg-transparent px-0 py-3 font-serif text-lg text-reel-bone " +
    "placeholder:text-reel-bone/30 focus:border-reel-sodium focus:outline-none focus:ring-0 disabled:opacity-50"

/** The post-credits scene: a call sheet to get in touch, and the contact sheet. */
export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { resolvedTheme } = useTheme()

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

    const fields = [
        { id: "name", n: "01", text: "Name", type: "text", placeholder: "Your name" },
        { id: "email", n: "02", text: "Email", type: "email", placeholder: "you@company.com" },
    ] as const

    return (
        <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-[6vw] md:pt-16" aria-labelledby="contact-title">
            <motion.header {...reveal} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-16 max-w-3xl md:mb-24">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-reel-sodium sm:text-xs">
                    Post-credits scene
                </p>
                <h2 id="contact-title" className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-reel-bone">
                    Let&apos;s make <span className="italic">the next one.</span>
                </h2>
                <p className="mt-6 max-w-xl font-serif text-lg text-reel-bone/70 sm:text-xl">
                    A brief, a half-formed idea or a role to fill. Send it over and I&apos;ll get back to you.
                </p>
            </motion.header>

            <div className="grid gap-20 md:grid-cols-[1.15fr_1fr] md:gap-16 lg:gap-24">
                {/* Call sheet */}
                <motion.form
                    {...reveal}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onSubmit={handleSubmit}
                    className="space-y-10"
                    aria-label="Contact form"
                >
                    <p className={label}>
                        <span className="text-reel-sodium">Call sheet</span> — all fields required
                    </p>
                    {fields.map((f) => (
                        <div key={f.id}>
                            <label htmlFor={f.id} className={label}>
                                <span className="mr-3 text-reel-sodium">{f.n}</span>
                                {f.text}
                            </label>
                            <input
                                id={f.id}
                                type={f.type}
                                placeholder={f.placeholder}
                                value={formData[f.id]}
                                onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                                required
                                disabled={status === 'submitting'}
                                className={field}
                            />
                        </div>
                    ))}
                    <div>
                        <label htmlFor="message" className={label}>
                            <span className="mr-3 text-reel-sodium">03</span>
                            The pitch
                        </label>
                        <textarea
                            id="message"
                            placeholder="What are we making?"
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            disabled={status === 'submitting'}
                            className={`${field} resize-none`}
                        />
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Use dummy key for dev if missing
                            key={resolvedTheme}
                            onChange={setCaptchaToken}
                            theme={resolvedTheme === "light" ? "light" : "dark"}
                        />
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="group inline-flex h-14 items-center justify-between gap-6 bg-reel-sodium px-6 font-mono text-xs uppercase tracking-[0.3em] text-reel-page hover:bg-reel-bone disabled:opacity-60 sm:min-w-[13rem]"
                        >
                            {status === 'submitting' ? 'Sending…' : 'Send it'}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </button>
                    </div>
                    <div aria-live="polite">
                        {status === 'success' && (
                            <p className="font-serif text-lg italic text-reel-sodium">That&apos;s a wrap. Message received, I&apos;ll be in touch.</p>
                        )}
                        {status === 'error' && (
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
                                {errorMessage || "Something went wrong. Please try again."}
                            </p>
                        )}
                    </div>
                </motion.form>

                {/* Contact sheet */}
                <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                    <p className={`${label} mb-6`}>
                        <span className="text-reel-sodium">Contact sheet</span> — or reach me directly
                    </p>
                    <ul className="border-t border-reel-bone/15">
                        {SHEET.map((c) => (
                            <li key={c.role} className="border-b border-reel-bone/15">
                                <Link
                                    href={c.href}
                                    target={c.href.startsWith("http") ? "_blank" : undefined}
                                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="group flex items-start justify-between gap-4 py-6"
                                >
                                    <span className="min-w-0">
                                        <span className={`${label} block`}>{c.role}</span>
                                        <span className="mt-2 block break-words font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-reel-bone transition-colors group-hover:text-reel-sodium">
                                            {c.name}
                                        </span>
                                        <span className="mt-1 block font-serif text-reel-bone/55">{c.note}</span>
                                    </span>
                                    <ArrowUpRight
                                        className="mt-7 h-5 w-5 shrink-0 text-reel-bone/40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-reel-sodium"
                                        aria-hidden
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className={`${label} mt-10`}>Based in Manchester, UK</p>
                </motion.div>
            </div>
        </section>
    )
}
