export function Footer() {
    return (
        // Bottom/right padding keeps the credits clear of the fixed AI assistant launcher
        <footer className="border-t border-reel-bone/15 px-4 pb-24 pt-8 sm:py-8 sm:pl-[6vw] sm:pr-[max(6vw,16rem)]">
            <div className="flex flex-col items-center justify-between gap-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-reel-bone/75 sm:flex-row sm:text-[11px]">
                <p>© {new Date().getFullYear()} Steev Thomas</p>
                <p>
                    Shot on Next.js · Visuals by Higgsfield · <span className="text-reel-sodium">Fin.</span>
                </p>
            </div>
        </footer>
    )
}
