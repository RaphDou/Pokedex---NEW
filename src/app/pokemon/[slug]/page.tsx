// src/app/pokemon/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { fetchPokemonDetails } from '@/lib/pokemonApi'; // Assurez-vous que cette fonction existe dans votre API

const PokemonDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Récupère le slug du Pokémon depuis l'URL

  const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemonDetails = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const data = await fetchPokemonDetails(slug as string); // Utilise le slug pour obtenir les détails du Pokémon
        setPokemonDetails(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du Pokémon', error);
      }
      setLoading(false);
    };

    getPokemonDetails();
  }, [slug]);

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  if (!pokemonDetails) {
    return <Typography variant="h6" color="textSecondary">Aucun Pokémon trouvé.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        {pokemonDetails.name}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Affiche les détails du Pokémon ici */}
        <Grid item xs={12} sm={6} md={4}>
          <img src={pokemonDetails.image} alt={pokemonDetails.name} style={{ maxWidth: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h6">Types: {pokemonDetails.types.join(', ')}</Typography>
          <Typography variant="body1">HP: {pokemonDetails.hp}</Typography>
          <Typography variant="body1">Abilities: {pokemonDetails.abilities.join(', ')}</Typography>
          {/* Ajoutez d'autres informations ici */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PokemonDetailsPage;
