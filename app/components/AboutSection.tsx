import { MapPin, Clock, Phone, Car } from 'lucide-react'
import { BUSINESS } from '@/lib/business'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About {BUSINESS.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Independent used-car lot in {BUSINESS.city}, {BUSINESS.state} since {BUSINESS.foundedYear}.
              We sell cars — not luxury-franchise branding, and not a repair shop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">The lot</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {BUSINESS.shortName} has been an independent used-car dealership on Dillerville Road
                since {BUSINESS.foundedYear}. Come walk the lot, ask about financing, or schedule a
                test drive.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    {BUSINESS.street}
                    <br />
                    {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                    <br />
                    <a
                      href={BUSINESS.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Get directions
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <a
                    href={`tel:${BUSINESS.phoneTel}`}
                    className="text-gray-700 hover:text-primary-600"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Hours</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {BUSINESS.hours.map((row) => (
                  <li
                    key={row.days}
                    className="flex items-center justify-between py-3 text-gray-700"
                  >
                    <span>{row.days}</span>
                    <span className={row.opens ? 'font-medium' : 'text-gray-500'}>
                      {row.label}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={BUSINESS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Map to {BUSINESS.addressLine}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
