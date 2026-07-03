import { useRef, useState } from 'react';
import type { VehicleRecord } from './types';
import { VehicleHeader } from './components/VehicleHeader';
import { VehicleImage } from './components/VehicleImage';
import { PriceBox } from './components/PriceBox';
import { Modal } from './components/Modal';
import { LeadForm } from './components/LeadForm';
import { TestDriveForm } from './components/TestDriveForm';
import { BasicInfo } from './components/BasicInfo';
import { KeyFeatures } from './components/KeyFeatures';
import { VehicleDetailsAccordion } from './components/VehicleDetailsAccordion';

export type ModalKey = 'details' | 'price' | 'alerts' | 'test-drive' | 'share' | 'text-us';

function App({ record }: { record: VehicleRecord }) {
  const { vehicle, basicInfo, keyFeatures, detailCategories } = record;
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const shareInputRef = useRef<HTMLInputElement>(null);
  const close = () => setOpenModal(null);

  async function handleShare() {
    const shareData = { title, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // fall through to modal
      }
    }
    setOpenModal('share');
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <VehicleHeader vehicle={vehicle} onShare={handleShare} />

      <section className="bg-[#f5f5f5]">
        <div className="mx-auto max-w-[1660px] px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="w-full lg:w-[63%]">
              <VehicleImage image={vehicle.image} alt={title} />
            </div>
            <div className="w-full lg:w-[33%] lg:ml-auto">
              <PriceBox vehicle={vehicle} onOpenModal={setOpenModal} />
            </div>
          </div>
        </div>
      </section>

      <BasicInfo items={basicInfo} />
      <KeyFeatures features={keyFeatures} />
      <VehicleDetailsAccordion key={vehicle.vin} categories={detailCategories} />

      <button
        onClick={() => setOpenModal('text-us')}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-[#4cbb17] text-white rounded-full px-5 py-3 text-sm font-sans font-semibold shadow-lg hover:brightness-95 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16a2 2 0 012 2v9a2 2 0 01-2 2H9l-5 4v-4H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
        Text us
      </button>

      {openModal === 'details' && (
        <Modal title="Pricing Details" onClose={close} wide>
          <div className="flex flex-col gap-3 text-[14px] font-sans text-[#333] leading-relaxed">
            <p>
              <strong>Disclaimer:</strong>
            </p>
            <p>
              New vehicle pricing includes all offers and incentives. Tax, Title and Tags not included in
              vehicle prices shown and must be paid by the purchaser. While great effort is made to ensure
              the accuracy of the information on this site, errors do occur so please verify information
              with a customer service representative.
            </p>
            <p>
              **With approved credit. Terms may vary. Monthly payments are only estimates derived from the
              vehicle price with a 72 month term, 4.9% interest and 20% down payment.
            </p>
          </div>
        </Modal>
      )}

      {openModal === 'price' && (
        <Modal title="Get Today's Price" subtitle={`Request pricing for this ${title}.`} onClose={close}>
          <LeadForm submitLabel="Request Price" successMessage="Thanks! We'll follow up with pricing shortly." />
        </Modal>
      )}

      {openModal === 'alerts' && (
        <Modal
          title="Get Price Drop Alerts"
          subtitle="We'll notify you if the price on this vehicle changes."
          onClose={close}
        >
          <LeadForm submitLabel="Sign Up for Alerts" successMessage="You're signed up for price drop alerts." />
        </Modal>
      )}

      {openModal === 'test-drive' && (
        <Modal title="Schedule Test Drive" subtitle={`Book a test drive for this ${title}.`} onClose={close} wide>
          <TestDriveForm
            submitLabel="Schedule Test Drive"
            successMessage="Thanks! We'll confirm your test drive time shortly."
          />
        </Modal>
      )}

      {openModal === 'text-us' && (
        <Modal title="Text Us" subtitle="Send us a message about this vehicle." onClose={close}>
          <LeadForm
            submitLabel="Send Text"
            successMessage="Thanks! We'll text you back shortly."
            includeMessage
            messageLabel="Message"
          />
        </Modal>
      )}

      {openModal === 'share' && (
        <Modal title="Share This Vehicle" onClose={close}>
          <div className="flex flex-col gap-3">
            <input
              ref={shareInputRef}
              readOnly
              value={window.location.href}
              className="w-full rounded-sm border border-[#d9d9d9] px-3 py-2 text-[13px] font-sans text-[#333]"
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setShareCopied(true);
                } catch {
                  // Clipboard API blocked (permissions/insecure context) — fall
                  // back to selecting the text so the user can copy manually.
                  shareInputRef.current?.select();
                  setShareCopied(false);
                }
                setTimeout(() => setShareCopied(false), 2000);
              }}
              className="w-full h-[42px] rounded-sm bg-[#9b0a1e] text-white font-sans font-semibold text-[14px] hover:brightness-110 transition"
            >
              {shareCopied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
