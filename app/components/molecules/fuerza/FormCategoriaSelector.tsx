"use client";

import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

export const FormCategoriaSelector = ({
  categoria,
  setCategoria,
}: {
  categoria: string;
  setCategoria: (v: string) => void;
}) => {
  const opciones = [
    { value: "Pecho", label: "Pecho" },
    { value: "Triceps", label: "Tríceps" },
    { value: "Espalda", label: "Espalda" },
    { value: "Biceps", label: "Bíceps" },
    { value: "Hombro y Trapecio", label: "Hombro y Trapecio" },
    { value: "Pierna", label: "Pierna" },
    { value: "Funcional", label: "Funcional" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
      <label className="text-gray-300 text-sm font-medium">
        Categoría
      </label>

      <Listbox value={categoria} onChange={setCategoria}>
        <div className="relative w-full max-w-xs">
          {/* Botón */}
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
            {opciones.find((o) => o.value === categoria)?.label || "Seleccionar..."}
            <ChevronDown size={18} className="text-blue-400" />
          </Listbox.Button>

          {/* Lista de opciones */}
          <Listbox.Options
            className="
              absolute mt-1 w-full bg-gray-900 border border-gray-700
              rounded-lg shadow-lg overflow-hidden z-30
            "
          >
            {opciones.map((op) => (
              <Listbox.Option
                key={op.value}
                value={op.value}
                className={({ active }) =>
                  `
                  cursor-pointer px-3 py-2 flex items-center justify-between
                  text-sm
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-blue-300"
                  }
                `
                }
              >
                {({ selected }) => (
                  <>
                    {op.label}
                    {selected && <Check size={16} />}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
