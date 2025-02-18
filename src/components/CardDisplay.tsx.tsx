'use client'; // Directive pour indiquer que ce fichier utilise des hooks React côté client.

import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Container } from '@mui/material';
import { fetchPokemons } from '../lib/pokemonApi'; // Assurez-vous de la bonne casse ici
import { PokemonCard } from '../lib/types'; // Importer le type

const CardsDisplay = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]); // Utiliser le type
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPokemons = async () => {
      const pokemonData = await fetchPokemons();
      setCards(pokemonData);
      setLoading(false);
    };
    getPokemons();
  }, []);

  if (loading) {
    return <Typography>Chargement des cartes...</Typography>;
  }

  return (
    <Container>
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <Card sx={{ maxWidth: 345, width: '100%' }}>
            <CardMedia
              component="img"
              alt={card.name}
              height="200"  // Réduire la taille de l'image
              image={card.images.small} // Utilise l'image de la carte
              sx={{ objectFit: 'contain' }} // L'image reste bien proportionnée
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                {card.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {card.types.join(', ')} {/* Affiche les types de la carte */}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {card.hp} HP
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default CardsDisplay;
