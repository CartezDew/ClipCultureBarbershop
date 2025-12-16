import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Home, Scissors, Users, Phone, HelpCircle, Camera, ChevronDown, Info, User, Users2, Baby, MapPin, Building, BookOpen, GraduationCap, Megaphone, Store, FileText, Mail, LogIn, ShoppingCart, UserPlus, Building2, Mic2, Shirt } from 'lucide-react'
import Comb from './icons/Comb'
import { AnimatePresence, motion } from 'framer-motion'
import logoWebP from '../assets/images/CC-Logo-Black-HQ.webp'
import '../styles/navbar.css'

const NavbarDesktop = () => {
    const [navbarVisible, setNavbarVisible] = useState(true)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const navRef = useRef(null)
    
    // Menu items with dropdown support
    const menuItems = [
        { id: 1, name: 'Services', path: '/services', hasDropdown: true, dropdownKey: 'services' },
        { id: 2, name: 'Shop', path: '/shop', hasDropdown: true, dropdownKey: 'shop' },
        { id: 3, name: 'About', path: '/about', hasDropdown: true, dropdownKey: 'about' },
    ]

    // Dropdown menus matching HeroNavbar
    const dropdownMenus = {
        services: [
            ...(location.pathname !== '/services' ? [{ name: 'All Services', link: '/services', icon: <Scissors size={16} /> }] : []),
            { name: 'Men', link: '/services', icon: <User size={16} /> },
            { name: 'Women', link: '/services#specialty-services', icon: <Users2 size={16} /> },
            { name: 'Kids', link: '/services#specialty-services', icon: <Baby size={16} /> }
        ],
        shop: [
            ...(location.pathname !== '/shop' ? [{ name: 'All Products', link: '/shop', icon: <Store size={16} /> }] : []),
            { name: 'Apparel', link: '/shop#apparel', icon: <Shirt size={16} /> },
            { name: 'Books', link: '/shop#books', icon: <BookOpen size={16} /> },
            { name: 'Mentorship', link: '/mentorship', icon: <GraduationCap size={16} /> },
            { name: 'Advertise', link: '/advertise', icon: <Megaphone size={16} /> }
        ],
        about: [
            ...(location.pathname !== '/' ? [{ name: 'Home', link: '/', icon: <Home size={16} /> }] : []),
            ...(location.pathname !== '/about' ? [{ name: 'Our Story', link: '/about', icon: <FileText size={16} /> }] : []),
            ...(location.pathname !== '/speaking-engagements' ? [{ name: 'Speaking Engagements', link: '/speaking-engagements', icon: <Mic2 size={16} /> }] : []),
            ...(location.pathname !== '/franchise' ? [{ name: 'Franchise', link: '/franchise', icon: <Building2 size={16} /> }] : []),
            ...(location.pathname !== '/' || (location.pathname === '/' && location.hash !== '#faq') ? [{ name: 'FAQ', link: '/#faq', icon: <HelpCircle size={16} /> }] : []),
            ...(location.pathname !== '/apply' ? [{ name: 'Join Team', link: '/apply', icon: <UserPlus size={16} /> }] : []),
            ...(location.pathname !== '/' || (location.pathname === '/' && location.hash !== '#contact') ? [{ name: 'Contact Us', link: '/#contact', icon: <Mail size={16} /> }] : []),
            ...(location.pathname !== '/login' ? [{ name: 'Log In', link: '/login', icon: <LogIn size={16} /> }] : [])
        ]
    }

    // Hide menu items while scrolling on >=605px, re-appear after idle
    const [scrollingHide, setScrollingHide] = useState(false)
    const scrollTimerRef = useRef(null)
    const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
    const cooldownUntilRef = useRef(0)
    const rafIdRef = useRef(0)

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 605px)')
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

                if (!scrollingHide) {
                    setScrollingHide(true)
                    setActiveDropdown(null)
                }
                if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
                scrollTimerRef.current = setTimeout(() => {
                    setScrollingHide(false)
                    // small cooldown so minor residual scroll doesn't immediately hide again
                    cooldownUntilRef.current = Date.now() + 600
                }, 350)
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

    // Dropdown functions
    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    const closeDropdown = () => {
        setActiveDropdown(null);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getIconForMenuItem = (itemName) => {
        switch (itemName) {
            case 'Home':
                return <Home className="menu-icon" size={18} />
            case 'Services':
                return <Scissors className="menu-icon" size={18} />
            case 'Shop':
                return <ShoppingCart className="menu-icon" size={18} />
            case 'About':
                return <Info className="menu-icon" size={18} />
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
        <nav className="navbar navbar-desktop" ref={navRef}>
            <div className="navbar-container">
                <div className="logo-section">
                    <Link to="/" className="logo-link">
                        <img 
                            src={logoWebP} 
                            alt="ClipCulture Logo" 
                            className="logo-image-nav"
                        />
                    </Link>
                </div>
                {/* Menu items: keep mounted to avoid flicker; animate between hidden/visible */}
                {(
                  <motion.div
                    className="menu-section"
                    style={{ willChange: 'opacity, transform' }}
                    initial={{ opacity: 1, y: 0 }}
                    animate={ scrollingHide
                      ? { opacity: 0, y: -10, pointerEvents: 'none', transition: { duration: 0.2, ease: "easeOut" } }
                      : { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.5, ease: "easeOut" } }
                    }
                  >
                    {menuItems.map((item) => {
                        const icon = getIconForMenuItem(item.name)
                        
                        if (item.hasDropdown) {
                            return (
                                <div key={item.id} className="dropdown-container">
                                    <button
                                        className={`menu-link dropdown-trigger ${item.name === 'Shop' ? 'shop-link' : ''}`}
                                        onClick={() => toggleDropdown(item.dropdownKey)}
                                    >
                                        <div className="nav-content">
                                            {item.name === 'Shop' ? (
                                                <div className="shop-icon-container">
                                                    {icon && icon}
                                                    <span className="cart-count">0</span>
                                                </div>
                                            ) : (
                                                icon && icon
                                            )}
                                            <span className="menu-text">{item.name}</span>
                                        </div>
                                        <ChevronDown className={`dropdown-arrow ${activeDropdown === item.dropdownKey ? 'active' : ''}`} size={14} />
                                    </button>
                                    {activeDropdown === item.dropdownKey && (
                                        <div className="dropdown-menu">
                                            {dropdownMenus[item.dropdownKey].map((dropdownItem, index) => (
                                                <Link
                                                    key={index}
                                                    to={dropdownItem.link}
                                                    className="dropdown-item"
                                                    onClick={closeDropdown}
                                                >
                                                    <span className="dropdown-icon">{dropdownItem.icon}</span>
                                                    {dropdownItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        } else {
                            return (
                                <Link key={item.id} to={item.path} className="menu-link">
                                    {icon && icon}
                                    <span className="menu-text">{item.name}</span>
                                </Link>
                            )
                        }
                    })}
                  </motion.div>
                )}
                <div className="icon-section">
                    <Link to="/#contact" className="book-now-btn">
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavbarDesktop
