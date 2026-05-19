import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Regulamin – PerfectShine",
  description: "Regulamin świadczenia usług sprzątania przez firmę PerfectShine w Krakowie.",
};

export default function TermsPage() {
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans  = "'Jost', sans-serif";

  const sections = [
    {
      title: "1. Postanowienia ogólne",
      text: `Niniejszy regulamin określa zasady świadczenia usług sprzątania przez:\n\nPerfectShine\nAleksandra Fredry 6, 30-605 Kraków\nNIP: 6282265846\nE-mail: perfectshine.krakow@gmail.com\nTel.: +48 575 199 937\n\nZłożenie zamówienia jest równoznaczne z akceptacją niniejszego regulaminu.`,
    },
    {
      title: "2. Zakres usług",
      text: `PerfectShine świadczy usługi sprzątania mieszkań, domów, biur i lokali komercyjnych na terenie Krakowa i okolic. Szczegółowy zakres każdej usługi ustalany jest indywidualnie przed jej wykonaniem.`,
    },
    {
      title: "3. Rezerwacja i potwierdzenie",
      text: `Zamówienie można złożyć przez formularz na stronie internetowej lub telefonicznie. Po złożeniu zamówienia skontaktujemy się z Klientem w ciągu 30 minut w celu potwierdzenia terminu i szczegółów usługi.`,
    },
    {
      title: "4. Ceny i płatności",
      text: `Ceny podane na stronie są cenami orientacyjnymi. Ostateczna cena ustalana jest po ocenie zakresu prac. Minimalna wartość zlecenia wynosi 450 zł. Płatność gotówką lub kartą bezpośrednio u pracownika po wykonaniu usługi. Nie wymagamy przedpłaty.`,
    },
    {
      title: "5. Prawo odstąpienia od umowy",
      text: `Zgodnie z art. 38 pkt 1 ustawy z dnia 30 maja 2014 r. o prawach konsumenta, prawo odstąpienia od umowy zawartej na odległość nie przysługuje konsumentowi w odniesieniu do umów o świadczenie usług, jeżeli przedsiębiorca wykonał w pełni usługę za wyraźną zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po jego spełnieniu utraci prawo odstąpienia od umowy.\n\nSkładając zamówienie i potwierdzając termin usługi przed upływem 14 dni, Klient wyraża zgodę na wykonanie usługi przed upływem terminu do odstąpienia od umowy i przyjmuje do wiadomości, że z chwilą pełnego wykonania usługi utraci prawo do odstąpienia od umowy.\n\nJeżeli usługa nie zostanie wykonana przed upływem 14 dni, Klientowi przysługuje prawo odstąpienia od umowy bez podania przyczyny w terminie 14 dni od dnia zawarcia umowy, poprzez złożenie oświadczenia na adres: perfectshine.krakow@gmail.com.`,
    },
    {
      title: "6. Odwołanie rezerwacji",
      text: `Klient ma prawo odwołać rezerwację najpóźniej 24 godziny przed planowanym terminem usługi. Odwołanie w krótszym terminie może skutkować naliczeniem opłaty manipulacyjnej w wysokości 50 zł.`,
    },
    {
      title: "7. Reklamacje i gwarancja jakości",
      text: `Jeśli Klient nie jest zadowolony z jakości wykonanej usługi, zobowiązujemy się do bezpłatnego powtórzenia usługi lub zwrotu części wynagrodzenia. Reklamację należy zgłosić w ciągu 24 godzin od wykonania usługi na adres: perfectshine.krakow@gmail.com lub telefonicznie: +48 575 199 937. Reklamacja zostanie rozpatrzona w ciągu 14 dni roboczych.`,
    },
    {
      title: "8. Obowiązki Klienta",
      text: `Klient zobowiązany jest do zapewnienia dostępu do lokalu w umówionym terminie oraz do zabezpieczenia cennych przedmiotów i zwierząt domowych. PerfectShine nie ponosi odpowiedzialności za przedmioty pozostawione w miejscu sprzątania.`,
    },
    {
      title: "9. Odpowiedzialność",
      text: `PerfectShine ponosi odpowiedzialność za szkody wyrządzone podczas świadczenia usług z winy pracowników firmy. Odpowiedzialność jest ograniczona do wartości rzeczywistej szkody.`,
    },
    {
      title: "10. Ochrona danych osobowych",
      text: `Dane osobowe Klientów przetwarzane są zgodnie z Polityką Prywatności dostępną na stronie perfectshine-krakow.pl/privacy oraz zgodnie z RODO.`,
    },
    {
      title: "11. Świadczenie usług drogą elektroniczną",
      text: `Zgodnie z ustawą z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną, PerfectShine świadczy usługę formularza zamówień drogą elektroniczną. Wymagania techniczne: przeglądarka internetowa z obsługą JavaScript. Zakazane jest dostarczanie przez Klientów treści o charakterze bezprawnym.`,
    },
    {
      title: "12. Postanowienia końcowe",
      text: `W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy Kodeksu Cywilnego oraz ustawy o prawach konsumenta. Wszelkie spory rozstrzygane będą przez sąd właściwy dla siedziby firmy PerfectShine w Krakowie.`,
    },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--ps-cream)" }}>
      <Header />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "140px 2rem 100px" }}>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "var(--ps-dark)", marginBottom: "0.5rem" }}>
          Regulamin <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>Usług</em>
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