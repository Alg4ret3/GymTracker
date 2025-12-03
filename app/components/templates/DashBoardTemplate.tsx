"use client";
import React from "react";

export const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      {children}
    </main>
  );
};
