"use client";
import React, { useState } from "react";

const REVIEWS = [
  { name: "Katarzyna W.", date: "kwiecień 2024", rating: 5, text: "Jestem zachwycona! Mieszkanie lśni jak nowe. Panie były punktualne, dokładne i bardzo miłe. Zdecydowanie polecam." },
  { name: "Marta K.", date: "marzec 2024", rating: 5, text: "Sprzątanie po remoncie – efekt przeszedł moje oczekiwania. Pył budowlany zniknął dosłownie wszędzie. Super kontakt i uczciwa cena!" },
  { name: "Olga P.", date: "marzec 2024", rating: 5, text: "Korzystam regularnie co dwa tygodnie. Zawsze punktualnie, zawsze perfekcyjnie. Polecam z całego serca." },
  { name: "Tomasz R.", date: "luty 2024", rating: 5, text: "Generalne sprzątanie przed wprowadzką. Mieszkanie wyglądało jak z katalogu. Profesjonalizm na każdym kroku." },
  { name: "Anna S.", date: "luty 2024", rating: 5, text: "Pranie kanapy i dywanu – efekt niesamowity. Plamy, które myślałam że są na stałe, zniknęły. Szybka realizacja!" },
  { name: "Paweł M.", date: "styczeń 2024", rating: 5, text: "Polecam każdemu! Przyszli w umówionym czasie, wszystko wykonali skrupulatnie. Bardzo rzetelna firma." },
];

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Jost', sans-serif";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontFamily: sans,
  fontSize: 13,
  fontWeight: 300,
  color: "var(--ps-dark)",
  backgroundColor: "var(--ps-cream)",
  border: "1px solid rgba(201,168,76,0.25)",
  outline: "none",
  letterSpacing: "0.05em",
  boxSizing: "border-box",
};

export default function Reviews({ t }) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ name: "", text: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const sendToTelegram = async () => {
    const token = process.env.NEXT_PUBLIC_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    const message = `⭐ *NOWA OPINIA – PerfectShine*\n\n👤 *Imię:* ${formData.name}\n${stars}\n\n💬 *Treść:*\n${formData.text}\n\n_Dodaj do kodu w Reviews.jsx_`;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
    });

    if (!response.ok) throw new Error("Telegram error");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;
    setStatus("sending");
    try {
      await sendToTelegram();
      setStatus("success");
      setFormData({ name: "", text: "" });
      setRating(5);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="reviews" style={{ backgroundColor: "var(--ps-cream)", padding: "120px 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "1rem" }}>
            Google Reviews · ★★★★★ 5.0
          </p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1.5rem", lineHeight: 1.2 }}>
            {t?.title || "Opinie"} <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>{t?.titleGold || "Klientów"}</em>
          </h2>
          <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, transparent, var(--ps-gold), transparent)", margin: "0 auto" }} />
        </div>

        {/* Reviews grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{
              backgroundColor: "var(--ps-cream-dark)", padding: "2rem",
              border: "1px solid rgba(201,168,76,0.15)",
              transition: "border-color 0.3s",
            }}>
              <div style={{ display: "flex", gap: 3, marginBottom: "1rem" }}>
                {Array.from({ length: 5 }, (_, si) => (
                  <span key={si} style={{ color: "var(--ps-gold)", fontSize: 12 }}>★</span>
                ))}
              </div>
              <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 300, fontStyle: "italic", color: "var(--ps-dark)", lineHeight: 1.8, marginBottom: "1.5rem", opacity: 0.85 }}>
                "{r.text}"
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: "var(--ps-brown)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {r.name}
                </span>
                <span style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.5, letterSpacing: "0.05em" }}>
                  {r.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ textAlign: "center", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowForm(!showForm); setStatus("idle"); }}
            style={{
              fontFamily: sans, fontSize: 10, fontWeight: 400,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "var(--ps-gold)", background: "none",
              border: "1px solid rgba(201,168,76,0.4)",
              padding: "14px 36px", cursor: "pointer", transition: "all 0.3s",
            }}>
            {showForm ? "Anuluj ×" : (t?.reviewBtn || "Zostaw swoją opinię +")}
          </button>
        </div>

        {/* Review form */}
        {showForm && (
          <div style={{
            maxWidth: 600, margin: "2.5rem auto 0",
            backgroundColor: "var(--ps-cream-dark)",
            border: "1px solid rgba(201,168,76,0.2)",
            padding: "2.5rem",
          }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontFamily: serif, fontSize: 40, color: "var(--ps-gold)", marginBottom: "1rem" }}>✦</div>
                <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: "var(--ps-dark)", marginBottom: "0.5rem" }}>
                  Dziękujemy za opinię!
                </p>
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.7, letterSpacing: "0.05em" }}>
                  Twoja opinia zostanie dodana wkrótce.
                </p>
              </div>
            ) : (
              <>
                <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "2rem", opacity: 0.8 }}>
                  Twoja opinia
                </p>

                {/* Star rating picker */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontFamily: sans, fontSize: 9, fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ps-brown)", opacity: 0.6, display: "block", marginBottom: 10 }}>
                    Ocena
                  </label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        style={{
                          fontSize: 28, cursor: "pointer",
                          color: star <= (hoverRating || rating) ? "var(--ps-gold)" : "rgba(201,168,76,0.2)",
                          transition: "color 0.15s",
                        }}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontFamily: sans, fontSize: 9, fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ps-brown)", opacity: 0.6, display: "block", marginBottom: 8 }}>
                    Imię i nazwisko *
                  </label>
                  <input
                    style={inputStyle}
                    placeholder="Jan Kowalski"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Review text */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontFamily: sans, fontSize: 9, fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ps-brown)", opacity: 0.6, display: "block", marginBottom: 8 }}>
                    Treść opinii *
                  </label>
                  <textarea
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                    placeholder="Podziel się swoją opinią..."
                    value={formData.text}
                    onChange={e => setFormData({ ...formData, text: e.target.value })}
                  />
                </div>

                {status === "error" && (
                  <div style={{ marginBottom: "1rem", padding: "0.75rem 1rem", backgroundColor: "rgba(200,50,50,0.06)", border: "1px solid rgba(200,50,50,0.15)", fontFamily: sans, fontSize: 11, color: "#a33", letterSpacing: "0.05em" }}>
                    Wystąpił błąd. Spróbuj ponownie.
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    width: "100%", padding: "14px",
                    fontFamily: sans, fontSize: 10, fontWeight: 500,
                    letterSpacing: "0.28em", textTransform: "uppercase",
                    cursor: "pointer", backgroundColor: "var(--ps-gold)",
                    color: "var(--ps-cream)", border: "1px solid var(--ps-gold)",
                    transition: "all 0.3s", opacity: status === "sending" ? 0.6 : 1,
                  }}>
                  {status === "sending" ? "Wysyłanie..." : "Wyślij opinię"}
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
