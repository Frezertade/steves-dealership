import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS } from '@/lib/business'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.name}`,
  description: `How ${BUSINESS.name} handles sales leads, optional AI chat, and your information. We do not sell your data.`,
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation solid />

      <article className="container-custom pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <p className="text-sm font-medium text-primary-600 mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: August 26, 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              {BUSINESS.name} (“we”) is an independent used-car lot at {BUSINESS.addressLine}.
              This page explains what we collect when you use this website.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Sales leads</h2>
              <p className="mb-3">
                Contact and vehicle-interest forms ask for your name and phone number. Email and a
                message are optional. We use that information only to follow up on your inquiry —
                cars on the lot, test drives, financing questions, or a trade-in.
              </p>
              <p>
                Leads may be emailed to {BUSINESS.email} and stored so our sales team can reach you.
                We do not use lead forms for marketing lists sold to other businesses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Optional AI chat</h2>
              <p>
                This site may include a sales chat widget. Chat is optional. If you use it, your
                messages go to our server so we can answer questions about inventory, hours,
                financing, and test drives. If an OpenAI API key is configured, those messages may
                be sent to OpenAI to generate a reply; otherwise answers come from our own inventory
                and business information. Do not send Social Security numbers, full payment card
                numbers, or other sensitive personal data in chat.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Analytics</h2>
              <p>
                If a Google Analytics measurement ID is set, the site may collect standard usage
                data such as pages viewed. If it is not set, we do not load Google Analytics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">We do not sell your data</h2>
              <p>
                We do not sell, rent, or share your personal information with data brokers or
                advertisers. We share information only with service providers needed to run the site
                (for example email delivery, or OpenAI if chat is enabled that way) and when the law
                requires it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Your choices</h2>
              <p>
                Call{' '}
                <a href={`tel:${BUSINESS.phoneTel}`} className="text-primary-600 hover:text-primary-700">
                  {BUSINESS.phoneDisplay}
                </a>{' '}
                or email{' '}
                <a href={`mailto:${BUSINESS.email}`} className="text-primary-600 hover:text-primary-700">
                  {BUSINESS.email}
                </a>{' '}
                to ask what we have on file, to update it, or to ask us not to contact you. We keep
                lead information as long as needed for ordinary sales follow-up.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
              <p>
                {BUSINESS.name}
                <br />
                {BUSINESS.street}
                <br />
                {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                <br />
                {BUSINESS.phoneDisplay}
                <br />
                {BUSINESS.email}
              </p>
            </section>
          </div>

          <p className="mt-10 text-sm text-gray-500">
            See also our{' '}
            <Link href="/terms" className="text-primary-600 hover:text-primary-700">
              Terms of Use
            </Link>
            .
          </p>
        </div>
      </article>

      <Footer />
    </main>
  )
}
