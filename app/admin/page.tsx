"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, LogOut, Eye, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import { toast } from "sonner";
import { ImagePreview } from "@/components/image-preview";

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "vendas" as "vendas" | "educacionais" | "outros",
  });
  const router = useRouter();

  // Carregar projetos
  const loadProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      toast.error("Erro ao carregar projetos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Limpar formulário quando modal for fechado
  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({
        title: "",
        description: "",
        image: "",
        category: "vendas",
      });
      setEditingProject(null);
    }
  }, [isDialogOpen]);

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (!response.ok) {
          router.push("/admin/login");
        }
      } catch (error) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      category: "vendas",
    });
    setEditingProject(null);
  };

  // Abrir modal para editar
  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
    });
    setIsDialogOpen(true);
  };

  // Abrir modal para criar novo
  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      category: "vendas",
    });
    setIsDialogOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  // Função para converter URL do Google Drive para formato thumbnail
  const convertDriveUrlToThumbnail = (url: string) => {
    if (url.includes("drive.google.com") && url.includes("/file/d/")) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
      }
    }
    return url;
  };

  // Salvar projeto
  const saveProject = async () => {
    if (!formData.title || !formData.description || !formData.image) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      // Converter URL do Google Drive para formato thumbnail
      const optimizedFormData = {
        ...formData,
        image: convertDriveUrlToThumbnail(formData.image),
      };

      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(optimizedFormData),
      });

      if (response.ok) {
        toast.success(
          editingProject ? "Projeto atualizado!" : "Projeto criado!"
        );
        closeModal();
        loadProjects();
      } else {
        toast.error("Erro ao salvar projeto");
      }
    } catch (error) {
      toast.error("Erro de conexão");
    }
  };

  // Deletar projeto
  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Projeto deletado!");
        loadProjects();
      } else {
        toast.error("Erro ao deletar projeto");
      }
    } catch (error) {
      toast.error("Erro de conexão");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      toast.error("Erro no logout");
    }
  };

  // Visualizar projeto
  const viewProject = (id: string) => {
    window.open(`/portfolio/${id}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Painel Administrativo
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Eye className="w-4 h-4 mr-2" />
              Ver Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Projetos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Designs para Vendas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p) => p.category === "vendas").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Artes Educacionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p) => p.category === "educacionais").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão Adicionar */}
        <div className="mb-6">
          <Button onClick={openCreateModal} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Novo Projeto
          </Button>
        </div>

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">
                      {project.category === "vendas" && "Designs para Vendas"}
                      {project.category === "educacionais" &&
                        "Artes Educacionais"}
                      {project.category === "outros" && "Outros Projetos"}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewProject(project.id)}
                        className="h-8 w-8 p-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(project)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmar exclusão
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja deletar o projeto "
                              {project.title}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProject(project.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Deletar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Criado em:{" "}
                    {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal de Criação/Edição */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        key={editingProject ? editingProject.id : "new"}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Editar Projeto" : "Novo Projeto"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-120px)] pr-2">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                key={`title-${editingProject ? editingProject.id : "new"}`}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Digite o título do projeto"
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                key={`description-${
                  editingProject ? editingProject.id : "new"
                }`}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Digite a descrição do projeto"
                rows={3}
              />
            </div>

            <div>
              <Label>Imagem do Projeto *</Label>

              {/* Input direto para URL da imagem */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Label
                  htmlFor="image-url"
                  className="text-sm font-medium text-blue-800"
                >
                  🖼️ Cole o link da imagem do Google Drive
                </Label>
                <Input
                  id="image-url"
                  key={`image-${editingProject ? editingProject.id : "new"}`}
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://drive.google.com/file/d/ID_DA_IMAGEM/view"
                  className="mt-2"
                />
                <p className="text-xs text-blue-600 mt-2">
                  💡 <strong>Como obter:</strong> Clique com botão direito na
                  imagem no Drive → Compartilhar → Copiar link
                </p>
              </div>

              {/* Preview da Imagem */}
              {formData.image && (
                <div className="mt-3">
                  <Label className="text-sm font-medium">
                    Preview da Imagem:
                  </Label>
                  <div className="mt-2 border rounded-lg overflow-hidden bg-gray-50 max-h-48">
                    <ImagePreview
                      src={formData.image}
                      className="max-h-48"
                      simple={true}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Select
                key={`category-${editingProject ? editingProject.id : "new"}`}
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    category: value as any,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendas">Designs para Vendas</SelectItem>
                  <SelectItem value="educacionais">
                    Artes Educacionais
                  </SelectItem>
                  <SelectItem value="outros">Outros Projetos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4 border-t bg-white sticky bottom-0">
              <Button variant="outline" onClick={closeModal} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={saveProject} className="flex-1">
                {editingProject ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
