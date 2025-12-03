import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id } = req.body; // solo verificamos cédula

    if (!id) {
      return res.status(400).json({ error: "Cédula requerida" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Traemos los datos de la hoja de USUARIOS
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: `USUARIOS!A:A`, // asumimos que la columna A es ID
    });

    const rows = data.data.values || [];

    const exists = rows.some((r) => r[0] === id);

    return res.status(200).json({ exists });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
