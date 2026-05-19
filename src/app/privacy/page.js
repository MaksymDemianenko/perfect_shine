import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Polityka prywatności – PerfectShine",
  description: "Polityka prywatności i cookies firmy PerfectShine.",
};

export default function PrivacyPage() {
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans  = "'Jost', sans-serif";

  const sections = [
    {
      title: "1. Administrator danych",
      text: `Administratorem Twoich danych osobowych jest:\n\nPerfectShine\nAleksandra Fredry 6, 30-605 Kraków\nNIP: 6282265846\nE-mail: perfectshine.krakow@gmail.com\nTel.: +48 575 199 937`,
    },
    {
      title: "2. Jakie dane zbieramy",
      text: `Zbieramy dane podane przez Ciebie w formularzu zamówienia: imię i nazwisko, numer telefonu, adres e-mail (opcjonalnie), adres wykonania usługi. Dane te są niezbędne do realizacji zamówienia.`,
    },
    {
      title: "3. Cel przetwarzania danych",
      text: `Twoje dane przetwarzamy w celu: realizacji zamówionej usługi sprzątania, kontaktu w sprawie potwierdzenia terminu, wystawienia dokumentów księgowych (jeśli wymagane).`,
    },
    {
      title: "4. Podstawa prawna",
      text: `Przetwarzanie danych odbywa się na podstawie art. 6 ust. 1 lit. b RODO – jest niezbędne do wykonania umowy, której stroną jest osoba, której dane dotyczą.`,
    },
    {
      title: "5. Czas przechowywania danych",
      text: `Dane przechowujemy przez okres niezbędny do realizacji usługi oraz przez wymagany przepisami prawa okres przechowywania dokumentacji (do 5 lat).`,
    },
    {
      title: "6. Udostępnianie danych",
      text: `Nie sprzedajemy ani nie udostępniamy Twoich danych osobowych podmiotom trzecim w celach marketingowych. Dane mogą być przekazywane wyłącznie podmiotom współpracującym przy realizacji usługi.`,
    },
    {
      title: "7. Twoje prawa",
      text: `Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu. Aby skorzystać z tych praw, skontaktuj się z nami: perfectshine.krakow@gmail.com.`,
    },
    {
      title: "8. Polityka cookies",
      text: `Nasza strona używa następujących plików cookies:\n\n▸ Techniczne (niezbędne) — sesja użytkownika, preferencje języka, zgoda na cookies. Bez nich strona nie działa prawidłowo. Podstawa: uzasadniony interes administratora.\n\n▸ Analityczne — Google Analytics (dostawca: Google LLC, USA). Zbiera anonimowe dane o ruchu na stronie: liczba odwiedzin, źródła ruchu, czas spędzony na stronie. Dane są anonimizowane przed wysłaniem do Google. Podstawa: zgoda użytkownika.\n\nMożesz zarządzać cookies przez baner na dole strony lub ustawienia przeglądarki. Wycofanie zgody nie wpływa na wcześniejsze przetwarzanie.`,
    },
    {
      title: "9. Przekazywanie danych poza EOG",
      text: `Korzystamy z Google Analytics (Google LLC, USA). Google jest certyfikowany w ramach EU-US Data Privacy Framework, co zapewnia odpowiedni poziom ochrony danych zgodnie z RODO.`,
    },
    {
      title: "10. Kontakt",
      text: `W sprawach związanych z ochroną danych osobowych możesz kontaktować się z nami:\nE-mail: perfectshine.krakow@gmail.com\nTel.: +48 575 199 937\nAdres: Aleksandra Fredry 6, 30-605 Kraków`,
    },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--ps-cream)" }}>
      <Header />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "140px 2rem 100px" }}>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "var(--ps-dark)", marginBottom: "0.5rem" }}>
          Polityka <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>Prywatności i Cookies</em>
        </h1>
        <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", marginBottom: "3rem" }} />

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, color: "var(--ps-dark)", marginBottom: "0.75rem" }}>{s.title}</h2>
            <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "var(--ps-brown)", lineHeight: 1.9, margin: 0, opacity: 0.85, whiteSpace: "pre-line" }}>
              {s.text}
            </p>
          </div>
        ))}

        <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.5, marginTop: "3rem" }}>
          Ostatnia aktualizacja: maj 2024
        </p>
      </div>
      <Footer t={{ location: "Profesjonalne sprzątanie w Krakowie i okolicach. Jakość Premium." }} />
    </main>
  );
}