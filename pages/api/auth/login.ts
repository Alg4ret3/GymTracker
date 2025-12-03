import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: "Usuario y contraseña requeridos." });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: `USUARIOS!A:F`,
    });

    const rows = data.data.values || [];

    const user = rows.find((r) => r[3] === usuario && r[4] === password);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    return res.status(200).json({
      success: true,
      userId: user[0],
      nombre: user[1],
      apellido: user[2],
      usuario: user[3],
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
