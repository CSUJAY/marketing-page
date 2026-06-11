import { NextResponse } from "next/server";
import { addRegistration, getRegistrationCount } from "@/lib/beta-store";
import { notifyBetaRegistration } from "@/lib/beta-notify";
import { validateBetaForm } from "@/lib/validate-beta-form";

export async function GET() {
  try {
    const count = await getRegistrationCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Failed to load registration count." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const form = {
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      organization: String(body.organization ?? ""),
      os: String(body.os ?? ""),
    };

    const errors = validateBetaForm(form);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { registration, count } = await addRegistration({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      organization: form.organization.trim() || undefined,
      os: form.os,
    });

    console.info(
      `[beta] New registration #${count}: ${registration.name} <${registration.email}> (${registration.os})`
    );
    void notifyBetaRegistration(registration, count);

    return NextResponse.json({ success: true, count, registration: { id: registration.id } });
  } catch (error) {
    if (error instanceof Error && error.message === "DUPLICATE_EMAIL") {
      return NextResponse.json(
        { errors: { email: "This email is already registered for beta access." } },
        { status: 409 }
      );
    }
    console.error("[beta] POST failed:", error);
    return NextResponse.json({ error: "Failed to submit registration." }, { status: 500 });
  }
}
