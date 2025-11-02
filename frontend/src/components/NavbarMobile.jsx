import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Scissors, Users, Phone, HelpCircle, LogIn, Camera, ShoppingCart } from 'lucide-react'

import logoMobile from '../assets/images/CC-Logo-Black-HQ.webp'
import '../styles/navbar.css'

const NavbarMobile = ({ showTaglineAnim = false, isMobile600 = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const isOpenRef = useRef(false)
    const navigate = useNavigate()
    const location = useLocation()
    
    // Menu items matching the Header.jsx routing
    const menuItems = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'Services', path: '/services' },
        { id: 3, name: 'Barbers', path: '/team' },
        { id: 4, name: 'Gallery', path: '/gallery' },
        { id: 5, name: 'Contact', path: '#contact' }
    ]
    const menuRef = useRef(null)
    const openAtRef = useRef(0)

    // Check screen size and update mobile state
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 605)
        }
        
        // Check on mount
        checkScreenSize()
        
        // Add resize listener
        window.addEventListener('resize', checkScreenSize)
        
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const handleLogoClick = (e) => {
        e.preventDefault()
        
        // Use the isMobile state instead of checking window.innerWidth directly
        if (isMobile) {
            // On mobile, toggle the mobile navbar dropdown
            // If already open, close it; if closed, open it
            setIsOpen(!isOpen)
        } else {
            // On larger screens, use the original navigation behavior
            if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                navigate('/')
            }
        }
    }

    // Removed height calculation logic - not needed for mobile navbar
    // useLayoutEffect(() => {
    //     const setVar = () => {
    //         const nav = document.querySelector('.navbar-container') || document.querySelector('.navbar')
    //         const h = nav ? Math.round(nav.getBoundingClientRect().height) : 48
    //         document.documentElement.style.setProperty('--navbar-height', `${h}px`)
    //     }
    //     setVar()
    //     window.addEventListener('resize', setVar)
    //     return () => window.removeEventListener('resize', setVar)
    // }, [])

    // Mount / unmount logs
    useEffect(() => {
        return () => {}
    }, [])

    // Listen for global toggleMobileMenu events (from Hero/App)
    useEffect(() => {
        const handleExternalToggle = (e) => {
            if (isOpenRef.current) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }
        window.addEventListener('toggleMobileMenu', handleExternalToggle)
        return () => {
            window.removeEventListener('toggleMobileMenu', handleExternalToggle)
        }
    }, [])

    // Observe external class changes that might hide things
    useEffect(() => {
        const bodyObserver = new MutationObserver(() => {})
        bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })

        let appObserver
        const appEl = document.querySelector('.App')
        if (appEl) {
            appObserver = new MutationObserver(() => {})
            appObserver.observe(appEl, { attributes: true, attributeFilter: ['class'] })
        }

        return () => {
            bodyObserver.disconnect()
            if (appObserver) appObserver.disconnect()
        }
    }, [])

    // Publish state changes + duration tracking
    useEffect(() => {
        const now = Date.now()
        if (isOpen) {
            openAtRef.current = now
            document.body.classList.add('mobile-menu-opened')
        } else {
            const dt = now - (openAtRef.current || now)
        }
    }, [isOpen])

    const onHashClick = (hash) => {
        const targetId = hash.substring(1)
        if (location.pathname !== '/') { navigate(`/#${targetId}`); setIsOpen(false); return }
        const targetElement = document.getElementById(targetId)
        if (!targetElement) return
        // Smoothly scroll the exact section into view without manual offsets
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsOpen(false)
    }

    const getIconForMenuItem = (name) => {
        switch (name) {
            case 'Home':
                return <Home className="mobile-nav-icon" size={18} />
            case 'Services':
                return <Scissors className="mobile-nav-icon" size={18} />
            case 'Barbers':
                return <Users className="mobile-nav-icon" size={18} />
            case 'Gallery':
                return <Camera className="mobile-nav-icon" size={18} />
            case 'Contact':
                return <Phone className="mobile-nav-icon" size={18} />
            default:
                return null
        }
    }

    return (
        <nav className="navbar navbar-mobile">
            <div className="navbar-container">
                <button className={`mobile-nav-toggle ${isOpen ? 'open' : ''}`} onClick={() => { 
                    setIsOpen(v => {
                        // Always allow close when open
                        if (isOpenRef.current && v) return false
                        // Opening: if already open (shouldn't happen), keep open; else open
                        return !v
                    })
                }} aria-label="Toggle mobile menu">
                    <span className="mobile-nav-line"></span>
                    <span className="mobile-nav-line"></span>
                </button>
                
                <div className="logo-section">
                    <Link to="/" className="logo-link" aria-label="Go to home">
                        <picture>
                            <source srcSet={`${logoMobile} 2x, ${logoMobile} 1x`} type="image/webp" />
                            {isMobile600 && location.pathname === '/' ? (
                                <motion.img
                                    src={logoMobile}
                                    srcSet={`${logoMobile} 1x`}
                                    alt="ClipCulture Logo"
                                    className="logo-image-nav"
                                    initial={{ opacity: 0 }}
                                    animate={showTaglineAnim ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
                                />
                            ) : (
                                <img 
                                    src={logoMobile} 
                                    srcSet={`${logoMobile} 1x`}
                                    alt="ClipCulture Logo" 
                                    className="logo-image-nav"
                                />
                            )}
                        </picture>
                    </Link>
                </div>
                
                <div className="icon-section">
                    <Link 
                        to="/shop" 
                        className="shopping-cart-btn"
                        aria-label="Shopping Cart"
                    >
                        <div className="shop-icon-container">
                            <ShoppingCart size={24} />
                            <span className="cart-count">0</span>
                        </div>
                    </Link>
                </div>
            </div>

            <AnimatePresence initial={false} mode="wait" onExitComplete={() => { 
              try { document.body.classList.remove('mobile-menu-opened') } catch {}
              try { window.dispatchEvent(new CustomEvent('mobileMenuCloseAnimationEnd', { detail: { open: false, ts: Date.now() } })) } catch {}
            }}>
                {isOpen && (
                    <motion.div
                        key="mobileMenu"
                        className="mobile-nav-menu"
                        ref={menuRef}
                        initial={{ y: '-110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 } }}
                        exit={{ y: '-100%', opacity: 0.98, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } }}
                        onAnimationStart={() => {}}
                        onAnimationComplete={() => { 
                          if (isOpen) { try { window.dispatchEvent(new CustomEvent('mobileMenuOpenAnimationEnd', { detail: { open: true, ts: Date.now() } })) } catch {} }
                        }}
                        style={{ left: 0, right: 'auto' }}
                    >
                        <div className="mobile-nav-items">
                            {menuItems.map((item) => {
                                const icon = getIconForMenuItem(item.name)
                                return (
                                    <Link key={item.id} to={item.path} className="mobile-nav-item" onClick={() => { setIsOpen(false) }}>
                                        {icon}
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default NavbarMobile
