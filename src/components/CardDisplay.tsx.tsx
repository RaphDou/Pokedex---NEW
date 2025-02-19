// src/components/CardDisplay.tsx
import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { PokemonCard } from '../lib/types';

interface CardDisplayProps {
  card: PokemonCard;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={card.name}
        image={card.images.small}
        sx={{
          objectFit: 'contain',
          width: '100%',
          height: 'auto',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <Typography variant="h6" sx={{ fontSize: '1.1rem', marginTop: 1 }}>
        {card.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {card.types.join(', ')}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {card.hp} HP
      </Typography>
    </Box>
  );
};

export default CardDisplay;
