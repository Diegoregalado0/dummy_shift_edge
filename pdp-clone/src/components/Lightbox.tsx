import { useEffect } from 'react';

export function Lightbox({
  images,
  alt,
  index,
  onIndexChange,
  onClose,
}: {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndexChange((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndexChange((index - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, images.length, onIndexChange, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 text-white font-sans text-sm">
        <span>
          {index + 1} / {images.length}
        </span>
        <button onClick={onClose} aria-label="Close" className="text-3xl leading-none hover:text-white/70">
          &times;
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-16">
        {images.length > 1 && (
          <button
            onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
            aria-label="Previous photo"
            className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl"
          >
            &#8249;
          </button>
        )}
        <img src={images[index]} alt={alt} className="max-h-[75vh] max-w-full object-contain" />
        {images.length > 1 && (
          <button
            onClick={() => onIndexChange((index + 1) % images.length)}
            aria-label="Next photo"
            className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl"
          >
            &#8250;
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 px-6 py-4 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => onIndexChange(i)}
              className={`w-16 h-12 shrink-0 overflow-hidden rounded-sm ${
                i === index ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
