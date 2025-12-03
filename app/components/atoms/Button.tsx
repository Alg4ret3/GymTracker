"use client";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean; // <-- agregado
}

export const Button = ({ text, onClick, className = "", disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} // <-- aplicamos disabled
      className={`
        w-full
        flex
        items-center
        justify-center
        gap-2
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-3
        rounded-xl
        font-semibold
        shadow-md
        hover:shadow-blue-800/40
        transition-all
        duration-300
        active:scale-[0.98]
        disabled:bg-gray-500
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
      <FiChevronRight className="text-lg" />
    </button>
  );
};
