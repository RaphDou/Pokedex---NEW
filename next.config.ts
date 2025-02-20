import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/**', // Permet toutes les images sous ce chemin
      },
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io', // Ajoutez ce domaine ici
        port: '',
        pathname: '/**', // Permet toutes les images sous ce chemin
      },
    ],
  },
};

export default nextConfig;
