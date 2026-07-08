"use client";

import { SEED_USER, SEED_REDEMPTIONS, SEED_PARTNERS } from "@/lib/seed-data";
import QRCode from "@/components/QRCode";

export default function PassaportePage() {
  const user = SEED_USER;
  const usedCount = SEED_REDEMPTIONS.length;

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div
        className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--verde-aura) 0%, var(--verde-oliva) 100%)" }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: "var(--verde-salvia)" }} />
        <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: "var(--creme)" }} />

        <div className="flex items-start justify-between mb-6 relative z-10">
          <div>
            <p className="text-xs mb-1 opacity-70" style={{ color: "var(--verde-nevoa)" }}>PASSAPORTE AURA</p>
            <h2 className="font-serif text-xl leading-tight" style={{ color: "var(--creme)" }}>{user.nome}</h2>
          </div>
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl flex-shrink-0"
            style={{ borderColor: "var(--verde-salvia)", backgroundColor: "rgba(255,255,255,0.1)" }}>🌿</div>
        </div>

        <div className="relative z-10 mb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
              style={{ backgroundColor: "var(--verde-salvia)", color: "var(--verde-aura)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              ATIVO
            </span>
            <span className="text-xs opacity-60" style={{ color: "var(--verde-nevoa)" }}>até set/2027</span>
          </div>
        </div>

        <div className="relative z-10 flex items-end justify-between">
          <div>
            <p className="text-xs mb-1 opacity-60" style={{ color: "var(--verde-nevoa)" }}>Código</p>
            <p className="font-mono text-sm font-medium tracking-wider" style={{ color: "var(--creme)" }}>{user.codigo}</p>
            <p className="text-xs mt-0.5 opacity-50" style={{ color: "var(--verde-nevoa)" }}>Digital</p>
          </div>
          <div className="rounded-xl p-2" style={{ backgroundColor: "var(--papel)" }}>
            <QRCode value={user.codigo} size={72} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl p-4" style={{ backgroundColor: "var(--creme)" }}>
          <p className="text-2xl font-serif mb-1" style={{ color: "var(--verde-aura)" }}>{usedCount}</p>
          <p className="text-xs" style={{ color: "var(--verde-oliva)" }}>Carimbos usados</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "var(--creme)" }}>
          <p className="text-2xl font-serif mb-1" style={{ color: "var(--verde-aura)" }}>{SEED_PARTNERS.length}</p>
          <p className="text-xs" style={{ color: "var(--verde-oliva)" }}>Parceiros disponíveis</p>
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ backgroundColor: "var(--verde-nevoa)" }}>
        <h3 className="font-serif text-sm mb-3" style={{ color: "var(--verde-aura)" }}>Como usar seu passaporte</h3>
        <div className="flex flex-col gap-3">
          {[
            { n: "1", text: "Vá até um parceiro Aura" },
            { n: "2", text: "Mostre o QR code para o estabelecimento" },
            { n: "3", text: "O parceiro escaneia ou digita o PIN" },
            { n: "4", text: "Pronto! Benefício liberado 🎉" },
          ].map((step) => (
            <div key={step.n} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}>{step.n}</span>
              <p className="text-sm" style={{ color: "var(--verde-oliva)" }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
