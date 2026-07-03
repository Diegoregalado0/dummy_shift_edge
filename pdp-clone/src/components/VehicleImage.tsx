import { useState } from 'react';
import { GalleryIcon, ExpandIcon } from './icons';
import { Lightbox } from './Lightbox';

export function VehicleImage({ image, alt }: { image: string; alt: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="relative w-full bg-black">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover aspect-[4/3] block cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      />

      <button
        onClick={() => setLightboxOpen(true)}
        className="absolute left-3 bottom-3 flex items-center gap-2 bg-white rounded-md px-3 py-2 text-[13px] font-sans font-medium text-[#101010] shadow-sm hover:bg-gray-100 transition-colors"
      >
        <GalleryIcon />
        <span>(1) Photo</span>
      </button>

      <button
        onClick={() => setLightboxOpen(true)}
        aria-label="Expand photo"
        className="absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center text-white/90 hover:text-white"
      >
        <ExpandIcon />
      </button>

      {lightboxOpen && (
        <Lightbox
          images={[image]}
          alt={alt}
          index={0}
          onIndexChange={() => {}}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
