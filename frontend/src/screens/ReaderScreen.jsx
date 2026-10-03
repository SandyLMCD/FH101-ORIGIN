import { Fragment } from "react";

export default function ReaderScreen({ v }) {
  return (
    <div data-screen-label="Reader" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ background: "var(--ink-800)", borderBottom: "1px solid var(--line)", padding: "8px 16px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px", minWidth: "0", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.rd.code} · {v.rd.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: "none" }}>
          <button onClick={v.rd.prev} aria-label="Previous page" style={{ width: "32px", height: "32px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", cursor: "pointer", fontSize: "14px", padding: "0" }} className="hv-2">‹</button>
          <input type="number" value={v.rd.page} onChange={v.rd.jump} style={{ width: "56px", height: "32px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", textAlign: "center" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>/ {v.rd.pages}</span>
          <button onClick={v.rd.next} aria-label="Next page" style={{ width: "32px", height: "32px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", cursor: "pointer", fontSize: "14px", padding: "0" }} className="hv-2">›</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: "none" }}>
          <button onClick={v.rd.zoomOut} aria-label="Zoom out" style={{ width: "32px", height: "32px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", cursor: "pointer", fontSize: "14px", padding: "0" }} className="hv-2">−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)", width: "44px", textAlign: "center" }}>{v.rd.zoom}%</span>
          <button onClick={v.rd.zoomIn} aria-label="Zoom in" style={{ width: "32px", height: "32px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", cursor: "pointer", fontSize: "14px", padding: "0" }} className="hv-2">+</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 220px", justifyContent: "flex-end" }}>
          <input value={v.rd.q} onChange={v.rd.setQ} placeholder="Search in document…" style={{ flex: "0 1 220px", height: "32px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-hi)" }} />
          {v.rd.hasHits && (
            <>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "var(--azure-400)", whiteSpace: "nowrap" }}>{v.rd.hitText}</span>
            <button onClick={v.rd.prevHit} aria-label="Previous match" style={{ width: "26px", height: "26px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--azure-400)", cursor: "pointer", fontSize: "12px", padding: "0" }}>‹</button>
            <button onClick={v.rd.nextHit} aria-label="Next match" style={{ width: "26px", height: "26px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--azure-400)", cursor: "pointer", fontSize: "12px", padding: "0" }}>›</button>
            </>
          )}
        </div>
      </div>
      <div style={{ background: "var(--ink-800)", borderBottom: "1px solid var(--line)", padding: "6px 16px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>View-only. Pages are streamed as images and are not downloadable.</div>
      <div style={{ flex: "1", overflow: "auto", background: "var(--paper-edge)", display: "flex", justifyContent: "center", padding: "32px 16px" }}>
        <div style={{ width: v.rd.pageW, maxWidth: "100%", flex: "none", alignSelf: "flex-start", background: "var(--paper)", boxShadow: "0 2px 24px rgba(0,0,0,0.35)", padding: "7% 8% 5%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#9AA1AC" }}>
            <span>{v.rd.code}</span>
            <span>Xavier University – Ateneo de Cagayan</span>
          </div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "9px" }}>
            {v.rd.lines.map((l, idx) => (
              <Fragment key={idx}>
                <div style={{ position: "relative", height: "10px", borderRadius: "2px", background: "#DEE2EA", width: l.w }}>
                  <span style={{ position: "absolute", top: "-2px", bottom: "-2px", left: l.hlL, width: l.hlW, background: l.hlBg, borderRadius: "2px" }} />
                </div>
              </Fragment>
            ))}
          </div>
          <div style={{ marginTop: "24px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#9AA1AC" }}>{v.rd.page}</div>
        </div>
      </div>
    </div>
  );
}
