import { Serie, SerieInput } from "./SerieInput";

export const FormSeriesList = ({
  series,
  onChange,
  onRemove,
}: {
  series: Serie[];
  onChange: (i: number, field: keyof Serie, v: string) => void;
  onRemove: (i: number) => void;
}) => (
  <div className="space-y-4">
    {series.map((s, i) => (
      <div
        key={i}
        className="p-4 rounded-xl bg-gray-800/60 border border-gray-700 shadow-inner hover:border-blue-500/40 transition-all duration-200"
      >
        <SerieInput serie={s} index={i} onChange={onChange} onRemove={onRemove} />
      </div>
    ))}
  </div>
);
