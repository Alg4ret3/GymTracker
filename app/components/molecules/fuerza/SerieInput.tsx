"use client";

import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiTrash2, FiMoreVertical } from "react-icons/fi";
import { Input } from "../../atoms/Input";

export interface Serie {
  peso: string;
  repeticiones: string;
  numero_serie: string;
}

interface SerieInputProps {
  serie: Serie;
  index: number;
  onChange: (index: number, field: keyof Serie, value: string) => void;
  onRemove: (index: number) => void;
}

export const SerieInput = ({ serie, index, onChange, onRemove }: SerieInputProps) => {
  return (
    <div
      className="
        w-full
        bg-gray-900/60 border border-gray-800
        p-5 rounded-2xl shadow-lg
        flex flex-col md:flex-row
        gap-5 md:items-end
        transition-all duration-200
        hover:border-blue-500/40 hover:shadow-blue-900/10
      "
    >
      {/* Peso */}
      <Input
        label={`Serie ${index + 1} - Peso`}
        name={`peso-${index}`}
        value={serie.peso}
        onChange={(e) => onChange(index, "peso", e.target.value)}
        className="bg-gray-800 border-gray-700 text-white"
      />

      {/* Repeticiones */}
      <Input
        label="Repeticiones"
        name={`reps-${index}`}
        value={serie.repeticiones}
        onChange={(e) => onChange(index, "repeticiones", e.target.value)}
        className="bg-gray-800 border-gray-700 text-white"
      />

      {/* Menú de opciones */}
      <div className="md:self-end md:mb-1">
        <Menu as="div" className="relative inline-block text-left">
          {/* Botón del menú */}
          <Menu.Button
            className="
              p-2 rounded-lg
              bg-gray-800 hover:bg-gray-700 
              border border-gray-700
              transition-all active:scale-95
              text-gray-300 hover:text-white
              touch-manipulation
            "
          >
            <FiMoreVertical size={18} />
          </Menu.Button>

          {/* Animación del menú */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-120"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="
                md:absolute md:right-0 md:mt-2
                fixed right-3 top-auto mt-2
                w-48
                bg-gray-900 border border-gray-700
                rounded-xl shadow-lg z-50
                focus:outline-none
                overflow-hidden
              "
            >
              {/* Botón eliminar (AZUL) */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onRemove(index)}
                    className={`
                      w-full flex items-center gap-2 px-4 py-3
                      text-left font-medium transition
                      ${active ? "bg-blue-600 text-white" : "text-gray-300"}
                    `}
                  >
                    <FiTrash2 size={18} />
                    Eliminar serie
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
