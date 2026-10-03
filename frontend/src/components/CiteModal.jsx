import { Fragment } from "react";

export default function CiteModal({ v }) {
  return (
    <div onClick={v.citeClose} style={{ position: "fixed", inset: "0", zIndex: "60", background: "rgba(4,7,15,0.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={v.stop} style={{ width: "560px", maxWidth: "100%", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-start" }}>
          <div style={{ minWidth: "0" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Cite this paper</div>
            <div style={{ marginTop: "4px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "20px", color: "var(--text-hi)" }}>{v.citeTitle}</div>
          </div>
          <button onClick={v.citeClose} aria-label="Close" style={{ width: "32px", height: "32px", flex: "none", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-mid)", fontSize: "14px", cursor: "pointer", padding: "0" }} className="hv-2">×</button>
        </div>
        <div style={{ display: "flex", gap: "2px", borderBottom: "1px solid var(--line)" }}>
          {v.citeTabs.map((t, idx) => (
            <Fragment key={idx}>
              <button onClick={t.pick} style={{ height: "36px", padding: "0 14px", background: "none", border: "none", borderBottom: `2px solid ${t.line}`, color: t.c, fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "color 140ms ease-out" }} className="hv-5">{t.name}</button>
            </Fragment>
          ))}
        </div>
        <div style={{ background: "var(--ink-900)", border: "1px solid var(--line)", borderRadius: "4px", padding: "16px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12.5px", lineHeight: "1.7", color: "var(--text-mid)", overflowWrap: "anywhere" }}>{v.citation}</div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={v.copyCite} style={{ height: "36px", padding: "0 18px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)", transition: "background 140ms ease-out" }} className="hv-1">Copy citation</button>
          <button onClick={v.zotero} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Export to Zotero</button>
        </div>
      </div>
    </div>
  );
}
