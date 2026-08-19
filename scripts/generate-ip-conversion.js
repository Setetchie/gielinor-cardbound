const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const runtimePath = path.join(root, 'test-results', 'ip-inventory.json');
const ledgerPath = path.join(root, 'data', 'ip-conversion.json');
const productionExtensions = new Set(['.js', '.html', '.css', '.json']);
const excludedRoots = new Set(['.git', 'node_modules', 'test-results', 'validation-artifacts', 'coordination']);
const legacyTerms = ['Gielinor', 'RuneScape', 'OSRS', 'Jagex'];
const uiTerms = ['Bank', 'Forge', 'Activities', 'Fragments', 'Prismatic Essence', 'Star Fragments', 'Vault', 'Bindery', 'Ventures'];

if (!fs.existsSync(runtimePath)) throw new Error(`Missing runtime inventory: ${runtimePath}`);
const runtime = JSON.parse(fs.readFileSync(runtimePath, 'utf8'));
const previous = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

function sourceFiles(directory = root) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedRoots.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(full));
    else if (productionExtensions.has(path.extname(entry.name).toLowerCase()) && full !== ledgerPath) files.push(full);
  }
  return files.sort();
}

const sources = sourceFiles().map(file => ({
  file: path.relative(root, file).replaceAll('\\', '/'),
  text: fs.readFileSync(file, 'utf8')
}));

function occurrences(terms) {
  return terms.map(term => {
    const pattern = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const files = [];
    let count = 0;
    for (const source of sources) {
      const matches = source.text.match(pattern);
      if (!matches) continue;
      count += matches.length;
      files.push(source.file);
    }
    return { term, count, files };
  }).filter(item => item.count > 0);
}

const assetMap = new Map();
for (const source of sources) {
  for (const match of source.text.matchAll(/https?:\/\/[^\s'"`)]+/g)) {
    const url = match[0].replace(/[.,;]+$/, '');
    if (!assetMap.has(url)) assetMap.set(url, new Set());
    assetMap.get(url).add(source.file);
  }
}
for (const url of runtime.externalAssets || []) {
  if (!assetMap.has(url)) assetMap.set(url, new Set());
  assetMap.get(url).add('runtime:C.image');
}

const entries = runtime.entries
  .filter(entry => entry.legacyId !== '__prototype_inventory_pending__')
  .sort((a, b) => a.domain.localeCompare(b.domain) || a.legacyId.localeCompare(b.legacyId));
const ids = entries.map(entry => entry.legacyId);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate legacyId values in generated ledger');
for (const entry of entries) {
  for (const field of ['legacyId', 'legacyName', 'domain', 'artStatus', 'codeStatus', 'clearanceStatus']) {
    if (entry[field] == null || entry[field] === '') throw new Error(`Entry ${entry.legacyId} lacks ${field}`);
  }
}

const domainCounts = Object.fromEntries([...new Set(entries.map(entry => entry.domain))].sort().map(domain => [domain, entries.filter(entry => entry.domain === domain).length]));
const ledger = {
  schemaVersion: 2,
  status: 'active',
  purpose: 'Authoritative mapping from prototype-only content to original Cardbound production content.',
  generatedBy: 'scripts/generate-ip-conversion.js',
  rules: previous.rules,
  summary: {
    runtimeCards: runtime.cardCount,
    runtimeActivities: runtime.activityCount,
    runtimePacks: runtime.packCount,
    ledgerEntries: entries.length,
    domainCounts,
    externalUrls: assetMap.size,
    legacyTermFindings: occurrences(legacyTerms).reduce((sum, item) => sum + item.count, 0)
  },
  entries,
  sourceAudit: {
    scannedFiles: sources.length,
    legacyTerms: occurrences(legacyTerms),
    uiTerminology: occurrences(uiTerms),
    externalAssets: [...assetMap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([url, files]) => ({ url, files: [...files].sort(), status: 'unreviewed' }))
  },
  originalVerticalSlice: previous.originalVerticalSlice
};

fs.writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
console.log(JSON.stringify(ledger.summary, null, 2));
