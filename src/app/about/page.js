import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "O Nas – PerfectShine",
  description: "Poznaj zespół PerfectShine – profesjonalne sprzątanie w Krakowie z efektem WOW.",
};

export default function AboutPage() {
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "'Jost', sans-serif";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--ps-cream)" }}>
      <Header />

      {/* Hero */}
      <section style={{ padding: "140px 2rem 80px", textAlign: "center", backgroundColor: "var(--ps-cream)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "1rem" }}>
            Kim jesteśmy
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1.5rem", lineHeight: 1.2 }}>
            O <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>Nas</em>
          </h1>
          <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", margin: "0 auto 2rem" }} />
          <p style={{ fontFamily: sans, fontSize: 15, fontWeight: 300, color: "var(--ps-brown)", lineHeight: 1.9, opacity: 0.85 }}>
            PerfectShine to profesjonalna firma sprzątająca działająca w Krakowie i okolicach. 
            Naszą misją jest przywracanie blasku każdemu wnętrzu — z dbałością o każdy detal 
            i szacunkiem dla Twojej przestrzeni.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: "var(--ps-cream-dark)", padding: "80px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1rem" }}>
              Nasze <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>Wartości</em>
            </h2>
            <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", margin: "0 auto" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5px", backgroundColor: "rgba(201,168,76,0.15)" }}>
            {[
              { num: "01", title: "Perfekcja w każdym detalu", desc: "Nie pomijamy żadnego kąta. Każda powierzchnia, każdy zakamarek — sprzątamy dokładnie tak, jakbyśmy sprzątali własny dom." },
              { num: "02", title: "Zaufanie i dyskrecja", desc: "Wchodzimy do Twojego domu — traktujemy to z pełną odpowiedzialnością. Nasi pracownicy są sprawdzeni i rzetelni." },
              { num: "03", title: "Własny sprzęt i środki", desc: "Przywozimy wszystko ze sobą. Profesjonalne urządzenia i certyfikowane środki czystości — bez dopłat." },
              { num: "04", title: "Gwarancja jakości", desc: "Jeśli coś nie spełnia Twoich oczekiwań — wracamy i poprawiamy bezpłatnie. Twoja satysfakcja to nasz priorytet." },
            ].map((v, i) => (
              <div key={i} style={{ backgroundColor: "var(--ps-cream)", padding: "2.5rem 2rem" }}>
                <div style={{ fontFamily: serif, fontSize: 11, color: "var(--ps-gold)", opacity: 0.4, marginBottom: "1rem", letterSpacing: "0.1em" }}>{v.num}</div>
                <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, color: "var(--ps-dark)", marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "var(--ps-brown)", lineHeight: 1.8, opacity: 0.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "var(--ps-cream)", padding: "80px 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5px", backgroundColor: "rgba(201,168,76,0.15)" }}>
            {[
              { num: "200+", label: "Zadowolonych klientów" },
              { num: "5.0★", label: "Ocena Google" },
              { num: "3 lata", label: "Doświadczenia w Krakowie" },
              { num: "30 min", label: "Czas odpowiedzi na zapytanie" },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: "var(--ps-cream-dark)", padding: "2.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 300, color: "var(--ps-gold)", marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, color: "var(--ps-brown)", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.65 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--ps-dark)", padding: "80px 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, color: "rgba(245,240,232,0.9)", margin: "0 0 1rem" }}>
            Gotowy na efekt <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>WOW?</em>
          </h2>
          <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "rgba(245,240,232,0.45)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Skontaktuj się z nami — odpowiemy w ciągu 30 minut.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/order" style={{ fontFamily: sans, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)", padding: "16px 36px", textDecoration: "none", border: "1px solid var(--ps-gold)" }}>
              Zarezerwuj termin
            </Link>
            <a href="tel:+48575199937" style={{ fontFamily: sans, fontSize: 10, fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "transparent", color: "rgba(201,168,76,0.7)", padding: "15px 36px", textDecoration: "none", border: "1px solid rgba(201,168,76,0.3)" }}>
              +48 575 199 937
            </a>
          </div>
        </div>
      </section>

      <Footer t={{ location: "Profesjonalne sprzątanie w Krakowie i okolicach. Jakość Premium." }} />
    </main>
  );
}