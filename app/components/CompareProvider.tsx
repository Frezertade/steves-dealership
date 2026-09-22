'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { VEHICLES, type Vehicle } from '@/lib/data'

const MAX_COMPARE = 3

type CompareContextValue = {
  selected: Vehicle[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: (vehicle: Vehicle) => void
  clear: () => void
  isSelected: (id: number) => boolean
  max: number
}

const CompareContext = createContext<CompareContextValue | null>(null)

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const selected = useMemo(
    () =>
      ids
        .map((id) => VEHICLES.find((vehicle) => vehicle.id === id))
        .filter((vehicle): vehicle is Vehicle => Boolean(vehicle)),
    [ids]
  )

  const isSelected = useCallback((id: number) => ids.includes(id), [ids])

  const toggle = useCallback((vehicle: Vehicle) => {
    setIds((prev) => {
      if (prev.includes(vehicle.id)) {
        return prev.filter((id) => id !== vehicle.id)
      }
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, vehicle.id]
    })
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({
      selected,
      isOpen,
      setIsOpen,
      toggle,
      clear,
      isSelected,
      max: MAX_COMPARE,
    }),
    [selected, isOpen, toggle, clear, isSelected]
  )

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) {
    throw new Error('useCompare must be used within CompareProvider')
  }
  return ctx
}
