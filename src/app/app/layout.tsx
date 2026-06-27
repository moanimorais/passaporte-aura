"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ErrorHandler from "./error-handler";

const tabs = [
  { href: "/app", label: "Passaporte", icon: TabPassaporte },
  { href: "/app/parceiros", label: "Parceiros", icon: TabParceiros },
  { href: "/app/carimbos", label: "Carimbos", icon: TabCarimbos },
];

function TabPassaporte({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <rect
        x="3" y="4" width="18" height="16" rx="3"
        stroke={active ? "var(--verde-aura)" : "var(--verde-salvia)"}
        strokeWidth="1.8"
        fill={active ? "var(--verde-nevoa)" : "none"}
      />
      <circle cx="9" cy="10" r="2.5"
        fill={active ? "var(--verde-aura)" : "var(--verde-salvia)"} />
      <path d="M14 9h3M14 11h2" stroke={active ? "var(--verde-aura)" : "var(--verde-salvia)"}
        strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 16h12" stroke={active ? "var(--verde-oliva)" : "var(--verde-salvia)"}
        strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TabParceiros({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8"
        stroke={active ? "var(--verde-aura)" : "var(--verde-salvia)"}
        strokeWidth="1.8"
        fill={active ? "var(--verde-nevoa)" : "none"}
      />
      <path d="M8 12h8M12 8v8" stroke={active ? "var(--verde-aura)" : "var(--verde-salvia)"}
        strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TabCarimbos({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9"
        stroke={active ? "var(--verde-aura)" : "var(--verde-salvia)"}
        strokeWidth="1.8"
        fill={active ? "var(--verde-nevoa)" : "none"}
        strokeDasharray="3 2"
      />
      <circle cx="12" cy="12" r="5"
        stroke={active ? "var(--verde-aura)" : "var(--verde-salvia)"}
        strokeWidth="1.5"
      />
      <path d="M10 12l1.5 1.5L14 10" stroke={active ? "var(--verde-aura)" : "var(--verde-salvia)"}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--papel)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-4 safe-top"
        style={{ backgroundColor: "var(--papel)", borderBottom: "1px solid var(--verde-nevoa)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ backgroundColor: "var(--verde-aura)" }}
          >
            🌿
          </div>
          <span className="font-serif text-base" style={{ color: "var(--verde-aura)" }}>
            Passaporte Aura
          </span>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="text-xs px-3 py-1 rounded-full border"
            style={{ borderColor: "var(--verde-salvia)", color: "var(--verde-oliva)" }}
          >
            Sair
          </button>
        </form>
      </header>

      <ErrorHandler />

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 safe-bottom"
        style={{
          backgroundColor: "var(--papel)",
          borderTop: "1px solid var(--verde-nevoa)",
        }}
      >
        <div className="flex">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
              >
                <Icon active={isActive} />
                <span
                  className="text-xs"
                  style={{
                    color: isActive ? "var(--verde-aura)" : "var(--verde-salvia)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
