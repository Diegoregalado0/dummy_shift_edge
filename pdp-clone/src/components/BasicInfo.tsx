export function BasicInfo({ items }: { items: { label: string; value: string }[] }) {
  return (
    <section className="bg-white border-t border-[#e5e5e5]">
      <div className="mx-auto max-w-[1660px] px-6 py-8">
        <h2 className="font-serif font-bold uppercase text-[22px] tracking-wide text-[#101010] mb-5">
          Basic Info
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {items.map((item) => (
            <li key={item.label} className="flex items-baseline gap-2 border-b border-[#eee] pb-3">
              <span className="font-sans text-[13px] font-semibold text-[#666]">{item.label}:</span>
              <span className="font-sans text-[14px] text-[#101010]">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
