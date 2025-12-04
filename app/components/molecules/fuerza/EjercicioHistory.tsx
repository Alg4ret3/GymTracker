"use client";

import React, { useEffect, useState } from "react";
import { HistoryContainer } from "./HistoryContainer";
import { HistorySearchBar } from "./HistorySearchBar";
import { HistoryList } from "./HistoryList";

export const EjercicioHistory = ({ userId }: { userId: string }) => {
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search || "");
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchHistory = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      userId,
      all: showAll ? "true" : "false",
      ...(debouncedSearch ? { nombre: debouncedSearch } : {})
    }).toString();

    const res = await fetch(`/api/fuerza/history?${query}`);
    const data = await res.json();

    setEjercicios(data.ejercicios || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [userId, debouncedSearch, showAll]);

  const sorted = [...ejercicios].sort((a, b) => {
    const nameCompare = b[2].localeCompare(a[2]);
    if (nameCompare !== 0) return nameCompare;
    return new Date(b[6]).getTime() - new Date(a[6]).getTime();
  });

  return (
    <HistoryContainer>
      <HistorySearchBar
        search={search}
        setSearch={setSearch}
        showAll={showAll}
        setShowAll={setShowAll}
      />

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <HistoryList loading={loading} ejercicios={sorted} />
      </div>
    </HistoryContainer>
  );
};
