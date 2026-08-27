'use client'

import { Wrench, Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'
import { BUSINESS } from '@/lib/business'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Steve's</div>
                <div className="text-xs text-gray-400">Dealership</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Independent used-car lot. Quality cars, trucks, and SUVs at competitive prices.
              Serving {BUSINESS.city}, {BUSINESS.state} since {BUSINESS.foundedYear}.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Inventory', href: '/#inventory' },
                { label: 'Financing', href: '/#financing' },
                { label: 'About', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Vehicle Types</h3>
            <ul className="space-y-2">
              {['Sedans', 'SUVs', 'Trucks', 'Electric', 'Hybrid', 'Luxury'].map((type) => (
                <li key={type}>
                  <a href="/#inventory" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <a
                  href={BUSINESS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {BUSINESS.street}<br />
                  {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{BUSINESS.hoursSummary}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href={`tel:${BUSINESS.phoneTel}`} className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Steve's Dealership. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built by <a href="https://aetherisinnovations.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">Aetheris Innovations</a> — AI-Powered Business Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
