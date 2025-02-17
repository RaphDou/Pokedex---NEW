import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import styles from "..//styles/pokemonList.module.css"; // Si tu veux toujours un peu de CSS personnalisé

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const index = pokemon.url.split("/")[6]; // Extract Pokémon index from URL

  return (
    <Card className={styles.card} sx={{ maxWidth: 200, margin: "10px", borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {pokemon.name}
        </Typography>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
          alt={pokemon.name}
          width={100}
          height={100}
        />
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
