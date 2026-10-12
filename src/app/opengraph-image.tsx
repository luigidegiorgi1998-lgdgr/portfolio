import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0e1226",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#ffd23f",
            fontWeight: 700,
          }}
        >
          Luigi De Giorgi
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#f4f2f8",
            marginTop: 24,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Luigi De Giorgi: an interactive Pokémon-style portfolio.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#c9d4f5",
            marginTop: 32,
          }}
        >
          Product Designer — mechanic → barista → designer.
        </div>
      </div>
    ),
    { ...size }
  );
}
