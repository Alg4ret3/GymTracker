"use client";

interface CheckUserData {
  id: string; // solo cédula
}

interface CheckUserResult {
  exists: boolean;
  error?: string;
}

/**
 * Función que verifica si ya existe una cédula en la base de datos (Google Sheets)
 * @param data { id }
 * @returns { exists: boolean, error?: string }
 */
export const checkUser = async (data: CheckUserData): Promise<CheckUserResult> => {
  try {
    const res = await fetch("/api/auth/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { exists: false, error: result.error || "Error al verificar cédula" };
    }

    return { exists: result.exists };
  } catch (error) {
    return { exists: false, error: "Error de conexión" };
  }
};
