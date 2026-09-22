'use client'

import { useState } from 'react'
import { Calculator, DollarSign } from 'lucide-react'
import { BUSINESS } from '@/lib/business'

const CREDIT_SCORE_RATES = {
  excellent: { rate: 4.99, label: 'Excellent (750+)' },
  good: { rate: 6.99, label: 'Good (700-749)' },
  fair: { rate: 9.99, label: 'Fair (650-699)' },
  poor: { rate: 14.99, label: 'Poor (600-649)' },
} as const

type CreditScore = keyof typeof CREDIT_SCORE_RATES

function monthlyPaymentAmount(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) return principal / months
  const factor = Math.pow(1 + monthlyRate, months)
  return (principal * monthlyRate * factor) / (factor - 1)
}

export default function FinancingCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(14900)
  const [downPayment, setDownPayment] = useState(2000)
  const [tradeInValue, setTradeInValue] = useState(0)
  const [interestRate, setInterestRate] = useState<number>(CREDIT_SCORE_RATES.good.rate)
  const [loanTerm, setLoanTerm] = useState(60)
  const [creditScore, setCreditScore] = useState<CreditScore>('good')

  const loanAmount = Math.max(0, vehiclePrice - downPayment - tradeInValue)
  const monthlyPayment = monthlyPaymentAmount(loanAmount, interestRate, loanTerm)
  const totalCost = monthlyPayment * loanTerm
  const totalInterest = Math.max(0, totalCost - loanAmount)

  return (
    <section id="financing" className="section-padding bg-white scroll-mt-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calculator className="w-4 h-4" />
              Financing Calculator
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Estimate Your Monthly Payment
            </h2>
            <p className="text-gray-600">
              Rough payment estimate for cars on this lot. Not a credit decision — call {BUSINESS.phoneDisplay} to go over options.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    min={0}
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    min={0}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trade-In Value
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    min={0}
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(Number(e.target.value) || 0)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Score
                </label>
                <select
                  value={creditScore}
                  onChange={(e) => {
                    const next = e.target.value as CreditScore
                    setCreditScore(next)
                    setInterestRate(CREDIT_SCORE_RATES[next].rate)
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                >
                  {Object.entries(CREDIT_SCORE_RATES).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term
                </label>
                <div className="flex gap-2">
                  {[36, 48, 60, 72, 84].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setLoanTerm(term)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        loanTerm === term
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {term / 12}yr
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary-600 text-white rounded-2xl p-6 flex flex-col justify-center">
              <div className="text-center mb-8">
                <p className="text-primary-100 text-sm mb-2">Estimated Monthly Payment</p>
                <p className="text-5xl font-bold">
                  ${Math.round(monthlyPayment).toLocaleString()}
                </p>
                <p className="text-primary-100 text-sm mt-1">per month</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-primary-100">Vehicle Price</span>
                  <span className="font-semibold">${vehiclePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-primary-100">Down Payment</span>
                  <span className="font-semibold">-${downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-primary-100">Trade-In Value</span>
                  <span className="font-semibold">-${tradeInValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-primary-100">Loan Amount</span>
                  <span className="font-semibold">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span className="text-primary-100">Total Interest</span>
                  <span className="font-semibold">${Math.round(totalInterest).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-primary-100">Total Cost</span>
                  <span className="font-bold text-lg">${Math.round(totalCost).toLocaleString()}</span>
                </div>
              </div>

              <a
                href="#contact"
                className="mt-6 block w-full bg-white text-primary-600 text-center py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
              >
                Talk to a salesperson
              </a>
              <p className="text-primary-100 text-xs text-center mt-3">
                Estimate only. Rates and approval depend on credit and lender.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
