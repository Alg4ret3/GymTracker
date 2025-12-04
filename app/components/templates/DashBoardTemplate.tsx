"use client";
import React from "react";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
  return (
    <main
      className="min-h-screen p-8"
      style={{
        backgroundColor: "var(--color-fondo)",
        color: "var(--color-foreground)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {children}
    </main>
  );
};
