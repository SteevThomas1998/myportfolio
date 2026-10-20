import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { SceneHeader, SectionTitle } from "@/components/cinema/scene-header"
import { ChapterScene, type Chapter } from "@/components/cinema/chapter-scene"

const CVDownloadButton = dynamic(() => import("@/components/cv-download-button").then((mod) => mod.CVDownloadButton), {
    ssr: false,
    loading: () => <span className="inline-block h-11 w-64 animate-pulse bg-reel-bone/10" />,
})

export const metadata: Metadata = {
    title: "About — Steev Thomas",
    description: "From Kerala to Dublin to Manchester: the story so far of full stack developer Steev Thomas.",
}

const chapters: Chapter[] = [
    {
        number: "01",
        place: "Kerala & Kanyakumari, India",
        years: "2016 – 2024",
        heading: "Where the code started.",
        body: "A BE in Computer Science Engineering, then twelve-plus WordPress sites shipped on schedule at Winsoft Solutions in Kochi. Then two years remote for Stride Real Estate in Dallas, keeping Angular and React apps above 99.5% uptime across three time zones.",
        image: "/cinema/about/kerala.webp",
    },
    {
        number: "02",
        place: "Dublin, Ireland",
        years: "2024 – 2025",
        heading: "Back to school, still shipping.",
        body: "An MSc in Computing Science at Griffith College Dublin, alongside e-commerce work for Ledivano Italia, including a WordPress-to-Shopify migration in under six weeks with zero downtime.",
        image: "/cinema/about/study.webp",
    },
    {
        number: "03",
        place: "Manchester, United Kingdom",
        years: "2026 →",
        heading: "The current scene.",
        body: "AI & Web Developer at NutreeLife Ltd, building intelligent tools and AI-driven features into a food-tech platform.",
        image: "/cinema/about/arrival.webp",
    },
]

const education = [
    { years: "2024 – 2025", title: "MSc in Computing Science", detail: "Griffith College, Dublin · Second Class Honours" },
    { years: "2016 – 2020", title: "BE in Computer Science Engineering", detail: "DMI Engineering College, Kanyakumari · CGPA 6.5" },
]

const skills: { role: string; names: string[] }[] = [
    { role: "Languages & frameworks", names: ["JavaScript (ES6+)", "React", "Angular", "Node.js", "HTML5 / CSS3"] },
    { role: "Databases", names: ["MySQL", "Supabase (PostgreSQL)"] },
    { role: "DevOps & cloud", names: ["Git / GitHub", "Azure DevOps", "AWS (CloudFront, EC2)", "CI/CD pipelines"] },
    { role: "Tools & platforms", names: ["WordPress", "Shopify (Liquid)", "VS Code", "cPanel", "Plesk"] },
    { role: "Practices", names: ["OOP", "REST APIs", "Agile / Scrum", "Code review", "TDD fundamentals"] },
    { role: "In rehearsal", names: ["C#", "ASP.NET", "SQL Server"] },
]

const laurels = [
    {
        title: "Certified Ethical Hacker (CEH)",
        issuer: "EC-Council",
        detail: "Issued Aug 2021 · Expired Aug 2024",
        note: "Credential ECC2531467890",
    },
    {
        title: "Intro to AI & Machine Learning on Google Cloud",
        issuer: "Google Cloud",
        detail: "Earned Nov 30, 2025",
        note: "Completion badge",
    },
    {
        title: "Angular & NodeJS: The MEAN Stack Guide",
        issuer: "Udemy · Maximilian Schwarzmüller",
        detail: "Issued Jan 31, 2022 · 13 hours",
        href: "https://ude.my/UC-f35d9f04-d4cf-4b41-8517-459659dc84c2",
    },
]

function Laurel() {
    return (
        <svg viewBox="0 0 64 40" aria-hidden className="h-8 w-14 text-reel-sodium">
            <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M26 36C12 34 5 24 6 8" />
                <path d="M38 36c14-2 21-12 20-28" />
                {[10, 16, 22, 28].map((y, i) => (
                    <g key={y}>
                        <path d={`M${7 + i * 1.5} ${y}c-4-2-5-5-4-8 3 0 5 3 4 8z`} />
                        <path d={`M${57 - i * 1.5} ${y}c4-2 5-5 4-8-3 0-5 3-4 8z`} />
                    </g>
                ))}
            </g>
        </svg>
    )
}

export default function AboutPage() {
    return (
        <div className="overflow-x-clip">
            <SceneHeader
                kicker="Biography · Three chapters and counting"
                title={
                    <>
                        The <span className="italic">story</span> so far
                    </>
                }
                lede="MSc Computing graduate and full stack developer with four-plus years building and maintaining production web applications across JavaScript frameworks, WordPress and cloud infrastructure. Currently AI & Web Developer at NutreeLife Ltd. Strong on Git workflows, agile collaboration and clean, maintainable code."
                aside={
                    <figure className="w-44 sm:w-56 lg:w-60 xl:w-72">
                        <div className="bg-[rgb(var(--reel-film))] p-2">
                            <div
                                role="img"
                                aria-label="Portrait of Steev Thomas"
                                className="plate-portrait aspect-[4/5] w-full bg-cover bg-center"
                            />
                        </div>
                        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/45">
                            Steev Thomas as himself
                        </figcaption>
                    </figure>
                }
            >
                <CVDownloadButton />
            </SceneHeader>

            {chapters.map((c) => (
                <ChapterScene key={c.number} chapter={c} />
            ))}

            <section className="px-4 pt-24 sm:px-[6vw]" aria-label="Work experience">
                <SectionTitle label="Call sheet">Work experience</SectionTitle>
                <ExperienceTimeline />
            </section>

            <section className="px-4 pt-24 sm:px-[6vw]" aria-label="Education">
                <SectionTitle label="Training">Education</SectionTitle>
                <div className="divide-y divide-reel-bone/10 border-y border-reel-bone/10">
                    {education.map((e) => (
                        <div key={e.title} className="grid gap-2 py-8 md:grid-cols-[14rem_1fr] md:gap-10">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-reel-sodium">{e.years}</p>
                            <div>
                                <h3 className="font-display text-3xl text-reel-bone">{e.title}</h3>
                                <p className="mt-1 font-serif text-lg italic text-reel-bone/60">{e.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 pt-24 sm:px-[6vw]" aria-label="Skills">
                <SectionTitle label="Credits">Skills</SectionTitle>
                <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((group) => (
                        <div key={group.role}>
                            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-reel-bone/45 sm:text-xs">{group.role}</p>
                            <ul className="mt-3 space-y-1">
                                {group.names.map((n) => (
                                    <li key={n} className="font-display text-2xl text-reel-bone">
                                        {n}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 pb-24 pt-24 sm:px-[6vw]" aria-label="Certifications">
                <SectionTitle label="Laurels">Certifications</SectionTitle>
                <div className="grid gap-6 md:grid-cols-3">
                    {laurels.map((l) => (
                        <div key={l.title} className="flex flex-col items-center border border-reel-bone/15 px-6 py-8 text-center">
                            <Laurel />
                            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-sodium">{l.issuer}</p>
                            <h3 className="mt-2 font-display text-xl leading-snug text-reel-bone">{l.title}</h3>
                            <p className="mt-3 font-serif text-sm text-reel-bone/60">{l.detail}</p>
                            {l.href ? (
                                <a
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-block py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-reel-sodium underline-offset-4 hover:underline"
                                >
                                    View certificate →
                                </a>
                            ) : (
                                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-reel-bone/40">{l.note}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
