"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import Link from 'next/link';  // Assure-toi d'importer celui de Next.js
import { fetchSets } from '@/lib/pokemonApi';
import slugify from 'slugify';

interface Set {
  id: string;
  name: string;
  releaseDate: string;
  total: number;
  types?: string[];  // Ajout du champ types pour chaque set
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

  const getTypeIcon = (type: string) => {
    // Fonction pour charger l'icône de type en fonction du nom
    const typeImage = type.toLowerCase();  // Assurez-vous que le type est en minuscule pour correspondre aux noms de fichiers
    return `/types/${typeImage}.png`; // Chemin relatif de l'icône
  };

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
            {/* Utilise Link de Next.js pour la navigation */}
            <Link href={`/sets/${slugify(set.id, { lower: true })}`} passHref>
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                {set.images.logo && (
                  <img
                    src={set.images.logo}
                    alt={`${set.name} Logo`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '150px',
                      objectFit: 'contain',
                      marginBottom: '10px',
                    }}
                  />
                )}
                <Typography variant="h5" gutterBottom>
                  {set.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date de sortie: {set.releaseDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de cartes: {set.total}
                </Typography>

                {/* Affichage des icônes des types du set si disponibles */}
                {set.types && set.types.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    {set.types.map((type, index) => (
                      <img
                        key={index}
                        src={getTypeIcon(type)}  // Charger l'icône pour chaque type
                        alt={type}
                        style={{
                          width: '20px',
                          height: '20px',
                          verticalAlign: 'middle',
                          marginRight: '8px',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SetsPage;
