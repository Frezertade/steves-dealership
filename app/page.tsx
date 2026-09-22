import Hero from './components/Hero'
import InventorySection from './components/InventorySection'
import FinancingCalculator from './components/FinancingCalculator'
import TradeInEstimator from './components/TradeInEstimator'
import VehicleComparison from './components/VehicleComparison'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import SchemaMarkup from './components/SchemaMarkup'
import Analytics from './components/Analytics'
import { CompareProvider } from './components/CompareProvider'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SchemaMarkup />
      <Analytics />
      <Navigation />
      <Hero />
      <CompareProvider>
        <InventorySection />
        <FinancingCalculator />
        <TradeInEstimator />
        <VehicleComparison />
      </CompareProvider>
      <AboutSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  )
}