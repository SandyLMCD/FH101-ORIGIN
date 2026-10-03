import { Fragment } from "react";

export default function PaperDetailScreen({ v }) {
  return (
    <div data-screen-label="Paper detail" style={{ maxWidth: "1060px", margin: "0 auto", padding: "32px 20px 140px" }}>
      <button onClick={v.back} style={{ background: "none", border: "none", padding: "0", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-low)", cursor: "pointer" }} className="hv-5">‹ BACK</button>
      <div style={{ marginTop: "24px", display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 540px", minWidth: "0" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.12em", color: "var(--text-low)" }}>{v.dp.code}</div>
          <h1 style={{ margin: "10px 0 0", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)", lineHeight: "1.15", textWrap: "pretty" }}>{v.dp.title}</h1>
          <div style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-mid)" }}>{v.dp.authorsStr}</div>
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Program</div>
              <div style={{ marginTop: "4px", fontSize: "13px", color: "var(--text-mid)" }}>{v.dp.program}</div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>School year</div>
              <div style={{ marginTop: "4px", fontSize: "13px", color: "var(--text-mid)" }}>{v.dp.sy} · {v.dp.sem}</div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Area of research</div>
              <div style={{ marginTop: "4px", fontSize: "13px", color: "var(--text-mid)" }}>{v.dp.area}</div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Adviser</div>
              <div style={{ marginTop: "4px", fontSize: "13px", color: "var(--text-mid)" }}>{v.dp.adviser}</div>
            </div>
          </div>
          <h2 style={{ margin: "28px 0 0", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "20px", color: "var(--text-hi)" }}>Abstract</h2>
          <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "1.6", color: "var(--text-mid)", maxWidth: "640px", textWrap: "pretty" }}>{v.dp.abstract}</p>
          <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {v.dp.kws.map((kw, idx) => (
              <Fragment key={idx}>
                <span style={{ height: "26px", display: "inline-flex", alignItems: "center", padding: "0 10px", borderRadius: "2px", border: "1px solid var(--line)", fontSize: "12px", color: "var(--text-mid)" }}>{kw.k}</span>
              </Fragment>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 280px", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={v.dp.read} style={{ height: "44px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)", transition: "background 140ms ease-out" }} className="hv-1">Read</button>
            <button onClick={v.dp.cite} style={{ height: "36px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">Cite</button>
            <button onClick={v.dp.toggleBm} style={{ height: "36px", background: v.dp.bmBg, border: `1px solid ${v.dp.bmBorder}`, borderRadius: "4px", color: v.dp.bmColor, fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "background 140ms ease-out" }}>{v.dp.bmText}</button>
            <div style={{ marginTop: "4px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-low)", lineHeight: "1.6" }}>View-only · pages stream as images · {v.dp.pagesStr}</div>
          </div>
          <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Researcher contact</div>
            <div style={{ marginTop: "6px", display: "flex", flexDirection: "column" }}>
              {v.dp.contacts.map((c, idx) => (
                <Fragment key={idx}>
                  <div style={{ padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-hi)" }}>{c.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--azure-400)" }}>{c.email}</div>
                  </div>
                </Fragment>
              ))}
            </div>
            <p style={{ margin: "12px 0 0", fontSize: "12px", lineHeight: "1.6", color: "var(--text-low)" }}>Contact details are shared voluntarily by the researchers for academic inquiries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
