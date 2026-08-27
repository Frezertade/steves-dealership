'use client'

import { Car, Plus, X } from 'lucide-react'
import { VEHICLES, type Vehicle } from '@/lib/data'
import { useCompare } from './CompareProvider'

const COMPARE_FEATURES: {
  label: string
  key: keyof Vehicle
  format?: (value: number) => string
}[] = [
  { label: 'Price', key: 'price', format: (v) => `$${v.toLocaleString()}` },
  { label: 'Year', key: 'year' },
  { label: 'Mileage', key: 'mileage', format: (v) => `${v.toLocaleString()} mi` },
  { label: 'Fuel Type', key: 'fuel' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Condition', key: 'condition' },
]

function cellValue(vehicle: Vehicle, feature: (typeof COMPARE_FEATURES)[number]) {
  const raw = vehicle[feature.key]
  if (feature.format && typeof raw === 'number') return feature.format(raw)
  if (typeof raw === 'string' || typeof raw === 'number' || typeof raw === 'boolean') {
    return String(raw)
  }
  return '—'
}

export default function VehicleComparison() {
  const { selected, isOpen, setIsOpen, toggle, clear, isSelected, max } = useCompare()
  const remaining = VEHICLES.filter((vehicle) => !isSelected(vehicle.id))

  return (
    <>
      {selected.length === 0 ? (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-accent-500 text-white px-4 py-3 rounded-xl shadow-lg hover:bg-accent-600 transition-colors flex items-center gap-2"
            aria-label="Open vehicle compare tray"
          >
            <Car className="w-5 h-5" />
            Compare (0/{max})
          </button>
        </div>
      ) : (
        <div
          id="compare-tray"
          className="fixed bottom-4 left-4 right-24 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3"
          role="region"
          aria-label="Vehicle compare tray"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-2 flex-1 overflow-x-auto min-w-0">
              {selected.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center gap-2 shrink-0 bg-gray-50 rounded-xl pl-1 pr-2 py-1 border border-gray-100"
                >
                  <img
                    src={vehicle.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="pr-1">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-gray-500">${vehicle.price.toLocaleString()}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(vehicle)}
                    className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                    aria-label={`Remove ${vehicle.make} ${vehicle.model} from compare`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {selected.length < max ? (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="shrink-0 px-3 py-2 rounded-xl border-2 border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:border-primary-500 hover:text-primary-600 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              ) : null}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={clear}
                className="text-sm text-gray-500 hover:text-red-600 font-medium px-2"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-accent-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-accent-600 transition-colors"
              >
                Compare ({selected.length}/{max})
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="compare-title"
        >
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 id="compare-title" className="text-2xl font-bold">
                  Compare Vehicles
                </h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                  aria-label="Close compare"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selected.length >= 2 ? (
                <div className="overflow-x-auto mb-8">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-4">Feature</th>
                        {selected.map((vehicle) => (
                          <th key={vehicle.id} className="p-4 text-center min-w-[200px]">
                            <img
                              src={vehicle.image}
                              alt={`${vehicle.make} ${vehicle.model}`}
                              className="w-full h-32 object-cover rounded-lg mb-2"
                            />
                            <p className="font-bold">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </p>
                            <button
                              type="button"
                              onClick={() => toggle(vehicle)}
                              className="text-red-500 text-sm mt-1"
                            >
                              Remove
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE_FEATURES.map((feature) => (
                        <tr key={feature.key} className="border-t">
                          <td className="p-4 font-medium">{feature.label}</td>
                          {selected.map((vehicle) => (
                            <td key={vehicle.id} className="p-4 text-center">
                              {cellValue(vehicle, feature)}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="border-t">
                        <td className="p-4 font-medium">Actions</td>
                        {selected.map((vehicle) => (
                          <td key={vehicle.id} className="p-4">
                            <a
                              href={`/inventory/${vehicle.id}`}
                              onClick={() => setIsOpen(false)}
                              className="block w-full bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors"
                            >
                              View listing
                            </a>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 mb-4">
                  Select up to {max} vehicles to compare. Pick at least two for a side-by-side table.
                </p>
              )}

              {selected.length < max ? (
                <div>
                  <p className="font-semibold text-gray-900 mb-3">
                    {selected.length === 0 ? `Select up to ${max} vehicles` : 'Add another vehicle'}
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {remaining.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        type="button"
                        onClick={() => toggle(vehicle)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-colors text-left"
                      >
                        <img
                          src={vehicle.image}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <p className="font-semibold">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </p>
                        <p className="text-sm text-gray-500">${vehicle.price.toLocaleString()}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {selected.length > 0 ? (
                <button
                  type="button"
                  onClick={clear}
                  className="mt-6 text-red-500 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
