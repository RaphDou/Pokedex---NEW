// src/lib/pokemonApi.ts

import axios from 'axios';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Fonction pour récupérer les pokémons depuis l'API avec pagination
 */
export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${POKE_API_BASE}?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des pokémons:', error);
    throw error;
  }
};

/**
 * Fonction pour récupérer les détails d'un pokémon depuis l'API
 */
export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await axios.get(`${POKE_API_BASE}/${name}`);
    const data = response.data;

    // Extraire les informations pertinentes
    const pokemonDetails = {
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
      imageUrl: data.sprites.front_default, // Utilisation de l'image de base
      url: data.species.url, // Ajout de l'URL si nécessaire (optionnel selon votre cas)
    };

    return pokemonDetails;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du pokémon:', error);
    throw error;
  }
};
