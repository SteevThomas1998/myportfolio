import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteDescription =
  "Steev Thomas, a full stack developer in Manchester building production web apps across JavaScript frameworks, Shopify, WordPress and the cloud.";

export const metadata: Metadata = {
  metadataBase: new URL("https://steevthomas.com"),
  title: "Steev Thomas — Full Stack Developer",
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "Steev Thomas",
    title: "Steev Thomas — Full Stack Developer",
    description: siteDescription,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Steev Thomas, Full Stack Developer, Manchester" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steev Thomas — Full Stack Developer",
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatBot } from "@/components/chat-bot";
import { CommandPalette } from "@/components/command-palette";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          display.variable,
          serif.variable,
          mono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="cinema relative flex min-h-screen flex-col">
            <div className="film-grain" aria-hidden />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatBot />
            <CommandPalette />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
