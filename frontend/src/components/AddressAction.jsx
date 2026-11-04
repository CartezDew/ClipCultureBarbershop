import { Copy, Navigation } from 'lucide-react';
import '../styles/address-action.css';

export const SHOP_ADDRESS = '6309 Roswell Road NE #2D, Sandy Springs, GA 30328';
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP_ADDRESS)}`;

export default function AddressAction({ className = '', children }) {
  const copyAddress = async (event) => {
    if (event?.detail > 1) return;
    try {
      await navigator.clipboard.writeText(SHOP_ADDRESS);
    } catch { /* Clipboard access can be unavailable outside secure contexts. */ }
  };

  return (
    <span className={`address-action ${className}`}>
      <button
        type="button"
        className="address-action__button"
        onClick={copyAddress}
        onDoubleClick={() => window.open(directionsUrl, '_blank', 'noopener,noreferrer')}
        aria-label={`Copy address: ${SHOP_ADDRESS}`}
      >
        {children ?? <>6309 Roswell Road NE #2D<br />Sandy Springs, GA 30328</>}
      </button>
      <span className="address-action__actions">
        <button type="button" className="address-action__copy" onClick={copyAddress} aria-label="Copy Sandy Springs address" title="Copy address">
          <Copy size={18} aria-hidden="true" />
        </button>
        <a className="address-action__directions" href={directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open directions to Sandy Springs" title="Open directions">
          <Navigation size={18} aria-hidden="true" />
        </a>
      </span>
    </span>
  );
}
