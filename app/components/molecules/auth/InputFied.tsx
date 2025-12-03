"use client";
import { Input } from "../../atoms/Input";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
  title?: string;
  className?: string; // <-- agregamos className
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
  className = "", // <-- valor por defecto
}: InputFieldProps) => {
  return (
    <Input
      label={label}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      pattern={pattern}
      title={title}
      className={className} // <-- pasamos className al Input
    />
  );
};
