import { useRef } from 'react';

function getDate(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
}

const WEEKDAY_FMT = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
const MONTH_DAY_FMT = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });
const WEEKDAY_LONG_FMT = new Intl.DateTimeFormat(undefined, { weekday: 'short' });

export function DateCardSlider({
  maxDaysOut,
  selectedOffset,
  onSelect,
}: {
  maxDaysOut: number;
  selectedOffset: number;
  onSelect: (offset: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsets = Array.from({ length: maxDaysOut + 1 }, (_, i) => i);
  const selectedDate = getDate(selectedOffset);

  function scrollByCard(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 92, behavior: 'smooth' });
  }

  return (
    <div>
      <p className="text-[15px] font-sans mb-3">
        <span className="font-bold text-[#3d6bab]">Step 1</span>
        <span className="font-bold text-[#3d6bab]"> - Select a date</span>{' '}
        <span className="text-[#748094]">
          ({WEEKDAY_LONG_FMT.format(selectedDate)}, {MONTH_DAY_FMT.format(selectedDate)})
        </span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll to earlier dates"
          className="shrink-0 w-9 h-9 rounded-full border border-[#cdd5df] flex items-center justify-center text-[#748094] hover:bg-[#f5f5f7] transition-colors"
        >
          &#8249;
        </button>

        <div ref={trackRef} className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none]">
          {offsets.map((offset) => {
            const date = getDate(offset);
            const isSelected = offset === selectedOffset;
            return (
              <button
                type="button"
                key={offset}
                onClick={() => onSelect(offset)}
                className={`shrink-0 w-[84px] h-[104px] rounded-md border flex flex-col items-center justify-center gap-1 transition-colors ${
                  isSelected
                    ? 'bg-[#385db4] border-[#385db4] text-white'
                    : 'bg-[#fbfbfc] border-[#cdd5df] text-[#101010] hover:border-[#385db4]'
                }`}
              >
                <span className={`text-[15px] font-sans ${isSelected ? 'text-white' : 'text-[#748094]'}`}>
                  {WEEKDAY_FMT.format(date)}
                </span>
                <span className={`text-[22px] font-sans font-bold ${isSelected ? 'text-white' : 'text-[#2f3747]'}`}>
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Scroll to later dates"
          className="shrink-0 w-9 h-9 rounded-full border border-[#cdd5df] flex items-center justify-center text-[#748094] hover:bg-[#f5f5f7] transition-colors"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
