"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EjercicioForm } from "../../molecules/fuerza/EjercicioForm"; // Componente para registrar ejercicios
import { EjercicioHistory } from "../../molecules/fuerza/EjercicioHistory"; // Componente para mostrar historial

// Definición de clases usando variables de CSS para coherencia
const PRIMARY_COLOR_BG_CLASS = "bg-[var(--color-primario)] hover:bg-[var(--color-primario-hover)]";
const BACKGROUND_COLOR_CLASS = "bg-[var(--color-secundario)]"; // Fondo principal
const TEXT_COLOR_CLASS = "text-[var(--foreground)]"; // Color del texto principal
const ACCENT_COLOR_CLASS = "text-[var(--color-primario)]"; // Color de acento para títulos

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
    router.replace("/");
  };

  useEffect(() => {
    if (!mounted) return;
    if (!userId) {
      logout();
      return;
    }

    const handlePopState = () => {
      // Cierra la sesión automáticamente al detectar el evento 'popstate'
      logout();
    };

    // Esto cierra la sesión si el usuario presiona el botón 'Atrás'
    window.addEventListener("popstate", handlePopState);
    
    return () => window.removeEventListener("popstate", handlePopState);
  }, [mounted, userId]);

  // Si no está montado o no hay userId, no renderizar nada
  if (!mounted || !userId) return null; 

  return (
    // Fondo más oscuro y consistente con la paleta
    <div className={`p-6 md:p-10 min-h-screen ${BACKGROUND_COLOR_CLASS} ${TEXT_COLOR_CLASS}`}>
      
      {/* Encabezado del Dashboard */}
      <header className="flex justify-between items-center py-4 mb-8 border-b border-gray-700">
<h1
  className={`
    text-5xl md:text-6xl 
    font-extrabold 
    tracking-tight 
    text-center 
    ${ACCENT_COLOR_CLASS} 
    drop-shadow-lg 
    animate-[fadeIn_1s_ease-in-out]
  `}
>
  ¡Desafía tus límites hoy!
</h1>


        
        {/* Botón de Cerrar Sesión con estilo de peligro */}
        <button
          onClick={logout}
          className="bg-red-700 hover:bg-red-800 transition duration-300 px-6 py-2 rounded-lg text-white font-bold shadow-lg shadow-red-700/30 text-sm"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Contenido principal: Formulario e Historial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna principal para el Formulario de registro (2/3 del ancho en pantallas grandes) */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              Registrar Nuevo Ejercicio
            </h2>
            <EjercicioForm userId={userId} />
          </div>
        </div>
        
        {/* Columna lateral para el Historial (1/3 del ancho en pantallas grandes) */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700/50 h-full">
            <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              Últimos Registros
            </h2>
            <EjercicioHistory userId={userId} />
          </div>
        </div>
        
      </div>

      {/* Pie de página sutil (opcional) */}
      <footer className="text-center mt-12 pt-4 text-gray-500 text-xs border-t border-gray-800">
        © {new Date().getFullYear()} Plataforma de Gestión de Entrenamiento. Todos los derechos reservados.
      </footer>
    </div>
  );
};