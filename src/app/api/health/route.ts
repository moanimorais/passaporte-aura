import { NextResponse } from "next/server";
import { Resend } from "resend";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://passaporte-aura.vercel.app";
const ALERT_EMAIL = "moanipmorais@gmail.com";

async function checkSupabase(): Promise<{ ok: boolean; latencyMs: number }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { ok: false, latencyMs: 0 };

  const start = Date.now();
  try {
    const res = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(5000),
    });
    return { ok: res.ok, latencyMs: Date.now() - start };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  }
}

async function checkPage(path: string): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    const res = await fetch(`${SITE_URL}${path}`, {
      signal: AbortSignal.timeout(8000),
      headers: { "x-health-check": "1" },
    });
    return { ok: res.ok, latencyMs: Date.now() - start };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  }
}

async function sendAlert(failures: string[]) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const resend = new Resend(resendKey);
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  await resend.emails.send({
    from: "Passaporte Aura <onboarding@resend.dev>",
    to: ALERT_EMAIL,
    subject: "⚠️ Passaporte Aura — alerta de sistema",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="color:#2E3A1D;margin-bottom:8px">⚠️ Alerta de sistema</h2>
        <p style="color:#555;margin-bottom:16px">Detectado às <strong>${now}</strong></p>
        <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:16px;margin-bottom:16px">
          <p style="margin:0;font-weight:600;color:#856404">Componentes com falha:</p>
          <ul style="margin:8px 0 0;padding-left:20px;color:#856404">
            ${failures.map((f) => `<li>${f}</li>`).join("")}
          </ul>
        </div>
        <a href="https://vercel.com/aura-experience/passaporte-aura"
           style="display:inline-block;background:#2E3A1D;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px">
          Ver logs no Vercel
        </a>
      </div>
    `,
  });
}

export async function GET(request: Request) {
  // Protege contra chamadas externas não autorizadas
  const cronSecret = request.headers.get("x-cron-secret");
  const isCron = cronSecret === process.env.CRON_SECRET;
  const isHealthCheck = request.headers.get("x-health-check") === "1";

  // Permite acesso direto apenas com secret ou se for chamada interna
  if (!isCron && !isHealthCheck && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [site, app, demo, supabase] = await Promise.all([
    checkPage("/"),
    checkPage("/demo"),
    checkPage("/demo/parceiros"),
    checkSupabase(),
  ]);

  const results = {
    timestamp: new Date().toISOString(),
    checks: {
      site: { ...site, name: "Página inicial" },
      app: { ...app, name: "Demo" },
      parceiros: { ...demo, name: "Parceiros" },
      supabase: { ...supabase, name: "Banco de dados" },
    },
    allOk: site.ok && app.ok && demo.ok && supabase.ok,
  };

  if (!results.allOk && isCron) {
    const failures = Object.values(results.checks)
      .filter((c) => !c.ok)
      .map((c) => c.name);
    await sendAlert(failures);
  }

  const status = results.allOk ? 200 : 503;
  console.log(`[health] ${results.allOk ? "OK" : "FALHA"}`, JSON.stringify(results.checks));

  return NextResponse.json(results, { status });
}
