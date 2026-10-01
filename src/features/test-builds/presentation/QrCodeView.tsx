'use client';

import QRCode from 'react-qr-code';

/**
 * SVG QR code, loaded in a separate chunk only after the toggle opens
 * (see `QrToggle`). Always dark modules on a light background with a quiet
 * zone so it scans in both themes.
 */
export default function QrCodeView({ value }: { value: string }) {
  return (
    <figure className="inline-block rounded-[var(--radius-tile)] bg-white p-4">
      <QRCode
        value={value}
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        aria-label={`QR code linking to ${value}`}
      />
      <figcaption className="mt-3 max-w-[180px] break-all font-mono text-[0.65rem] leading-5 text-neutral-700">
        {value}
      </figcaption>
    </figure>
  );
}
