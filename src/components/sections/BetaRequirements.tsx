import { betaRequirements } from "@/lib/demo-workflow";
import { ScrollReveal } from "@/components/ScrollReveal";

export function BetaRequirements() {
  return (
    <section id="requirements" className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto glass-strong rounded-2xl p-8 md:p-10">
            <span className="badge mb-4">Beta Requirements</span>
            <h2 className="section-title mb-4 text-[clamp(1.5rem,3vw,2rem)]">
              What You&apos;ll Need To <span className="gradient-text">Get Started</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              Keep setup expectations clear before testers join. A step-by-step installation guide is
              provided after beta approval.
            </p>
            <ul className="space-y-3 mb-6">
              {betaRequirements.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                  <span className="shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent-light)]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--color-text-muted)]">
              macOS and Linux support are planned based on beta tester demand.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
