"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EjercicioForm } from "../../molecules/fuerza/EjercicioForm";
import { EjercicioHistory } from "../../molecules/fuerza/EjercicioHistory";

export const DashboardFuerza = ({ userId }: { userId: string | null }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    // Al usar replace, evitas que la página actual (el dashboard) quede en el historial.
    // Si el usuario presiona atrás desde la landing page ('/'), no volverá al dashboard.
    router.replace("/"); 
  };

  useEffect(() => {
    if (!mounted) return; // espera a estar en cliente
    if (!userId) {
      logout();
      return;
    }

    // Función que se llama cuando ocurre un cambio en el historial del navegador (ej: botón de atrás/adelante)
    const handlePopState = () => {
      // **Cierra la sesión automáticamente al detectar el evento 'popstate'**
      logout();
    };

    window.addEventListener("popstate", handlePopState);
    
    // Función de limpieza para remover el listener cuando el componente se desmonte
    return () => window.removeEventListener("popstate", handlePopState);
  }, [mounted, userId]); // El efecto se vuelve a ejecutar si mounted o userId cambian

  // Si no está montado o no hay userId, no renderizar nada (o redirigir)
  if (!mounted || !userId) return null; 

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard de Fuerza</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-white font-semibold"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EjercicioForm userId={userId} />
        <EjercicioHistory userId={userId} />
      </div>
    </div>
  );
};