"use client";

import React, { useState } from "react";
// Asume que InputField y Button pueden recibir y aplicar clases de Tailwind
import { InputField } from "../../molecules/auth/InputFied";
import { Button } from "../../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Definimos las clases de estilo usando las variables de CSS:
// Nota: En Tailwind, para usar variables de CSS para colores,
// debes configurarlas en tu tailwind.config.js o usar la sintaxis `[var(--nombre-variable)]`.
// Aquí asumimos que ya tienes configurado el uso de estas variables.

const PRIMARY_COLOR_CLASS = "bg-[var(--color-primario)] hover:bg-[var(--color-primario-hover)] text-white";
const SECONDARY_COLOR_BG_CLASS = "bg-[var(--color-fondo)]"; // Fondo del formulario
const INPUT_BG_CLASS = "bg-gray-700 focus:ring-[var(--color-primario)] focus:border-[var(--color-primario)]"; // Fondo de los inputs
const LINK_COLOR_CLASS = "text-[var(--color-primario)] hover:text-[var(--color-primario-hover)]"; // Color del enlace

export const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!usuario || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión.");
        return;
      }

      localStorage.setItem("userId", data.userId);
      router.push("/dashboard");
    } catch {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    // Contenedor principal: Usamos var(--color-fondo) para el fondo
    <div className={`${SECONDARY_COLOR_BG_CLASS} p-8 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-sm mx-auto border border-gray-700`}>
      <div className="flex justify-center mb-6">
        {/* Logo del gimnasio/aplicación. Borde con color primario. */}
        <Image
          src="/Favicon.svg"
          alt="Logo Favivon"
          width={120}
          height={120}
          className="rounded-full border-4 border-[var(--color-primario)] p-1"
        />
      </div>

      <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
        Bienvenido
      </h2>
      <p className="text-sm text-gray-400 text-center mb-6">
        Accede a tu cuenta de gestión.
      </p>

      {/* Mensaje de Error: Rojo estándar de Tailwind para errores */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 p-3 rounded-lg mb-5 transition duration-300">
          <p className="text-red-300 text-center text-sm font-medium">
            ⚠️ {error}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* Campo de Usuario */}
        <InputField
          label="Usuario"
          name="usuario"
          value={usuario}
          placeholder="nombre.usuario"
          onChange={(e) => setUsuario(e.target.value)}
          // Asegúrate de pasar clases al componente InputField
          className={INPUT_BG_CLASS}
        />

        {/* Campo de Contraseña */}
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          value={password}
          placeholder="**************"
          onChange={(e) => setPassword(e.target.value)}
          // Asegúrate de pasar clases al componente InputField
          className={INPUT_BG_CLASS}
        />

        {/* Botón: Uso de --color-primario y --color-primario-hover */}
        <Button
          text="Iniciar Sesión"
          onClick={handleLogin}
          className={`w-full ${PRIMARY_COLOR_CLASS} font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-[var(--color-primario)]/50 mt-3`}
        />

        {/* Enlace para Crear una Cuenta - Uso de --color-primario */}
        <div className="flex justify-center mt-2">
          <Link
            href="/register"
            className={`inline-flex items-center gap-2 ${LINK_COLOR_CLASS} text-sm font-semibold transition duration-200`}
          >
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};