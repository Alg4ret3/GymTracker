"use client";
import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode; // <- usamos children en lugar de text
}

export const Button = ({
  onClick,
  className = "",
  disabled = false,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-2
        bg-blue-600 hover:bg-blue-700
        text-white py-3 rounded-xl font-semibold shadow-md
        hover:shadow-blue-800/40 transition-all duration-300
        active:scale-[0.98] disabled:bg-gray-500 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children} {/* <-- ahora podemos pasar JSX completo */}
    </button>
  );
};
