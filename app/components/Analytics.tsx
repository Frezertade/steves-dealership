'use client'

import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    script.async = true
    ;(document.head as any).appendChild(script)

    (window as any).dataLayer = (window as any).dataLayer || []
    const gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', 'GA_MEASUREMENT_ID')

    return () => {
      try {
        document.head.removeChild(script)
      } catch (e) {
        // Script might already be removed
      }
    }
  }, [])

  return null
}
