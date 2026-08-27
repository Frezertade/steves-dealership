import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS } from '@/lib/business'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: `Terms of Use | ${BUSINESS.name}`,
  description: `Terms for using the ${BUSINESS.name} website: inventory listings, estimates, leads, and optional AI chat.`,
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation solid />

      <article className="container-custom pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <p className="text-sm font-medium text-primary-600 mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Terms of Use</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: August 26, 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              These terms apply to the {BUSINESS.name} website. We are an independent used-car lot
              at {BUSINESS.addressLine}. Phone {BUSINESS.phoneDisplay}. Email {BUSINESS.email}.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Inventory</h2>
              <p>
                Vehicle listings, photos, prices, and mileage are for information. Cars sell, and
                details can change. A listing is not a guarantee that a vehicle is still on the lot
                or that the price is final. Confirm availability, condition, and price with us
                before you visit or make a decision.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Estimates, not contracts</h2>
              <p>
                The financing calculator and trade-in estimator on this site are estimates only.
                They are not credit approval, an appraisal, or an offer to buy or sell. Actual
                payments, rates, and trade values depend on lender review, vehicle inspection, and a
                written agreement at the lot.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Leads and contact</h2>
              <p>
                When you submit a lead form, you ask us to contact you about vehicles, financing, or
                a test drive. We may call, text, or email using the information you provide. See our{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>{' '}
                for how we handle that information. We do not sell your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Optional AI chat</h2>
              <p>
                The chat widget, if shown, is optional sales help. It can be wrong. It is not a
                substitute for talking to a person on the lot, and it is not legal, tax, or lending
                advice. Never treat a chat reply as a VIN, a contract, or a price lock.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Site use</h2>
              <p>
                Use this website to shop our inventory and reach the lot. Do not misuse it — for
                example by trying to disrupt the site or submitting false contact information.
                Vehicle sales are governed by the paperwork you sign at the dealership, not by this
                website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
              <p>
                Questions about these terms:{' '}
                <a href={`tel:${BUSINESS.phoneTel}`} className="text-primary-600 hover:text-primary-700">
                  {BUSINESS.phoneDisplay}
                </a>{' '}
                or{' '}
                <a href={`mailto:${BUSINESS.email}`} className="text-primary-600 hover:text-primary-700">
                  {BUSINESS.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
