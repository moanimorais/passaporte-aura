export default function CompraPendente() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--papel)", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <div style={{ maxWidth: 480, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "rgba(27,67,50,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>
          ⏳
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "var(--verde-aura)", fontSize: 28, marginBottom: 12 }}>
          Pagamento em processamento
        </h1>
        <p style={{ color: "var(--verde-oliva)", fontSize: 15, marginBottom: 8 }}>
          Seu pagamento está sendo processado. Isso pode levar alguns minutos.
        </p>
        <p style={{ color: "var(--verde-salvia)", fontSize: 13, marginBottom: 32 }}>
          Assim que confirmado, você receberá o email com acesso ao Passaporte Aura.
        </p>
        <a href="/" style={{ display: "inline-block", backgroundColor: "var(--verde-aura)", color: "var(--papel)", padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
          Voltar ao site
        </a>
      </div>
    </div>
  );
}
