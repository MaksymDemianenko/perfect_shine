"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Steps from "@/components/Steps";
import Reviews from "@/components/Reviews";
import ContactBtn from "@/components/ContactBtn";
import Link from "next/link";
import { translations } from "@/constants/translations";

const Sparkle = ({ style }) => (
  <span style={{ color: "var(--ps-gold)", opacity: 0.45, fontSize: 12, ...style }}>✦</span>
);

export default function Home() {
  const [lang, setLang] = useState("pl");

  useEffect(() => {
    const h = (e) => setLang(e.detail);
    window.addEventListener("langChange", h);
    return () => window.removeEventListener("langChange", h);
  }, []);

  const t = translations[lang] || translations["pl"];

  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans  = "'Jost', sans-serif";
  const gold  = "var(--ps-gold)";
  const cream = "var(--ps-cream)";
  const creamDark = "var(--ps-cream-dark)";
  const dark  = "var(--ps-dark)";
  const brown = "var(--ps-brown)";

  const sectionLabel = {
    fontFamily: sans, fontSize: 10, fontWeight: 300,
    letterSpacing: "0.4em", textTransform: "uppercase",
    color: gold, marginBottom: "1rem", display: "block",
  };
  const sectionTitle = {
    fontFamily: serif, fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
    fontWeight: 300, color: dark, margin: "0 0 1.5rem", lineHeight: 1.2,
  };
  const goldRule = {
    width: 50, height: 1,
    background: "linear-gradient(90deg, transparent, var(--ps-gold), transparent)",
    margin: "0 auto",
  };
  const btnPrimary = {
    display: "inline-block",
    fontFamily: sans, fontSize: 10, fontWeight: 500,
    letterSpacing: "0.28em", textTransform: "uppercase",
    backgroundColor: gold, color: cream,
    padding: "16px 36px", textDecoration: "none",
    border: `1px solid ${gold}`, transition: "all 0.35s",
  };
  const btnOutline = {
    display: "inline-block",
    fontFamily: sans, fontSize: 10, fontWeight: 400,
    letterSpacing: "0.28em", textTransform: "uppercase",
    backgroundColor: "transparent", color: brown,
    padding: "15px 36px", textDecoration: "none",
    border: "1px solid rgba(107,91,62,0.35)", transition: "all 0.35s",
  };

  return (
    <main style={{ backgroundColor: cream, color: dark, fontFamily: sans, overflowX: "hidden" }}>
      <Header />
      <ContactBtn />

      {/* ── 1. HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", backgroundColor: cream, padding: "0 1.5rem" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "min(500px, 60vw)", height: "min(500px, 60vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: "1.5rem", border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 100, width: "100%" }}>
          {/* Text content */}
          <div style={{ maxWidth: 560 }}>
            <p style={sectionLabel}>
              <Sparkle style={{ marginRight: 8 }} />
              Kraków · Profesjonalne Sprzątanie
              <Sparkle style={{ marginLeft: 8 }} />
            </p>

            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem, 7vw, 5rem)", fontWeight: 300, color: dark, lineHeight: 1.1, marginBottom: "0.75rem" }}>
              {t.hero.title}
            </h1>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem, 7vw, 5rem)", fontWeight: 400, fontStyle: "italic", color: gold, lineHeight: 1.1, marginBottom: "1.5rem" }}>
              {t.hero.titleGold}
            </h1>

            <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: brown, letterSpacing: "0.08em", lineHeight: 1.9, marginBottom: "2.5rem", opacity: 0.85 }}>
              {t.hero.subtitle}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/order" style={btnPrimary}>{t.hero.button}</Link>
              <a href="tel:+48575199937" style={btnOutline}>+48 575 199 937</a>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {["Idealna czystość", "Zaangażowanie w detal", "Własny sprzęt"].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ color: gold, fontSize: 10 }}>✦</span>
                  <span style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: "0.15em", color: brown, textTransform: "uppercase", opacity: 0.7 }}>{b}</span>
                </div>
              ))}
            </div>

            
          </div>

          {/* Desktop promo badge */}
          <div className="hidden lg:block" style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)" }}>
            <div style={{ width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, var(--ps-gold) 0%, #A8842A 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: cream, textAlign: "center", boxShadow: "0 20px 60px rgba(201,168,76,0.3)" }}>
              <div style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, lineHeight: 1 }}>-10%</div>
              <div style={{ fontFamily: sans, fontSize: 8, fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6, opacity: 0.9 }}>na pierwsze<br />sprzątanie</div>
              <div style={{ marginTop: 6, fontSize: 10, color: "rgba(245,240,232,0.7)" }}>✦</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BANNER ── */}
      <div style={{ backgroundColor: dark, padding: "16px 1.5rem", textAlign: "center", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <p style={{ fontFamily: serif, fontSize: "clamp(12px, 2vw, 15px)", fontStyle: "italic", fontWeight: 300, color: "rgba(245,240,232,0.6)", letterSpacing: "0.1em", margin: 0 }}>
          ✦ &nbsp; {t.services.equipment} &nbsp; ✦
        </p>
      </div>

      {/* ── 3. SERVICES ── */}
      <section id="services" style={{ backgroundColor: cream, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={sectionLabel}>Co oferujemy</span>
            <h2 style={sectionTitle}>
              {t.services.title} <em style={{ color: gold, fontStyle: "italic" }}>{t.services.titleGold}</em>
            </h2>
            <div style={goldRule} />
          </div>

          <div className="services-grid">
            {[
              { id: "regular", name: t.services.items.regular, desc: t.services.items.regularDesc, num: "01" },
              { id: "general", name: t.services.items.general, desc: t.services.items.generalDesc, num: "02" },
              { id: "repair",  name: t.services.items.repair,  desc: t.services.items.repairDesc,  num: "03" },
              { id: "rent",    name: t.services.items.rent,    desc: t.services.items.rentDesc,    num: "04" },
              { id: "office",  name: t.services.items.office,  desc: t.services.items.officeDesc,  num: "05", custom: true },
            ].map((s) => (
              <div key={s.id} style={{ backgroundColor: cream, padding: "2rem 1.5rem", transition: "background-color 0.35s" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = creamDark}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = cream}>
                <div style={{ fontFamily: serif, fontSize: 11, color: gold, opacity: 0.4, marginBottom: "1.25rem", letterSpacing: "0.1em" }}>{s.num}</div>
                <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, color: dark, marginBottom: "0.6rem", lineHeight: 1.3 }}>{s.name}</h3>
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: brown, lineHeight: 1.8, marginBottom: "1.25rem", opacity: 0.75 }}>{s.desc}</p>
                <Link href={s.custom ? "tel:+48575199937" : `/order?service=${s.id}`}
                  style={{ fontFamily: sans, fontSize: 9, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: gold, textDecoration: "none" }}>
                  {s.custom ? t.pricing.individual : t.hero.button + " →"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY US ── */}
      <section style={{ backgroundColor: creamDark, padding: "80px 1.5rem" }}>
        <div className="why-grid">
          <div>
            <span style={sectionLabel}>Nasz standard</span>
            <h2 style={{ ...sectionTitle, textAlign: "left", margin: "0 0 2rem" }}>
              {t.benefits?.title || "Dlaczego"}{" "}
              <em style={{ color: gold, fontStyle: "italic" }}>{t.benefits?.titleGold || "My?"}</em>
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[t.benefits?.item1, t.benefits?.item2, t.benefits?.item3].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ color: gold, fontSize: 11, marginTop: 4, flexShrink: 0 }}>✦</span>
                  <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: brown, lineHeight: 1.75 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats — always 2 columns */}
          <div className="stats-grid">
            {[
              { num: "200+",   label: "Zadowolonych klientów" },
              { num: "5.0★",   label: "Ocena Google" },
              { num: "3 lata", label: "Doświadczenia" },
              { num: "30 min", label: "Czas odpowiedzi" },
            ].map((s, i) => (
              <div key={i} className="stat-cell" style={{ backgroundColor: cream, padding: "2rem 1.25rem", textAlign: "center" }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 300, color: gold, marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, color: brown, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.65 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STEPS ── */}
      <Steps t={t.steps} />

      {/* ── 6. GALLERY ── */}
      <section style={{ backgroundColor: creamDark, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={sectionLabel}>Nasze realizacje</span>
            <h2 style={sectionTitle}>{t.footer.beforeAfter}</h2>
            <div style={goldRule} />
          </div>

          <div className="gallery-grid">
            {["images/przed1.jpg", "images/po1.jpg"].map((src, i) => (
              <div key={i} style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", backgroundColor: cream, border: "1px solid rgba(201,168,76,0.15)" }}>
                <img src={`/${src}`} alt={i === 0 ? "Przed sprzątaniem" : "Po sprzątaniu"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--ps-gold);opacity:0.4"><span style="font-size:2.5rem">${i === 0 ? "🏠" : "✨"}</span><span style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-family:'Jost',sans-serif;font-weight:300">${i === 0 ? "Przed sprzątaniem" : "Po sprzątaniu"}</span></div>`;
                  }}
                />
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem", backgroundColor: "rgba(245,240,232,0.92)", padding: "6px 14px" }}>
                  <span style={{ fontFamily: serif, fontSize: 13, fontStyle: "italic", color: dark, letterSpacing: "0.05em" }}>
                    {i === 0 ? "Przed" : "Po"} sprzątaniu
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. REVIEWS ── */}
      <Reviews t={t.reviews} />

      {/* ── 8. PRICES CTA ── */}
      <section id="prices" style={{ backgroundColor: dark, padding: "80px 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(600px, 80vw)", height: "min(600px, 80vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <span style={{ ...sectionLabel, color: "rgba(201,168,76,0.6)" }}>Transparentna wycena</span>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 300, color: "rgba(245,240,232,0.9)", margin: "0 0 1rem", lineHeight: 1.2 }}>
            {t.pricing.title} <em style={{ color: gold, fontStyle: "italic" }}>{t.pricing.titleGold}</em>
          </h2>
          <div style={{ ...goldRule, margin: "0 auto 1.5rem" }} />
          <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "rgba(245,240,232,0.45)", lineHeight: 1.8, marginBottom: "2.5rem", letterSpacing: "0.05em" }}>
            {t.pricing.startFrom}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/order" style={{ ...btnPrimary }}>
              {t.hero.button}
            </Link>
            <Link href="/calculator" style={{ ...btnOutline, color: "rgba(201,168,76,0.7)", borderColor: "rgba(201,168,76,0.3)" }}>
              {t.pricing.calculate}
            </Link>
          </div>
        </div>
      </section>

      <Footer t={t.footer} />
    </main>
  );
}