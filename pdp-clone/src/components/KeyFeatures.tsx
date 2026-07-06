function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l2.5 2.5 5.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KeyFeatures({ features }: { features: string[] }) {
  return (
    <section className="bg-[#f5f5f5] border-t border-[#e5e5e5]">
      <div className="mx-auto max-w-[1660px] px-6 py-8">
        <h2 className="font-serif font-bold uppercase text-[22px] tracking-wide text-[#101010] mb-5">
          Key Features
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-sm px-4 py-3">
              <span className="text-[#101010] shrink-0">
                <CheckIcon />
              </span>
              <span className="font-sans text-[14px] text-[#101010]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
