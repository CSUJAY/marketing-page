import { footerLinks } from "@/lib/data";
import { IconLogo } from "@/components/IconLogo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-2.5 w-fit" aria-label="MeetingBuddyAI home">
              <IconLogo className="w-7 h-7" />
              <span className="font-semibold tracking-tight">
                MeetingBuddy<span className="text-[var(--color-accent-light)]">AI</span>
              </span>
            </a>
            <p className="text-sm text-[var(--color-text-muted)]">
              Privacy-First Meeting Intelligence.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)] text-center md:text-left">
            &copy; 2026 Apex Cognition LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
