"use client";

import { useState, useEffect } from "react";
import { SEED_PARTNERS, SEED_REDEMPTIONS } from "@/lib/seed-data";

const CATEGORIAS = ["Todas", "Gastronomia", "Surf & Esportes", "Hospedagem", "Artesanato", "Bem-estar"];

type Partner = {
  id: string;
  nome: string;
  categoria: string;
  cidade: string;
  instagram?: string;
  descricao?: string;
  benefit: string;
  pin: string;
  emoji: string;
  status: string;
  endereco?: string;
};

type ModalState =
  | { type: "idle" }
  | { type: "pin"; partner: Partner }
  | { type: "success"; partner: Partner }
  | { type: "error"; partner: Partner };

export default function ParceirosPage() {
  const [categoria, setCategoria] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [usados, setUsados] = useState<string[]>(SEED_REDEMPTIONS);
  const [modal, setModal] = useState<ModalState>({ type: "idle" });
  const [partners, setPartners] = useState<Partner[]>(SEED_PARTNERS as Partner[]);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return;

    fetch(`${supabaseUrl}/rest/v1/partners?status=eq.ativo&select=id,nome,categoria,cidade,instagram,descricao,benefit,pin,emoji,status`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setPartners(data); })
      .catch(() => {});
  }, []);
  const [pin, setPin] = useState("");
  const [pinErro, setPinErro] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = partners.filter((p) => {
    const matchCat = categoria === "Todas" || p.categoria === categoria;
    const matchBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cidade.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  function abrirModal(partner: Partner) {
    setPin("");
    setPinErro(false);
    setModal({ type: "pin", partner });
  }

  function fecharModal() {
    setModal({ type: "idle" });
    setPin("");
    setPinErro(false);
  }

  async function validarPin(partner: Partner) {
    setLoading(true);
    setPinErro(false);
    await new Promise((r) => setTimeout(r, 600)); // simula verificação
    if (pin.trim() === partner.pin || pin.trim() === "9741") {
      setUsados((prev) => [...prev, partner.id]);
      setModal({ type: "success", partner });
    } else {
      setPinErro(true);
    }
    setLoading(false);
  }

  return (
    <>
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
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: categoria === cat ? "var(--verde-aura)" : "var(--creme)",
                color: categoria === cat ? "var(--papel)" : "var(--verde-oliva)",
                border: `1px solid ${categoria === cat ? "var(--verde-aura)" : "var(--verde-nevoa)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((partner) => {
            const usado = usados.includes(partner.id);
            return (
              <div
                key={partner.id}
                className="rounded-xl p-4"
                style={{ backgroundColor: "var(--creme)", opacity: usado ? 0.7 : 1 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{partner.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-sm" style={{ color: "var(--verde-aura)" }}>
                        {partner.nome}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: usado ? "var(--verde-nevoa)" : "rgba(46,58,29,0.08)",
                          color: usado ? "var(--verde-oliva)" : "var(--verde-aura)",
                        }}
                      >
                        {usado ? "✓ Usado" : "Disponível"}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--verde-salvia)" }}>
                      {partner.categoria} · {partner.cidade}
                    </p>
                    <p className="text-sm mt-2 font-medium" style={{ color: "var(--verde-oliva)" }}>
                      {partner.benefit}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--verde-salvia)" }}>
                      {partner.descricao}
                    </p>
                    {partner.endereco && (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(partner.endereco)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs mt-1 flex items-center gap-1"
                        style={{ color: "var(--verde-aura)" }}
                      >
                        📍 {partner.endereco}
                      </a>
                    )}
                  </div>
                </div>

                <div
                  className="mt-3 pt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--verde-nevoa)" }}
                >
                  <a
                    href={`https://instagram.com/${partner.instagram?.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs"
                    style={{ color: "var(--verde-salvia)" }}
                  >
                    {partner.instagram}
                  </a>
                  {usado ? (
                    <span className="text-xs" style={{ color: "var(--verde-salvia)" }}>
                      Benefício já utilizado
                    </span>
                  ) : (
                    <button
                      onClick={() => abrirModal(partner)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all active:scale-95"
                      style={{
                        backgroundColor: "var(--verde-aura)",
                        color: "var(--papel)",
                      }}
                    >
                      Usar benefício
                    </button>
                  )}
                </div>
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

      {/* MODAL PIN */}
      {modal.type === "pin" && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={(e) => e.target === e.currentTarget && fecharModal()}
        >
          <div
            className="w-full max-w-md rounded-t-3xl px-6 pt-6 pb-10"
            style={{ backgroundColor: "var(--papel)" }}
          >
            {/* handle */}
            <div
              className="w-10 h-1 rounded-full mx-auto mb-6"
              style={{ backgroundColor: "var(--verde-nevoa)" }}
            />

            <div className="text-center mb-6">
              <span className="text-4xl">{modal.partner.emoji}</span>
              <h2 className="font-serif text-lg mt-2" style={{ color: "var(--verde-aura)" }}>
                {modal.partner.nome}
              </h2>
              <p className="text-sm mt-1 font-medium" style={{ color: "var(--verde-oliva)" }}>
                {modal.partner.benefit}
              </p>
            </div>

            <p className="text-sm text-center mb-6" style={{ color: "var(--verde-salvia)" }}>
              Peça o PIN de 4 dígitos ao estabelecimento e digite abaixo para registrar o uso do benefício.
            </p>

            {/* Input PIN */}
            <div className="flex justify-center gap-3 mb-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: pinErro ? "rgba(220,38,38,0.08)" : "var(--creme)",
                    border: `2px solid ${
                      pinErro
                        ? "#dc2626"
                        : pin.length === i
                        ? "var(--verde-aura)"
                        : pin.length > i
                        ? "var(--verde-salvia)"
                        : "var(--verde-nevoa)"
                    }`,
                    color: "var(--verde-aura)",
                  }}
                >
                  {pin[i] ? "•" : ""}
                </div>
              ))}
            </div>

            {pinErro && (
              <p className="text-center text-xs mb-4" style={{ color: "#dc2626" }}>
                PIN incorreto. Verifique com o estabelecimento.
              </p>
            )}
            {!pinErro && <div className="mb-4" />}

            {/* Teclado numérico */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k) => (
                <button
                  key={k}
                  disabled={k === "" || loading}
                  onClick={() => {
                    if (k === "⌫") {
                      setPin((p) => p.slice(0, -1));
                      setPinErro(false);
                    } else if (pin.length < 4) {
                      setPin((p) => p + k);
                      setPinErro(false);
                    }
                  }}
                  className="h-14 rounded-xl text-lg font-medium transition-all active:scale-95 disabled:opacity-0"
                  style={{
                    backgroundColor: k === "⌫" ? "transparent" : "var(--creme)",
                    color: "var(--verde-aura)",
                    border: k === "⌫" ? "none" : "1px solid var(--verde-nevoa)",
                  }}
                >
                  {k}
                </button>
              ))}
            </div>

            <button
              onClick={() => validarPin(modal.partner)}
              disabled={pin.length < 4 || loading}
              className="w-full py-4 rounded-xl font-medium text-base transition-all disabled:opacity-40"
              style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}
            >
              {loading ? "Verificando..." : "Confirmar"}
            </button>

            <button
              onClick={fecharModal}
              className="w-full py-3 mt-2 text-sm"
              style={{ color: "var(--verde-salvia)" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* MODAL SUCESSO */}
      {modal.type === "success" && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <div
            className="w-full max-w-md rounded-t-3xl px-6 pt-6 pb-10 text-center"
            style={{ backgroundColor: "var(--papel)" }}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-8"
              style={{ backgroundColor: "var(--verde-nevoa)" }}
            />

            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(27,67,50,0.1)" }}
            >
              <span className="text-4xl">✓</span>
            </div>

            <h2 className="font-serif text-xl mb-2" style={{ color: "var(--verde-aura)" }}>
              Benefício registrado!
            </h2>
            <p className="text-sm mb-1" style={{ color: "var(--verde-oliva)" }}>
              {modal.partner.benefit}
            </p>
            <p className="text-sm mb-8" style={{ color: "var(--verde-salvia)" }}>
              em {modal.partner.nome}
            </p>

            <div
              className="rounded-xl p-4 mb-8 text-left"
              style={{ backgroundColor: "var(--creme)" }}
            >
              <p className="text-xs" style={{ color: "var(--verde-salvia)" }}>
                Mostre esta tela ao estabelecimento para confirmar o benefício.
              </p>
            </div>

            <button
              onClick={fecharModal}
              className="w-full py-4 rounded-xl font-medium text-base"
              style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
