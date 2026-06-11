import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MeetingBuddyAI — Private AI Meeting Intelligence",
  description:
    "Transform meetings into transcripts, Minutes of Meeting, and action items with bot follow-up — all stored in local AI chatbot memory. Privacy-first meeting intelligence.",
  keywords: [
    "meeting intelligence",
    "AI meeting assistant",
    "privacy-first AI",
    "local AI",
    "meeting transcription",
    "minutes of meeting",
    "Ollama",
    "enterprise meeting software",
  ],
  openGraph: {
    title: "MeetingBuddyAI — Private AI Meeting Intelligence",
    description:
      "Your meeting data never needs to leave your organization. Privacy-first AI meeting intelligence that runs on your device.",
    type: "website",
    siteName: "MeetingBuddyAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetingBuddyAI — Private AI Meeting Intelligence",
    description:
      "Transform meetings into actionable outcomes with privacy-first local AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
