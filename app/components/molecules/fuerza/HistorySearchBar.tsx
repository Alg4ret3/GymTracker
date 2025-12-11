"use client";

import React from "react";
import { Switch, Listbox } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

const CATEGORIAS = [
  "Pecho",
  "Tríceps",

  "Espalda",
  "Bíceps",

  "Hombro y Trapecio",
  "Pierna",
  "Funcional",
];

export const HistorySearchBar = ({
  search,
  setSearch,
  showAll,
  setShowAll,
  categoria,
  setCategoria,
}: {
  search: string;
  setSearch: (v: string) => void;
  showAll: boolean;
  setShowAll: (v: boolean) => void;

  categoria: string;
  setCategoria: (v: string) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-4 mb-6">

      {/* 🔍 Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar ejercicio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full px-4 py-3 rounded-xl
          bg-gray-900 text-white
          placeholder-gray-500
          border border-gray-800
          shadow-sm
          transition-all
          focus:outline-none
          focus:border-blue-600
          focus:ring-2 focus:ring-blue-600/40
        "
      />

      {/* 📂 Selector de Categoría */}
      <div className="w-full">
        <Listbox value={categoria} onChange={setCategoria}>
          <div className="relative">
            <Listbox.Button
              className="
                w-full bg-gray-900 text-blue-400
                border border-gray-700 rounded-lg
                px-3 py-2 text-left cursor-pointer
                flex items-center justify-between
                focus:ring-2 focus:ring-blue-600 focus:border-blue-500
                transition
              "
            >
              {categoria ? categoria : "Filtrar por categoría"}
              <ChevronDown size={18} className="text-blue-400" />
            </Listbox.Button>

            <Listbox.Options
              className="
                absolute mt-1 w-full bg-gray-900 border border-gray-700
                rounded-lg shadow-lg overflow-hidden z-30
              "
            >
              <Listbox.Option
                value=""
                className="cursor-pointer px-3 py-2 text-sm text-blue-300 hover:bg-blue-600 hover:text-white"
              >
                Todas las categorías
              </Listbox.Option>

              {CATEGORIAS.map((cat) => (
                <Listbox.Option
                  key={cat}
                  value={cat}
                  className={({ active }) =>
                    `
                    cursor-pointer px-3 py-2 flex items-center justify-between
                    text-sm
                    ${active ? "bg-blue-600 text-white" : "text-blue-300"}
                  `
                  }
                >
                  {({ selected }) => (
                    <>
                      {cat}
                      {selected && <Check size={16} />}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* 🔄 Toggle para mostrar todos */}
      <div className="flex items-center gap-3">
        <Switch
          checked={showAll}
          onChange={setShowAll}
          className={`
            relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer
            rounded-full border-2 border-transparent transition-colors duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-600/40
            ${showAll ? "bg-blue-600" : "bg-gray-700"}
          `}
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-300
              ${showAll ? "translate-x-6" : "translate-x-0"}
            `}
          />
        </Switch>

        <span className="text-gray-300 font-medium select-none">
          Mostrar todos
        </span>
      </div>
    </div>
  );
};
