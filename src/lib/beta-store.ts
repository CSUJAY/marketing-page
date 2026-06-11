import { promises as fs } from "fs";
import os from "os";
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

const KV_KEY = "beta:registrations";

function getRedisCredentials():
  | { url: string; token: string }
  | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function isKvStoreEnabled(): boolean {
  return getRedisCredentials() !== null;
}

function getFilePath(): string {
  if (process.env.BETA_REGISTRATIONS_FILE) {
    return process.env.BETA_REGISTRATIONS_FILE;
  }

  if (process.env.VERCEL) {
    return path.join(os.tmpdir(), "meetingbuddy-beta-registrations.json");
  }

  return path.join(process.cwd(), "data", "beta-registrations.json");
}

async function readFromFile(): Promise<BetaRegistration[]> {
  const filePath = getFilePath();

  if (!process.env.VERCEL) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as BetaRegistration[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeToFile(registrations: BetaRegistration[]): Promise<void> {
  const filePath = getFilePath();

  if (!process.env.VERCEL) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }

  await fs.writeFile(filePath, JSON.stringify(registrations, null, 2), "utf-8");
}

async function getRedisClient() {
  const credentials = getRedisCredentials();
  if (!credentials) {
    throw new Error("Redis credentials are not configured.");
  }

  const { Redis } = await import("@upstash/redis");
  return new Redis(credentials);
}

async function readFromKv(): Promise<BetaRegistration[]> {
  const redis = await getRedisClient();
  return (await redis.get<BetaRegistration[]>(KV_KEY)) ?? [];
}

async function writeToKv(registrations: BetaRegistration[]): Promise<void> {
  const redis = await getRedisClient();
  await redis.set(KV_KEY, registrations);
}

async function readAll(): Promise<BetaRegistration[]> {
  if (isKvStoreEnabled()) {
    return readFromKv();
  }
  return readFromFile();
}

async function writeAll(registrations: BetaRegistration[]): Promise<void> {
  if (isKvStoreEnabled()) {
    await writeToKv(registrations);
    return;
  }
  await writeToFile(registrations);
}

export async function getRegistrations(): Promise<BetaRegistration[]> {
  return readAll();
}

export async function getRegistrationCount(): Promise<number> {
  const registrations = await getRegistrations();
  return registrations.length;
}

export async function addRegistration(
  data: Omit<BetaRegistration, "id" | "createdAt">
): Promise<{ registration: BetaRegistration; count: number }> {
  const registrations = await readAll();
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
  await writeAll(registrations);

  return { registration, count: registrations.length };
}
