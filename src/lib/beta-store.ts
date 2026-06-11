import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type BetaRegistration = {
  id: string;
  name: string;
  email: string;
  organization?: string;
  os: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "beta-registrations.json");

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(REGISTRATIONS_FILE);
  } catch {
    await fs.writeFile(REGISTRATIONS_FILE, "[]", "utf-8");
  }
}

export async function getRegistrations(): Promise<BetaRegistration[]> {
  await ensureStore();
  const raw = await fs.readFile(REGISTRATIONS_FILE, "utf-8");
  return JSON.parse(raw) as BetaRegistration[];
}

export async function getRegistrationCount(): Promise<number> {
  const registrations = await getRegistrations();
  return registrations.length;
}

export async function addRegistration(
  data: Omit<BetaRegistration, "id" | "createdAt">
): Promise<{ registration: BetaRegistration; count: number }> {
  const registrations = await getRegistrations();
  const emailLower = data.email.toLowerCase();

  if (registrations.some((r) => r.email.toLowerCase() === emailLower)) {
    throw new Error("DUPLICATE_EMAIL");
  }

  const registration: BetaRegistration = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  registrations.push(registration);
  await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2), "utf-8");

  return { registration, count: registrations.length };
}
