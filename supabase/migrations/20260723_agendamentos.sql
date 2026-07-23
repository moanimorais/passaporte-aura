-- Tabela de agendamentos para experiências com horário fixo (pintura, cerâmica)
create table if not exists agendamentos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  parceiro_id uuid not null references partners(id),
  data_aula   date not null,
  horario     time not null default '15:30',
  status      text not null default 'reservado'
                check (status in ('reservado','compareceu','nao_compareceu','cancelado')),
  created_at  timestamptz default now()
);

-- Índices para consultas frequentes
create index on agendamentos (user_id);
create index on agendamentos (parceiro_id, data_aula);
create index on agendamentos (status, data_aula);

-- RLS: usuária só vê seus próprios agendamentos
alter table agendamentos enable row level security;

create policy "usuario ve proprios agendamentos"
  on agendamentos for select
  using (auth.uid() = user_id);

create policy "usuario cria agendamento"
  on agendamentos for insert
  with check (auth.uid() = user_id);

create policy "usuario cancela agendamento"
  on agendamentos for update
  using (auth.uid() = user_id)
  with check (status = 'cancelado');

-- Service role pode atualizar qualquer status (cron de no-show)
create policy "service role atualiza status"
  on agendamentos for update
  using (auth.role() = 'service_role');

-- Adiciona colunas tipo_beneficio e email_parceiro na tabela partners
alter table partners
  add column if not exists tipo_beneficio text not null default 'beneficio'
    check (tipo_beneficio in ('beneficio','agendamento')),
  add column if not exists email_parceiro text;

-- Aglaia: pintura intuitiva
-- (execute após rodar esta migration para configurar a Aglaia)
-- update partners set tipo_beneficio = 'agendamento', email_parceiro = 'carolmarcon@gmail.com'
-- where nome ilike '%aglaia%';
