"use client";

import { useState, useEffect } from "react";

import { Grid, CircularProgress, Container } from "@mui/material"; // Utilisation des composants MUI
import { fetchPokemonList } from "@/lib/pokemonApi";
import PokemonCard from "@/components/PokemonCard";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonList()
      .then((data) => {
        setPokemonList(data);
        setLoading(false);
      })
      .catch((err) => {
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
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
