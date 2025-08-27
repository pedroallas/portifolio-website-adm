import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectImageAlt } from "@/components/project-image-alt";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getProjectById } from "@/lib/database";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectById(await params.slug);

  if (!project) {
    notFound();
  }

  const categoryNames = {
    vendas: "Designs para Vendas",
    educacionais: "Artes Educacionais",
    outros: "Outros Projetos",
  };

  const categoryColors = {
    vendas: "bg-primary",
    educacionais: "bg-accent",
    outros: "bg-chart-3",
  };

  return (
    <main>
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Botão Voltar */}
        <div className="mb-8">
          <Link href="/portfolio">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Portfólio
            </Button>
          </Link>
        </div>

        {/* Projeto */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="relative">
              <ProjectImageAlt
                src={project.image}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {categoryNames[project.category]}
                </Badge>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="mb-6">
                <h1 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Categoria
                  </h3>
                  <Badge variant="outline" className="text-base px-4 py-2">
                    {categoryNames[project.category]}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Data de Criação
                  </h3>
                  <p className="text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a
                    href={project.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Imagem em Tamanho Real
                  </a>
                </Button>

                <Link href="/portfolio">
                  <Button variant="outline">Ver Outros Projetos</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
