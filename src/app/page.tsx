'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchPokemons } from '../lib/pokemonApi';
import { PokemonCard } from '../lib/types';
import CardGrid from '@/components/CardGrid';
import PaginationControl from '@/components/PaginationControl';
import SearchBar from '@/components/SearchBar';


const Page = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(18);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [isClient, setIsClient] = useState(false);

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
