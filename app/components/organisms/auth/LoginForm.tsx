"use client";

import React, { useState } from "react";
import { InputField } from "../../molecules/auth/InputFied";
import { Button } from "../../atoms/Button";
import Link from "next/link";

export const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      window.location.href = "/dashboard";
    } catch {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Iniciar sesión
      </h2>

      {error && (
        <p className="text-red-400 text-center text-sm mb-4">{error}</p>
      )}

      <div className="flex flex-col gap-4">
        <InputField
          label="Usuario"
          name="usuario"
          value={usuario}
          placeholder="Ingresa tu usuario"
          onChange={(e) => setUsuario(e.target.value)}
        />

        <InputField
          label="Contraseña"
          name="password"
          type="password"
          value={password}
          placeholder="Ingresa tu contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button text="Entrar" onClick={handleLogin} />

        <div className="flex justify-end mt-2">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-600 text-sm font-medium"
          >
            Crear una cuenta <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
