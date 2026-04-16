"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PokemonFormData } from "../types/pokemon";
import { useState } from "react";
import { Download } from "lucide-react";

interface PokemonCardProps {
  pokemon: PokemonFormData;
  imageUrl: string;
}

export function PokemonCard({ pokemon, imageUrl }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.error('Error loading image:', imageUrl);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pokemon.name}-${pokemon.type}-${pokemon.style}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center capitalize">
          {pokemon.name}
        </CardTitle>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="capitalize">
            {pokemon.type}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {pokemon.style}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Generando imagen...</p>
              </div>
            </div>
          )}

          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-2">Error al cargar la imagen</p>
                <p className="text-xs text-muted-foreground break-all">{imageUrl}</p>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={`Generated image of ${pokemon.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-opacity duration-300"
              priority
              loading="eager"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )}
        </div>

        {!imageError && !imageLoading && (
          <div className="mt-4 text-center">
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar Imagen
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}