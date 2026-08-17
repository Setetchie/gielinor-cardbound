const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('v44 build and one persistent scrollable nav are present', async ({ page }) => {
  await expect(page.locator('#cardbound-build-stamp')).toContainText('v44');
  await expect(page.locator('.v44-nav')).toBeVisible();
  await expect(page.locator('.v44-nav-scroll')).toHaveCSS('overflow-x', 'auto');
  await expect(page.locator('.tabs')).toBeHidden();
  await expect(page.getByRole('button', {name:/Store/})).toBeVisible();
});

test('Bank keeps navigation visible and uses specified equipment presentation', async ({ page }) => {
  await page.getByRole('button', {name:/Bank/}).click();
  await expect(page.locator('.v44-nav')).toBeVisible();
  await expect(page.getByText('Equipped', {exact:true})).toBeVisible();
  for (const name of ['Head','Body','Legs','Main Hand','Off Hand','Boots','Jewelry','Cape / Back','Pet']) await expect(page.getByText(name,{exact:true})).toBeVisible();
  await expect(page.getByText('Gloves',{exact:true})).toHaveCount(0);
});

test('Gathering uses mastery rows as subset navigation and concise activity info', async ({ page }) => {
  await page.getByRole('button', {name:/Activities/}).click();
  await page.getByRole('button', {name:/Gathering/}).click();
  await expect(page.getByText('Woodcutting',{exact:true})).toBeVisible();
  await page.getByText('Woodcutting',{exact:true}).click();
  await expect(page.getByRole('button', {name:/Back to Gathering/})).toBeVisible();
  await expect(page.getByText(/XP \/ action/).first()).toBeVisible();
  await expect(page.getByText(/points \/ action/).first()).toBeVisible();
  await expect(page.getByText(/idle efficiency/).first()).toBeVisible();
});

test('Codex has Stats and compact Card Collection with detail pull rates', async ({ page }) => {
  await page.getByRole('button', {name:/Codex/}).click();
  await expect(page.getByRole('button', {name:/Stats/})).toBeVisible();
  await page.getByRole('button', {name:/Card Collection/}).click();
  await expect(page.locator('.v44-card-grid')).toBeVisible();
  await page.locator('.v44-cardtile').first().click();
  await expect(page.getByText('Pull rates')).toBeVisible();
  await expect(page.getByText('Standard',{exact:true})).toBeVisible();
  await expect(page.getByText('Foil',{exact:true})).toBeVisible();
});

test('Pet purchase gate deep-links to Store and unlocks immediately', async ({ page }) => {
  await page.getByRole('button', {name:/Pets/}).click();
  await expect(page.getByText('Pet Expansion not purchased')).toBeVisible();
  await page.getByRole('button', {name:/Unlock in Store/}).click();
  await expect(page.getByText('Store • QA Purchases')).toBeVisible();
  await page.locator('.v44-product.selected').getByRole('button', {name:/Test Purchase/}).click();
  await page.getByRole('button', {name:/Pets/}).click();
  await expect(page.getByText(/Test source:/)).toBeVisible();
});

test('Huntsmanship fixture exposes tracking stalking hunt and special hunt', async ({ page }) => {
  await page.getByRole('button', {name:/Activities/}).click();
  await page.getByRole('button', {name:/Huntsmanship/}).click();
  await expect(page.getByRole('button', {name:'Track'}).first()).toBeVisible();
  await expect(page.getByRole('button', {name:'Stalk'})).toBeVisible();
  await expect(page.getByRole('button', {name:'Hunt'}).first()).toBeVisible();
  await expect(page.getByText('SPECIAL CREATURE HUNT')).toBeVisible();
  await expect(page.getByText(/50% QA Pet drop rate/)).toBeVisible();
});

test('dummy social fixture supports friend, trade, counter, timeout and showcases', async ({ page }) => {
  await page.getByRole('button', {name:/Community/}).click();
  await expect(page.getByText(/Test Ranger/)).toBeVisible();
  await expect(page.getByRole('button', {name:/Send Friend Request/})).toBeVisible();
  await page.getByRole('button', {name:'trading'}).click();
  for (const name of ['New Offer','Counter Offer','Countered Counter','Accept','Reject','Timeout']) await expect(page.getByRole('button',{name})).toBeVisible();
  await page.getByRole('button', {name:'friends'}).click();
  await expect(page.getByRole('button', {name:/View Dummy Showcase/})).toBeVisible();
});

test('Store has free QA purchases and Forge currency developer controls', async ({ page }) => {
  await page.getByRole('button', {name:/Store/}).click();
  await expect(page.getByText('Pet Expansion',{exact:true})).toBeVisible();
  await expect(page.getByText('Star Fragment',{exact:true})).toBeVisible();
  await expect(page.getByText('Premium Upgrade',{exact:true})).toBeVisible();
  await expect(page.getByText(/Daily Focus/).first()).toBeVisible();
  await page.getByRole('button', {name:/Settings/}).click();
  await page.getByRole('button', {name:/Grant Forge Test Currencies/}).click();
  await page.getByRole('button', {name:/Store/}).click();
  await expect(page.getByText('10',{exact:true})).toBeVisible();
});

test('Ascendant test minigame and notification bell are testable', async ({ page }) => {
  await page.getByRole('button', {name:/Ascendants/}).click();
  await page.getByRole('button', {name:/Play Test Minigame/}).click();
  await expect(page.getByRole('button', {name:'Steady'})).toBeVisible();
  await page.locator('.v44-bell').click();
  await expect(page.getByText('Notifications',{exact:true})).toBeVisible();
  await expect(page.getByText('Friend Request',{exact:true})).toBeVisible();
});
