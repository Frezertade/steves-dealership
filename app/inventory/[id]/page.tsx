import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Fuel, Gauge, MapPin, Phone, Settings } from 'lucide-react'
import { VEHICLES } from '@/lib/data'
import { BUSINESS } from '@/lib/business'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import VehicleLeadForm from '../../components/VehicleLeadForm'

type PageProps = {
  params: { id: string }
}

function getVehicle(id: string) {
  return VEHICLES.find((vehicle) => String(vehicle.id) === id)
}

export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({ id: String(vehicle.id) }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const vehicle = getVehicle(params.id)
  if (!vehicle) {
    return { title: `Vehicle not found | ${BUSINESS.name}` }
  }

  const label = `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  return {
    title: `${label} | ${BUSINESS.name}`,
    description: `${label} — $${vehicle.price.toLocaleString()}, ${vehicle.mileage.toLocaleString()} miles. On the lot at ${BUSINESS.addressLine}.`,
  }
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = getVehicle(params.id)
  if (!vehicle) notFound()

  const label = `${vehicle.year} ${vehicle.make} ${vehicle.model}`

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation solid />

      <div className="relative h-72 md:h-96 bg-slate-800">
        <img
          src={vehicle.image}
          alt={label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
        {vehicle.featured ? (
          <div className="absolute top-24 left-4 md:left-8 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        ) : null}
      </div>

      <div className="container-custom py-10 md:py-14">
        <Link
          href="/#inventory"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to inventory
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                {vehicle.year}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {vehicle.category}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {vehicle.condition}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-gray-600 mb-8">{vehicle.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-2xl font-bold text-primary-600">
                  ${vehicle.price.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Gauge className="w-4 h-4" />
                  Miles
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {vehicle.mileage.toLocaleString()} mi
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  Fuel
                </p>
                <p className="text-xl font-bold text-gray-900">{vehicle.fuel}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Settings className="w-4 h-4" />
                  Transmission
                </p>
                <p className="text-xl font-bold text-gray-900">{vehicle.transmission}</p>
              </div>
            </div>

            {vehicle.features?.length ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-4">Features</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {vehicle.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="mt-6 text-sm text-gray-500 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              On the lot at {BUSINESS.addressLine}. Hours: {BUSINESS.hoursSummary}.
            </p>
          </div>

          <aside className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
              <p className="text-3xl font-bold text-primary-600 mb-1">
                ${vehicle.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {vehicle.mileage.toLocaleString()} miles · {vehicle.condition}
              </p>

              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="w-full flex items-center justify-center gap-2 bg-accent-500 text-white py-4 rounded-xl hover:bg-accent-600 transition-colors font-semibold mb-6"
              >
                <Phone className="w-5 h-5" />
                Call {BUSINESS.phoneDisplay}
              </a>

              <h2 className="font-semibold text-gray-900 mb-4">Ask about this vehicle</h2>
              <VehicleLeadForm vehicleId={vehicle.id} vehicleLabel={label} />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  )
}
