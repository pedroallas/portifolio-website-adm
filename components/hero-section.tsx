import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Palette, BookOpen, TrendingUp } from "lucide-react";

export function HeroSection() {
  const featuredProjects = [
    {
      title: "Campanha de Lançamento E-commerce",
      category: "Design para Vendas",
      image: "/vibrant-ecommerce-campaign.png",
      description: "Aumento de 35% no engajamento",
    },
    {
      title: "Material Didático - Ciclo da Água",
      category: "Arte Educacional",
      image: "/water-cycle-infographic-children.png",
      description: "Utilizado por 50+ professores",
    },
    {
      title: "Posts para Redes Sociais",
      category: "Design para Vendas",
      image: "/modern-social-media-templates.png",
      description: "15% aumento nas vendas diretas",
    },
    {
      title: "E-book Educativo - Matemática",
      category: "Arte Educacional",
      image: "/colorful-math-ebook-cover.png",
      description: "Feedback positivo de educadores",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            <span className="text-primary">Pedro Allas</span> | Designer de
            Artes Educacionais e de Vendas
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Criando designs no Canva que educam, engajam e vendem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/portfolio">
                Veja meus trabalhos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent"
            >
              <Link href="/contato">Entre em contato</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Palette className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-2xl text-foreground mb-2">
                100+
              </h3>
              <p className="text-muted-foreground">Designs Criados</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-2xl text-foreground mb-2">
                50+
              </h3>
              <p className="text-muted-foreground">Materiais Educacionais</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-2xl text-foreground mb-2">
                30+
              </h3>
              <p className="text-muted-foreground">Campanhas de Sucesso</p>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-semibold text-3xl text-center text-foreground mb-12">
            Projetos em Destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="font-serif font-semibold text-lg text-foreground mt-1 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
