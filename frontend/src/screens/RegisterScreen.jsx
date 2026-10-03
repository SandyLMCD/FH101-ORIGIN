import { Fragment } from "react";

export default function RegisterScreen({ v }) {
  return (
    <div data-screen-label="Register" data-theme="dark" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 20px", background: "var(--ink-900)" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>FH101 · Origin</div>
      <h1 style={{ margin: "12px 0 0", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Create your account</h1>
      <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "1.6", color: "var(--text-mid)", maxWidth: "420px", textAlign: "center" }}>Registration is open to CCS students with an active XU email address.</p>
      <div style={{ marginTop: "32px", width: "100%", maxWidth: "400px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Full name</label>
          <input placeholder="Juan D. Dela Cruz" style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 12px", fontSize: "14px", color: "var(--text-hi)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>XU email</label>
          <input placeholder="you@my.xu.edu.ph" style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 12px", fontSize: "14px", color: "var(--text-hi)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Program</label>
          <select style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 8px", fontSize: "14px", color: "var(--text-hi)" }}>
            <option>BS Computer Science</option>
            <option>BS Information Technology</option>
            <option>BS Information Systems</option>
            <option>BS Entertainment{' '} &amp; {' '}Multimedia Computing</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Year level</label>
          <select style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 8px", fontSize: "14px", color: "var(--text-hi)" }}>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
        <button onClick={v.createAccount} style={{ height: "44px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Create account</button>
      </div>
      <div style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-mid)" }}>
        Already registered?{' '}
        <button onClick={v.goLanding} style={{ background: "none", border: "none", padding: "0", color: "var(--azure-400)", fontSize: "13px", cursor: "pointer" }}>Back to sign in</button>
      </div>
    </div>
  );
}
