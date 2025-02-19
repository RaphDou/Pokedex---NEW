// src/lib/pokemonAPI.ts
const API_KEY = '967be34b-4612-447f-8c04-7e94f27392d6'; // Ta clé API

export const fetchPokemons = async (page: number, pageSize: number) => {
  const url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const data = await response.json();
    
    return {
      cards: data.data,      // Les cartes
      totalCount: data.total // Nombre total de cartes (si disponible)
    };
  } catch (error) {
    console.error('Erreur API:', error);
    return {
      cards: [],
      totalCount: 0 // Retourne 0 si une erreur s'est produite
    };
  }
};
