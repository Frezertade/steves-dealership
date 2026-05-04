'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown, Phone, Calendar, Fuel, Gauge, Settings } from 'lucide-react'

const SAMPLE_VEHICLES = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 18900,
    mileage: 45000,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=600',
    featured: true,
    condition: 'Excellent',
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    price: 24500,
    mileage: 32000,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600',
    featured: true,
    condition: 'Like New',
  },
  {
    id: 3,
    make: 'Ford',
    model: 'F-150',
    year: 2019,
    price: 28900,
    mileage: 56000,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    category: 'Truck',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=600',
    featured: true,
    condition: 'Good',
  },
  {
    id: 4,
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 32900,
    mileage: 18000,
    fuel: 'Electric',
    transmission: 'Automatic',
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600',
    featured: false,
    condition: 'Like New',
  },
  {
    id: 5,
    make: 'BMW',
    model: 'X5',
    year: 2020,
    price: 42500,
    mileage: 38000,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1555215695-3004980adade?w=600',
    featured: false,
    condition: 'Excellent',
  },
  {
    id: 6,
    make: 'Chevrolet',
    model: 'Silverado',
    year: 2021,
    price: 31500,
    mileage: 41000,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    category: 'Truck',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600',
    featured: false,
    condition: 'Excellent',
  },
  {
    id: 7,
    make: 'Toyota',
    model: 'Prius',
    year: 2021,
    price: 21500,
    mileage: 29000,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    category: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600',
    featured: false,
    condition: 'Like New',
  },
  {
    id: 8,
    make: 'Jeep',
    model: 'Wrangler',
    year: 2020,
    price: 27500,
    mileage: 42000,
    fuel: 'Gasoline',
    transmission: 'Manual',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600',
    featured: false,
    condition: 'Good',
  },
]

const CATEGORIES = ['All', 'Sedan', 'SUV', 'Truck', 'Electric', 'Hybrid', 'Luxury SUV']

export default function InventorySection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const filteredVehicles = SAMPLE_VEHICLES.filter(vehicle => {
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
                <option value="all">All Prices</option>
                <option value="under20">Under $20K</option>
                <option value="20to30">$20K - $30K</option>
                <option value="over30">Over $30K</option>
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
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedVehicle.image}
                alt={`${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedVehicle.year}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {selectedVehicle.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedVehicle.make} {selectedVehicle.model}
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-bold text-primary-600">${selectedVehicle.price.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="text-xl font-bold text-gray-900">{selectedVehicle.mileage.toLocaleString()} mi</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="text-xl font-bold text-gray-900">{selectedVehicle.fuel}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="text-xl font-bold text-gray-900">{selectedVehicle.transmission}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <a
                  href="tel:7173973497"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="#contact"
                  onClick={() => setSelectedVehicle(null)}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-3 rounded-xl hover:bg-accent-600 transition-colors font-semibold"
                >
                  <Calendar className="w-5 h-5" />
                  Test Drive
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
