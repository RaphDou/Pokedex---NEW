// src/components/Navbar.tsx

'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Pokedex
          </Typography>
          <div>
            <Button color="inherit" component={Link} href="/">Home</Button>
            <Button color="inherit" component={Link} href="/Sets">Sets</Button>
            <Button color="inherit" component={Link} href="/about">About</Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
