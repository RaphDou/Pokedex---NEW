"use client";  // Assurez-vous d'utiliser 'use client' pour les hooks côté client

import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { fetchSetDetails, fetchCardsBySet } from '@/lib/pokemonApi';
import { PokemonCard } from '@/lib/types';
import { useParams } from 'next/navigation';  // Utiliser useParams() pour récupérer l'ID dans App Router
import CardDisplay from '@/components/CardDisplay.tsx';

interface SetDetails {
  name: string;
  releaseDate: string;
  // Ajoutez d'autres propriétés pertinentes ici
}

const SetDetailsPage: React.FC = () => {
  const params = useParams();  // Utiliser useParams() pour récupérer l'ID depuis l'URL
  const id = params?.id; // id correspondra à l'ID de votre set, à partir de l'URL dynamique
  
  const [setDetails, setSetDetails] = useState<SetDetails | null>(null);
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSetDetailsAndCards = async () => {
      if (!id || Array.isArray(id)) return; // Vérifie si id est un tableau, dans ce cas on quitte l'exécution

      try {
        setLoading(true);
        const details = await fetchSetDetails(id);  // Récupérer les détails du set
        const cardsList = await fetchCardsBySet(id);  // Récupérer les cartes associées au set

        setSetDetails(details);
        setCards(cardsList);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du set et des cartes:', error);
        setLoading(false);
      }
    };

    getSetDetailsAndCards();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (!setDetails) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">
          Set introuvable
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        {setDetails.name}
      </Typography>

      <Typography variant="h5" align="center" gutterBottom>
        Date de sortie: {setDetails.releaseDate}
      </Typography>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            {/* Remplacer l'affichage des cartes par le composant CardDisplay */}
            <CardDisplay card={card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SetDetailsPage;
