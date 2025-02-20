// lib/pokemonApi.ts
const API_KEY = '967be34b-4612-447f-8c04-7e94f27392d6'; // Ta clé API

export const fetchPokemons = async (page: number, pageSize: number, query: string = '') => {
  let url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`;

  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }

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
      cards: data.data,
      totalCount: data.total
    };
  } catch (error) {
    console.error('Erreur API:', error);
    return {
      cards: [],
      totalCount: 0
    };
  }
};

// Nouvelle fonction pour récupérer les détails d'un set
export const fetchSetDetails = async (setId: string) => {
  const url = `https://api.pokemontcg.io/v2/sets/${setId}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des détails du set');
    }

    const data = await response.json();
    return data.data;  // Les détails du set
  } catch (error) {
    console.error('Erreur API:', error);
    return null;
  }
};

// Fonction pour récupérer tous les sets
export const fetchSets = async () => {
  const url = `https://api.pokemontcg.io/v2/sets`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des sets');
    }

    const data = await response.json();
    return data.data;  // Les sets
  } catch (error) {
    console.error('Erreur API:', error);
    return [];
  }
};

export const fetchCardsBySet = async (setId: string) => {
  try {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
    const data = await response.json();
    return data.data; // Les cartes associées au set
  } catch (error) {
    console.error("Erreur de récupération des cartes:", error);
    return [];
  }
};
