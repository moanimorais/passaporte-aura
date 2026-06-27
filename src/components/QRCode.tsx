"use client";

import { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 80 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Gera QR simples via API pública (sem biblioteca pesada)
    // Em produção, usar a lib qrcode
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size * 2}x${size * 2}&data=${encodeURIComponent(value)}&bgcolor=FBFAF5&color=2E3A1D&margin=1`;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
    };
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ borderRadius: 4 }}
    />
  );
}
