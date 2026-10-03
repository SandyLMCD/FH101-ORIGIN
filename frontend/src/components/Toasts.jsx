import { Fragment } from "react";

export default function Toasts({ v }) {
  return (
    <div style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: "20px", zIndex: "80", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center", pointerEvents: "none" }}>
      {v.toasts.map((t, idx) => (
        <Fragment key={idx}>
          <div style={{ background: "var(--ink-600)", border: "1px solid var(--line)", borderRadius: "4px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "var(--ok)" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-hi)" }}>{t.m}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
