'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { contactMailto, siteConfig } from '@/config/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  projectType: 'Full-time',
  budget: '',
  message: '',
};

const projectTypes = ['Full-time', 'Freelance', 'Collaboration', 'Other'];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  'w-full bg-transparent border border-[var(--line)] rounded-lg px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus-visible:border-[var(--atelier-accent)] focus-visible:ring-2 focus-visible:ring-[var(--atelier-accent)]/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed';

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

function buildFallbackBody(values: FormValues): string {
  const lines = [
    values.message.trim(),
    '',
    `— ${values.name.trim()} (${values.email.trim()})`,
    `Project type: ${values.projectType}`,
  ];
  if (values.budget.trim()) {
    lines.push(`Budget: ${values.budget.trim()}`);
  }
  return lines.join('\n');
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isSubmitting = state === 'submitting';

  const handleChange = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    // Clear field error as the user edits; keep typed values on validation failure.
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem('botcheck') as HTMLInputElement | null)?.value;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Bots: success-trap without sending (anti-spam). Real users never take this path.
    if (honeypot) {
      setState('success');
      return;
    }

    setState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: siteConfig.web3formsAccessKey,
          name: values.name,
          email: values.email,
          project_type: values.projectType,
          budget: values.budget,
          message: values.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setState('success');
      } else {
        setState('error');
        setErrorMessage('Something went wrong. You can try again or email me directly.');
      }
    } catch {
      setState('error');
      setErrorMessage('Something went wrong. You can try again or email me directly.');
    }
  };

  if (state === 'success') {
    return (
      <div
        className="border border-[var(--line)] rounded-lg px-6 py-8 text-center"
        role="status"
        aria-live="polite"
      >
        <p
          className="text-[var(--ink)]"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '20px' }}
        >
          Thanks — your message is on its way. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  const directEmailHref = contactMailto({
    subject: `Portfolio contact — ${values.projectType}`,
    body: values.message.trim().length >= 10 ? buildFallbackBody(values) : undefined,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[560px]" noValidate>
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input type="hidden" name="access_key" value={siteConfig.web3formsAccessKey} />

      <div>
        <label htmlFor="cf-name" className="sr-only">Name</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          placeholder="Your name"
          value={values.name}
          onChange={handleChange('name')}
          disabled={isSubmitting}
          className={inputClasses}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
        />
        {errors.name && (
          <p id="cf-name-error" className="text-[13px] text-red-500 mt-1.5">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className="sr-only">Email</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          placeholder="Your email"
          value={values.email}
          onChange={handleChange('email')}
          disabled={isSubmitting}
          className={inputClasses}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
        />
        {errors.email && (
          <p id="cf-email-error" className="text-[13px] text-red-500 mt-1.5">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-project-type" className="sr-only">Project type</label>
          <select
            id="cf-project-type"
            name="projectType"
            value={values.projectType}
            onChange={handleChange('projectType')}
            disabled={isSubmitting}
            className={inputClasses}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-budget" className="sr-only">Budget range</label>
          <input
            id="cf-budget"
            name="budget"
            type="text"
            placeholder="Budget (optional)"
            value={values.budget}
            onChange={handleChange('budget')}
            disabled={isSubmitting}
            maxLength={60}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="sr-only">Message</label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="Tell me about your project…"
          value={values.message}
          onChange={handleChange('message')}
          disabled={isSubmitting}
          rows={5}
          className={inputClasses}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
        />
        {errors.message && (
          <p id="cf-message-error" className="text-[13px] text-red-500 mt-1.5">
            {errors.message}
          </p>
        )}
      </div>

      {state === 'error' && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-[13px] text-red-600 dark:text-red-400"
        >
          <p className="mb-2">{errorMessage}</p>
          <p>
            Prefer email?{' '}
            <a
              href={directEmailHref}
              className="font-medium underline underline-offset-2 hover:text-red-700 dark:hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              Email me directly
            </a>
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="atelier-cta inline-flex items-center justify-center rounded-[999px] bg-[var(--ink)] text-[var(--cream)] text-[15px] font-medium px-6 py-3 self-start disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
      >
        {isSubmitting ? 'Sending…' : state === 'error' ? 'Try again' : 'Send message'}
      </button>
    </form>
  );
}
