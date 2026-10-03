import { Fragment } from "react";

export default function BookmarksScreen({ v }) {
  return (
    <div data-screen-label="Bookmarks" style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Your shelf</div>
      <h1 style={{ margin: "8px 0 24px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Bookmarks</h1>
      <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "0 1 230px", minWidth: "200px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "6px" }}>Folders</div>
          {v.folderRows.map((f, idx) => (
            <Fragment key={idx}>
              <div onClick={f.pick} style={{ display: "flex", alignItems: "center", gap: "8px", minHeight: "36px", padding: "4px 10px", borderRadius: "4px", background: f.bg, cursor: "pointer", transition: "background 140ms ease-out" }} className="hv-2">
                {f.renaming && (
                  <input value={f.renameVal} onChange={f.setRenameVal} onBlur={f.commitRename} autoFocus={v.true} onClick={v.stop} style={{ flex: "1", minWidth: "0", height: "28px", background: "var(--ink-800)", border: "1px solid var(--azure-500)", borderRadius: "4px", padding: "0 8px", fontSize: "13px", color: "var(--text-hi)" }} />
                )}
                {f.notRenaming && (
                  <>
                  <span style={{ flex: "1", fontSize: "13px", color: f.c }}>{f.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "var(--text-low)" }}>{f.count}</span>
                  {f.canRename && (
                    <>
                    <button onClick={f.startRename} style={{ background: "none", border: "none", padding: "2px 4px", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-low)", cursor: "pointer" }} className="hv-6">RENAME</button>
                    <button onClick={f.del} style={{ background: "none", border: "none", padding: "2px 4px", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-low)", cursor: "pointer" }} className="hv-7">DELETE</button>
                    </>
                  )}
                  </>
                )}
              </div>
            </Fragment>
          ))}
          <button onClick={v.addFolder} style={{ marginTop: "8px", height: "36px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">+ New folder</button>
        </div>
        <div style={{ flex: "1 1 460px", minWidth: "0" }}>
          {v.hasBm && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {v.bmCards.map((item, idx) => (
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
                    <div style={{ padding: "14px", flex: "none", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }} onClick={v.stop}>
                      <select value={item.folderId} onChange={item.move} style={{ height: "28px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-mid)", fontSize: "11px", padding: "0 6px", maxWidth: "140px" }}>
                        <option value="">Unfiled</option>
                        {item.folderOpts.map((fo, idx) => (
                          <Fragment key={idx}>
                            <option value={fo.id}>{fo.name}</option>
                          </Fragment>
                        ))}
                      </select>
                      <button onClick={item.remove} style={{ height: "28px", padding: "0 10px", borderRadius: "2px", background: "transparent", border: "1px solid var(--line)", color: "var(--text-low)", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", cursor: "pointer" }} className="hv-8">REMOVE</button>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
          {v.noBm && (
            <div style={{ position: "relative", border: "1px solid var(--line)", borderRadius: "8px", padding: "72px 24px", textAlign: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "24px 24px", WebkitMaskImage: "radial-gradient(70% 80% at 50% 50%,#000 0%,transparent 100%)", maskImage: "radial-gradient(70% 80% at 50% 50%,#000 0%,transparent 100%)" }} />
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Nothing saved here</div>
                <p style={{ margin: "0", fontSize: "14px", color: "var(--text-mid)", maxWidth: "360px" }}>Save papers from the repository to build your reading list.</p>
                <button onClick={v.goRepo} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Browse repository</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
