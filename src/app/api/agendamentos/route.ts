import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Passaporte Aura <onboarding@resend.dev>";
const DIAS = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  const d = new Date(`${iso}T12:00:00`);
  return `${DIAS[d.getDay()]}, ${dia}/${mes}/${ano}`;
}

export async function POST(req: Request) {
  try {
    const { parceiro_id, data_aula } = await req.json();
    if (!parceiro_id || !data_aula) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const { data: parceiro } = await supabase
      .from("partners")
      .select("nome, email_parceiro, horario_aula")
      .eq("id", parceiro_id)
      .single();

    if (!parceiro) return NextResponse.json({ error: "Parceiro não encontrado" }, { status: 404 });

    // Verifica reserva duplicada
    const { data: existente } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("user_id", user.id)
      .eq("parceiro_id", parceiro_id)
      .eq("data_aula", data_aula)
      .eq("status", "reservado")
      .single();

    if (existente) {
      return NextResponse.json({ error: "Você já tem reserva nesta data" }, { status: 409 });
    }

    const horario = parceiro.horario_aula ?? "00:00";
    const { data: agendamento, error } = await supabase
      .from("agendamentos")
      .insert({ user_id: user.id, parceiro_id, data_aula, horario, status: "reservado" })
      .select()
      .single();

    if (error) throw error;

    const nome = user.user_metadata?.nome || user.email?.split("@")[0] || "Passaporte Aura";
    const dataFormatada = formatarData(data_aula);

    // Email para a parceira + cópia para Moani
    if (parceiro.email_parceiro) {
      await resend.emails.send({
        from: FROM,
        to: parceiro.email_parceiro,
        bcc: ["moanipmorais@gmail.com"],
        subject: `📅 Nova reserva — ${nome} — ${dataFormatada} às ${horario.slice(0,5).replace(":",  "h")}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F2EDE3">
            <p style="text-align:center;font-size:24px;margin-bottom:4px">📅</p>
            <h1 style="font-family:Georgia,serif;color:#1B4332;font-size:22px;margin-bottom:4px;text-align:center">
              Nova reserva — Passaporte Aura
            </h1>
            <p style="color:#40685E;font-size:14px;text-align:center;margin-bottom:24px">
              ${parceiro.nome}
            </p>

            <div style="background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:24px">
              <p style="color:#1B4332;font-size:15px;margin:0 0 8px">
                <strong>👤 Nome:</strong> ${nome}
              </p>
              <p style="color:#1B4332;font-size:15px;margin:0 0 8px">
                <strong>📅 Data:</strong> ${dataFormatada}
              </p>
              <p style="color:#1B4332;font-size:15px;margin:0">
                <strong>🕐 Horário:</strong> ${horario.slice(0,5).replace(":", "h")}
              </p>
            </div>

            <p style="color:#4A5E52;font-size:12px;text-align:center;margin:0">
              Passaporte Aura · Praia do Rosa · SC
            </p>
          </div>
        `,
      });
    } else {
      // Sem email da parceira, notifica só Moani
      await resend.emails.send({
        from: FROM,
        to: "moanipmorais@gmail.com",
        subject: `📅 Nova reserva — ${nome} — ${parceiro.nome} — ${dataFormatada}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F2EDE3">
            <h1 style="font-family:Georgia,serif;color:#1B4332;font-size:22px;margin-bottom:16px;text-align:center">
              Nova reserva — Passaporte Aura
            </h1>
            <div style="background:#fff;border-radius:12px;padding:20px 24px">
              <p style="color:#1B4332;font-size:15px;margin:0 0 8px"><strong>👤 Nome:</strong> ${nome}</p>
              <p style="color:#1B4332;font-size:15px;margin:0 0 8px"><strong>📍 Parceira:</strong> ${parceiro.nome}</p>
              <p style="color:#1B4332;font-size:15px;margin:0 0 8px"><strong>📅 Data:</strong> ${dataFormatada}</p>
              <p style="color:#1B4332;font-size:15px;margin:0"><strong>🕐 Horário:</strong> 15h30</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true, agendamento });
  } catch (err) {
    console.error("[agendamentos]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const url = new URL(req.url);
    const parceiro_id = url.searchParams.get("parceiro_id");

    const query = supabase
      .from("agendamentos")
      .select("id, data_aula, horario, status, parceiro_id")
      .eq("user_id", user.id)
      .order("data_aula", { ascending: true });

    if (parceiro_id) query.eq("parceiro_id", parceiro_id);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("[agendamentos GET]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
