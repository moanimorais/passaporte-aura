"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Estado = "idle" | "loading" | "liberado" | "jaUsado" | "invalido" | "expirado";

interface ResultadoLiberado {
  parceiro: { nome: string; emoji: string; categoria: string };
  usuario: { nome: string; codigo: string };
  beneficio: string;
}

export default function ParceiroPage() {
  const [pin, setPin] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const [resultado, setResultado] = useState<ResultadoLiberado | null>(null);

  async function validar() {
    if (!pin.trim()) return;
    setEstado("loading");

    try {
      const supabase = createClient();

      // Busca parceiro pelo PIN ou qr_token
      const { data: partner, error: pErr } = await supabase
        .from("partners")
        .select("id, nome, emoji, categoria, status")
        .or(`pin.eq.${pin.trim()},qr_token.eq.${pin.trim()}`)
        .eq("status", "ativo")
        .single();

      if (pErr || !partner) { setEstado("invalido"); return; }

      // Busca benefício do parceiro
      const { data: benefit } = await supabase
        .from("benefits")
        .select("id, descricao, vigencia_fim")
        .eq("partner_id", partner.id)
        .single();

      // Verifica se o passaporte/código existe (busca por código ou qr)
      // Por enquanto, busca qualquer usuário ativo que ainda não usou esse parceiro
      // Na versão completa, o QR do usuário seria escaneado
      // Para o teste via PIN, buscamos o primeiro usuário ativo
      const { data: users } = await supabase
        .from("users")
        .select("id, nome, codigo, status, validade_fim")
        .eq("status", "ativo")
        .order("created_at", { ascending: false })
        .limit(1);

      const user = users?.[0];
      if (!user) { setEstado("invalido"); return; }

      // Verifica se a vigência está ok
      if (user.validade_fim && new Date(user.validade_fim) < new Date()) {
        setEstado("expirado"); return;
      }

      // Verifica se já usou
      const { data: existing } = await supabase
        .from("redemptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("partner_id", partner.id)
        .single();

      if (existing) { setEstado("jaUsado"); return; }

      // Registra o uso
      await supabase.from("redemptions").insert({
        user_id: user.id,
        partner_id: partner.id,
        benefit_id: benefit?.id ?? null,
      });

      setResultado({
        parceiro: { nome: partner.nome, emoji: partner.emoji ?? "🌿", categoria: partner.categoria },
        usuario: { nome: user.nome, codigo: user.codigo },
        beneficio: benefit?.descricao ?? "Benefício exclusivo",
      });
      setEstado("liberado");

    } catch {
      setEstado("invalido");
    }
  }

  function resetar() {
    setEstado("idle");
    setPin("");
    setResultado(null);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--papel)" }}>
      <header className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: "var(--verde-aura)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>🌿</div>
        <div>
          <p className="font-serif text-sm" style={{ color: "var(--creme)" }}>Passaporte Aura</p>
          <p className="text-xs opacity-60" style={{ color: "var(--verde-nevoa)" }}>Portal do Parceiro</p>
        </div>
      </header>

      <main className="flex-1 px-5 py-8 max-w-sm mx-auto w-full">
        {estado === "idle" || estado === "invalido" ? (
          <>
            <h1 className="font-serif text-2xl mb-2" style={{ color: "var(--verde-aura)" }}>Validar Passaporte</h1>
            <p className="text-sm mb-8" style={{ color: "var(--verde-oliva)" }}>
              Digite o PIN do seu estabelecimento ou o código que aparece no passaporte da cliente.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium block mb-2" style={{ color: "var(--verde-oliva)" }}>
                  PIN ou código do passaporte
                </label>
                <input
                  type="text" inputMode="numeric" placeholder="ex: 1234"
                  value={pin} onChange={(e) => setPin(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && validar()}
                  className="w-full rounded-xl px-4 py-4 text-lg text-center font-mono outline-none border"
                  style={{
                    backgroundColor: "var(--creme)",
                    borderColor: estado === "invalido" ? "#dc2626" : "var(--verde-salvia)",
                    color: "var(--verde-aura)", letterSpacing: "0.2em",
                  }}
                />
                {estado === "invalido" && (
                  <p className="text-xs text-red-600 mt-1 text-center">PIN inválido. Tente novamente.</p>
                )}
              </div>
              <button onClick={validar} disabled={!pin.trim()}
                className="w-full rounded-xl py-4 font-medium transition-opacity"
                style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)", opacity: pin.trim() ? 1 : 0.5 }}>
                Validar
              </button>
              <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "var(--creme)" }}>
                <p className="text-xs mb-2" style={{ color: "var(--verde-oliva)" }}>Ou escaneie o QR Code da cliente</p>
                <button className="text-sm font-medium flex items-center gap-2 mx-auto" style={{ color: "var(--verde-aura)" }}>
                  📷 Abrir câmera
                </button>
                <p className="text-xs mt-2 opacity-60" style={{ color: "var(--verde-salvia)" }}>(em breve)</p>
              </div>
            </div>
            <div className="mt-8 rounded-xl p-4" style={{ backgroundColor: "var(--verde-nevoa)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--verde-aura)" }}>💡 Seu PIN</p>
              <p className="text-xs" style={{ color: "var(--verde-oliva)" }}>
                Seu PIN é fixo e foi enviado quando você cadastrou seu estabelecimento. Em caso de dúvida, entre em contato com a Aura.
              </p>
            </div>
          </>
        ) : estado === "loading" ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mb-4"
              style={{ borderColor: "var(--verde-salvia)", borderTopColor: "transparent" }} />
            <p style={{ color: "var(--verde-oliva)" }}>Verificando...</p>
          </div>
        ) : estado === "liberado" && resultado ? (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 border-4"
              style={{ backgroundColor: "var(--verde-nevoa)", borderColor: "var(--verde-salvia)" }}>
              ✅
            </div>
            <h2 className="font-serif text-2xl mb-2" style={{ color: "var(--verde-aura)" }}>Benefício Liberado!</h2>
            <p className="text-sm mb-6" style={{ color: "var(--verde-oliva)" }}>Passaporte válido. Carimbo registrado!</p>
            <div className="w-full rounded-xl p-5 mb-6 text-left" style={{ backgroundColor: "var(--creme)" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{resultado.parceiro.emoji}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--verde-aura)" }}>{resultado.usuario.nome}</p>
                  <p className="text-xs" style={{ color: "var(--verde-salvia)" }}>{resultado.usuario.codigo}</p>
                </div>
              </div>
              <div className="rounded-lg p-3" style={{ backgroundColor: "var(--verde-nevoa)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--verde-oliva)" }}>Benefício:</p>
                <p className="text-sm font-medium" style={{ color: "var(--verde-aura)" }}>{resultado.beneficio}</p>
              </div>
            </div>
            <button onClick={resetar} className="w-full rounded-xl py-4 font-medium"
              style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}>
              Nova validação
            </button>
          </div>
        ) : estado === "expirado" ? (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 border-4"
              style={{ backgroundColor: "var(--creme)", borderColor: "var(--verde-nevoa)" }}>
              📅
            </div>
            <h2 className="font-serif text-2xl mb-2" style={{ color: "var(--verde-aura)" }}>Passaporte Expirado</h2>
            <p className="text-sm mb-6" style={{ color: "var(--verde-oliva)" }}>
              A vigência deste passaporte já encerrou.
            </p>
            <button onClick={resetar} className="w-full rounded-xl py-4 font-medium border"
              style={{ borderColor: "var(--verde-salvia)", color: "var(--verde-oliva)", backgroundColor: "transparent" }}>
              Nova validação
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 border-4"
              style={{ backgroundColor: "var(--creme)", borderColor: "var(--verde-nevoa)" }}>
              🔒
            </div>
            <h2 className="font-serif text-2xl mb-2" style={{ color: "var(--verde-aura)" }}>Já Utilizado</h2>
            <p className="text-sm mb-6" style={{ color: "var(--verde-oliva)" }}>
              Este passaporte já utilizou o benefício nesta temporada.<br />
              Vigência: ago/2026 – ago/2027.
            </p>
            <button onClick={resetar} className="w-full rounded-xl py-4 font-medium border"
              style={{ borderColor: "var(--verde-salvia)", color: "var(--verde-oliva)", backgroundColor: "transparent" }}>
              Nova validação
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
