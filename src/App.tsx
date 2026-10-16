import { useEffect } from 'react'
import { usePageEnter } from '@/lib/router'
import { Calculator } from '@/sections/Calculator'
import { Day } from '@/sections/Day'
import { Demo } from '@/sections/Demo'
import { Faq } from '@/sections/Faq'
import { ForWhom } from '@/sections/ForWhom'
import { Hero } from '@/sections/Hero'
import { Pillars } from '@/sections/Pillars'
import { Platform } from '@/sections/Platform'
import { Pricing } from '@/sections/Pricing'
import { Problem } from '@/sections/Problem'
import { Removed } from '@/sections/Removed'
import { Start } from '@/sections/Start'
import { Target } from '@/sections/Target'
import { Tour } from '@/sections/Tour'
import { Tried } from '@/sections/Tried'
import { Zeros } from '@/sections/Zeros'

export default function App() {
  usePageEnter()
  useEffect(() => {
    document.title =
      'RelateSales — Il gestionale commerciale per aziende industriali'
  }, [])

  return (
    <>
      <Hero />
      <Target />
      <Problem />
      <Tried />
      <Pillars />
      <Tour />
      <Platform />
      <Day />
      <Removed />
      <Start />
      <Calculator />
      <ForWhom />
      <Zeros />
      <Pricing />
      <Faq />
      <Demo />
    </>
  )
}
