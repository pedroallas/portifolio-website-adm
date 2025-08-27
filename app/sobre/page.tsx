import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, BookOpen, Award, Users } from "lucide-react";

export default function SobrePage() {
  const skills = [
    "Design Gráfico",
    "Canva Expert",
    "Materiais Educacionais",
    "Campanhas de Marketing",
    "Identidade Visual",
    "Infográficos",
    "Redes Sociais",
    "E-books",
  ];

  const achievements = [
    {
      icon: Palette,
      title: "100+ Designs Criados",
      description: "Projetos diversos para educação e vendas",
    },
    {
      icon: BookOpen,
      title: "50+ Materiais Educacionais",
      description: "Recursos utilizados por educadores",
    },
    {
      icon: Award,
      title: "95% Satisfação dos Clientes",
      description: "Feedback positivo consistente",
    },
    {
      icon: Users,
      title: "30+ Clientes Atendidos",
      description: "Empresas e instituições de ensino",
    },
  ];

  return (
    <main>
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-6">
              Sobre Mim
            </h1>
            <p className="text-xl text-muted-foreground">
              Conheça minha jornada e paixão pelo design educacional e comercial
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image and Basic Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-secondary">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Foto Profissional"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="font-serif font-semibold text-2xl text-foreground mb-2">
                    Pedro Allas
                  </h2>
                  <p className="text-primary font-medium mb-4">
                    Designer de Artes Educacionais e de Vendas
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Especialista em Canva • 3+ anos de experiência
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-lg text-foreground mb-4">
                    Habilidades
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Text */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif font-semibold text-2xl text-foreground mb-6">
                    Minha História
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                    <p>
                      Olá! Sou uma designer apaixonada por criar materiais que
                      fazem a diferença na vida das pessoas. Minha jornada
                      começou quando percebi o poder do design em transformar
                      informações complexas em conteúdo acessível e envolvente.
                    </p>
                    <p>
                      Especializo-me em duas áreas que me motivam profundamente:{" "}
                      <strong>artes educacionais</strong> e
                      <strong>designs para vendas</strong>. No campo
                      educacional, trabalho criando materiais didáticos que
                      tornam o aprendizado mais visual e interessante para
                      alunos de todas as idades. Já na área comercial,
                      desenvolvo campanhas e materiais promocionais que
                      realmente convertem e geram resultados.
                    </p>
                    <p>
                      Minha ferramenta principal é o <strong>Canva</strong>,
                      onde domino todas as funcionalidades para criar designs
                      profissionais e impactantes. Acredito que um bom design
                      não é apenas bonito, mas funcional e estratégico, sempre
                      alinhado aos objetivos do cliente.
                    </p>
                    <p>
                      Meu compromisso é entregar trabalhos que não apenas
                      atendam às expectativas, mas que superem e gerem valor
                      real - seja facilitando o aprendizado de estudantes ou
                      impulsionando as vendas de uma empresa.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <achievement.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-serif font-semibold text-lg text-foreground mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Philosophy */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif font-semibold text-2xl text-foreground mb-6">
                    Minha Filosofia de Trabalho
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Foco no Resultado
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Cada design é pensado estrategicamente para atingir
                        objetivos específicos, seja educar ou vender.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Simplicidade Eficaz
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Acredito que a clareza e simplicidade são fundamentais
                        para uma comunicação visual eficiente.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Colaboração Próxima
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Trabalho em parceria com meus clientes, ouvindo suas
                        necessidades e oferecendo soluções personalizadas.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Aprendizado Contínuo
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Estou sempre me atualizando com as últimas tendências e
                        ferramentas do design digital.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
