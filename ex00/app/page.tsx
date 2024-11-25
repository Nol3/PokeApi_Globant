"use client";

import { PokemonForm } from "./components/PokemonForm";
import { useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonFormData, PokemonType } from "./types/pokemon";
import { Sparkles } from "lucide-react";
import { generatePokemonImage } from "./lib/pollinations";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPokemon, setGeneratedPokemon] = useState<{
    data: PokemonFormData;
    imageUrl: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: PokemonFormData) => {
    setIsLoading(true);
    try {
      const imageUrl = await generatePokemonImage(data);
      setGeneratedPokemon({
        data,
        imageUrl,
      });
    } catch (error) {
      console.error("Error generating Pokemon:", error);
      toast({
        title: "Error",
        description: "Failed to generate Pokemon image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            AI Pokémon Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create your own unique Pokémon using AI. Choose a type and style, then watch as your creation comes to life!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <PokemonForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>

          <div>
            {generatedPokemon && (
              <PokemonCard
                pokemon={generatedPokemon.data}
                imageUrl={generatedPokemon.imageUrl}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}