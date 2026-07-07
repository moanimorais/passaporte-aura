import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://passaporte-aura.vercel.app";

export async function POST() {
  const preference = new Preference(client);

  const result = await preference.create({
    body: {
      items: [
        {
          id: "passaporte-aura-digital-2026",
          title: "Passaporte Aura Digital — Temporada 2026/2027",
          description: "Acesso a benefícios exclusivos em parceiros da Praia do Rosa, Garopaba e Imbituba por 12 meses.",
          quantity: 1,
          unit_price: 97,
          currency_id: "BRL",
        },
      ],
      back_urls: {
        success: `${SITE_URL}/compra/sucesso`,
        failure: `${SITE_URL}/compra/erro`,
        pending: `${SITE_URL}/compra/pendente`,
      },
      auto_return: "approved",
      notification_url: `${SITE_URL}/api/webhook/mercadopago`,
      statement_descriptor: "AURA EXPERIENCE",
      payment_methods: {
        excluded_payment_types: [
          { id: "ticket" },
          { id: "atm" },
        ],
        excluded_payment_methods: [
          { id: "bolbradesco" },
          { id: "pec" },
        ],
        installments: 1,
      },
    },
  });

  return NextResponse.json({ url: result.init_point });
}
