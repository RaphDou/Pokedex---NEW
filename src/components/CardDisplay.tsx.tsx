import React, { useState } from 'react';
import { CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, IconButton, Grid, Box } from '@mui/material';
import { PokemonCard } from '../lib/types';
import CloseIcon from '@mui/icons-material/Close';

interface CardDisplayProps {
  card: PokemonCard;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const getTypeIcon = (type: string) => {
    const typeImage = type.toLowerCase();
    return `/types/${typeImage}.png`; // Chemin relatif de l'icône
  };

  return (
    <>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          cursor: 'pointer',
        }}
        onClick={handleOpenPopup}
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
      </div>

      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        maxWidth="md"
        fullWidth
        aria-labelledby="pokemon-details-popup"
      >
        <DialogTitle>
          <Typography>{card.name}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClosePopup}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Image de la carte à gauche */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                alt={card.name}
                image={card.images.large} // Utilisation de la grande image pour la popup
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Grid>

            {/* Informations détaillées à droite */}
            <Grid item xs={12} md={6}>
              <Box>
                {Array.isArray(card.types) && card.types.length > 0 && (
                  <Typography variant="body1">
                    <strong>Types:</strong>{' '}
                    {card.types.map((type, index) => (
                      <span key={index} style={{ marginRight: '8px' }}>
                        <img
                          src={getTypeIcon(type)}
                          alt={type}
                          style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                        />
                      </span>
                    ))}
                  </Typography>
                )}

                {Array.isArray(card.subtypes) && card.subtypes.length > 0 && (
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong>Sous-types:</strong> {card.subtypes.join(', ')}
                  </Typography>
                )}

                {card.supertype && (
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong>Super-type:</strong> {card.supertype}
                  </Typography>
                )}

                {card.rarity && (
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong>Rareté:</strong> {card.rarity}
                  </Typography>
                )}

                {card.hp && (
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong>{card.hp} HP</strong>
                  </Typography>
                )}

                {Array.isArray(card.attacks) && card.attacks.length > 0 && (
                  <>
                    <Typography variant="body1" style={{ marginTop: '20px' }}>
                      <strong>Attaques :</strong>
                    </Typography>
                    {card.attacks.map((attack, index) => (
                      <Box key={index} style={{ marginBottom: '10px' }}>
                        <Typography variant="body1">
                          <strong>{attack.name}</strong> (Coût :{' '}
                          {attack.cost.map((costType, costIndex) => (
                            <span key={costIndex} style={{ marginRight: '4px' }}>
                              <img
                                src={getTypeIcon(costType)}
                                alt={costType}
                                style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                              />
                            </span>
                          ))}) - {attack.damage} dégâts
                        </Typography>
                        <Typography variant="body2">{attack.text}</Typography>
                      </Box>
                    ))}
                  </>
                )}

                {Array.isArray(card.weaknesses) && card.weaknesses.length > 0 && (
                  <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
                    <strong>Faiblesses :</strong>{' '}
                    {card.weaknesses.map((w, index) => (
                      <span key={index} style={{ marginRight: '8px' }}>
                        <img
                          src={getTypeIcon(w.type)}
                          alt={w.type}
                          style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                        />
                        ×{w.value}
                      </span>
                    ))}
                  </Typography>
                )}

                {Array.isArray(card.retreatCost) && card.retreatCost.length > 0 && (
                  <Typography variant="body1" style={{ marginTop: '20px' }}>
                    <strong>Coût de retraite :</strong>{' '}
                    {card.retreatCost.map((costType, costIndex) => (
                      <span key={costIndex} style={{ marginRight: '4px' }}>
                        <img
                          src={getTypeIcon(costType)}
                          alt={costType}
                          style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                        />
                      </span>
                    ))}
                  </Typography>
                )}

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
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardDisplay;
