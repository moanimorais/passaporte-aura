export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--papel)", fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      {/* Header */}
      <header className="flex flex-col items-center pt-16 pb-8 px-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "var(--verde-aura)" }}
        >
          <span className="text-2xl">🌿</span>
        </div>
        <h1
          className="text-3xl text-center mb-2"
          style={{ color: "var(--verde-aura)", fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Passaporte Aura
        </h1>
        <p className="text-sm text-center" style={{ color: "var(--verde-oliva)" }}>
          Clube de benefícios · Praia do Rosa, Garopaba e Imbituba
        </p>
      </header>

      {/* Pricing Cards */}
      <section className="px-6 pb-12 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Digital */}
          <div
            className="rounded-3xl p-8 flex flex-col"
            style={{ backgroundColor: "var(--creme)" }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--verde-oliva)" }}>
              Digital
            </p>
            <h2
              className="text-2xl mb-1"
              style={{ color: "var(--verde-aura)", fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Passaporte Digital
            </h2>
            <p
              className="text-6xl font-light mb-1"
              style={{ color: "var(--verde-aura)", fontFamily: "'Fraunces', Georgia, serif" }}
            >
              R$ 97
            </p>
            <p className="text-xs mb-6" style={{ color: "var(--verde-oliva)" }}>
              pagamento único · validade 01/ago/2026 – 01/ago/2027
            </p>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {[
                "Acesso completo pelo celular",
                "Todos os benefícios e experiências",
                "Atualizações em tempo real",
                "Área do cliente exclusiva",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--verde-aura)" }}>
                  <span style={{ color: "var(--verde-oliva)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/login"
              className="block w-full text-center rounded-full py-4 text-sm font-semibold border-2 transition-opacity hover:opacity-80"
              style={{ borderColor: "var(--verde-aura)", color: "var(--verde-aura)", backgroundColor: "transparent" }}
            >
              Quero o digital
            </a>
          </div>

          {/* Físico + Digital */}
          <div
            className="rounded-3xl p-8 flex flex-col"
            style={{ backgroundColor: "var(--verde-aura)" }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--verde-salvia)" }}>
              Mais querido
            </p>
            <h2
              className="text-2xl mb-1"
              style={{ color: "var(--creme)", fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Físico + Digital
            </h2>
            <p
              className="text-6xl font-light mb-1"
              style={{ color: "var(--creme)", fontFamily: "'Fraunces', Georgia, serif" }}
            >
              R$ 147
            </p>
            <p className="text-xs mb-6" style={{ color: "var(--verde-salvia)" }}>
              pagamento único · validade 01/ago/2026 – 01/ago/2027
            </p>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {[
                "Tudo da versão digital",
                "Passaporte físico colecionável",
                "Espaço para carimbos das experiências",
                "Item exclusivo da edição 2026",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--verde-nevoa)" }}>
                  <span style={{ color: "var(--verde-salvia)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              disabled
              className="w-full text-center rounded-full py-4 text-sm font-semibold opacity-60 cursor-not-allowed"
              style={{ backgroundColor: "var(--creme)", color: "var(--verde-aura)" }}
            >
              Em breve
            </button>
          </div>

        </div>

        <p className="mt-8 text-xs text-center" style={{ color: "var(--verde-oliva)" }}>
          Pagamento seguro · Pix e cartão de crédito. Cada benefício pode ser usado uma vez por estabelecimento durante a vigência do passaporte.
        </p>
      </section>
    </main>
  );
}
