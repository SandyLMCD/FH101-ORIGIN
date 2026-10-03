import { Fragment } from "react";

export default function LandingScreen({ v }) {
  return (
    <div data-screen-label="Landing" data-theme="dark" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "var(--ink-900)" }}>
      <div style={{ position: "absolute", inset: "0", background: "radial-gradient(120% 70% at 50% 108%,#9FD2FF 0%,#2E7BFF 28%,#04070F 68%)", opacity: "0.8" }} />
      <div style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "24px 24px", WebkitMaskImage: "radial-gradient(80% 70% at 50% 28%,#000 0%,transparent 100%)", maskImage: "radial-gradient(80% 70% at 50% 28%,#000 0%,transparent 100%)" }} />
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 20px 96px", textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Xavier University – Ateneo de Cagayan · College of Computer Studies</div>
        <h1 style={{ margin: "24px 0 0", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "clamp(34px,6vw,64px)", letterSpacing: "-0.03em", color: "var(--text-hi)", lineHeight: "1.06", maxWidth: "840px", textWrap: "balance" }}>
          The FH 101 archive,{' '}
          <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: "400", color: "var(--glow)" }}>unlocked and indexed</em>
          .
        </h1>
        <p style={{ margin: "20px 0 0", fontSize: "14px", lineHeight: "1.6", color: "var(--text-mid)", maxWidth: "520px" }}>ORIGIN is the searchable repository of CCS thesis and capstone manuscripts. The hardbound originals stay on the shelf — the full text lives here, indexed and citable.</p>
        <div style={{ marginTop: "40px", width: "100%", maxWidth: "380px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px", textAlign: "left", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>XU email</label>
            <input placeholder="you@my.xu.edu.ph" style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 12px", fontSize: "14px", color: "var(--text-hi)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Password</label>
            <input type="password" placeholder="••••••••" style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 12px", fontSize: "14px", color: "var(--text-hi)" }} />
          </div>
          <button onClick={v.signIn} style={{ height: "44px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)", transition: "background 140ms ease-out" }} className="hv-1">Sign in</button>
          <div style={{ height: "1px", background: "var(--line)", margin: "4px 0" }} />
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Demo — browse as</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={v.demoStudent} style={{ flex: "1", height: "36px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "12px", fontWeight: "500", cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">Student</button>
            <button onClick={v.demoCoord} style={{ flex: "1", height: "36px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "12px", fontWeight: "500", cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">Coordinator</button>
            <button onClick={v.demoAdmin} style={{ flex: "1", height: "36px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "12px", fontWeight: "500", cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">Admin</button>
          </div>
        </div>
        <div style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-mid)" }}>
          No account yet?{' '}
          <button onClick={v.goRegister} style={{ background: "none", border: "none", padding: "0", color: "var(--azure-400)", fontSize: "13px", cursor: "pointer", textDecoration: "none" }} className="hv-3">Register with your XU email</button>
        </div>
      </div>
    </div>
  );
}
