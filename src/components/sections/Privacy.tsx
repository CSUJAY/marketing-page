import { comparisonRows, privacyHighlights } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IconShield } from "@/components/icons";

export function Privacy() {
  return (
    <section id="privacy" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-green-600/10 -bottom-32 -left-32" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <ScrollReveal>
              <span className="badge mb-4">
                <IconShield className="w-3.5 h-3.5" />
                Privacy Advantage
              </span>
              <h2 className="section-title mb-6">
                Your Meetings Stay On{" "}
                <span className="gradient-text">Your Infrastructure</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <ul className="space-y-4">
                {privacyHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mt-0.5">
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
                    <span className="text-[var(--color-text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150}>
            <div className="glass-strong rounded-2xl overflow-hidden">
              <div className="p-5 md:p-6 border-b border-[var(--color-border)]">
                <h3 className="font-semibold text-center">
                  MeetingBuddyAI vs Typical Cloud Meeting Assistants
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="text-left p-4 text-[var(--color-text-muted)] font-medium">
                        Feature
                      </th>
                      <th className="p-4 text-center font-semibold text-[var(--color-accent-light)]">
                        MeetingBuddyAI
                      </th>
                      <th className="p-4 text-center text-[var(--color-text-muted)] font-medium">
                        Cloud Assistants
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={i < comparisonRows.length - 1 ? "border-b border-[var(--color-border)]" : ""}
                      >
                        <td className="p-4 text-[var(--color-text-secondary)]">{row.feature}</td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1.5 text-green-400 font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {row.meetingBuddy}
                          </span>
                        </td>
                        <td className="p-4 text-center text-[var(--color-text-muted)]">
                          {row.cloud}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
