"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectImageAltProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProjectImageAlt({
  src,
  alt,
  className = "",
}: ProjectImageAltProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("ProjectImageAlt: Iniciando com URL:", src);
    setIsLoading(true);
    setHasError(false);

    if (src.includes("drive.google.com") && src.includes("/file/d/")) {
      const fileId = src.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        console.log("ProjectImageAlt: File ID extraído:", fileId);

        // Usar o formato thumbnail que funciona melhor
        const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
        console.log("ProjectImageAlt: Usando URL thumbnail:", thumbnailUrl);
        setImageUrl(thumbnailUrl);
        setIsLoading(false);
      } else {
        console.error("ProjectImageAlt: Falha ao extrair File ID");
        setImageUrl("/placeholder.svg");
        setIsLoading(false);
      }
    } else {
      console.log(
        "ProjectImageAlt: Não é URL do Google Drive, usando URL original"
      );
      setImageUrl(src);
      setIsLoading(false);
    }
  }, [src]);

  // Não renderizar nada até ter uma URL
  if (!imageUrl) {
    return (
      <div
        className={`${className} bg-gray-200 flex items-center justify-center`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        onLoad={() => {
          console.log(
            "ProjectImageAlt: Imagem carregada com sucesso:",
            imageUrl
          );
          setIsLoading(false);
        }}
        onError={(e) => {
          console.error("ProjectImageAlt: Erro ao carregar:", imageUrl, e);
          setHasError(true);
          setIsLoading(false);
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm text-center px-2">
            Erro ao carregar imagem
          </span>
        </div>
      )}
    </div>
  );
}
