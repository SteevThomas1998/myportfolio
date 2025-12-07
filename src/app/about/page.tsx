import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CVDownloadButton } from "@/components/cv-download-button"
import { ExperienceTimeline } from "@/components/experience-timeline"

export default function AboutPage() {
    return (
        <div className="container py-10 space-y-16">

            {/* Introduction */}
            <section className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        Motivated MSc Computing student with 3+ years of web development experience across remote and in-person roles. Strong background in JavaScript ecosystems, particularly Node.js, and hands-on experience with AWS cloud services.
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
                        <div className="min-w-[200px] text-muted-foreground">
                            Jan 2024 – Jul 2025
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-semibold">MSc in Computing Science</h3>
                            <p className="text-muted-foreground">Griffith College, Dublin</p>
                            <p className="text-sm text-muted-foreground">Expected graduation date</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
                        <div className="min-w-[200px] text-muted-foreground">
                            Jan 2016 – Dec 2020
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-semibold">B.E in Computer Science Engineering</h3>
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
                            {["JavaScript", "Node.js", "Angular", "React", "HTML5", "CSS"].map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Databases</h3>
                        <div className="flex flex-wrap gap-2">
                            {["SQL (MSSQL)", "MongoDB", "DynamoDB"].map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Cloud & DevOps</h3>
                        <div className="flex flex-wrap gap-2">
                            {["AWS (EC2, S3)", "Git", "cPanel", "Plesk"].map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Back-End & API Integration</h3>
                        <div className="flex flex-wrap gap-2">
                            {["RESTful APIs", "Authentication", "Data Feeds"].map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Testing & Tools</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Automated Testing", "Jest", "Debugging Tools"].map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl">Currently Exploring</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Docker", "CI/CD Pipelines", "Jest"].map(skill => (
                                <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight mb-8">Certifications</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>AWS Certified Solutions Architect</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Issued: Jan 2024</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Meta Frontend Developer Professional Certificate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Issued: Aug 2023</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

        </div>
    )
}
