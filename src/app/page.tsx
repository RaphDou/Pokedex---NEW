// src/pages/index.tsx
import CardsDisplay from '@/components/CardDisplay.tsx';
import React from 'react';


const HomePage = () => {
  return (
    <div>
      <h1>Catalogue des Cartes Pokémon</h1>
      <CardsDisplay />
    </div>
  );
};

export default HomePage;
