export default function CompraSucesso() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--papel)", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <div style={{ maxWidth: 480, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "rgba(27,67,50,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>
          🌿
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "var(--verde-aura)", fontSize: 28, marginBottom: 12 }}>
          Passaporte confirmado!
        </h1>
        <p style={{ color: "var(--verde-oliva)", fontSize: 15, marginBottom: 8 }}>
          Pagamento aprovado. Em instantes você vai receber um email com o link de acesso ao seu Passaporte Aura.
        </p>
        <p style={{ color: "var(--verde-salvia)", fontSize: 13, marginBottom: 32 }}>
          Verifique sua caixa de entrada e também o spam.
        </p>
        <a href="/" style={{ display: "inline-block", backgroundColor: "var(--verde-aura)", color: "var(--papel)", padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
          Voltar ao site
        </a>
      </div>
    </div>
  );
}
