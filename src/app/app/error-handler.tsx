"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ErrorHandler() {
  const [erro, setErro] = useState("");
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("error=")) {
      const params = new URLSearchParams(hash.slice(1));
      const desc = params.get("error_description") || "Algo deu errado";
      if (desc.includes("expired") || desc.includes("invalid")) {
        setErro("O link expirou ou já foi usado. Solicite um novo link mágico.");
      } else {
        setErro(desc.replace(/\+/g, " "));
      }
      // Limpa o hash da URL
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  if (!erro) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center px-6 z-50"
      style={{ backgroundColor: "rgba(251,250,245,0.95)" }}>
      <div className="rounded-2xl p-6 max-w-sm w-full text-center shadow-lg"
        style={{ backgroundColor: "var(--creme)" }}>
        <div className="text-4xl mb-3">⏱️</div>
        <h2 className="font-serif text-lg mb-2" style={{ color: "var(--verde-aura)" }}>
          Link expirado
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--verde-oliva)" }}>
          {erro}
        </p>
        <button
          onClick={() => router.push("/login")}
          className="w-full rounded-xl py-3 font-medium"
          style={{ backgroundColor: "var(--verde-aura)", color: "var(--papel)" }}
        >
          Solicitar novo link
        </button>
      </div>
    </div>
  );
}
