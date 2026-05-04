'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, Star, Heart, Share2, Phone, Calendar, Fuel, Gauge, Settings, Check } from 'lucide-react'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel: string
  transmission: string
  category: string
  image: string
  featured: boolean
  condition: string
  description?: string
  features?: string[]
}

interface VehicleModalProps {
  vehicle: Vehicle | null
  isOpen: boolean
  onClose: () => void
  onCompare?: (vehicle: Vehicle) => void
  isCompared?: boolean
}

export default function VehicleModal({ vehicle, isOpen, onClose, onCompare, isCompared }: VehicleModalProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (isOpen && vehicle) {
      const modal = document.getElementById('vehicle-modal')
      const focusableElements = modal?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus()
      }
    }
  }, [isOpen, vehicle])

  if (!isOpen || !vehicle) return null

  const monthlyPayment = Math.round((vehicle.price * 0.85) / 60) // Simple estimate

  const shareVehicle = (platform: string) => {
    const url = window.location.href
    const text = `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model} at Steve's Dealership!`
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        break
    }
    setShowShareMenu(false)
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-modal-title"
      id="vehicle-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header Image */}
        <div className="relative h-72 md:h-80">
          <img
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-gray-700"
                aria-label="Share vehicle"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {showShareMenu && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg p-2 min-w-[160px] z-10">
                  {[
                    { label: 'Facebook', action: 'facebook' },
                    { label: 'Twitter', action: 'twitter' },
                    { label: 'Email', action: 'email' },
                    { label: 'Copy Link', action: 'copy' },
                  ].map((option) => (
                    <button
                      key={option.action}
                      onClick={() => shareVehicle(option.action)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-sm"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-gray-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                {vehicle.year}
              </span>
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {vehicle.category}
              </span>
              {vehicle.featured && (
                <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              )}
            </div>
            <h2 id="vehicle-modal-title" className="text-2xl md:text-3xl font-bold text-white">
              {vehicle.make} {vehicle.model}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
            {['overview', 'features', 'financing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Price & CTA */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-primary-600">${vehicle.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">${monthlyPayment}/mo estimated</p>
                </div>
                <div className="flex gap-3">
                  {onCompare && (
                    <button
                      onClick={() => onCompare(vehicle)}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
                        isCompared
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isCompared ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-4 h-4" /> Added
                        </span>
                      ) : (
                        'Compare'
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Gauge className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-semibold">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Fuel className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-sm text-gray-500">Fuel</p>
                  <p className="font-semibold">{vehicle.fuel}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Settings className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold">{vehicle.transmission}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Star className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-semibold">{vehicle.condition}</p>
                </div>
              </div>

              {/* Description */}
              {vehicle.description && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-600">{vehicle.description}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Features & Options</h3>
              {vehicle.features && vehicle.features.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Feature list coming soon.</p>
              )}
            </div>
          )}

          {activeTab === 'financing' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Financing Estimate</h3>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Price</p>
                    <p className="font-semibold">${vehicle.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Down Payment (15%)</p>
                    <p className="font-semibold">${Math.round(vehicle.price * 0.15).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="font-semibold">${Math.round(vehicle.price * 0.85).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Est. Monthly Payment</p>
                    <p className="font-semibold text-primary-600">${monthlyPayment}/mo</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  *Based on 60-month term at 6.99% APR. Actual rates may vary.
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  Get Pre-Approved
                </a>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <a
              href="tel:7173973497"
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-3 rounded-xl hover:bg-accent-600 transition-colors font-semibold"
            >
              <Calendar className="w-5 h-5" />
              Schedule Test Drive
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
