import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { marca, data, descricao } = await request.json();

  if (!marca || !data || !descricao) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
  }

  const dataFormatada = new Date(data + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
      <h2 style="color:#1B4332;margin-bottom:4px">⚠️ Nova reclamação — Passaporte Aura</h2>
      <p style="color:#888;font-size:13px;margin-bottom:24px">Recebida em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <tr>
          <td style="padding:12px 16px;background:#DDE8DC;font-weight:600;color:#1B4332;width:140px;border-radius:8px 0 0 0">Marca</td>
          <td style="padding:12px 16px;background:#F2EDE3;color:#1A2E23;border-radius:0 8px 0 0">${marca}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:#DDE8DC;font-weight:600;color:#1B4332">Data</td>
          <td style="padding:12px 16px;background:#F2EDE3;color:#1A2E23">${dataFormatada}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:#DDE8DC;font-weight:600;color:#1B4332;border-radius:0 0 0 8px;vertical-align:top">Relato</td>
          <td style="padding:12px 16px;background:#F2EDE3;color:#1A2E23;border-radius:0 0 8px 0;white-space:pre-wrap">${descricao}</td>
        </tr>
      </table>

      <p style="font-size:12px;color:#888">Responda ao cliente em até 3 dias úteis · Passaporte Aura</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Passaporte Aura <onboarding@resend.dev>",
      to: ["moanipmorais@gmail.com", "oi@auraexperience.net.br"],
      subject: `⚠️ Reclamação: ${marca}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reclamacao]", err);
    return NextResponse.json({ error: "Falha ao enviar" }, { status: 500 });
  }
}
