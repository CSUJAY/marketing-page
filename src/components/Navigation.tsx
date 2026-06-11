"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { IconLogo } from "@/components/IconLogo";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav
        className="section-container flex items-center justify-between h-16 md:h-[4.5rem]"
        aria-label="Main navigation"
      >
        <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="MeetingBuddyAI home">
          <IconLogo className="w-8 h-8" />
          <span className="font-semibold text-[1.05rem] tracking-tight">
            MeetingBuddy<span className="text-[var(--color-accent-light)]">AI</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3.5 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href="#beta" className="btn-primary text-sm !py-2.5 !px-5">
            Join Beta
          </a>
        </div>

        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 rounded-lg glass"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-0.5 bg-white mx-auto transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white mx-auto transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white mx-auto transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-[var(--color-border)]">
          <ul className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#beta" onClick={handleNavClick} className="btn-primary w-full">
                Join Beta
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
