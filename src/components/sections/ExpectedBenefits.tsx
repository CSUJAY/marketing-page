import { expectedBenefits } from "@/lib/demo-workflow";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ExpectedBenefits() {
  return (
    <section id="benefits" className="section-padding">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <span className="badge mb-4">Outcomes</span>
          <h2 className="section-title mb-4">
            What Teams <span className="gradient-text">Gain</span>
          </h2>
          <p className="section-subtitle mx-auto">
            People buy outcomes, not features. MeetingBuddyAI is built to turn conversations into
            accountability and organizational memory.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {expectedBenefits.map((benefit, i) => (
            <ScrollReveal key={benefit} delay={(i % 3) * 50}>
              <div className="card h-full flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 font-bold text-sm">
                  ✓
                </span>
                <span className="font-medium text-[var(--color-text-primary)] leading-snug">
                  {benefit}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
