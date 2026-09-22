'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function scrollToHash() {
  const hash = window.location.hash
  if (!hash || hash.length < 2) return
  const id = decodeURIComponent(hash.slice(1))
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Re-apply in-page hashes after App Router hydration (e.g. /#financing). */
export default function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    scrollToHash()
    const t1 = window.setTimeout(scrollToHash, 100)
    const t2 = window.setTimeout(scrollToHash, 400)
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [pathname])

  return null
}
