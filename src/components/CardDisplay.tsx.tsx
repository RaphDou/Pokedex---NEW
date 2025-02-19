import React from 'react';
import { Box, CardMedia, Typography, Button } from '@mui/material';
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
        {Array.isArray(card.types) && card.types.length > 0 ? card.types.join(', ') : 'Aucun type'}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {card.hp} HP
      </Typography>

      {/* Afficher les attaques */}
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        <strong>Attaques :</strong>
      </Typography>
      {Array.isArray(card.attacks) && card.attacks.length > 0 ? (
        card.attacks.map((attack, index) => (
          <Box key={index} sx={{ marginBottom: 1 }}>
            <Typography variant="body2">
              <strong>{attack.name}</strong> (Coût : {attack.cost.join(', ')}) 
              - {attack.damage} dégâts
            </Typography>
            <Typography variant="body2">{attack.text}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">Aucune attaque disponible.</Typography>
      )}

      {/* Afficher la faiblesse, en vérifiant d'abord si `weaknesses` existe */}
      {Array.isArray(card.weaknesses) && card.weaknesses.length > 0 && (
        <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
          <strong>Faiblesse :</strong> {card.weaknesses.map(w => `${w.type} ×${w.value}`).join(', ')}
        </Typography>
      )}

      {/* Coût de retraite */}
      {Array.isArray(card.retreatCost) && card.retreatCost.length > 0 && (
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          Coût de retraite : {card.retreatCost.length} ({card.retreatCost.join(', ')})
        </Typography>
      )}

      {/* Lien vers TCGPlayer */}
      {card.tcgplayer?.url && (
        <Button 
          variant="outlined" 
          color="primary" 
          href={card.tcgplayer.url} 
          target="_blank" 
          sx={{ marginTop: 2 }}
        >
          Voir sur TCGPlayer
        </Button>
      )}
    </Box>
  );
};

export default CardDisplay;
