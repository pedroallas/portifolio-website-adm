import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verificar se é uma rota administrativa
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Permitir acesso à página de login
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Verificar se existe o cookie de autenticação
    const token = request.cookies.get("admin-token");

    if (!token) {
      // Redirecionar para login se não estiver autenticado
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

