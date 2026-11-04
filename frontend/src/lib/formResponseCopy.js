const formResponses = {
  'Apply to Join Our Team': ['team application', 'TEAM APPLICATION RECEIVED', 'Thank you for applying.', 'Thank you for your interest in joining the Clip Culture team. We received your application.'],
  'Franchise Request Info': ['franchise inquiry', 'FRANCHISE INQUIRY RECEIVED', 'Thank you for your interest.', 'Thank you for asking about a Clip Culture franchise. We received your request for information.'],
  'Franchise Application': ['franchise application', 'FRANCHISE APPLICATION RECEIVED', 'Thank you for applying.', 'Thank you for applying for a Clip Culture franchise. We received your application.'],
  'Vending Machine Space Inquiry': ['vending inquiry', 'VENDING INQUIRY RECEIVED', 'Thank you for reaching out.', 'Thank you for reaching out about a vending partnership. We received your inquiry.'],
  'Book a Coaching Call': ['coaching request', 'COACHING REQUEST RECEIVED', 'Thank you for reaching out.', 'Thank you for your interest in a coaching call. We received your request.'],
  'Enroll in Mentorship': ['mentorship inquiry', 'MENTORSHIP INQUIRY RECEIVED', 'Thank you for your interest.', 'Thank you for your interest in Clip Culture mentorship. We received your inquiry.'],
  'Book David Brown for Your Event': ['speaking inquiry', 'SPEAKING INQUIRY RECEIVED', 'Thank you for reaching out.', 'Thank you for considering David Brown for your event. We received your speaking inquiry.'],
  'Advertise Purchase Package': ['advertising package request', 'ADVERTISING REQUEST RECEIVED', 'Thank you for your interest.', 'Thank you for selecting a Clip Culture advertising package. We received your request.'],
  'Advertise Request Info': ['advertising inquiry', 'ADVERTISING INQUIRY RECEIVED', 'Thank you for reaching out.', 'Thank you for asking about advertising with Clip Culture. We received your request for information.'],
  'Contact Us': ['message', 'MESSAGE RECEIVED', 'Thank you for reaching out.', 'Thank you for contacting Clip Culture. We received your message.'],
  'Booking Form': ['booking request', 'BOOKING REQUEST RECEIVED', 'Thank you for reaching out.', 'Thank you for your interest in booking with Clip Culture. We received your request.'],
  'Booking Inquiry': ['booking inquiry', 'BOOKING INQUIRY RECEIVED', 'Thank you for reaching out.', 'Thank you for your interest in booking with Clip Culture. We received your inquiry.'],
  'Applicant Form': ['team application', 'TEAM APPLICATION RECEIVED', 'Thank you for applying.', 'Thank you for your interest in joining the Clip Culture team. We received your application.'],
  'Join the Culture': ['welcome', 'WELCOME TO THE CULTURE', 'You’re in. Welcome to Clip Culture.', 'Thanks for signing up. You’ll be first to hear about product drops, events, and news from the shop.'],
};

export const getFormResponse = (formName, name = '') => {
  const [topic, eyebrow, title, acknowledgement] = formResponses[formName] || formResponses['Contact Us'];
  const firstName = String(name).trim().split(/\s+/)[0];
  return {
    subject: topic === 'welcome' ? 'Welcome to the Culture | Clip Culture' : `We received your ${topic} | Clip Culture`,
    eyebrow,
    title,
    greeting: firstName ? `Hi ${firstName},` : 'Hello,',
    acknowledgement,
    nextStep: 'Someone from the Clip Culture team will be in contact within 48 hours.',
  };
};
