"use client";

interface CheckUserData {
  id: string;       // Id_Usuario
  usuario: string;  // Usuario
}

interface CheckUserResult {
  success: boolean; // true si ambos son únicos
  error?: string;   // mensaje de error si existe duplicado
}

/**
 * Verifica si ya existen Id_Usuario o Usuario en Google Sheets
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
      // API devuelve error con mensaje específico
      return { success: false, error: result.error || "Error al verificar Id_Usuario o Usuario" };
    }

    // API devuelve success: true si ambos son únicos
    return { success: result.success ?? false };
  } catch (error) {
    return { success: false, error: "Error de conexión" };
  }
};
