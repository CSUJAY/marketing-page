import { ScrollReveal } from "@/components/ScrollReveal";

export function WhyNotCloudAI() {
  return (
    <section id="why-local" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[350px] h-[350px] bg-purple-600/15 -bottom-20 -right-20" />

      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center glass-strong rounded-2xl p-8 md:p-12">
            <span className="badge mb-5">Why Not Cloud AI?</span>
            <h2 className="section-title mb-6">
              Your Data. <span className="gradient-text">Your Infrastructure.</span>
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Most meeting assistants send conversations to external servers for processing.
            </p>
            <p className="text-lg text-[var(--color-text-primary)] leading-relaxed font-medium">
              MeetingBuddyAI keeps processing on your infrastructure using local AI models, giving
              your organization complete ownership and control over meeting data.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
