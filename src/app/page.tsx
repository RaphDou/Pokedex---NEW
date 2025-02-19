'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { fetchPokemons } from '../lib/pokemonApi';
import { PokemonCard } from '../lib/types';
import CardGrid from '@/components/CardGrid';
import PaginationControl from '@/components/PaginationControl';
import SearchBar from '@/components/SearchBar';
import SetDetails from '@/components/SetDetails'; // Ajoute ce composant pour afficher les détails du set

interface SetDetailsType {
  id: string;
  name: string;
  releaseDate: string;
}

const Page = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(18);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [isClient, setIsClient] = useState(false);
  const [setDetails, setSetDetails] = useState<SetDetailsType | null>(null); // Utilisation du type explicite pour setDetails

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const pokemonData = await fetchPokemons(currentPage, cardsPerPage, searchQuery);
      if (pokemonData && pokemonData.cards) {
        setCards(pokemonData.cards);
        setTotalCards(pokemonData.totalCount);
      } else {
        setCards([]);
      }
    } catch {
      setCards([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const pokemonData = await fetchPokemons(currentPage, cardsPerPage, searchQuery);
        if (pokemonData && pokemonData.cards) {
          setCards(pokemonData.cards);
          setTotalCards(pokemonData.totalCount);
          // Mettre à jour les détails du set pour la première carte (si elle existe)
          if (pokemonData.cards.length > 0) {
            setSetDetails(pokemonData.cards[0].set); // Utiliser les détails du set de la première carte
          }
        } else {
          setCards([]);
        }
      } catch {
        setCards([]);
      }
      setLoading(false);
    };

    const totalPages = Math.ceil(totalCards / cardsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else {
      getPokemons();
    }
  }, [currentPage, cardsPerPage, searchQuery, totalCards]);

  if (!isClient) {
    return null;
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ marginBottom: 3, textAlign: 'center' }}>
        Catalogue des Cartes Pokémon
      </Typography>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

      {/* Affichage des détails du set */}
      {setDetails && (
        <Box my={4}>
          <SetDetails setId={setDetails.id} /> {/* Utilisation du composant SetDetails pour les détails */}
        </Box>
      )}

      {/* Affichage des cartes */}
      <CardGrid cards={cards} loading={loading} />

      <PaginationControl
        totalCards={totalCards}
        cardsPerPage={cardsPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default Page;
