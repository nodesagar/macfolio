import { lazy, Suspense } from 'react'
import { Navbar, Welcome, Dock, Home } from '#components'
import { Terminal, Safari, Finder, Text, Image, Contact, Photos } from '#windows/index.js';
import useWindowStore from '#store/window.js';

// Lazy + only rendered while open, so react-pdf/pdfjs download on first open, not page load.
const Resume = lazy(() => import('#windows/Resume.jsx'));

const App = () => {
  const resumeOpen = useWindowStore((s) => s.windows.resume.isOpen);

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      {resumeOpen && (
        <Suspense fallback={null}>
          <Resume />
        </Suspense>
      )}
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Home />
      <Photos />
    </main>
  )
}

export default App
