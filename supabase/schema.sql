-- =====================================================
-- Passaporte Aura – Schema do banco de dados
-- Cole no SQL Editor do Supabase
-- =====================================================

-- Habilitar extensão para UUID
create extension if not exists "pgcrypto";

-- =====================================================
-- TABELAS
-- =====================================================

-- Clientes (ligado ao auth.users do Supabase)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  status text not null default 'inativo' check (status in ('ativo', 'inativo', 'expirado')),
  tipo text not null default 'digital' check (tipo in ('digital', 'fisico_digital')),
  validade_inicio date,
  validade_fim date,
  data_compra timestamptz,
  codigo text unique default ('AURA-2026-' || lpad(floor(random()*9999)::text, 4, '0')),
  created_at timestamptz default now()
);

-- Parceiros
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  categoria text not null,
  cidade text not null,
  instagram text,
  descricao text,
  pin text unique not null,
  qr_token text unique default encode(gen_random_bytes(16), 'hex'),
  status text not null default 'curadoria' check (status in ('ativo', 'curadoria', 'inativo')),
  emoji text default '🌿',
  created_at timestamptz default now()
);

-- Benefícios de cada parceiro
create table public.benefits (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partners(id) on delete cascade,
  descricao text not null,
  vigencia_inicio date,
  vigencia_fim date,
  dias_horarios text,
  datas_bloqueadas text[],
  regra_condicional text,
  created_at timestamptz default now()
);

-- Carimbos (histórico de usos)
create table public.redemptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  partner_id uuid references public.partners(id) on delete cascade,
  benefit_id uuid references public.benefits(id),
  data_hora timestamptz default now(),
  -- Unicidade: um uso por cliente por parceiro por temporada
  unique (user_id, partner_id)
);

-- Pagamentos
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  valor numeric(10,2) not null,
  status text not null default 'pendente' check (status in ('pendente', 'aprovado', 'recusado', 'reembolsado')),
  gateway_id text,
  tipo_passaporte text check (tipo_passaporte in ('digital', 'fisico_digital')),
  data timestamptz default now()
);

-- =====================================================
-- SEGURANÇA (Row Level Security)
-- =====================================================

alter table public.users enable row level security;
alter table public.partners enable row level security;
alter table public.benefits enable row level security;
alter table public.redemptions enable row level security;
alter table public.payments enable row level security;

-- Clientes só veem seus próprios dados
create policy "users: own data" on public.users
  for all using (auth.uid() = id);

-- Parceiros ativos são visíveis para clientes logados
create policy "partners: visible to authenticated" on public.partners
  for select using (auth.role() = 'authenticated' and status = 'ativo');

-- Benefícios visíveis para clientes logados
create policy "benefits: visible to authenticated" on public.benefits
  for select using (auth.role() = 'authenticated');

-- Carimbos: cliente vê os próprios
create policy "redemptions: own data" on public.redemptions
  for select using (auth.uid() = user_id);

-- Inserir carimbo: só o próprio cliente
create policy "redemptions: insert own" on public.redemptions
  for insert with check (auth.uid() = user_id);

-- Pagamentos: cliente vê os próprios
create policy "payments: own data" on public.payments
  for all using (auth.uid() = user_id);

-- =====================================================
-- SEED – Dados de exemplo
-- =====================================================

insert into public.partners (nome, categoria, cidade, instagram, descricao, pin, status, emoji) values
  ('Rosa Surf Club', 'Surf & Esportes', 'Praia do Rosa', '@rosasurfclub', 'Escola de surf e aluguel de equipamentos', '1234', 'ativo', '🏄'),
  ('Bistrô da Rosa', 'Gastronomia', 'Praia do Rosa', '@bistrodarosa', 'Culinária local com ingredientes frescos', '5678', 'ativo', '🍃'),
  ('Garopaba Hostel', 'Hospedagem', 'Garopaba', '@garopabhostel', 'Hostel boutique à beira-mar', '9012', 'ativo', '🌿'),
  ('Ateliê Sal & Terra', 'Artesanato', 'Imbituba', '@saleterraatelie', 'Cerâmica e arte local', '3456', 'ativo', '🏺'),
  ('Spa Floresta', 'Bem-estar', 'Praia do Rosa', '@spafloresta', 'Massagens e tratamentos naturais', '7890', 'ativo', '🌸'),
  ('Café Névoa', 'Gastronomia', 'Garopaba', '@cafenovoa', 'Café especial e pães artesanais', '2468', 'ativo', '☕');

-- Benefício para cada parceiro
insert into public.benefits (partner_id, descricao, vigencia_inicio, vigencia_fim)
select id,
  case nome
    when 'Rosa Surf Club' then '15% de desconto no aluguel de prancha'
    when 'Bistrô da Rosa' then '1 drink de boas-vindas por visita'
    when 'Garopaba Hostel' then '10% de desconto na hospedagem'
    when 'Ateliê Sal & Terra' then 'Brinde artesanal na primeira visita'
    when 'Spa Floresta' then '20% de desconto em qualquer massagem'
    when 'Café Névoa' then 'Café expresso gratuito no pedido'
  end,
  '2026-08-01',
  '2027-08-31'
from public.partners;
