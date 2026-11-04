import { beforeEach, describe, expect, it, vi } from 'vitest';
import emailjs from '@emailjs/browser';
import { submitFormWithAttachments } from '../services/formSubmissionService.js';

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn(), init: vi.fn() } }));

beforeEach(() => vi.clearAllMocks());

describe('form email routing', () => {
  it('sends the notification and branded acknowledgement to their separate recipients', async () => {
    emailjs.send.mockResolvedValue({ status: 200 });

    await submitFormWithAttachments('Franchise Application', {
      fullName: 'Jordan Smith',
      email: 'jordan@example.com',
      message: 'Interested in a franchise',
    });

    expect(emailjs.send).toHaveBeenCalledTimes(2);
    const internal = emailjs.send.mock.calls[0][2];
    const acknowledgement = emailjs.send.mock.calls[1][2];
    expect(internal.to_email).not.toBe(acknowledgement.to_email);
    expect(acknowledgement.to_email).toBe('jordan@example.com');
    expect(acknowledgement.acknowledgement).toContain('a Clip Culture franchise');
    expect(acknowledgement.next_step).toContain('within 48 hours');
    expect(acknowledgement.logo_url).toBe('https://clip-culture.netlify.app/clip-culture-email-logo.png');
  });

  it('does not promise a reply when the internal notification fails', async () => {
    emailjs.send.mockRejectedValue({ text: 'Delivery failed' });

    await expect(submitFormWithAttachments('Contact Us', {
      fullName: 'Jordan Smith',
      email: 'jordan@example.com',
    })).rejects.toThrow('Delivery failed');

    expect(emailjs.send).toHaveBeenCalledTimes(1);
  });
});
