"use client";
import React from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;   // <- agregado
  pattern?: string;     // <- agregado
  title?: string;       // <- agregado
}

export const Input = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required,
  pattern,
  title,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-white">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        pattern={pattern}
        title={title}
        className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg outline-none border border-gray-700 focus:border-blue-500"
      />
    </div>
  );
};
