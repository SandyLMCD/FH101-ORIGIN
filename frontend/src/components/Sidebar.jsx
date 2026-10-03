import { Fragment } from "react";

export default function Sidebar({ v }) {
  return (
    <div data-sidebar="" style={{ position: "fixed", left: "0", top: "0", bottom: "0", width: "220px", zIndex: "40", background: "var(--ink-800)", borderRight: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "2px", padding: "18px 12px", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 8px 14px" }}>
        <button aria-label="Back" onClick={v.back} style={{ width: "28px", height: "28px", flex: "none", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: v.backColor, fontSize: "14px", cursor: "pointer", lineHeight: "1", padding: "0" }}>‹</button>
        <button onClick={v.goHome} style={{ background: "none", border: "none", padding: "0", display: "flex", alignItems: "baseline", gap: "6px", cursor: "pointer" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", color: "var(--text-low)" }}>FH101</span>
          <span style={{ fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "16px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>ORIGIN</span>
        </button>
      </div>
      <nav data-sidenav="" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {v.navItems.map((item, idx) => (
          <Fragment key={idx}>
            <button onClick={item.go} style={{ flex: "none", textAlign: "left", minHeight: "36px", padding: "8px 10px", background: item.bg, border: "none", borderRadius: "4px", color: item.color, fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "background 140ms ease-out,color 140ms ease-out" }} className="hv-5">{item.name}</button>
          </Fragment>
        ))}
      </nav>
      <span style={{ flex: "1" }} />
      <button onClick={v.toggleTheme} style={{ flex: "none", textAlign: "left", minHeight: "32px", padding: "6px 10px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-low)", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "color 140ms ease-out" }} className="hv-5">{v.themeLabel}</button>
      <button onClick={v.signOut} style={{ flex: "none", textAlign: "left", minHeight: "36px", padding: "8px 10px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer", marginTop: "6px", transition: "background 140ms ease-out" }} className="hv-2">Sign out</button>
      <div style={{ padding: "12px 10px 0" }}>
        <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-hi)" }}>{v.userName}</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-low)" }}>{v.roleTag}</div>
      </div>
    </div>
  );
}
