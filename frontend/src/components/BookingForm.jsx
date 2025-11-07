import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/booking.css';
import Image1 from '../assets/Barbers/Image_1.webp';
import Image2 from '../assets/Barbers/Image_2.webp';
import Image3 from '../assets/Barbers/Image_3.webp';
import Image4 from '../assets/Barbers/Image_4.webp';
import Image5 from '../assets/Barbers/Image_5.webp';
import Image6 from '../assets/Barbers/Image_6.webp';
import Image7 from '../assets/Barbers/Image_7.webp';
import Image8 from '../assets/Barbers/Image_8.webp';
import Image9 from '../assets/Barbers/Image_9.webp';
import Image10 from '../assets/Barbers/Image_10.webp';
import Image11 from '../assets/Barbers/Image_11.webp';
import Image12 from '../assets/Barbers/Image_12.webp';
import Image13 from '../assets/Barbers/Image_13.webp';
// Gallery images for portfolio
import GalleryImage1 from '../assets/gallery/image-1.webp';
import GalleryImage2 from '../assets/gallery/image-2.webp';
import GalleryImage3 from '../assets/gallery/image-3.webp';
import GalleryImage4 from '../assets/gallery/image-4.webp';
import GalleryImage5 from '../assets/gallery/image-5.webp';
import GalleryImage6 from '../assets/gallery/image-6.webp';

const BookingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [popupStep, setPopupStep] = useState(2);
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    barber: '',
    services: [],
    addOns: [],
    location: '',
    date: '',
    time: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [viewingMonth, setViewingMonth] = useState(new Date().getMonth());
  const [viewingYear, setViewingYear] = useState(new Date().getFullYear());
  const [locationFilter, setLocationFilter] = useState(null); // 'sandy-springs', 'summerhill', or null
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [portfolioBarber, setPortfolioBarber] = useState(null);
  const [showBio, setShowBio] = useState(false);
  const [bioBarber, setBioBarber] = useState(null);

  // Services from the Services page
  const regularServices = [
    { id: 'basic-haircut', name: 'Basic Haircut', price: 20, duration: '30 mins' },
    { id: 'basic-haircut-beard', name: 'Basic Haircut + Beard', price: 28, duration: '35 min' },
    { id: 'basic-haircut-eyebrows', name: 'Basic Haircut + Eyebrows', price: 35, duration: '35 min' },
    { id: 'basic-haircut-eyebrows-beard', name: 'Basic Haircut + Eyebrows + Beard', price: 38, duration: '45 min' },
    { id: 'basic-lineup', name: 'Basic Lineup', price: 20, duration: '20 min' },
    { id: 'basic-lineup-beard', name: 'Basic Lineup + Beard', price: 25, duration: '30 min' },
    { id: 'bald-fade', name: 'Bald Fade', price: 35, duration: '25 min' },
    { id: 'bald-fade-beard', name: 'Bald Fade + Beard', price: 35, duration: '30 min' },
    { id: 'bald-fade-beard-enhancements', name: 'Bald Fade + Beard + Enhancements', price: 40, duration: '40 min' },
    { id: 'taper-fade-beard', name: 'Taper Fade + Beard', price: 35, duration: '35 min' },
    { id: 'taper-fade-twist-sponge', name: 'Taper Fade + Twist Sponge', price: 38, duration: '30 min' },
    { id: 'drop-fade', name: 'Drop Fade', price: 35, duration: '25 min' },
    { id: 'dark-caesar', name: 'Dark Caesar/Low Caesar', price: 35, duration: '25 min' },
    { id: 'beard-trim', name: 'Beard Trim', price: 20, duration: '20 min' },
    { id: 'hot-towel-shave', name: 'Hot Towel Shave', price: 20, duration: '20 min' },
    { id: 'blow-out', name: 'Blow-Out', price: 35, duration: '40 min' }
  ];

  const specialtyServices = [
    { id: 'child-haircut', name: 'Child Haircut (10 and under)', price: 25, duration: '25 min', category: 'Children' },
    { id: 'child-haircut-designs', name: 'Child Haircut + Designs', price: 30, duration: '30 min', category: 'Children' },
    { id: 'womens-haircut-designs', name: "Women's Haircut + Designs", price: 35, duration: '30 min', category: 'Women' },
    { id: 'womens-undercut', name: "Women's Undercut (only)", price: 25, duration: '25 min', category: 'Women' },
    { id: 'senior-citizen-haircut', name: 'Senior Citizen Haircut (62+)', price: 30, duration: '30 min', category: 'Seniors' }
  ];

  const addOnServices = [
    { id: 'eyebrows', name: 'Eyebrows', price: 12, duration: '15 min' },
    { id: 'designs', name: 'Designs', price: 10, duration: '15 min' },
    { id: 'shampoo-service', name: 'Shampoo Service', price: 8, duration: '10 min' }
  ];

  // Featured grooming products
  const featuredProducts = [
    {
      id: 1,
      name: "Curl Twist",
      price: 15,
      image: "/src/assets/products/Product-1.png",
      slug: "curl-twist",
      size: "8 oz"
    },
    {
      id: 2,
      name: "Beard Balm",
      price: 20,
      image: "/src/assets/products/Product-2.png",
      slug: "beard-balm",
      size: "8 oz"
    },
    {
      id: 3,
      name: "Beard Oil",
      price: 20,
      image: "/src/assets/products/Product-3.png",
      slug: "beard-oil",
      size: "4 oz"
    }
  ];

  // Combine all services for display
  const allMainServices = [...regularServices, ...specialtyServices];

  // Portfolio images (using first 6 gallery images for all barbers for now)
  const portfolioImages = [
    GalleryImage1, GalleryImage2, GalleryImage3, 
    GalleryImage4, GalleryImage5, GalleryImage6
  ];

  // Helper function to get random availability (simulated)
  const getRandomAvailability = () => {
    const today = new Date();
    const daysOffset = Math.floor(Math.random() * 3); // 0-2 days from today
    const availDate = new Date(today);
    availDate.setDate(today.getDate() + daysOffset);
    
    const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    
    return {
      date: availDate,
      time: randomTime,
      daysFromNow: daysOffset
    };
  };

  // Barbers data from Professional Team
  const sandySpringsBarbers = [
    { 
      id: 'david-brown', 
      name: "David Brown", 
      title: "Owner/Master Barber", 
      location: "Sandy Springs", 
      image: Image1, 
      availability: getRandomAvailability(),
      bio: "Founder and master barber with over 15 years of experience. Specializes in precision cuts and classic styles with a modern twist. David's passion for the craft and dedication to excellence has made Clip Culture a premier destination."
    },
    { 
      id: 'daniel-l', 
      name: "Daniel L.", 
      title: "Barber", 
      location: "Sandy Springs", 
      image: Image2, 
      availability: getRandomAvailability(),
      bio: "Creative stylist with 8 years of experience specializing in fades and modern cuts. Known for his attention to detail and ability to bring clients' visions to life. Daniel stays current with the latest trends and techniques."
    },
    { 
      id: 'leelee-s', 
      name: "LeeLee S.", 
      title: "Barber", 
      location: "Sandy Springs", 
      image: Image3, 
      availability: getRandomAvailability(),
      bio: "Expert in textured cuts and creative designs with 6 years of experience. LeeLee's artistic approach and friendly demeanor make every appointment enjoyable. Specializes in trendy styles and beard sculpting."
    },
    { 
      id: 'justin-h', 
      name: "Justin H.", 
      title: "Barber", 
      location: "Sandy Springs", 
      image: Image4, 
      availability: getRandomAvailability(),
      bio: "Master of classic and contemporary styles with 10 years behind the chair. Justin's precision and consistency keep clients coming back. Known for exceptional beard trims and traditional hot towel shaves."
    },
    { 
      id: 'tyrel-y', 
      name: "Tyrel Y", 
      title: "Barber", 
      location: "Sandy Springs", 
      image: Image5, 
      availability: getRandomAvailability(),
      bio: "Skilled barber with 7 years of experience specializing in skin fades and line work. Tyrel's meticulous approach ensures every cut is sharp and clean. Great with clients of all ages and hair types."
    },
    { 
      id: 'doug-l', 
      name: "Doug L.", 
      title: "Barber", 
      location: "Sandy Springs", 
      image: Image6, 
      availability: getRandomAvailability(),
      bio: "Veteran barber with 12 years of experience in both traditional and modern techniques. Doug's laid-back personality and expert skills create a comfortable atmosphere. Specializes in tapers and executive cuts."
    }
  ];

  const summerhillBarbers = [
    { 
      id: 'aaron-w', 
      name: "Aaron W.", 
      title: "Barber", 
      location: "Summerhill", 
      image: Image7, 
      availability: getRandomAvailability(),
      bio: "Dynamic barber with 9 years of experience known for creative fades and bold designs. Aaron brings energy and artistry to every cut. Excellent at consulting with clients to achieve their perfect look."
    },
    { 
      id: 'tj-s', 
      name: "TJ S.", 
      title: "Barber", 
      location: "Summerhill", 
      image: Image8, 
      availability: getRandomAvailability(),
      bio: "Precision stylist with 5 years of experience specializing in clean cuts and sharp lines. TJ's friendly approach and consistent results have built a loyal following. Expert in modern gentleman's cuts."
    },
    { 
      id: 'cass-b', 
      name: "Cass B.", 
      title: "Barber", 
      location: "Summerhill", 
      image: Image9, 
      availability: getRandomAvailability(),
      bio: "Talented barber with 6 years of experience excelling in textured styles and natural hair care. Cass's versatility and creativity shine in every appointment. Known for personalized consultations and style advice."
    },
    { 
      id: 'desean-p', 
      name: "DeSean P.", 
      title: "Barber", 
      location: "Summerhill", 
      image: Image10, 
      availability: getRandomAvailability(),
      bio: "Skilled craftsman with 8 years of experience specializing in bald fades and edge-ups. DeSean's technical precision and perfectionist approach deliver consistently excellent results. Great with intricate designs."
    },
    { 
      id: 'tray-w', 
      name: "Tray W.", 
      title: "Barber", 
      location: "Summerhill", 
      image: Image11, 
      availability: getRandomAvailability(),
      bio: "Professional barber with 7 years of experience mastering both classic and contemporary styles. Tray's attention to detail and personable nature create an exceptional experience. Specializes in tapers and line work."
    },
    { 
      id: 'hugo-d', 
      name: "Hugo D.", 
      title: "Barber", 
      location: "Summerhill", 
      image: Image12, 
      availability: getRandomAvailability(),
      bio: "Experienced barber with 10 years in the industry focusing on precision cuts and beard grooming. Hugo's steady hand and eye for detail ensure impeccable results. Known for his professionalism and expertise."
    },
    { 
      id: 'mula-s', 
      name: "Mula S.", 
      title: "Barber", 
      location: "Summerhill", 
      image: Image13, 
      availability: getRandomAvailability(),
      bio: "Creative stylist with 6 years of experience bringing fresh perspectives to classic cuts. Mula's innovative techniques and engaging personality make every visit memorable. Excellent at modern fades and styling."
    }
  ];

  const allBarbers = [...sandySpringsBarbers, ...summerhillBarbers];

  const locations = [
    { id: 'sandy-springs', name: 'Sandy Springs Location', address: '6309 Roswell Road NE #2D' },
    { id: 'summerhill', name: 'Summerhill Location', address: '572 Hank Aaron Dr Suite 1120' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  // Simulate earliest available times with associated barbers
  // In real app, this would query actual availability from backend
  const getEarliestAvailableTimes = () => {
    return [
      { time: '10:00 AM', barber: allBarbers[0] }, // David Brown
      { time: '10:30 AM', barber: allBarbers[1] }, // Daniel L.
      { time: '11:00 AM', barber: allBarbers[2] }, // LeeLee S.
      { time: '11:30 AM', barber: allBarbers[3] }, // Justin H.
      { time: '12:00 PM', barber: allBarbers[4] }  // Tyrel Y
    ];
  };

  // Calendar helper functions
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getUpcomingDays = (count = 14) => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add days from previous month to fill first week
    const startDay = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }
    
    // Add current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    // Add days from next month to fill last week
    const endDay = lastDay.getDay();
    for (let day = 1; day <= (6 - endDay); day++) {
      days.push(new Date(year, month + 1, day));
    }
    
    return days;
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getFullDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!formData.date) return false;
    return formatDate(date) === formData.date;
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleDateSelect = (date) => {
    if (isPastDate(date)) return;
    setFormData(prev => ({
      ...prev,
      date: formatDate(date),
      time: '' // Reset time when date changes
    }));
    setViewingMonth(date.getMonth());
    setViewingYear(date.getFullYear());
    setCalendarOpen(false);
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (viewingMonth === 0) {
        setViewingMonth(11);
        setViewingYear(viewingYear - 1);
      } else {
        setViewingMonth(viewingMonth - 1);
      }
    } else {
      if (viewingMonth === 11) {
        setViewingMonth(0);
        setViewingYear(viewingYear + 1);
      } else {
        setViewingMonth(viewingMonth + 1);
      }
    }
  };

  const getMonthName = (month) => {
    return new Date(2000, month, 1).toLocaleDateString('en-US', { month: 'long' });
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  // Portfolio functions
  const handleOpenPortfolio = (e, barber) => {
    e.stopPropagation(); // Prevent barber selection
    setPortfolioBarber(barber);
    setShowPortfolio(true);
  };

  const handleClosePortfolio = () => {
    setShowPortfolio(false);
    setPortfolioBarber(null);
  };

  const handleBookFromPortfolio = () => {
    if (portfolioBarber) {
      handleBarberSelect(portfolioBarber.id);
      handleClosePortfolio();
    }
  };

  // Bio functions
  const handleOpenBio = (e, barber) => {
    e.stopPropagation(); // Prevent barber selection
    setBioBarber(barber);
    setShowBio(true);
  };

  const handleCloseBio = () => {
    setShowBio(false);
    setBioBarber(null);
  };

  const handleBookFromBio = () => {
    if (bioBarber) {
      handleBarberSelect(bioBarber.id);
      handleCloseBio();
    }
  };

  // Format availability display
  const formatAvailability = (availability) => {
    if (!availability) return { day: 'Soon', time: '--' };
    
    const { daysFromNow, time } = availability;
    
    if (daysFromNow === 0) {
      return { day: 'Today', time };
    } else if (daysFromNow === 1) {
      return { day: 'Tomorrow', time };
    } else {
      const date = availability.date;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return { day: `${month}/${day}`, time };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBarberSelect = (barberId) => {
    // If a specific barber is selected, automatically set their location
    if (barberId !== 'earliest') {
      const selectedBarber = allBarbers.find(b => b.id === barberId);
      const locationId = selectedBarber?.location === 'Sandy Springs' ? 'sandy-springs' : 'summerhill';
      setFormData(prev => ({
        ...prev,
        barber: barberId,
        location: locationId
      }));
      
      // Scroll to next button if not in view
      setTimeout(() => {
        const nextButton = document.querySelector('.btn-next');
        if (nextButton) {
          nextButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      setFormData(prev => ({
        ...prev,
        barber: barberId
      }));
    }
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddOnToggle = (addOnId) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  const handleLocationSelect = (locationId) => {
    setFormData(prev => ({
      ...prev,
      location: locationId
    }));
  };

  const handleTimeSelect = (time, autoAssignedBarber = null) => {
    setFormData(prev => {
      // If earliest available, auto-assign the barber and location for this time slot
      if (autoAssignedBarber && prev.barber === 'earliest') {
        const locationId = autoAssignedBarber.location === 'Sandy Springs' ? 'sandy-springs' : 'summerhill';
        return {
          ...prev,
          time: time,
          barber: autoAssignedBarber.id,
          location: locationId
        };
      }
      return {
        ...prev,
        time: time
      };
    });
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextPopupStep = () => {
    if (popupStep < 5) {
      setPopupStep(popupStep + 1);
      setIsDropdownOpen(false);
    }
  };

  const prevPopupStep = () => {
    if (popupStep > 1) {
      setPopupStep(popupStep - 1);
      setIsDropdownOpen(false);
    }
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showPopupForm) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift from scrollbar
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showPopupForm]);

  // Prevent body scrolling when success message is shown
  useEffect(() => {
    if (showSuccessMessage) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showSuccessMessage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.custom-dropdown-wrapper');
      if (dropdown && !dropdown.contains(event.target) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close month dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const monthSelector = document.querySelector('.month-year-selector');
      if (monthSelector && !monthSelector.contains(event.target) && monthDropdownOpen) {
        setMonthDropdownOpen(false);
      }
    };

    if (monthDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [monthDropdownOpen]);

  const openPopupForm = (location = null) => {
    // If contact info is already filled, skip to step 2 (Barber selection)
    const contactInfoFilled = formData.firstName && formData.lastName && formData.email && formData.phone;
    setPopupStep(contactInfoFilled ? 2 : 1);
    setLocationFilter(location);
    setShowPopupForm(true);
    setPolicyAgreed(false); // Reset policy agreement
  };

  // Listen for hero button click to open popup
  useEffect(() => {
    const handleOpenBooking = (event) => {
      const location = event.detail?.location || null;
      openPopupForm(location);
    };

    window.addEventListener('openBookingForm', handleOpenBooking);

    return () => {
      window.removeEventListener('openBookingForm', handleOpenBooking);
    };
  }, []);

  const closePopupForm = () => {
    setShowPopupForm(false);
    setPopupStep(1); // Reset to step 1 for next time
    setLocationFilter(null); // Reset location filter
    setPolicyAgreed(false); // Reset policy agreement
    setShowPolicy(false); // Hide policy content
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', formData);
    setShowPopupForm(false); // Close the booking modal first
    setShowSuccessMessage(true); // Then show the success message
    
    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatSuccessDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const isStepValid = (step = currentStep) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.barber; // Barber selection required
      case 3:
        return formData.services.length > 0; // At least one service required
      case 4:
        return formData.date && formData.time;
      case 5:
        return policyAgreed; // Policy agreement required
      default:
        return false;
    }
  };

  const getValidationErrorMessage = (step) => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName) return 'Please enter your full name';
        if (!formData.email) return 'Please enter your email address';
        if (!formData.phone) return 'Please enter your phone number';
        return '';
      case 2:
        return 'Please select a barber';
      case 3:
        return 'Please select at least one service';
      case 4:
        if (!formData.date) return 'Please select a date';
        if (!formData.time) return 'Please select a time';
        return '';
      case 5:
        return 'Please agree to the cancellation policy';
      default:
        return 'Please complete all required fields';
    }
  };

  const renderPopupStep = () => {
    switch (popupStep) {
      case 1:
        return (
          <div className="booking-step">
            <h3>Your Information</h3>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group half">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group half">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        const selectedBarber = allBarbers.find(b => b.id === formData.barber);
        // Filter barbers based on location if specified
        const filteredBarbers = locationFilter 
          ? allBarbers.filter(b => {
              if (locationFilter === 'sandy-springs') return b.location === 'Sandy Springs';
              if (locationFilter === 'summerhill') return b.location === 'Summerhill';
              return true;
            })
          : allBarbers;
        
        return (
          <div className="booking-step">
            <h3>Select Your Barber</h3>
            
            {/* Earliest Available Option */}
            <div 
              className={`barber-card earliest-available ${formData.barber === 'earliest' ? 'selected' : ''}`}
              onClick={() => handleBarberSelect('earliest')}
            >
              <div className="barber-image-wrapper">
                <div className="earliest-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>
              <div className="barber-info-earliest">
                <h1>Earliest Available</h1>
                <p>See the 5 earliest time slots and get matched automatically</p>
              </div>
            </div>

            {/* Barbers Grid */}
            <div className="barbers-grid">
              {filteredBarbers.map((barber, index) => {
                const availability = formatAvailability(barber.availability);
                const isOwner = barber.id === 'david-brown';
                
                return (
                  <div
                    key={barber.id}
                    className={`barber-card ${formData.barber === barber.id ? 'selected' : ''}`}
                    onClick={() => handleBarberSelect(barber.id)}
                  >
                    {/* Card Icons - Top Right */}
                    <div className="barber-card-icons">
                      <button 
                        className="card-icon-btn info-icon-btn"
                        onClick={(e) => handleOpenBio(e, barber)}
                        aria-label={`View ${barber.name}'s bio`}
                        title="Bio"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primary-green)" stroke="none">
                          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--primary-green)" strokeWidth="2"></circle>
                          <circle cx="12" cy="8" r="1.5" fill="var(--primary-green)"></circle>
                          <rect x="11" y="11" width="2" height="7" rx="1" fill="var(--primary-green)"></rect>
                        </svg>
                      </button>
                      <button 
                        className="card-icon-btn portfolio-card-icon-btn"
                        onClick={(e) => handleOpenPortfolio(e, barber)}
                        aria-label={`View ${barber.name}'s portfolio`}
                        title="Gallery"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="barber-image-wrapper">
                      <img 
                        src={barber.image} 
                        alt={barber.name}
                        className="barber-image"
                      />
                    </div>
                    <div className="barber-info">
                      <h4>{barber.name}</h4>
                      {/* Only show title for David Brown (Owner) */}
                      {isOwner && <p className="barber-title">{barber.title}</p>}
                      <p className="barber-location">{barber.location}</p>
                      {/* Availability Display */}
                      <div className="barber-availability">
                        <span className="availability-label">Available</span>
                      </div>
                      <div className="availability-day">{availability.day}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 3:
        const selectedService = allMainServices.find(s => s.id === formData.service);
        
        return (
          <div className="booking-step">
            <h3>Select Service</h3>
            
            {/* Custom Service Dropdown */}
            <div className="form-group">
              <label className="service-label">Choose Your Service</label>
              <div className="custom-dropdown-wrapper">
                <div 
                  className={`custom-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
                  onClick={toggleDropdown}
                >
                  <span className="dropdown-selected-text">
                    {formData.services.length > 0 
                      ? (
                        <>
                          {!isDropdownOpen 
                            ? `You've selected ${formData.services.length + formData.addOns.length} ${formData.services.length + formData.addOns.length === 1 ? 'service' : 'services'}`
                            : '-- Select Services --'
                          }
                        </>
                      )
                      : '-- Select a Service --'
                    }
                  </span>
                  <svg 
                    className="dropdown-arrow" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                
                {isDropdownOpen && (
                  <div className="custom-dropdown-menu">
                    <div className="custom-dropdown-scroll">
                      {/* Regular Services Group */}
                      <div className="dropdown-group">
                        <div className="dropdown-group-label">Regular Services</div>
                        {regularServices.map(service => (
                          <div
                            key={service.id}
                            className={`dropdown-option addon-option ${formData.services.includes(service.id) ? 'selected' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceToggle(service.id);
                            }}
                          >
                            <div className="addon-option-content">
                              <div className="option-text">
                                <span className="option-name">{service.name}</span>
                                <span className="option-details">
                                  ${service.price} • {service.duration}
                                </span>
                              </div>
                              <div
                                className={`addon-chip ${formData.services.includes(service.id) ? 'active' : ''}`}
                                aria-hidden="true"
                              >
                                <span className="addon-chip-icon">
                                  {formData.services.includes(service.id) ? '✓' : '+'}
                                </span>
                                <span className="addon-chip-label">
                                  {formData.services.includes(service.id) ? 'Added' : 'Add'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Specialty Services Group */}
                      <div className="dropdown-group">
                        <div className="dropdown-group-label">Specialty Services</div>
                        {specialtyServices.map(service => (
                          <div
                            key={service.id}
                            className={`dropdown-option addon-option ${formData.services.includes(service.id) ? 'selected' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceToggle(service.id);
                            }}
                          >
                            <div className="addon-option-content">
                              <div className="option-text">
                                <span className="option-name">{service.name}</span>
                                <span className="option-details">
                                  ${service.price} • {service.duration}
                                </span>
                              </div>
                              <div
                                className={`addon-chip ${formData.services.includes(service.id) ? 'active' : ''}`}
                                aria-hidden="true"
                              >
                                <span className="addon-chip-icon">
                                  {formData.services.includes(service.id) ? '✓' : '+'}
                                </span>
                                <span className="addon-chip-label">
                                  {formData.services.includes(service.id) ? 'Added' : 'Add'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add-On Services Group */}
                      <div className="dropdown-group">
                        <div className="dropdown-group-label">Add-On Services (Optional - Select Multiple)</div>
                        {addOnServices.map(addon => (
                          <div
                            key={addon.id}
                            className={`dropdown-option addon-option ${formData.addOns.includes(addon.id) ? 'selected' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddOnToggle(addon.id);
                            }}
                          >
                            <div className="addon-option-content">
                              <div className="option-text">
                                <span className="option-name">{addon.name}</span>
                                <span className="option-details">
                                  +${addon.price} • {addon.duration}
                                </span>
                              </div>
                              <div
                                className={`addon-chip ${formData.addOns.includes(addon.id) ? 'active' : ''}`}
                                aria-hidden="true"
                              >
                                <span className="addon-chip-icon">
                                  {formData.addOns.includes(addon.id) ? '✓' : '+'}
                                </span>
                                <span className="addon-chip-label">
                                  {formData.addOns.includes(addon.id) ? 'Added' : 'Add'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Service Summary */}
            {formData.services.length > 0 && (
              <div className="selected-service-display">
                <div className="selected-service-info">
                  <h4>
                    Selected {formData.services.length + formData.addOns.length === 1 ? 'Service' : 'Services'}
                    {formData.services.length + formData.addOns.length > 1 && (
                      <span className="service-count"> ({formData.services.length + formData.addOns.length})</span>
                    )}
                  </h4>
                  <div className="selected-services-list">
                    {allMainServices
                      .filter(service => formData.services.includes(service.id))
                      .map((service) => (
                        <div key={service.id} className="selected-main-service">
                          <span className="main-service-name">{service.name}</span>
                          <div className="service-details">
                            <span className="price">${service.price}</span>
                            <span className="separator">•</span>
                            <span className="duration">{service.duration}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  
                  {formData.addOns.length > 0 && (
                    <div className="selected-addons">
                      <span className="addons-label">Add-Ons:</span>
                      {addOnServices
                        .filter(addon => formData.addOns.includes(addon.id))
                        .map((addon, index) => (
                          <span key={addon.id} className="addon-pill">
                            {addon.name} (+${addon.price})
                          </span>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        const isEarliestAvailable = formData.barber === 'earliest';
        const earliestTimes = getEarliestAvailableTimes();
        const upcomingDays = getUpcomingDays(14);
        const selectedDate = formData.date ? new Date(formData.date) : new Date();
        const calendarDays = getDaysInMonth(viewingMonth, viewingYear);
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        return (
          <div className="booking-step">
            <h3>Select Date & Time</h3>
            <div className="custom-calendar-container">
              {/* Month/Year Selector */}
              <div className="calendar-header">
                <div className="month-year-selector">
                  <button 
                    className="month-nav-btn prev"
                    onClick={() => handleMonthChange('prev')}
                    aria-label="Previous month"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <div 
                    className="month-year-display"
                    onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
                  >
                    <span className="month-name">{getMonthName(viewingMonth)}</span>
                    <span className="year-display">
                      {viewingYear}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>
                  <button 
                    className="month-nav-btn next"
                    onClick={() => handleMonthChange('next')}
                    aria-label="Next month"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                  
                  {/* Month/Year Dropdown */}
                  {monthDropdownOpen && (
                    <div className="month-year-dropdown">
                      <div className="month-selector">
                        {months.map((month, index) => (
                          <button
                            key={index}
                            className={`month-option ${viewingMonth === index ? 'selected' : ''}`}
                            onClick={() => {
                              setViewingMonth(index);
                              setMonthDropdownOpen(false);
                            }}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                      <div className="year-selector">
                        {getYears().map(year => (
                          <button
                            key={year}
                            className={`year-option ${viewingYear === year ? 'selected' : ''}`}
                            onClick={() => {
                              setViewingYear(year);
                              setMonthDropdownOpen(false);
                            }}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Horizontal Date Scroller */}
              <div className="date-scroller">
                {upcomingDays.map((day, index) => {
                  const dayDate = formatDate(day);
                  const isPast = isPastDate(day);
                  return (
                    <button
                      key={index}
                      className={`date-scroll-item ${isSelected(day) ? 'selected' : ''} ${isPast ? 'past' : ''} ${isToday(day) ? 'today' : ''}`}
                      onClick={() => !isPast && handleDateSelect(day)}
                      disabled={isPast}
                    >
                      <div className="date-number">{day.getDate()}</div>
                      <div className="date-day">{getDayName(day)}</div>
                      {isSelected(day) && <div className="selected-indicator"></div>}
                    </button>
                  );
                })}
                <button 
                  className="date-scroll-item more-dates"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              {/* Full Calendar Grid (shown when dropdown is open) */}
              {calendarOpen && (
                <div className="calendar-grid-container">
                  <div className="calendar-weekdays">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={index} className="weekday">{day}</div>
                    ))}
                  </div>
                  <div className="calendar-grid">
                    {calendarDays.map((day, index) => {
                      const dayDate = formatDate(day);
                      const isCurrentMonth = day.getMonth() === viewingMonth;
                      const isPast = isPastDate(day);
                      return (
                        <button
                          key={index}
                          className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isSelected(day) ? 'selected' : ''} ${isPast ? 'past' : ''} ${isToday(day) ? 'today' : ''}`}
                          onClick={() => !isPast && isCurrentMonth && handleDateSelect(day)}
                          disabled={isPast || !isCurrentMonth}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                  <div className="calendar-actions">
                    <button className="calendar-btn clear" onClick={() => {
                      setFormData(prev => ({ ...prev, date: '', time: '' }));
                      setCalendarOpen(false);
                    }}>
                      Clear
                    </button>
                    <button className="calendar-btn today" onClick={() => {
                      const today = new Date();
                      handleDateSelect(today);
                      setViewingMonth(today.getMonth());
                      setViewingYear(today.getFullYear());
                    }}>
                      Today
                    </button>
                  </div>
                </div>
              )}

              {/* Selected Date Display */}
              {formData.date && (
                <div className="selected-date-display">
                  {getFullDayName(selectedDate)}
                </div>
              )}

              {/* Time Slots */}
              {formData.date && (
                <div className="time-slots-section">
                  {isEarliestAvailable && (
                    <p className="earliest-times-description">
                      Select a time and we'll automatically assign the available barber
                    </p>
                  )}
                  <div className={isEarliestAvailable ? "time-grid earliest-times" : "time-grid"}>
                    {isEarliestAvailable ? (
                      earliestTimes.map(({ time, barber }) => (
                        <button
                          key={time}
                          className={`time-slot earliest-time-slot ${formData.time === time ? 'selected' : ''}`}
                          onClick={() => handleTimeSelect(time, barber)}
                        >
                          <span className="time-slot-time">{time}</span>
                          <span className="time-slot-barber">{barber.name}</span>
                        </button>
                      ))
                    ) : (
                      timeSlots.map(time => (
                        <button
                          key={time}
                          className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        const confirmedBarber = allBarbers.find(b => b.id === formData.barber);
        const selectedServices = allMainServices.filter(s => formData.services.includes(s.id));
        const selectedLocation = locations.find(l => l.id === formData.location);
        const selectedAddOns = addOnServices.filter(addon => formData.addOns.includes(addon.id));
        const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0) + selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
        
        return (
          <div className="booking-step">
            <h3>Confirm Appointment</h3>
            <div className="confirmation-details">
              <div className="detail-row">
                <span className="label">Name:</span>
                <span className="value">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{formData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="label">Barber:</span>
                <span className="value">{confirmedBarber?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Services:</span>
                <span className="value services-value">
                  {selectedServices.map(service => service.name).join(', ')}
                </span>
              </div>
              {selectedAddOns.length > 0 && (
                <div className="detail-row">
                  <span className="label">Add-Ons:</span>
                  <span className="value services-value">
                    {selectedAddOns.map(addon => addon.name).join(', ')}
                  </span>
                </div>
              )}
              <div className="detail-row">
                <span className="label">Total Price:</span>
                <span className="value total-price">${totalPrice}</span>
              </div>
              <div className="detail-row">
                <span className="label">Location:</span>
                <span className="value">
                  {selectedLocation?.name || confirmedBarber?.location}
                  <br />
                  {selectedLocation?.address || (confirmedBarber?.location === 'Sandy Springs' ? '6309 Roswell Road NE #2D, Sandy Springs, GA 30328' : '572 Hank Aaron Dr Suite 1120, Atlanta, GA 30312')}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Date & Time:</span>
                <span className="value">{formData.date} at {formData.time}</span>
              </div>
            </div>

            {/* Policy Agreement Section */}
            <div className="policy-agreement-section">
              <div className="policy-checkbox-wrapper">
                <label className="policy-checkbox-label">
                  <input
                    type="checkbox"
                    checked={policyAgreed}
                    onChange={(e) => setPolicyAgreed(e.target.checked)}
                    className="policy-checkbox"
                    required
                  />
                  <span className="policy-text">
                    I agree to arrive 10–15 minutes early to allow time for my initial consultation prior to my service. 
                    I am aware of the cancellation policy: Missed appointments incur a $15 no-show fee, which will be applied to my next booking.
                  </span>
                </label>
              </div>
              <button 
                className="policy-read-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPolicy(!showPolicy);
                }}
              >
                {showPolicy ? 'Hide' : 'Read'} Cancellation Policy
              </button>

              {showPolicy && (
                <div className="policy-content">
                  <h4>Cancellation Policy</h4>
                  <p>
                    <strong>No-Show Fee:</strong> Missed appointments without prior notice will incur a $15 fee, 
                    which will be applied to your next booking.
                  </p>
                  <p>
                    <strong>Cancellation Notice:</strong> Please provide at least 24 hours notice if you need to 
                    cancel or reschedule your appointment.
                  </p>
                  <p>
                    <strong>Late Arrivals:</strong> Arriving more than 15 minutes late may result in your appointment 
                    being rescheduled to accommodate other clients.
                  </p>
                  <p>
                    We understand that emergencies happen. Please contact us as soon as possible if you need to make 
                    changes to your appointment.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="booking-step">
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group half">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group phone-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <motion.button 
                className="btn-book-now" 
                onClick={openPopupForm}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: "linear-gradient(135deg,rgb(5, 61, 90) 0%,rgb(77, 172, 161) 50%, #085078 100%)",
                  
                  backgroundSize: "200% 200%"
                }}
              >
                Book Now
              </motion.button>
            </div>
            
            {/* Social Media Links */}
            <div className="booking-social-links">
              <a 
                href="https://www.instagram.com/clipculturebarbershop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              
              <a 
                href="https://www.facebook.com/clipculturebarbershop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="booking-step">
            <h3>Select Service</h3>
            <div className="services-grid">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`service-card ${formData.service === service.id ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <h4>{service.name}</h4>
                  <p className="price">{service.price}</p>
                  <p className="duration">{service.duration}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="booking-step">
            <h3>Select Location</h3>
            <div className="locations-list">
              {locations.map(location => (
                <div
                  key={location.id}
                  className={`location-card ${formData.location === location.id ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect(location.id)}
                >
                  <h4>{location.name}</h4>
                  <p>{location.address}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="booking-step">
            <h3>Select Date & Time</h3>
            <div className="form-group">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="time-slots">
              <h4>Available Times</h4>
              <div className="time-grid">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        const selectedService = services.find(s => s.id === formData.service);
        const selectedLocation = locations.find(l => l.id === formData.location);
        
        return (
          <div className="booking-step">
            <h3>Confirm Appointment</h3>
            <div className="confirmation-details">
              <div className="detail-row">
                <span className="label">Name:</span>
                <span className="value">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{formData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="label">Service:</span>
                <span className="value">{selectedService?.name} - {selectedService?.price}</span>
              </div>
              <div className="detail-row">
                <span className="label">Location:</span>
                <span className="value">{selectedLocation?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date & Time:</span>
                <span className="value">{formData.date} at {formData.time}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    navigate('/');
  };

  return (
    <>
      <div className="booking-form-container">
        <div className="booking-form">
          <div className="booking-header">
            <h2>Book Your Appointment</h2>
            <p className="booking-subtitle">Walk-ins are welcome!</p>
            <div className="step-indicator">
              <span>Step {currentStep} of 5</span>
            </div>
          </div>

          {renderStep()}

          <div className="booking-actions">
            {currentStep > 1 && (
              <button className="btn-back" onClick={prevStep}>
                ← Back
              </button>
            )}
            
            {currentStep > 1 && currentStep < 5 ? (
              <button 
                className="btn-next" 
                onClick={nextStep}
                disabled={!isStepValid()}
              >
                Next →
              </button>
            ) : currentStep === 5 ? (
              <button 
                className="btn-confirm" 
                onClick={handleSubmit}
                disabled={!isStepValid()}
              >
                Confirm Appointment
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Popup Form Modal - Rendered using Portal at document root */}
      {showPopupForm && ReactDOM.createPortal(
        <div className="popup-overlay" onClick={closePopupForm}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            {popupStep > 1 && (
              <button 
                className="popup-back-btn" 
                onClick={prevPopupStep}
                aria-label="Go back"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}
            
            <button 
              className="popup-close" 
              onClick={closePopupForm}
              aria-label="Close"
            >
              ×
            </button>
            
            <div className="popup-header">
              <h2>Complete Your Booking</h2>
            </div>
            
            <div className="popup-content">
              <div className="popup-form-container">
                <div className="popup-form-content">
                  {/* Step Progress Indicator */}
                  <div className="step-progress-container">
                    {/* Compact Step Header (visible on mobile) */}
                    <div className="step-header-compact">
                      <div className="step-title-text">
                        Step {popupStep} of 5 — {
                          popupStep === 1 ? 'Contact' :
                          popupStep === 2 ? 'Barber' :
                          popupStep === 3 ? 'Service' :
                          popupStep === 4 ? 'Date & Time' :
                          'Confirm'
                        }
                      </div>
                      <div className="step-progress-bar">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <div 
                            key={step}
                            className={`step-segment ${popupStep >= step ? 'active' : ''}`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Original Step Progress (visible on desktop) */}
                    <div className="step-progress">
                      <div className={`step-item ${popupStep >= 1 ? 'active' : ''} ${popupStep > 1 ? 'completed' : ''}`}>
                        <div className="step-circle">1</div>
                        <div className="step-label">Contact</div>
                      </div>
                      <div className={`step-line ${popupStep > 1 ? 'completed' : ''}`}></div>
                      
                      <div className={`step-item ${popupStep >= 2 ? 'active' : ''} ${popupStep > 2 ? 'completed' : ''}`}>
                        <div className="step-circle">2</div>
                        <div className="step-label">Barber</div>
                      </div>
                      <div className={`step-line ${popupStep > 2 ? 'completed' : ''}`}></div>
                      
                      <div className={`step-item ${popupStep >= 3 ? 'active' : ''} ${popupStep > 3 ? 'completed' : ''}`}>
                        <div className="step-circle">3</div>
                        <div className="step-label">Service</div>
                      </div>
                      <div className={`step-line ${popupStep > 3 ? 'completed' : ''}`}></div>
                      
                      <div className={`step-item ${popupStep >= 4 ? 'active' : ''} ${popupStep > 4 ? 'completed' : ''}`}>
                        <div className="step-circle">4</div>
                        <div className="step-label">Date & Time</div>
                      </div>
                      <div className={`step-line ${popupStep > 4 ? 'completed' : ''}`}></div>
                      
                      <div className={`step-item ${popupStep >= 5 ? 'active' : ''}`}>
                        <div className="step-circle">5</div>
                        <div className="step-label">Confirm</div>
                      </div>
                    </div>
                  </div>

                  {renderPopupStep()}

                  <div className="popup-actions">
                    {popupStep > 1 && (
                      <button className="btn-back" onClick={prevPopupStep}>
                        ← Back
                      </button>
                    )}
                    
                    {popupStep < 5 ? (
                      <button 
                        className="btn-next" 
                        onClick={nextPopupStep}
                        disabled={!isStepValid(popupStep)}
                      >
                        Next →
                      </button>
                    ) : (
                      <button 
                        className="btn-confirm" 
                        onClick={handleSubmit}
                        disabled={!isStepValid(popupStep)}
                      >
                        Confirm Appointment
                      </button>
                    )}
                  </div>

                  {/* Validation Error Message - Show when step is invalid */}
                  {!isStepValid(popupStep) && (
                    <div className="validation-error-message">
                      {getValidationErrorMessage(popupStep)}
                    </div>
                  )}

                  {/* Featured Products Section - Only show on step 5 (Confirmation) */}
                  {popupStep === 5 && (
                    <div className="booking-products-section">
                      <h4 className="booking-products-title">Shop Our Grooming Products</h4>
                      <div className="booking-products-grid">
                        {featuredProducts.map((product) => (
                          <Link 
                            key={product.id} 
                            to={`/products/${product.slug}`} 
                            className="booking-product-card"
                            onClick={() => setShowPopupForm(false)}
                          >
                            <div className="booking-product-image">
                              <img src={product.image} alt={product.name} />
                            </div>
                            <div className="booking-product-info">
                              <h5 className="booking-product-name">{product.name}</h5>
                              <p className="booking-product-size">{product.size}</p>
                              <p className="booking-product-price">${product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link to="/shop" className="view-all-products-btn" onClick={() => setShowPopupForm(false)}>
                        View All Products →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Success Message Modal - Rendered using Portal at document root, above all other elements */}
      {showSuccessMessage && ReactDOM.createPortal(
        (() => {
          const confirmedBarber = allBarbers.find(b => b.id === formData.barber);
          const locationName = formData.location === 'sandy-springs' ? 'Sandy Springs' : 'Summerhill';
          const locationAddress = formData.location === 'sandy-springs' 
            ? '6309 Roswell Road NE #2D, Sandy Springs, GA 30328'
            : '572 Hank Aaron Dr Suite 1120, Atlanta, GA 30312';
          
          return (
            <div className="success-message-overlay" onClick={handleCloseSuccessMessage}>
              <div className="success-message-container" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="success-close-btn"
                  onClick={handleCloseSuccessMessage}
                  aria-label="Close"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="success-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" stroke="var(--primary-green)" fill="none" strokeWidth="2"/>
                    <path d="M9 12l2 2 4-4" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="success-title">Appointment confirmed!</h2>
                <div className="success-details">
                  <p className="success-message">
                    We'll be ready for you, {formData.firstName}— sharp lines, fresh vibes!
                  </p>
                  <div className="success-appointment-info">
                    <h3>Your Appointment Details:</h3>
                    <div className="success-info-grid">
                      <div className="success-info-item success-date-time-row">
                        <div className="success-date-time-group">
                          <span className="success-label">Date:</span>
                          <span className="success-value">{formatSuccessDate(formData.date)}</span>
                        </div>
                        <div className="success-date-time-group">
                          <span className="success-label">Time:</span>
                          <span className="success-value">{formData.time}</span>
                        </div>
                      </div>
                      <div className="success-info-item">
                        <span className="success-label">Location:</span>
                        <span className="success-value">
                          {locationName} - {locationAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="success-reminder">
                    Remember to arrive 10-15 minutes early for your appointment.
                  </p>
                  <button 
                    className="success-btn-home"
                    onClick={handleCloseSuccessMessage}
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </div>
          );
        })(),
        document.body
      )}

      {/* Portfolio Modal */}
      {showPortfolio && portfolioBarber && ReactDOM.createPortal(
        <div className="portfolio-overlay" onClick={handleClosePortfolio}>
          <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="portfolio-close-btn"
              onClick={handleClosePortfolio}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h3 className="portfolio-title">{portfolioBarber.name}'s Work</h3>
            
            <div className="portfolio-grid">
              {portfolioImages.map((image, index) => (
                <div key={index} className="portfolio-image-wrapper">
                  <img src={image} alt={`${portfolioBarber.name}'s work ${index + 1}`} />
                </div>
              ))}
            </div>

            <button 
              className="portfolio-book-btn"
              onClick={handleBookFromPortfolio}
            >
              Book {portfolioBarber.name}'s Services
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Bio Modal */}
      {showBio && bioBarber && ReactDOM.createPortal(
        <div className="bio-overlay" onClick={handleCloseBio}>
          <div className="bio-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="bio-close-btn"
              onClick={handleCloseBio}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="bio-content">
              <div className="bio-header">
                <div className="bio-image-wrapper">
                  <img src={bioBarber.image} alt={bioBarber.name} />
                </div>
                <div className="bio-header-info">
                  <h3 className="bio-name">{bioBarber.name}</h3>
                  {bioBarber.id === 'david-brown' && (
                    <p className="bio-title">{bioBarber.title}</p>
                  )}
                  <p className="bio-location">{bioBarber.location}</p>
                </div>
              </div>

              <div className="bio-text">
                <p>{bioBarber.bio}</p>
              </div>

              <button 
                className="bio-book-btn"
                onClick={handleBookFromBio}
              >
                Book with {bioBarber.name}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default BookingForm;
