"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible]     = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookiesAccepted", "all");
    setVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookiesAccepted", "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  const sans = "'Jost', sans-serif";
  const serif = "'Cormorant Garamond', Georgia, serif";

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      backgroundColor: "var(--ps-dark)",
      borderTop: "1px solid rgba(201,168,76,0.2)",
      padding: "1.5rem 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>

          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 400, color: "var(--ps-gold)", margin: "0 0 0.5rem" }}>
              Ta strona używa plików cookies
            </p>
            <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: "rgba(245,240,232,0.6)", margin: 0, lineHeight: 1.7 }}>
              Używamy cookies technicznych (niezbędnych do działania strony) oraz analitycznych
              (Google Analytics — pomaga nam rozumieć ruch na stronie). Możesz zaakceptować
              wszystkie lub tylko niezbędne.{" "}
              <Link href="/privacy" style={{ color: "var(--ps-gold)", textDecoration: "none" }}>
                Polityka prywatności
              </Link>
              {" · "}
              <button onClick={() => setShowDetails(!showDetails)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "var(--ps-gold)", fontFamily: sans, fontSize: 12, padding: 0,
              }}>
                {showDetails ? "Ukryj szczegóły ▲" : "Szczegóły ▼"}
              </button>
            </p>

            {showDetails && (
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { name: "Techniczne (niezbędne)", desc: "Sesja, preferencje języka, zgoda cookies. Bez nich strona nie działa.", required: true },
                  { name: "Analityczne — Google Analytics", desc: "Zbiera anonimowe dane o ruchu: liczba odwiedzin, źródła ruchu, czas na stronie. Dostawca: Google LLC.", required: false },
                ].map((cat, i) => (
                  <div key={i} style={{ padding: "0.75rem 1rem", backgroundColor: "rgba(245,240,232,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: "rgba(245,240,232,0.85)", letterSpacing: "0.05em" }}>
                        {cat.name}
                      </span>
                      <span style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, color: cat.required ? "var(--ps-gold)" : "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {cat.required ? "Wymagane" : "Opcjonalne"}
                      </span>
                    </div>
                    <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "rgba(245,240,232,0.45)", margin: "0.25rem 0 0", lineHeight: 1.6 }}>
                      {cat.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0, justifyContent: "center" }}>
            <button onClick={acceptAll} style={{
              fontFamily: sans, fontSize: 10, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)",
              padding: "12px 28px", border: "1px solid var(--ps-gold)",
              cursor: "pointer", whiteSpace: "nowrap",
            }}>
              Akceptuj wszystkie
            </button>
            <button onClick={acceptNecessary} style={{
              fontFamily: sans, fontSize: 10, fontWeight: 300,
              letterSpacing: "0.18em", textTransform: "uppercase",
              backgroundColor: "transparent", color: "rgba(245,240,232,0.5)",
              padding: "11px 28px", border: "1px solid rgba(245,240,232,0.15)",
              cursor: "pointer", whiteSpace: "nowrap",
            }}>
              Tylko niezbędne
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
