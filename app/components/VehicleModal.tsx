'use client'

import { useEffect, useRef } from 'react'
import { Phone, Calendar, X, Heart, Fuel, Gauge, Settings, Check } from 'lucide-react'

export default function VehicleModal({ vehicle, onClose }) {
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Focus trap and escape key handling
  useEffect(() => {
    previousActiveElement.current = document.activeElement
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    const handleFocusTrap = (e) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleFocusTrap)
    document.body.style.overflow = 'hidden'
    
    // Focus first focusable element
    setTimeout(() => {
      const closeButton = modalRef.current?.querySelector('[data-autofocus]')
      closeButton?.focus()
    }, 100)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleFocusTrap)
      document.body.style.overflow = ''
      previousActiveElement.current?.focus()
    }
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Image Header */}
        <div className="relative h-72">
          <img
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <button
            data-autofocus
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          {vehicle.featured && (
            <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6">
          {/* Title */}
          <div className="flex items-center gap-3 mb-2">
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
          
          <h2 id="vehicle-title" className="text-3xl font-bold text-gray-900 mb-2">
            {vehicle.make} {vehicle.model}
          </h2>
          
          <p className="text-gray-600 mb-6">{vehicle.description}</p>
          
          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-2xl font-bold text-primary-600">${vehicle.price.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Mileage</p>
              <p className="text-xl font-bold text-gray-900">{vehicle.mileage.toLocaleString()} mi</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Fuel Type</p>
              <p className="text-xl font-bold text-gray-900">{vehicle.fuel}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Transmission</p>
              <p className="text-xl font-bold text-gray-900">{vehicle.transmission}</p>
            </div>
          </div>
          
          {/* Features */}
          {vehicle.features && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* CTA Buttons */}
          <div className="flex gap-3">
            <a
              href="tel:7173973497"
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href="#contact"
              onClick={() => onClose()}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 rounded-xl hover:bg-accent-600 transition-colors font-semibold"
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
