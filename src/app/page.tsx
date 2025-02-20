'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { fetchPokemons } from '../lib/pokemonApi';
import { PokemonCard } from '../lib/types';
import CardDisplay from '@/components/CardDisplay.tsx';

const Page = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('name'); // Critère de tri initialisé sur "name"
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        // Passer des valeurs par défaut pour `page` et `pageSize`
        const pokemonData = await fetchPokemons(1, 1000); // Supposons que vous voulez récupérer jusqu'à 1000 cartes
        if (pokemonData && pokemonData.cards) {
          setCards(pokemonData.cards);
        } else {
          setCards([]);
        }
      } catch {
        setCards([]);
      }
      setLoading(false);
    };
    getPokemons();
  }, []);
  

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value); // `event.target.value` est maintenant du type `string`
  };

  // Fonction de tri des cartes
  const sortCards = (cards: PokemonCard[], sortBy: string) => {
    return cards.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'releaseDate':
          // Trier par releaseDate du set associé à chaque carte
          return new Date(a.set.releaseDate).getTime() - new Date(b.set.releaseDate).getTime();
        case 'rarity':
          return a.rarity?.localeCompare(b.rarity || '') || 0;
        default:
          return 0;
      }
    });
  };

  if (!isClient) {
    return null; // Ne rien rendre tant que nous ne sommes pas côté client
  }

  if (loading) {
    return <Typography variant="h6" color="primary">Chargement des cartes...</Typography>;
  }

  // Trier les cartes avant de les afficher
  const sortedCards = sortCards(cards, sortBy);

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ marginBottom: 3, textAlign: 'center' }}>
        Catalogue des Cartes Pokémon
      </Typography>

      {/* Dropdown pour choisir le critère de tri */}
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Tri par</InputLabel>
        <Select
          value={sortBy}
          label="Tri par"
          onChange={handleSortChange} // Utilisation du bon type
        >
          <MenuItem value="name">Nom</MenuItem>
          <MenuItem value="releaseDate">Date de sortie</MenuItem>
          <MenuItem value="rarity">Rareté</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {sortedCards.length > 0 ? (
          sortedCards.map((card) => (
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
    </Container>
  );
};

export default Page;
