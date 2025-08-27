# portifolio-website-adm

Este é um portfólio profissional com sistema de administração completo, permitindo gerenciar projetos, imagens e conteúdo de forma dinâmica.

## 🚀 Funcionalidades

### Para Visitantes

- **Portfólio Visual**: Exibição de projetos organizados por categoria
- **Detalhes dos Projetos**: Páginas individuais para cada projeto
- **Design Responsivo**: Interface adaptável para todos os dispositivos
- **Tema Claro/Escuro**: Suporte a temas automático

### Para Administradores

- **Painel de Controle**: Interface intuitiva para gerenciar conteúdo
- **Gestão de Projetos**: Criar, editar e deletar projetos
- **Upload de Imagens**: Suporte a URLs externas (Google Drive, Canva, etc.)
- **Autenticação Segura**: Sistema de login com JWT
- **Estatísticas**: Dashboard com métricas dos projetos

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Autenticação**: JWT (JSON Web Tokens)
- **Banco de Dados**: JSON (pode ser facilmente migrado para PostgreSQL/MySQL)
- **Validação**: Zod
- **Notificações**: Sonner

## 📦 Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd portfolio-website
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz do projeto:

   ```env
   JWT_SECRET=your-secure-jwt-secret-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password-here
   ```

4. **Execute o projeto**

   ```bash
   pnpm dev
   ```

5. **Acesse o painel admin**
   - URL: `http://localhost:3000/admin`
   - Use as credenciais que você configurou no `.env.local`

## 🔐 Configuração de Segurança

### Em Produção

1. **Altere as credenciais padrão** no arquivo `.env.local`
2. **Use uma chave JWT forte** e única
3. **Configure HTTPS** para todas as comunicações
4. **Implemente rate limiting** para as APIs
5. **Considere usar um banco de dados real** (PostgreSQL, MySQL)

### Variáveis de Ambiente Recomendadas

```env
# Produção
JWT_SECRET=your-production-secret-key-32-chars-minimum
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-password-with-special-chars

# Banco de Dados (opcional)
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
```

## 📱 Como Usar

### 1. Acessando o Painel Admin

- Vá para `/admin` no seu site
- Faça login com as credenciais configuradas
- Você será redirecionado para o dashboard

### 2. Gerenciando Projetos

- **Criar Novo Projeto**: Clique em "Adicionar Novo Projeto"
- **Editar Projeto**: Clique no ícone de edição (lápis)
- **Deletar Projeto**: Clique no ícone de lixeira
- **Visualizar Projeto**: Clique no ícone de olho

### 3. Adicionando Imagens

- **URLs Externas**: Cole links do Google Drive, Canva, ou qualquer serviço de hospedagem
- **Formato**: O sistema aceita qualquer URL de imagem válida
- **Fallback**: Se a imagem não carregar, será exibida uma imagem padrão

### 4. Organizando Categorias

- **Designs para Vendas**: Projetos comerciais e de marketing
- **Artes Educacionais**: Materiais didáticos e educativos
- **Outros Projetos**: Identidade visual, apresentações, etc.

## 🔄 Migração para Banco de Dados Real

### 1. Instalar dependências

```bash
pnpm add @prisma/client prisma
# ou
pnpm add drizzle-orm @vercel/postgres
```

### 2. Configurar schema

```typescript
// lib/database.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}
```

### 3. Migrar dados existentes

```bash
# Criar tabelas
npx prisma db push

# Migrar dados do JSON
npx prisma db seed
```

## 🎨 Personalização

### Cores e Temas

- Edite `tailwind.config.js` para alterar a paleta de cores
- Modifique `components/ui/` para personalizar componentes
- Ajuste `app/globals.css` para estilos globais

### Layout e Componentes

- `components/navigation.tsx`: Menu principal
- `components/hero-section.tsx`: Seção de destaque
- `app/portfolio/page.tsx`: Lista de projetos
- `app/admin/page.tsx`: Painel administrativo

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

- **Netlify**: Compatível com Next.js
- **Railway**: Suporte nativo a Node.js
- **DigitalOcean**: Droplet com Node.js

## 📊 Monitoramento e Analytics

### Implementar Analytics

```typescript
// lib/analytics.ts
export function trackPageView(url: string) {
  // Google Analytics, Plausible, etc.
}

export function trackEvent(event: string, properties: any) {
  // Eventos personalizados
}
```

### Logs e Monitoramento

- Implementar logging estruturado
- Monitorar performance das APIs
- Alertas para erros críticos

## 🔧 Manutenção

### Backup dos Dados

- O arquivo `data/portfolio.json` contém todos os projetos
- Faça backup regular deste arquivo
- Considere implementar backup automático

### Atualizações

- Mantenha as dependências atualizadas
- Teste em ambiente de desenvolvimento antes de produção
- Use branches para novas funcionalidades

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

- **Issues**: Use o sistema de issues do GitHub
- **Documentação**: Consulte este README
- **Comunidade**: Participe das discussões

## 🎯 Roadmap

- [ ] Upload direto de imagens
- [ ] Sistema de usuários múltiplos
- [ ] Analytics integrado
- [ ] Backup automático
- [ ] API pública para integrações
- [ ] Sistema de comentários
- [ ] Galeria de imagens múltiplas por projeto
- [ ] SEO avançado
- [ ] PWA (Progressive Web App)

---

**Desenvolvido com ❤️ para facilitar a gestão de portfólios profissionais**
