export function getAdminSecret(): string | undefined {
  return process.env.BETA_ADMIN_SECRET?.trim() || undefined;
}

export function isValidAdminSecret(provided: string | null | undefined): boolean {
  const secret = getAdminSecret();
  if (!secret || !provided) return false;
  return provided === secret;
}

export function getAdminAuthHeader(request: Request): string | null {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }
  return request.headers.get("x-admin-key")?.trim() ?? null;
}
