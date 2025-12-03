"use client";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

export const Button = ({
  text,
  onClick
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="
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
      "
    >
      {text}
      <FiChevronRight className="text-lg" />
    </button>
  );
};
