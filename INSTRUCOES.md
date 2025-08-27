# 🚀 Instruções Rápidas de Uso

## ⚡ Iniciar o Projeto

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Acessar o site
http://localhost:3000
```

## 🔐 Acessar o Painel Admin

1. **URL**: `http://localhost:3000/admin`
2. **Credenciais**:
   - Usuário: `admin`
   - Senha: `admin123`

## 📝 Como Gerenciar o Portfólio

### 1. **Adicionar Novo Projeto**

- Clique em "Adicionar Novo Projeto"
- Preencha:
  - **Título**: Nome do projeto
  - **Descrição**: Descrição detalhada
  - **URL da Imagem**: Cole aqui o link da imagem
  - **Categoria**: Escolha entre as opções disponíveis

### 2. **Editar Projeto Existente**

- Clique no ícone de lápis (✏️) no projeto
- Modifique os campos desejados
- Clique em "Atualizar"

### 3. **Deletar Projeto**

- Clique no ícone de lixeira (🗑️)
- Confirme a exclusão

### 4. **Visualizar Projeto**

- Clique no ícone de olho (👁️) para ver no site
- Ou acesse diretamente `/portfolio/[id]`

## 🖼️ Como Adicionar Imagens

### **URLs Aceitas:**

- ✅ Google Drive (compartilhado publicamente)
- ✅ Canva (exportado e compartilhado)
- ✅ Imgur, ImgBB, etc.
- ✅ Qualquer URL de imagem válida

### **Exemplo de URL do Google Drive:**

```
https://drive.google.com/file/d/1ABC123.../view?usp=sharing
```

### **Exemplo de URL do Canva:**

```
https://www.canva.com/design/DAF123.../view
```

## 🔧 Configurações Importantes

### **Variáveis de Ambiente** (criar arquivo `.env.local`):

```env
JWT_SECRET=your-secure-jwt-secret-key
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-secure-password
```

### **Em Produção:**

- ✅ Altere as credenciais padrão
- ✅ Use uma chave JWT forte
- ✅ Configure HTTPS
- ✅ Considere usar banco de dados real

## 📱 Funcionalidades do Site

### **Para Visitantes:**

- Portfólio organizado por categoria
- Páginas individuais para cada projeto
- Design responsivo (mobile-friendly)
- Tema claro/escuro automático

### **Para Administradores:**

- Dashboard com estatísticas
- Gestão completa de projetos
- Interface intuitiva e moderna
- Sistema de notificações

## 🚨 Solução de Problemas

### **Imagem não carrega:**

- Verifique se a URL está correta
- Confirme se a imagem é pública
- O sistema mostrará uma imagem padrão automaticamente

### **Erro de login:**

- Verifique as credenciais
- Confirme se o arquivo `.env.local` existe
- Reinicie o servidor após alterações

### **Projeto não aparece:**

- Verifique se foi salvo corretamente
- Confirme se a categoria está selecionada
- Recarregue a página

## 📞 Suporte

- **Documentação completa**: `README.md`
- **Issues**: GitHub Issues
- **Configurações**: `config.ts`

---

**🎯 Dica**: Comece criando alguns projetos de teste para familiarizar-se com o sistema!
