import { Fragment } from "react";

export default function SubmitYourPaperScreen({ v }) {
  return (
    <div data-screen-label="Submit your paper" style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Self-submission</div>
      <h1 style={{ margin: "8px 0 6px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Submit your paper</h1>
      <p style={{ margin: "0 0 24px", fontSize: "14px", lineHeight: "1.6", color: "var(--text-mid)" }}>Your adviser or the Research Coordinator reviews every submission before it is published to the repository.</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        {v.subSteps.map((st, idx) => (
          <Fragment key={idx}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "999px", border: `1px solid ${st.bd}`, background: st.bg, color: st.c, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{st.n}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", color: st.c }}>{st.name}</span>
              <span style={{ width: "28px", height: "1px", background: "var(--line)" }} />
            </div>
          </Fragment>
        ))}
      </div>
      {v.sub0 && (
        <div style={{ border: "1px dashed var(--line)", borderRadius: "8px", padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          {v.noFile && (
            <>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Scanned manuscript · PDF</div>
            <p style={{ margin: "0", fontSize: "14px", color: "var(--text-mid)", maxWidth: "380px" }}>Upload the full scanned manuscript. OCR will extract searchable text automatically.</p>
            <button onClick={v.chooseFile} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Choose file</button>
            </>
          )}
          {v.hasFile && (
            <>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-hi)" }}>{v.subFile}</div>
            {v.ocrProcessing && (
              <>
              <div style={{ width: "100%", maxWidth: "360px", height: "2px", background: "var(--line)", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                <span style={{ position: "absolute", top: "0", bottom: "0", width: "30%", background: "var(--proc)", animation: "ocrbar 1.2s linear infinite" }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--proc)" }}>OCR running — extracting searchable text</div>
              </>
            )}
            {v.ocrDone && (
              <>
              <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: "1px solid var(--ok)", background: "rgba(63,203,142,0.1)", color: "var(--ok)", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>OCR complete · 96 pages indexed</span>
              <button onClick={v.toStep1} style={{ height: "44px", padding: "0 24px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Continue to metadata</button>
              </>
            )}
            </>
          )}
        </div>
      )}
      {v.sub1 && (
        <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {v.metaFields.map((fld, idx) => (
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
                {fld.isArea && (
                  <textarea value={fld.value} onChange={fld.onChange} rows="5" style={{ background: "var(--ink-800)", border: "1px solid var(--line)", borderRadius: "4px", padding: "10px 12px", fontSize: "14px", color: "var(--text-hi)", fontFamily: "Inter,sans-serif", resize: "vertical" }} />
                )}
              </div>
            </Fragment>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button onClick={v.backStep0} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Back</button>
            <button onClick={v.toStep2} style={{ height: "36px", padding: "0 20px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Continue to review</button>
          </div>
        </div>
      )}
      {v.sub2 && (
        <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {v.reviewRows.map((r, idx) => (
              <Fragment key={idx}>
                <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
                  <span style={{ flex: "0 0 180px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-low)" }}>{r.label}</span>
                  <span style={{ flex: "1", fontSize: "13px", color: "var(--text-mid)", minWidth: "0", overflowWrap: "anywhere" }}>{r.value}</span>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ margin: "16px 0 0", fontSize: "13px", lineHeight: "1.6", color: "var(--text-low)" }}>Submitting sends this to your adviser and the Research Coordinator for review. You can track the status under My submissions.</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button onClick={v.backStep1} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Back</button>
            <button onClick={v.submitPaper} style={{ height: "44px", padding: "0 24px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Submit for review</button>
          </div>
        </div>
      )}
    </div>
  );
}
