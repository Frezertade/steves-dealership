'use client'

import { useState } from 'react'
import { Search, ChevronRight, Shield, DollarSign, Clock, Award } from 'lucide-react'
import { BUSINESS } from '@/lib/business'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920')] bg-cover bg-center" />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Award className="w-4 h-4 text-accent-400" />
            <span className="text-white/90 text-sm font-medium">
              Independent used cars in {BUSINESS.city} since {BUSINESS.foundedYear}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-gradient">Dream Car Today</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Quality used cars, trucks, and SUVs at unbeatable prices. 
            All vehicles inspected, certified, and ready to drive home.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-2xl flex gap-2">
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search by make, model, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 outline-none text-gray-700"
                />
              </div>
              <a
                href="#inventory"
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all flex items-center gap-2"
              >
                Search
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: DollarSign, label: 'Starting At', value: '$12,900' },
              { icon: Shield, label: 'Warranty', value: '90 Days' },
              { icon: Clock, label: 'Quick Approval', value: '24 Hours' },
              { icon: Award, label: 'Happy Customers', value: '2,500+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <stat.icon className="w-6 h-6 text-accent-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
      </div>
    </section>
  )
}
