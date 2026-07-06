import { useState } from 'react';
import type { DetailCategory } from '../types';

export function VehicleDetailsAccordion({ categories }: { categories: DetailCategory[] }) {
  const [openCategory, setOpenCategory] = useState<string | null>(categories[0]?.category ?? null);

  return (
    <section className="bg-white border-t border-[#e5e5e5]">
      <div className="mx-auto max-w-[1660px] px-6 py-8">
        <h2 className="font-serif font-bold uppercase text-[22px] tracking-wide text-[#101010] mb-5">
          Vehicle Details
        </h2>
        <div className="flex flex-col">
          {categories.map((cat) => {
            const isOpen = openCategory === cat.category;
            return (
              <div key={cat.category} className="border-b border-[#e5e5e5]">
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat.category)}
                  className="w-full flex items-center justify-between py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-serif font-semibold text-[16px] text-[#101010]">
                    {cat.category}{' '}
                    <span className="font-sans font-normal text-[13px] text-[#999]">({cat.items.length})</span>
                  </h3>
                  <span
                    className={`text-[#666] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    &#9662;
                  </span>
                </button>
                {isOpen && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 pb-5">
                    {cat.items.map((item, i) => (
                      <li key={i} className="font-sans text-[13px] text-[#333] leading-snug list-disc list-inside">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
