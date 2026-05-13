import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { allProjects } from "@/lib/projects";
import { highlightedCountries } from "@/lib/travel-data";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // Trim the API key to remove any accidental whitespace or newlines
        const apiKey = process.env.OPENAI_API_KEY?.trim();

        if (!apiKey) {
            console.error("[CHAT_API_ERROR] OPENAI_API_KEY is not set");
            return new Response(
                JSON.stringify({
                    error: "Server configuration error: API key missing.",
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const body = await req.json();
        const messages = body?.messages;

        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({
                    error: "Invalid request: 'messages' array is required.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const activeProjects = allProjects.filter(p => !p.inDevelopment && !p.isPreviousWork)
        const inDevProjects = allProjects.filter(p => p.inDevelopment)
        const previousProjects = allProjects.filter(p => p.isPreviousWork)

        const formatProject = (p: typeof allProjects[0]) => [
            `### ${p.title}`,
            `- **Slug / detail page:** /projects/${p.slug}`,
            `- **Description:** ${p.description}`,
            `- **Tech stack:** ${p.tags.join(", ")}`,
            p.liveLink ? `- **Live URL:** ${p.liveLink}` : null,
            `- **About:** ${p.longDescription}`,
            `- **Key features:** ${p.features.join("; ")}`,
        ].filter(Boolean).join("\n")

        const systemPrompt = `You are a helpful and professional AI assistant embedded in the portfolio website of Steev Thomas, a Full Stack Developer based in Manchester.

---

## CURRENT PROJECTS (fully shipped)

${activeProjects.map(formatProject).join("\n\n")}

---

## PROJECTS IN DEVELOPMENT (live but still being actively built — not fully published)

These projects are deployed and accessible but are still in active development. Be clear about that when asked.

${inDevProjects.map(formatProject).join("\n\n")}

---

## PREVIOUS WORK (client sites built with WordPress + Elementor, hosted on Plesk)

These are earlier client projects Steev completed. They showcase his ability to deliver real-world sites for clients across different industries.

${previousProjects.map(formatProject).join("\n\n")}

---

## ABOUT STEEV

- MSc Computing graduate with 4+ years building production web applications.
- Specialises in Full Stack Development: React, Next.js, Node.js, TypeScript, Tailwind CSS.
- Also experienced with WordPress, Elementor, Shopify (Liquid), and cloud infrastructure (Railway, Vercel, Plesk).
- Passionate about clean UI, scalable architecture, and real-world problem solving.
- Open to new opportunities and freelance work.
- Based in Manchester, UK.
- Contact: use the contact section on the website.

## TRAVEL

Countries Steev has visited or lived in:
${highlightedCountries.map(c => `- ${c.name} (${c.status})`).join("\n")}

---

## INSTRUCTIONS

- Answer questions about Steev's work, skills, projects, and travels using the context above.
- Be concise, friendly, and professional.
- When asked about a specific project, give a clear summary including status (active, in development, or previous work), tech stack, and key features — and encourage the user to visit its detail page.
- When asked "what projects are in development?" list the in-development ones and note they are deployed but not fully finished.
- When asked about previous/old/WordPress work, list the previous work projects.
- Use Markdown for structure when it helps readability.
- Do not speculate beyond what's in this context. If you don't know, say so politely and redirect to the contact section.
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or another current model you prefer
            stream: true,
            messages: [{ role: "system", content: systemPrompt }, ...messages],
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stream = OpenAIStream(response as any);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error("[CHAT_API_ERROR]", error);
        return new Response(
            JSON.stringify({
                error: "Something went wrong while processing your request.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}