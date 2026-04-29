import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"
const CVDownloadButton = dynamic(() => import("@/components/cv-download-button").then(mod => mod.CVDownloadButton), {
    ssr: false,
    loading: () => <button className="h-10 px-4 py-2 bg-primary/10 rounded-md animate-pulse">Loading...</button>
})
import { ExperienceTimeline } from "@/components/experience-timeline"

export default function AboutPage() {
    return (
        <div className="container py-10 space-y-16">

            {/* Introduction */}
            <section className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        MSc Computing graduate and full-stack developer with 4+ years of hands-on experience building and maintaining
                        production web applications across JavaScript frameworks, WordPress, and cloud infrastructure. Currently
                        expanding into C#/.NET and SQL Server, with strong foundations in Git-based workflows, agile collaboration, and
                        writing clean, maintainable code. Eager to grow within a structured development team and contribute to real-world
                        software projects in a CI/CD environment.
                    </p>
                </div>
                <CVDownloadButton />
            </section>

            {/* Experience */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight mb-8">Work Experience</h2>
                <ExperienceTimeline />
            </section>

            {/* Education */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight mb-8">Education</h2>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
                        <div className="min-w-[200px] text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                            2024 – 2025
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-semibold">MSc in Computing Science — Second Class Honours</h3>
                            <p className="text-muted-foreground">Griffith College, Dublin</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
                        <div className="min-w-[200px] text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                            2016 – 2020
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-semibold">BE in Computer Science Engineering</h3>
                            <p className="text-muted-foreground">DMI Engineering College, Kanyakumari</p>
                            <p className="text-sm text-muted-foreground">CGPA 6.5</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight mb-8">Skills</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Languages & Frameworks</h3>
                        <div className="flex flex-wrap gap-2">
                            {["JavaScript (ES6+)", "React", "Angular", "Node.js", "HTML5", "CSS3", "C# (learning)", "ASP.NET (learning)"].map(skill => (
                                <Badge key={skill} className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Databases</h3>
                        <div className="flex flex-wrap gap-2">
                            {["SQL Server (learning)", "MySQL", "Supabase (PostgreSQL)"].map(skill => (
                                <Badge key={skill} className="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">DevOps & Cloud</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Git", "GitHub", "Azure DevOps", "AWS (CloudFront, EC2)", "CI/CD pipelines"].map(skill => (
                                <Badge key={skill} className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Tools & Platforms</h3>
                        <div className="flex flex-wrap gap-2">
                            {["WordPress", "Shopify (Liquid)", "Visual Studio Code", "cPanel", "Plesk"].map(skill => (
                                <Badge key={skill} className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Practices</h3>
                        <div className="flex flex-wrap gap-2">
                            {["OOP", "REST APIs", "Agile / Scrum", "Code Review", "TDD Fundamentals"].map(skill => (
                                <Badge key={skill} className="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Currently Expanding</h3>
                        <div className="flex flex-wrap gap-2">
                            {["C#", "ASP.NET", "SQL Server", "Azure DevOps"].map(skill => (
                                <Badge key={skill} className="bg-transparent text-emerald-600 border-emerald-400 dark:text-emerald-400 dark:border-emerald-600">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight mb-8">Certifications</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-emerald-200/50 dark:border-emerald-800/50">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
                                <span className="text-xs font-bold text-red-600 dark:text-red-400">EC</span>
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-base leading-snug">Certified Ethical Hacker (CEH)</CardTitle>
                                <p className="text-sm text-muted-foreground">EC-Council</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <p className="text-sm text-muted-foreground">Issued Aug 2021 · Expires Aug 2024</p>
                            <p className="text-xs text-muted-foreground font-mono">Credential ID: ECC2531467890</p>
                        </CardContent>
                    </Card>
                    <Card className="border-emerald-200/50 dark:border-emerald-800/50">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0z" fill="#4285F4"/>
                                    <path d="M12 4.8c3.978 0 7.2 3.222 7.2 7.2S15.978 19.2 12 19.2 4.8 15.978 4.8 12 8.022 4.8 12 4.8z" fill="#fff"/>
                                    <path d="M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6z" fill="#4285F4"/>
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-base leading-snug">Intro to AI & Machine Learning on Google Cloud</CardTitle>
                                <p className="text-sm text-muted-foreground">Google Cloud</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <p className="text-sm text-muted-foreground">Earned Nov 30, 2025</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Completion Badge</p>
                        </CardContent>
                    </Card>
                    <Card className="border-emerald-200/50 dark:border-emerald-800/50">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">U</span>
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-base leading-snug">Angular & NodeJS — The MEAN Stack Guide</CardTitle>
                                <p className="text-sm text-muted-foreground">Udemy · Maximilian Schwarzmüller</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <p className="text-sm text-muted-foreground">Issued Jan 31, 2022 · 13 hours</p>
                            <a
                                href="https://ude.my/UC-f35d9f04-d4cf-4b41-8517-459659dc84c2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                            >
                                View Certificate →
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </section>

        </div>
    )
}
