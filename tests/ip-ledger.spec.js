const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('IP conversion ledger covers runtime registries and audit schema', async ({ page }) => {
  const ledger = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'ip-conversion.json'), 'utf8'));
  await page.goto('/?test=ip-ledger');
  await page.waitForLoadState('load');
  await page.waitForFunction(() => typeof C !== 'undefined' && typeof A !== 'undefined' && typeof packs !== 'undefined');
  const runtime = await page.evaluate(() => ({
    cardIds: C.map(card => card.id),
    activityIds: A.map(activity => activity.id),
    packIds: Object.keys(packs).map(id => `pack:${id}`)
  }));
  const ids = ledger.entries.map(entry => entry.legacyId);
  expect(ledger.schemaVersion).toBe(2);
  expect(ids).not.toContain('__prototype_inventory_pending__');
  expect(new Set(ids).size).toBe(ids.length);
  expect(ledger.summary.runtimeCards).toBe(runtime.cardIds.length);
  expect(ledger.summary.runtimeActivities).toBe(runtime.activityIds.length);
  expect(ledger.summary.runtimePacks).toBe(runtime.packIds.length);
  for (const id of [...runtime.cardIds, ...runtime.activityIds, ...runtime.packIds]) expect(ids).toContain(id);
  for (const entry of ledger.entries) {
    expect(entry).toMatchObject({
      replacementId: null,
      replacementName: null,
      replacementConcept: null,
      artStatus: 'needed',
      codeStatus: 'legacy',
      clearanceStatus: 'unreviewed'
    });
  }
  expect(ledger.sourceAudit.scannedFiles).toBeGreaterThan(20);
  expect(Array.isArray(ledger.sourceAudit.externalAssets)).toBe(true);
  expect(Array.isArray(ledger.sourceAudit.legacyTerms)).toBe(true);
  expect(Array.isArray(ledger.sourceAudit.uiTerminology)).toBe(true);
});
