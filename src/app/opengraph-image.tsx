import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt =
  "Kinetic Moto Sports launch bike catalog preview";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 22% 16%, rgba(34,211,238,0.42), transparent 30%), radial-gradient(circle at 76% 24%, rgba(167,139,250,0.28), transparent 28%), radial-gradient(circle at 52% 78%, rgba(20,184,166,0.22), transparent 34%), linear-gradient(135deg, #06070a 0%, #111827 54%, #020617 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#cffafe",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 18,
              border: "1px solid rgba(207,250,254,0.42)",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: "#a5f3fc",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Kinetic Moto launch catalog
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 940,
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: 0,
            }}
          >
            Launch bikes are opening for availability checks.
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 820,
              color: "#cbd5e1",
              fontSize: 30,
              lineHeight: 1.35,
            }}
          >
            Confirm pricing, financing options, and pickup or shipping path.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
