import { Fragment } from "react";

export default function UsersAndRolesScreen({ v }) {
  return (
    <div data-screen-label="Users and roles" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>System Administrator</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Users and roles</h1>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "760px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.6fr 1.4fr 0.9fr 1.1fr", gap: "12px", padding: "0 12px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>
            <span>Name</span>
            <span>XU email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Last active</span>
          </div>
          {v.userRows.map((u, idx) => (
            <Fragment key={idx}>
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.6fr 1.4fr 0.9fr 1.1fr", gap: "12px", alignItems: "center", minHeight: "44px", padding: "4px 12px", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-hi)" }}>{u.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</span>
                <span>
                  <select value={u.role} onChange={u.setRole} style={{ height: "32px", width: "100%", maxWidth: "200px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-mid)", fontSize: "12px", padding: "0 6px" }}>
                    <option>Student</option>
                    <option>Research Coordinator</option>
                    <option>System Administrator</option>
                  </select>
                </span>
                <span>
                  <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: `1px solid ${u.stC}`, background: u.stBg, color: u.stC, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{u.stWord}</span>
                </span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{u.last}</span>
              </div>
            </Fragment>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>
    </div>
  );
}
