import { flushSync } from "react-dom"

type Theme = "light" | "dark"

// Hero plates for each time of day, warmed up before the cut so the new scene
// isn't captured half-loaded.
const PLATES: Record<Theme, string[]> = {
    light: ["/cinema/dawn/hero-plate.webp", "/cinema/dawn/layer-sky.webp", "/cinema/dawn/layer-skyline.webp", "/cinema/dawn/layer-roof.webp"],
    dark: ["/cinema/hero-plate.webp", "/cinema/layer-sky.webp", "/cinema/layer-skyline.webp", "/cinema/layer-roof.webp"],
}

function preload(theme: Theme, timeout = 350) {
    const loads = PLATES[theme].map(
        (src) =>
            new Promise<void>((resolve) => {
                const img = new Image()
                img.onload = img.onerror = () => resolve()
                img.src = src
            })
    )
    return Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, timeout))])
}

/**
 * Cut between daybreak and dusk with an iris: the new scene opens from a
 * soft-edged circle centred on `origin` (the toggle) until it fills the frame.
 * Falls back to a plain switch without View Transitions or with reduced motion.
 */
export async function switchTheme(next: Theme, setTheme: (theme: string) => void, origin?: { x: number; y: number }) {
    const root = document.documentElement
    const current: Theme = root.classList.contains("dark") ? "dark" : "light"
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // A hidden tab renders no frames, so a view transition there would stall.
    if (next === current || reduce || !document.startViewTransition || document.visibilityState !== "visible") {
        setTheme(next)
        return
    }

    await preload(next)

    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    root.style.setProperty("--iris-x", `${x}px`)
    root.style.setProperty("--iris-y", `${y}px`)
    root.style.setProperty("--iris-r", `${radius}px`)
    root.dataset.themeCut = next === "dark" ? "dusk" : "daybreak"

    const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next))
        // next-themes applies the class in an effect; apply it now so the new
        // snapshot is the finished scene rather than mid colour-tween.
        root.classList.toggle("dark", next === "dark")
        root.classList.toggle("light", next === "light")
        root.style.colorScheme = next
    })

    // A rapid second toggle skips this cut; the theme still lands, so ignore it.
    transition.ready.catch(() => {})
    transition.finished.finally(() => {
        delete root.dataset.themeCut
    })
}

export function toggleOrigin(el: Element) {
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}
