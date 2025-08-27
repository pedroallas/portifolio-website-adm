import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectImageAlt } from "@/components/project-image-alt";
import Link from "next/link";
import { getAllProjects } from "@/lib/database";

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  // Organizar projetos por categoria
  const projectsByCategory = {
    vendas: projects.filter((p) => p.category === "vendas"),
    educacionais: projects.filter((p) => p.category === "educacionais"),
    outros: projects.filter((p) => p.category === "outros"),
  };

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
        <div className="text-center mb-16">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-6">
            Meu Portfólio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore meus trabalhos organizados por categoria. Cada projeto foi
            criado com foco em resultados e impacto.
          </p>
        </div>

        {/* Renderizar cada categoria */}
        {Object.entries(projectsByCategory).map(
          ([category, categoryProjects]) =>
            categoryProjects.length > 0 && (
              <section key={category} className="mb-16">
                <h2 className="font-serif font-semibold text-3xl text-foreground mb-8 flex items-center">
                  <span
                    className={`w-12 h-1 ${
                      categoryColors[category as keyof typeof categoryColors]
                    } mr-4`}
                  ></span>
                  {categoryNames[category as keyof typeof categoryNames]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProjects.map((project) => (
                    <Link key={project.id} href={`/portfolio/${project.id}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                        <CardContent className="p-0 flex flex-col h-full">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <ProjectImageAlt
                              src={project.image}
                              alt={project.title}
                              className="w-full h-48 object-cover group-hover:scale-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <Badge variant="secondary" className="mb-3 w-fit">
                              {
                                categoryNames[
                                  category as keyof typeof categoryNames
                                ]
                              }
                            </Badge>
                            <h3 className="font-serif font-semibold text-xl text-foreground mb-2 line-clamp-2">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground line-clamp-3 flex-grow">
                              {project.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )
        )}
      </div>
    </main>
  );
}
