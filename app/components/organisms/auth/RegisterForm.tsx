"use client";

import { useState } from "react";
import Link from "next/link";
// Asume que Button y RegisterFields aceptan clases de Tailwind
import { Button } from "../../atoms/Button";
import { RegisterFields } from "../../molecules/auth/RegisterFields";
import { validateForm } from "../../molecules/auth/validateForm";
import { checkUser } from "../../molecules/auth/checkUser";
import Image from "next/image"; // Añadimos Image para el logo

// Definición de clases usando variables de CSS para coherencia
const PRIMARY_COLOR_CLASS = "bg-[var(--color-primario)] hover:bg-[var(--color-primario-hover)] text-white";
const SECONDARY_COLOR_BG_CLASS = "bg-[var(--color-fondo)]"; // Fondo del formulario
const LINK_COLOR_CLASS = "text-[var(--color-primario)] hover:text-[var(--color-primario-hover)]"; // Color del enlace

export const RegisterForm = () => {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    apellido: "",
    usuario: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  // Almacenamos el mensaje de éxito/error y el tipo
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | null }>({ text: "", type: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "id" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleSubmit = async () => {
    setMessage({ text: "", type: null });
    
    // 1. Validación del formulario
    const validation = validateForm(form);
    if (!validation.isValid) {
      setMessage({ text: validation.message || "Error en el formulario", type: "error" });
      return;
    }

    setLoading(true);

    try {
      // 2. Verificación de unicidad
      const checkResult = await checkUser({ id: form.id, usuario: form.usuario });
      
      if (checkResult.error) {
        // La API devuelve un error específico de duplicado
        setMessage({ text: checkResult.error, type: "error" });
        setLoading(false);
        return;
      }

      // Si pasa la verificación, hacemos el registro
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.error || "Error al registrar.", type: "error" });
      } else {
        setMessage({ text: "✅ Usuario registrado correctamente. Ya puedes iniciar sesión.", type: "success" });
        // Limpiar formulario al éxito
        setForm({ id: "", nombre: "", apellido: "", usuario: "", password: "", email: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "❌ Error de conexión con el servidor.", type: "error" });
    }

    setLoading(false);
  };

  // Clases dinámicas para el mensaje de estado
  const messageClasses = message.type === "error"
    ? "bg-red-900/50 border border-red-500 text-red-300"
    : message.type === "success"
    ? "bg-green-900/50 border border-green-500 text-green-300"
    : "hidden";


  return (
    // Contenedor principal: Usamos var(--color-fondo), bordes suaves y sombra.
    <div className={`${SECONDARY_COLOR_BG_CLASS} p-10 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-lg mx-auto border border-gray-700`}>
      
      <div className="flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/Favicon.svg"
          alt="Logo Favivon"
          width={90}
          height={90}
          className="rounded-full border-4 border-[var(--color-primario)] p-1 mb-4"
        />
        
        <h2 className="text-white text-3xl font-extrabold mb-2 text-center tracking-tight">
          Crea tu Cuenta
        </h2>
        <p className="text-md text-gray-400 text-center mb-6">
          Completa el formulario para unirte a la plataforma.
        </p>

        {/* Mensaje de estado (Error/Éxito) */}
        {message.text && (
          <div className={`${messageClasses} p-3 rounded-lg w-full mb-6 transition duration-300`}>
            <p className="text-center text-sm font-medium">
              {message.text}
            </p>
          </div>
        )}

        <div className="w-full space-y-5">
          {/* Campos de registro: Asume que RegisterFields renderiza los InputField que ya tienen el estilo oscuro */}
          <RegisterFields form={form} onChange={handleChange} />

          {/* Botón de Registro */}
          <Button
            text={loading ? "Procesando..." : "Registrar"}
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full ${PRIMARY_COLOR_CLASS} font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-[var(--color-primario)]/50 mt-4`}
          />

          {/* Enlace para volver */}
          <Link
            href="/"
            className={`inline-flex items-center gap-2 ${LINK_COLOR_CLASS} text-sm font-semibold transition duration-200 justify-center w-full mt-4`}
          >
            <span className="text-xl">←</span> Volver a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};