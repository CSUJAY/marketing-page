import { companyName, founders } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function FounderStory() {
  return (
    <section id="about" className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge mb-5">Our Mission</span>
            <h2 className="section-title mb-8">
              Why We Built <span className="gradient-text">MeetingBuddyAI</span>
            </h2>

            <blockquote className="relative">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-indigo-500/20 font-serif leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Most meeting assistants rely entirely on the cloud. We wanted to build a solution
                that gives organizations the power of AI while maintaining complete control over
                their data.
              </p>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                MeetingBuddyAI was created to transform meetings into actionable outcomes while
                keeping privacy at the center of the experience.
              </p>
            </blockquote>

            <div className="mt-10 glass rounded-2xl p-6 md:p-8 text-left max-w-md mx-auto">
              <p className="text-sm text-[var(--color-text-muted)] mb-1">Built by</p>
              <p className="font-semibold text-lg mb-4">{companyName}</p>
              <p className="text-sm text-[var(--color-text-muted)] mb-1">Founders</p>
              <p className="font-medium text-[var(--color-text-primary)] mb-4">
                {founders.join(" & ")}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Privacy-first AI solutions for teams that cannot compromise on data control.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
