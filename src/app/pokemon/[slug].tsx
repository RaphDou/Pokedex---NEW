// src/app/pokemon/[slug].tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Container, Typography, Card, CardContent } from "@mui/material";
import { fetchPokemonDetails } from "@/lib/pokemonApi"; // Assurez-vous que c'est un appel client (ou API fetch côté client)
import Image from "next/image";

// Définition des types
interface PokemonDetails {
  name: string;
  id: number;
  height: number;
  weight: number;
  imageUrl: string;
}

export default function PokemonDetailsPage() {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      // Récupération des données de Pokémon côté client
      fetchPokemonDetails(slug as string)
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <p>Loading...</p>
      </Container>
    );
  }

  if (!pokemon) {
    return (
      <Container>
        <Typography variant="h6">Pokemon not found!</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card sx={{ maxWidth: 500, margin: "auto", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            width={200}
            height={200}
          />
          <Typography variant="body1">ID: {pokemon.id}</Typography>
          <Typography variant="body1">Height: {pokemon.height} meters</Typography>
          <Typography variant="body1">Weight: {pokemon.weight} kg</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
