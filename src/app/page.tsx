// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Typography, Pagination, Container } from '@mui/material';
import { fetchPokemons } from '../lib/pokemonApi';

import { PokemonCard } from '../lib/types';
import CardDisplay from '@/components/CardDisplay.tsx';

const Page = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(18);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  // Utiliser useEffect pour définir isClient après le rendu côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const pokemonData = await fetchPokemons(currentPage, cardsPerPage);
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
    getPokemons();
  }, [currentPage, cardsPerPage]);

  if (!isClient) {
    return null; // Ne rien rendre tant que nous ne sommes pas côté client
  }

  if (loading) {
    return <Typography variant="h6" color="primary">Chargement des cartes...</Typography>;
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ marginBottom: 3, textAlign: 'center' }}>
        Catalogue des Cartes Pokémon
      </Typography>
      <Grid container spacing={2}>
        {cards.length > 0 ? (
          cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <CardDisplay card={card} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', width: '100%' }}>
            Aucun Pokémon trouvé.
          </Typography>
        )}
      </Grid>

      <Pagination
        count={Math.ceil(totalCards / cardsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 2,
        }}
      />
    </Container>
  );
};

export default Page;
