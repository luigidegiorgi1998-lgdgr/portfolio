import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Arcade palette of portfolio v2
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0a10",
          borderBottom: "16px solid #ffa21f",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: "#ffa21f", fontWeight: 700 }}>
          Product Designer · Valencia · Remote
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: "#f5f1e8", marginTop: 24, lineHeight: 1.05, textShadow: "6px 6px 0 #b4360f" }}>
          Luigi De Giorgi
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#d3cede", marginTop: 32, maxWidth: 980, lineHeight: 1.35 }}>
          Mobile apps, e-commerce and B2B dashboards, designed and built for real clients.
        </div>
      </div>
    ),
    { ...size }
  );
}
