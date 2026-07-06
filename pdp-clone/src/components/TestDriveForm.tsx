import { useState } from 'react';
import type { FormEvent } from 'react';
import { Field, PHONE_PATTERN, inputClass } from './formFields';
import { DateCardSlider } from './DateCardSlider';

const MAX_DAYS_OUT = 7;

export function TestDriveForm({
  submitLabel,
  successMessage,
}: {
  submitLabel: string;
  successMessage: string;
}) {
  const [dayOffset, setDayOffset] = useState(0);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  function validatePhone(value: string) {
    if (!value.trim()) return 'Required';
    if (!PHONE_PATTERN.test(value.trim())) return 'Enter a valid phone number, e.g. (555) 123-4567';
    return '';
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const error = validatePhone(phone);
    setPhoneError(error);
    if (error) return;
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-[14px] font-sans font-semibold text-[#1c7c3f]">{successMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <DateCardSlider maxDaysOut={MAX_DAYS_OUT} selectedOffset={dayOffset} onSelect={setDayOffset} />

      <Field label="Phone Number" error={phoneError}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setPhoneError(validatePhone(e.target.value));
          }}
          className={inputClass(!!phoneError)}
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
      </Field>

      <button
        type="submit"
        className="mt-1 w-full h-[46px] rounded-sm bg-[#9b0a1e] text-white font-sans font-semibold text-[14px] hover:brightness-110 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}
