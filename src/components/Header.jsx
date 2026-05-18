"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { translations } from "@/constants/translations";

export default function Header() {
  const [lang, setLang] = useState("pl");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener("langChange", handleLangChange);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("langChange", handleLangChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("langChange", { detail: newLang }));
  };

  const t = translations[lang] || translations["pl"];

  const navLinks = [
    { href: "/#services", label: t.nav?.services  || "Usługi" },
    { href: "/#prices",   label: t.nav?.prices    || "Cennik" },
    { href: "/#reviews",  label: t.nav?.reviews   || "Opinie" },
    { href: "/#steps",    label: t.nav?.howItWorks || "Jak działamy" },
  ];

  return (
    <>
      {/* Responsive rules — <style> inside header is more reliable than
          mixing Tailwind className + inline style (inline always wins) */}
      <style>{`
        .ps-nav   { display: flex; }
        .ps-cta   { display: inline-block; }
        .ps-burger{ display: flex; }
        @media (max-width: 1023px) {
          .ps-nav { display: none !important; }
          .ps-cta { display: none !important; }
        }
        @media (min-width: 1024px) {
          .ps-burger { display: none !important; }
        }
      `}</style>

      <header style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        transition: "all 0.4s ease",
        backgroundColor: scrolled ? "rgba(245,240,232,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 1.5rem", height: 80,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
        }}>

          {/* LOGO */}
          <Link href="/" style={{ textDecoration: "none", lineHeight: 1, flexShrink: 0 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, color: "var(--ps-gold)", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
              PerfectShine<span style={{ fontSize: 14, marginLeft: 2 }}>✦</span>
            </div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 7, fontWeight: 300, color: "var(--ps-brown)", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 3, whiteSpace: "nowrap" }}>
              Profesjonalne Sprzątanie
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="ps-nav" style={{ gap: "2rem", alignItems: "center", flexShrink: 0 }}>
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} style={{
                fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 400,
                color: "var(--ps-brown)", letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none", whiteSpace: "nowrap",
              }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>

            {/* Lang switcher — always visible */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {["pl", "en", "ua"].map((l) => (
                <button key={l} onClick={() => changeLang(l)} style={{
                  fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 300,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  border: "none", background: "none", cursor: "pointer", padding: 0,
                  color: lang === l ? "var(--ps-gold)" : "var(--ps-brown)",
                  opacity: lang === l ? 1 : 0.45, transition: "all 0.3s",
                }}>
                  {l}
                </button>
              ))}
            </div>

            {/* CTA — desktop only */}
            <Link href="/order" className="ps-cta" style={{
              fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 500,
              letterSpacing: "0.24em", textTransform: "uppercase",
              color: "var(--ps-cream)", backgroundColor: "var(--ps-gold)",
              padding: "10px 22px", textDecoration: "none",
              border: "1px solid var(--ps-gold)", whiteSpace: "nowrap",
            }}>
              {t.hero?.button || "Zarezerwuj"}
            </Link>

            {/* Burger — mobile only */}
            <button className="ps-burger" onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexDirection: "column", gap: 5, flexShrink: 0 }}>
              <span style={{ display: "block", width: 22, height: 1, background: "var(--ps-gold)", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 1, background: "var(--ps-gold)", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
              <span style={{ display: "block", width: 22, height: 1, background: "var(--ps-gold)", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 40,
        backgroundColor: "var(--ps-cream)",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", gap: "1.25rem",
        transition: "opacity 0.35s, transform 0.35s",
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        pointerEvents: menuOpen ? "auto" : "none",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: "var(--ps-gold)", marginBottom: "0.25rem" }}>
          PerfectShine ✦
        </div>
        <div style={{ width: 40, height: 1, background: "var(--ps-gold)", opacity: 0.35, marginBottom: "0.25rem" }} />

        {navLinks.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 26, fontWeight: 300, fontStyle: "italic",
            color: "var(--ps-brown)", textDecoration: "none", letterSpacing: "0.05em",
          }}>
            {item.label}
          </Link>
        ))}

        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
          {["pl", "en", "ua"].map(l => (
            <button key={l} onClick={() => changeLang(l)} style={{
              fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase", border: "none", background: "none", cursor: "pointer",
              color: lang === l ? "var(--ps-gold)" : "var(--ps-brown)",
              fontWeight: lang === l ? 500 : 300,
            }}>{l}</button>
          ))}
        </div>

        <Link href="/order" onClick={() => setMenuOpen(false)} style={{
          marginTop: "0.5rem",
          fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 500,
          letterSpacing: "0.24em", textTransform: "uppercase",
          color: "var(--ps-cream)", backgroundColor: "var(--ps-gold)",
          padding: "14px 36px", textDecoration: "none",
          border: "1px solid var(--ps-gold)",
        }}>
          {t.hero?.button || "Zarezerwuj"}
        </Link>

        <a href="tel:+48575199937" style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 20, color: "var(--ps-gold)", textDecoration: "none", opacity: 0.85,
        }}>
          +48 575 199 937
        </a>
      </div>
    </>
  );
}
