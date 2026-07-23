import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Roda a cada hora via Vercel Cron
// Marca como "nao_compareceu" agendamentos passados que ainda estão como "reservado"
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const supabase = await createClient();

  // Considera no-show 2h após o horário da aula
  const agora = new Date();
  const limite = new Date(agora.getTime() - 2 * 60 * 60 * 1000);
  const dataLimite = limite.toISOString().slice(0, 10);
  const horaLimite = limite.toTimeString().slice(0, 5);

  const { data, error } = await supabase
    .from("agendamentos")
    .update({ status: "nao_compareceu" })
    .eq("status", "reservado")
    .or(`data_aula.lt.${dataLimite},and(data_aula.eq.${dataLimite},horario.lte.${horaLimite})`)
    .select("id");

  if (error) {
    console.error("[cron/no-show]", error);
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }

  console.log(`[cron/no-show] ${data?.length ?? 0} agendamentos marcados como não compareceu`);
  return NextResponse.json({ ok: true, atualizados: data?.length ?? 0 });
}
