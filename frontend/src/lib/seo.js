export const DEFAULT_SITE_URL = 'https://www.clipculturebarbershop.com';

export const pages = {
  '/': {
    title: 'Clip Culture Barbershop | Haircuts in Sandy Springs, GA',
    description: 'Visit Clip Culture Barbershop in Sandy Springs for precision haircuts, fades, beard grooming, and a welcoming shop experience. Walk-ins welcome.',
  },
  '/sandysprings': {
    title: 'Sandy Springs Barbershop | Clip Culture',
    description: 'Find Clip Culture Barbershop at 6309 Roswell Road NE #2D in Sandy Springs, GA. See shop hours, services, and booking options.',
  },
  '/faqs': { title: 'Appointment FAQs | Clip Culture Barbershop', description: 'Get answers about preparing for a haircut, arriving for your appointment, children’s visits, and booking at Clip Culture in Sandy Springs.' },
  '/services': {
    title: 'Haircuts, Fades & Beard Services | Clip Culture Sandy Springs',
    description: 'Explore haircuts, fades, beard trims, hot towel shaves, and specialty grooming at Clip Culture Barbershop in Sandy Springs, Georgia.',
  },
  '/about': {
    title: 'Our Story & Founder David Brown | Clip Culture Barbershop',
    description: 'Founded by David Brown in Sandy Springs in 2017, Clip Culture brings together barbering, community, products, and education.',
  },
  '/shop': { title: 'Shop Grooming Products, Apparel & Books | Clip Culture', description: 'Explore Clip Culture grooming products, apparel, and books from our Sandy Springs barbershop.' },
  '/book-now': { title: 'Book a Haircut | Clip Culture Sandy Springs', description: 'Book your next haircut or grooming appointment at Clip Culture Barbershop in Sandy Springs, Georgia.' },
  '/booking': { title: 'Choose Your Barber | Clip Culture Sandy Springs', description: 'Choose a barber and request an appointment at Clip Culture Barbershop in Sandy Springs, Georgia.' },
  '/mentorship': { title: 'Barber Mentorship | Clip Culture', description: 'Explore mentorship and education with Clip Culture founder David Brown.' },
  '/advertise': { title: 'Advertise at Clip Culture Barbershop', description: 'Reach the Clip Culture community through advertising opportunities at our Sandy Springs barbershop.' },
  '/vending-machines': { title: 'Vending Machine Space | Clip Culture Sandy Springs', description: 'Explore vending machine partnership opportunities inside Clip Culture Barbershop in Sandy Springs.' },
  '/franchise': { title: 'Franchise Opportunities | Clip Culture', description: 'Learn about Clip Culture Barbershop franchise opportunities and our approach to barbering and community.' },
  '/apply': { title: 'Join the Clip Culture Team | Sandy Springs', description: 'Explore barbering career opportunities at Clip Culture Barbershop in Sandy Springs.' },
  '/speaking-engagements': { title: 'Speaking Engagements | David Brown, Clip Culture', description: 'Invite Clip Culture founder David Brown to speak about barbering, business, and building community.' },
};

export function pageMeta(pathname, siteUrl = DEFAULT_SITE_URL) {
  const path = pathname.replace(/\/$/, '') || '/';
  let page = pages[path];
  if (!page && /^\/(products|apparel|barber)\/[a-z0-9-]+$/.test(path)) {
    const name = path.split('/').at(-1).split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
    page = { title: `${name} | Clip Culture`, description: `Learn about ${name} from Clip Culture Barbershop in Sandy Springs, Georgia.` };
  }
  page ||= { title: 'Clip Culture Barbershop', description: pages['/'].description };
  return { ...page, url: `${siteUrl.replace(/\/$/, '')}${path === '/' ? '/' : `${path}/`}` };
}

export function businessSchema(siteUrl = DEFAULT_SITE_URL) {
  const url = siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    '@id': `${url}/#barbershop`,
    name: 'Clip Culture Barbershop',
    url: `${url}/`,
    image: `${url}/og-image.webp`,
    telephone: '+1-404-458-2993',
    email: 'info@clipculturebarbershop.com',
    potentialAction: { '@type': 'ReserveAction', target: `${url}/book-now/` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6309 Roswell Road NE #2D',
      addressLocality: 'Sandy Springs',
      addressRegion: 'GA',
      postalCode: '30328',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '16:00' },
    ],
    sameAs: [
      'https://www.instagram.com/clipculturebarbershop/',
      'https://facebook.com/clipculture',
    ],
  };
}
