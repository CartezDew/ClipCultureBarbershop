import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import JoinUs from '../components/JoinUs.jsx';
import { submitFormWithAttachments } from '../services/formSubmissionService';

vi.mock('../services/formSubmissionService', () => ({ submitFormWithAttachments: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe('newsletter sign-up', () => {
  it('requires a valid email before sending', () => {
    render(<JoinUs />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(submitFormWithAttachments).not.toHaveBeenCalled();
  });

  it('keeps the entered email and shows an error if delivery fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    submitFormWithAttachments.mockRejectedValueOnce(new Error('Email unavailable'));
    render(<JoinUs />);
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'owner@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByRole('heading', { name: 'Oops! Something went wrong.' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toHaveValue('owner@example.com');
  });

  it('confirms a successful sign-up', async () => {
    submitFormWithAttachments.mockResolvedValueOnce({ success: true });
    render(<JoinUs />);
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'owner@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByRole('heading', { name: 'Thank you. Your email is added.' })).toBeInTheDocument();
    expect(submitFormWithAttachments).toHaveBeenCalledWith('Join the Culture', { email: 'owner@example.com' });
  });
});
