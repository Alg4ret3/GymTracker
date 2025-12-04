"use client";

import { Plus, Save } from "lucide-react";
import { Button } from "../../atoms/Button";

export const FormActions = ({
  onAdd,
  onSubmit,
}: {
  onAdd: () => void;
  onSubmit: () => void;
}) => (
  <div className="flex flex-col md:flex-row gap-4 w-full pt-3">
    {/* Botón Agregar Serie */}
    <Button
      onClick={onAdd}
      className="
        w-full md:w-auto
        bg-gray-800 text-white
        border border-gray-700/60
        px-4 py-2 rounded-xl
        hover:bg-gray-700
        active:scale-95
        transition-all
        shadow-sm shadow-gray-900/20
        focus:outline-none focus:ring-2 focus:ring-blue-500/40
      "
    >
      <Plus size={16} />
      Agregar Serie
    </Button>

    {/* Botón Guardar */}
    <Button
      onClick={onSubmit}
      className="
        w-full md:w-auto
        bg-blue-600 text-white
        border border-blue-700/40
        px-4 py-2 rounded-xl
        hover:bg-blue-500
        active:scale-95
        transition-all
        shadow-md shadow-blue-600/30
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
      "
    >
      <Save size={16} />
      Guardar
    </Button>
  </div>
);
