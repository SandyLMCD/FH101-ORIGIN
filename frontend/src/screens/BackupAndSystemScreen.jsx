import { Fragment } from "react";

export default function BackupAndSystemScreen({ v }) {
  return (
    <div data-screen-label="Backup and system" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>System Administrator</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Backup and system</h1>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 320px", minWidth: "0", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Backup</div>
          <div style={{ marginTop: "12px", fontFamily: "'JetBrains Mono',monospace", fontSize: "20px", color: "var(--text-hi)" }}>{v.lastBackup}</div>
          <div style={{ marginTop: "4px", fontSize: "13px", color: "var(--text-mid)" }}>Last successful backup</div>
          <div style={{ marginTop: "14px", display: "flex", gap: "16px", padding: "10px 0", borderTop: "1px solid var(--line-soft)" }}>
            <span style={{ flex: "0 0 110px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>Destination</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)" }}>supabase://xu-origin-backups</span>
          </div>
          <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderTop: "1px solid var(--line-soft)" }}>
            <span style={{ flex: "0 0 110px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>Schedule</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)" }}>Daily · 02:00 PHT</span>
          </div>
          {v.backing && (
            <>
            <div style={{ marginTop: "16px", height: "2px", background: "var(--line)", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
              <span style={{ position: "absolute", top: "0", bottom: "0", width: "30%", background: "var(--proc)", animation: "ocrbar 1.2s linear infinite" }} />
            </div>
            <div style={{ marginTop: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--proc)" }}>Backup running</div>
            </>
          )}
          {v.notBacking && (
            <button onClick={v.runBackup} style={{ marginTop: "16px", height: "36px", padding: "0 18px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)", transition: "background 140ms ease-out" }} className="hv-1">Run backup now</button>
          )}
        </div>
        <div style={{ flex: "1 1 280px", minWidth: "0", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Storage</div>
          <div style={{ marginTop: "12px", fontFamily: "'JetBrains Mono',monospace", fontSize: "20px", color: "var(--text-hi)" }}>
            18.4 GB{' '}
            <span style={{ fontSize: "13px", color: "var(--text-low)" }}>/ 50 GB</span>
          </div>
          <div style={{ marginTop: "12px", height: "2px", background: "var(--ink-600)", borderRadius: "2px" }}>
            <div style={{ height: "2px", background: "var(--azure-500)", borderRadius: "2px", width: "37%" }} />
          </div>
          <p style={{ margin: "12px 0 0", fontSize: "12px", lineHeight: "1.6", color: "var(--text-low)" }}>Page images and OCR text for 12 published manuscripts, plus review-queue scans.</p>
        </div>
      </div>
      <div style={{ marginTop: "24px" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "10px" }}>OCR job history</div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "720px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 0.6fr 1fr 0.8fr 1fr", gap: "12px", padding: "0 12px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>
              <span>File</span>
              <span>Pages</span>
              <span>Status</span>
              <span>Duration</span>
              <span>When</span>
            </div>
            {v.ocrJobs.map((j, idx) => (
              <Fragment key={idx}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 0.6fr 1fr 0.8fr 1fr", gap: "12px", alignItems: "center", minHeight: "44px", padding: "4px 12px", borderTop: "1px solid var(--line)", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px" }}>
                  <span style={{ color: "var(--text-mid)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{j.file}</span>
                  <span style={{ color: "var(--text-low)" }}>{j.pages}</span>
                  <span>
                    <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: `1px solid ${j.stC}`, background: j.stBg, color: j.stC, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{j.stWord}</span>
                  </span>
                  <span style={{ color: "var(--text-low)" }}>{j.dur}</span>
                  <span style={{ color: "var(--text-low)" }}>{j.when}</span>
                </div>
              </Fragment>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
