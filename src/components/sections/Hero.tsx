import { trustBadges } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IconPlay } from "@/components/icons";

function DashboardIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none animate-float">
      <div className="glass-strong rounded-2xl p-4 md:p-5 shadow-2xl shadow-indigo-500/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-[var(--color-text-muted)]">Sample Workspace</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Demo Meetings", value: "24", color: "#6366f1" },
            { label: "Demo Actions", value: "87", color: "#8b5cf6" },
            { label: "Completed Tasks", value: "62", color: "#10b981" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-lg p-3 text-center">
              <div className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[0.65rem] text-[var(--color-text-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="glass rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">
              MoM → Email → Actions
            </span>
            <span className="badge !text-[0.65rem] !py-0.5">Workflow</span>
          </div>
          <div className="space-y-1.5">
            {[85, 70, 90, 60].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-white/10"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>

        <div className="glass rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">
              Chatbot Memory
            </span>
            <span className="badge !text-[0.65rem] !py-0.5">Bot Follow-up</span>
          </div>
          <div className="space-y-2">
            <div className="text-[0.6rem] text-[var(--color-text-muted)] mb-1.5">
              &ldquo;What action items came out of yesterday&apos;s sprint review?&rdquo;
            </div>
            <div className="glass rounded p-2 text-[0.6rem] text-[var(--color-text-secondary)] leading-relaxed">
              3 items assigned — bot follow-up scheduled for Friday on API docs (Alex) and QA
              handoff (Priya).
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl animate-pulse-glow" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl animate-pulse-glow" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-600/30 -top-48 -left-48" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple-600/20 top-1/3 -right-32" />
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-600/15 bottom-0 left-1/3" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Beta Access Open
                </span>
                <span className="badge !text-green-300 !border-green-500/30 !bg-green-500/10">
                  Currently accepting early testers
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight mb-6">
                Private AI Meeting Intelligence{" "}
                <span className="gradient-text">That Runs On Your Device</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl leading-relaxed">
                From meeting to MoM, email, action items, bot follow-up, and chatbot memory — the
                complete workflow runs on your device with local AI, without sending sensitive
                conversations to the cloud.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#demo" className="btn-primary">
                  <IconPlay className="w-4 h-4" />
                  Watch Demo
                </a>
                <a href="#try-demo" className="btn-secondary">
                  Try Demo
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span key={badge} className="badge">
                    {badge}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200} className="hidden sm:block">
            <DashboardIllustration />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
