import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/parceiro", "/auth/callback", "/demo", "/api/"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  if (isPublic) return NextResponse.next();

  // Sem Supabase configurado: redireciona /app/* para /demo
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/app/, "/demo");
    return NextResponse.redirect(url);
  }

  // Com Supabase: verifica cookie de sessão
  const hasSession = request.cookies.has("sb-access-token") ||
    [...request.cookies.getAll()].some((c) => c.name.includes("auth-token"));

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
