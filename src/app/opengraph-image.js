import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PerfectShine – Profesjonalne Sprzątanie w Krakowie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F0E8",
          padding: "60px",
        }}
      >
        {/* Gold border frame */}
        <div style={{
          position: "absolute",
          inset: "24px",
          border: "1px solid rgba(201,168,76,0.3)",
          display: "flex",
        }} />

        {/* Logo */}
        <div style={{
          fontSize: 72,
          fontWeight: 500,
          color: "#C9A84C",
          marginBottom: 16,
          letterSpacing: "-0.02em",
        }}>
          PerfectShine ✦
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 24,
          fontWeight: 300,
          color: "#6B5B3E",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 40,
        }}>
          Profesjonalne Sprzątanie
        </div>

        {/* Gold rule */}
        <div style={{
          width: 80,
          height: 1,
          backgroundColor: "#C9A84C",
          marginBottom: 40,
        }} />

        {/* Main text */}
        <div style={{
          fontSize: 32,
          fontWeight: 300,
          color: "#2C2416",
          textAlign: "center",
          lineHeight: 1.4,
          marginBottom: 40,
          maxWidth: 800,
        }}>
          Perfekcyjna czystość Twojego domu – bez wysiłku
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: 60,
          marginBottom: 40,
        }}>
          {[
            { num: "200+", label: "Klientów" },
            { num: "5.0★", label: "Google" },
            { num: "450 zł", label: "Od" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 300, color: "#C9A84C" }}>{s.num}</div>
              <div style={{ fontSize: 14, fontWeight: 300, color: "#6B5B3E", letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          fontSize: 18,
          fontWeight: 300,
          color: "#6B5B3E",
          letterSpacing: "0.1em",
          opacity: 0.6,
        }}>
          perfectshine-krakow.pl
        </div>
      </div>
    ),
    { ...size }
  );
}