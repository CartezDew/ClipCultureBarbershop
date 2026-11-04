import { useEffect, useRef } from 'react';

const FOCUSABLE = 'input, select, textarea, button:not([aria-label="Close modal"]), [href]';

// Shared modal behavior: Escape closes, the page behind stops scrolling, focus moves
// into the dialog and back out, and auto-close timers die with the modal.
export function useModal(isOpen, onClose) {
  const dialogRef = useRef(null);
  const closeTimer = useRef();
  const pressStartedOnOverlay = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const previousOverflow = root.style.overflowY;
    const previousFocus = document.activeElement;
    root.style.overflowY = 'hidden';
    dialogRef.current?.querySelector(FOCUSABLE)?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(closeTimer.current);
      root.style.overflowY = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  return {
    closeLater: (callback, delay) => {
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(callback, delay);
    },
    // Close only when the press starts and ends on the backdrop, so a text selection
    // that drifts outside the form does not discard what the visitor typed.
    overlayProps: {
      onMouseDown: (event) => { pressStartedOnOverlay.current = event.target === event.currentTarget; },
      onClick: (event) => {
        if (pressStartedOnOverlay.current && event.target === event.currentTarget) onCloseRef.current();
      },
    },
    dialogProps: { ref: dialogRef, role: 'dialog', 'aria-modal': true },
  };
}
