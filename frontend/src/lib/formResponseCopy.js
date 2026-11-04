const formTopics = {
  'Apply to Join Our Team': 'joining the Clip Culture team',
  'Franchise Request Info': 'a Clip Culture franchise',
  'Franchise Application': 'a Clip Culture franchise',
  'Vending Machine Space Inquiry': 'a vending partnership',
  'Book a Coaching Call': 'a coaching call',
  'Enroll in Mentorship': 'mentorship with Clip Culture',
  'Book David Brown for Your Event': 'a speaking engagement with David Brown',
  'Advertise Purchase Package': 'advertising with Clip Culture',
  'Advertise Request Info': 'advertising with Clip Culture',
  'Contact Us': 'Clip Culture',
  'Join the Culture': 'the Clip Culture community',
  'Booking Form': 'your appointment',
  'Booking Inquiry': 'booking with Clip Culture',
  'Applicant Form': 'joining the Clip Culture team',
};

export const getFormResponse = (formName, name = '') => {
  const firstName = String(name).trim().split(/\s+/)[0];
  const topic = formTopics[formName] || 'Clip Culture';

  return {
    subject: formName === 'Join the Culture'
      ? 'Welcome to the Culture | Clip Culture'
      : 'We received your message | Clip Culture',
    greeting: firstName ? `Hi ${firstName},` : 'Hello,',
    acknowledgement: `Thank you for reaching out about ${topic}. We received your submission.`,
    nextStep: 'Someone from the Clip Culture team will be in contact within 48 hours.',
  };
};
