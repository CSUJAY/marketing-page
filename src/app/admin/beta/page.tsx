"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type BetaRegistration = {
  id: string;
  name: string;
  email: string;
  organization?: string;
  os: string;
  createdAt: string;
};

type AdminResponse = {
  count: number;
  osCounts: Record<string, number>;
  registrations: BetaRegistration[];
};

const STORAGE_KEY = "meetingbuddy-beta-admin-key";

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatOs(os: string) {
  if (os === "macos") return "macOS";
  return os.charAt(0).toUpperCase() + os.slice(1);
}

export default function BetaAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [data, setData] = useState<AdminResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRegistrations = useCallback(async (key: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/beta/registrations", {
        headers: { Authorization: `Bearer ${key}` },
      });
      const body = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(STORAGE_KEY);
          setAdminKey("");
        }
        setData(null);
        setError(body.error ?? "Failed to load registrations.");
        return;
      }

      setData(body as AdminResponse);
    } catch {
      setError("Network error while loading registrations.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAdminKey(saved);
      void fetchRegistrations(saved);
    }
  }, [fetchRegistrations]);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = inputKey.trim();
    if (!trimmed) return;
    sessionStorage.setItem(STORAGE_KEY, trimmed);
    setAdminKey(trimmed);
    void fetchRegistrations(trimmed);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAdminKey("");
    setInputKey("");
    setData(null);
    setError("");
  };

  const csvContent = useMemo(() => {
    if (!data?.registrations.length) return "";

    const header = ["Name", "Email", "Organization", "OS", "Registered At"];
    const rows = data.registrations.map((entry) => [
      entry.name,
      entry.email,
      entry.organization ?? "",
      formatOs(entry.os),
      entry.createdAt,
    ]);

    return [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
  }, [data]);

  const downloadCsv = () => {
    if (!csvContent) return;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `beta-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="section-container py-10 md:py-14 max-w-6xl">
        <div className="mb-8">
          <p className="text-sm text-[var(--color-text-muted)] mb-2">MeetingBuddyAI internal</p>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Beta Registrations</h1>
          <p className="text-[var(--color-text-secondary)]">
            View everyone who requested beta access. This page is password-protected and not linked
            from the public site.
          </p>
        </div>

        {!adminKey ? (
          <form onSubmit={handleLogin} className="glass-strong rounded-2xl p-6 md:p-8 max-w-md">
            <label htmlFor="admin-key" className="block text-sm font-medium mb-2">
              Admin password
            </label>
            <input
              id="admin-key"
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-[var(--color-border)] mb-4"
              placeholder="Enter BETA_ADMIN_SECRET"
              autoComplete="current-password"
            />
            {error && (
              <p className="text-sm text-red-400 mb-4" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Checking..." : "View registrations"}
            </button>
          </form>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => void fetchRegistrations(adminKey)}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={downloadCsv}
                disabled={!data?.registrations.length}
              >
                Export CSV
              </button>
              <button type="button" className="btn-secondary" onClick={handleLogout}>
                Log out
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-400 mb-4" role="alert">
                {error}
              </p>
            )}

            {data && (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="glass rounded-xl p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Total signups</p>
                    <p className="text-3xl font-bold text-[var(--color-accent-light)]">
                      {data.count}
                    </p>
                  </div>
                  {Object.entries(data.osCounts).map(([os, count]) => (
                    <div key={os} className="glass rounded-xl p-5">
                      <p className="text-sm text-[var(--color-text-muted)] mb-1">{formatOs(os)}</p>
                      <p className="text-3xl font-bold">{count}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-strong rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--color-border)] text-left">
                          <th className="p-4 font-medium text-[var(--color-text-muted)]">#</th>
                          <th className="p-4 font-medium text-[var(--color-text-muted)]">Name</th>
                          <th className="p-4 font-medium text-[var(--color-text-muted)]">Email</th>
                          <th className="p-4 font-medium text-[var(--color-text-muted)]">
                            Organization
                          </th>
                          <th className="p-4 font-medium text-[var(--color-text-muted)]">OS</th>
                          <th className="p-4 font-medium text-[var(--color-text-muted)]">
                            Registered
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.registrations.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="p-8 text-center text-[var(--color-text-secondary)]"
                            >
                              No beta signups yet.
                            </td>
                          </tr>
                        ) : (
                          data.registrations.map((entry, index) => (
                            <tr
                              key={entry.id}
                              className="border-b border-[var(--color-border)] last:border-b-0"
                            >
                              <td className="p-4 text-[var(--color-text-muted)]">
                                {data.count - index}
                              </td>
                              <td className="p-4 font-medium">{entry.name}</td>
                              <td className="p-4">{entry.email}</td>
                              <td className="p-4 text-[var(--color-text-secondary)]">
                                {entry.organization || "—"}
                              </td>
                              <td className="p-4">{formatOs(entry.os)}</td>
                              <td className="p-4 text-[var(--color-text-secondary)] whitespace-nowrap">
                                {formatDate(entry.createdAt)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
