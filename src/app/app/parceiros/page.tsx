"use client";

import { useState } from "react";
import { SEED_PARTNERS, SEED_REDEMPTIONS } from "@/lib/seed-data";

const CATEGORIAS = ["Todas", "Gastronomia", "Surf & Esportes", "Hospedagem", "Artesanato", "Bem-estar"];

export default function ParceirosPage() {
  const [categoria, setCategoria] = useState("Todas");
  const [busca, setBusca] = useState("");

  const filtered = SEED_PARTNERS.filter((p) => {
    const matchCat = categoria === "Todas" || p.categoria === categoria;
    const matchBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cidade.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <h1 className="font-serif text-xl mb-4" style={{ color: "var(--verde-aura)" }}>Parceiros</h1>

      <input type="search" placeholder="Buscar parceiro ou cidade..."
        value={busca} onChange={(e) => setBusca(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm mb-4 outline-none border"
        style={{ backgroundColor: "var(--creme)", borderColor: "var(--verde-nevoa)", color: "var(--verde-aura)" }}
      />

      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {CATEGORIAS.map((cat) => (
          <button key={cat} onClick={() => setCategoria(cat)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: categoria === cat ? "var(--verde-aura)" : "var(--creme)",
              color: categoria === cat ? "var(--papel)" : "var(--verde-oliva)",
              border: `1px solid ${categoria === cat ? "var(--verde-aura)" : "var(--verde-nevoa)"}`,
            }}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((partner) => {
          const usado = SEED_REDEMPTIONS.includes(partner.id);
          return (
            <div key={partner.id} className="rounded-xl p-4"
              style={{ backgroundColor: "var(--creme)", opacity: usado ? 0.75 : 1 }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{partner.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-sm" style={{ color: "var(--verde-aura)" }}>{partner.nome}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: usado ? "var(--verde-nevoa)" : "rgba(46,58,29,0.1)",
                        color: usado ? "var(--verde-oliva)" : "var(--verde-aura)",
                      }}>
                      {usado ? "✓ Usado" : "Disponível"}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--verde-salvia)" }}>{partner.categoria} · {partner.cidade}</p>
                  <p className="text-sm mt-2 font-medium" style={{ color: "var(--verde-oliva)" }}>{partner.benefit}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--verde-salvia)" }}>{partner.descricao}</p>
                </div>
              </div>
              {!usado && (
                <div className="mt-3 pt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--verde-nevoa)" }}>
                  <span className="text-xs" style={{ color: "var(--verde-salvia)" }}>{partner.instagram}</span>
                  <span className="text-xs" style={{ color: "var(--verde-salvia)" }}>Mostre seu QR ao chegar →</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
