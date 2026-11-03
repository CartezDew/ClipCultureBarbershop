import React, { useEffect, useState, useRef } from 'react'
import NavbarDesktop from './NavbarDesktop.jsx'
import NavbarMobile from './NavbarMobile.jsx'
import { ChevronUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 650 : false)
    const [showBackToTop, setShowBackToTop] = useState(false)
    const autoScrollingRef = useRef(false)
    const location = useLocation()
    
    // Pages where floating action buttons are NOT shown (so back-to-top should be lower)
    const floatingButtonsExcludedPages = ['/login', '/mentorship', '/advertise', '/franchise', '/apply', '/book-now', '/speaking-engagements']
    const isBarberBioPage = location.pathname.startsWith('/barber/')
    const isProductDetailPage = location.pathname.startsWith('/products/')
    const isFloatingButtonsExcluded = floatingButtonsExcludedPages.includes(location.pathname) || isBarberBioPage || isProductDetailPage

    useEffect(() => {
        if (typeof window === 'undefined') return
        const mql = window.matchMedia('(max-width: 650px)')
        const handleChange = (e) => setIsMobile(e.matches)
        setIsMobile(mql.matches)
        if (mql.addEventListener) mql.addEventListener('change', handleChange)
        else mql.addListener(handleChange)
        return () => {
            if (mql.removeEventListener) mql.removeEventListener('change', handleChange)
            else mql.removeListener(handleChange)
        }
    }, [])

    useEffect(() => {
        if (location.pathname === '/sign-in') {
            setShowBackToTop(false)
            return
        }
        let observers = []
        let retryTimer = null
        let heroInView = false
        let footerInView = false

        const recalc = () => {
            if (autoScrollingRef.current) return
            const shouldShow = window.scrollY > 120 && !heroInView && !footerInView
            setShowBackToTop(shouldShow)
        }

        const attach = () => {
            const heroEl = location.pathname === '/' ? document.querySelector('.hero') : document.getElementById('hero')
            const footerEl = document.querySelector('footer.footer')
            let attachedAny = false

            if (heroEl && 'IntersectionObserver' in window) {
                const rect = heroEl.getBoundingClientRect()
                heroInView = rect.bottom > 0 && rect.top < window.innerHeight
                const obsH = new IntersectionObserver((entries) => {
                    const entry = entries[0]
                    heroInView = !!(entry && entry.isIntersecting)
                    recalc()
                }, { threshold: [0.01] })
                obsH.observe(heroEl)
                observers.push(obsH)
                attachedAny = true
            }

            if (footerEl && 'IntersectionObserver' in window) {
                const obsF = new IntersectionObserver((entries) => {
                    const entry = entries[0]
                    footerInView = !!(entry && entry.isIntersecting)
                    recalc()
                }, { threshold: [0.01] })
                obsF.observe(footerEl)
                observers.push(obsF)
                attachedAny = true
            } else {
                footerInView = false
            }

            recalc()
            return attachedAny
        }

        if (!attach()) {
            retryTimer = setInterval(() => {
                if (attach()) {
                    clearInterval(retryTimer)
                }
            }, 250)
        }
        window.addEventListener('scroll', recalc, { passive: true })

        return () => {
            window.removeEventListener('scroll', recalc)
            observers.forEach(o => o.disconnect())
            observers = []
            if (retryTimer) clearInterval(retryTimer)
        }
    }, [location.pathname])

    const scrollToTop = (e) => {
        // Prevent any default behavior and stop propagation
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        
        setShowBackToTop(false)
        autoScrollingRef.current = true
        
        // Use requestAnimationFrame for smoother scroll initiation
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        
        // Reset after scroll completes
        setTimeout(() => {
            autoScrollingRef.current = false
        }, 1000)
    }

    return (
        <>
            {isMobile ? (
                <div className="navbar-visible-mobile" aria-hidden="false">
                    <NavbarMobile />
                </div>
            ) : (
                <div className="navbar-visible-desktop" aria-hidden="false">
                    <NavbarDesktop />
                </div>
            )}
            {isMobile && (
                <button 
                    className={`back-to-top-btn ${isFloatingButtonsExcluded ? 'low-position' : ''}`}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    type="button"
                    style={{ 
                        opacity: showBackToTop ? 1 : 0, 
                        pointerEvents: showBackToTop ? 'auto' : 'none',
                        visibility: showBackToTop ? 'visible' : 'hidden'
                    }}
                >
                    <ChevronUp />
                </button>
            )}
        </>
    )
}

export default Navbar
