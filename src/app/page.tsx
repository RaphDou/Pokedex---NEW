// src/app/page.tsx

"use client";

import { useState, useEffect } from "react";
import { CircularProgress, Container, Grid } from "@mui/material";
import { fetchPokemonList } from "@/lib/pokemonApi";
import PokemonCard from "@/components/PokemonCard";
import Link from "next/link"; // Import Link for navigation
import { AxiosError } from "axios"; // Import AxiosError

interface Pokemon {
  name: string;
  url: string;
}

export default function Page() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPokemonList()
      .then((data: { results: Pokemon[] }) => {  // Typage explicite pour 'data'
        setPokemonList(data.results);  // Assurez-vous que 'data' contient 'results' comme prévu
        setLoading(false);
      })
      .catch((err: AxiosError) => {  // Typage avec AxiosError
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {pokemonList.map((pokemon, index) => (
          <Grid item key={index}>
            <Link href={`/pokemon/${pokemon.name}`} passHref>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
