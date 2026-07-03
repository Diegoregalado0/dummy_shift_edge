import { useState } from 'react';
import type { FormEvent } from 'react';
import { EMAIL_PATTERN, Field, NAME_PATTERN, PHONE_PATTERN, inputClass } from './formFields';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export function LeadForm({
  submitLabel,
  successMessage,
  includeMessage,
  messageLabel,
  onSuccess,
}: {
  submitLabel: string;
  successMessage: string;
  includeMessage?: boolean;
  messageLabel?: string;
  onSuccess?: (form: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(field: keyof FormState, value: string): string {
    if (field === 'firstName' || field === 'lastName') {
      if (!value.trim()) return 'Required';
      if (!NAME_PATTERN.test(value.trim())) return 'Letters only, no numbers';
    }
    if (field === 'email') {
      if (!value.trim()) return 'Required';
      if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address';
    }
    if (field === 'phone') {
      if (!value.trim()) return 'Required';
      if (!PHONE_PATTERN.test(value.trim())) return 'Enter a valid phone number, e.g. (555) 123-4567';
    }
    return '';
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const fields: (keyof FormState)[] = ['firstName', 'lastName', 'email', 'phone'];

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    let valid = true;
    fields.forEach((field) => {
      const err = validate(field, form[field]);
      if (err) valid = false;
      nextErrors[field] = err;
    });
    setErrors(nextErrors);
    if (!valid) return;

    setSubmitted(true);
    onSuccess?.(form);
  }

  if (submitted) {
    return <p className="text-[14px] font-sans font-semibold text-[#1c7c3f]">{successMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="First Name" error={errors.firstName}>
        <input
          type="text"
          value={form.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          className={inputClass(!!errors.firstName)}
          autoComplete="given-name"
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          type="text"
          value={form.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          className={inputClass(!!errors.lastName)}
          autoComplete="family-name"
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={inputClass(!!errors.email)}
          autoComplete="email"
        />
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={inputClass(!!errors.phone)}
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
      </Field>
      {includeMessage && (
        <Field label={messageLabel ?? 'Message'}>
          <textarea
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={3}
            className={inputClass(false)}
          />
        </Field>
      )}
      <button
        type="submit"
        className="mt-1 w-full h-[46px] rounded-sm bg-[#9b0a1e] text-white font-sans font-semibold text-[14px] hover:brightness-110 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}
