import { Project, PortfolioData } from "./types";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "portfolio.json");

// Garantir que o diretório data existe
async function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Carregar dados do banco
export async function loadPortfolioData(): Promise<PortfolioData> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    // Dados padrão se o arquivo não existir
    const defaultData: PortfolioData = {
      projects: [
        {
          id: "campanha-loja-x",
          title: "Campanha de Lançamento para a Loja X",
          image: "/ecommerce-campaign-modern.png",
          description: "Aumento de 35% no engajamento e 15% nas vendas",
          category: "vendas",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "posts-redes-sociais",
          title: "Posts para Redes Sociais - Marca Y",
          image: "/consistent-social-media-branding.png",
          description: "Série de posts com identidade visual coesa",
          category: "vendas",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "banner-promocional",
          title: "Banner Promocional - Black Friday",
          image: "/black-friday-banner.png",
          description: "Campanha que gerou 40% mais cliques",
          category: "vendas",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ciclo-agua",
          title: "Material Didático - Ciclo da Água",
          image: "/water-cycle-infographic-children.png",
          description: "Infográfico utilizado por 50+ professores",
          category: "educacionais",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ebook-matematica",
          title: "E-book Educativo - Matemática Básica",
          image: "/placeholder-ixpp4.png",
          description: "Material para alunos do ensino fundamental",
          category: "educacionais",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "atividades-portugues",
          title: "Atividades de Português",
          image: "/portuguese-worksheet.png",
          description: "Conjunto de atividades lúdicas e educativas",
          category: "educacionais",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "identidade-visual",
          title: "Identidade Visual - Startup Tech",
          image: "/modern-tech-startup-brand.png",
          description: "Logo e materiais de marca completos",
          category: "outros",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "apresentacao-corporativa",
          title: "Apresentação Corporativa",
          image: "/placeholder-jgt5f.png",
          description: "Template para apresentações executivas",
          category: "outros",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      categories: {
        vendas: "Designs para Vendas",
        educacionais: "Artes Educacionais",
        outros: "Outros Projetos",
      },
    };

    await savePortfolioData(defaultData);
    return defaultData;
  }
}

// Salvar dados no banco
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// Adicionar novo projeto
export async function addProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<Project> {
  const data = await loadPortfolioData();
  const newProject: Project = {
    ...project,
    id: `project-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.projects.push(newProject);
  await savePortfolioData(data);
  return newProject;
}

// Atualizar projeto existente
export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, "id" | "createdAt">>
): Promise<Project | null> {
  const data = await loadPortfolioData();
  const projectIndex = data.projects.findIndex((p) => p.id === id);

  if (projectIndex === -1) return null;

  data.projects[projectIndex] = {
    ...data.projects[projectIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await savePortfolioData(data);
  return data.projects[projectIndex];
}

// Deletar projeto
export async function deleteProject(id: string): Promise<boolean> {
  const data = await loadPortfolioData();
  const projectIndex = data.projects.findIndex((p) => p.id === id);

  if (projectIndex === -1) return false;

  data.projects.splice(projectIndex, 1);
  await savePortfolioData(data);
  return true;
}

// Buscar projeto por ID
export async function getProjectById(id: string): Promise<Project | null> {
  const data = await loadPortfolioData();
  return data.projects.find((p) => p.id === id) || null;
}

// Listar todos os projetos
export async function getAllProjects(): Promise<Project[]> {
  const data = await loadPortfolioData();
  return data.projects;
}

// Listar projetos por categoria
export async function getProjectsByCategory(
  category: string
): Promise<Project[]> {
  const data = await loadPortfolioData();
  return data.projects.filter((p) => p.category === category);
}

