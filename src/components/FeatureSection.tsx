// Page de présentation des fonctionnalités pour les nouveaux et vétérans joueurs Pokémon
import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import Image from 'next/image';

const WelcomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Titre principal */}
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        Bienvenue sur [Nom du site] - Votre guide ultime pour le TCG Pokémon
      </Typography>

      <Typography variant="h5" align="center" sx={{ mb: 4 }}>
        Découvrez un site conçu pour vous aider à gérer vos cartes Pokémon et créer des decks, que vous soyez débutant ou vétéran du jeu.
      </Typography>

      {/* Introduction générale */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={5}>
          <Paper sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Nouveau dans l'univers Pokémon TCG ?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Ne vous inquiétez pas ! Nous avons créé une plateforme facile à utiliser pour vous aider à démarrer, organiser votre collection de cartes et apprendre à créer votre premier deck.
            </Typography>
            <Button variant="contained" color="primary" href="#newbies">
              Découvrez comment commencer
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Paper sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Vous êtes un vétéran du jeu ?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Vous cherchez à affiner vos stratégies, suivre les dernières tendances et optimiser vos decks ? Notre site vous offre des outils avancés pour gérer vos cartes et vous rester compétitif.
            </Typography>
            <Button variant="contained" color="primary" href="#veterans">
              Explorez les fonctionnalités avancées
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Section pour les débutants */}
      <Box id="newbies" sx={{ mt: 6 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Pour les Nouveaux Joueurs
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Commencez votre aventure dans le monde des cartes Pokémon avec notre plateforme. Nous vous offrons un **catalogue complet**, des outils pour suivre vos cartes, et des recommandations pour construire vos premiers decks.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                1. Créez votre Collection
              </Typography>
              <Typography variant="body2" paragraph>
                Parcourez toutes les cartes disponibles, ajoutez celles que vous possédez et suivez celles qui vous manquent. Gardez votre collection à jour facilement !
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                2. Créez votre Premier Deck
              </Typography>
              <Typography variant="body2" paragraph>
                Notre éditeur de decks vous guide dans la création de votre premier deck. Simple, interactif et sans prise de tête.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                3. Simulez vos Parties
              </Typography>
              <Typography variant="body2" paragraph>
                Testez vos decks en simulant des matchs contre d'autres joueurs ou l'IA pour voir comment ils fonctionnent avant de vous lancer dans des compétitions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Section pour les vétérans */}
      <Box id="veterans" sx={{ mt: 6, backgroundColor: '#f0f0f0', padding: 4 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Pour les Vétérans du Jeu
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Vous êtes un expert des cartes Pokémon et vous souhaitez gérer vos cartes, affiner vos stratégies, et suivre les tendances du métagame ? Notre site offre des outils avancés pour vous !
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                1. Gestion Avancée des Cartes
              </Typography>
              <Typography variant="body2" paragraph>
                Suivez les cartes rares, les tendances des prix, et obtenez des alertes chaque fois qu'une carte rare ou un set exclusif est lancé.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                2. Analyse de Deck
              </Typography>
              <Typography variant="body2" paragraph>
                Analysez la performance de vos decks, testez des stratégies et consultez les meilleurs decks du moment pour rester au top.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                3. Restez à Jour avec le Métagame
              </Typography>
              <Typography variant="body2" paragraph>
                Accédez à des articles, analyses et guides pour rester informé des dernières tendances du TCG et affiner vos stratégies.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Prêt à démarrer votre aventure Pokémon ?
        </Typography>
        <Button variant="contained" color="primary" href="/register">
          Rejoignez-nous et commencez maintenant !
        </Button>
      </Box>
    </Container>
  );
};

export default WelcomePage;
