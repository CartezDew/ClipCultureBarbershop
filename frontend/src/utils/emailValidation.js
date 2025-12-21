/**
 * Email validation utility
 * Validates email addresses and provides user-friendly error messages
 */

/**
 * Validates an email address
 * @param {string} email - Email address to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Check for invalid patterns like "noemail" or "123email"
  const invalidPatterns = [
    /^noemail/i,
    /^123email/i,
    /^testemail/i,
    /^fakeemail/i,
    /^invalidemail/i
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedEmail)) {
      return {
        isValid: false,
        error: 'Please provide a valid email'
      };
    }
  }

  // Check if @ symbol is missing
  if (!trimmedEmail.includes('@')) {
    return {
      isValid: false,
      error: 'Please provide a valid email'
    };
  }

  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Please provide a valid email'
    };
  }

  // Additional validation: ensure domain has at least one dot after @
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2 || !parts[1].includes('.')) {
    return {
      isValid: false,
      error: 'Please provide a valid email'
    };
  }

  // Additional validation: ensure domain part is valid
  const domain = parts[1];
  if (domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) {
    return {
      isValid: false,
      error: 'Please provide a valid email'
    };
  }

  return {
    isValid: true,
    error: ''
  };
};

/**
 * Simple email validation check (returns boolean)
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  return validateEmail(email).isValid;
};

export default validateEmail;

