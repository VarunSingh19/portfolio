'use client'

import { useEffect } from 'react'

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = '/fonts/inter.woff2'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)

      // Preload critical images
      const criticalImages = [
        '/avatar.jpg',
        '/hero-bg.webp'
      ]

      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = src
        link.as = 'image'
        document.head.appendChild(link)
      })
    }

    // Optimize images with Intersection Observer
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]')
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.src!
              img.classList.remove('lazy')
              imageObserver.unobserve(img)
            }
          })
        })

        images.forEach(img => imageObserver.observe(img))
      }
    }

    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      const scripts = document.querySelectorAll('script[data-defer]')
      scripts.forEach(script => {
        const newScript = document.createElement('script')
        newScript.src = script.getAttribute('data-defer')!
        newScript.async = true
        document.body.appendChild(newScript)
      })
    }

    // Run optimizations
    preloadCriticalResources()
    optimizeImages()
    
    // Defer non-critical JS after page load
    window.addEventListener('load', deferNonCriticalJS)

    // Cleanup
    return () => {
      window.removeEventListener('load', deferNonCriticalJS)
    }
  }, [])

  return null // This component doesn't render anything
}

export default PerformanceOptimizer
