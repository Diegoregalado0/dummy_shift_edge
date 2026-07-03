import type { VehicleRecord } from '../types';
import { vehicleMakeModel } from '../types';

export function PrintView({ record }: { record: VehicleRecord }) {
  const { vehicle, basicInfo, detailCategories } = record;
  const title = `${vehicle.year} ${vehicleMakeModel(vehicle)} ${vehicle.trim}`;
  const allDetailItems = detailCategories.flatMap((cat) => cat.items);

  return (
    <div className="max-w-[900px] mx-auto px-8 py-8 font-sans text-[#101010]">
      <div className="flex items-start justify-between border-b border-[#ccc] pb-4 mb-6 print:hidden">
        <h1 className="font-serif font-bold uppercase text-[22px]">
          {vehicle.condition} {title}
        </h1>
        <button
          onClick={() => window.print()}
          className="rounded-sm bg-[#0a0a0a] text-white text-[13px] font-semibold px-4 py-2 hover:bg-[#1a1a1a]"
        >
          Print
        </button>
      </div>

      <h1 className="hidden print:block font-serif font-bold uppercase text-[20px] mb-1">
        {vehicle.condition} {title}
      </h1>

      <ul className="flex gap-6 text-[12px] uppercase tracking-wide text-[#555] mb-6">
        <li>VIN: {vehicle.vin}</li>
        <li>Stock: {vehicle.stock}</li>
      </ul>

      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 mb-8 text-[13px]">
        {basicInfo.map((item) => (
          <div key={item.label}>
            <dt className="font-semibold text-[#555]">{item.label}:</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="font-serif font-semibold text-[15px] mb-2">Vehicle Details:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mb-8 text-[12px] leading-relaxed text-[#333] list-disc list-inside">
        {allDetailItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p className="font-serif font-bold text-[20px] border-t border-[#ccc] pt-4">
        MSRP ${vehicle.msrp.toLocaleString()}
      </p>
    </div>
  );
}
