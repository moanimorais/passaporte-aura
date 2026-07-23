-- Adiciona colunas de restrições para exibição no app
alter table partners
  add column if not exists pausa         text,
  add column if not exists alta_temporada text;

-- ── AGLAIA ──────────────────────────────────────────────────
update partners set
  instagram      = '@aglaia.criativa',
  benefit        = 'Leve uma amiga e paguem o valor de uma aula só · ou 50% de desconto individual',
  descricao      = 'Aulas de pintura intuitiva e terapêutica · toda terça às 15h30',
  pausa          = 'Dezembro e janeiro',
  alta_temporada = null
where nome ilike '%aglaia%';

-- ── AMO GAROPABA TURISMO ────────────────────────────────────
update partners set
  instagram      = '@amogaropabaturismo',
  benefit        = '10% de desconto em todos os serviços (exceto hospedagens)',
  descricao      = 'Agência de turismo receptivo com +11 anos — expedições Baleia Franca, passeios a cavalo ao amanhecer, esportes radicais e transfers.',
  pausa          = null,
  alta_temporada = 'Mesmo benefício de 10% (exceto hospedagens)'
where nome = 'Amo Garopaba Turismo';

-- ── ESCOLA KTAVENTO ─────────────────────────────────────────
update partners set
  instagram      = '@escolaktavento',
  benefit        = 'Leve uma amiga e paguem o valor de uma aula só (50% para a acompanhante)',
  descricao      = 'Kitesurf, stand up paddle, wing foil e tow foil em Imbituba. Aulas sujeitas a condições climáticas.',
  pausa          = null,
  alta_temporada = 'Válido apenas em dias comuns — não se aplica em sábados, domingos e feriados'
where nome = 'Escola Ktavento';

-- ── STUDIO WO. ──────────────────────────────────────────────
update partners set
  instagram      = '@studio.wo',
  endereco       = 'SC 434, KM 7 - Bairro Encantada, Garopaba',
  benefit        = 'Oficina de abajur: traga uma amiga, a segunda paga metade · Oficina de tela: 15% de desconto + mimo exclusivo',
  descricao      = 'Oficinas de pintura em tela e abajur. Kits para casamentos e eventos.',
  pausa          = null,
  alta_temporada = 'Mesmo desconto'
where nome = 'Studio Wo.';

-- ── VAI DE ROSA ─────────────────────────────────────────────
update partners set
  instagram      = '@usevaiderosa',
  benefit        = 'Leve uma amiga e paguem o valor de uma bike só (50% para a acompanhante)',
  descricao      = 'Aluguel de bike elétrica na Praia do Rosa. Exclusivo para maiores de 18 anos.',
  pausa          = null,
  alta_temporada = '20% de desconto ao levar uma amiga — exceto semana de Natal e Ano Novo e diárias de sábado para domingo'
where nome = 'Vai de Rosa';

-- ── IZE SUSHI ───────────────────────────────────────────────
update partners set
  instagram      = '@izesushipdr',
  benefit        = '25% de desconto por pessoa · Delivery: mostrar o passaporte pelo WhatsApp para desconto no site (não acumulável com promoções)',
  descricao      = 'Culinária japonesa autêntica na Praia do Rosa. Terça a domingo, 18h30–23h.',
  pausa          = '20 de dezembro a 15 de janeiro',
  alta_temporada = null
where nome = 'Ize Sushi';

-- ── SAN DIEGO BAR E GRILL ───────────────────────────────────
update partners set
  instagram      = '@sandiegobargrill',
  benefit        = 'Welcome drink na compra de um prato',
  descricao      = 'Bar e restaurante artesanal — tudo fresco e muito bem servido.',
  pausa          = '26 de dezembro a 5 de janeiro',
  alta_temporada = null
where nome = 'San Diego Bar e Grill';

-- ── ESPINHA DE PEIXE ATELIÊ ─────────────────────────────────
update partners set
  instagram      = '@espinhadepeixeatelie',
  benefit        = '30% na aula experimental de cerâmica · 15% em peças autorais · 5% em obras de artistas colaboradores · mimo artístico exclusivo em qualquer compra',
  descricao      = 'Ateliê de cerâmica artesanal desde 1997 em Garopaba — aulas de modelagem, loja e galeria com peças únicas.',
  pausa          = 'Aulas: 15 de dezembro a 15 de janeiro (loja mantida)',
  alta_temporada = 'Demais benefícios (loja e mimo) funcionam normalmente'
where nome = 'Espinha de Peixe Ateliê';
