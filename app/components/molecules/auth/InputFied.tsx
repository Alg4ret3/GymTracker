"use client";
import { Input } from "../../atoms/Input";

interface InputFieldProps {
  label: string;
  name: string; // <- importante
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;   // <- agregado
  pattern?: string;     // <- agregado
  title?: string;       // <- agregado
}

export const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required,
  pattern,
  title,
}: InputFieldProps) => {
  return (
    <Input
      label={label}
      name={name} // <- pasar el name
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      pattern={pattern}
      title={title}
    />
  );
};
