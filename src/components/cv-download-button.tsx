"use client"

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { CVDocument } from "@/components/cv-document";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from 'react';

export function CVDownloadButton() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <Button variant="outline" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading PDF...
            </Button>
        )
    }

    return (
        <PDFDownloadLink document={<CVDocument />} fileName="Steev_Thomas_CV.pdf">
            {({ loading, error }) => {
                if (error) {
                    return (
                        <Button variant="destructive" disabled>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Error Generating PDF
                        </Button>
                    )
                }
                return loading ? (
                    <Button variant="outline" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating PDF...
                    </Button>
                ) : (
                    <Button variant="default">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                    </Button>
                )
            }}
        </PDFDownloadLink>
    );
}
