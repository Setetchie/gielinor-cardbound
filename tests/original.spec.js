const { test, expect } = require('@playwright/test');

async function freshOriginal(page){
  await page.goto('/?content=original&test=1');
  await page.evaluate(() => {
    localStorage.cardboundOriginal='';
    localStorage.cardbound='';
  });
  await page.reload();
  await page.waitForLoadState('load');
  await page.waitForFunction(() => window.CARDBOUND_ORIGINAL_MODE && window.cbCoreUi && typeof window.cbSetActivityRoot==='function');
  await page.waitForTimeout(150);
}

test('original mode swaps to Greenwake-only registries', async ({ page }) => {
  await freshOriginal(page);
  const data=await page.evaluate(() => ({
    cards:C.length,
    activities:A.length,
    allOriginal:C.every(c=>c.original===true),
    legacy:C.filter(c=>['Abyssal Whip','General Graardor','Normal Tree','Rune Scimitar'].includes(c.name)).map(c=>c.name),
    region:window.CARDBOUND_ORIGINAL_REGION,
    version:window.CARDBOUND_VERSION
  }));
  expect(data.cards).toBeGreaterThan(35);
  expect(data.activities).toBeGreaterThan(20);
  expect(data.allOriginal).toBe(true);
  expect(data.legacy).toEqual([]);
  expect(data.region).toBe('Greenwake Frontier');
  expect(data.version).toContain('v41');
});

test('original mode renders no third-party image URLs', async ({ page }) => {
  await freshOriginal(page);
  await page.getByRole('button',{name:/Codex|Collection/i}).last().click();
  const urls=await page.locator('img').evaluateAll(imgs=>imgs.map(i=>i.src).filter(Boolean));
  expect(urls.filter(u=>/runelite|runescape\.wiki|jagex/i.test(u))).toEqual([]);
  const generated=await page.evaluate(()=>cardImage(C[0]));
  expect(generated).not.toMatch(/https?:\/\//i);
});

test('original terminology is player-facing', async ({ page }) => {
  await freshOriginal(page);
  let body=(await page.locator('body').innerText());
  expect(body).toContain('Activities');
  expect(body).toContain('Bank');
  expect(body).not.toMatch(/\bVentures\b/);
  expect(body).not.toMatch(/\bVault\b/);
  expect(body).not.toMatch(/Gielinor/i);
  expect(body).not.toMatch(/\bSlayer\b/);
  expect(body).not.toMatch(/\bWoodcraft\b/);

  // The current hierarchy is shared across content modes: Skilling contains
  // the individual Skills and Travel contains its progression subsets.
  await page.locator('.v44-nav').getByRole('button',{name:/Activities/i}).click();
  await page.getByRole('button',{name:/Skilling/i}).click();
  await expect(page.getByRole('button',{name:/Huntsmanship/i})).toBeVisible();
  body=await page.locator('body').innerText();
  expect(body).toContain('Woodcutting');
  expect(body).toContain('Mining');
  expect(body).toContain('Fishing');
  expect(body).not.toMatch(/\bWoodcraft\b/);
});

test('Huntsmanship starts at level 1 with starter contract', async ({ page }) => {
  await freshOriginal(page);
  const data=await page.evaluate(()=>({
    level:s.skills.Slayer,
    owned:own('hunt_frontier_vermin'),
    contract:A.find(a=>a.id==='hunt_frontier_vermin'),
    meets:cb2Meets(A.find(a=>a.id==='hunt_frontier_vermin'))
  }));
  expect(data.level).toBe(1);
  expect(data.owned).toBeGreaterThan(0);
  expect(data.contract.reqLevel).toBe(1);
  expect(data.meets).toBe(true);
});

test('Greenwake Sailing starter route works', async ({ page }) => {
  await freshOriginal(page);
  await page.locator('.v44-nav').getByRole('button',{name:/Activities/i}).click();
  await page.getByRole('button',{name:/Skilling/i}).click();
  await page.getByRole('button',{name:/Travel/i}).click();
  await page.getByRole('button',{name:/Sailing/i}).first().click();
  const portTasks=page.getByRole('button',{name:/Port Tasks/i}).first();
  await expect(portTasks).toBeVisible();
  await portTasks.click();
  await expect(page.getByText(/Harbor Deliveries/i)).toBeVisible();
  const data=await page.evaluate(()=>({
    action:A.find(a=>a.id==='greenwake_harbor_deliveries'),
    owned:own('greenwake_harbor_deliveries'),
    facility:own('deckhands_kit'),
    meets:cbSailingReqMet(A.find(a=>a.id==='greenwake_harbor_deliveries'))
  }));
  expect(data.action.reqLevel).toBe(1);
  expect(data.owned).toBeGreaterThan(0);
  expect(data.facility).toBeGreaterThan(0);
  expect(data.meets).toBe(true);
});

test('Greenwake idle settlement awards points', async ({ page }) => {
  await freshOriginal(page);
  const result=await page.evaluate(()=>{
    const a=A.find(x=>x.id==='greenwake_sapling');
    const before=s.points;
    s.idle={activityId:a.id,lastTick:Date.now()-cycleSeconds(a)*2100,totalPoints:0};
    const g=settleIdle(false);
    return {before,after:s.points,cycles:g.cycles,points:g.points};
  });
  expect(result.cycles).toBeGreaterThanOrEqual(2);
  expect(result.points).toBeGreaterThan(0);
  expect(result.after).toBeGreaterThan(result.before);
});

test('Greenwake packs are safe probability distributions', async ({ page }) => {
  await freshOriginal(page);
  const data=await page.evaluate(()=>Object.entries(packs).map(([name,p])=>({
    name,sum:p.o.reduce((a,b)=>a+b,0),cost:p.cost,n:p.n,
    emptyWeighted:p.o.map((odds,i)=>({odds,pool:C.filter(c=>c.rarity===R[i]).length,rarity:R[i]})).filter(x=>x.odds>0&&x.pool===0)
  })));
  expect(data.map(x=>x.name).sort()).toEqual(['Binder','Frontier','Wayfarer']);
  for(const p of data){
    expect(Math.abs(p.sum-100)).toBeLessThan(0.001);
    expect(p.emptyWeighted).toEqual([]);
    expect(p.cost).toBeGreaterThan(0);
    expect(p.n).toBeGreaterThan(0);
  }
});

test('Greenwake next Woodcutting unlock is level 15 Ironbark', async ({ page }) => {
  await freshOriginal(page);
  const next=await page.evaluate(()=>A.filter(a=>a.kind==='Woodcutting'&&(a.reqLevel||1)>1).sort((a,b)=>a.reqLevel-b.reqLevel)[0]);
  expect(next.id).toBe('ironbark_tree');
  expect(next.reqLevel).toBe(15);
});
