"use client";

import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation"; // Utilisation de next/navigation

const BreadcrumbsComponent: React.FC = () => {
  const pathname = usePathname(); // Utilise usePathname pour obtenir le chemin de l'URL

  // Si le chemin est la page d'accueil ("/"), on ne retourne rien
  if (pathname === "/") {
    return null;
  }

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
      <Link href="/" color="inherit">
        Accueil
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return index === pathnames.length - 1 ? (
          <Typography key={to} color="text.primary">
            {value}
          </Typography>
        ) : (
          <Link key={to} href={to} color="inherit">
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
