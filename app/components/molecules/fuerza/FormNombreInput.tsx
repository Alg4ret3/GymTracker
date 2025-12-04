import { Input } from "../../atoms/Input";

export const FormNombreInput = ({
  nombre,
  setNombre,
}: {
  nombre: string;
  setNombre: (v: string) => void;
}) => (
  <div>
    <label className="block text-gray-300 mb-1 text-sm font-medium">
      Nombre del ejercicio
    </label>
    <Input
      name="nombreEjercicio"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className="bg-gray-800 border-gray-700 text-white"
    />
  </div>
);
