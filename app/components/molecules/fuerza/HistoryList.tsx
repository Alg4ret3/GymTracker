"use client";
import React from "react";
import { HistoryItem } from "./HistoryItem";

export const HistoryList = ({
  loading,
  ejercicios
}: {
  loading: boolean;
  ejercicios: any[];
}) => {
  if (loading)
    return (
      <div className="text-gray-300 text-center py-4">
        Cargando historial...
      </div>
    );

  if (!loading && ejercicios.length === 0)
    return (
      <div className="text-center text-gray-600 py-6">
        No se encontraron ejercicios.
      </div>
    );

  return (
    <div className="space-y-4">
      {ejercicios.map((ej, i) => (
        <HistoryItem key={`${ej[0]}-${i}`} ej={ej} />
      ))}
    </div>
  );
};
