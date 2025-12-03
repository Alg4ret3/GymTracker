import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { userId, nombre, all } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Falta el campo: userId" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: `EJERCICIOS_FUERZA!A:G`,
    });

    const rows = data.data.values || [];

    // Filtrar por userId
    let filtered = rows.filter((r) => r[1] === userId);

    // Filtrar por nombre si existe
    if (nombre && typeof nombre === "string") {
      filtered = filtered.filter((r) => r[2].toLowerCase().includes(nombre.toLowerCase()));
    }

    // Si no se pide "all", limitar a últimos 5 registros
    if (!all || all !== "true") {
      filtered = filtered.slice(-5);
    }

    return res.status(200).json({ ejercicios: filtered });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
