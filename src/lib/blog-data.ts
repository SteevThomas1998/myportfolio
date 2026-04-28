export interface BlogPost {
    slug: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    content: string
}

export const blogPosts: BlogPost[] = [
    {
        slug: "i-built-an-ai-that-reads-your-gmail-and-tracks-job-applications",
        title: "I Built an AI That Reads Your Gmail and Tracks Job Applications",
        excerpt: "Tired of losing track of job applications in a messy spreadsheet, I built Stealeen — an AI-powered tracker that connects to your Gmail and automatically detects, parses, and organises every application for you.",
        date: "April 2025",
        tags: ["AI", "Gmail API", "React", "Supabase", "OpenAI", "Side Project"],
        content: `
# I Built an AI That Reads Your Gmail and Tracks Job Applications

Job hunting is exhausting enough. The last thing you need is a second job just *managing* your applications.

Spreadsheets get stale. Notes apps get messy. And most job trackers require you to manually paste in every single application — which nobody actually does consistently.

So I built **Stealeen**: an AI-powered job application tracker that connects to your Gmail inbox and does the tracking for you, automatically.

---

## The Problem

When you apply for jobs at scale, your inbox becomes a graveyard of:

- Application confirmations
- Automated rejections
- Interview invites
- Recruiter follow-ups
- Assessment links

Keeping on top of all of that manually is a real cognitive load. I wanted something that would just *know* — without me having to touch it.

---

## How It Works

Stealeen connects to Gmail via **OAuth 2.0** and monitors incoming emails in real time. When a job-related email arrives, it goes through a two-layer processing system:

### Layer 1 — Regex Engine

A pattern-matching engine that recognises emails from **30+ Applicant Tracking Systems** — Greenhouse, Lever, Workday, and more. This handles the majority of emails instantly, with no API call needed and no cost.

### Layer 2 — GPT-4o-mini Fallback

For emails that don't match a known pattern (non-standard company emails, bespoke hiring tools), the email is passed to **GPT-4o-mini**, which reads the content and classifies it intelligently.

The system also filters out noise — LinkedIn digests, recruiter spam, financial app alerts — so your dashboard stays clean and accurate.

---

## What You Get

Once it's running, Stealeen gives you:

- **Kanban board and list view** — visualise your pipeline at a glance
- **Automatic status progression** — Applied → Interview → Offer → Rejected, updated as emails arrive
- **Manual override** — correct any misclassification with one click
- **Follow-up reminders** — so no opportunity goes cold
- **Real-time dashboard updates** — always current, no refresh needed
- **Dark mode** — because of course

---

## The Stack

I deliberately kept the infrastructure lean and scalable:

| Layer | Tech |
|---|---|
| Frontend | React + TypeScript |
| Backend / DB | Supabase (PostgreSQL) |
| Deployment | Vercel |
| Email Integration | Gmail API |
| AI Parsing | OpenAI GPT-4o-mini |

The two-tier approach (regex first, AI as fallback) keeps costs low while maintaining high accuracy across a wide range of email formats.

---

## Current Status

Stealeen is live and in **private beta**. If you're job hunting and want to try it, head to [stealeen.com](https://www.stealeen.com) and sign up.

I'm actively improving the parser, adding more ATS pattern support, and working on analytics features — so there's a lot more to come.

---

If you've ever lost track of an application or missed a follow-up because your inbox was a mess, this was built for you.

Would love to hear your feedback. 👇

#AI #JobSearch #OpenAI #GmailAPI #React #Supabase #SideProject #BuildInPublic
        `
    },
    {
        slug: "github-actions-vs-aws-codepipeline",
        title: "GitHub Actions vs AWS CodePipeline for CI/CD",
        excerpt: "After refining DevOps workflows across multiple Node.js projects, here's what I learned comparing GitHub Actions and AWS CodePipeline — and why AI is set to transform both.",
        date: "April 28, 2025",
        tags: ["DevOps", "CI/CD", "GitHub Actions", "AWS", "Node.js", "AI"],
        content: `
# 🚀 GitHub Actions vs AWS CodePipeline for CI/CD
### And how AI is set to transform them both!

Over the past few weeks, I've been refining DevOps workflows across multiple Node.js projects — including a full-stack Job Tracker API with JWT auth, full CRUD, test automation (Jest + Supertest), and CI integrations.

I experimented with both GitHub Actions and have experience with AWS CodePipeline + CodeCommit — here's what stood out:

---

## ✅ GitHub Actions

- Seamless setup within the GitHub ecosystem
- Developer-friendly YAML workflows
- Huge community marketplace
- Best for open-source and lightweight, fast-moving projects

A typical workflow looks like this:

\`\`\`yaml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test
\`\`\`

Simple, readable, and live in minutes.

---

## ☁️ AWS CodePipeline + CodeCommit

- Powerful for enterprise use when paired with S3, ECS, Lambda
- Granular IAM control and scalable integrations
- Ideal for teams operating entirely within the AWS cloud

When you're already deep in the AWS ecosystem — running ECS clusters, Lambda functions, and S3 deployments — CodePipeline offers native integration that GitHub Actions simply can't match out of the box.

---

## 🧠 Key Takeaway

> If you want **simplicity and speed**, GitHub Actions wins.
> If you're already **living inside AWS**, CodePipeline offers unmatched control.

The choice really comes down to where your infrastructure lives, not which tool is objectively better.

---

## 🤖 But here's what really excites me — AI is transforming CI/CD

From GitHub Copilot generating workflows automatically...
To AI-powered failure prediction, adaptive testing, and smart pipeline optimisation...

We're heading into a future where deployment isn't just automated — it's **intelligent**.

Imagine:

- → Pipelines that **debug themselves**
- → Tests that **adapt to code changes**
- → Deployments that **suggest rollback strategies** before errors even happen

This intersection of DevOps + AI is where a lot of innovation is brewing — and I'm following it closely.

---

Which stack do you use for CI/CD? And what's your take on AI's role in the future of software delivery?

#GitHubActions #AWSCodePipeline #DevOps #CICD #NodeJS #Automation #AIinDevOps #CloudEngineering
        `
    }
]
