export const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'-]*$/;
export const PHONE_PATTERN = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-[13px] font-sans font-semibold text-[#101010]">
      {label}
      <div className="mt-1 font-normal">{children}</div>
      <span className="block min-h-[16px] mt-1 text-[12px] font-semibold text-[#9b0a1e]">{error}</span>
    </label>
  );
}

export function inputClass(invalid: boolean) {
  return `w-full rounded-sm border px-3 py-2 text-[14px] font-sans focus:outline-none focus:ring-2 focus:ring-[#101010]/20 ${
    invalid ? 'border-[#9b0a1e]' : 'border-[#d9d9d9]'
  }`;
}
