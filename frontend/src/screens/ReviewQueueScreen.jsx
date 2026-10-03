import { Fragment } from "react";

export default function ReviewQueueScreen({ v }) {
  return (
    <div data-screen-label="Review queue" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>{v.roleTag}</div>
      <h1 style={{ margin: "8px 0 20px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Review queue</h1>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {v.qTabs.map((t, idx) => (
          <Fragment key={idx}>
            <button onClick={t.pick} style={{ height: "28px", padding: "0 12px", borderRadius: "2px", fontSize: "12px", cursor: "pointer", background: t.bg, border: `1px solid ${t.bd}`, color: t.c, transition: "border-color 140ms ease-out" }} className="hv-4">{t.name}</button>
          </Fragment>
        ))}
      </div>
      {v.hasQRows && (
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "720px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 2.2fr 1.2fr 0.9fr 1fr", gap: "12px", padding: "0 12px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>
              <span>Submitter</span>
              <span>Title</span>
              <span>Program</span>
              <span>Submitted</span>
              <span>Status</span>
            </div>
            {v.qRows.map((r, idx) => (
              <Fragment key={idx}>
                <div onClick={r.open} style={{ display: "grid", gridTemplateColumns: "1.1fr 2.2fr 1.2fr 0.9fr 1fr", gap: "12px", alignItems: "center", minHeight: "44px", padding: "6px 12px", borderTop: "1px solid var(--line)", cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">
                  <span style={{ fontSize: "13px", color: "var(--text-mid)" }}>{r.submitter}</span>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-hi)", lineHeight: "1.4" }}>{r.title}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-mid)" }}>{r.program}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{r.date}</span>
                  <span>
                    <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: `1px solid ${r.stC}`, background: r.stBg, color: r.stC, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{r.stWord}</span>
                  </span>
                </div>
              </Fragment>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
          </div>
        </div>
      )}
      {v.noQRows && (
        <div style={{ position: "relative", border: "1px solid var(--line)", borderRadius: "8px", padding: "64px 24px", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "24px 24px", WebkitMaskImage: "radial-gradient(70% 80% at 50% 50%,#000 0%,transparent 100%)", maskImage: "radial-gradient(70% 80% at 50% 50%,#000 0%,transparent 100%)" }} />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Queue clear</div>
            <p style={{ margin: "0", fontSize: "14px", color: "var(--text-mid)" }}>No submissions with the status "{v.qFilterName}".</p>
          </div>
        </div>
      )}
    </div>
  );
}
