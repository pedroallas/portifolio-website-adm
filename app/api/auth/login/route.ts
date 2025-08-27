import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";

import { config } from "@/config";

// Credenciais do admin (configuráveis via variáveis de ambiente)
const ADMIN_CREDENTIALS = {
  username: config.admin.username,
  password: config.admin.password,
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Verificar credenciais
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Criar token JWT
      const token = await createToken({
        id: "1",
        username: username,
      });

      // Definir cookie
      const cookieStore = await cookies();
      cookieStore.set("admin-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 horas
      });

      return NextResponse.json({
        success: true,
        message: "Login realizado com sucesso",
      });
    } else {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
