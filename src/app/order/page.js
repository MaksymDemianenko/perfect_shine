"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { translations } from "@/constants/translations";

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
const TELEGRAM_CHAT_ID   = process.env.NEXT_PUBLIC_CHAT_ID;

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

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

function calcResults(f) {
  const m2 = Math.max(35, parseFloat(f.area) || 35);
  const base = m2 <= 50 ? 450 : m2 * RATES[f.serviceType];
  const extrasTotal = f.extras.reduce((s, id) => s + (EXTRAS[id]?.price || 0), 0);
  const winTotal = f.windowCount * WIN_PRICE;
  const price = Math.round(base + extrasTotal + winTotal);
  const SPEED = { regular: 18, general: 12, repair: 10, rent: 12 };
  const h = Math.ceil(m2 / SPEED[f.serviceType]) + Math.floor(f.extras.length * 0.4 + f.windowCount * 0.25);
  return { price, hours: `${h}–${h + 2} h` };
}

function validatePhone(phone) {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return /^(\+48|48)?[4-9]\d{8}$/.test(cleaned);
}

const inputSt = {
  width: "100%", padding: "13px 14px",
  fontFamily: sans, fontSize: 13, fontWeight: 300,
  color: "var(--ps-dark)", backgroundColor: "var(--ps-cream-dark)",
  border: "1px solid rgba(201,168,76,0.2)", outline: "none",
  letterSpacing: "0.04em",
};
const inputErrSt = { ...inputSt, border: "1px solid rgba(200,50,50,0.4)" };
const labelSt = {
  fontFamily: sans, fontSize: 9, fontWeight: 400,
  letterSpacing: "0.28em", textTransform: "uppercase",
  color: "var(--ps-brown)", opacity: 0.6, display: "block", marginBottom: 8,
};

function OrderForm() {
  const searchParams = useSearchParams();
  const [lang, setLang]             = useState("pl");
  const [status, setStatus]         = useState("idle");
  const [showSummary, setShowSummary] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [gdprError, setGdprError]   = useState("");
  const [captcha, setCaptcha]       = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    date: "", time: "",
    street: "", houseNo: "", city: "Kraków",
    serviceType: "regular", area: "50",
    extras: [], windowCount: 0,
    paymentMethod: "cash", notes: "",
    gdprConsent: false,
  });

  useEffect(() => {
    const onLang = (e) => setLang(e.detail);
    window.addEventListener("langChange", onLang);
    const svc = searchParams.get("service");
    const ar  = searchParams.get("area");
    if (svc) setForm(p => ({ ...p, serviceType: svc }));
    if (ar)  setForm(p => ({ ...p, area: ar }));
    return () => window.removeEventListener("langChange", onLang);
  }, [searchParams]);

  const t   = translations[lang] || translations["pl"];
  const res = calcResults(form);

  const serviceLabels = {
    regular: t.services?.items?.regular || "Regularne",
    general: t.services?.items?.general || "Generalne",
    repair:  t.services?.items?.repair  || "Po remoncie",
    rent:    t.services?.items?.rent    || "Przed/Po najemcach",
  };

  const toggleExtra = (id) => setForm(p => ({
    ...p,
    extras: p.extras.includes(id) ? p.extras.filter(e => e !== id) : [...p.extras, id],
  }));

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^\d\s\+\-\(\)]/g, "");
    setForm({ ...form, phone: val });
    if (phoneError) setPhoneError("");
  };

  const sendToTelegram = async () => {
    const svcLabels = { regular: "Regularne", general: "Generalne", repair: "Po remoncie", rent: "Przed/Po najemcach" };
    const extrasText = form.extras.length ? form.extras.map(id => EXTRAS[id]?.label || id).join(", ") : "Brak";
    const address = `ul. ${form.street} ${form.houseNo}, ${form.city}`;
    const msg = `🧹 *NOWE ZAMÓWIENIE – PerfectShine*\n\n👤 *Klient:* ${form.name}\n📞 *Telefon:* ${form.phone}${form.email ? `\n✉️ *Email:* ${form.email}` : ""}\n\n📍 *Adres:* ${address}\n\n🏠 *Usługa:* ${svcLabels[form.serviceType]}\n📐 *Metraż:* ${Math.max(35, parseFloat(form.area)||35)} m²\n➕ *Dodatki:* ${extrasText}\n🪟 *Okna:* ${form.windowCount > 0 ? `${form.windowCount} szt (+${form.windowCount * WIN_PRICE} zł)` : "Brak"}\n\n📅 *Data:* ${form.date || "—"}\n⏰ *Godzina:* ${form.time || "—"}\n💳 *Płatność:* ${form.paymentMethod === "cash" ? "Gotówka" : "Karta"}\n${form.notes ? `\n💬 *Uwagi:* ${form.notes}` : ""}\n💰 *Szacowana cena:* ~${res.price} zł\n⏱ *Czas:* ~${res.hours}\n✅ *Zgoda RODO:* Tak`;
    const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: "Markdown" }),
    });
    if (!r.ok) throw new Error("Telegram error");
  };

  const handleReview = (e) => {
    e?.preventDefault();
    if (!form.name.trim() || !form.street.trim()) {
      alert("Uzupełnij imię i adres."); return;
    }
    if (!validatePhone(form.phone)) {
      setPhoneError("Podaj prawidłowy numer telefonu (np. 600 123 456)");
      return;
    }
    if (!form.gdprConsent) {
      setGdprError("Wymagana zgoda na przetwarzanie danych osobowych.");
      return;
    }
    setShowSummary(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (parseInt(captchaInput) !== captcha.answer) {
      setCaptchaError("Błędna odpowiedź. Spróbuj ponownie.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    setStatus("sending");
    try { await sendToTelegram(); setStatus("success"); }
    catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1.5rem" }}>
      <div style={{ fontFamily: serif, fontSize: 60, color: "var(--ps-gold)", marginBottom: "1.25rem" }}>✦</div>
      <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 300, color: "var(--ps-dark)", marginBottom: "1rem" }}>{t.order.success}</h1>
      <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "var(--ps-brown)", marginBottom: "2rem", lineHeight: 1.8, maxWidth: 400 }}>{t.order.successMsg}</p>
      <a href="tel:+48575199937" style={{ fontFamily: serif, fontSize: 26, color: "var(--ps-gold)", textDecoration: "none" }}>+48 575 199 937</a>
    </div>
  );

  if (showSummary) {
    const address = `ul. ${form.street} ${form.houseNo}, ${form.city}`;
    const extrasText = form.extras.length ? form.extras.map(id => EXTRAS[id]?.label).join(", ") : "Brak";
    return (
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "120px 1.5rem 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "0.75rem" }}>Sprawdź szczegóły</p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1.25rem" }}>
            Podsumowanie <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>Zamówienia</em>
          </h1>
          <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", margin: "0 auto" }} />
        </div>

        <div style={{ backgroundColor: "var(--ps-cream-dark)", border: "1px solid rgba(201,168,76,0.2)", padding: "2.5rem", marginBottom: "2rem" }}>
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
            <p style={{ ...labelSt, marginBottom: "0.75rem" }}>Dane kontaktowe</p>
            <p style={{ fontFamily: serif, fontSize: 18, color: "var(--ps-dark)", margin: "0 0 4px" }}>{form.name}</p>
            <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "var(--ps-brown)", margin: "0 0 2px" }}>{form.phone}</p>
            {form.email && <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "var(--ps-brown)", margin: 0 }}>{form.email}</p>}
          </div>
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
            <p style={{ ...labelSt, marginBottom: "0.75rem" }}>Adres</p>
            <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "var(--ps-dark)", margin: 0 }}>{address}</p>
          </div>
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
            <p style={{ ...labelSt, marginBottom: "0.75rem" }}>Szczegóły usługi</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Usługa", value: serviceLabels[form.serviceType] },
                { label: "Metraż", value: `${Math.max(35, parseFloat(form.area)||35)} m²` },
                { label: "Data", value: form.date || "—" },
                { label: "Godzina", value: form.time || "—" },
                { label: "Płatność", value: form.paymentMethod === "cash" ? "Gotówka" : "Karta" },
                { label: "Dodatki", value: extrasText },
                { label: "Okna", value: form.windowCount > 0 ? `${form.windowCount} szt` : "Brak" },
                ...(form.notes ? [{ label: "Uwagi", value: form.notes }] : []),
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                  <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6, flexShrink: 0 }}>{row.label}:</span>
                  <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 400, color: "var(--ps-dark)", textAlign: "right" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ps-gold)", opacity: 0.7, marginBottom: "0.4rem" }}>Szacowany koszt:</p>
            <div style={{ fontFamily: serif, fontSize: 52, fontWeight: 300, color: "var(--ps-dark)", lineHeight: 1 }}>
              {res.price} <span style={{ fontSize: 22 }}>zł</span>
            </div>
            <div style={{ marginTop: "0.5rem", padding: "5px 10px", backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", display: "inline-block" }}>
              <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ps-brown)", opacity: 0.7, margin: 0 }}>
                Przybliżony czas: <strong style={{ color: "var(--ps-dark)" }}>{res.hours}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Captcha */}
        <div style={{ backgroundColor: "var(--ps-cream-dark)", border: "1px solid rgba(201,168,76,0.2)", padding: "1.75rem", marginBottom: "1.5rem" }}>
          <p style={{ ...labelSt, marginBottom: "1rem" }}>Weryfikacja – odpowiedz na pytanie</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: serif, fontSize: 22, color: "var(--ps-dark)", fontWeight: 300 }}>{captcha.a} + {captcha.b} = ?</span>
            <input type="number" placeholder="Twoja odpowiedź"
              value={captchaInput}
              onChange={e => { setCaptchaInput(e.target.value); setCaptchaError(""); }}
              style={{ ...inputSt, width: 140 }}
            />
          </div>
          {captchaError && <p style={{ fontFamily: sans, fontSize: 11, color: "#a33", marginTop: "0.5rem" }}>{captchaError}</p>}
        </div>

        {status === "error" && (
          <div style={{ padding: "1rem", backgroundColor: "rgba(200,50,50,0.06)", border: "1px solid rgba(200,50,50,0.15)", fontFamily: sans, fontSize: 12, color: "#a33", marginBottom: "1rem" }}>
            {t.order.errorMsg}
          </div>
        )}

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={() => setShowSummary(false)} style={{
            flex: 1, padding: "15px", fontFamily: sans, fontSize: 10, fontWeight: 400,
            letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer",
            backgroundColor: "transparent", color: "var(--ps-brown)",
            border: "1px solid rgba(107,91,62,0.3)",
          }}>← Wróć i edytuj</button>
          <button onClick={handleSubmit} disabled={status === "sending"} style={{
            flex: 2, padding: "15px", fontFamily: sans, fontSize: 10, fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer",
            backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)",
            border: "1px solid var(--ps-gold)", opacity: status === "sending" ? 0.6 : 1,
          }}>
            {status === "sending" ? t.order.sending : t.order.confirmBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "120px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "0.75rem" }}>
          Szybka i prosta rezerwacja
        </p>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,5vw,3.2rem)", fontWeight: 300, color: "var(--ps-dark)", margin: "0 0 1.25rem" }}>
          {t.order.title} <em style={{ color: "var(--ps-gold)", fontStyle: "italic" }}>{t.order.titleGold}</em>
        </h1>
        <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,var(--ps-gold),transparent)", margin: "0 auto" }} />
      </div>

      <div className="two-col-layout">
        <form onSubmit={handleReview} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

          {/* Service + Area */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={labelSt}>{t.order.serviceType}</label>
              <select style={inputSt} value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })}>
                {Object.entries(serviceLabels).map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
              </select>
            </div>
            <div>
              <label style={labelSt}>{t.order.area}</label>
              <input type="number" min="35" max="500" style={inputSt} value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} />
            </div>
          </div>

          {/* Name + Phone */}
          <div>
            <label style={labelSt}>{t.order.contactData || "Dane kontaktowe"}</label>
            <div className="name-phone-grid">
              <input required style={inputSt} placeholder={t.order.name + " *"} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <div>
                <input required type="tel" style={phoneError ? inputErrSt : inputSt}
                  placeholder={t.order.phone + " * (np. 600 123 456)"}
                  value={form.phone} onChange={handlePhoneChange} />
                {phoneError && <p style={{ fontFamily: sans, fontSize: 10, color: "#a33", marginTop: 4 }}>{phoneError}</p>}
              </div>
            </div>
            <div style={{ marginTop: "0.6rem" }}>
              <input type="email" style={inputSt} placeholder="Email (opcjonalnie)" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          {/* Address */}
          <div>
            <label style={labelSt}>{t.order.addressLabel || "Adres wykonania usługi"} *</label>
            <div className="address-grid">
              <input required style={inputSt} placeholder="Ulica" value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} />
              <input required style={inputSt} placeholder="Nr" value={form.houseNo} onChange={e => setForm({ ...form, houseNo: e.target.value })} />
              <input style={inputSt} placeholder="Miasto" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </div>
          </div>

          {/* Date + Time + Payment */}
          <div className="dtp-grid">
            <div>
              <label style={labelSt}>{t.order.date}</label>
              <input type="date" style={inputSt} min={new Date().toISOString().split("T")[0]} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label style={labelSt}>{t.order.time}</label>
              <input type="time" style={inputSt} value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            </div>
            <div>
              <label style={labelSt}>{t.order.payment}</label>
              <select style={inputSt} value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })}>
                <option value="cash">{t.order.cash}</option>
                <option value="card">{t.order.card}</option>
              </select>
            </div>
          </div>

          {/* Extras */}
          <div>
            <label style={labelSt}>{t.order.extras}</label>
            <div className="extras-grid">
              {Object.entries(EXTRAS).map(([id, ex]) => (
                <button key={id} type="button" onClick={() => toggleExtra(id)} style={{
                  padding: "11px 6px", fontFamily: sans, fontSize: 9, fontWeight: 400,
                  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  backgroundColor: form.extras.includes(id) ? "var(--ps-gold)" : "transparent",
                  color: form.extras.includes(id) ? "var(--ps-cream)" : "var(--ps-brown)",
                  border: form.extras.includes(id) ? "1px solid var(--ps-gold)" : "1px solid rgba(201,168,76,0.2)",
                }}>
                  <span>{ex.label}</span>
                  <span style={{ fontSize: 9, opacity: form.extras.includes(id) ? 0.8 : 0.4, fontWeight: 300 }}>+{ex.price} zł</span>
                </button>
              ))}
            </div>
          </div>

          {/* Windows */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <label style={{ ...labelSt, marginBottom: 0 }}>{t.order.windows}</label>
              <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: "var(--ps-gold)" }}>
                {form.windowCount}
                {form.windowCount > 0 && <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6, marginLeft: 8 }}>+{form.windowCount * WIN_PRICE} zł</span>}
              </span>
            </div>
            <input type="range" min="0" max="20" step="1" value={form.windowCount}
              onChange={(e) => setForm(p => ({ ...p, windowCount: Number(e.target.value) }))}
              style={{ width: "100%", height: 2, appearance: "none", WebkitAppearance: "none", background: `linear-gradient(to right, var(--ps-gold) 0%, var(--ps-gold) ${(form.windowCount / 20) * 100}%, rgba(201,168,76,0.2) ${(form.windowCount / 20) * 100}%, rgba(201,168,76,0.2) 100%)`, outline: "none", cursor: "pointer", border: "none" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              {[0, 5, 10, 15, 20].map(v => <span key={v} style={{ fontFamily: sans, fontSize: 9, color: "var(--ps-brown)", opacity: 0.35 }}>{v}</span>)}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={labelSt}>Uwagi (opcjonalnie)</label>
            <textarea rows={3} style={{ ...inputSt, resize: "vertical" }}
              placeholder="Dodatkowe informacje, wejście do budynku, zwierzęta itp."
              value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>

          {/* GDPR Checkbox */}
          <div style={{ padding: "1.25rem", backgroundColor: "var(--ps-cream-dark)", border: gdprError ? "1px solid rgba(200,50,50,0.3)" : "1px solid rgba(201,168,76,0.2)" }}>
            <label style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", cursor: "pointer" }}>
              <input type="checkbox" checked={form.gdprConsent}
                onChange={e => { setForm({ ...form, gdprConsent: e.target.checked }); setGdprError(""); }}
                style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--ps-gold)", width: 16, height: 16 }}
              />
              <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: "var(--ps-brown)", lineHeight: 1.7, opacity: 0.85 }}>
                Wyrażam zgodę na przetwarzanie moich danych osobowych przez PerfectShine (Aleksandra Fredry 6, 30-605 Kraków, NIP: 6282265846) w celu realizacji zamówienia, zgodnie z{" "}
                <Link href="/privacy" style={{ color: "var(--ps-gold)", textDecoration: "none" }}>Polityką Prywatności</Link>.
                {" "}Podanie danych jest dobrowolne, ale niezbędne do realizacji usługi. *
              </span>
            </label>
            {gdprError && <p style={{ fontFamily: sans, fontSize: 11, color: "#a33", marginTop: "0.5rem", marginLeft: "1.625rem" }}>{gdprError}</p>}
          </div>

        </form>

        {/* Sidebar */}
        <div className="sidebar-sticky" style={{ position: "sticky", top: "6rem", backgroundColor: "var(--ps-cream-dark)", border: "1px solid rgba(201,168,76,0.2)", padding: "2rem" }}>
          <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--ps-gold)", marginBottom: "1.75rem", opacity: 0.8 }}>
            {t.order.cost}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6 }}>Baza ({serviceLabels[form.serviceType]}):</span>
              <span style={{ fontFamily: serif, fontSize: 14, color: "var(--ps-dark)" }}>
                {Math.max(35, parseFloat(form.area)||35) <= 50 ? 450 : Math.round(Math.max(35, parseFloat(form.area)||35) * RATES[form.serviceType])} zł
              </span>
            </div>
            {form.windowCount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6 }}>Okna ({form.windowCount}):</span>
                <span style={{ fontFamily: serif, fontSize: 14, color: "var(--ps-dark)" }}>+{form.windowCount * WIN_PRICE} zł</span>
              </div>
            )}
            {form.extras.map(id => (
              <div key={id} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.6 }}>{EXTRAS[id]?.label}:</span>
                <span style={{ fontFamily: serif, fontSize: 14, color: "var(--ps-dark)" }}>+{EXTRAS[id]?.price} zł</span>
              </div>
            ))}
          </div>

          <div style={{ width: "100%", height: 1, background: "rgba(201,168,76,0.15)", marginBottom: "1.25rem" }} />

          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ps-gold)", opacity: 0.7, marginBottom: "0.4rem" }}>Szacowany koszt:</p>
            <div style={{ fontFamily: serif, fontSize: 52, fontWeight: 300, color: "var(--ps-dark)", lineHeight: 1 }}>
              {res.price} <span style={{ fontSize: 22 }}>zł</span>
            </div>
            <div style={{ marginTop: "0.5rem", padding: "5px 10px", backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", display: "inline-block" }}>
              <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ps-brown)", opacity: 0.7, margin: 0 }}>
                {t.order.duration}: <strong style={{ color: "var(--ps-dark)" }}>{res.hours}</strong>
              </p>
            </div>
            <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, color: "var(--ps-brown)", opacity: 0.4, letterSpacing: "0.06em", marginTop: "0.6rem", lineHeight: 1.6 }}>
              {t.order.minPriceNote}
            </p>
          </div>

          <button type="button" onClick={handleReview} style={{
            width: "100%", padding: "15px", fontFamily: sans, fontSize: 10, fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer",
            backgroundColor: "var(--ps-gold)", color: "var(--ps-cream)", border: "1px solid var(--ps-gold)",
          }}>
            Sprawdź i zarezerwuj →
          </button>
          <a href="tel:+48575199937" style={{ display: "block", textAlign: "center", marginTop: "0.875rem", fontFamily: serif, fontSize: 14, fontWeight: 300, color: "var(--ps-brown)", textDecoration: "none", opacity: 0.5 }}>
            lub zadzwoń: +48 575 199 937
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderPageWrapper() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--ps-cream)" }}>
      <Header />
      <Suspense fallback={<div style={{ paddingTop: 160, textAlign: "center", fontFamily: "'Jost',sans-serif", letterSpacing: "0.2em", fontSize: 12, color: "var(--ps-gold)" }}>Ładowanie...</div>}>
        <OrderForm />
      </Suspense>
      <Footer t={{ location: "Profesjonalne sprzątanie w Krakowie i okolicach. Jakość Premium." }} />
    </main>
  );
}