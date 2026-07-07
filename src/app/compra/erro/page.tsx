export default function CompraErro() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--papel)", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <div style={{ maxWidth: 480, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "rgba(220,38,38,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>
          ✕
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "var(--verde-aura)", fontSize: 28, marginBottom: 12 }}>
          Algo deu errado
        </h1>
        <p style={{ color: "var(--verde-oliva)", fontSize: 15, marginBottom: 32 }}>
          O pagamento não foi concluído. Nenhum valor foi cobrado. Tente novamente ou entre em contato.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ display: "inline-block", backgroundColor: "var(--verde-aura)", color: "var(--papel)", padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
            Tentar novamente
          </a>
          <a href="mailto:oi@auraexperience.net.br" style={{ display: "inline-block", border: "1.5px solid var(--verde-aura)", color: "var(--verde-aura)", padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontSize: 15 }}>
            Falar com a Aura
          </a>
        </div>
      </div>
    </div>
  );
}
