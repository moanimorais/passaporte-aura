"use client";

import { useState } from "react";
import { SEED_PARTNERS } from "@/lib/seed-data";

type Etapa = "form" | "enviado";

const EXEMPLOS = [
  "A marca parceira não cumpriu o benefício descrito no passaporte.",
  "Fui mal atendida ao apresentar o passaporte.",
  "O PIN que me informaram não funcionou.",
  "A marca negou o benefício sem justificativa.",
];

export default function SuportePage() {
  const [etapa, setEtapa] = useState<Etapa>("form");
  const [marca, setMarca] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exemplo, setExemplo] = useState<string | null>(null);

  async function enviar() {
    if (!marca || !data || !descricao.trim()) return;
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 800));
    setEnviando(false);
    setEtapa("enviado");
  }

  if (etapa === "enviado") {
    return (
      <div className="px-5 py-10 max-w-md mx-auto flex flex-col items-center text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl"
          style={{ backgroundColor: "rgba(27,67,50,0.1)" }}
        >
          ✓
        </div>
        <h2 className="font-serif text-xl mb-3" style={{ color: "var(--verde-aura)" }}>
          Reclamação recebida
        </h2>
        <p className="text-sm mb-2" style={{ color: "var(--verde-oliva)" }}>
          Recebemos seu relato sobre <strong>{marca}</strong>.
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--verde-salvia)" }}>
          A Aura Experience vai analisar e entrar em contato em até 3 dias úteis. Levamos isso muito a sério.
        </p>
        <button
          onClick={() => { setEtapa("form"); setMarca(""); setData(""); setDescricao(""); setExemplo(null); }}
          className="text-sm px-5 py-2 rounded-full border"
          style={{ borderColor: "var(--verde-salvia)", color: "var(--verde-oliva)" }}
        >
          Enviar outro relato
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <h1 className="font-serif text-xl mb-1" style={{ color: "var(--verde-aura)" }}>
        Relatar um problema
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--verde-salvia)" }}>
        Algo não funcionou como esperado? Conte para a gente — toda reclamação é analisada.
      </p>

      {/* Marca */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1" style={{ color: "var(--verde-oliva)" }}>
          Qual marca parceira? *
        </label>
        <select
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none border appearance-none"
          style={{
            backgroundColor: "var(--creme)",
            borderColor: marca ? "var(--verde-aura)" : "var(--verde-nevoa)",
            color: marca ? "var(--verde-aura)" : "var(--verde-salvia)",
          }}
        >
          <option value="">Selecione a marca...</option>
          {SEED_PARTNERS.map((p) => (
            <option key={p.id} value={p.nome}>{p.nome}</option>
          ))}
          <option value="Outra">Outra (não listada)</option>
        </select>
      </div>

      {/* Data */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1" style={{ color: "var(--verde-oliva)" }}>
          Quando aconteceu? *
        </label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
          style={{
            backgroundColor: "var(--creme)",
            borderColor: data ? "var(--verde-aura)" : "var(--verde-nevoa)",
            color: "var(--verde-aura)",
          }}
        />
      </div>

      {/* Exemplos */}
      <div className="mb-3">
        <label className="block text-xs font-medium mb-2" style={{ color: "var(--verde-oliva)" }}>
          O que aconteceu? * — ou escolha um exemplo abaixo
        </label>
        <div className="flex flex-col gap-2 mb-3">
          {EXEMPLOS.map((ex) => (
            <button
              key={ex}
              onClick={() => { setDescricao(ex); setExemplo(ex); }}
              className="text-left text-xs px-3 py-2 rounded-lg border transition-all"
              style={{
                borderColor: exemplo === ex ? "var(--verde-aura)" : "var(--verde-nevoa)",
                backgroundColor: exemplo === ex ? "rgba(27,67,50,0.06)" : "var(--creme)",
                color: exemplo === ex ? "var(--verde-aura)" : "var(--verde-salvia)",
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        <textarea
          value={descricao}
          onChange={(e) => { setDescricao(e.target.value); setExemplo(null); }}
          placeholder="Descreva com detalhes o que aconteceu: qual benefício foi negado, como foi o atendimento, o que a marca disse..."
          rows={5}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none border resize-none"
          style={{
            backgroundColor: "var(--creme)",
            borderColor: descricao ? "var(--verde-aura)" : "var(--verde-nevoa)",
            color: "var(--verde-aura)",
          }}
        />
        <p className="text-xs mt-1" style={{ color: "var(--verde-salvia)" }}>
          Quanto mais detalhes, mais rápido conseguimos resolver.
        </p>
      </div>

      <button
        onClick={enviar}
        disabled={!marca || !data || !descricao.trim() || enviando}
        className="w-full py-4 rounded-xl font-medium text-base mt-2 transition-all disabled:opacity-40"
        style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}
      >
        {enviando ? "Enviando..." : "Enviar reclamação"}
      </button>

      <p className="text-xs text-center mt-4" style={{ color: "var(--verde-salvia)" }}>
        Respondemos em até 3 dias úteis · oi@auraexperience.net.br
      </p>
    </div>
  );
}
