import { roadmapComing, roadmapCurrent } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Roadmap() {
  return (
    <section id="roadmap" className="section-padding">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <span className="badge mb-4">Product Roadmap</span>
          <h2 className="section-title mb-4">
            Built In Beta. <span className="gradient-text">Improving Fast.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Active development with a clear path from today&apos;s beta to tomorrow&apos;s platform.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <ScrollReveal delay={60}>
            <div className="card h-full">
              <h3 className="font-semibold text-lg mb-5 text-[var(--color-accent-light)]">
                Current Beta
              </h3>
              <ul className="space-y-3">
                {roadmapCurrent.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="card h-full">
              <h3 className="font-semibold text-lg mb-5 text-[var(--color-text-muted)]">
                Coming Soon
              </h3>
              <ul className="space-y-3">
                {roadmapComing.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <span className="shrink-0 w-5 h-5 rounded border border-[var(--color-border)] flex items-center justify-center text-xs text-[var(--color-text-muted)]">
                      □
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
