import Hero from './components/Hero'
import InventorySection from './components/InventorySection'
import FinancingCalculator from './components/FinancingCalculator'
import TradeInEstimator from './components/TradeInEstimator'
import VehicleComparison from './components/VehicleComparison'
import ContactSection from './components/ContactSection'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import SchemaMarkup from './components/SchemaMarkup'
import Analytics from './components/Analytics'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SchemaMarkup />
      <Analytics />
      <Navigation />
      <Hero />
      <InventorySection />
      <FinancingCalculator />
      <TradeInEstimator />
      <VehicleComparison />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  )
}