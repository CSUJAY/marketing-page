import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beta Admin — MeetingBuddyAI",
  robots: { index: false, follow: false },
};

export default function BetaAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
