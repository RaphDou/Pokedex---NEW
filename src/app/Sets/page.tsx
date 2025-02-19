"use client";  // Assure-toi que cette directive est en haut du fichier

import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { fetchSets } from '@/lib/pokemonApi';

interface Set {
  id: string;
  name: string;
  releaseDate: string;
  total: number;  // Utilise `total` au lieu de `totalCards` selon la réponse de l'API
  images: {
    symbol: string;
    logo: string;
  };
}

const SetsPage: React.FC = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSets = async () => {
      setLoading(true);
      const fetchedSets = await fetchSets();
      setSets(fetchedSets);
      setLoading(false);
    };

    getSets();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        Liste des Sets Pokémon
      </Typography>

      {/* Utilisation de la Grid pour l'affichage des sets */}
      <Grid container spacing={4}>
        {sets.map((set) => (
          <Grid item xs={12} sm={6} md={4} key={set.id} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Affichage du logo */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {set.images.logo && (
                <img
                  src={set.images.logo}
                  alt={`${set.name} Logo`}
                  style={{
                    maxWidth: '100%', // Assure-toi que l'image ne déborde pas
                    maxHeight: '150px', // Limite la hauteur
                    objectFit: 'contain', // Garde l'image proportionnelle sans la déformer
                    marginBottom: '10px',
                  }}
                />
              )}
            </div>
            <Typography variant="h5" component="div" gutterBottom>
              {set.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date de sortie: {set.releaseDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de cartes: {set.total}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SetsPage;
