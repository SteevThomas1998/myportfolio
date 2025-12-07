import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Skills />
      <Contact />
    </div>
  )
}
