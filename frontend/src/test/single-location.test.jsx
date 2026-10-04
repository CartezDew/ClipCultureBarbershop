import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookNow from '../pages/BookNow.jsx';
import Contact from '../components/Contact.jsx';

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.spyOn(window, 'open').mockImplementation(() => null);
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function renderBooking() {
  render(<MemoryRouter><BookNow /></MemoryRouter>);
}

describe('single-location booking', () => {
  it('offers team and owner booking without a location choice', () => {
    renderBooking();
    expect(screen.getByRole('button', { name: 'Book with the team' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book with David Brown' })).toBeInTheDocument();
    expect(document.querySelectorAll('.book-now-option-card')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Continue', exact: true }));
    expect(screen.getByText('Please choose the team or David to continue.')).toBeInTheDocument();
    expect(window.open).not.toHaveBeenCalled();
  });

  it.each([
    ['Book with the team', 'https://getsquire.com/booking/book/clip-culture-sandy-springs-sandy-springs?shopId=3af08ed5-5c33-400a-a1dc-43fc85582525'],
    ['Book with David Brown', 'https://clipculturebarbershop.as.me/schedule/c75249a7'],
  ])('keeps the policy gate before opening %s', (name, destination) => {
    renderBooking();
    fireEvent.click(screen.getByRole('button', { name, exact: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Continue', exact: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Complete', exact: true }));
    expect(window.open).not.toHaveBeenCalled();
    expect(screen.getByText('Please agree to the appointment policy to continue.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Complete', exact: true }));
    expect(window.open).toHaveBeenCalledWith(destination, '_blank', 'noopener,noreferrer');
  });

  it('presents one shop address alongside its hours', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>);
    expect(document.querySelectorAll('.contact__address')).toHaveLength(1);
    expect(screen.getByText('6309 Roswell Road NE #2D')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Shop Hours' })).toBeInTheDocument();
  });
});
