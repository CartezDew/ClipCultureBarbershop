import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import Gallery from '../components/Gallery.jsx';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('gallery controls', () => {
  it('moves one image with the next button and restores controls after the transition', () => {
    vi.useFakeTimers();
    const { container } = render(<Gallery />);
    const wrapper = container.querySelector('.carousel-wrapper');
    const firstSlide = container.querySelector('.carousel-slide');
    Object.defineProperties(wrapper, {
      scrollWidth: { value: 1000, configurable: true },
      clientWidth: { value: 500, configurable: true },
      scrollLeft: { value: 0, configurable: true },
    });
    Object.defineProperty(firstSlide, 'offsetWidth', { value: 200, configurable: true });
    wrapper.scrollBy = vi.fn();
    const next = screen.getByRole('button', { name: 'Next image' });

    fireEvent.click(next);
    expect(wrapper.scrollBy).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
    expect(next).toBeDisabled();
    act(() => vi.advanceTimersByTime(500));
    expect(next).toBeEnabled();
  });
});
