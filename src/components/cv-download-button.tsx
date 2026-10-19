"use client"

import { Download } from "lucide-react"

export function CVDownloadButton() {
    return (
        <a
            href="/Steev_Thomas_CV.pdf"
            download="Steev_Thomas_CV.pdf"
            className="group inline-flex items-center gap-3 border border-reel-sodium px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-reel-sodium transition-colors hover:bg-reel-sodium hover:text-reel-ink"
        >
            <Download className="h-4 w-4" />
            Download the script (CV)
        </a>
    )
}
