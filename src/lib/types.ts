
export interface PokemonCard {
    id: string;
    name: string;
    types: string[];
    hp: string;
    images: {
      small: string;
    };
  }