"use client";
import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  const sans = "'Jost', sans-serif";

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      backgroundColor: "var(--ps-dark)", color: "var(--ps-cream)",
      padding: "1.25rem 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "1.5rem", flexWrap: "wrap",
      borderTop: "1px solid rgba(201,168,76,0.2)",
    }}>
      <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: "rgba(245,240,232,0.7)", margin: 0, lineHeight: 1.7, maxWidth: 700 }}>
        Ta strona używa plików cookies wyłącznie w celach technicznych. 
        Korzystając ze strony, akceptujesz naszą{" "}
        <a href="/privacy" style={{ color: "var(--ps-gold)", textDecoration: "none" }}>
          Politykę prywatności
        </a>.
      </p>
      <button onClick={accept} style={{
        fontFamily: sans, fontSize: 10, fontWeight: 500,
        letterSpacing: "0.22em", textTransform: "uppercase",
        backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)",
        padding: "10px 24px", border: "1px solid var(--ps-gold)",
        cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
      }}>
        Akceptuję
      </button>
    </div>
  );
}