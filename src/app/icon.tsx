import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 22%, #22d3ee 0, transparent 34%), linear-gradient(135deg, #06070a 0%, #111827 54%, #020617 100%)",
          color: "#ecfeff",
          fontFamily: "Arial, sans-serif",
          fontSize: 156,
          fontWeight: 800,
          letterSpacing: 0,
        }}
      >
        KM
      </div>
    ),
    size,
  );
}
