"use client";

import { useEffect, useState } from "react";

export function CurrentDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setDate(`Today, ${formattedDate}`);
  }, []);

  if (!date) return <span>Loading date...</span>;

  return <span>{date}</span>;
}