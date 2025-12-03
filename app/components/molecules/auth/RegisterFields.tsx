"use client";
import { useState, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Input } from "../../atoms/Input";

interface RegisterFieldsProps {
  form: {
    id: string;
    nombre: string;
    apellido: string;
    usuario: string;
    password: string;
    email: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegisterFields = ({ form, onChange }: RegisterFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Refs para cada input
  const nombreRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const usuarioRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Enter" && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Cédula"
        name="id"
        type="text"
        value={form.id}
        onChange={onChange}
        placeholder="Ingrese su número de cédula"
        pattern="^\d+$"
        title="Solo números"
        required
        onKeyDown={(e) => handleKeyDown(e, nombreRef)}
      />

      <Input
        label="Nombre"
        name="nombre"
        type="text"
        value={form.nombre}
        onChange={onChange}
        placeholder="Ingrese su nombre"
        pattern="^[A-Za-z\s]+$"
        title="Solo letras y espacios"
        required
        ref={nombreRef}
        onKeyDown={(e) => handleKeyDown(e, apellidoRef)}
      />

      <Input
        label="Apellido"
        name="apellido"
        type="text"
        value={form.apellido}
        onChange={onChange}
        placeholder="Ingrese su apellido"
        pattern="^[A-Za-z\s]+$"
        title="Solo letras y espacios"
        required
        ref={apellidoRef}
        onKeyDown={(e) => handleKeyDown(e, usuarioRef)}
      />

      <Input
        label="Usuario"
        name="usuario"
        type="text"
        value={form.usuario}
        onChange={onChange}
        placeholder="Ingrese su usuario"
        pattern="^[A-Za-z0-9_]+$"
        title="Solo letras, números y guion bajo"
        required
        ref={usuarioRef}
        onKeyDown={(e) => handleKeyDown(e, emailRef)}
      />

      <Input
        label="Correo"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        placeholder="Ingrese su correo @gmail.com"
        pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
        title="Debe ser un correo válido de Gmail"
        required
        ref={emailRef}
        onKeyDown={(e) => handleKeyDown(e, passwordRef)}
      />

      {/* Contraseña con toggle */}
      <div className="relative">
        <Input
          label="Contraseña"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={onChange}
          placeholder="Ingrese su contraseña (letras y números)"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
          title="Mínimo 6 caracteres, debe contener letras y números"
          required
          ref={passwordRef}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500 hover:text-white transition cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
      </div>
    </div>
  );
};
