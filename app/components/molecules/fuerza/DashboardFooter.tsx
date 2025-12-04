"use client";
import React from "react";

export const DashboardFooter = () => {
  return (
    <footer
      className="
        mt-12 pt-6
        text-center text-gray-400 text-xs
        border-t border-gray-800
      "
    >
      © {new Date().getFullYear()} Plataforma de Gestión de Entrenamiento.  
      Todos los derechos reservados.
    </footer>
  );
};
