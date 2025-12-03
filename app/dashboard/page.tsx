"use client";

import React from "react";
import { DashboardFuerza } from "../components/organisms/fuerza/DashboardFuerza";

export default function DashboardPage() {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";

  return <DashboardFuerza userId={userId} />;
}
