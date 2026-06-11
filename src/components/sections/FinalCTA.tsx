import { ScrollReveal } from "@/components/ScrollReveal";
import { IconPlay } from "@/components/icons";

export function FinalCTA() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-600/10" />
            <div className="absolute inset-0 glass" />

            <div className="relative z-10 px-6 py-14 md:px-16 md:py-20 text-center">
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight mb-4">
                Ready To Make Meetings Actionable?
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
                Request early access and help validate the complete meeting intelligence workflow —
                before we talk pricing.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#beta" className="btn-primary !px-8">
                  Request Beta Access
                </a>
                <a href="#demo" className="btn-secondary !px-8">
                  <IconPlay className="w-4 h-4" />
                  Watch Demo
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
