import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kontakt – PerfectShine",
  description: "Skontaktuj się z PerfectShine. Profesjonalne sprzątanie w Krakowie. Tel: +48 575 199 937.",
};

export default function KontaktPage() {
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "'Jost', sans-serif";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--ps-cream)" }}>
      <Header />

      <section style={{ padding: "140px 2rem 100px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "1rem" }}>
              Jesteśmy do dyspozycji
            </p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1.5rem" }}>
              Kontakt <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>z nami</em>
            </h1>
            <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", margin: "0 auto" }} />
          </div>

          {/* Contact cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5px", backgroundColor: "rgba(201,168,76,0.15)", marginBottom: "4rem" }}>
            {[
              {
                icon: "📞",
                title: "Telefon",
                value: "+48 575 199 937",
                link: "tel:+48575199937",
                desc: "Pon–Sob: 08:00 – 22:00",
              },
              {
                icon: "✉️",
                title: "Email",
                value: "perfectshine.krakow@gmail.com",
                link: "mailto:perfectshine.krakow@gmail.com",
                desc: "Odpowiadamy w ciągu 2 godzin",
              },
              {
                icon: "💬",
                title: "WhatsApp",
                value: "+48 575 199 937",
                link: "https://wa.me/48575199937",
                desc: "Najszybszy kontakt",
              },
              {
                icon: "📍",
                title: "Obszar działania",
                value: "Kraków i okolice",
                link: null,
                desc: "Dojazd do klienta",
              },
            ].map((c, i) => (
              <div key={i} style={{ backgroundColor: "var(--ps-cream)", padding: "2.5rem 2rem", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: "1rem" }}>{c.icon}</div>
                <div style={{ fontFamily: sans, fontSize: 9, fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ps-gold)", opacity: 0.7, marginBottom: "0.75rem" }}>
                  {c.title}
                </div>
                {c.link ? (
                  <a href={c.link} target={c.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ fontFamily: serif, fontSize: 16, fontWeight: 400, color: "var(--ps-dark)", textDecoration: "none", display: "block", marginBottom: "0.5rem" }}>
                    {c.value}
                  </a>
                ) : (
                  <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 400, color: "var(--ps-dark)", marginBottom: "0.5rem" }}>{c.value}</div>
                )}
                <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.55, letterSpacing: "0.05em" }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Hours */}
          <div style={{ backgroundColor: "var(--ps-cream-dark)", border: "1px solid rgba(201,168,76,0.2)", padding: "3rem", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ps-gold)", opacity: 0.7, marginBottom: "1.5rem" }}>
              Godziny pracy
            </p>
            {[
              { day: "Poniedziałek – Sobota", hours: "08:00 – 22:00" },
              { day: "Niedziela", hours: "Na zapytanie" },
            ].map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: i === 0 ? "1px solid rgba(201,168,76,0.15)" : "none" }}>
                <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.8 }}>{h.day}</span>
                <span style={{ fontFamily: serif, fontSize: 15, color: "var(--ps-gold)" }}>{h.hours}</span>
              </div>
            ))}
            <div style={{ marginTop: "2rem" }}>
              <a href="tel:+48575199937" style={{ fontFamily: sans, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)", padding: "14px 32px", textDecoration: "none", border: "1px solid var(--ps-gold)", display: "inline-block" }}>
                Zadzwoń teraz
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer t={{ location: "Profesjonalne sprzątanie w Krakowie i okolicach. Jakość Premium." }} />
    </main>
  );
}