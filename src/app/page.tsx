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
                <Contact />
            </div>
        </div>
    )
}
