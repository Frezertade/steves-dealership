'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown, Phone, Calendar, Fuel, Gauge, Settings } from 'lucide-react'
import { VEHICLES, CATEGORIES, PRICE_RANGES } from '../../lib/data'
import VehicleModal from './VehicleModal'

export default function InventorySection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const filteredVehicles = VEHICLES.filter(vehicle => {
    const matchesCategory = selectedCategory === 'All' || vehicle.category === selectedCategory
    const matchesSearch = vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'under20' && vehicle.price < 20000) ||
      (priceRange === '20to30' && vehicle.price >= 20000 && vehicle.price < 30000) ||
      (priceRange === 'over30' && vehicle.price >= 30000)
    
    return matchesCategory && matchesSearch && matchesPrice
  })

  return (
    <section id="inventory" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Inventory
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of quality used vehicles. All cars inspected and ready for the road.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by make or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
              >
                {PRICE_RANGES.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                {vehicle.featured && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                  {vehicle.condition}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-primary-600 font-semibold">{vehicle.year}</span>
                  <span className="text-sm text-gray-400">{vehicle.category}</span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {vehicle.make} {vehicle.model}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Gauge className="w-4 h-4" />
                    {vehicle.mileage.toLocaleString()} mi
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    {vehicle.fuel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      ${vehicle.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
                setPriceRange('all')
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Vehicle Detail Modal */}
      <VehicleModal
        vehicle={selectedVehicle}
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </section>
  )
}
