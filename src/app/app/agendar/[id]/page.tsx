"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const ANTECEDENCIA_MIN_H = 24;
const ANTECEDENCIA_MAX_DIAS = 7;

const NOMES_DIA = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];

type Parceiro = {
  nome: string;
  descricao?: string;
  dia_semana: number | null;
  horario_aula: string | null;
};

function proximasDatas(diaSemana: number): Date[] {
  const datas: Date[] = [];
  const agora = new Date();
  const limite = new Date(agora.getTime() + ANTECEDENCIA_MAX_DIAS * 24 * 60 * 60 * 1000);
  const inicio = new Date(agora.getTime() + ANTECEDENCIA_MIN_H * 60 * 60 * 1000);

  const cursor = new Date(inicio);
  cursor.setHours(0, 0, 0, 0);
  while (cursor.getDay() !== diaSemana) cursor.setDate(cursor.getDate() + 1);

  while (datas.length < 8 && cursor <= limite) {
    datas.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 7);
  }

  return datas;
}

function formatarData(d: Date): string {
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatarHorario(h: string | null): string {
  if (!h) return "horário a confirmar";
  return h.slice(0, 5).replace(":", "h");
}

type Agendamento = { data_aula: string; status: string };

export default function AgendarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: parceiroId } = use(params);
  const router = useRouter();
  const [parceiro, setParceiro] = useState<Parceiro | null>(null);
  const [datas, setDatas] = useState<Date[]>([]);
  const [selecionada, setSelecionada] = useState<Date | null>(null);
  const [meus, setMeus] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    fetch(`${url}/rest/v1/partners?id=eq.${parceiroId}&select=nome,descricao,dia_semana,horario_aula`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data[0]) {
          const p = data[0] as Parceiro;
          setParceiro(p);
          if (p.dia_semana !== null && p.dia_semana !== undefined) {
            setDatas(proximasDatas(p.dia_semana));
          }
        }
      })
      .catch(() => {});
  }, [parceiroId]);

  useEffect(() => {
    fetch(`/api/agendamentos?parceiro_id=${parceiroId}`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setMeus(data); })
      .catch(() => {});
  }, [parceiroId]);

  const jaReservado = (d: Date) =>
    meus.some((a) => a.data_aula === toISO(d) && a.status === "reservado");

  async function confirmar() {
    if (!selecionada) return;
    setLoading(true);
    setErro("");
    try {
      const res = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parceiro_id: parceiroId, data_aula: toISO(selecionada) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro ao reservar");
      setSucesso(true);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao reservar");
    } finally {
      setLoading(false);
    }
  }

  const horarioLabel = formatarHorario(parceiro?.horario_aula ?? null);
  const diaLabel = parceiro?.dia_semana != null ? NOMES_DIA[parceiro.dia_semana] + "s" : "";

  if (sucesso) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "var(--papel)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "rgba(27,67,50,0.1)" }}>
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="font-serif text-2xl mb-2" style={{ color: "var(--verde-aura)" }}>
          Reserva confirmada!
        </h1>
        <p className="text-sm mb-1" style={{ color: "var(--verde-oliva)" }}>
          {parceiro?.nome}
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--verde-salvia)" }}>
          {selecionada && formatarData(selecionada)} às {horarioLabel}
        </p>
        <p className="text-xs mb-8 px-4" style={{ color: "var(--verde-salvia)" }}>
          A parceira receberá uma notificação com seu nome e horário.
          Se não puder comparecer, cancele pelo app com pelo menos 24h de antecedência.
        </p>
        <button
          onClick={() => router.push("/app/parceiros")}
          className="w-full max-w-xs py-4 rounded-xl font-medium text-base"
          style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}>
          Voltar aos parceiros
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-6 max-w-md mx-auto" style={{ backgroundColor: "var(--papel)" }}>
      <button onClick={() => router.back()} className="text-sm mb-6 flex items-center gap-1"
        style={{ color: "var(--verde-salvia)" }}>
        ← Voltar
      </button>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--verde-salvia)" }}>
          Agendamento
        </p>
        <h1 className="font-serif text-2xl" style={{ color: "var(--verde-aura)" }}>
          {parceiro?.nome ?? "..."}
        </h1>
        {diaLabel && (
          <p className="text-sm mt-1" style={{ color: "var(--verde-oliva)" }}>
            {parceiro?.descricao} · toda {diaLabel} às {horarioLabel}
          </p>
        )}
      </div>

      {!parceiro ? (
        <p className="text-sm text-center" style={{ color: "var(--verde-salvia)" }}>Carregando...</p>
      ) : parceiro.dia_semana === null ? (
        <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "var(--creme)" }}>
          <p className="text-sm" style={{ color: "var(--verde-salvia)" }}>
            Agendamento em breve — estamos definindo os dias disponíveis.
          </p>
        </div>
      ) : datas.length === 0 ? (
        <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "var(--creme)" }}>
          <p className="text-sm" style={{ color: "var(--verde-salvia)" }}>
            Nenhuma data disponível nos próximos 7 dias.<br />
            Tente novamente mais tarde.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm mb-4" style={{ color: "var(--verde-salvia)" }}>
            Escolha uma data disponível:
          </p>

          <div className="flex flex-col gap-3 mb-8">
            {datas.map((d) => {
              const reservado = jaReservado(d);
              const sel = selecionada && toISO(d) === toISO(selecionada);
              return (
                <button
                  key={toISO(d)}
                  onClick={() => !reservado && setSelecionada(d)}
                  disabled={reservado}
                  className="w-full rounded-xl px-4 py-4 text-left transition-all"
                  style={{
                    backgroundColor: sel ? "var(--verde-aura)" : "var(--creme)",
                    border: `2px solid ${sel ? "var(--verde-aura)" : "var(--verde-nevoa)"}`,
                    opacity: reservado ? 0.5 : 1,
                  }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium capitalize"
                        style={{ color: sel ? "var(--papel)" : "var(--verde-aura)" }}>
                        {formatarData(d)}
                      </p>
                      <p className="text-xs mt-0.5"
                        style={{ color: sel ? "rgba(242,237,221,0.8)" : "var(--verde-salvia)" }}>
                        às {horarioLabel}
                      </p>
                    </div>
                    {reservado ? (
                      <span className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: "var(--verde-nevoa)", color: "var(--verde-oliva)" }}>
                        Reservado
                      </span>
                    ) : sel ? (
                      <span style={{ color: "var(--papel)" }}>✓</span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          {erro && (
            <p className="text-sm text-center mb-4" style={{ color: "#dc2626" }}>{erro}</p>
          )}

          <button
            onClick={confirmar}
            disabled={!selecionada || loading}
            className="w-full py-4 rounded-xl font-medium text-base transition-all disabled:opacity-40"
            style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}>
            {loading ? "Reservando..." : "Confirmar reserva"}
          </button>

          <p className="text-xs text-center mt-4" style={{ color: "var(--verde-salvia)" }}>
            A parceira receberá seu nome e horário por email automaticamente.
          </p>
        </>
      )}
    </div>
  );
}
