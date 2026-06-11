"use client";

import { useCallback, useEffect, useState } from "react";
import {
  demoActionItems,
  demoEmail,
  demoFollowUp,
  demoMeetingLines,
  demoMemory,
  demoMom,
  demoPreread,
  demoSteps,
  demoTranscript,
  type DemoStepId,
} from "@/lib/demo-workflow";

const STEP_MS = 3200;

function StepPanel({ stepId }: { stepId: DemoStepId }) {
  switch (stepId) {
    case "meeting":
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-2">
            <span>Sprint Review — Sample Meeting</span>
            <span className="badge !text-[0.65rem] !py-0.5">7 min playback</span>
          </div>
          {demoMeetingLines.map((line) => (
            <div key={line.time} className="glass rounded-lg p-3 animate-[fadeIn_0.4s_ease-out]">
              <div className="flex items-center gap-2 text-xs text-[var(--color-accent-light)] mb-1">
                <span>{line.time}</span>
                <span>{line.speaker}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{line.text}</p>
            </div>
          ))}
        </div>
      );
    case "transcript":
      return (
        <pre className="text-xs md:text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap font-mono leading-relaxed glass rounded-lg p-4">
          {demoTranscript}
        </pre>
      );
    case "mom":
      return (
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] mb-1">Summary</p>
            <p className="text-[var(--color-text-secondary)]">{demoMom.summary}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] mb-1">Decisions</p>
            <ul className="list-disc pl-5 text-[var(--color-text-secondary)]">
              {demoMom.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] mb-1">Action Items</p>
            <ul className="list-disc pl-5 text-[var(--color-text-secondary)]">
              {demoMom.actions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "email":
      return (
        <div className="glass rounded-lg p-4 text-sm space-y-2">
          <p>
            <span className="text-[var(--color-text-muted)]">To:</span> {demoEmail.to}
          </p>
          <p>
            <span className="text-[var(--color-text-muted)]">Subject:</span> {demoEmail.subject}
          </p>
          <p className="text-[var(--color-text-secondary)] pt-2 border-t border-[var(--color-border)]">
            {demoEmail.body}
          </p>
        </div>
      );
    case "actions":
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                <th className="pb-2 pr-3">Who</th>
                <th className="pb-2 pr-3">What</th>
                <th className="pb-2 pr-3">When</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {demoActionItems.map((item) => (
                <tr key={item.what} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-2.5 pr-3 font-medium">{item.who}</td>
                  <td className="py-2.5 pr-3 text-[var(--color-text-secondary)]">{item.what}</td>
                  <td className="py-2.5 pr-3">{item.when}</td>
                  <td className="py-2.5">
                    <span className="badge !text-[0.7rem]">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "followup":
      return (
        <div className="space-y-3 text-sm">
          <p className="text-[var(--color-text-secondary)] leading-relaxed">{demoFollowUp.bot}</p>
          <p className="text-[var(--color-accent-light)] font-medium">{demoFollowUp.status}</p>
        </div>
      );
    case "memory":
      return (
        <div className="space-y-3 text-sm">
          <div className="glass rounded-lg p-3 text-[var(--color-text-muted)]">
            &ldquo;{demoMemory.question}&rdquo;
          </div>
          <div className="glass rounded-lg p-3 text-[var(--color-text-secondary)] leading-relaxed">
            {demoMemory.answer}
          </div>
        </div>
      );
    case "preread":
      return (
        <div className="text-sm">
          <p className="font-semibold mb-3">{demoPreread.title}</p>
          <ul className="space-y-2">
            {demoPreread.points.map((point) => (
              <li key={point} className="flex gap-2 text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-accent-light)]">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

export function TryDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentStep = demoSteps[activeIndex];

  const goToStep = useCallback((index: number) => {
    setActiveIndex(index);
    setFinished(index >= demoSteps.length - 1);
  }, []);

  const startDemo = () => {
    setPlaying(true);
    setFinished(false);
    setActiveIndex(0);
  };

  const stopDemo = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (!playing || finished) return;

    const timer = window.setTimeout(() => {
      if (activeIndex < demoSteps.length - 1) {
        goToStep(activeIndex + 1);
      } else {
        setPlaying(false);
        setFinished(true);
      }
    }, STEP_MS);

    return () => window.clearTimeout(timer);
  }, [playing, finished, activeIndex, goToStep]);

  return (
    <section id="try-demo" className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="section-container">
        <div className="text-center mb-10">
          <span className="badge mb-4">Interactive Preview</span>
          <h2 className="section-title mb-4">
            Experience MeetingBuddyAI <span className="gradient-text">Instantly</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Walk through a sample sprint review — from meeting playback to transcript, MoM, email,
            action items, bot follow-up, chatbot memory, and pre-read generation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto gradient-border rounded-2xl overflow-hidden">
            <div className="p-5 md:p-6 border-b border-[var(--color-border)] flex flex-wrap gap-3 items-center justify-between">
              <div>
                <p className="font-semibold">{currentStep.title}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{currentStep.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!playing && !finished && (
                  <button type="button" className="btn-primary" onClick={startDemo}>
                    Start Demo
                  </button>
                )}
                {playing && (
                  <button type="button" className="btn-secondary" onClick={stopDemo}>
                    Pause
                  </button>
                )}
                {finished && (
                  <button type="button" className="btn-primary" onClick={startDemo}>
                    Replay Demo
                  </button>
                )}
                <a href="#beta" className="btn-secondary">
                  Request Beta Access
                </a>
              </div>
            </div>

            <div className="p-4 md:p-5 border-b border-[var(--color-border)] overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {demoSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      stopDemo();
                      goToStep(index);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      index === activeIndex
                        ? "bg-indigo-500/20 text-[var(--color-accent-light)] border border-indigo-500/40"
                        : index < activeIndex
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-white/5 text-[var(--color-text-muted)] border border-[var(--color-border)]"
                    }`}
                  >
                    {index + 1}. {step.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 md:p-8 min-h-[280px] bg-[var(--color-bg-primary)]/40">
              <StepPanel stepId={currentStep.id} />
            </div>

            {playing && (
              <div className="h-1 bg-white/5">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${((activeIndex + 1) / demoSteps.length) * 100}%` }}
                />
              </div>
            )}
          </div>

        <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
          Sample data only — the full product runs locally on your machine with real meetings.
        </p>
      </div>
    </section>
  );
}
