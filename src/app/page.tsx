'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Typography, Pagination, Container, TextField, Button, CircularProgress } from '@mui/material';
import { fetchPokemons } from '../lib/pokemonApi';
import { PokemonCard } from '../lib/types';
import CardDisplay from '@/components/CardDisplay.tsx';

const Page = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(18);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Nouvelle variable d'état pour la recherche
  const [isClient, setIsClient] = useState(false);

  // Utiliser useEffect pour définir isClient après le rendu côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const pokemonData = await fetchPokemons(currentPage, cardsPerPage, searchQuery); // Passer la query dans l'appel API
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
    getPokemons();
  }, [currentPage, cardsPerPage, searchQuery]); // Inclure searchQuery comme dépendance

  if (!isClient) {
    return null; // Ne rien rendre tant que nous ne sommes pas côté client
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ marginBottom: 3, textAlign: 'center' }}>
        Catalogue des Cartes Pokémon
      </Typography>

      {/* Formulaire de recherche */}
      <TextField
        label="Rechercher une carte"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>Rechercher</Button>

      {/* Affichage du Spinner en attendant les données */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <CircularProgress color="primary" />
        </div>
      ) : (
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
      )}

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
