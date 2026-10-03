import { Fragment } from "react";

export default function SubmissionDetailScreen({ v }) {
  return (
    <div data-screen-label="Submission detail" style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 20px 140px" }}>
      <button onClick={v.back} style={{ background: "none", border: "none", padding: "0", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-low)", cursor: "pointer" }} className="hv-5">‹ BACK</button>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ minWidth: "0", flex: "1 1 380px" }}>
          <h1 style={{ margin: "0", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "26px", letterSpacing: "-0.02em", color: "var(--text-hi)", lineHeight: "1.25", textWrap: "pretty" }}>{v.sd.title}</h1>
          <div style={{ marginTop: "6px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>Attempt {v.sd.attempt} · Last activity {v.sd.date}</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: `1px solid ${v.sd.stC}`, background: v.sd.stBg, color: v.sd.stC, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{v.sd.stWord}</span>
      </div>
      <div style={{ marginTop: "20px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "6px" }}>Submitted metadata</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {v.sd.rows.map((r, idx) => (
            <Fragment key={idx}>
              <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
                <span style={{ flex: "0 0 150px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-low)" }}>{r.label}</span>
                <span style={{ flex: "1", fontSize: "13px", color: "var(--text-mid)", minWidth: "0", overflowWrap: "anywhere" }}>{r.value}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "16px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "6px" }}>History</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {v.sd.history.map((h, idx) => (
            <Fragment key={idx}>
              <div style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid var(--line-soft)" }}>
                <span style={{ width: "8px", height: "8px", flex: "none", marginTop: "5px", borderRadius: "999px", background: "var(--azure-500)" }} />
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-hi)" }}>{h.label}</div>
                  <div style={{ marginTop: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "var(--text-low)" }}>{h.by} · {h.ts}</div>
                  {h.hasRemarks && (
                    <div style={{ marginTop: "8px", padding: "10px 12px", border: "1px solid rgba(255,107,107,0.4)", borderRadius: "4px", background: "rgba(255,107,107,0.07)", fontSize: "13px", lineHeight: "1.6", color: "var(--text-mid)" }}>{h.remarks}</div>
                  )}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      {v.sd.returned && (
        <div style={{ marginTop: "16px", border: "1px dashed var(--line)", borderRadius: "8px", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Submit a revision</div>
          <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.6", color: "var(--text-mid)", maxWidth: "400px" }}>Upload the revised manuscript. It stays in this submission as attempt {v.sd.nextAttempt} and returns to the review queue — no need to start over.</p>
          {v.sd.revNoFile && (
            <button onClick={v.sd.revChoose} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Choose revised file</button>
          )}
          {v.sd.revHasFile && (
            <>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-hi)" }}>{v.sd.revFile}</div>
            {v.sd.revProcessing && (
              <>
              <div style={{ width: "100%", maxWidth: "320px", height: "2px", background: "var(--line)", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                <span style={{ position: "absolute", top: "0", bottom: "0", width: "30%", background: "var(--proc)", animation: "ocrbar 1.2s linear infinite" }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--proc)" }}>OCR running — extracting searchable text</div>
              </>
            )}
            {v.sd.revDone && (
              <>
              <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: "1px solid var(--ok)", background: "rgba(63,203,142,0.1)", color: "var(--ok)", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>OCR complete · scan indexed</span>
              <button onClick={v.sd.resubmit} style={{ height: "44px", padding: "0 24px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Resubmit for review</button>
              </>
            )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
