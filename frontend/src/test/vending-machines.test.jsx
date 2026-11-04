import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import VendingMachines from '../pages/VendingMachines.jsx';
import { submitFormWithAttachments } from '../services/formSubmissionService';

vi.mock('../services/formSubmissionService', () => ({ submitFormWithAttachments: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('vending machine inquiry', () => {
  it('sends the machine details and confirms receipt only after a successful submission', async () => {
    submitFormWithAttachments.mockResolvedValue({ success: true });
    render(<VendingMachines />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Full name *' }), { target: { value: 'Alex Owner' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address *' }), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone number *' }), { target: { value: '555-0100' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Business name *' }), { target: { value: 'Alex Vending' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'What products would the machine sell? *' }), { target: { value: 'Snacks' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Machine size or other details' }), { target: { value: '36 inches wide' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Send inquiry' }).closest('form'));

    await waitFor(() => expect(submitFormWithAttachments).toHaveBeenCalledWith('Vending Machine Space Inquiry', {
      fullName: 'Alex Owner', email: 'alex@example.com', phone: '555-0100', businessName: 'Alex Vending', products: 'Snacks', machineDetails: '36 inches wide',
    }));
    expect(await screen.findByRole('heading', { name: 'Thank you for reaching out.' })).toBeInTheDocument();
  });

  it('keeps the form visible when delivery fails', async () => {
    submitFormWithAttachments.mockRejectedValue(new Error('Email unavailable'));
    render(<VendingMachines />);
    fireEvent.submit(screen.getByRole('button', { name: 'Send inquiry' }).closest('form'));

    expect(await screen.findByRole('alert')).toHaveTextContent('We could not send your inquiry. Please try again.');
    expect(screen.getByRole('button', { name: 'Send inquiry' })).toBeInTheDocument();
  });
});
