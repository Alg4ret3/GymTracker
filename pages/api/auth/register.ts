import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id, nombre, apellido, usuario, password, email } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Falta el campo: id (número de documento)" });
    }

    if (!nombre || !apellido || !usuario || !password || !email) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fila lista para insertar
    const row = [
      id,       // ← número de documento 
      nombre,
      apellido,
      usuario,
      password,
      email,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: `USUARIOS!A:F`,
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });

    return res.status(200).json({
      success: true,
      userId: id,
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
