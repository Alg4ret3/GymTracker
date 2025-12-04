"use client";

import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";

export const HistoryContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="
        h-[80vh] max-h-[80vh]
        bg-gray-900/60
        border border-gray-800
        rounded-2xl
        shadow-xl shadow-black/40
        p-6
        overflow-hidden
        backdrop-blur-md
      "
    >
      {/* Animación elegante del borde superior con HeadlessUI */}
      <Transition
        as={Fragment}
        appear
        show
        enter="transition-all duration-500"
        enterFrom="opacity-0 scale-x-50"
        enterTo="opacity-100 scale-x-100"
      >
        <div className="h-px bg-gray-800/70 rounded mb-4" />
      </Transition>

      {/* Contenido scrollable */}
      <div
        className="
          flex flex-col h-full
          overflow-y-auto 
          pr-2 
          scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
        "
      >
        {children}
      </div>
    </div>
  );
};
