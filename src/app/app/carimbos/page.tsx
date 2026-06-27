"use client";

import { SEED_PARTNERS, SEED_REDEMPTIONS } from "@/lib/seed-data";

const REDEMPTION_DATES: Record<string, string> = {
  p2: "2026-06-20T14:30:00",
};

export default function CarimbosPage() {
  const usados = SEED_PARTNERS.filter((p) => SEED_REDEMPTIONS.includes(p.id));

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <h1 className="font-serif text-xl mb-1" style={{ color: "var(--verde-aura)" }}>Meus Carimbos</h1>
      <p className="text-sm mb-6" style={{ color: "var(--verde-salvia)" }}>Experiências que você já viveu</p>

      {usados.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="font-serif text-lg mb-2" style={{ color: "var(--verde-aura)" }}>Sua aventura começa aqui</p>
          <p className="text-sm" style={{ color: "var(--verde-salvia)" }}>Visite um parceiro Aura para ganhar seu primeiro carimbo.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {usados.map((partner) => (
            <div key={partner.id} className="rounded-xl p-4 flex items-center gap-4"
              style={{ backgroundColor: "var(--creme)" }}>
              <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl flex-shrink-0"
                style={{ borderColor: "var(--verde-salvia)", backgroundColor: "var(--verde-nevoa)", borderStyle: "dashed" }}>
                {partner.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm" style={{ color: "var(--verde-aura)" }}>{partner.nome}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--verde-salvia)" }}>{partner.categoria} · {partner.cidade}</p>
                <p className="text-xs mt-1.5 font-medium" style={{ color: "var(--verde-oliva)" }}>{partner.benefit}</p>
                {REDEMPTION_DATES[partner.id] && (
                  <p className="text-xs mt-1 opacity-60" style={{ color: "var(--verde-aura)" }}>
                    {formatDate(REDEMPTION_DATES[partner.id])}
                  </p>
                )}
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                style={{ backgroundColor: "var(--verde-aura)", color: "var(--creme)" }}>✓</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
