import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import AIWorkflow from '@/components/AIWorkflow'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <AIWorkflow />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  )
}
