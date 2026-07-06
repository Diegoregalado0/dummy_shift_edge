import { useEffect } from 'react';
import type { ReactNode } from 'react';

export function Modal({
  title,
  subtitle,
  onClose,
  children,
  wide,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full ${wide ? 'max-w-[560px]' : 'max-w-[420px]'} max-h-[90vh] overflow-y-auto rounded-md bg-white p-7`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-2xl leading-none text-[#888] hover:text-[#101010]"
        >
          &times;
        </button>
        <h2 className="font-serif text-[20px] font-semibold text-[#101010] mb-1">{title}</h2>
        {subtitle && <p className="text-[14px] text-[#666] mb-5 font-sans">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
