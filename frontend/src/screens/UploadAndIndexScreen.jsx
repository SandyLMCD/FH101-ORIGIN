import { Fragment } from "react";

export default function UploadAndIndexScreen({ v }) {
  return (
    <div data-screen-label="Upload and index" style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 20px 140px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>FH 101 digitization</div>
      <h1 style={{ margin: "8px 0 6px", fontFamily: "'Inter Tight',sans-serif", fontWeight: "600", fontSize: "34px", letterSpacing: "-0.02em", color: "var(--text-hi)" }}>Upload and index a manuscript</h1>
      <p style={{ margin: "0 0 24px", fontSize: "14px", lineHeight: "1.6", color: "var(--text-mid)" }}>Digitize an existing hardbound copy from FH 101. Publishing adds it directly to the repository.</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        {v.upSteps.map((st, idx) => (
          <Fragment key={idx}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "999px", border: `1px solid ${st.bd}`, background: st.bg, color: st.c, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{st.n}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", color: st.c }}>{st.name}</span>
              <span style={{ width: "28px", height: "1px", background: "var(--line)" }} />
            </div>
          </Fragment>
        ))}
      </div>
      {v.up0 && (
        <div style={{ border: "1px dashed var(--line)", borderRadius: "8px", padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          {v.upNoFile && (
            <>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-low)" }}>Scanned manuscript · PDF</div>
            <p style={{ margin: "0", fontSize: "14px", color: "var(--text-mid)", maxWidth: "380px" }}>Upload the scan from the flatbed queue. OCR extracts searchable text before indexing.</p>
            <button onClick={v.upChooseFile} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Choose file</button>
            </>
          )}
          {v.upHasFile && (
            <>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "var(--text-hi)" }}>{v.upFile}</div>
            {v.upOcrProcessing && (
              <>
              <div style={{ width: "100%", maxWidth: "360px", height: "2px", background: "var(--line)", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                <span style={{ position: "absolute", top: "0", bottom: "0", width: "30%", background: "var(--proc)", animation: "ocrbar 1.2s linear infinite" }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--proc)" }}>OCR running — extracting searchable text</div>
              </>
            )}
            {v.upOcrDone && (
              <>
              <span style={{ display: "inline-flex", alignItems: "center", height: "20px", padding: "0 10px", borderRadius: "999px", border: "1px solid var(--ok)", background: "rgba(63,203,142,0.1)", color: "var(--ok)", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>OCR complete · 88 pages indexed</span>
              <button onClick={v.upToStep1} style={{ height: "44px", padding: "0 24px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Continue to indexing</button>
              </>
            )}
            </>
          )}
        </div>
      )}
      {v.up1 && (
        <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {v.upMetaFields.map((fld, idx) => (
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
            <button onClick={v.upBackStep0} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Back</button>
            <button onClick={v.upToStep2} style={{ height: "36px", padding: "0 20px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Review before publishing</button>
          </div>
        </div>
      )}
      {v.up2 && (
        <div style={{ background: "var(--ink-700)", border: "1px solid var(--line)", borderRadius: "8px", padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {v.upReviewRows.map((r, idx) => (
              <Fragment key={idx}>
                <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
                  <span style={{ flex: "0 0 180px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-low)" }}>{r.label}</span>
                  <span style={{ flex: "1", fontSize: "13px", color: "var(--text-mid)", minWidth: "0", overflowWrap: "anywhere" }}>{r.value}</span>
                </div>
              </Fragment>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button onClick={v.upBackStep1} style={{ height: "36px", padding: "0 16px", background: "transparent", border: "1px solid var(--line)", borderRadius: "4px", color: "var(--text-hi)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} className="hv-2">Back</button>
            <button onClick={v.publish} style={{ height: "44px", padding: "0 24px", background: "var(--azure-500)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 8px 32px -12px rgba(46,123,255,0.55)" }}>Publish to repository</button>
          </div>
        </div>
      )}
    </div>
  );
}
