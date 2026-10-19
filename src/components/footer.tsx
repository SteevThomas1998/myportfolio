export function Footer() {
    return (
        <footer className="border-t border-reel-bone/10 px-4 py-8 sm:px-[6vw]">
            <div className="flex flex-col items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/45 sm:flex-row sm:text-[11px]">
                <p>© {new Date().getFullYear()} Steev Thomas · Manchester</p>
                <p>
                    Shot on Next.js · Visuals by Higgsfield · <span className="text-reel-sodium">Fin.</span>
                </p>
            </div>
        </footer>
    )
}
