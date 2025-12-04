"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EjercicioForm } from "../../molecules/fuerza/EjercicioForm";
import { EjercicioHistory } from "../../molecules/fuerza/EjercicioHistory";

import { LogoutButton } from "../../molecules/fuerza/LogoutButton";
import { DashboardFooter } from "../../molecules/fuerza/DashboardFooter";

// Clases CSS usando variables para coherencia de color
const PRIMARY_COLOR_BG_CLASS =
  "bg-[var(--color-primario)] hover:bg-[var(--color-primario-hover)]";
const BACKGROUND_COLOR_CLASS = "bg-[var(--color-secundario)]";
const TEXT_COLOR_CLASS = "text-[var(--foreground)]";
const ACCENT_COLOR_CLASS = "text-[var(--color-primario)]";

export const DashboardFuerza = ({ userId }: { userId: string | null }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const logout = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    router.replace("/");
  };

  useEffect(() => {
    if (!mounted || userId) return;

    logout();

    const handlePopState = () => logout();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [mounted, userId]);

  if (!mounted || !userId) return null;

  return (
    <div
      className={`min-h-screen p-6 md:p-10 flex flex-col ${BACKGROUND_COLOR_CLASS} ${TEXT_COLOR_CLASS}`}
    >
      {/* Encabezado */}
      <header className="flex flex-col justify-center items-center mb-4 border-b border-gray-700 pb-2">
        <h1 className={`flex items-center justify-center ${ACCENT_COLOR_CLASS}`}>
          <img
            src="/Favicon.svg"
            alt="Logo"
            className="w-50 h-50 md:w-24 md:h-24"
          />
        </h1>
      </header>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700/50 transition-all hover:scale-[1.01] duration-200">
            <h2 className="text-xl font-semibold text-white flex items-center gap-3 mb-6">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Registrar Nuevo Ejercicio
            </h2>

            <EjercicioForm userId={userId} />
          </div>
        </div>

        {/* Historial */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700/50 h-full transition-all hover:scale-[1.01] duration-200">
            <h2 className="text-xl font-semibold text-white flex items-center gap-3 mb-6">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Últimos Registros
            </h2>

            <EjercicioHistory userId={userId} />
          </div>
        </div>
      </div>

      {/* Botón de logout */}
      <LogoutButton logout={logout} />

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};
