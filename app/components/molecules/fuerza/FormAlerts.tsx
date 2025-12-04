export const FormAlerts = ({
  error,
  success,
}: {
  error: string;
  success: boolean;
}) => (
  <>
    {error && (
      <p className="px-4 py-2 rounded-lg bg-red-900/30 text-red-300 border border-red-700/50">
        {error}
      </p>
    )}

    {success && (
      <p className="px-4 py-2 rounded-lg bg-green-900/30 text-green-300 border border-green-700/50">
        Ejercicio agregado correctamente
      </p>
    )}
  </>
);
