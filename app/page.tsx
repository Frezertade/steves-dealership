import Hero from './components/Hero'
import InventorySection from './components/InventorySection'
import ContactSection from './components/ContactSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import SchemaMarkup from './components/SchemaMarkup'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SchemaMarkup />
      <Navigation />
      <Hero />
      <InventorySection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  )
}