import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import NavbarDesktop from '../components/NavbarDesktop.jsx';
import NavbarMobile from '../components/NavbarMobile.jsx';
import Apply from '../pages/Apply.jsx';
import Advertise from '../pages/Advertise.jsx';
import Franchise from '../pages/Franchise.jsx';
import ShopByCategory from '../components/ShopByCategory.jsx';
import SpeakingEngagements from '../pages/SpeakingEngagements.jsx';

vi.mock('../components/Barbershop_Gallery.jsx', () => ({ default: () => null }));
vi.mock('../components/Gallery.jsx', () => ({ default: () => null }));
vi.mock('../components/JoinUs.jsx', () => ({ default: () => null }));

function CurrentPath() {
  const location = useLocation();
  return <output data-testid="current-path">{location.pathname}</output>;
}

beforeEach(() => {
  window.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('main site controls', () => {
  it('opens the Shop menu and follows the Vending Machines item', () => {
    render(<MemoryRouter initialEntries={['/']}><NavbarDesktop /><CurrentPath /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: /Shop/ }));
    expect(screen.getByRole('link', { name: 'Vending Machines' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Vending Machines' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/vending-machines');
    expect(screen.queryByRole('link', { name: 'Vending Machines' })).not.toBeInTheDocument();
  });

  it('expands the mobile Shop menu and closes it after choosing Vending Machines', () => {
    render(<MemoryRouter initialEntries={['/']}><NavbarMobile /><CurrentPath /></MemoryRouter>);
    const menuToggle = screen.getByRole('button', { name: 'Toggle mobile menu' });
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    const shopToggle = screen.getByRole('button', { name: 'Shop' });
    fireEvent.click(shopToggle);
    expect(shopToggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('link', { name: 'Vending Machines' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/vending-machines');
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the team application, validates it, and closes it', () => {
    render(<Apply />);
    fireEvent.click(screen.getByRole('button', { name: 'Apply Now' }));
    expect(screen.getByRole('heading', { name: 'Apply to Join Our Team' })).toBeInTheDocument();
    fireEvent.submit(document.querySelector('.form0modal-form'));
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(screen.queryByRole('heading', { name: 'Apply to Join Our Team' })).not.toBeInTheDocument();
  });

  it('opens and closes both advertising request forms', () => {
    render(<Advertise />);
    fireEvent.click(screen.getByRole('button', { name: 'Purchase Package' }));
    expect(screen.getByRole('heading', { name: 'Purchase Advertising Package' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    fireEvent.click(screen.getByRole('button', { name: 'Request Information' }));
    expect(screen.getByRole('heading', { name: 'Request Advertising Information' })).toBeInTheDocument();
  });

  it('opens and validates the speaking inquiry form', () => {
    render(<SpeakingEngagements />);
    fireEvent.click(screen.getByRole('button', { name: 'Inquire Today' }));
    expect(screen.getByRole('heading', { name: 'Book David Brown for Your Event' })).toBeInTheDocument();
    fireEvent.submit(document.querySelector('.form0modal-form'));
    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
  });

  it('lets keyboard users open the Vending Machines category card', () => {
    vi.useFakeTimers();
    const { container } = render(<MemoryRouter initialEntries={['/']}><ShopByCategory /><CurrentPath /></MemoryRouter>);
    const card = [...container.querySelectorAll('.category-card')].find((item) => item.textContent.trim() === 'Vending Machines');
    expect(card).toHaveAttribute('role', 'link');
    expect(card).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(card, { key: 'Enter' });
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/vending-machines');
  });

  it('opens and closes a franchise FAQ and both inquiry actions', () => {
    render(<Franchise />);
    const faq = screen.getByRole('button', { name: 'What does it cost to open a Clip Culture Barbershop?' });
    expect(faq).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(faq);
    expect(faq).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(faq);
    expect(faq).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'Request Information' }));
    expect(screen.getByRole('heading', { name: 'Request Franchise Information' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    fireEvent.click(screen.getByRole('button', { name: 'Apply Now' }));
    expect(screen.getByRole('heading', { name: 'Apply for Franchise' })).toBeInTheDocument();
  });
});
