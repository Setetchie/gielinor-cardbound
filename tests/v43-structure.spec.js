const { test, expect } = require('@playwright/test');

async function fresh(page){
  await page.goto('/?test=1');
  await page.evaluate(() => {
    localStorage.removeItem('cardbound');
    localStorage.removeItem('cbFutureSettingsV43');
    localStorage.removeItem('cbNewContentV43');
  });
  await page.reload();
  await page.waitForLoadState('load');
  await page.waitForFunction(() => window.CARDBOUND_VERSION === 'v43' && window.cbGatheringV43 && typeof window.cbV43Activity === 'function' && typeof window.cbV43World === 'function');
  await expect(page.locator('#app')).toBeVisible();
}

async function openTab(page, tab){
  await page.evaluate(t => nav(t), tab);
  await page.waitForTimeout(50);
}

test('v43 home exposes intended top-level structure', async ({ page }) => {
  await fresh(page);
  await expect(page.getByRole('button', { name: /Activities/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /World & Exploration/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Region Packs/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Bank & Loadouts/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Raids/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Community/i })).toBeVisible();
});

test('Gathering is one parent Skill with subset mastery and participation', async ({ page }) => {
  await fresh(page);
  const before = await page.evaluate(() => ({
    gathering: s.skills.Gathering,
    wood: s.skills.Woodcutting,
    mastery: cbGatheringV43.mastery('Woodcutting'),
    participation: cbGatheringV43.participation('Woodcutting')
  }));
  const after = await page.evaluate(() => {
    xp('Woodcutting', 40);
    return {
      gathering: s.skills.Gathering,
      wood: s.skills.Woodcutting,
      mining: s.skills.Mining,
      fishing: s.skills.Fishing,
      mastery: cbGatheringV43.mastery('Woodcutting'),
      participation: cbGatheringV43.participation('Woodcutting')
    };
  });
  expect(after.mastery).toBe(before.mastery + 40);
  expect(after.participation).toBe(before.participation + 40);
  expect(after.wood).toBe(after.gathering);
  expect(after.mining).toBe(after.gathering);
  expect(after.fishing).toBe(after.gathering);
});

test('Gathering menu presents subsets rather than independent Skills', async ({ page }) => {
  await fresh(page);
  await openTab(page, 'Activity');
  await page.evaluate(() => cbV43Activity('Gathering'));
  await expect(page.getByRole('heading', { name: 'Gathering', exact: true })).toBeVisible();
  await expect(page.getByText(/PARENT SKILL/i)).toBeVisible();
  for (const subset of ['Woodcutting','Mining','Fishing']) await expect(page.getByRole('button', { name: new RegExp(subset, 'i') })).toBeVisible();
  await page.evaluate(() => cbV43Activity('Woodcutting'));
  await expect(page.getByText(/GATHERING SUBSET/i)).toBeVisible();
  await expect(page.getByText(/Global subset mastery/i)).toBeVisible();
  await expect(page.getByText(/Greenwake participation/i)).toBeVisible();
});

test('World and Exploration preserve Region and Location roles', async ({ page }) => {
  await fresh(page);
  await openTab(page, 'World');
  await expect(page.getByRole('heading', { name: /World & Exploration/i })).toBeVisible();
  await expect(page.getByText(/not routine travel requirements/i)).toBeVisible();
  await page.evaluate(() => cbV43World('location'));
  await expect(page.getByRole('heading', { name: /Known Locations/i })).toBeVisible();
  await expect(page.getByText(/Environmental preview only/i)).toBeVisible();
  await page.evaluate(() => cbV43World('exploration'));
  await expect(page.getByText(/Activities cannot be switched until this Exploration completes/i)).toBeVisible();
  await expect(page.getByText(/ACTIVE EVENT PREVIEW/i)).toBeVisible();
});

test('future systems have reachable dedicated homes', async ({ page }) => {
  await fresh(page);
  const checks = [
    ['Raids', /Raids/i],
    ['Community', /Community/i],
    ['Pets', /Pet/i],
    ['Ascendants', /Ascendant/i],
    ['Settings', /Settings|Options/i]
  ];
  for (const [tab, heading] of checks){
    await openTab(page, tab);
    await expect(page.locator('.content')).toContainText(heading);
  }
});

test('Codex is the collection-facing destination while Bank remains equipment-facing', async ({ page }) => {
  await fresh(page);
  await openTab(page, 'Collection');
  await expect(page.locator('.tabs')).toContainText(/Codex/i);
  await expect(page.getByPlaceholder(/Search every card/i)).toBeVisible();
  await openTab(page, 'Bank');
  await expect(page.getByText('WORN EQUIPMENT', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Saved Equipment', exact: true })).toBeVisible();
});

test('Settings exposes pack, idle, notification and privacy controls', async ({ page }) => {
  await fresh(page);
  await openTab(page, 'Settings');
  await expect(page.locator('.content')).toContainText(/pack/i);
  await expect(page.locator('.content')).toContainText(/Reveal All/i);
  await expect(page.locator('.content')).toContainText(/notification/i);
  await expect(page.locator('.content')).toContainText(/Codex|privacy/i);
});

test('NEW content marker can be added and clears when viewed', async ({ page }) => {
  await fresh(page);
  await openTab(page, 'Activity');
  await page.evaluate(() => cbMarkContentNew('system:huntsmanship'));
  await expect(page.locator('[data-cb-content-id="system:huntsmanship"] .cb-v43-new')).toHaveText('NEW');
  await page.locator('[data-cb-content-id="system:huntsmanship"]').click();
  await openTab(page, 'Activity');
  const count = await page.locator('[data-cb-content-id="system:huntsmanship"] .cb-v43-new').count();
  expect(count).toBe(0);
});
