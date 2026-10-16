import { AnimatePresence, motion } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VideoProvider } from './components/VideoDialog.tsx'
import { featureBySlug } from './lib/features.ts'
import { EASE } from './lib/motion.tsx'
import { RouterProvider, useRouter } from './lib/router.tsx'
import { FeaturePage } from './pages/Feature.tsx'
import { NotFoundPage } from './pages/NotFound.tsx'
import { PrivacyPage } from './pages/Privacy.tsx'
import { Footer } from './sections/Footer.tsx'
import { Nav } from './sections/Nav.tsx'

function resolve(path: string) {
  if (path === '/') return <App />
  if (path === '/privacy') return <PrivacyPage />
  const m = path.match(/^\/prodotto\/([^/]+)$/)
  const f = m && featureBySlug(m[1])
  if (f) return <FeaturePage key={f.slug} f={f} />
  return <NotFoundPage />
}

/** Navbar fissa e pagine che si alternano con una dissolvenza breve. */
function Root() {
  const { path } = useRouter()
  return (
    <VideoProvider>
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <main>{resolve(path)}</main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </VideoProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <Root />
    </RouterProvider>
  </StrictMode>,
)
