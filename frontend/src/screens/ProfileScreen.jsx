import { Fragment } from "react";

export default function ProfileScreen({ v }) {
  return (
    <div data-screen-label="Profile" style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Account</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Profile</h1>
      <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span style={{ flex: "0 0 130px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>Name</span>
            <span style={{ fontSize: "13px", color: "var(--text-hi)" }}>Sandy Villarin</span>
          </div>
          <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span style={{ flex: "0 0 130px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>XU email</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-mid)" }}>svillarin@my.xu.edu.ph</span>
          </div>
          <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span style={{ flex: "0 0 130px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>Program</span>
            <span style={{ fontSize: "13px", color: "var(--text-mid)" }}>BS Information Technology</span>
          </div>
          <div style={{ display: "flex", gap: "16px", padding: "10px 0" }}>
            <span style={{ flex: "0 0 130px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-low)" }}>Year level</span>
            <span style={{ fontSize: "13px", color: "var(--text-mid)" }}>4th Year</span>
          </div>
        </div>
        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>What this account can do</div>
          <p style={{ margin: "10px 0 0", fontSize: "13px", lineHeight: "1.7", color: "var(--text-mid)" }}>Search and read every published manuscript, generate citations and export them to Zotero, bookmark papers into folders, and submit your own work for review by your adviser or the Research Coordinator. Reading is view-only — pages are streamed as images and are not downloadable.</p>
        </div>
        <button onClick={v.signOut} style={{ marginTop: "20px", height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Sign out</button>
      </div>
    </div>
  );
}
