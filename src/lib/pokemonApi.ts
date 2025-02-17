import axios from 'axios';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Fonction pour récupérer les pokémons depuis l'API
 */
export const fetchPokemonList = async (limit = 10) => {
  try {
    const response = await axios.get(`${POKE_API_BASE}?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des pokémons:', error);
    throw error;
  }
};
