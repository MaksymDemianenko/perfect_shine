import React from "react";

export default function Steps({ t }) {
  if (!t) return null;

  const steps = [
    { id: "01", title: t.step1, desc: t.desc1, icon: "✦" },
    { id: "02", title: t.step2, desc: t.desc2, icon: "◇" },
    { id: "03", title: t.step3, desc: t.desc3, icon: "✦" },
  ];

  return (
    <section id="steps" style={{ backgroundColor: "var(--ps-cream-dark)", padding: "120px 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "1rem" }}>
            Nasz proces
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1.5rem", lineHeight: 1.2 }}>
            {t.title} <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>{t.titleGold}</em>
          </h2>
          <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, transparent, var(--ps-gold), transparent)", margin: "0 auto" }} />
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "3rem", position: "relative" }}>
          {steps.map((step, i) => (
            <div key={step.id} style={{ textAlign: "center", position: "relative" }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block" style={{ position: "absolute", top: 28, left: "calc(50% + 40px)", right: "calc(-50% + 40px)", height: 1, background: "linear-gradient(90deg, var(--ps-gold), transparent)", opacity: 0.25 }} />
              )}

              {/* Number circle */}
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
                backgroundColor: "var(--ps-cream)",
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, color: "var(--ps-gold)", letterSpacing: "0.05em" }}>
                  {step.id}
                </span>
              </div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, color: "var(--ps-dark)", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 300, color: "var(--ps-brown)", lineHeight: 1.75, maxWidth: 220, margin: "0 auto", opacity: 0.8 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
