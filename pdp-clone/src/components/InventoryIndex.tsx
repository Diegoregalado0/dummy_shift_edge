import type { VehicleRecord } from '../types';
import { vehicleMakeModel } from '../types';

export function InventoryIndex({ records }: { records: VehicleRecord[] }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-[1660px] px-6 py-6">
          <h1 className="font-serif font-bold uppercase text-[24px] text-[#101010]">Inventory</h1>
          <p className="font-sans text-[13px] text-[#666] mt-1">
            {records.length} vehicle{records.length === 1 ? '' : 's'} — real listing data, VIN-driven test fixtures
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1660px] px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map(({ vehicle }) => (
            <a
              key={vehicle.vin}
              href={`?vin=${vehicle.vin}`}
              className="block bg-white border border-[#e5e5e5] rounded-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={vehicle.image}
                alt={`${vehicle.year} ${vehicleMakeModel(vehicle)}`}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-4">
                <p className="font-serif font-semibold text-[15px] text-[#101010]">
                  {vehicle.condition} {vehicle.year} {vehicleMakeModel(vehicle)} {vehicle.trim}
                </p>
                <p className="font-sans text-[12px] text-[#888] mt-1">VIN: {vehicle.vin}</p>
                <p className="font-serif text-[18px] text-[#9b0a1e] mt-2">${vehicle.msrp.toLocaleString()}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
