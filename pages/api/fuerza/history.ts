import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// Normaliza: minúsculas + elimina acentos
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// BÚSQUEDA INTELIGENTE (permite errores de tipeo)
function smartIncludes(source: string, search: string) {
  const a = normalize(source);
  const b = normalize(search);

  if (!b.trim()) return true;

  // Coincidencia parcial normal
  if (a.includes(b)) return true;

  // Coincidencia por distancia (errores de 1 letra)
  let mismatches = 0;
  let i = 0, j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] !== b[j]) {
      mismatches++;
      if (mismatches > 2) return false; // tolera hasta 2 errores
      j++; // avanza en search
    } else {
      i++;
      j++;
    }
  }

  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { userId, nombre, categoria, all } = req.query;

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
      range: `EJERCICIOS_FUERZA!A:H`,
    });

    const rows = data.data.values || [];

    // Filtrar por userId
    let filtered = rows.filter((r) => r[1] === userId);

    // Filtrar por nombre con búsqueda inteligente
    if (nombre && typeof nombre === "string") {
      filtered = filtered.filter((r) =>
        smartIncludes(r[2] || "", nombre)
      );
    }

    // Filtrar por categoría con búsqueda inteligente
    if (categoria && typeof categoria === "string") {
      filtered = filtered.filter((r) =>
        smartIncludes(r[7] || "", categoria)
      );
    }

    // -----------------------------
    // ✅ NUEVA LÓGICA DEL LÍMITE
    // -----------------------------

    const hasFilters = Boolean(nombre || categoria);

    // Si NO hay filtros y NO se pide all=true → devolver solo 5
    if (!hasFilters && (!all || all !== "true")) {
      filtered = filtered.slice(-5);
    }

    return res.status(200).json({ ejercicios: filtered });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
