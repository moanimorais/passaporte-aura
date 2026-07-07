import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { Resend } from "resend";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://passaporte-aura.vercel.app";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ignora testes simulados do painel e eventos que não são pagamento
    if (!body || body.type !== "payment") return NextResponse.json({ ok: true });
    if (!body.data?.id) return NextResponse.json({ ok: true });
    if (body.live_mode === false) return NextResponse.json({ ok: true });

    const payment = new Payment(client);
    let data;
    try {
      data = await payment.get({ id: String(body.data.id) });
    } catch {
      return NextResponse.json({ ok: true });
    }

    if (data.status !== "approved") return NextResponse.json({ ok: true });

    const email = data.payer?.email;
    const nome = data.payer?.first_name ?? "";
    if (!email) return NextResponse.json({ ok: true });

    // Envia magic link via Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        email_confirm: true,
        user_metadata: { nome, tipo_passaporte: "digital" },
      }),
    }).catch(() => {}); // ignora se usuário já existe

    // Gera magic link
    const magicRes = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "magiclink",
        email,
        options: { redirect_to: `${SITE_URL}/auth/callback` },
      }),
    });

    const magicData = await magicRes.json();
    const link = magicData.action_link ?? `${SITE_URL}/login`;

    // Envia email de boas-vindas com o link de acesso
    await resend.emails.send({
      from: "Aura Experience <onboarding@resend.dev>",
      to: email,
      subject: "Seu Passaporte Aura está pronto 🌿",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F2EDE3">
          <h1 style="font-family:Georgia,serif;color:#1B4332;font-size:28px;margin-bottom:8px">
            Bem-vinda ao Passaporte Aura${nome ? `, ${nome}` : ""}!
          </h1>
          <p style="color:#40685E;margin-bottom:24px;font-size:15px">
            Seu Passaporte Digital está ativo para a temporada <strong>agosto/2026 – agosto/2027</strong>.
            Acesse agora e descubra todos os seus benefícios.
          </p>

          <a href="${link}"
             style="display:block;text-align:center;background:#1B4332;color:#F2EDE3;padding:16px 24px;border-radius:12px;text-decoration:none;font-size:16px;font-weight:600;margin-bottom:24px">
            Acessar meu Passaporte →
          </a>

          <p style="color:#4A5E52;font-size:13px;margin-bottom:4px">
            Este link é pessoal e expira em 24 horas. Se precisar de um novo, acesse
            <a href="${SITE_URL}/login" style="color:#1B4332">${SITE_URL}/login</a>.
          </p>
          <p style="color:#4A5E52;font-size:13px">
            Dúvidas? Fale com a gente: <a href="mailto:oi@auraexperience.net.br" style="color:#1B4332">oi@auraexperience.net.br</a>
          </p>

          <hr style="border:none;border-top:1px solid #C8DDD0;margin:24px 0" />
          <p style="color:#4A5E52;font-size:12px;text-align:center">
            Aura Experience · Praia do Rosa · Garopaba · Imbituba · SC
          </p>
        </div>
      `,
    });

    console.log(`[webhook] Passaporte criado para ${email}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook]", err);
    return NextResponse.json({ error: "interno" }, { status: 500 });
  }
}
