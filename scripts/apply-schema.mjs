import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const url = "https://mbiwbvkuzqfuzojngugs.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error("SUPABASE_SERVICE_ROLE_KEY não definida");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const sql = readFileSync("supabase/schema.sql", "utf8");

// Executa via Management API do Supabase
const res = await fetch(
  `https://mbiwbvkuzqfuzojngugs.supabase.co/pg/query`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ query: sql }),
  }
);

const text = await res.text();
console.log("Status:", res.status);
console.log("Resposta:", text.slice(0, 500));
