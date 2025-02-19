import React from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { PokemonCard } from '../lib/types';
import CardDisplay from '@/components/CardDisplay.tsx';

interface CardGridProps {
  cards: PokemonCard[];
  loading: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, loading }) => {
  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <Grid container spacing={2}>
          {cards.length > 0 ? (
            cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <CardDisplay card={card} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', width: '100%' }}>
              Aucun Pokémon trouvé.
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default CardGrid;
