const { test, expect } = require('@playwright/test');

async function fresh(page){
  await page.goto('/?test=1');
  await page.evaluate(() => localStorage.removeItem('cardbound'));
  await page.reload();
  await expect(page.locator('#app')).toBeVisible();
}

test('app boots and exposes core globals', async ({ page }) => {
  await fresh(page);
  const core = await page.evaluate(() => ({
    cards: typeof C !== 'undefined' && C.length,
    activities: typeof A !== 'undefined' && A.length,
    render: typeof render,
    settleIdle: typeof settleIdle,
    startIdle: typeof startIdle,
    version: window.CARDBOUND_VERSION
  }));
  expect(core.cards).toBeGreaterThan(50);
  expect(core.activities).toBeGreaterThan(20);
  expect(core.render).toBe('function');
  expect(core.settleIdle).toBe('function');
  expect(core.startIdle).toBe('function');
  expect(core.version).toBeTruthy();
});

test('home shows grouped combat and skilling including Sailing', async ({ page }) => {
  await fresh(page);
  await expect(page.getByText(/Combat Skills/i)).toBeVisible();
  await expect(page.getByText(/Sailing/i).first()).toBeVisible();
});

test('Activity > Skilling > Sailing navigation works', async ({ page }) => {
  await fresh(page);
  await page.getByRole('button', { name: /Activity/i }).last().click();
  await page.getByRole('button', { name: /Skilling/i }).first().click();
  const sailing = page.getByRole('button', { name: /Sailing/i }).first();
  await expect(sailing).toBeVisible();
  await sailing.click();
  await expect(page.getByText(/Choose a Sailing method/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /Port Tasks/i })).toBeVisible();
});

test('Sailing has actions and starter route is represented', async ({ page }) => {
  await fresh(page);
  const data = await page.evaluate(() => ({
    sailingSkill: s.skills?.Sailing,
    sailingActions: A.filter(a => a.kind === 'Sailing').length,
    categories: [...new Set(A.filter(a => a.kind === 'Sailing').map(a => a.sailingCategory))]
  }));
  expect(data.sailingSkill).toBeGreaterThanOrEqual(1);
  expect(data.sailingActions).toBeGreaterThan(5);
  expect(data.categories).toContain('Port Tasks');
});

test('idle settlement awards points and advances progress', async ({ page }) => {
  await fresh(page);
  const result = await page.evaluate(() => {
    const a = A.find(x => x.id === 'normal_tree') || A.find(x => x.kind === 'Woodcutting');
    s.owned[a.id] = Math.max(1, s.owned[a.id] || 0);
    s.skills[a.kind] = Math.max(s.skills[a.kind] || 1, 99);
    const before = s.points;
    s.idle = { activityId: a.id, lastTick: Date.now() - cycleSeconds(a) * 2100, totalPoints: 0 };
    const g = settleIdle(false);
    return { before, after: s.points, cycles: g.cycles, points: g.points };
  });
  expect(result.cycles).toBeGreaterThanOrEqual(2);
  expect(result.points).toBeGreaterThan(0);
  expect(result.after).toBeGreaterThan(result.before);
});

test('next unlock helper finds a higher level activity', async ({ page }) => {
  await fresh(page);
  const r = await page.evaluate(() => {
    const skill = 'Woodcutting';
    s.skills[skill] = 1;
    return A.filter(a => a.kind === skill)
      .map(a => ({ name: a.name, req: typeof need === 'function' ? need(a) : (a.reqLevel || 1) }))
      .filter(x => x.req > 1)
      .sort((a,b) => a.req-b.req)[0];
  });
  expect(r).toBeTruthy();
  expect(r.req).toBeGreaterThan(1);
});

test('bank renders equipment and loadout presets', async ({ page }) => {
  await fresh(page);
  await page.getByRole('button', { name: /Bank/i }).last().click();
  await expect(page.getByText(/Worn Equipment/i)).toBeVisible();
  await expect(page.getByText(/Loadout Presets|Saved Equipment/i)).toBeVisible();
  const fn = await page.evaluate(() => typeof window.cbSaveLoadoutPreset);
  expect(fn).toBe('function');
});

test('collection supports missing-card search filters', async ({ page }) => {
  await fresh(page);
  await page.getByRole('button', { name: /Collection/i }).last().click();
  await expect(page.getByPlaceholder(/Search every card/i)).toBeVisible();
  await expect(page.locator('select').filter({ hasText: /Missing/ }).first()).toBeVisible();
});

test('pack definitions are valid probability distributions', async ({ page }) => {
  await fresh(page);
  const result = await page.evaluate(() => Object.entries(packs).map(([name,p]) => ({name, sum:p.o.reduce((a,b)=>a+b,0), n:p.n, cost:p.cost})));
  for(const p of result){
    expect(Math.abs(p.sum - 100)).toBeLessThan(0.001);
    expect(p.n).toBeGreaterThan(0);
    expect(p.cost).toBeGreaterThan(0);
  }
});

test('raid and challenge requirement cards reference real cards', async ({ page }) => {
  await fresh(page);
  const bad = await page.evaluate(() => {
    const candidates = A.filter(a => a.reqCards && a.reqCards.length);
    return candidates.flatMap(a => a.reqCards.filter(id => !B[id]).map(id => ({activity:a.id, id})));
  });
  expect(bad).toEqual([]);
});

test('save survives a reload', async ({ page }) => {
  await fresh(page);
  await page.evaluate(() => { s.points = 123456; save(); });
  await page.reload();
  const pts = await page.evaluate(() => s.points);
  expect(pts).toBe(123456);
});
