import { features } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FeatureIcon } from "@/components/icons";

export function Features() {
  return (
    <section id="features" className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="section-container">
        <ScrollReveal className="text-center mb-14">
          <span className="badge mb-4">Platform Capabilities</span>
          <h2 className="section-title mb-4">
            Everything You Need For{" "}
            <span className="gradient-text">Meeting Intelligence</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Beyond transcription — MoM, action items, bot follow-up, and chatbot memory built for
            privacy-conscious teams who need AI without compromising data sovereignty.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={(i % 5) * 60}>
              <article className="card h-full group">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/15 group-hover:border-indigo-500/30 transition-all">
                  <FeatureIcon
                    name={feature.icon}
                    className="w-5 h-5 text-[var(--color-accent-light)]"
                  />
                </div>
                <h3 className="font-semibold mb-2 text-[0.95rem] leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
