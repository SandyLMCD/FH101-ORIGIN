import { Fragment } from "react";

export default function RoleSwitcher({ v }) {
  return (
    <div style={{ position: "fixed", right: "16px", bottom: "16px", zIndex: "70", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.14em", color: "var(--text-low)", padding: "0 6px" }}>VIEW AS</span>
      {v.roleBtns.map((r, idx) => (
        <Fragment key={idx}>
          <button onClick={r.pick} style={{ height: "26px", padding: "0 10px", borderRadius: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", cursor: "pointer", background: r.bg, border: `1px solid ${r.bd}`, color: r.c, transition: "border-color 140ms ease-out" }}>{r.name}</button>
        </Fragment>
      ))}
    </div>
  );
}
