"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../atoms/Button";
import { RegisterFields } from "../../molecules/auth/RegisterFields";
import { validateForm } from "../../molecules/auth/validateForm";
import { checkUser } from "../../molecules/auth/checkUser";

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
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "id" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleSubmit = async () => {
    setMsg("");
    const validation = validateForm(form);
    if (!validation.isValid) {
      setMsg(validation.message || "Error en el formulario");
      return;
    }

    setLoading(true);

    try {
      // Verificamos que Id_Usuario y Usuario sean únicos
      const { success, error } = await checkUser({ id: form.id, usuario: form.usuario });
      console.log("checkUser result:", { success, error });

      if (error) {
        setMsg(error); // API ya devuelve cuál está duplicado
        setLoading(false);
        return;
      }

      if (!success) {
        setMsg("El Id_Usuario o Usuario ya existen");
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
        setMsg(data.error || "Error al registrar.");
      } else {
        setMsg("Usuario registrado correctamente.");
        setForm({ id: "", nombre: "", apellido: "", usuario: "", password: "", email: "" });
      }
    } catch (err) {
      console.error(err);
      setMsg("Error de conexión.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-zinc-800 flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-8 text-center">Crear cuenta</h2>

      <div className="w-full space-y-4">
        <RegisterFields form={form} onChange={handleChange} />

        <Button
          text={loading ? "Registrando..." : "Registrar"}
          onClick={handleSubmit}
        />

        <Link
          href="/"
          className="self-start mb-4 text-blue-400 hover:text-blue-600 flex items-center gap-2 text-sm font-medium"
        >
          <span className="text-xl">←</span> Volver a iniciar sesión
        </Link>

        {msg && <p className="text-sm text-center text-gray-300 mt-2">{msg}</p>}
      </div>
    </div>
  );
};
