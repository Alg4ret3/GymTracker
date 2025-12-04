"use client";
import React, { useState } from "react";
import { Serie } from "./SerieInput";

import { FormAlerts } from "./FormAlerts";
import { FormNombreInput } from "./FormNombreInput";
import { FormUnidadSelector } from "./FormUnidadSelector";
import { FormSeriesList } from "./FormSeriesList";
import { FormActions } from "./FormActions";

const convertirLbAKg = (lb: number) => +(lb * 0.453592).toFixed(2);

export const EjercicioForm = ({ userId }: { userId: string }) => {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState<"kg" | "lb">("kg");
  const [series, setSeries] = useState<Serie[]>([
    { peso: "", repeticiones: "", numero_serie: "1" },
  ]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddSerie = () => {
    setSeries([
      ...series,
      {
        peso: "",
        repeticiones: "",
        numero_serie: (series.length + 1).toString(),
      },
    ]);
  };

  const handleRemoveSerie = (index: number) => {
    setSeries(series.filter((_, i) => i !== index));
  };

  const handleChangeSerie = (
    index: number,
    field: keyof Serie,
    value: string
  ) => {
    if (
      (field === "peso" || field === "repeticiones") &&
      value !== "" &&
      !/^\d*\.?\d*$/.test(value)
    )
      return;

    const updated = [...series];
    updated[index][field] = value;

    // Propagar cambios de la serie 1
    if (index === 0 && (field === "peso" || field === "repeticiones")) {
      for (let i = 1; i < updated.length; i++) {
        updated[i][field] = value;
      }
    }

    setSeries(updated);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!nombre) return setError("Ingresa el nombre del ejercicio.");
    if (series.some((s) => !s.peso || !s.repeticiones))
      return setError("Todas las series deben tener peso y repeticiones.");

    const seriesEnKg = series.map((s) => ({
      ...s,
      peso:
        unidad === "lb" ? convertirLbAKg(Number(s.peso)).toString() : s.peso,
    }));

    try {
      const res = await fetch("/api/fuerza/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, nombre, series: seriesEnKg }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Error al guardar ejercicio.");

      setSuccess(true);
      setNombre("");
      setSeries([{ peso: "", repeticiones: "", numero_serie: "1" }]);
    } catch {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-xl">

      <FormAlerts error={error} success={success} />

      <FormNombreInput nombre={nombre} setNombre={setNombre} />

      <FormUnidadSelector unidad={unidad} setUnidad={setUnidad} />

      <FormSeriesList
        series={series}
        onChange={handleChangeSerie}
        onRemove={handleRemoveSerie}
      />

      <FormActions onAdd={handleAddSerie} onSubmit={handleSubmit} />
    </div>
  );
};
