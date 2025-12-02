
"use client";
import React, { useState, useEffect } from "react";

// Tipos
interface Series { peso: string; repeticiones: string; numero_serie: string; }
interface Exercise { nombre: string; series: Series[]; }
interface Session { sessionId: string; fecha: string; exercises: Exercise[] }

export default function HomePage() {
  const defaultSeries = Array.from({ length: 4 }, (_, i) => ({
    peso: "",
    repeticiones: "",
    numero_serie: (i + 1).toString(),
  }));

  const [exercise, setExercise] = useState<Exercise>({
    nombre: "",
    series: [...defaultSeries]
  });
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<Session[]>([]);

  // Nombres de ejercicios únicos para autocompletar
  const exerciseNames = Array.from(
    new Set(history.flatMap(h => h.exercises.map(ex => ex.nombre)))
  );

  // Convertir peso a kg si es lb
  const convertToKg = (peso: string) => {
    if (!peso) return "";
    const regex = /([\d.]+)\s*(kg|lb|lbs)?/i;
    const match = peso.match(regex);
    if (!match) return peso;

    const value = parseFloat(match[1]);
    const unit = match[2]?.toLowerCase();

    if (unit === "lb" || unit === "lbs") return (value * 0.453592).toFixed(1);
    return value.toString();
  };

  // Cambios en serie o nombre
  const handleChange = (sIndex: number, field: keyof Series | "nombre", value: string) => {
    const newExercise = { ...exercise };
    if (field === "nombre") {
      newExercise.nombre = value;
      // Autocomplete: si el ejercicio ya existe, autorellenar series
      const lastExercise = history
        .flatMap(h => h.exercises)
        .reverse()
        .find(ex => ex.nombre === value);
      if (lastExercise) newExercise.series = lastExercise.series.map(s => ({ ...s }));
    } else {
      newExercise.series[sIndex][field] = value;

      // Autorrellenar series 2,3,4 si se cambia la primera serie
      if (sIndex === 0 && (field === "peso" || field === "repeticiones")) {
        for (let i = 1; i < newExercise.series.length; i++) {
          newExercise.series[i][field] = value;
        }
      }
    }
    setExercise(newExercise);
  };

  // Agregar nueva serie (copia la última)
  const addSerie = () => {
    const newExercise = { ...exercise };
    const lastSerie = newExercise.series[newExercise.series.length - 1];
    newExercise.series.push({
      peso: lastSerie.peso,
      repeticiones: lastSerie.repeticiones,
      numero_serie: (newExercise.series.length + 1).toString()
    });
    setExercise(newExercise);
  };

  // Enviar la sesión
  const handleSubmit = async () => {
    try {
      const seriesConverted = exercise.series.map(s => ({
        ...s,
        peso: convertToKg(s.peso)
      }));

      const exerciseToSave = { ...exercise, series: seriesConverted };

      const res = await fetch("/api/testSheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionData: {}, exercises: [exerciseToSave] }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage(`Sesión guardada con ID: ${data.sessionId}`);
        setHistory([{ sessionId: data.sessionId, fecha: new Date().toISOString().split("T")[0], exercises: [exerciseToSave] }, ...history]);
        setExercise({ nombre: "", series: [...defaultSeries] });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage(`Error: ${(err as any).message}`);
    }
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-white">Gym Tracker</h1>

      {/* Formulario */}
      <div className="border border-gray-700 p-4 mb-6 rounded bg-gray-900 text-white">
        <div className="flex flex-col mb-3">
          <label className="mb-1 font-semibold">Ejercicio</label>
          <input
            list="exercise-suggestions"
            type="text"
            value={exercise.nombre}
            onChange={(e) => handleChange(0, "nombre", e.target.value)}
            className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-white"
            placeholder="Nombre del ejercicio"
          />
          <datalist id="exercise-suggestions">
            {exerciseNames.map((name, index) => (
              <option key={index} value={name} />
            ))}
          </datalist>
        </div>

        {exercise.series.map((s, j) => (
          <div key={j} className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Peso (kg o lb)"
              value={s.peso}
              onChange={(e) => handleChange(j, "peso", e.target.value)}
              className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-white flex-1"
            />
            <input
              type="text"
              placeholder="Repeticiones"
              value={s.repeticiones}
              onChange={(e) => handleChange(j, "repeticiones", e.target.value)}
              className="border border-gray-600 rounded px-2 py-1 bg-gray-800 text-white flex-1"
            />
            <input
              type="text"
              placeholder="Serie #"
              value={s.numero_serie}
              readOnly
              className="border border-gray-600 rounded px-2 py-1 bg-gray-700 text-gray-300 w-20 text-center"
            />
          </div>
        ))}

        <div className="flex gap-2 mb-3 flex-wrap">
          <button
            onClick={addSerie}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Añadir Serie
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Guardar Sesión
          </button>
        </div>

        {message && <p className="mt-2 font-semibold">{message}</p>}
      </div>

      {/* Historial */}
      <h2 className="text-2xl font-bold mb-2 text-white">Historial de Sesiones</h2>
      {history.length === 0 && <p className="text-gray-300">No hay sesiones registradas.</p>}
      {history.map((h, i) => (
        <div key={i} className="border border-gray-700 p-3 mb-3 rounded bg-gray-800 text-white">
          <p className="font-semibold">ID: {h.sessionId} | Fecha: {h.fecha}</p>
          {h.exercises.map((ex, j) => (
            <div key={j} className="ml-4 mt-1">
              <p className="font-semibold">Ejercicio: {ex.nombre}</p>
              {ex.series.map((s, k) => (
                <p key={k} className="ml-4 text-gray-300">
                  Serie {s.numero_serie}: {s.peso} kg x {s.repeticiones} rep
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
