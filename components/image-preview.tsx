"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface ImagePreviewProps {
  src: string;
  className?: string;
  simple?: boolean; // Se true, mostra apenas a imagem sem informações extras
}

export function ImagePreview({
  src,
  className = "",
  simple = false,
}: ImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!src) {
      setStatus("loading");
      setImageUrl("");
      setErrorMessage("");
      return;
    }

    // Se a URL é muito curta, ainda está sendo digitada
    if (src.length < 20) {
      setStatus("loading");
      setImageUrl("");
      setErrorMessage("");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Validar formato da URL
    if (src.includes("drive.google.com")) {
      let fileId = "";

      // Formato: https://drive.google.com/file/d/ID/view
      if (src.includes("/file/d/")) {
        fileId = src.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1] || "";
      }
      // Formato: https://drive.google.com/uc?id=ID
      else if (src.includes("uc?id=")) {
        fileId = src.match(/uc\?id=([a-zA-Z0-9-_]+)/)?.[1] || "";
      }

      if (fileId) {
        console.log("ImagePreview: File ID extraído:", fileId);
        // Usar formato thumbnail - mais confiável e funciona com imagens privadas
        const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
        setImageUrl(thumbnailUrl);

        // Testar se a imagem carrega
        const img = new Image();
        img.onload = () => {
          console.log(
            "ImagePreview: Imagem carregada com sucesso (thumbnail):",
            thumbnailUrl
          );
          setStatus("success");
        };
        img.onerror = () => {
          // Tentar formato uc?export=view como fallback
          console.log(
            "ImagePreview: Formato thumbnail falhou, tentando uc?export=view:",
            thumbnailUrl
          );
          const fallbackUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
          setImageUrl(fallbackUrl);

          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            console.log(
              "ImagePreview: Imagem carregada com sucesso (fallback):",
              fallbackUrl
            );
            setStatus("success");
          };
          fallbackImg.onerror = () => {
            // Último recurso: googleusercontent
            console.log(
              "ImagePreview: Tentando último formato (googleusercontent)"
            );
            const lastResortUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
            setImageUrl(lastResortUrl);

            const lastImg = new Image();
            lastImg.onload = () => {
              console.log(
                "ImagePreview: Imagem carregada (googleusercontent):",
                lastResortUrl
              );
              setStatus("success");
            };
            lastImg.onerror = () => {
              console.log("ImagePreview: Todos os formatos falharam");
              setStatus("error");
              setErrorMessage(
                "Falha ao carregar imagem. Verifique se o arquivo existe e está acessível no Google Drive."
              );
            };
            lastImg.src = lastResortUrl;
          };
          fallbackImg.src = fallbackUrl;
        };
        img.src = thumbnailUrl;
      } else {
        setStatus("error");
        setErrorMessage(
          "Formato de URL inválido do Google Drive. Use: https://drive.google.com/file/d/ID/view ou https://drive.google.com/uc?id=ID"
        );
      }
    } else if (src.startsWith("http")) {
      // URL externa (não é Google Drive)
      setStatus("error");
      setErrorMessage(
        "Apenas URLs do Google Drive ou caminhos locais (/imagem.jpg) são aceitos."
      );
    } else if (src.startsWith("/")) {
      // URL local (pasta public)
      setImageUrl(src);

      // Testar se a imagem carrega
      const img = new Image();
      img.onload = () => {
        console.log("ImagePreview: Imagem local carregada com sucesso:", src);
        setStatus("success");
      };
      img.onerror = () => {
        console.log("ImagePreview: Falha ao carregar imagem local:", src);
        setStatus("error");
        setErrorMessage(
          "Imagem não encontrada na pasta public. Verifique se o arquivo existe."
        );
      };
      img.src = src;
    } else {
      setStatus("error");
      setErrorMessage(
        "URL inválida. Use apenas URLs do Google Drive ou caminhos locais."
      );
    }
  }, [src]);

  if (status === "loading") {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          <p className="text-sm text-gray-600 mt-2">
            {src.length < 20
              ? "Digite a URL completa..."
              : "Carregando preview..."}
          </p>
          {src.length >= 20 && (
            <p className="text-xs text-gray-500 mt-1">Testando imagem...</p>
          )}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`p-4 ${className}`}>
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <XCircle className="w-5 h-5" />
          <span className="font-medium">Erro ao carregar imagem</span>
        </div>
        <p className="text-sm text-red-500 mb-3">{errorMessage}</p>
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-xs text-red-700 mb-2">
            <strong>URL:</strong> {src}
          </p>
          <div className="text-xs text-red-600 space-y-1">
            <p>
              <strong>Como configurar o compartilhamento:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Abra o arquivo no Google Drive</li>
              <li>Clique com o botão direito → "Compartilhar"</li>
              <li>Altere para "Qualquer pessoa com o link"</li>
              <li>Selecione "Visualizador" como permissão</li>
              <li>Clique em "Copiar link" e use esse link</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {!simple && (
        <div className="flex items-center gap-2 text-green-600 mb-2 p-2">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium text-sm">
            Imagem carregada com sucesso!
          </span>
        </div>
      )}

      <div className="relative">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full max-h-48 object-cover rounded"
          onError={(e) => {
            // Evitar loop de erro e não usar console.error
            console.log(
              "ImagePreview: Erro ao exibir imagem no DOM:",
              imageUrl
            );
            setStatus("error");
            setErrorMessage("Erro ao exibir imagem no navegador");
          }}
        />

        {!simple && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
            <p className="text-xs truncate">
              <strong>URL:</strong> {imageUrl}
            </p>
          </div>
        )}
      </div>

      {!simple && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
          <div className="space-y-1">
            <p className="text-xs text-green-700 font-medium">
              ✅ A imagem está funcionando corretamente e pode ser salva
            </p>
            <div className="text-xs text-green-600">
              <p>
                <strong>URL Original:</strong> {src}
              </p>
              <p>
                <strong>URL Convertida:</strong> {imageUrl}
              </p>
              <p>
                <strong>Status:</strong> Imagem pública e acessível
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
