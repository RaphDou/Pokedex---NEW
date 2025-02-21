"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Grid, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { fetchSets, fetchCardsBySet } from '@/lib/pokemonApi';
import Link from 'next/link';
import slugify from 'slugify';
import CardDisplay from '@/components/CardDisplay.tsx';  // Ton composant CardDisplay
import Image from 'next/image'; // Import Image from next/image

interface Set {
  id: string;
  name: string;
  releaseDate: string;
  total: number;
  images: {
    symbol: string;
    logo: string;
  };
}

interface PokemonCard {
  id: string;
  name: string;
  types: string[];
  subtypes?: string[];
  supertype?: string;
  rarity?: string;  // Optional rarity field
  hp: string;
  attacks?: {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  retreatCost: string[];
  images: {
    small: string;
    large: string;
  };
  tcgplayer: {
    url: string;
  };
  set: {
    id: string;
    name: string;
    releaseDate: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [latestSet, setLatestSet] = useState<Set | null>(null);
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<string>(''); // Pour filtrer les cartes par rareté

  useEffect(() => {
    const getSets = async () => {
      setLoading(true);
      const fetchedSets = await fetchSets(); // Récupérer tous les sets
      setLoading(false);

      // Trouver le set le plus récent
      const sortedSets = fetchedSets.sort((a: Set, b: Set) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      setLatestSet(sortedSets[0]);

      // Récupérer les cartes du set le plus récent
      if (sortedSets[0]) {
        const cardsFromSet = await fetchCardsBySet(sortedSets[0].id);
        setCards(cardsFromSet);
      }
    };

    getSets();
  }, []);

  const handleRarityChange = (event: SelectChangeEvent) => {
    setSelectedRarity(event.target.value);
  };

  const filteredCards = selectedRarity
    ? cards.filter((card) => card.rarity === selectedRarity)
    : cards;

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
        Bienvenue sur le Catalogue Pokémon
      </Typography>

      <Typography variant="h5" align="center" gutterBottom>
        Découvrez ici une large collection de cartes Pokémon. Vous pouvez explorer les sets, trier les cartes par nom, date de sortie ou rareté, et bien plus encore!
      </Typography>

      {/* Affichage du set le plus récent */}
      {latestSet && (
        <>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Set le Plus Récent: {latestSet.name}
          </Typography>

          <Typography variant="h6" align="center" gutterBottom>
            Date de sortie: {latestSet.releaseDate}
          </Typography>

          <Link href={`/sets/${slugify(latestSet.id, { lower: true })}`} passHref>
            <Typography variant="body1" color="primary" align="center" style={{ cursor: 'pointer' }}>
              Voir les détails du set
            </Typography>
          </Link>

          <Grid container spacing={4} sx={{ marginTop: 4 }}>
            <Grid item xs={12} sm={6} md={4} key={latestSet.id}>
              <div style={{ textAlign: 'center' }}>
                {latestSet.images.logo && (
                  <Image
                    src={latestSet.images.logo}
                    alt={`${latestSet.name} Logo`}
                    width={200} // Adjust width and height as needed
                    height={100}
                    style={{
                      objectFit: 'contain',
                      marginBottom: '10px',
                    }}
                  />
                )}
              </div>
            </Grid>
          </Grid>

          {/* Dropdown pour filtrer par rareté */}
          <FormControl fullWidth sx={{ marginTop: 4 }}>
            <InputLabel id="rarity-select-label">Filtrer par Rareté</InputLabel>
            <Select
              labelId="rarity-select-label"
              value={selectedRarity}
              onChange={handleRarityChange}
              label="Filtrer par Rareté"
            >
              <MenuItem value="">Toutes les rarétés</MenuItem>
              <MenuItem value="Common">Commun</MenuItem>
              <MenuItem value="Uncommon">Peu commun</MenuItem>
              <MenuItem value="Rare">Rare</MenuItem>
              <MenuItem value="Ultra Rare">Ultra Rare</MenuItem>
              <MenuItem value="Secret Rare">Rare secrète</MenuItem>
            </Select>
          </FormControl>

          {/* Affichage des cartes filtrées */}
          <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 4 }}>
            Cartes du Set
          </Typography>

          <Grid container spacing={4}>
            {filteredCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <CardDisplay card={card} />  {/* Utilisation du composant CardDisplay */}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default HomePage;
