"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PokemonFormData } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonFormData;
  imageUrl: string;
}

export function PokemonCard({ pokemon, imageUrl }: PokemonCardProps) {
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
          <Image
            src={imageUrl}
            alt={`Generated image of ${pokemon.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-opacity duration-300"
            priority
            loading="eager"
          />
        </div>
      </CardContent>
    </Card>
  );
}