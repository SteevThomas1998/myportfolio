import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { allProjects } from "@/lib/projects";

// Ensure API key exists at build time
if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
}

// Create an OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
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

        // Create a context string from the projects data
        const projectContext = allProjects
            .map(
                (p) =>
                    `- ${p.title} (${p.slug}): ${p.description}. Tech stack: ${p.tags.join(
                        ", "
                    )}.`
            )
            .join("\n");

        const systemPrompt = `You are a helpful and professional AI assistant for the portfolio of Steev Thomas.

Here is some context about Steev's projects:
${projectContext}

About Steev:
- Specializes in Full Stack Development (React, Next.js, Node.js).
- Passionate about building scalable applications and premium user interfaces.
- Open to new opportunities and freelance work.
- Contact: Use the contact section on the website.

Instructions:
- Answer questions about Steev's work, skills, and projects based on the provided context.
- Be concise, friendly, and professional.
- If asked about a specific project, provide details and encourage the user to check the "View Details" page.
- Use Markdown formatting for lists and emphasis.
- If you don't know the answer, politely state that you strictly answer questions about Steev's portfolio.
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