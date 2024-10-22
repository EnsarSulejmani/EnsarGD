"use client";
import { useRef, useEffect } from "react";
export default function Week4() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!mountRef.current) return;
  });
  return <div></div>;
}
