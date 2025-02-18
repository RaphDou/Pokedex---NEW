// src/lib/pokemonAPI.ts
const API_KEY = '967be34b-4612-447f-8c04-7e94f27392d6'; // Ta clé API

export const fetchPokemons = async () => {
  const url = `https://api.pokemontcg.io/v2/cards?pageSize=1000`; // Modifier la pageSize selon tes besoins

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
    return data.data; // Assurez-vous que la réponse contient un tableau sous la propriété 'data'
  } catch (error) {
    console.error('Erreur API:', error);
    return [];
  }
};
