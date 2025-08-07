'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const NavigationOptimizer = () => {
  const router = useRouter()

  useEffect(() => {
    // Prefetch critical routes on component mount
    const prefetchRoutes = [
      '/',
      '/projects',
      '/blogs',
      '/about'
    ]

    // Prefetch routes after a short delay to avoid blocking initial render
    const prefetchTimer = setTimeout(() => {
      prefetchRoutes.forEach(route => {
        router.prefetch(route)
      })
    }, 100)

    // Optimize navigation with hover prefetching
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target

      // Check if target is an Element and has the closest method
      if (target && target instanceof Element) {
        const link = target.closest('a[href^="/"]') as HTMLAnchorElement

        if (link && link.href) {
          try {
            const url = new URL(link.href)
            if (url.pathname !== window.location.pathname) {
              router.prefetch(url.pathname)
            }
          } catch (error) {
            // Ignore invalid URLs
            console.debug('Invalid URL for prefetch:', link.href)
          }
        }
      }
    }

    // Add hover listeners to navigation links
    document.addEventListener('mouseenter', handleMouseEnter, true)

    // Cleanup
    return () => {
      clearTimeout(prefetchTimer)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
    }
  }, [router])

  return null
}

export default NavigationOptimizer
