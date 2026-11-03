import { useState } from 'react';
import '../styles/address-action.css';

export const SHOP_ADDRESS = '6309 Roswell Road NE #2D, Sandy Springs, GA 30328';
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP_ADDRESS)}`;

export default function AddressAction({ className = '' }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async (event) => {
    if (event.detail > 1) return;
    try {
      await navigator.clipboard.writeText(SHOP_ADDRESS);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <span className={`address-action ${className}`}>
      <button
        type="button"
        className="address-action__button"
        onClick={copyAddress}
        onDoubleClick={() => window.open(directionsUrl, '_blank', 'noopener,noreferrer')}
        title="Click to copy address; double click for directions"
        aria-label={`${SHOP_ADDRESS}. Click to copy; double click for directions.`}
      >
        6309 Roswell Road NE #2D<br />Sandy Springs, GA 30328
      </button>
      <span className="address-action__hint" aria-live="polite">{copied ? 'Copied to clipboard' : 'Tap to copy · Double click for directions'}</span>
    </span>
  );
}
