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
  await page.waitForFunction(() => window.CARDBOUND_VERSION && window.cbGatheringV43 && typeof window.cbV43Activity === 'function' && typeof window.cbV43World === 'function' && typeof window.cbV44Activity === 'function');
  await expect(page.locator('#app')).toBeVisible();
}

async function openTab(page, tab){
  await page.evaluate(t => nav(t), tab);
  await page.waitForTimeout(50);
}

test('v43 home exposes intended top-level structure', async ({ page }) => {
  await fresh(page);
  const nav=page.locator('.v44-nav');
  for(const name of [/Activities/i,/World/i,/Packs/i,/Codex/i,/Bank/i,/Forge/i,/Community/i])
    await expect(nav.getByRole('button',{name})).toBeVisible();
  await expect(page.locator('.v44-grid').getByRole('button',{name:/Activities/i})).toBeVisible();
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

test('Skilling menu presents Skills and their subset masteries', async ({ page }) => {
  await fresh(page);
  await openTab(page, 'Activity');
  await page.getByRole('button',{name:/Skilling/i}).click();
  for (const subset of ['Woodcutting','Mining','Fishing']) await expect(page.getByRole('button', { name: new RegExp(subset, 'i') })).toBeVisible();
  await page.getByRole('button',{name:/Woodcutting/i}).click();
  await page.getByRole('button',{name:/Woodcutting/i}).last().click();
  await expect(page.getByRole('button',{name:/Back to Woodcutting/i})).toBeVisible();
  await expect(page.getByText(/XP \/ action/i).first()).toBeVisible();
});

test('World and Exploration preserve Region and Location roles', async ({ page }) => {
  await fresh(page);
  await openTab(page, 'World');
  await expect(page.getByRole('heading', { name: /World Map/i })).toBeVisible();
  await expect(page.locator('.cb-owner-location.start')).toBeVisible();
  await expect(page.locator('.cb-owner-location.discovered')).toBeVisible();
  await page.locator('.cb-owner-location.discovered').click();
  await expect(page.getByText(/Cannot stop/i)).toBeVisible();
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
  await expect(page.locator('.v44-nav')).toContainText(/Codex/i);
  await page.getByRole('button',{name:/Card Collection/i}).click();
  await expect(page.getByPlaceholder(/Search cards/i)).toBeVisible();
  await openTab(page, 'Bank');
  await expect(page.getByText('Equipped', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Saved Loadouts', exact: true })).toBeVisible();
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
  await page.getByRole('button',{name:/Skilling/i}).click();
  await page.evaluate(() => cbMarkContentNew('system:huntsmanship'));
  await expect(page.locator('[data-cb-content-id="system:huntsmanship"] .cb-v43-new')).toHaveText('NEW');
  await page.locator('[data-cb-content-id="system:huntsmanship"]').click();
  await openTab(page, 'Activity');
  const count = await page.locator('[data-cb-content-id="system:huntsmanship"] .cb-v43-new').count();
  expect(count).toBe(0);
});

test('core router owns deterministic Home Bank and Collection destination resolution', async ({ page }) => {
  await fresh(page);
  const routing = await page.evaluate(() => ({
    registered: cbRegisteredPages(),
    home: typeof cbResolvePage('Home'),
    bank: typeof cbResolvePage('Bank'),
    collection: typeof cbResolvePage('Collection'),
    fallbackIsHome: cbResolvePage('missing-route') === cbResolvePage('Home')
  }));
  for (const destination of ['Home', 'Bank', 'Collection'])
    expect(routing.registered).toContain(destination);
  expect(routing.home).toBe('function');
  expect(routing.bank).toBe('function');
  expect(routing.collection).toBe('function');
  expect(routing.fallbackIsHome).toBe(true);
});

test('content registry preserves legacy indexes and exposes data-focused metadata', async ({ page }) => {
  await fresh(page);
  const registry = await page.evaluate(() => {
    const before = cbContentRegistry.snapshot();
    const sailing = B.sail_port_tasks;
    const duplicate = cbContentRegistry.registerActivity(sailing, { source: 'architecture-test' });
    const after = cbContentRegistry.snapshot();
    return {
      sameCards: cbContentRegistry.cards === C,
      sameActivities: cbContentRegistry.activities === A,
      sameIndex: cbContentRegistry.cardById === B,
      samePacks: cbContentRegistry.packs === packs,
      duplicateIdentity: duplicate === sailing,
      countsStable: before.cards === after.cards && before.activities === after.activities,
      metadata: cbContentRegistry.metadata('sail_port_tasks')
    };
  });
  expect(registry.sameCards).toBe(true);
  expect(registry.sameActivities).toBe(true);
  expect(registry.sameIndex).toBe(true);
  expect(registry.samePacks).toBe(true);
  expect(registry.duplicateIdentity).toBe(true);
  expect(registry.countsStable).toBe(true);
  expect(registry.metadata).toMatchObject({
    id: 'sail_port_tasks',
    source: 'sailing-content',
    skill: 'Sailing',
    family: 'Port Tasks',
    tier: 1,
    activityBinding: 'sail_port_tasks'
  });
});
