"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/demo", label: "Passaporte", icon: "🪪" },
  { href: "/demo/parceiros", label: "Parceiros", icon: "🤝" },
  { href: "/demo/carimbos", label: "Carimbos", icon: "🔖" },
];

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--papel)" }}>
      {/* Banner demo */}
      <div
        className="text-center text-xs py-1.5 font-medium"
        style={{ backgroundColor: "var(--verde-salvia)", color: "var(--verde-aura)" }}
      >
        ✦ Modo demonstração · dados fictícios ✦
      </div>

      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-4"
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
        <Link
          href="/login"
          className="text-xs px-3 py-1 rounded-full border"
          style={{ borderColor: "var(--verde-salvia)", color: "var(--verde-oliva)" }}
        >
          Entrar de verdade
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Tabs */}
      <nav
        className="fixed bottom-0 left-0 right-0"
        style={{
          backgroundColor: "var(--papel)",
          borderTop: "1px solid var(--verde-nevoa)",
        }}
      >
        <div className="flex">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/demo"
                ? pathname === "/demo"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center gap-1 py-3"
              >
                <span className="text-xl">{tab.icon}</span>
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
