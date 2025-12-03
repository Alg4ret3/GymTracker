import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id, usuario } = req.body;

    if (!id || !usuario) {
      return res.status(400).json({ error: "Id_Usuario y Usuario requeridos" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Traemos columnas necesarias (A=Id_Usuario, D=Usuario)
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: `USUARIOS!A:D`,
    });

    const rows = data.data.values || [];

    // Normalizamos valores para comparación
    const idInput = id.toString().trim();
    const usuarioInput = usuario.toString().trim().toLowerCase();

    // Validamos duplicados
    const idExists = rows.some((r) => r[0]?.toString().trim() === idInput);
    if (idExists) {
      return res.status(400).json({ error: "La cedula ya existe" });
    }

    const usuarioExists = rows.some(
      (r) => r[3]?.toString().trim().toLowerCase() === usuarioInput
    );
    if (usuarioExists) {
      return res.status(400).json({ error: "El nombre deUsuario ya existe" });
    }

    // Si no hay duplicados
    return res.status(200).json({ success: true, message: "Id y Usuario disponibles" });

  } catch (err: any) {
    console.error("Error en check-user:", err);
    return res.status(500).json({ error: err.message || "Error interno del servidor" });
  }
}
