import { Fragment } from "react";

export default function CoordinatorAnalyticsScreen({ v }) {
  return (
    <div data-screen-label="Coordinator analytics" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Research Coordinator</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Analytics</h1>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 420px", minWidth: "0", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "12px" }}>Most-accessed papers</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {v.topPapers.map((p, idx) => (
              <Fragment key={idx}>
                <div style={{ padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-hi)" }}>{p.title}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)" }}>{p.views}</span>
                  </div>
                  <div style={{ marginTop: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "var(--text-low)" }}>{p.code}</div>
                  <div style={{ marginTop: "6px", height: "2px", background: "var(--ink-600)", borderRadius: "2px" }}>
                    <div style={{ height: "2px", background: "var(--azure-500)", borderRadius: "2px", width: p.w }} />
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "24px", minWidth: "0" }}>
          <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "12px" }}>Submissions per school year</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {v.syBars.map((b, idx) => (
                <Fragment key={idx}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ flex: "0 0 84px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)" }}>{b.label}</span>
                    <div style={{ flex: "1", height: "2px", background: "var(--ink-600)", borderRadius: "2px" }}>
                      <div style={{ height: "2px", background: "var(--azure-500)", borderRadius: "2px", width: b.w }} />
                    </div>
                    <span style={{ flex: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{b.v}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "8px", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Access volume</div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={v.anaWeekBtn.pick} style={{ height: "24px", padding: "0 10px", borderRadius: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer", background: v.anaWeekBtn.bg, border: `1px solid ${v.anaWeekBtn.bd}`, color: v.anaWeekBtn.c }}>{v.anaWeekBtn.name}</button>
                <button onClick={v.anaMonthBtn.pick} style={{ height: "24px", padding: "0 10px", borderRadius: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer", background: v.anaMonthBtn.bg, border: `1px solid ${v.anaMonthBtn.bd}`, color: v.anaMonthBtn.c }}>{v.anaMonthBtn.name}</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {v.volBars.map((b, idx) => (
                <Fragment key={idx}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ flex: "0 0 40px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)" }}>{b.label}</span>
                    <div style={{ flex: "1", height: "2px", background: "var(--ink-600)", borderRadius: "2px" }}>
                      <div style={{ height: "2px", background: "var(--azure-500)", borderRadius: "2px", width: b.w }} />
                    </div>
                    <span style={{ flex: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{b.v}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
