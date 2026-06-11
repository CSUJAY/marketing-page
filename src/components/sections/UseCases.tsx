import { useCases } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function UseCases() {
  return (
    <section id="use-cases" className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <span className="badge mb-4">Use Cases</span>
          <h2 className="section-title mb-4">
            Imagine It In <span className="gradient-text">Your Meetings</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From standups to board reviews — MeetingBuddyAI fits wherever conversations need to
            become outcomes.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {useCases.map((useCase) => (
              <span
                key={useCase}
                className="badge !text-sm !py-2 !px-4 !bg-white/5 hover:!bg-white/8 transition-colors"
              >
                {useCase}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
