import { faqItems } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <span className="badge mb-4">FAQ</span>
          <h2 className="section-title mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Common questions from teams evaluating privacy-first meeting intelligence.
          </p>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqItems.map((item, i) => (
            <ScrollReveal key={item.question} delay={i * 40}>
              <details className="group glass rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-light)] transition-colors">
                  <span>{item.question}</span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] group-open:rotate-45 transition-transform"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4">
                  {item.answer}
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
