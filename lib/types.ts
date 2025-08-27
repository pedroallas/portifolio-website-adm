export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  category: "vendas" | "educacionais" | "outros";
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string; // Em produção, usar hash
}

export interface PortfolioData {
  projects: Project[];
  categories: {
    vendas: string;
    educacionais: string;
    outros: string;
  };
}

