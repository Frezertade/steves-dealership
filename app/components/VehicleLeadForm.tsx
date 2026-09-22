'use client'

import { useState } from 'react'
import { User, Phone, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { BUSINESS } from '@/lib/business'

export default function VehicleLeadForm({
  vehicleLabel,
  vehicleId,
}: {
  vehicleLabel: string
  vehicleId: number
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `I'm interested in the ${vehicleLabel}. Can I schedule a test drive?`,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.phone.trim()) {
      setError('Please enter a phone number so we can reach you.')
      return
    }

    if (!formData.name.trim()) {
      setError('Please enter your name.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          vehicleId,
          vehicle: vehicleLabel,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(
          typeof data.error === 'string'
            ? data.error
            : `Could not send your request. Call ${BUSINESS.phoneDisplay}.`
        )
        return
      }

      setIsSubmitted(true)
    } catch {
      setError(`Could not send your request. Call ${BUSINESS.phoneDisplay}.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-green-800 mb-1">Thank you</h3>
        <p className="text-green-700 text-sm">
          We got your request about the {vehicleLabel}. We&apos;ll call you back.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4 inline mr-1" />
          Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            setError('')
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Phone className="w-4 h-4 inline mr-1" />
          Phone *
        </label>
        <input
          type="tel"
          required
          aria-invalid={error.toLowerCase().includes('phone')}
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value })
            setError('')
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="(717) 555-0123"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4 inline mr-1" />
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageSquare className="w-4 h-4 inline mr-1" />
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={4}
        />
      </div>

      {error ? (
        <p className="text-red-600 text-sm font-medium" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? 'Sending…' : 'Request info / test drive'}
      </button>
    </form>
  )
}
