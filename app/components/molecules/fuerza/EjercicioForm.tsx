"use client";
import React, { useState } from "react";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { SerieInput, Serie } from "./SerieInput";

const convertirLbAKg = (lb: number) => +(lb * 0.453592).toFixed(2);

export const EjercicioForm = ({ userId }: { userId: string }) => {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState<"kg" | "lb">("kg");
  const [series, setSeries] = useState<Serie[]>([{ peso: "", repeticiones: "", numero_serie: "1" }]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddSerie = () => {
    setSeries([
      ...series,
      { peso: "", repeticiones: "", numero_serie: (series.length + 1).toString() },
    ]);
  };

  const handleRemoveSerie = (index: number) => {
    setSeries(series.filter((_, i) => i !== index));
  };

  const handleChangeSerie = (index: number, field: keyof Serie, value: string) => {
    // Validar que solo se puedan escribir números en peso y repeticiones
    if ((field === "peso" || field === "repeticiones") && value !== "" && !/^\d*\.?\d*$/.test(value)) return;

    const updated = [...series];
    updated[index][field] = value;

    // Si es la primera serie y hay más de una serie, autocompletar las demás series
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
      peso: unidad === "lb" ? convertirLbAKg(Number(s.peso)).toString() : s.peso,
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
    <div className="space-y-4 p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="font-bold text-xl">Agregar Ejercicio</h2>
      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-green-400">Ejercicio agregado correctamente!</p>}

      <Input
  name="nombreEjercicio"
  label="Nombre del ejercicio"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>


      <div className="flex gap-2 items-center">
        <span>Unidad:</span>
        <select
          className="bg-gray-800 text-white px-2 py-1 rounded"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value as "kg" | "lb")}
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>

      {series.map((s, i) => (
        <SerieInput
          key={i}
          serie={s}
          index={i}
          onChange={handleChangeSerie}
          onRemove={handleRemoveSerie}
        />
      ))}

      <div className="flex gap-2">
        <Button text="Agregar Serie" onClick={handleAddSerie} />
        <Button text="Guardar Ejercicio" onClick={handleSubmit} />
      </div>
    </div>
  );
};
