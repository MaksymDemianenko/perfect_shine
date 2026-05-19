"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promoDismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    sessionStorage.setItem("promoDismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans  = "'Jost', sans-serif";

  return (
    <>
      {/* Overlay */}
      <div onClick={close} style={{
        position: "fixed", inset: 0, zIndex: 998,
        backgroundColor: "rgba(44,36,22,0.5)",
        backdropFilter: "blur(4px)",
      }} />

      {/* Popup */}
      <div style={{
        position: "fixed", zIndex: 999,
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(480px, 90vw)",
        backgroundColor: "var(--ps-cream)",
        border: "1px solid rgba(201,168,76,0.3)",
        padding: "3rem 2.5rem",
        textAlign: "center",
      }}>
        {/* Close */}
        <button onClick={close} style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "none", border: "none", cursor: "pointer",
          fontFamily: serif, fontSize: 22, color: "var(--ps-brown)",
          opacity: 0.4, lineHeight: 1,
        }}>×</button>

        {/* Badge */}
        <div style={{
          width: 90, height: 90, borderRadius: "50%",
          background: "radial-gradient(circle, var(--ps-gold) 0%, #A8842A 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
          boxShadow: "0 10px 40px rgba(201,168,76,0.3)",
          color: "var(--ps-cream)",
        }}>
          <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 400, lineHeight: 1 }}>-10%</div>
          <div style={{ fontFamily: sans, fontSize: 7, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4, opacity: 0.9 }}>
            pierwsze<br />sprzątanie
          </div>
        </div>

        <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "0.75rem" }}>
          Oferta specjalna
        </p>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 0.75rem", lineHeight: 1.3 }}>
          Pierwsze sprzątanie<br />
          <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>10% taniej</em>
        </h2>
        <div style={{ width: 40, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", margin: "0 auto 1.25rem" }} />
        <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: "var(--ps-brown)", lineHeight: 1.8, marginBottom: "2rem", opacity: 0.8 }}>
          Zarezerwuj pierwsze sprzątanie online<br />i otrzymaj rabat 10% od ceny usługi.
        </p>

        <Link href="/order" onClick={close} style={{
          display: "block",
          fontFamily: sans, fontSize: 10, fontWeight: 500,
          letterSpacing: "0.28em", textTransform: "uppercase",
          backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)",
          padding: "16px 24px", textDecoration: "none",
          border: "1px solid var(--ps-gold)", marginBottom: "0.875rem",
        }}>
          Zarezerwuj z rabatem →
        </Link>

        <button onClick={close} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: sans, fontSize: 10, fontWeight: 300,
          letterSpacing: "0.15em", color: "var(--ps-brown)", opacity: 0.5,
          textTransform: "uppercase",
        }}>
          Nie, dziękuję
        </button>
      </div>
    </>
  );
}