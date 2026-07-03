import type { Vehicle } from '../types';
import { DollarIcon, PriceTagIcon, SteeringWheelIcon, QuestionCircleIcon } from './icons';
import type { ModalKey } from '../App';

export function PriceBox({
  vehicle,
  onOpenModal,
}: {
  vehicle: Vehicle;
  onOpenModal: (key: ModalKey) => void;
}) {
  return (
    <div className="w-full">
      <div className="bg-white border border-[#e0e0e0]">
        <div className="px-6 pt-5 pb-4 flex items-baseline justify-between">
          <span className="font-serif text-[18px] tracking-wide text-[#101010]">MSRP</span>
          <span className="font-serif text-[28px] text-[#101010]">
            ${vehicle.msrp.toLocaleString()}
          </span>
        </div>
        <div className="mx-6 border-t border-[#d9d9d9]" />
        <button
          onClick={() => onOpenModal('details')}
          className="w-full text-left px-6 py-4 flex items-center gap-2 font-serif text-[13px] tracking-wide font-semibold text-[#101010] hover:bg-[#f9f9f9] transition-colors"
        >
          <QuestionCircleIcon />
          DETAILS
        </button>
      </div>

      <div className="flex flex-col gap-[6px] mt-4">
        <CtaButton icon={<DollarIcon />} tone="black" onClick={() => onOpenModal('price')}>
          Get Today's Price
        </CtaButton>
        <CtaButton icon={<PriceTagIcon />} tone="charcoal" onClick={() => onOpenModal('alerts')}>
          Get Price Drop Alerts
        </CtaButton>
        <CtaButton icon={<SteeringWheelIcon />} tone="charcoal" onClick={() => onOpenModal('test-drive')}>
          Schedule Test Drive
        </CtaButton>
      </div>
    </div>
  );
}

function CtaButton({
  children,
  icon,
  tone,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  tone: 'black' | 'charcoal';
  onClick: () => void;
}) {
  const toneClasses = tone === 'black' ? 'bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]' : 'bg-[#2b2b2b] text-white hover:bg-[#383838]';

  return (
    <button
      onClick={onClick}
      className={`w-full h-[68px] px-6 flex items-center justify-between font-serif text-[16px] font-semibold tracking-wide transition-colors ${toneClasses}`}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}
