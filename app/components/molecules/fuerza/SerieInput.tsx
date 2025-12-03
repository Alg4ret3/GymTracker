"use client";
import React from "react";
import { Button } from "../../atoms/Button";
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
    <div className="flex gap-2 items-end">
      <Input
        label={`Serie ${index + 1} - Peso`}
        name={`peso-${index}`}
        value={serie.peso}
        onChange={(e) => onChange(index, "peso", e.target.value)}
      />
      <Input
        label="Repeticiones"
        name={`reps-${index}`}
        value={serie.repeticiones}
        onChange={(e) => onChange(index, "repeticiones", e.target.value)}
      />
      <Button text="Eliminar" onClick={() => onRemove(index)} />
    </div>
  );
};
