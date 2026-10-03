import { Fragment } from "react";

export default function SubmissionReviewScreen({ v }) {
  return (
    <div data-screen-label="Submission review" style={{ maxWidth: "1060px", margin: "0 auto", padding: "32px 20px 140px" }}>
      <button onClick={v.back} style={{ background: "none", border: "none", padding: "0", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-low)", cursor: "pointer" }} className="hv-5">‹ BACK TO QUEUE</button>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ minWidth: "0", flex: "1 1 480px" }}>
          <h1 style={{ margin: "0", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "26px", letterSpacing: "-0.02em", color: "var(--text-hi)", lineHeight: "1.25", textWrap: "pretty" }}>{v.rv.title}</h1>
          <div style={{ marginTop: "6px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-low)" }}>Submitted by {v.rv.submitter} · {v.rv.date}</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: `1px solid ${v.rv.stC}`, background: v.rv.stBg, color: v.rv.stC, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{v.rv.stWord}</span>
      </div>
      <div style={{ marginTop: "20px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px 16px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <button onClick={v.rv.approve} style={{ height: "36px", padding: "0 18px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)", transition: "background 140ms ease-out" }} className="hv-1">Approve and publish</button>
        <button onClick={v.rv.openReturn} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--stop)", borderRadius: "4px", color: "var(--stop)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-9">Return for revision</button>
        <span style={{ flex: "1" }} />
        <button onClick={v.rv.toggleEdit} style={{ background: "none", border: "none", padding: "0", fontSize: "13px", fontWeight: "500", color: "var(--azure-400)", cursor: "pointer" }} className="hv-3">{v.rv.editLabel}</button>
      </div>
      {v.rv.remarksOpen && (
        <div style={{ marginTop: "12px", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Remarks to the student</label>
          <textarea value={v.rv.remarks} onChange={v.rv.setRemarks} rows="3" placeholder="Name what needs to change before this can be published…" style={{ background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "10px 12px", fontSize: "14px", color: "var(--text-hi)", fontFamily: "Inter,sans-serif", resize: "vertical" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={v.rv.sendReturn} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--stop)", borderRadius: "4px", color: "var(--stop)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-9">Return submission</button>
            <button onClick={v.rv.cancelReturn} style={{ background: "none", border: "none", padding: "0 8px", fontSize: "13px", color: "var(--text-low)", cursor: "pointer" }} className="hv-5">Cancel</button>
          </div>
        </div>
      )}
      <div style={{ marginTop: "20px", display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 460px", minWidth: "0", background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "10px" }}>Submitted metadata</div>
          {v.rv.notEditing && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {v.rv.rows.map((r, idx) => (
                <Fragment key={idx}>
                  <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
                    <span style={{ flex: "0 0 150px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-low)" }}>{r.label}</span>
                    <span style={{ flex: "1", fontSize: "13px", color: "var(--text-mid)", minWidth: "0", overflowWrap: "anywhere" }}>{r.value}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
          {v.rv.editing && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {v.rv.fields.map((fld, idx) => (
                <Fragment key={idx}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>{fld.label}</label>
                    {fld.isText && (
                      <input value={fld.value} onChange={fld.onChange} style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 12px", fontSize: "14px", color: "var(--text-hi)" }} />
                    )}
                    {fld.isSelect && (
                      <select value={fld.value} onChange={fld.onChange} style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 8px", fontSize: "14px", color: "var(--text-hi)" }}>
                        {fld.options.map((o, idx) => (
                          <Fragment key={idx}>
                            <option value={o.v}>{o.v}</option>
                          </Fragment>
                        ))}
                      </select>
                    )}
                    {fld.showOther && (
                      <input value={fld.otherValue} onChange={fld.onOtherChange} placeholder="Type your area of research…" style={{ height: "40px", background: "var(--ink-800)", border: "1px solid var(--azure-500)", borderRadius: "4px", padding: "0 12px", fontSize: "14px", color: "var(--text-hi)" }} />
                    )}
                  </div>
                </Fragment>
              ))}
              <div style={{ fontSize: "12px", color: "var(--text-low)", lineHeight: "1.6" }}>Corrections apply to indexing only — the manuscript scan is untouched.</div>
            </div>
          )}
        </div>
        <div style={{ flex: "0 1 340px", minWidth: "260px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)", marginBottom: "10px" }}>Manuscript preview</div>
          <div style={{ background: "var(--paper)", boxShadow: "0 2px 24px rgba(0,0,0,0.35)", padding: "10% 11% 7%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#9AA1AC" }}>
              <span>SCAN</span>
              <span>P.1</span>
            </div>
            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "7px" }}>
              {v.rv.previewLines.map((l, idx) => (
                <Fragment key={idx}>
                  <div style={{ height: "8px", borderRadius: "2px", background: "#DEE2EA", width: l.w }} />
                </Fragment>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-low)" }}>PREVIEW · PAGE 1 OF 96 · VIEW-ONLY</div>
        </div>
      </div>
    </div>
  );
}
