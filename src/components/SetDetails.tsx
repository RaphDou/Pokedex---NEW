"use client";  // Ajoute cette directive en haut du fichier

import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, CircularProgress } from '@mui/material';
import { fetchSets } from '@/lib/pokemonApi';


interface Set {
  id: string;
  name: string;
  releaseDate: string;
  totalCards: number;
  logoUrl?: string;  // Ajout d'une option pour l'URL de l'image du logo
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
      
      <Grid container spacing={4}>
        {sets.map((set) => (
          <Grid item xs={12} sm={6} md={4} key={set.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              {set.logoUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={set.logoUrl}
                  alt={set.name}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {set.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date de sortie: {set.releaseDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de cartes: {set.totalCards}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SetsPage;
