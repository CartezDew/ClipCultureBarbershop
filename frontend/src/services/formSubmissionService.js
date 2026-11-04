/**
 * Form Submission Service
 * Sends form submissions via EmailJS with dual-email system:
 * - Internal notification → sent to business inbox (form data)
 * - Auto-reply → sent to customer (thank you message)
 */

import emailjs from '@emailjs/browser';
import { getFormResponse } from '../lib/formResponseCopy.js';

// Configuration from environment variables
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  INTERNAL_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_INTERNAL_TEMPLATE_ID,
  AUTOREPLY_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
  INTERNAL_TO_EMAIL: import.meta.env.VITE_EMAILJS_INTERNAL_TO_EMAIL || 'cartezmarkese57@gmail.com'
};

// Maximum fields the EmailJS template supports
const MAX_FIELDS = 15;

// Log config presence for debugging
console.log('EmailJS Config Status:', {
  SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID ? '✓ Set' : '✗ Missing',
  PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? '✓ Set' : '✗ Missing',
  INTERNAL_TEMPLATE_ID: EMAILJS_CONFIG.INTERNAL_TEMPLATE_ID ? '✓ Set' : '✗ Missing',
  AUTOREPLY_TEMPLATE_ID: EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID ? '✓ Set' : '✗ Missing',
  INTERNAL_TO_EMAIL: EMAILJS_CONFIG.INTERNAL_TO_EMAIL ? '✓ Set' : '✗ Missing'
});

/**
 * Convert camelCase to readable label
 */
const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Check if a value is non-empty
 */
const hasValue = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

/**
 * Build individual field params for EmailJS template
 */
const buildFieldParams = (formData) => {
  const params = {};
  const fieldsWithValues = [];

  Object.entries(formData).forEach(([key, value]) => {
    if (hasValue(value)) {
      const label = formatLabel(key);
      const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
      fieldsWithValues.push({ label, value: displayValue });
    }
  });

  for (let i = 1; i <= MAX_FIELDS; i++) {
    const field = fieldsWithValues[i - 1];
    params[`field_${i}_label`] = field ? field.label : '';
    params[`field_${i}_value`] = field ? field.value : '';
  }

  params.field_count = fieldsWithValues.length;
  return params;
};

/**
 * Format form data as plain text
 */
const formatFormDataAsText = (formData) => {
  const lines = [];
  
  Object.entries(formData).forEach(([key, value]) => {
    if (!hasValue(value)) return;
    const label = formatLabel(key);
    const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
    lines.push(`${label}: ${displayValue}`);
  });

  return lines.length > 0 ? lines.join('\n') : 'No form data provided.';
};

/**
 * Get user's name from form data
 */
const getUserName = (formData) => {
  if (formData.firstName && formData.lastName) {
    return `${formData.firstName} ${formData.lastName}`;
  }
  if (formData.fullName) {
    return formData.fullName;
  }
  if (formData.firstName) {
    return formData.firstName;
  }
  return 'Valued Customer';
};

/**
 * Check if form is "Join the Culture"
 */
const isJoinCultureForm = (formName) => {
  if (!formName) return false;
  return formName.toLowerCase().includes('join the culture');
};

/**
 * Submit form via EmailJS
 * 1. Internal notification → your inbox (form data)
 * 2. Auto-reply → customer's email (thank you message)
 */
export const submitFormWithAttachments = async (formName, formData) => {
  const results = {
    internalEmail: { sent: false, error: null },
    autoReply: { sent: false, skipped: false, reason: null, error: null }
  };

  // Validate config
  if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
    console.error('❌ EmailJS configuration missing. Check your .env file.');
    throw new Error('Email service not configured. Please contact support.');
  }

  const fieldParams = buildFieldParams(formData);
  const form_fields_text = formatFormDataAsText(formData);
  const fromName = getUserName(formData);
  
  // Get customer email - this is where the auto-reply will go
  const customerEmail = formData.email ? formData.email.trim() : null;
  const internalEmail = EMAILJS_CONFIG.INTERNAL_TO_EMAIL;

  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Determine form type for auto-reply
  const joinCulture = isJoinCultureForm(formName);
  const responseCopy = getFormResponse(formName, fromName === 'Valued Customer' ? '' : fromName);
  const browserOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || (
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(browserOrigin)
      ? 'https://clip-culture.netlify.app'
      : browserOrigin || 'https://clip-culture.netlify.app'
  );
  const customerSubject = responseCopy.subject;

  console.log('📋 Form Submission:', {
    formName,
    customerEmail: customerEmail || '(none)',
    internalEmail,
    joinCulture
  });

  // ============================================
  // 1. INTERNAL NOTIFICATION → Your inbox
  // ============================================
  if (EMAILJS_CONFIG.INTERNAL_TEMPLATE_ID) {
    const internalParams = {
      to_email: internalEmail,
      subject: `Clip Culture — ${formName} Submission`,
      form_name: formName,
      from_name: fromName,
      from_email: customerEmail || 'No email provided',
      reply_to: customerEmail || internalEmail,
      submission_label: 'Submitted',
      submitted_at: timestamp,
      page_url: pageUrl,
      form_fields_text: form_fields_text,
      ...fieldParams
    };

    console.log('📧 Sending INTERNAL notification to:', internalEmail);

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.INTERNAL_TEMPLATE_ID,
        internalParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      console.log('✅ Internal email sent:', response.status);
      results.internalEmail.sent = true;
    } catch (error) {
      console.error('❌ Internal email failed:', error.text);
      results.internalEmail.error = error;
    }
  }

  // ============================================
  // 2. AUTO-REPLY → Customer's email (NOT your inbox)
  // ============================================
  
  // Only send auto-reply if:
  // - Customer provided an email
  // - Customer email is NOT the same as internal email
  // - Auto-reply template is configured
  
  if (!customerEmail) {
    console.log('⏭️ Skipping auto-reply: Customer did not provide email');
    results.autoReply.skipped = true;
    results.autoReply.reason = 'No customer email provided';
  } else if (customerEmail.toLowerCase() === internalEmail.toLowerCase()) {
    console.log('⏭️ Skipping auto-reply: Customer email matches internal inbox');
    results.autoReply.skipped = true;
    results.autoReply.reason = 'Customer email matches internal inbox';
  } else if (!results.internalEmail.sent) {
    console.log('⏭️ Skipping auto-reply: Internal notification failed');
    results.autoReply.skipped = true;
    results.autoReply.reason = 'Internal notification failed';
  } else if (!EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID) {
    console.log('⏭️ Skipping auto-reply: Template not configured');
    results.autoReply.skipped = true;
    results.autoReply.reason = 'Auto-reply template not configured';
  } else {
    // SEND AUTO-REPLY TO CUSTOMER
    const autoReplyParams = {
      // THIS IS THE KEY: to_email goes to the CUSTOMER, not internal
      to_email: customerEmail,
      
      subject: customerSubject,
      customer_subject: customerSubject,
      form_name: formName,
      from_name: fromName,
      name: fromName,
      to_name: fromName,
      reply_to: internalEmail,
      greeting: responseCopy.greeting,
      acknowledgement: responseCopy.acknowledgement,
      next_step: responseCopy.nextStep,
      logo_url: `${siteUrl.replace(/\/$/, '')}/clip-culture-email-logo.png`,
      site_url: siteUrl,
      
      // Display flags for template
      join_culture_display: joinCulture ? 'block' : 'none',
      default_form_display: joinCulture ? 'none' : 'block',
      
      submitted_at: timestamp
    };

    console.log('📧 Sending AUTO-REPLY to CUSTOMER:', customerEmail);
    console.log('   Subject:', customerSubject);
    console.log('   (NOT sending to internal:', internalEmail, ')');

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID,
        autoReplyParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      console.log('✅ Auto-reply sent to customer:', response.status);
      results.autoReply.sent = true;
    } catch (error) {
      console.error('❌ Auto-reply failed:', error.text);
      results.autoReply.error = error;
    }
  }

  // Check if at least internal email succeeded
  if (!results.internalEmail.sent) {
    throw new Error(results.internalEmail.error?.text || 'Failed to send email');
  }

  return { success: true, message: 'Form submitted successfully', results };
};

/**
 * Initialize EmailJS
 */
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.PUBLIC_KEY) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('✅ EmailJS initialized');
  }
};

export default { submitFormWithAttachments, initEmailJS };
