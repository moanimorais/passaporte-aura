"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar e-mail");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "var(--papel)" }}
    >
      {/* Logo / Selo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center border-2"
          style={{
            backgroundColor: "var(--verde-aura)",
            borderColor: "var(--verde-salvia)",
          }}
        >
          <span className="text-3xl">🌿</span>
        </div>
        <h1
          className="text-2xl font-serif text-center leading-tight"
          style={{ color: "var(--verde-aura)" }}
        >
          Passaporte Aura
        </h1>
        <p
          className="text-sm text-center"
          style={{ color: "var(--verde-oliva)" }}
        >
          Clube de benefícios · Praia do Rosa
        </p>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-6 shadow-sm"
        style={{ backgroundColor: "var(--creme)" }}
      >
        {!sent ? (
          <>
            <h2
              className="font-serif text-lg mb-1"
              style={{ color: "var(--verde-aura)" }}
            >
              Entrar
            </h2>
            <p className="text-sm mb-5" style={{ color: "var(--verde-oliva)" }}>
              Digite seu e-mail e enviaremos um link mágico para você acessar.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
                style={{
                  backgroundColor: "var(--papel)",
                  borderColor: "var(--verde-salvia)",
                  color: "var(--verde-aura)",
                }}
              />
              {error && (
                <p className="text-xs text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3 text-sm font-medium transition-opacity"
                style={{
                  backgroundColor: "var(--verde-aura)",
                  color: "var(--papel)",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Enviando..." : "Enviar link mágico"}
              </button>
            </form>

            {/* Demo mode */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--verde-nevoa)" }}>
              <p className="text-xs text-center mb-2" style={{ color: "var(--verde-oliva)" }}>
                Modo demonstração
              </p>
              <a
                href="/demo"
                className="block w-full text-center rounded-xl py-3 text-sm font-medium border transition-opacity"
                style={{
                  borderColor: "var(--verde-salvia)",
                  color: "var(--verde-oliva)",
                  backgroundColor: "transparent",
                }}
              >
                Ver protótipo sem login →
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📬</div>
            <h2
              className="font-serif text-lg mb-2"
              style={{ color: "var(--verde-aura)" }}
            >
              Verifique seu e-mail
            </h2>
            <p className="text-sm" style={{ color: "var(--verde-oliva)" }}>
              Enviamos um link para <strong>{email}</strong>. Clique nele para
              entrar no seu Passaporte Aura.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-xs underline"
              style={{ color: "var(--verde-oliva)" }}
            >
              Tentar outro e-mail
            </button>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs text-center" style={{ color: "var(--verde-salvia)" }}>
        Aura Experience · Praia do Rosa, SC
      </p>
    </main>
  );
}
