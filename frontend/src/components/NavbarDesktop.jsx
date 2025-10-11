import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Home, Scissors, Users, Phone, HelpCircle, Camera } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import logoWebP from '../assets/images/CC-Logo-Black-HQ.webp'
import logoWebP2x from '../assets/images/CC-Logo-Black-HQ.webp'
import logoPNG from '../assets/images/CC-Logo-Black-HQ.webp'
import '../styles/navbar.css'

const NavbarDesktop = () => {
    const [navbarVisible, setNavbarVisible] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    
    // Menu items matching the Header.jsx routing
    const menuItems = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'Services', path: '/services' },
        { id: 3, name: 'Barbers', path: '/team' },
        { id: 4, name: 'Gallery', path: '/gallery' },
        { id: 5, name: 'Contact', path: '/contact' }
    ]

    // Hide menu items while scrolling on >=680px, re-appear after idle
    const [scrollingHide, setScrollingHide] = useState(false)
    const scrollTimerRef = useRef(null)
    const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
    const cooldownUntilRef = useRef(0)
    const rafIdRef = useRef(0)

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 680px)')
        const onScroll = () => {
            if (!mq.matches) return
            const now = Date.now()
            if (now < cooldownUntilRef.current) return // ignore brief jiggles right after reveal
            if (rafIdRef.current) return
            rafIdRef.current = requestAnimationFrame(() => {
                rafIdRef.current = 0
                const prevY = lastScrollYRef.current
                const curY = window.scrollY
                lastScrollYRef.current = curY
                const delta = Math.abs(curY - prevY)
                if (delta < 6) return // ignore micro scroll noise

                if (!scrollingHide) setScrollingHide(true)
                if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
                scrollTimerRef.current = setTimeout(() => {
                    setScrollingHide(false)
                    // small cooldown so minor residual scroll doesn't immediately hide again
                    cooldownUntilRef.current = Date.now() + 600
                }, 240)
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        }
    }, [scrollingHide])

    useEffect(() => {
        // When route changes, ensure navbar can reveal smoothly and ignore initial layout scrolls
        cooldownUntilRef.current = Date.now() + 800
        setScrollingHide(false)
    }, [location.pathname])

    const getIconForMenuItem = (itemName) => {
        switch (itemName) {
            case 'Home':
                return <Home className="menu-icon" size={18} />
            case 'Services':
                return <Scissors className="menu-icon" size={18} />
            case 'Barbers':
                return <Users className="menu-icon" size={18} />
            case 'Gallery':
                return <Camera className="menu-icon" size={18} />
            case 'Contact':
                return <Phone className="menu-icon" size={18} />
            default:
                return null
        }
    }

    const handleLogoClick = (e) => {
        e.preventDefault()
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
        }
    }

    const shouldShowMenu = !scrollingHide

    return (
        <nav className="navbar navbar-desktop">
            <div className="navbar-container">
                <div className="logo-section">
                    <Link to="/" className="logo-link">
                        <picture>
                            <source srcSet={`${logoWebP2x} 2x, ${logoWebP} 1x`} type="image/webp" />
                            <img 
                                src={logoPNG} 
                                srcSet={`${logoPNG} 1x`}
                                alt="ClipCulture Logo" 
                                className="logo-image-nav"
                            />
                        </picture>
                    </Link>
                </div>
                {/* Menu items: keep mounted to avoid flicker; animate between hidden/visible */}
                {(
                  <motion.div
                    className="menu-section"
                    style={{ willChange: 'opacity, transform' }}
                    initial={{ opacity: 1, y: 0 }}
                    animate={ scrollingHide
                      ? { opacity: 0, y: -4, pointerEvents: 'none', transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }
                      : { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
                    }
                  >
                    {menuItems.map((item) => {
                        const icon = getIconForMenuItem(item.name)
                        const linkClass = 'menu-link'
                        
                        return (
                            <Link key={item.id} to={item.path} className={linkClass}>
                                {icon && icon}
                                <span className="menu-text">{item.name}</span>
                            </Link>
                        )
                    })}
                  </motion.div>
                )}
                <div className="icon-section">
                    <Link to="/contact" className="get-started-btn">
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavbarDesktop
