import { useState } from 'react';
import type { Vehicle } from '../types';
import { vehicleMakeModel } from '../types';
import { HeartIcon, ShareIcon, PrintIcon } from './icons';

export function VehicleHeader({
  vehicle,
  onShare,
}: {
  vehicle: Vehicle;
  onShare: () => void;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-[1660px] px-6 py-6 flex items-start justify-between gap-4">
        <div>
          <h1
            className="font-serif font-bold uppercase text-[28px] leading-tight tracking-wide text-[#101010]"
          >
            <strong className="font-bold">{vehicle.condition}</strong> {vehicle.year} {vehicleMakeModel(vehicle)} {vehicle.trim}
          </h1>
          <ul className="mt-2 flex items-center gap-4 text-[12px] tracking-wider uppercase text-[#6b6b6b] font-sans font-medium">
            <li>VIN:&nbsp;<span className="text-[#6b6b6b]">{vehicle.vin}</span></li>
            <li>Stock:&nbsp;<span className="text-[#6b6b6b]">{vehicle.stock}</span></li>
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-1">
          <button
            aria-label={saved ? 'Remove from saved vehicles' : 'Save vehicle'}
            title={saved ? 'Saved' : 'Save vehicle'}
            onClick={() => setSaved((s) => !s)}
            className={`transition-colors ${saved ? 'text-[#9b0a1e]' : 'text-[#b5b5b5] hover:text-[#101010]'}`}
          >
            <HeartIcon filled={saved} />
          </button>
          <button
            aria-label="Share vehicle"
            title="Share"
            onClick={onShare}
            className="text-[#b5b5b5] hover:text-[#101010] transition-colors"
          >
            <ShareIcon />
          </button>
          <a
            aria-label="Print vehicle"
            title="Print"
            href={`${window.location.pathname}?print=1&vin=${vehicle.vin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b5b5b5] hover:text-[#101010] transition-colors"
          >
            <PrintIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
