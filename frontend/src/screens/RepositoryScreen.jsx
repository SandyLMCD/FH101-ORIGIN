import { Fragment } from "react";

export default function RepositoryScreen({ v }) {
  return (
    <div data-screen-label="Repository" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>CCS knowledge repository</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Repository</h1>
      <input value={v.q} onChange={v.setQ} placeholder="Search title, author, or keyword…" style={{ width: "100%", height: "56px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 20px", fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", color: "var(--text-hi)" }} />
      <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {v.facets.map((f, idx) => (
          <Fragment key={idx}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ flex: "none", width: "132px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>{f.label}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", flex: "1", minWidth: "240px" }}>
                {f.opts.map((o, idx) => (
                  <Fragment key={idx}>
                    <button onClick={o.pick} style={{ height: "26px", padding: "0 10px", borderRadius: "2px", fontSize: "12px", cursor: "pointer", background: o.bg, border: `1px solid ${o.bd}`, color: o.c, transition: "border-color 140ms ease-out" }} className="hv-4">{o.name}{o.x}</button>
                  </Fragment>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ margin: "22px 0 12px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{v.resultCount}</span>
        {v.anyActive && (
          <button onClick={v.clearAll} style={{ background: "none", border: "none", padding: "0", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", color: "var(--azure-400)", cursor: "pointer" }} className="hv-3">CLEAR FILTERS ×</button>
        )}
        <span style={{ flex: "1" }} />
        <select value={v.sort} onChange={v.setSort} style={{ height: "32px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-mid)", fontSize: "12px", padding: "0 8px" }}>
          <option>Newest first</option>
          <option>Oldest first</option>
          <option>Title A–Z</option>
          <option>Most accessed</option>
        </select>
      </div>
      {v.hasResults && (
        <>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {v.cards.map((item, idx) => (
            <Fragment key={idx}>
              <div onClick={item.open} style={{ display: "flex", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden", cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">
                <div style={{ width: "40px", flex: "none", borderRight: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>
                  <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", color: "var(--text-low)", whiteSpace: "nowrap" }}>{item.code}</span>
                </div>
                <div style={{ flex: "1", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                  <div style={{ fontSize: "16px", fontWeight: "500", color: "var(--text-hi)", lineHeight: "1.35", textWrap: "pretty" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-mid)" }}>{item.authorsStr}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)", lineHeight: "1.5" }}>{item.meta}</div>
                </div>
                <div style={{ padding: "14px", flex: "none" }} onClick={v.stop}>
                  <button onClick={item.toggleBm} style={{ height: "28px", padding: "0 10px", borderRadius: "2px", background: item.bmBg, border: `1px solid ${item.bmBorder}`, color: item.bmColor, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", cursor: "pointer", transition: "border-color 140ms ease-out" }}>{item.bmLabel}</button>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        {v.hasPages && (
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>{v.pageInfo}</span>
            <span style={{ flex: "1" }} />
            <button onClick={v.prevPage} aria-label="Previous page" style={{ width: "32px", height: "32px", background: "transparent", border: "1px solid var(--line)", borderRadius: "2px", color: "var(--text-mid)", cursor: "pointer", fontSize: "13px", padding: "0" }} className="hv-2">‹</button>
            {v.pageBtns.map((p, idx) => (
              <Fragment key={idx}>
                <button onClick={p.pick} style={{ minWidth: "32px", height: "32px", padding: "0 8px", borderRadius: "2px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", cursor: "pointer", background: p.bg, border: `1px solid ${p.bd}`, color: p.c }}>{p.n}</button>
              </Fragment>
            ))}
            <button onClick={v.nextPage} aria-label="Next page" style={{ width: "32px", height: "32px", background: "transparent", border: "1px solid var(--line)", borderRadius: "2px", color: "var(--text-mid)", cursor: "pointer", fontSize: "13px", padding: "0" }} className="hv-2">›</button>
          </div>
        )}
        </>
      )}
      {v.noResults && (
        <div style={{ position: "relative", border: "1px solid var(--line)", borderRadius: "8px", padding: "72px 24px", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "24px 24px", WebkitMaskImage: "radial-gradient(70% 80% at 50% 50%,#000 0%,transparent 100%)", maskImage: "radial-gradient(70% 80% at 50% 50%,#000 0%,transparent 100%)" }} />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>No matches</div>
            <p style={{ margin: "0", fontSize: "14px", color: "var(--text-mid)", maxWidth: "380px" }}>Nothing in the index matches that search — try fewer words or clear the filters.</p>
            <button onClick={v.clearEverything} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Clear search{' '} &amp; {' '}filters</button>
          </div>
        </div>
      )}
      <div style={{ marginTop: "24px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Coverage: manuscripts digitized through 2021 · records added as digitization continues</div>
    </div>
  );
}
