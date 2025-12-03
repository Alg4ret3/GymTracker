"use client";

import React, { useEffect, useState } from "react";

export const EjercicioHistory = ({ userId }: { userId: string }) => {
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  // Debounce para búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search || "");
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchHistory = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      userId: userId || "",
      all: showAll ? "true" : "false",
      ...(debouncedSearch ? { nombre: debouncedSearch } : {}),
    }).toString();

    const res = await fetch(`/api/fuerza/history?${query}`);
    const data = await res.json();
    setEjercicios(data.ejercicios || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [userId || "", debouncedSearch || "", showAll]);

  // Ordenar primero por nombre (Z → A), luego por fecha descendente
  const sortedEjercicios = [...ejercicios].sort((a, b) => {
    const nameCompare = b[2].localeCompare(a[2], undefined, { sensitivity: "base" });
    if (nameCompare !== 0) return nameCompare;

    const dateA = new Date(a[6]);
    const dateB = new Date(b[6]);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="h-[80vh] max-h-[80vh] bg-gray-900 p-6 rounded-xl shadow-lg overflow-hidden">
      {/* Contenedor scrollable */}
      <div className="flex flex-col h-full">
        {/* Barra de búsqueda y toggle */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <label className="flex items-center gap-2 mt-2 md:mt-0">
            <input
              type="checkbox"
              checked={showAll}
              onChange={() => setShowAll(!showAll)}
              className="w-5 h-5 text-blue-500 accent-blue-500"
            />
            <span className="text-white select-none">Mostrar todos</span>
          </label>
        </div>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {/* Loader */}
          {loading && (
            <div className="text-white text-center py-4">Cargando historial...</div>
          )}

          {/* No hay resultados */}
          {!loading && sortedEjercicios.length === 0 && (
            <div className="text-center text-gray-400 py-6">
              <p>No se encontraron ejercicios.</p>
            </div>
          )}

          {/* Lista de ejercicios */}
          {!loading &&
            sortedEjercicios.map((ej, i) => (
              <div
                key={`${ej[0]}-${i}`}
                className="p-4 bg-gray-800 text-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg mb-2">{ej[2]}</h3>
                <p className="text-gray-300 mb-2">Fecha: {ej[6]}</p>
                <ul className="space-y-1">
                  <li>
                    Peso: <span className="font-semibold">{ej[3]} Kg</span>
                  </li>
                  <li>
                    Repeticiones: <span className="font-semibold">{ej[4]} Rep </span>
                  </li>
                  <li>
                    Número de serie: <span className="font-semibold">{ej[5]}</span>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
