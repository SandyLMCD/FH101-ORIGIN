import { Fragment } from "react";

export default function CategoriesScreen({ v }) {
  return (
    <div data-screen-label="Categories" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>System Administrator</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Categories</h1>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 360px", minWidth: "0", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "8px" }}>Programs</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {v.progRows.map((p, idx) => (
              <Fragment key={idx}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "44px", borderTop: "1px solid var(--line-soft)" }}>
                  <span style={{ flex: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{p.code}</span>
                  <span style={{ flex: "1", fontSize: "13px", color: "var(--text-hi)" }}>{p.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{p.count} papers</span>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ margin: "12px 0 0", fontSize: "12px", lineHeight: "1.6", color: "var(--text-low)" }}>Program codes are fixed by the accession scheme and cannot be removed while papers reference them.</p>
        </div>
        <div style={{ flex: "1 1 420px", minWidth: "0", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "8px" }}>Areas of research</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {v.areaRows.map((a, idx) => (
              <Fragment key={idx}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "44px", borderTop: "1px solid var(--line-soft)" }}>
                  <span style={{ flex: "1", fontSize: "13px", color: "var(--text-hi)" }}>{a.name}</span>
                  <span style={{ flex: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{a.count} papers</span>
                </div>
              </Fragment>
            ))}
          </div>
          <div style={{ marginTop: "14px", display: "flex", gap: "8px" }}>
            <input value={v.newArea} onChange={v.setNewArea} placeholder="New area of research…" style={{ flex: "1", minWidth: "0", height: "36px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 12px", fontSize: "13px", color: "var(--text-hi)" }} />
            <button onClick={v.addArea} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer", flex: "none" }} className="hv-2">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
