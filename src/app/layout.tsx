// src/app/layout.tsx

import React from "react";
import Navbar from "../components/Navbar"; // Adjust path if needed
import { Geist, Geist_Mono } from "next/font/google";

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
        {/* Navbar is now included in the root layout */}
        <Navbar />
        {children} {/* This renders the specific page content */}
      </body>
    </html>
  );
}
