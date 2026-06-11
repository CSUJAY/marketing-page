import type { BetaRegistration } from "@/lib/beta-store";

type NotifyPayload = {
  event: "beta_registration";
  count: number;
  registration: BetaRegistration;
};

export async function notifyBetaRegistration(
  registration: BetaRegistration,
  count: number
): Promise<void> {
  const webhookUrl = process.env.BETA_NOTIFY_WEBHOOK?.trim();
  if (!webhookUrl) return;

  const payload: NotifyPayload = {
    event: "beta_registration",
    count,
    registration,
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Beta notification webhook failed:", error);
  }
}
