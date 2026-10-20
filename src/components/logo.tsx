import { cn } from "@/lib/utils"

/**
 * The ST film-slate monogram (same mark as the favicon) with the wordmark.
 * Drawn in SVG so it stays crisp and flips with the light/dark theme.
 */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
    return (
        <span className={cn("group inline-flex items-center gap-2 sm:gap-2.5", className)}>
            <svg viewBox="0 0 40 40" aria-hidden className="h-7 w-7 shrink-0 sm:h-8 sm:w-8">
                <rect x="1" y="1" width="38" height="38" rx="9" className="fill-reel-bone" />
                <text
                    x="19"
                    y="27.5"
                    textAnchor="middle"
                    className="fill-reel-ink"
                    style={{ fontFamily: "var(--font-display)", fontSize: 19, letterSpacing: "-0.04em" }}
                >
                    S<tspan fontStyle="italic">T</tspan>
                </text>
                <circle cx="32" cy="8" r="2.6" className="fill-reel-sodium transition-opacity duration-500 group-hover:animate-pulse" />
            </svg>
            {showWordmark && (
                <span className="flex flex-col leading-none">
                    <span className="whitespace-nowrap font-display text-[1.02rem] text-reel-bone sm:text-[1.2rem]">
                        Steev <span className="italic">Thomas</span>
                    </span>
                    <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.35em] text-reel-bone/50">
                        Full stack · Manchester
                    </span>
                </span>
            )}
            <span className="sr-only">Steev Thomas, home</span>
        </span>
    )
}
