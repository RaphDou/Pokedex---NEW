// src/app/layout.tsx

import React from "react";
import Navbar from "../components/Navbar"; // Ajuste le chemin si nécessaire
import { Geist, Geist_Mono } from "next/font/google";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent"; // Importer ton composant de fil d'Ariane

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokedex",
  description: "Explore Pokémon and their stats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Navbar est inclus dans le layout principal */}
        <Navbar />

        {/* Fil d'Ariane global */}
        <div>
          <BreadcrumbsComponent />
        </div>

        {/* Contenu de la page spécifique */}
        {children}
      </body>
    </html>
  );
}
