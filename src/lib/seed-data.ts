// Parceiros reais — espelho do banco (fallback quando Supabase não responde)
export const SEED_PARTNERS = [
  {
    id: "p-amo-garopaba",
    nome: "Amo Garopaba Turismo",
    categoria: "Surf & Esportes",
    cidade: "Garopaba",
    instagram: "@amogaropabaturismo",
    descricao: "Expedição Baleia Franca, passeios a cavalo, paraquedismo, rapel e transfers",
    pin: "4827",
    status: "ativo",
    benefit: "10% de desconto em todos os serviços (exceto hospedagens)",
    emoji: "🌊",
    endereco: "",
  },
  {
    id: "p-ktavento",
    nome: "Escola Ktavento",
    categoria: "Surf & Esportes",
    cidade: "Imbituba",
    instagram: "@escolaktavento",
    descricao: "Aulas de kitesurf, stand up paddle, wing foil e tow foil surfing",
    pin: "6580",
    status: "ativo",
    benefit: "Leve uma amiga e paguem o valor de uma só (50% de desconto para as duas)",
    emoji: "🪁",
  },
];

export const SEED_USER = {
  id: "user-demo",
  nome: "Maria Silva",
  email: "maria@exemplo.com",
  status: "ativo",
  tipo: "digital",
  validade_fim: "2027-08-31",
  codigo: "AURA-2026-0042",
};

export const SEED_REDEMPTIONS: string[] = ["p2"]; // p2 já foi usado
