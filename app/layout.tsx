import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Steve's Dealership | Quality Used Cars in Lancaster, PA",
  description: "Steve's Dealership offers quality used cars, trucks, SUVs, and hybrids at competitive prices. Serving Lancaster, PA since 2007. Financing available!",
  keywords: 'used cars Lancaster PA, car dealership, buy used car, auto financing, trucks, SUVs, hybrids',
  openGraph: {
    title: "Steve's Dealership | Quality Used Cars in Lancaster, PA",
    description: 'Find your perfect vehicle at Steve\'s Dealership. Browse our inventory of quality used cars, trucks, and SUVs.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Steve's Dealership",
    description: 'Quality used cars in Lancaster, PA',
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