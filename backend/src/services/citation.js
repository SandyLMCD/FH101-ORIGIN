/**
 * Citation module — builds reference strings for a paper in several styles.
 * Moved verbatim from the prototype's `citeStr` so the output matches the UI.
 */
const FORMATS = ['APA 7', 'IEEE', 'Harvard', 'MLA'];

function splitNames(authors) {
  return authors.map((n) => {
    const parts = n.split(' ');
    const last = parts.pop();
    return { last, first: parts.join(' '), init: parts.map((w) => w.charAt(0) + '.').join(' ') };
  });
}

function cite(paper, fmt = 'APA 7') {
  const yr = paper.sy.slice(-4);
  const kind = paper.code.indexOf('THE') === 0 ? 'Undergraduate thesis' : 'Capstone project';
  const names = splitNames(paper.authors);

  if (fmt === 'APA 7') {
    const a = names.map((n) => n.last + ', ' + n.init);
    const s = a.length > 1 ? a.slice(0, -1).join(', ') + ', & ' + a[a.length - 1] : a[0];
    return s + ' (' + yr + '). ' + paper.title + ' [' + kind + ']. Xavier University – Ateneo de Cagayan.';
  }
  if (fmt === 'IEEE') {
    return names.map((n) => n.init + ' ' + n.last).join(', ') + ', "' + paper.title + '," ' + kind +
      ', Xavier Univ. – Ateneo de Cagayan, Cagayan de Oro, Philippines, ' + yr + '.';
  }
  if (fmt === 'Harvard') {
    return names.map((n) => n.last + ', ' + n.init).join(', ') + ' (' + yr + ') ' + paper.title + '. ' + kind +
      '. Cagayan de Oro: Xavier University – Ateneo de Cagayan.';
  }
  // MLA
  const f = names[0];
  return f.last + ', ' + f.first + (names.length > 1 ? ', et al.' : '') + ' ' + paper.title + '. ' + yr +
    '. Xavier University – Ateneo de Cagayan, ' + kind.toLowerCase() + '.';
}

/** Minimal CSL-JSON record, which Zotero can import directly. */
function toCslJson(paper) {
  return {
    id: paper.code,
    type: paper.code.startsWith('THE') ? 'thesis' : 'report',
    title: paper.title,
    author: splitNames(paper.authors).map((n) => ({ family: n.last, given: n.first })),
    issued: { 'date-parts': [[Number(paper.sy.slice(-4))]] },
    publisher: 'Xavier University – Ateneo de Cagayan',
    'publisher-place': 'Cagayan de Oro, Philippines',
    genre: paper.code.startsWith('THE') ? 'Undergraduate thesis' : 'Capstone project',
    keyword: paper.keywords.join(', '),
  };
}

module.exports = { FORMATS, cite, toCslJson };
