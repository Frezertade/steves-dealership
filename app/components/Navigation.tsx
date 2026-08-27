'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Car } from 'lucide-react'
import { BUSINESS } from '@/lib/business'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Inventory', href: '#inventory' },
  { label: 'Financing', href: '#financing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isScrolled ? 'bg-primary-600' : 'bg-white'
              }`}>
                <Car className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-primary-600'}`} />
              </div>
              <div>
                <span className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  Steve's
                </span>
                <span className={`block text-xs -mt-1 ${isScrolled ? 'text-primary-600' : 'text-white/80'}`}>
                  Dealership
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'text-gray-700 hover:text-primary-600'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isScrolled
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-primary-600 hover:bg-white/90'
                }`}
              >
                <Phone className="w-4 h-4" />
                {BUSINESS.phoneDisplay}
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-900 py-3 border-b border-gray-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-semibold mt-4"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
