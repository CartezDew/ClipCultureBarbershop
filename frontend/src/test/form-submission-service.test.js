import { beforeEach, describe, expect, it, vi } from 'vitest';
import emailjs from '@emailjs/browser';
import { submitFormWithAttachments } from '../services/formSubmissionService.js';
import { getFormResponse } from '../lib/formResponseCopy.js';

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn(), init: vi.fn() } }));

beforeEach(() => vi.clearAllMocks());

describe('form email routing', () => {
  it.each([
    ['Apply to Join Our Team', 'team application'],
    ['Franchise Request Info', 'franchise inquiry'],
    ['Franchise Application', 'franchise application'],
    ['Vending Machine Space Inquiry', 'vending inquiry'],
    ['Book a Coaching Call', 'coaching request'],
    ['Enroll in Mentorship', 'mentorship inquiry'],
    ['Book David Brown for Your Event', 'speaking inquiry'],
    ['Advertise Purchase Package', 'advertising package request'],
    ['Advertise Request Info', 'advertising inquiry'],
    ['Contact Us', 'message'],
  ])('uses %s copy for its confirmation', async (formName, topic) => {
    emailjs.send.mockResolvedValue({ status: 200 });
    const copy = getFormResponse(formName, 'Jordan Smith');
    await submitFormWithAttachments(formName, { fullName: 'Jordan Smith', email: 'jordan@example.com' });

    expect(emailjs.send).toHaveBeenCalledTimes(2);
    const reply = emailjs.send.mock.calls[1][2];
    expect(reply.customer_subject).toBe(`We received your ${topic} | Clip Culture`);
    expect(reply.response_eyebrow).toBe(copy.eyebrow);
    expect(reply.response_title).toBe(copy.title);
    expect(reply.acknowledgement).toBe(copy.acknowledgement);
    expect(reply.greeting).toBe('Hi Jordan,');
    expect(reply.to_email).toBe('jordan@example.com');
  });

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
    expect(internal.logo_url).toBe('https://clip-culture.netlify.app/clip-culture-email-logo.png');
    expect(acknowledgement.to_email).toBe('jordan@example.com');
    expect(acknowledgement.acknowledgement).toContain('applying for a Clip Culture franchise');
    expect(acknowledgement.next_step).toContain('within 48 hours');
    expect(acknowledgement.join_culture).toBe(false);
    expect(acknowledgement.logo_url).toBe('https://clip-culture.netlify.app/clip-culture-email-logo.png');
  });

  it('marks the newsletter signup for its own welcome copy', async () => {
    emailjs.send.mockResolvedValue({ status: 200 });

    await submitFormWithAttachments('Join the Culture', { email: 'jordan@example.com' });

    expect(emailjs.send.mock.calls[1][2].join_culture).toBe(true);
    expect(emailjs.send.mock.calls[1][2].customer_subject).toBe('Welcome to the Culture | Clip Culture');
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
