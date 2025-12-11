import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { userId, nombre, series, categoria } = req.body; 
    // VALIDACIONES DETALLADAS
    if (!userId) {
      return res.status(400).json({ error: "Falta el campo: userId" });
    }

    if (!nombre) {
      return res.status(400).json({ error: "Falta el campo: nombre" });
    }

    if (!categoria) {
      return res.status(400).json({ error: "Falta el campo: categoria" });
    }

    if (!series) {
      return res.status(400).json({ error: "Falta el campo: series" });
    }

    if (!Array.isArray(series) || series.length === 0) {
      return res.status(400).json({
        error: "El campo series debe ser un array con al menos 1 elemento",
      });
    }

    // VALIDAR CAMPOS DENTRO DE CADA SERIE
    for (let i = 0; i < series.length; i++) {
      const s = series[i];

      if (!s.peso) {
        return res
          .status(400)
          .json({ error: `Falta el campo: peso en series[${i}]` });
      }
      if (!s.repeticiones) {
        return res
          .status(400)
          .json({ error: `Falta el campo: repeticiones en series[${i}]` });
      }
      if (!s.numero_serie) {
        return res
          .status(400)
          .json({ error: `Falta el campo: numero_serie en series[${i}]` });
      }
    }

    // ========= GOOGLE AUTH =========
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    // FECHA COMPLETA FORMATO COLOMBIA
    const fechaHoy = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
    });

    // FORMATO DE FILAS PARA GUARDAR EN GOOGLE SHEETS
    const rows = series.map((s: any) => [
      `F${Date.now()}`,
      userId,
      nombre,
      s.peso,
      s.repeticiones,
      s.numero_serie,
      fechaHoy,
      categoria, 
    ]);

    // INSERTAR EN GOOGLE SHEETS
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: `EJERCICIOS_FUERZA!A:H`,
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
