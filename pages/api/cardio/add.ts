import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { userId, nombre, distancia, tiempo } = req.body;

    // 🔍 Validación detallada por campo
    if (!userId) {
      return res.status(400).json({ error: "Falta el campo: userId" });
    }
    if (!nombre) {
      return res.status(400).json({ error: "Falta el campo: nombre" });
    }
    if (!distancia) {
      return res.status(400).json({ error: "Falta el campo: distancia" });
    }
    if (!tiempo) {
      return res.status(400).json({ error: "Falta el campo: tiempo" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const fechaHoy = new Date().toISOString().split("T")[0];

    const row = [
      `C${Date.now()}`,  // Id_Cardio
      userId,
      nombre,
      distancia,
      tiempo,
      fechaHoy,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: `EJERCICIOS_CARDIO!A:F`,
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });

    return res.status(200).json({ success: true });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
