import React, { useState } from 'react';
import { CardMedia, Typography, Button, Collapse } from '@mui/material';
import { PokemonCard } from '../lib/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CardDisplayProps {
  card: PokemonCard;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  const [open, setOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu déroulant

  // Fonction pour basculer l'état du menu déroulant
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '20px',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        component="img"
        alt={card.name}
        image={card.images.small}
        style={{
          objectFit: 'contain',
          width: '200px',
          height: 'auto',
          transition: 'transform 0.3s ease',
          margin: '0 auto',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <Typography variant="h6" style={{ fontSize: '1.1rem', marginTop: '10px' }}>
        {card.name}
      </Typography>

      {/* Menu déroulant */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleToggle}
        endIcon={<ExpandMoreIcon />}
        style={{ marginTop: '10px' }}
      >
        Détails
      </Button>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={{ marginTop: '10px', textAlign: 'left' }}>
          {/* Afficher les types uniquement si disponibles */}
          {Array.isArray(card.types) && card.types.length > 0 && (
            <Typography variant="body2" color="textSecondary">
              {card.types.join(', ')}
            </Typography>
          )}

          {/* Afficher les HP uniquement si disponibles */}
          {card.hp && (
            <Typography variant="body2" color="textSecondary">
              {card.hp} HP
            </Typography>
          )}

          {/* Afficher les attaques uniquement si disponibles */}
          {Array.isArray(card.attacks) && card.attacks.length > 0 && (
            <>
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                <strong>Attaques :</strong>
              </Typography>
              {card.attacks.map((attack, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <Typography variant="body2">
                    <strong>{attack.name}</strong> (Coût : {attack.cost.join(', ')}) - {attack.damage} dégâts
                  </Typography>
                  <Typography variant="body2">{attack.text}</Typography>
                </div>
              ))}
            </>
          )}

          {/* Afficher la faiblesse uniquement si disponible */}
          {Array.isArray(card.weaknesses) && card.weaknesses.length > 0 && (
            <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
              <strong>Faiblesse :</strong> {card.weaknesses.map(w => `${w.type} ×${w.value}`).join(', ')}
            </Typography>
          )}

          {/* Afficher le coût de retraite uniquement si disponible */}
          {Array.isArray(card.retreatCost) && card.retreatCost.length > 0 && (
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
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
              style={{ marginTop: '20px' }}
            >
              Voir sur TCGPlayer
            </Button>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default CardDisplay;
