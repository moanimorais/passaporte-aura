"use client";

import { useState } from "react";

const EMOJIS: Record<string, string> = {
  "Surf & Esportes": "🏄",
  "Gastronomia": "🍃",
  "Hospedagem": "🌿",
  "Artesanato": "🏺",
  "Bem-estar": "🌸",
};

interface Partner {
  id: string;
  nome: string;
  categoria: string;
  cidade: string;
  instagram: string;
  descricao: string;
  emoji: string;
  benefits: { id: string; descricao: string }[];
}

interface Props {
  partners: Partner[];
  usedPartnerIds: string[];
}

export default function ParceirosClient({ partners, usedPartnerIds }: Props) {
  const categorias = ["Todas", ...Array.from(new Set(partners.map((p) => p.categoria)))];
  const [categoria, setCategoria] = useState("Todas");
  const [busca, setBusca] = useState("");

  const filtered = partners.filter((p) => {
    const matchCat = categoria === "Todas" || p.categoria === categoria;
    const matchBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cidade.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <h1 className="font-serif text-xl mb-4" style={{ color: "var(--verde-aura)" }}>Parceiros</h1>

      <input
        type="search"
        placeholder="Buscar parceiro ou cidade..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm mb-4 outline-none border"
        style={{ backgroundColor: "var(--creme)", borderColor: "var(--verde-nevoa)", color: "var(--verde-aura)" }}
      />

      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {categorias.map((cat) => (
          <button key={cat} onClick={() => setCategoria(cat)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
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
          const usado = usedPartnerIds.includes(partner.id);
          const emoji = partner.emoji || EMOJIS[partner.categoria] || "🌿";
          const benefit = partner.benefits?.[0]?.descricao ?? "Benefício exclusivo";

          return (
            <div key={partner.id} className="rounded-xl p-4"
              style={{ backgroundColor: "var(--creme)", opacity: usado ? 0.75 : 1 }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-sm" style={{ color: "var(--verde-aura)" }}>{partner.nome}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: usado ? "var(--verde-nevoa)" : "rgba(46,58,29,0.1)",
                        color: usado ? "var(--verde-oliva)" : "var(--verde-aura)",
                      }}>
                      {usado ? "✓ Usado" : "Disponível"}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--verde-salvia)" }}>
                    {partner.categoria} · {partner.cidade}
                  </p>
                  <p className="text-sm mt-2 font-medium" style={{ color: "var(--verde-oliva)" }}>{benefit}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--verde-salvia)" }}>{partner.descricao}</p>
                </div>
              </div>

              {!usado && (
                <div className="mt-3 pt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--verde-nevoa)" }}>
                  <a href={`https://instagram.com/${partner.instagram?.replace("@", "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs" style={{ color: "var(--verde-salvia)" }}>
                    {partner.instagram}
                  </a>
                  <span className="text-xs" style={{ color: "var(--verde-salvia)" }}>
                    Mostre seu QR ao chegar →
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: "var(--verde-salvia)" }}>
            Nenhum parceiro encontrado
          </p>
        )}
      </div>
    </div>
  );
}
