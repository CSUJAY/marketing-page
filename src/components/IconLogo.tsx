"use client";

import { useId } from "react";

type IconProps = { className?: string };

export function IconLogo({ className }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill={`url(#${gradientId})`} />
      <path d="M8 12h6v8H8zM14 10h6v10h-6zM20 14h4v6h-4z" fill="white" fillOpacity="0.9" />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
