"use client";

import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";

export const HistoryItem = ({ ej }: { ej: any }) => {
  return (
    <Transition
      as={Fragment}
      appear
      show={true}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
    >
      <div
        className="
          p-5 w-full 
          bg-gray-900 border border-gray-800 
          rounded-xl 
          text-white
          shadow-sm 
          hover:shadow-blue-900/10
          hover:border-blue-600/40
          transition-all duration-300
        "
      >
        {/* Título */}
        <h3 className="font-semibold text-lg mb-1 text-blue-400 tracking-wide">
          {ej[2]}
        </h3>

        {/* Fecha */}
        <p className="text-gray-400 mb-3 text-sm">
          Fecha: <span className="text-gray-200">{ej[6]}</span>
        </p>

        {/* Datos */}
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex justify-between">
            <span>Peso:</span>
            <span className="font-semibold text-white">{ej[3]} Kg</span>
          </li>

          <li className="flex justify-between">
            <span>Repeticiones:</span>
            <span className="font-semibold text-white">{ej[4]}</span>
          </li>

          <li className="flex justify-between">
            <span>Serie:</span>
            <span className="font-semibold text-white">{ej[5]}</span>
          </li>
        </ul>
      </div>
    </Transition>
  );
};
