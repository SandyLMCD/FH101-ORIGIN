/**
 * Accession key generator:  [THE/CAP] - [PROGRAM CODE] - [UNIQUE KEY] - [PUBLICATION YEAR]
 * Program codes: 0100 CS, 0200 IT, 0300 IS, 0400 EMC.
 */
function nextAccessionCode({ kind = 'CAP', program, sy, programCodes, existingCount }) {
  const yr = (sy || '2019–2020').slice(-4);
  const codeP = programCodes[program] || '0100';
  const n = String(150 + existingCount).padStart(4, '0');
  return `${kind}-${codeP}-${n}-${yr}`;
}

module.exports = { nextAccessionCode };
