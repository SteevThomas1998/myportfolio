import { OpeningTitle } from "@/components/cinema/opening-title"
import { DeskSequence } from "@/components/cinema/desk-sequence"
import { CaseReels } from "@/components/cinema/case-reels"
import { CreditsRoll } from "@/components/cinema/credits-roll"
import { Contact } from "@/components/contact"

export default function Home() {
    return (
        <div className="-mt-14 overflow-x-clip">
            <OpeningTitle />
            <DeskSequence />
            <CaseReels />
            <CreditsRoll />
            <div id="contact" className="pb-12">
                <div className="flex flex-col items-center px-4 pt-16 text-center">
                    <p className="font-display text-[clamp(4rem,14vw,12rem)] italic leading-none text-reel-bone">Fin.</p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-reel-sodium sm:text-xs">
                        Or the opening scene of yours
                    </p>
                </div>
                <Contact hideHeader />
            </div>
        </div>
    )
}
