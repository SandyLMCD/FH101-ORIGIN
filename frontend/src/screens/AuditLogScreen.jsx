import { Fragment } from "react";

export default function AuditLogScreen({ v }) {
  return (
    <div data-screen-label="Audit log" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>System Administrator</div>
      <h1 style={{ margin: "8px 0 20px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Audit log</h1>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
        <select value={v.audRange} onChange={v.setAudRange} style={{ height: "32px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-mid)", fontSize: "12px", padding: "0 8px" }}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>All time</option>
        </select>
        <select value={v.audAction} onChange={v.setAudAction} style={{ height: "32px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-mid)", fontSize: "12px", padding: "0 8px" }}>
          <option>All actions</option>
          {v.audActionOpts.map((o, idx) => (
            <Fragment key={idx}>
              <option value={o.v}>{o.v}</option>
            </Fragment>
          ))}
        </select>
        <select value={v.audUser} onChange={v.setAudUser} style={{ height: "32px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-mid)", fontSize: "12px", padding: "0 8px" }}>
          <option>All users</option>
          {v.audUserOpts.map((o, idx) => (
            <Fragment key={idx}>
              <option value={o.v}>{o.v}</option>
            </Fragment>
          ))}
        </select>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{v.audCount}</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "820px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 0.9fr 0.9fr 1.4fr 1.5fr 0.8fr", gap: "12px", padding: "0 12px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>
            <span>Time</span>
            <span>User</span>
            <span>Role</span>
            <span>Action</span>
            <span>Paper</span>
            <span>IP</span>
          </div>
          {v.audRows.map((r, idx) => (
            <Fragment key={idx}>
              <div style={{ display: "grid", gridTemplateColumns: "0.9fr 0.9fr 0.9fr 1.4fr 1.5fr 0.8fr", gap: "12px", alignItems: "center", minHeight: "44px", padding: "4px 12px", borderTop: "1px solid var(--line)", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px" }}>
                <span style={{ color: "var(--text-low)" }}>{r.ts}</span>
                <span style={{ color: "var(--text-mid)" }}>{r.user}</span>
                <span style={{ color: "var(--text-low)" }}>{r.role}</span>
                <span style={{ color: "var(--text-hi)" }}>{r.action}</span>
                <span style={{ color: "var(--text-mid)" }}>{r.code}</span>
                <span style={{ color: "var(--text-low)" }}>{r.ip}</span>
              </div>
            </Fragment>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>
      <div style={{ marginTop: "24px" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "10px" }}>Papers accessed</div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "680px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.4fr 0.7fr 0.9fr 0.9fr", gap: "12px", padding: "0 12px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>
              <span>Paper</span>
              <span>Title</span>
              <span>Views</span>
              <span>Unique users</span>
              <span>Last access</span>
            </div>
            {v.paperAccess.map((p, idx) => (
              <Fragment key={idx}>
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.4fr 0.7fr 0.9fr 0.9fr", gap: "12px", alignItems: "center", minHeight: "44px", padding: "4px 12px", borderTop: "1px solid var(--line)", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px" }}>
                  <span style={{ color: "var(--text-mid)" }}>{p.code}</span>
                  <span style={{ color: "var(--text-hi)", fontFamily: "Inter,sans-serif", fontSize: "13px", fontWeight: "500" }}>{p.title}</span>
                  <span style={{ color: "var(--text-mid)" }}>{p.n}</span>
                  <span style={{ color: "var(--text-low)" }}>{p.users}</span>
                  <span style={{ color: "var(--text-low)" }}>{p.last}</span>
                </div>
              </Fragment>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "24px", maxWidth: "520px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Access analytics</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={v.audWeekBtn.pick} style={{ height: "24px", padding: "0 10px", borderRadius: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer", background: v.audWeekBtn.bg, border: `1px solid ${v.audWeekBtn.bd}`, color: v.audWeekBtn.c }}>{v.audWeekBtn.name}</button>
            <button onClick={v.audMonthBtn.pick} style={{ height: "24px", padding: "0 10px", borderRadius: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer", background: v.audMonthBtn.bg, border: `1px solid ${v.audMonthBtn.bd}`, color: v.audMonthBtn.c }}>{v.audMonthBtn.name}</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {v.audBars.map((b, idx) => (
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
  );
}
