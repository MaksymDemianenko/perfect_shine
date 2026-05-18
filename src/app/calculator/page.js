"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Jost', sans-serif";

const RATES = { regular: 13, general: 15, repair: 17, rent: 15 };
const EXTRAS = {
  oven:       { label: "Piekarnik",        price: 80  },
  fridge:     { label: "Lodówka",          price: 60  },
  microwave:  { label: "Mikrofalówka",     price: 40  },
  hood:       { label: "Okap kuchenny",    price: 50  },
  dishes:     { label: "Mycie naczyń",     price: 40  },
  cabinets:   { label: "Wewnątrz szafek",  price: 80  },
  ironing:    { label: "Prasowanie",       price: 60  },
  balcony:    { label: "Balkon / taras",   price: 100 },
  upholstery: { label: "Pranie tapicerek", price: 150 },
};
const WIN_PRICE = 40;
const SPEED = { regular: 18, general: 12, repair: 10, rent: 12 };

function calcAll(area, serviceType, selectedExtras, windowCount) {
  const m2 = Math.max(35, area);
  const base = m2 <= 50 ? 450 : m2 * RATES[serviceType];
  const extTotal = selectedExtras.reduce((s, id) => s + (EXTRAS[id]?.price || 0), 0);
  const winTotal = windowCount * WIN_PRICE;
  const price = Math.round(base + extTotal + winTotal);
  const h = Math.ceil(m2 / SPEED[serviceType]) + Math.floor(selectedExtras.length * 0.4 + windowCount * 0.25);
  return { price, hours: `${h}–${h + 2} h`, base };
}

const SVC_LABELS = { regular: "Regularne", general: "Generalne", repair: "Po remoncie", rent: "Przed/Po najemcach" };
const SVC_RATES  = { regular: "13 zł/m²",  general: "15 zł/m²",  repair: "17 zł/m²",   rent: "15 zł/m²" };

const labelSt = {
  fontFamily: sans, fontSize: 9, fontWeight: 400,
  letterSpacing: "0.32em", textTransform: "uppercase",
  color: "var(--ps-brown)", opacity: 0.5, display: "block", marginBottom: 12,
};

export default function CalculatorPage() {
  const [area,          setArea]          = useState(50);
  const [serviceType,   setServiceType]   = useState("regular");
  const [windowCount,   setWindowCount]   = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const toggleExtra = (id) =>
    setSelectedExtras(p => p.includes(id) ? p.filter(e => e !== id) : [...p, id]);

  const { price, hours, base } = calcAll(area, serviceType, selectedExtras, windowCount);
  const sliderPct = ((area - 35) / 215) * 100;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--ps-cream)", fontFamily: sans, overflowX: "hidden" }}>
      <Header />

      {/* Equipment banner */}
      <div style={{ backgroundColor: "var(--ps-dark)", padding: "14px 1.5rem", textAlign: "center", marginTop: 84 }}>
        <p style={{ fontFamily: serif, fontSize: "clamp(12px,2vw,14px)", fontStyle: "italic", fontWeight: 300, color: "rgba(245,240,232,0.6)", letterSpacing: "0.1em", margin: 0 }}>
          ✦ &nbsp; Nasi wykonawcy posiadają wszystkie niezbędne środki czystości oraz sprzęt &nbsp; ✦
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 1.5rem 80px" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "0.75rem" }}>
            Bezpłatna wycena online
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1.25rem", lineHeight: 1.2 }}>
            Konfigurator <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>Wyceny</em>
          </h1>
          <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", margin: "0 auto 0.75rem" }} />
          <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6, letterSpacing: "0.06em" }}>
            Ceny od 450 zł (do 50 m²) · Minimalny metraż: 35 m²
          </p>
        </div>

        {/* Main layout: stacks on mobile */}
        <div className="two-col-layout">

          {/* ── Controls ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

            {/* 1. Service type */}
            <div>
              <span style={labelSt}>1. Wybierz rodzaj usługi</span>
              <div className="service-type-grid">
                {Object.entries(SVC_LABELS).map(([type, label]) => (
                  <button key={type} onClick={() => setServiceType(type)} style={{
                    padding: "15px 10px",
                    fontFamily: sans, fontSize: 10, fontWeight: 500,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.3s",
                    backgroundColor: serviceType === type ? "var(--ps-dark)" : "transparent",
                    color: serviceType === type ? "var(--ps-gold)" : "var(--ps-brown)",
                    border: serviceType === type ? "1px solid var(--ps-dark)" : "1px solid rgba(201,168,76,0.2)",
                  }}>
                    {label}
                    <div style={{ fontSize: 9, opacity: 0.55, marginTop: 4, fontWeight: 300 }}>{SVC_RATES[type]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Biura block */}
            <div style={{ padding: "1.25rem 1.5rem", border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "var(--ps-cream-dark)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontFamily: serif, fontSize: 16, color: "var(--ps-dark)", margin: "0 0 4px" }}>Biura i lokale komercyjne</p>
                <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6, margin: 0 }}>Wycena indywidualna dla firm</p>
              </div>
              <a href="tel:+48575199937" style={{ fontFamily: sans, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)", padding: "11px 20px", border: "1px solid var(--ps-gold)", whiteSpace: "nowrap" }}>
                Zadzwoń →
              </a>
            </div>

            {/* 2. Area */}
            <div>
              <span style={labelSt}>2. Metraż: {Math.max(35, area)} m²</span>
              <input type="range" min="35" max="250" step="5" value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                style={{
                  width: "100%", height: 2,
                  appearance: "none", WebkitAppearance: "none",
                  background: `linear-gradient(to right, var(--ps-gold) 0%, var(--ps-gold) ${sliderPct}%, rgba(201,168,76,0.2) ${sliderPct}%, rgba(201,168,76,0.2) 100%)`,
                  outline: "none", cursor: "pointer", border: "none",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                {[35, 80, 130, 180, 250].map(v => (
                  <span key={v} style={{ fontFamily: sans, fontSize: 9, color: "var(--ps-brown)", opacity: 0.35 }}>{v}</span>
                ))}
              </div>
            </div>

            {/* 3. Windows — slider 0–20 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <span style={labelSt}>3. Ilość okien</span>
                <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: "var(--ps-gold)" }}>
                  {windowCount}
                  {windowCount > 0 && (
                    <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6, marginLeft: 8 }}>
                      +{windowCount * WIN_PRICE} zł
                    </span>
                  )}
                </span>
              </div>
              <input type="range" min="0" max="20" step="1" value={windowCount}
                onChange={(e) => setWindowCount(Number(e.target.value))}
                style={{
                  width: "100%", height: 2,
                  appearance: "none", WebkitAppearance: "none",
                  background: `linear-gradient(to right, var(--ps-gold) 0%, var(--ps-gold) ${(windowCount / 20) * 100}%, rgba(201,168,76,0.2) ${(windowCount / 20) * 100}%, rgba(201,168,76,0.2) 100%)`,
                  outline: "none", cursor: "pointer", border: "none",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                {[0, 5, 10, 15, 20].map(v => (
                  <span key={v} style={{ fontFamily: sans, fontSize: 9, color: "var(--ps-brown)", opacity: 0.35 }}>{v}</span>
                ))}
              </div>
            </div>

            {/* 4. Extras */}
            <div>
              <span style={labelSt}>4. Dodatki</span>
              <div className="extras-grid">
                {Object.entries(EXTRAS).map(([id, ex]) => (
                  <button key={id} onClick={() => toggleExtra(id)} style={{
                    padding: "12px 8px",
                    fontFamily: sans, fontSize: 9, fontWeight: 400,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.2s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    backgroundColor: selectedExtras.includes(id) ? "var(--ps-gold)" : "transparent",
                    color: selectedExtras.includes(id) ? "var(--ps-cream)" : "var(--ps-brown)",
                    border: selectedExtras.includes(id) ? "1px solid var(--ps-gold)" : "1px solid rgba(201,168,76,0.2)",
                  }}>
                    <span>{ex.label}</span>
                    <span style={{ fontSize: 9, opacity: selectedExtras.includes(id) ? 0.8 : 0.4, fontWeight: 300 }}>+{ex.price} zł</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Summary ── */}
          <div className="sidebar-sticky" style={{ position: "sticky", top: "6rem", backgroundColor: "var(--ps-cream-dark)", border: "1px solid rgba(201,168,76,0.2)", padding: "2rem" }}>
            <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "1.75rem", opacity: 0.8 }}>
              Twoja wycena
            </p>

            {/* Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6 }}>Baza ({SVC_LABELS[serviceType]}):</span>
                <span style={{ fontFamily: serif, fontSize: 14, color: "var(--ps-dark)" }}>{base} zł</span>
              </div>
              {windowCount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6 }}>Okna ({windowCount}):</span>
                  <span style={{ fontFamily: serif, fontSize: 14, color: "var(--ps-dark)" }}>+{windowCount * WIN_PRICE} zł</span>
                </div>
              )}
              {selectedExtras.map(id => (
                <div key={id} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6 }}>{EXTRAS[id]?.label}:</span>
                  <span style={{ fontFamily: serif, fontSize: 14, color: "var(--ps-dark)" }}>+{EXTRAS[id]?.price} zł</span>
                </div>
              ))}
            </div>

            <div style={{ width: "100%", height: 1, background: "rgba(201,168,76,0.15)", marginBottom: "1.25rem" }} />

            <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ps-gold)", opacity: 0.7, marginBottom: "0.4rem" }}>
                Szacowany koszt:
              </p>
              <div style={{ fontFamily: serif, fontSize: 52, fontWeight: 300, color: "var(--ps-dark)", lineHeight: 1 }}>
                ~{price} <span style={{ fontSize: 22 }}>zł</span>
              </div>
              {/* Time estimate */}
              <div style={{ marginTop: "0.6rem", padding: "5px 10px", backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", display: "inline-block" }}>
                <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ps-brown)", opacity: 0.7, margin: 0 }}>
                  Przybliżony czas: <strong style={{ color: "var(--ps-dark)" }}>{hours}</strong>
                </p>
              </div>
              <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.4, marginTop: "0.6rem", lineHeight: 1.6, letterSpacing: "0.06em" }}>
                Finalna cena może ulec zmianie<br />po ocenie zabrudzeń
              </p>
            </div>

            <Link href={`/order?service=${serviceType}&area=${area}`} style={{
              display: "block", textAlign: "center",
              fontFamily: sans, fontSize: 10, fontWeight: 500,
              letterSpacing: "0.25em", textTransform: "uppercase",
              backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)",
              padding: "16px 20px", textDecoration: "none",
              border: "1px solid var(--ps-gold)",
            }}>
              Zarezerwuj teraz
            </Link>

            <a href="tel:+48575199937" style={{ display: "block", textAlign: "center", marginTop: "0.875rem", fontFamily: serif, fontSize: 14, fontWeight: 300, color: "var(--ps-brown)", textDecoration: "none", opacity: 0.5 }}>
              lub zadzwoń: +48 575 199 937
            </a>
          </div>
        </div>
      </div>

      <Footer t={{ location: "Profesjonalne sprzątanie w Krakowie i okolicach. Jakość Premium." }} />
    </main>
  );
}