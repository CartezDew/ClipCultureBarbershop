import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Scissors, Users, Phone, HelpCircle, LogIn, Camera, ShoppingCart, User, Users2, Baby, MapPin, Building, BookOpen, GraduationCap, Megaphone, Store, FileText, Mail, UserPlus, Building2, Info, ChevronDown, Mic2 } from 'lucide-react'

import logoMobile from '../assets/images/CC-Logo-Black-HQ.webp'
import '../styles/navbar.css'

const NavbarMobile = ({ showTaglineAnim = false, isMobile600 = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [expandedSections, setExpandedSections] = useState({ Services: true }) // Services expanded by default
    const isOpenRef = useRef(false)
    const navigate = useNavigate()
    const location = useLocation()
    
    // Menu items matching the desktop navbar with all dropdown links
    const menuItems = [
        // Home (only show if not on home page)
        ...(location.pathname !== '/' ? [{ id: 'home', name: 'Home', path: '/', icon: 'Home' }] : []),
        
        // Services section
        { id: 'services-all', name: 'All Services', path: '/services', icon: 'Scissors', section: 'Services' },
        { id: 'services-men', name: 'Men', path: '/services', icon: 'User', section: 'Services' },
        { id: 'services-women', name: 'Women', path: '/services#specialty-services', icon: 'Users2', section: 'Services' },
        { id: 'services-kids', name: 'Kids', path: '/services#specialty-services', icon: 'Baby', section: 'Services' },
        
        // Barbers section
        { id: 'barbers-all', name: 'All Locations', path: '/?location=all#team', icon: 'MapPin', section: 'Barbers' },
        { id: 'barbers-sandy', name: 'Sandy Springs', path: '/?location=sandy-springs#team', icon: 'Building', section: 'Barbers' },
        { id: 'barbers-summerhill', name: 'Summerhill', path: '/?location=summerhill#team', icon: 'Building', section: 'Barbers' },
        { id: 'barbers-apply', name: 'Apply', path: '/apply', icon: 'UserPlus', section: 'Barbers' },
        
        // Shop section
        { id: 'shop-all', name: 'All Products', path: '/shop', icon: 'Store', section: 'Shop' },
        { id: 'shop-books', name: 'Books', path: '/shop#books', icon: 'BookOpen', section: 'Shop' },
        { id: 'shop-mentorship', name: 'Mentorship', path: '/mentorship', icon: 'GraduationCap', section: 'Shop' },
        { id: 'shop-advertise', name: 'Advertise', path: '/advertise', icon: 'Megaphone', section: 'Shop' },
        { id: 'shop-franchise', name: 'Franchise', path: '/franchise', icon: 'Building2', section: 'Shop' },
        { id: 'shop-speaking', name: 'Speaking Engagements', path: '/speaking', icon: 'Mic2', section: 'Shop' },
        
        // About section
        { id: 'about-story', name: 'Our Story', path: '/about', icon: 'FileText', section: 'About' },
        { id: 'about-faq', name: 'FAQ', path: '/#faq', icon: 'HelpCircle', section: 'About' },
        { id: 'about-join', name: 'Join Team', path: '/apply', icon: 'UserPlus', section: 'About' },
        { id: 'about-contact', name: 'Contact Us', path: '/#contact', icon: 'Mail', section: 'About' },
        { id: 'about-login', name: 'Log In', path: '/login', icon: 'LogIn', section: 'About' }
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
            document.body.classList.remove('mobile-menu-opened')
        }
    }, [isOpen])

    // Close menu when clicking outside
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Check if click is not on the toggle button or navbar container
                const navbarContainer = document.querySelector('.navbar-mobile .navbar-container')
                if (navbarContainer && !navbarContainer.contains(event.target)) {
                    setIsOpen(false)
                }
            }
        }

        // Add small delay to prevent immediate closing on open
        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside)
        }, 100)

        return () => {
            clearTimeout(timeoutId)
            document.removeEventListener('mousedown', handleClickOutside)
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

    const toggleSection = (section) => {
        setExpandedSections(prev => {
            // If the clicked section is already expanded, close it
            if (prev[section]) {
                return {
                    Services: false,
                    Barbers: false,
                    Shop: false,
                    About: false
                }
            }
            // Otherwise, close all sections and open the clicked one
            return {
                Services: false,
                Barbers: false,
                Shop: false,
                About: false,
                [section]: true
            }
        })
    }

    const getIconForMenuItem = (iconName) => {
        const iconProps = { className: "mobile-nav-icon", size: 18 }
        
        switch (iconName) {
            case 'Home':
                return <Home {...iconProps} />
            case 'Scissors':
                return <Scissors {...iconProps} />
            case 'Users':
                return <Users {...iconProps} />
            case 'Camera':
                return <Camera {...iconProps} />
            case 'Phone':
                return <Phone {...iconProps} />
            case 'User':
                return <User {...iconProps} />
            case 'Users2':
                return <Users2 {...iconProps} />
            case 'Baby':
                return <Baby {...iconProps} />
            case 'MapPin':
                return <MapPin {...iconProps} />
            case 'Building':
                return <Building {...iconProps} />
            case 'BookOpen':
                return <BookOpen {...iconProps} />
            case 'GraduationCap':
                return <GraduationCap {...iconProps} />
            case 'Megaphone':
                return <Megaphone {...iconProps} />
            case 'Store':
                return <Store {...iconProps} />
            case 'FileText':
                return <FileText {...iconProps} />
            case 'HelpCircle':
                return <HelpCircle {...iconProps} />
            case 'Mail':
                return <Mail {...iconProps} />
            case 'UserPlus':
                return <UserPlus {...iconProps} />
            case 'Building2':
                return <Building2 {...iconProps} />
            case 'LogIn':
                return <LogIn {...iconProps} />
            case 'Info':
                return <Info {...iconProps} />
            case 'Mic2':
                return <Mic2 {...iconProps} />
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
                    <>
                        {/* Overlay backdrop */}
                        <motion.div
                            key="mobileOverlay"
                            className="mobile-nav-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                        />
                        {/* Menu */}
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
                            {(() => {
                                const sections = ['Services', 'Barbers', 'Shop', 'About']
                                const items = []
                                
                                // Add home link if not on home page
                                const homeItem = menuItems.find(item => item.id === 'home')
                                if (homeItem) {
                                    items.push(
                                        <Link 
                                            key={homeItem.id} 
                                            to={homeItem.path} 
                                            className="mobile-nav-item" 
                                            onClick={() => { setIsOpen(false) }}
                                        >
                                            {getIconForMenuItem(homeItem.icon)}
                                            {homeItem.name}
                                        </Link>
                                    )
                                }
                                
                                // Group and render by sections
                                sections.forEach(section => {
                                    const sectionItems = menuItems.filter(item => item.section === section)
                                    const isExpanded = expandedSections[section]
                                    
                                    if (sectionItems.length > 0) {
                                        items.push(
                                            <div key={`section-${section}`} className="mobile-nav-section">
                                                <button 
                                                    className="mobile-nav-section-header"
                                                    onClick={() => toggleSection(section)}
                                                >
                                                    <span>{section}</span>
                                                    <ChevronDown 
                                                        size={16} 
                                                        className={`section-chevron ${isExpanded ? 'expanded' : ''}`}
                                                    />
                                                </button>
                                                <AnimatePresence initial={false}>
                                                    {isExpanded && (
                                                        <motion.div
                                                            className="mobile-nav-section-items"
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                                        >
                                                            {sectionItems.map((item) => {
                                                                const icon = getIconForMenuItem(item.icon)
                                                                return (
                                                                    <Link 
                                                                        key={item.id} 
                                                                        to={item.path} 
                                                                        className="mobile-nav-item" 
                                                                        onClick={() => { setIsOpen(false) }}
                                                                    >
                                                                        {icon}
                                                                        {item.name}
                                                                    </Link>
                                                                )
                                                            })}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    }
                                })
                                
                                return items
                            })()}
                        </div>
                    </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default NavbarMobile
