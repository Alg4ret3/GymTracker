import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GymTracker | Registro de Ejercicios y Progreso",
  description:
    "GymTracker es una aplicación para registrar tus ejercicios de fuerza y cardio, gestionar tu historial y llevar seguimiento de tu progreso.",
  keywords: [
    "GymTracker",
    "gimnasio",
    "fitness",
    "registro de ejercicios",
    "fuerza",
    "cardio",
    "historial",
    "seguimiento",
  ],
  authors: [{ name: "GymTracker App" }],
  applicationName: "GymTracker",
  robots: "index, follow",
  openGraph: {
    title: "GymTracker | Controla tus rutinas y progreso",
    description:
      "Registra tus ejercicios, guarda tu historial y lleva tu progreso del gimnasio con GymTracker.",
    url: "http://localhost:3000",
    siteName: "GymTracker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GymTracker",
    description: "Registra tus rutinas de fuerza y cardio fácilmente.",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/Favicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
