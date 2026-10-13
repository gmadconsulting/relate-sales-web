import { VideoProvider } from '@/components/VideoDialog'
import { Calculator } from '@/sections/Calculator'
import { Day } from '@/sections/Day'
import { Demo } from '@/sections/Demo'
import { Faq } from '@/sections/Faq'
import { Footer } from '@/sections/Footer'
import { ForWhom } from '@/sections/ForWhom'
import { Hero } from '@/sections/Hero'
import { Nav } from '@/sections/Nav'
import { Pillars } from '@/sections/Pillars'
import { Pricing } from '@/sections/Pricing'
import { Problem } from '@/sections/Problem'
import { Removed } from '@/sections/Removed'
import { Start } from '@/sections/Start'
import { Target } from '@/sections/Target'
import { Tour } from '@/sections/Tour'
import { Tried } from '@/sections/Tried'
import { Zeros } from '@/sections/Zeros'

export default function App() {
  return (
    <VideoProvider>
      <Nav />
      <main>
        <Hero />
        <Target />
        <Problem />
        <Tried />
        <Pillars />
        <Tour />
        <Day />
        <Removed />
        <Start />
        <Calculator />
        <ForWhom />
        <Zeros />
        <Pricing />
        <Faq />
        <Demo />
      </main>
      <Footer />
    </VideoProvider>
  )
}
