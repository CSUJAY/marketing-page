import { audienceGroups } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WhoIsItFor() {
  return (
    <section id="who-its-for" className="section-padding">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <span className="badge mb-4">Audience</span>
          <h2 className="section-title mb-4">
            Who Benefits From{" "}
            <span className="gradient-text">MeetingBuddyAI?</span>
          </h2>
          <p className="section-subtitle mx-auto">
            If your team runs on meetings and cares about privacy, accountability, and follow-through,
            this product is built for you.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {audienceGroups.map((group, i) => (
            <ScrollReveal key={group} delay={(i % 3) * 50}>
              <div className="card flex items-start gap-3 h-full">
                <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-[var(--color-accent-light)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[var(--color-text-secondary)] font-medium">{group}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
