"use client";

interface FormData {
  id: string;
  nombre: string;
  apellido: string;
  usuario: string;
  password: string;
  email: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateForm = (form: FormData): ValidationResult => {
  const patterns: Record<string, RegExp> = {
    id: /^\d+$/,
    nombre: /^[A-Za-z\s]+$/,
    apellido: /^[A-Za-z\s]+$/,
    usuario: /^[A-Za-z0-9_]+$/,
    email: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  for (const key in form) {
    const value = form[key as keyof typeof form];
    if (!value) {
      return { isValid: false, message: `El campo ${key} es obligatorio` };
    }
    if (!patterns[key as keyof typeof patterns].test(value)) {
      return { isValid: false, message: `El campo ${key} no cumple el formato requerido` };
    }
  }

  return { isValid: true };
};
