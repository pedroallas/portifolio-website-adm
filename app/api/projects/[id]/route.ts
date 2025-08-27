import { NextRequest, NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/database";
import { z } from "zod";

const updateProjectSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").optional(),
  image: z
    .string()
    .url("URL da imagem deve ser válida")
    .refine((url) => {
      if (!url) return true; // URL opcional

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
    }, "URL deve ser do Google Drive")
    .optional(),
  description: z.string().min(1, "Descrição é obrigatória").optional(),
  category: z.enum(["vendas", "educacionais", "outros"]).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await getProjectById(params.id);

    if (!project) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validar dados de entrada
    const validatedData = updateProjectSchema.parse(body);

    // Atualizar projeto
    const updatedProject = await updateProject(params.id, validatedData);

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Erro ao atualizar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteProject(params.id);

    if (!success) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
