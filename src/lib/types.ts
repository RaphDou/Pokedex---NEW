export interface PokemonCard {
  id: string;
  name: string;
  types: string[];
  hp: string;
  attacks?: {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  retreatCost: string[];
  images: {
    small: string;
    large: string;
  };
  tcgplayer: {
    url: string;
  };
  set: {
    id: string;
    name: string;
    releaseDate: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
}

export interface SetDetailsType {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
    standard?: string;
    expanded?: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}