import { Fragment } from "react";

export default function MySubmissionsScreen({ v }) {
  return (
    <div data-screen-label="My submissions" style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Submission tracking</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>My submissions</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {v.mySubs.map((m, idx) => (
          <Fragment key={idx}>
            <div onClick={m.open} style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px", cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ minWidth: "0" }}>
                  <div style={{ fontSize: "16px", fontWeight: "500", color: "var(--text-hi)", lineHeight: "1.35", textWrap: "pretty" }}>{m.title}</div>
                  <div style={{ marginTop: "4px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>
                    Submitted {m.date} ·{' '}
                    <span style={{ color: "var(--azure-400)" }}>VIEW DETAILS ›</span>
                  </div>
                </div>
                <span style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: `1px solid ${m.stC}`, background: m.stBg, color: m.stC, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{m.stWord}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "18px", flexWrap: "wrap" }}>
                {m.steps.map((t, idx) => (
                  <Fragment key={idx}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "999px", border: `1px solid ${t.c}`, background: t.c }} />
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.1em", color: t.c }}>{t.name}</span>
                      <span style={{ width: "28px", height: "1px", background: t.tail }} />
                    </div>
                  </Fragment>
                ))}
              </div>
              {m.returned && (
                <div style={{ marginTop: "16px", padding: "14px 16px", border: "1px solid rgba(255,107,107,0.4)", borderRadius: "4px", background: "rgba(255,107,107,0.07)" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--stop)" }}>Coordinator remarks</div>
                  <p style={{ margin: "8px 0 0", fontSize: "13px", lineHeight: "1.6", color: "var(--text-mid)" }}>{m.remarks}</p>
                  <button onClick={m.resubmit} style={{ marginTop: "10px", background: "none", border: "none", padding: "0", fontSize: "13px", fontWeight: "500", color: "var(--azure-400)", cursor: "pointer" }} className="hv-3">Revise and resubmit</button>
                </div>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
