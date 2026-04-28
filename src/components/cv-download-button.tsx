"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function CVDownloadButton() {
    return (
        <a href="/Steev_Thomas_CV.pdf" download="Steev_Thomas_CV.pdf">
            <Button variant="default">
                <Download className="mr-2 h-4 w-4" />
                Download CV
            </Button>
        </a>
    )
}
