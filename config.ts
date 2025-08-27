export const config = {
  // Configurações de autenticação
  auth: {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    sessionDuration: 24 * 60 * 60, // 24 horas em segundos
  },

  // Configurações do admin
  admin: {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123",
  },

  // Configurações do site
  site: {
    name: "Portfólio Profissional",
    description: "Portfólio de design gráfico e arte digital",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },

  // Configurações de upload
  upload: {
    maxImageSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    imageFallback: "/placeholder.svg",
  },

  // Configurações de categorias
  categories: {
    vendas: {
      name: "Designs para Vendas",
      color: "bg-primary",
      description: "Projetos comerciais e de marketing",
    },
    educacionais: {
      name: "Artes Educacionais",
      color: "bg-accent",
      description: "Materiais didáticos e educativos",
    },
    outros: {
      name: "Outros Projetos",
      color: "bg-chart-3",
      description: "Identidade visual, apresentações e outros",
    },
  },
} as const;

