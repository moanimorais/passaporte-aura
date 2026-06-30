"use client";
import { useState } from "react";

const parceiros = [
  { categoria: "CERÂMICA", nome: "Ateliê Mano a Mano", local: "Ibiraquera · Praia do Rosa" },
  { categoria: "PINTURA", nome: "Studio Wo.", local: "Garopaba" },
  { categoria: "PILATES", nome: "Estúdio A1 Pilates", local: "Praia do Rosa" },
  { categoria: "YOGA", nome: "Surya Yoga Garden", local: "Praia do Rosa" },
  { categoria: "SURF", nome: "Rosa Surf School", local: "Ibiraquera" },
  { categoria: "CAVALGADA", nome: "Cavalgadas Rosa Norte", local: "Ibiraquera" },
  { categoria: "MASSAGEM", nome: "Paula Olmos Massagens", local: "Praia do Rosa" },
  { categoria: "VINHO", nome: "Rosa dos Vinhos Winery", local: "Praia do Rosa" },
  { categoria: "BALEIA & TURISMO", nome: "Ao Sul Natural Turismo", local: "Praia do Rosa · Garopaba" },
];

const categorias = ["Cerâmica", "Pintura", "Pilates", "Yoga", "Surf", "Cavalgada", "Massagem & Spa", "Vinho & Gastronomia", "Cafés", "Pousadas", "Baleia & Turismo"];

const faqs = [
  { pergunta: "Quanto tempo dura o Passaporte?", resposta: "Doze meses, de agosto de 2026 a agosto de 2027. Você aproveita os benefícios quando quiser, dentro desse período." },
  { pergunta: "Quantas experiências estão incluídas?", resposta: "São 40+ experiências entre Praia do Rosa, Garopaba e Imbituba. A lista completa fica disponível na sua área do cliente após a compra." },
  { pergunta: "A lista de parceiros pode mudar?", resposta: "Sim, novos parceiros podem ser adicionados ao longo da temporada. Você sempre terá acesso à lista atualizada na sua área do cliente." },
  { pergunta: "Preciso pagar algo além do Passaporte?", resposta: "Não. O valor do Passaporte já inclui o benefício em cada parceiro. Alguns parceiros oferecem desconto, outros experiência gratuita — tudo descrito na sua área do cliente." },
  { pergunta: "Quantas vezes posso usar cada benefício?", resposta: "Cada benefício pode ser usado uma vez por parceiro, durante a vigência do passaporte (ago/2026 a ago/2027)." },
  { pergunta: "Como o parceiro confere meu Passaporte?", resposta: "Você apresenta o passaporte (físico ou digital) e o parceiro valida pelo sistema. Simples e rápido." },
  { pergunta: "Os eventos da Aura estão incluídos?", resposta: "Alguns eventos especiais da Aura têm benefícios exclusivos para portadores do Passaporte. Fique de olho nas novidades na sua área do cliente." },
];

export default function Home() {
  const [faqAberto, setFaqAberto] = useState<number | null>(0);

  return (
    <div style={{ backgroundColor: "var(--papel)", fontFamily: "'Hanken Grotesk', sans-serif", color: "var(--verde-aura)" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "var(--papel)", borderBottom: "1px solid var(--verde-nevoa)" }} className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border flex items-center justify-center text-xs" style={{ borderColor: "var(--verde-aura)", color: "var(--verde-aura)" }}>
            🌿
          </div>
          <span className="font-medium text-sm" style={{ color: "var(--verde-aura)" }}>Aura Experience</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--verde-oliva)" }}>
          <a href="#o-que-e" className="hover:opacity-70">O que é</a>
          <a href="#como-funciona" className="hover:opacity-70">Como funciona</a>
          <a href="#parceiros" className="hover:opacity-70">Parceiros</a>
          <a href="#valores" className="hover:opacity-70">Valores</a>
        </div>
        <a href="/login" className="text-sm font-medium px-5 py-2 rounded-full" style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}>
          Quero meu Passaporte
        </a>
      </nav>

      {/* HERO */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "var(--verde-oliva)" }}>
          Temporada ago 2026 – ago 2027 · Praia do Rosa · SC
        </p>
        <h1 className="text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          Viva a Praia do Rosa{" "}
          <em style={{ color: "var(--verde-oliva)" }}>de um jeito novo</em>
          , o ano inteiro.
        </h1>
        <p className="text-lg mb-8 max-w-xl" style={{ color: "var(--verde-oliva)" }}>
          O Passaporte Aura dá acesso a benefícios em dezenas de experiências selecionadas entre Praia do Rosa, Garopaba e Imbituba, para você sair da rotina, conhecer gente nova e criar memórias com as amigas ou em casal.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="/login" className="px-6 py-3 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}>
            Quero meu Passaporte
          </a>
          <a href="#como-funciona" className="px-6 py-3 rounded-full text-sm font-medium border" style={{ borderColor: "var(--verde-aura)", color: "var(--verde-aura)" }}>
            Como funciona
          </a>
        </div>
      </section>

      {/* O QUE É */}
      <section id="o-que-e" className="px-6 py-20" style={{ backgroundColor: "var(--verde-aura)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--verde-salvia)" }}>
            <span className="w-4 h-4 rounded-full border inline-block" style={{ borderColor: "var(--verde-salvia)" }}></span>
            O que é o Passaporte
          </p>
          <h2 className="text-4xl mb-4" style={{ fontFamily: "'Fraunces', Georgia, serif", color: "var(--creme)" }}>
            Um ano inteiro de experiências, em um só lugar.
          </h2>
          <p className="text-base mb-12 max-w-xl" style={{ color: "var(--verde-salvia)" }}>
            Durante 12 meses você acessa benefícios exclusivos em parceiros cuidadosamente selecionados pela curadoria da Aura. Vivências para fazer junto, especialmente fora da alta temporada, quando a região fica mais leve e mais sua.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "40+", desc: "experiências entre Praia do Rosa, Garopaba e Imbituba" },
              { num: "12", desc: "meses para explorar, descobrir e viver mais" },
              { num: "2", desc: "versões: passaporte físico e digital, sempre com você" },
            ].map((s) => (
              <div key={s.num} className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-5xl mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif", color: "var(--verde-salvia)" }}>{s.num}</p>
                <p className="text-sm" style={{ color: "var(--verde-nevoa)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="px-6 py-20" style={{ backgroundColor: "var(--papel)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--verde-oliva)" }}>
            <span className="w-4 h-4 rounded-full border inline-block" style={{ borderColor: "var(--verde-oliva)" }}></span>
            Como funciona
          </p>
          <h2 className="text-4xl mb-12" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Simples como dar um carimbo.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              { n: "1", titulo: "Apresente seu passaporte", desc: "Físico ou digital, no parceiro Aura, na hora de aproveitar a experiência." },
              { n: "2", titulo: "Leve sua amiga e ganhe 50%", desc: "As duas vivem a experiência pagando o valor de uma. Prefere ir sozinha? 50% de desconto individual." },
              { n: "3", titulo: "Colecione experiências", desc: "Cada benefício vale uma vez por parceiro, dentro da temporada do passaporte." },
            ].map((s) => (
              <div key={s.n}>
                <div className="w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center text-lg mb-4" style={{ borderColor: "var(--verde-salvia)", color: "var(--verde-oliva)" }}>
                  {s.n}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--verde-aura)" }}>{s.titulo}</h3>
                <p className="text-sm" style={{ color: "var(--verde-oliva)" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Categorias */}
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--verde-oliva)" }}>
            <span className="w-4 h-4 rounded-full border inline-block" style={{ borderColor: "var(--verde-oliva)" }}></span>
            Categorias
          </p>
          <div className="flex flex-wrap gap-2">
            {categorias.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full text-sm border flex items-center gap-2" style={{ borderColor: "var(--verde-salvia)", color: "var(--verde-aura)" }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "var(--verde-oliva)" }}></span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PARCEIROS */}
      <section id="parceiros" className="px-6 py-20" style={{ backgroundColor: "var(--verde-nevoa)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--verde-oliva)" }}>
            <span className="w-4 h-4 rounded-full border inline-block" style={{ borderColor: "var(--verde-oliva)" }}></span>
            Parceiros
          </p>
          <h2 className="text-4xl mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Marcas selecionadas que você vai amar conhecer.
          </h2>
          <p className="text-sm mb-10" style={{ color: "var(--verde-oliva)" }}>
            Uma amostra dos parceiros da temporada. A lista completa fica na sua área do cliente.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parceiros.map((p) => (
              <div key={p.nome} className="rounded-2xl p-5" style={{ backgroundColor: "var(--papel)" }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--verde-oliva)" }}>{p.categoria}</p>
                <p className="font-semibold text-lg mb-1" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.nome}</p>
                <p className="text-sm" style={{ color: "var(--verde-oliva)" }}>{p.local}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-6" style={{ color: "var(--verde-oliva)" }}>
            * Parceiros ilustrativos para esta página. A curadoria final é definida a cada temporada.
          </p>
        </div>
      </section>

      {/* VALORES */}
      <section id="valores" className="px-6 py-20" style={{ backgroundColor: "var(--papel)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--verde-oliva)" }}>
            <span className="w-4 h-4 rounded-full border inline-block" style={{ borderColor: "var(--verde-oliva)" }}></span>
            Valores
          </p>
          <h2 className="text-4xl mb-10" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Escolha a versão ideal para você.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 flex flex-col border" style={{ backgroundColor: "var(--creme)", borderColor: "var(--verde-nevoa)" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--verde-oliva)" }}>Digital</p>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>Passaporte Digital</h3>
              <p className="text-5xl font-light mb-1" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>R$ 97</p>
              <p className="text-xs mb-6" style={{ color: "var(--verde-oliva)" }}>pagamento único · validade ago/2026 – ago/2027</p>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {["Acesso completo pelo celular", "Todos os benefícios e experiências", "Atualizações em tempo real", "Área do cliente exclusiva"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span style={{ color: "var(--verde-oliva)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/login" className="block w-full text-center rounded-full py-4 text-sm font-semibold border-2" style={{ borderColor: "var(--verde-aura)", color: "var(--verde-aura)" }}>
                Quero o digital
              </a>
            </div>
            <div className="rounded-3xl p-8 flex flex-col" style={{ backgroundColor: "var(--verde-aura)" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--verde-salvia)" }}>Mais querido</p>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif", color: "var(--creme)" }}>Físico + Digital</h3>
              <p className="text-3xl font-light mb-1" style={{ fontFamily: "'Fraunces', Georgia, serif", color: "var(--verde-salvia)" }}>Em breve</p>
              <p className="text-xs mb-6" style={{ color: "var(--verde-salvia)" }}>em breve · validade ago/2026 – ago/2027</p>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {["Tudo da versão digital", "Passaporte físico colecionável", "Espaço para carimbos das experiências", "Item exclusivo da edição 2026"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--verde-nevoa)" }}>
                    <span style={{ color: "var(--verde-salvia)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full rounded-full py-4 text-sm font-semibold opacity-60 cursor-not-allowed" style={{ backgroundColor: "var(--creme)", color: "var(--verde-aura)" }}>
                Em breve
              </button>
            </div>
          </div>
          <p className="mt-6 text-xs" style={{ color: "var(--verde-oliva)" }}>
            Pagamento seguro · Pix e cartão de crédito. Cada benefício pode ser usado uma vez por estabelecimento durante a vigência do passaporte.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20" style={{ backgroundColor: "var(--verde-nevoa)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--verde-oliva)" }}>
            <span className="w-4 h-4 rounded-full border inline-block" style={{ borderColor: "var(--verde-oliva)" }}></span>
            Perguntas frequentes
          </p>
          <h2 className="text-4xl mb-10" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Tudo o que você precisa saber.
          </h2>
          <div className="flex flex-col">
            {faqs.map((f, i) => (
              <div key={i} className="border-t py-5" style={{ borderColor: "var(--verde-salvia)" }}>
                <button
                  className="w-full flex justify-between items-center text-left font-medium"
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                  style={{ color: "var(--verde-aura)" }}
                >
                  {f.pergunta}
                  <span className="ml-4 text-lg" style={{ color: "var(--verde-oliva)" }}>{faqAberto === i ? "×" : "+"}</span>
                </button>
                {faqAberto === i && (
                  <p className="mt-3 text-sm" style={{ color: "var(--verde-oliva)" }}>{f.resposta}</p>
                )}
              </div>
            ))}
            <div className="border-t" style={{ borderColor: "var(--verde-salvia)" }} />
          </div>
          <p className="mt-8 text-sm" style={{ color: "var(--verde-oliva)" }}>
            Ainda com dúvidas? Fale com a gente pelo e-mail{" "}
            <a href="mailto:oi@auraexperience.net.br" className="underline" style={{ color: "var(--verde-aura)" }}>oi@auraexperience.net.br</a>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 mx-6 my-12 rounded-3xl text-center" style={{ backgroundColor: "var(--verde-aura)" }}>
        <h2 className="text-4xl mb-3" style={{ fontFamily: "'Fraunces', Georgia, serif", color: "var(--creme)" }}>
          Pronta para viver a Praia do Rosa de um jeito novo?
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--verde-salvia)" }}>
          Seu próximo "vamos marcar" começa agora.
        </p>
        <a href="/login" className="inline-block px-8 py-4 rounded-full text-sm font-semibold" style={{ backgroundColor: "var(--creme)", color: "var(--verde-aura)" }}>
          Comprar meu Passaporte
        </a>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ borderTop: "1px solid var(--verde-nevoa)" }}>
        <div>
          <p className="font-semibold mb-1" style={{ color: "var(--verde-aura)" }}>Aura Experience</p>
          <p className="text-xs" style={{ color: "var(--verde-salvia)" }}>Praia do Rosa · Garopaba · Imbituba · Santa Catarina · © 2026 Aura Experience</p>
        </div>
        <div className="text-sm text-right" style={{ color: "var(--verde-oliva)" }}>
          <p className="mb-1">@ @au.raexperience</p>
          <p>oi@auraexperience.net.br</p>
        </div>
      </footer>
    </div>
  );
}
