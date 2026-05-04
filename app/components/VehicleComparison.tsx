'use client'

import { useState } from 'react'
import { Car, ArrowRight, ArrowLeft, Check, X } from 'lucide-react'
import { VEHICLES } from '../../lib/data'

export default function VehicleComparison() {
  const [selectedVehicles, setSelectedVehicles] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleVehicle = (vehicle) => {
    if (selectedVehicles.find(v => v.id === vehicle.id)) {
      setSelectedVehicles(prev => prev.filter(v => v.id !== vehicle.id))
    } else if (selectedVehicles.length < 3) {
      setSelectedVehicles(prev => [...prev, vehicle])
    }
  }

  const compareFeatures = [
    { label: 'Price', key: 'price', format: (v) => `$${v.toLocaleString()}` },
    { label: 'Year', key: 'year' },
    { label: 'Mileage', key: 'mileage', format: (v) => `${v.toLocaleString()} mi` },
    { label: 'Fuel Type', key: 'fuel' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Condition', key: 'condition' },
  ]

  return (
    <>
      {/* Comparison Toggle */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-accent-500 text-white px-4 py-3 rounded-xl shadow-lg hover:bg-accent-600 transition-colors flex items-center gap-2"
        >
          <Car className="w-5 h-5" />
          Compare ({selectedVehicles.length}/3)
        </button>
      </div>

      {/* Comparison Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Compare Vehicles</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedVehicles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Select up to 3 vehicles to compare</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {VEHICLES.slice(0, 6).map(vehicle => (
                      <button
                        key={vehicle.id}
                        onClick={() => toggleVehicle(vehicle)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-colors text-left"
                      >
                        <img
                          src={vehicle.image}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <p className="font-semibold">{vehicle.make} {vehicle.model}</p>
                        <p className="text-sm text-gray-500">${vehicle.price.toLocaleString()}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-4">Feature</th>
                          {selectedVehicles.map(vehicle => (
                            <th key={vehicle.id} className="p-4 text-center min-w-[200px]">
                              <img
                                src={vehicle.image}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                className="w-full h-32 object-cover rounded-lg mb-2"
                              />
                              <p className="font-bold">{vehicle.make} {vehicle.model}</p>
                              <button
                                onClick={() => toggleVehicle(vehicle)}
                                className="text-red-500 text-sm mt-1"
                              >
                                Remove
                              </button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {compareFeatures.map(feature => (
                          <tr key={feature.key} className="border-t">
                            <td className="p-4 font-medium">{feature.label}</td>
                            {selectedVehicles.map(vehicle => (
                              <td key={vehicle.id} className="p-4 text-center">
                                {feature.format 
                                  ? feature.format(vehicle[feature.key])
                                  : vehicle[feature.key]
                                }
                              </td>
                            ))}
                          </tr>
                        ))}
                        <tr className="border-t">
                          <td className="p-4 font-medium">Actions</td>
                          {selectedVehicles.map(vehicle => (
                            <td key={vehicle.id} className="p-4">
                              <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors"
                              >
                                Inquire
                              </a>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <button
                    onClick={() => setSelectedVehicles([])}
                    className="mt-6 text-red-500 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
