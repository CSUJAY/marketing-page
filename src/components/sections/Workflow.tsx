import { workflowSteps } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IconArrowDown } from "@/components/icons";

export function Workflow() {
  return (
    <section id="workflow" className="section-padding relative overflow-hidden bg-[var(--color-bg-secondary)]">
      <div className="glow-orb w-[450px] h-[450px] bg-indigo-600/20 top-0 left-1/2 -translate-x-1/2" />

      <div className="section-container relative z-10">
        <ScrollReveal className="text-center mb-10">
          <span className="badge mb-4">What Makes Us Different</span>
          <h2 className="section-title mb-4">
            The Complete Meeting{" "}
            <span className="gradient-text">Intelligence Workflow</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Transcription is table stakes. MeetingBuddyAI goes further — from conversation to MoM,
            email, action collection, bot follow-up, memory, and your next meeting pre-read.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mb-12">
          <div className="glass-strong rounded-2xl p-5 md:p-8 max-w-3xl mx-auto">
            <p className="text-center text-sm md:text-base font-medium text-[var(--color-text-secondary)] leading-relaxed">
              Meeting → MoM → Email → Action Items → Bot Follow-up → Chatbot Memory → Pre-read
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {workflowSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 50}>
              <div className="relative">
                <div className="gradient-border rounded-xl p-5 md:p-6 flex gap-4 md:gap-5 items-start group hover:border-[var(--color-border-hover)] transition-colors">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[1.1rem] mb-1.5 group-hover:text-[var(--color-accent-light)] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {i < workflowSteps.length - 1 && (
                  <div className="flex justify-center py-2 text-[var(--color-accent-light)]">
                    <IconArrowDown className="w-5 h-5 opacity-60" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
