import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 3,
            alignItems: "flex-end",
          }}
        >
          <div style={{ width: 6, height: 12, background: "white", borderRadius: 1 }} />
          <div style={{ width: 6, height: 16, background: "white", borderRadius: 1 }} />
          <div style={{ width: 6, height: 10, background: "white", borderRadius: 1 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
