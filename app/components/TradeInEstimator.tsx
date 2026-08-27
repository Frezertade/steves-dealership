'use client'

import { useState } from 'react'
import { Car, Gauge } from 'lucide-react'

const BASE_VALUES = {
  Toyota: { Camry: 18000, RAV4: 20000, Highlander: 25000 },
  Honda: { Accord: 17000, 'CR-V': 19000, Civic: 15000 },
  Ford: { 'F-150': 22000, Escape: 16000, Explorer: 21000 },
  Chevrolet: { Silverado: 21000, Equinox: 15000, Malibu: 14000 },
} as const

const CONDITION_MULTIPLIERS = {
  excellent: 1.1,
  good: 1.0,
  fair: 0.85,
  poor: 0.7,
} as const

type Make = keyof typeof BASE_VALUES
type Condition = keyof typeof CONDITION_MULTIPLIERS

export default function TradeInEstimator() {
  const [year, setYear] = useState(2018)
  const [make, setMake] = useState<Make>('Toyota')
  const [model, setModel] = useState('Camry')
  const [mileage, setMileage] = useState(60000)
  const [condition, setCondition] = useState<Condition>('good')
  const [showEstimate, setShowEstimate] = useState(false)

  const modelsForMake = Object.keys(BASE_VALUES[make]) as string[]

  const calculateEstimate = () => {
    const models = BASE_VALUES[make] as Record<string, number>
    const baseValue = models[model] ?? 15000
    const age = new Date().getFullYear() - year
    const mileageAdjustment = Math.max(0.5, 1 - (mileage / 200000))
    const ageAdjustment = Math.max(0.3, 1 - (age * 0.05))
    return Math.round(baseValue * mileageAdjustment * ageAdjustment * CONDITION_MULTIPLIERS[condition])
  }

  const estimate = calculateEstimate()

  return (
    <section id="trade-in" className="section-padding bg-gray-50 scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Car className="w-4 h-4" />
              Trade-In Value
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Your Car Worth?
            </h2>
            <p className="text-gray-600">
              Get an instant estimate for your trade-in. Bring it in for a final appraisal.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                >
                  {[...Array(20)].map((_, i) => {
                    const y = new Date().getFullYear() - i
                    return <option key={y} value={y}>{y}</option>
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Make
                </label>
                <select
                  value={make}
                  onChange={(e) => {
                    const nextMake = e.target.value as Make
                    setMake(nextMake)
                    const nextModels = Object.keys(BASE_VALUES[nextMake])
                    setModel(nextModels[0] || '')
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                >
                  {(Object.keys(BASE_VALUES) as Make[]).map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                >
                  {modelsForMake.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage
                </label>
                <div className="relative">
                  <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'excellent', label: 'Excellent', desc: 'Like new' },
                  { value: 'good', label: 'Good', desc: 'Minor wear' },
                  { value: 'fair', label: 'Fair', desc: 'Some issues' },
                  { value: 'poor', label: 'Poor', desc: 'Needs work' },
                ].map((cond) => (
                  <button
                    key={cond.value}
                    type="button"
                    onClick={() => setCondition(cond.value as Condition)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      condition === cond.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`font-semibold ${condition === cond.value ? 'text-primary-700' : 'text-gray-900'}`}>
                      {cond.label}
                    </div>
                    <div className="text-xs text-gray-500">{cond.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowEstimate(true)}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Estimate
            </button>

            {showEstimate && (
              <div className="mt-8 p-6 bg-primary-50 rounded-xl">
                <div className="text-center mb-6">
                  <p className="text-sm text-primary-600 font-semibold mb-2">Estimated Trade-In Value</p>
                  <p className="text-4xl font-bold text-primary-700">${estimate.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    This is an estimate. Final value determined after inspection.
                  </p>
                </div>

                <div className="flex gap-3">
                  <a
                    href="#contact"
                    className="flex-1 bg-primary-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Schedule Appraisal
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowEstimate(false)}
                    className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
