import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const { name, email, message, captchaToken } = await request.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA
        if (process.env.RECAPTCHA_SECRET_KEY) {
            if (!captchaToken) {
                return NextResponse.json(
                    { error: 'Captcha token missing' },
                    { status: 400 }
                );
            }

            const verifyRes = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
                { method: 'POST' }
            );
            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
                return NextResponse.json(
                    { error: 'Captcha verification failed' },
                    { status: 400 }
                );
            }
        } else {
            console.warn("RECAPTCHA_SECRET_KEY missing. Skipping verification for dev.");
        }

        // Check if API key is present
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is missing. Mocking success for development.");
            // Mock success response for development if no key is set
            return NextResponse.json({ success: true, mocked: true });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>', // Default Resend testing domain
            to: ['steevthomas@icloud.com'], // Deliver to the user's email
            subject: `New Contact Form Submission from ${name}`,
            replyTo: email,
            text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
            // You can also use React components here for HTML emails
            html: `
        <h1>New Contact from Portfolio</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
