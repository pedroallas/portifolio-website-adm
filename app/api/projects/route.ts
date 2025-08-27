import { NextRequest, NextResponse } from "next/server";
import { getAllProjects, addProject } from "@/lib/database";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  image: z
    .string()
    .url("URL da imagem deve ser válida")
    .refine((url) => {
      try {
        const urlObj = new URL(url);
        const host = urlObj.hostname.toLowerCase();
        const path = urlObj.pathname.toLowerCase();

        // Aceitar Google Drive original ou formato thumbnail
        const isGoogleDriveOriginal =
          host === "drive.google.com" &&
          path.includes("/file/d/") &&
          path.includes("/view");

        const isGoogleDriveThumbnail =
          host === "drive.google.com" &&
          path === "/thumbnail" &&
          urlObj.searchParams.has("id");

        return isGoogleDriveOriginal || isGoogleDriveThumbnail;
      } catch {
        return false;
      }
    }, "URL deve ser do Google Drive"),
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.enum(["vendas", "educacionais", "outros"]),
});

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados de entrada
    const validatedData = projectSchema.parse(body);

    // Criar novo projeto
    const newProject = await addProject(validatedData);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Erro ao criar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
