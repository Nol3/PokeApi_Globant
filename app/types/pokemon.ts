export const pokemonTypes = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
] as const;

export const pokemonStyles = [
  "cute", "fierce", "mystical", "robotic", "elemental", "ancient"
] as const;

export type PokemonType = typeof pokemonTypes[number];
export type PokemonStyle = typeof pokemonStyles[number];

export interface PokemonFormData {
  name: string;
  type: PokemonType;
  style: PokemonStyle;
}