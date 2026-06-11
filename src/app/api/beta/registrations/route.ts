import { NextResponse } from "next/server";
import { getAdminAuthHeader, getAdminSecret, isValidAdminSecret } from "@/lib/beta-admin";
import { getRegistrations } from "@/lib/beta-store";

export async function GET(request: Request) {
  if (!getAdminSecret()) {
    return NextResponse.json(
      {
        error:
          "Admin access is not configured. Set BETA_ADMIN_SECRET in your environment variables.",
      },
      { status: 503 }
    );
  }

  const provided = getAdminAuthHeader(request);
  if (!isValidAdminSecret(provided)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const registrations = await getRegistrations();
    const sorted = [...registrations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const osCounts = sorted.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.os] = (acc[entry.os] ?? 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      count: sorted.length,
      osCounts,
      registrations: sorted,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load registrations." }, { status: 500 });
  }
}
