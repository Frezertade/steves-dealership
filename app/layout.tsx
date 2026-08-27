import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BUSINESS } from '@/lib/business'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const title = `${BUSINESS.name} | Used Cars in Lancaster, PA`
const description = `Independent used-car lot at ${BUSINESS.addressLine}. Quality used cars, trucks, SUVs, and hybrids since ${BUSINESS.foundedYear}. Call ${BUSINESS.phoneDisplay}.`

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title,
  description,
  keywords: 'used cars Lancaster PA, car dealership, buy used car, auto financing, trucks, SUVs, hybrids',
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    siteName: BUSINESS.name,
    url: BUSINESS.siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: BUSINESS.name,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}