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
          background: "#faf9fc",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6d28d9",
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
            color: "#17141d",
            marginTop: 24,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Hi. I&apos;m Luigi, and you probably don&apos;t know me.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#4d485a",
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
