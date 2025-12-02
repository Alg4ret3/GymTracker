import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("=== Nuevo request recibido ===");

  if (req.method !== 'POST') {
    console.log("Método no permitido:", req.method);
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  try {
    const { sessionData, exercises } = req.body;
    console.log("Datos recibidos del frontend:", JSON.stringify(req.body, null, 2));

    if (!sessionData || !Array.isArray(exercises) || exercises.length === 0) {
      console.log("Error: faltan datos de sesión o ejercicios.");
      return res.status(400).json({ error: 'Faltan datos de sesión o ejercicios.' });
    }

    // 1️⃣ Autenticación
    let auth;
    try {
      auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
        scopes: SCOPES,
      });
      console.log("Autenticación con Service Account OK");
    } catch (authErr) {
      console.error("Error al autenticar:", authErr);
      throw authErr;
    }

    const sheets = google.sheets({ version: 'v4', auth });

    // 2️⃣ Crear ID de sesión y fecha
    const sessionId = `S${Date.now()}`;
    const fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    console.log("Session ID:", sessionId, "Fecha:", fecha);

    // 3️⃣ Insertar SESION
    try {
      const responseSesion = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID!,
        range: `SESION!A:B`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[sessionId, fecha]],
        },
      });
      console.log("SESION insertada:", responseSesion.data);
    } catch (sessErr) {
      console.error("Error al insertar SESION:", sessErr);
      throw sessErr;
    }

    // 4️⃣ Insertar EJERCICIOS y SERIES
    for (let i = 0; i < exercises.length; i++) {
      const exerciseId = `E${Date.now() + i}`;
      const exercise = exercises[i];
      console.log(`Insertando ejercicio ${i + 1}:`, exercise.nombre);

      try {
        const responseEx = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.SPREADSHEET_ID!,
          range: `EJERCICIO!A:B`,
          valueInputOption: 'RAW',
          requestBody: { values: [[exerciseId, exercise.nombre]] },
        });
        console.log("Ejercicio insertado:", responseEx.data);
      } catch (exErr) {
        console.error("Error al insertar ejercicio:", exErr);
        throw exErr;
      }

      for (let j = 0; j < exercise.series.length; j++) {
        const serie = exercise.series[j];
        const serieId = `SER${Date.now() + i * 10 + j}`;
        console.log(`Insertando serie ${j + 1}:`, serie);

        try {
          const responseSerie = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID!,
            range: `SERIE!A:E`,
            valueInputOption: 'RAW',
            requestBody: {
              values: [[serieId, exerciseId, serie.peso, serie.repeticiones, serie.numero_serie]],
            },
          });
          console.log("Serie insertada:", responseSerie.data);
        } catch (serieErr) {
          console.error("Error al insertar serie:", serieErr);
          throw serieErr;
        }
      }
    }

    console.log("✅ Sesión completa insertada con éxito!");
    return res.status(200).json({ success: true, sessionId });

  } catch (error: any) {
    console.error("ERROR GENERAL AL GUARDAR SESIÓN:", error.message || error);
    return res.status(500).json({ error: error.message || 'Error desconocido' });
  }
}
