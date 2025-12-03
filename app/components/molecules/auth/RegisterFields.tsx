"use client";
import { InputField } from "./InputFied";

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
  return (
    <div className="space-y-4">
      {/* CÉDULA */}
      <InputField
        label="Cédula"
        name="id"
        type="text"
        value={form.id}
        onChange={onChange}
        placeholder="Ingrese su número de cédula"
        pattern="^\d+$"
        title="Solo números"
        required
      />

      {/* NOMBRE */}
      <InputField
        label="Nombre"
        name="nombre"
        type="text"
        value={form.nombre}
        onChange={onChange}
        placeholder="Ingrese su nombre"
        pattern="^[A-Za-z\s]+$"
        title="Solo letras y espacios"
        required
      />

      {/* APELLIDO */}
      <InputField
        label="Apellido"
        name="apellido"
        type="text"
        value={form.apellido}
        onChange={onChange}
        placeholder="Ingrese su apellido"
        pattern="^[A-Za-z\s]+$"
        title="Solo letras y espacios"
        required
      />

      {/* USUARIO */}
      <InputField
        label="Usuario"
        name="usuario"
        type="text"
        value={form.usuario}
        onChange={onChange}
        placeholder="Ingrese su usuario"
        pattern="^[A-Za-z0-9_]+$"
        title="Solo letras, números y guion bajo"
        required
      />

      {/* EMAIL */}
      <InputField
        label="Correo"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        placeholder="Ingrese su correo @gmail.com"
        pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
        title="Debe ser un correo válido de Gmail"
        required
      />

      {/* CONTRASEÑA */}
      <InputField
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        placeholder="Ingrese su contraseña (letras y números)"
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
        title="Mínimo 6 caracteres, debe contener letras y números"
        required
      />
    </div>
  );
};
