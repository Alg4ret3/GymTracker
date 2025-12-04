"use client";

import React from "react";
import { Switch } from "@headlessui/react";

export const HistorySearchBar = ({
  search,
  setSearch,
  showAll,
  setShowAll,
}: {
  search: string;
  setSearch: (v: string) => void;
  showAll: boolean;
  setShowAll: (v: boolean) => void;
}) => {
  return (
    <div
      className="
        w-full
        flex flex-col md:flex-row
        items-start md:items-center
        gap-4 mb-6
      "
    >
      {/* Campo de búsqueda */}
      <div className="w-full">
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
      </div>

      {/* Toggle Headless UI */}
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
