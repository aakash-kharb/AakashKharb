import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Research from '@/components/sections/Research'
import { siteConfig } from '@/lib/siteConfig'
import Projects2 from '@/components/sections/Projects2'
import Contact from '@/components/sections/Contact'
import ZoomIntro from '@/components/effects/ZoomIntro'

export default function Home() {
  return (
    <ZoomIntro text="AAKASH">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects2 />
      {siteConfig.showResearch && <Research />}
      <Contact />
    </ZoomIntro>
  )
}
