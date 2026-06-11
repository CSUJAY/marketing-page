"use client";

import { screenshots } from "@/lib/data";

function ScreenshotCard({
  title,
  label,
  image,
  alt,
}: {
  title: string;
  label: string;
  image: string;
  alt: string;
}) {
  return (
    <div className="group">
      <div className="glass-strong rounded-xl overflow-hidden shadow-xl shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-black/20">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[0.7rem] text-[var(--color-text-muted)]">{label}</span>
        </div>

        <div className="relative aspect-[16/10] bg-[#0d0d14] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <p className="mt-3 text-sm font-medium text-center text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
        {title}
      </p>
    </div>
  );
}

export function Screenshots() {
  return (
    <section id="screenshots" className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">
            See MeetingBuddyAI <span className="gradient-text">In Action</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From neural capture and transcripts to MoM, action items with bot follow-up, and email
            workflows — all grounded in chatbot memory.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {screenshots.map((shot) => (
            <ScreenshotCard
              key={shot.title}
              title={shot.title}
              label={shot.label}
              image={shot.image}
              alt={shot.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
