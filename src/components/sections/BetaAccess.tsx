"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { validateBetaForm, type BetaFormData } from "@/lib/validate-beta-form";

const initialForm: BetaFormData = { name: "", email: "", organization: "", os: "windows" };

export function BetaAccess() {
  const [form, setForm] = useState<BetaFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [registrationCount, setRegistrationCount] = useState<number | null>(null);

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/beta");
      if (res.ok) {
        const data = await res.json();
        setRegistrationCount(data.count);
      }
    } catch {
      /* count is optional UI — fail silently */
    }
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validateBetaForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setSubmitError(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setRegistrationCount(data.count);
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof BetaFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-lg bg-white/5 border text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors ${
      errors[field]
        ? "border-red-500/60 focus:border-red-500"
        : "border-[var(--color-border)] focus:border-indigo-500/50"
    }`;

  return (
    <section id="beta" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[350px] h-[350px] bg-indigo-600/15 -top-20 right-0" />

      <div className="section-container relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge mb-4">Limited Beta Access</span>
            <h2 className="section-title mb-4">
              Request <span className="gradient-text">Beta Access</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Join the early access program and help shape privacy-first meeting intelligence.
              No pricing yet — we&apos;re focused on finding teams who need this workflow.
            </p>
            {registrationCount !== null && (
              <p className="mt-4 text-sm text-[var(--color-accent-light)] font-medium">
                {registrationCount.toLocaleString()}{" "}
                {registrationCount === 1 ? "person has" : "people have"} joined the beta waitlist
              </p>
            )}
          </div>

          <div>
            {submitted ? (
              <div
                className="glass-strong rounded-2xl p-8 md:p-10 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">You&apos;re on the list!</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Thank you for requesting beta access. We&apos;ll be in touch at{" "}
                  <strong className="text-[var(--color-text-primary)]">{form.email}</strong> with
                  next steps.
                </p>
                {registrationCount !== null && (
                  <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                    You&apos;re registrant #{registrationCount.toLocaleString()} on the waitlist.
                  </p>
                )}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-strong rounded-2xl p-6 md:p-8 space-y-5"
                noValidate
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    className={inputClass("name")}
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    className={inputClass("email")}
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium mb-1.5">
                    Organization <span className="text-[var(--color-text-muted)]">(optional)</span>
                  </label>
                  <input
                    id="organization"
                    type="text"
                    autoComplete="organization"
                    value={form.organization}
                    onChange={update("organization")}
                    className={inputClass("organization")}
                    placeholder="Company or institution"
                  />
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium mb-2">
                    Operating System <span className="text-red-400">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "windows", label: "Windows" },
                      { value: "macos", label: "macOS" },
                      { value: "linux", label: "Linux" },
                    ].map((os) => (
                      <label
                        key={os.value}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                          form.os === os.value
                            ? "border-indigo-500/50 bg-indigo-500/10 text-[var(--color-accent-light)]"
                            : "border-[var(--color-border)] bg-white/3 hover:border-[var(--color-border-hover)]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="os"
                          value={os.value}
                          checked={form.os === os.value}
                          onChange={update("os")}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{os.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.os && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.os}
                    </p>
                  )}
                </fieldset>

                {submitError && (
                  <p className="text-sm text-red-400 text-center" role="alert">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Request Beta Access"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
