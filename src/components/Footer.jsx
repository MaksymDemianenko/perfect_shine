import React from "react";
import Link from "next/link";

const S = {
  root: { backgroundColor: "var(--ps-dark)", color: "var(--ps-cream)", padding: "80px 2rem 40px" },
  inner: { maxWidth: 1200, margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", marginBottom: "4rem" },
  logo: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 500, color: "var(--ps-gold)", marginBottom: 4 },
  sub: { fontFamily: "'Jost', sans-serif", fontSize: 8, fontWeight: 300, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--ps-gold-light)", opacity: 0.6, marginBottom: "1.2rem" },
  label: { fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "1.2rem", display: "block", opacity: 0.7 },
  text: { fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(245,240,232,0.55)", lineHeight: 1.8 },
  link: { fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(245,240,232,0.5)", textDecoration: "none", display: "block", marginBottom: 10, letterSpacing: "0.05em" },
  phone: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "var(--ps-gold)", textDecoration: "none", display: "block", marginBottom: "0.75rem", letterSpacing: "0.02em" },
  divider: { borderColor: "rgba(201,168,76,0.12)", borderTopWidth: 1, borderTopStyle: "solid", paddingTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center" },
  copy: { fontFamily: "'Jost', sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(245,240,232,0.3)", letterSpacing: "0.1em" },
  waBtn: { display: "inline-block", marginTop: "1rem", padding: "10px 22px", border: "1px solid rgba(201,168,76,0.35)", fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ps-gold-light)", textDecoration: "none" },
};

export default function Footer({ t }) {
  return (
    <footer style={S.root}>
      <div style={S.inner}>
        <div style={S.grid}>
          {/* Brand */}
          <div>
            <div style={S.logo}>PerfectShine ✦</div>
            <div style={S.sub}>Profesjonalne Sprzątanie</div>
            <p style={S.text}>{t?.location || "Profesjonalne sprzątanie w Krakowie i okolicach. Jakość Premium."}</p>
            <p style={{ ...S.text, marginTop: 8, fontSize: 12 }}>
              Aleksandra Fredry 6<br />
              30-605 Kraków
            </p>
            <p style={{ ...S.text, marginTop: 6, fontSize: 11 }}>NIP: 6282265846</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
              {[
                { href: "https://instagram.com/perfect_shine.krk", label: "Instagram" },
                { href: "#", label: "Facebook" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 300, letterSpacing: "0.15em", color: "rgba(201,168,76,0.6)", textDecoration: "none", textTransform: "uppercase" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <span style={S.label}>Nawigacja</span>
            {[
              { href: "/about",      label: "O nas" },
              { href: "/#services",  label: "Usługi" },
              { href: "/#prices",    label: "Cennik" },
              { href: "/#reviews",   label: "Opinie" },
              { href: "/#steps",     label: "Jak działamy" },
              { href: "/order",      label: "Zarezerwuj" },
              { href: "/calculator", label: "Kalkulator wyceny" },
              { href: "/kontakt",    label: "Kontakt" },
            ].map(item => (
              <Link key={item.href} href={item.href} style={S.link}>{item.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <span style={S.label}>Kontakt</span>
            <a href="tel:+48575199937" style={S.phone}>+48 575 199 937</a>
            <a href="mailto:perfectshine.krakow@gmail.com" style={{ ...S.link, fontSize: 11 }}>perfectshine.krakow@gmail.com</a>
            <p style={{ ...S.text, fontSize: 12 }}>📍 Kraków – dojazd do klienta</p>
            <p style={{ ...S.text, fontSize: 12, marginTop: 6 }}>⏰ Pon–Sob: 08:00 – 22:00</p>
            <a href="https://wa.me/48575199937" target="_blank" rel="noopener noreferrer" style={S.waBtn}>
              WhatsApp →
            </a>
          </div>
        </div>

        <div style={S.divider}>
          <span style={S.copy}>© 2024 PerfectShine. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ ...S.copy, textDecoration: "none" }}>Polityka prywatności</Link>
            <Link href="/terms"   style={{ ...S.copy, textDecoration: "none" }}>Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
