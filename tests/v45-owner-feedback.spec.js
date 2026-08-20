const { test, expect } = require('@playwright/test');

const nav=(page,name)=>page.locator('.v44-nav').getByRole('button',{name});

test.beforeEach(async ({page})=>{
  await page.goto('/');
  await page.evaluate(()=>{localStorage.clear();sessionStorage.clear()});
  await page.reload();
});

test('v45 metadata and sticky status/nav chrome are ordered',async({page})=>{
  await expect(page.locator('#cardbound-build-stamp')).toContainText('v45');
  await expect(page.locator('.top')).toHaveCSS('position','sticky');
  await expect(page.locator('.v44-nav')).toHaveCSS('position','sticky');
  const boxes=await page.evaluate(()=>{const a=document.querySelector('.top').getBoundingClientRect(),b=document.querySelector('.v44-nav').getBoundingClientRect();return {topBottom:a.bottom,navTop:b.top}});
  expect(boxes.navTop).toBeGreaterThanOrEqual(boxes.topBottom-1);
});

test('navigation retains horizontal scroll and browser back restores page',async({page})=>{
  await page.locator('.v44-nav-scroll').evaluate(el=>el.scrollLeft=el.scrollWidth);
  const before=await page.locator('.v44-nav-scroll').evaluate(el=>el.scrollLeft);
  await nav(page,/Settings/).click();
  expect(await page.locator('.v44-nav-scroll').evaluate(el=>el.scrollLeft)).toBeGreaterThanOrEqual(before-2);
  await nav(page,/Bank/).click();
  await page.goBack();
  await expect(page.getByRole('heading',{name:'Settings & Developer Tools'})).toBeVisible();
});

test('Home starts with account summary, skills and quick access',async({page})=>{
  await expect(page.getByText('Cards collected')).toBeVisible();
  await expect(page.getByText('Current Region')).toBeVisible();
  await expect(page.getByRole('heading',{name:'General Skill Levels'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Quick Access'})).toBeVisible();
});

test('Activities use four groups and skill/subset progression context',async({page})=>{
  await nav(page,/Activities/).click();
  for(const name of ['Combat','Skilling','Raids','Exploration']) await expect(page.getByRole('button',{name:new RegExp(name)})).toBeVisible();
  await page.getByRole('button',{name:/Skilling/}).click();
  await page.getByRole('button',{name:/Travel/}).click();
  await expect(page.getByText(/Travel • Level/)).toBeVisible();
  for(const name of ['Trails','Caravans','Sailing']) await expect(page.getByRole('button',{name:new RegExp(name)})).toBeVisible();
});

test('activity requirements remain visible, sort low-to-high and filters work',async({page})=>{
  await nav(page,/Activities/).click();
  await page.getByRole('button',{name:/Skilling/}).click();
  await page.getByRole('button',{name:/Woodcutting/}).click();
  await page.getByRole('button',{name:/Woodcutting/}).last().click();
  const reqs=await page.locator('.cb-owner-req').allTextContents();
  expect(reqs.length).toBeGreaterThan(0);
  const levels=reqs.map(x=>Number(x.match(/Level (\d+)/)?.[1]||0));
  expect(levels).toEqual([...levels].sort((a,b)=>a-b));
  await page.locator('#cb-owner-availability').selectOption({label:'Locked'});
  await expect(page.locator('#cb-owner-activity-list .cb-owner-activity:not(.locked):visible')).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Once'})).toHaveCount(0);
});

test('World map exposes three fog states and committed Exploration cannot stop',async({page})=>{
  await nav(page,/World/).click();
  await expect(page.locator('.cb-owner-location.start')).toBeVisible();
  await expect(page.locator('.cb-owner-location.discovered')).toBeVisible();
  await expect(page.locator('.cb-owner-location.unknown')).toBeVisible();
  await page.locator('.cb-owner-location.discovered').click();
  await page.getByRole('button',{name:/Begin Exploration/}).click();
  await expect(page.getByText(/Committed Exploration cannot be stopped/)).toBeVisible();
  await expect(page.getByRole('button',{name:/Stop/})).toHaveCount(0);
});

test('Raid idle bar exposes token-consuming stop confirmation',async({page})=>{
  await nav(page,/Activities/).click();
  await page.getByRole('button',{name:/Raids/}).click();
  await page.getByRole('button',{name:/Start Raid/}).first().click();
  await expect(page.getByText(/ACTIVE RAID/)).toBeVisible();
  page.once('dialog',async d=>{expect(d.message()).toContain('not refunded');await d.dismiss()});
  await page.getByRole('button',{name:'Stop Raid'}).click();
  await expect(page.getByText(/ACTIVE RAID/)).toBeVisible();
});

test('Codex has extended filters, names, counters and backdrop-close detail',async({page})=>{
  await nav(page,/Codex/).click();
  await page.getByRole('button',{name:/Card Collection/}).click();
  for(const label of ['Equipment slot','Associated Activity','Region']) await expect(page.getByRole('combobox',{name:label})).toBeVisible();
  const tile=page.locator('.v44-cardtile').first();
  await expect(tile.locator('.cb-owner-card-name')).not.toBeEmpty();
  await expect(tile.locator('.cb-owner-count.standard')).toBeVisible();
  await expect(tile.locator('.cb-owner-count.foil')).toBeVisible();
  await tile.click();
  await expect(page.locator('.v44-modal')).toBeVisible();
  await page.mouse.click(10,10);
  await expect(page.locator('.v44-modal')).toHaveCount(0);
});

test('Bank equipment and saved Loadouts do not create horizontal overflow',async({page})=>{
  await nav(page,/Bank/).click();
  await expect(page.getByRole('heading',{name:'Equipped'})).toBeVisible();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  page.on('dialog',async d=>{if(d.type()==='prompt')await d.accept(d.message().includes('category')?'Combat':'Boss Loadout');else await d.accept()});
  await page.locator('section').filter({has:page.getByRole('heading',{name:'Saved Loadouts'})}).getByRole('button',{name:/Save Current/}).click();
  await expect(page.getByRole('article').getByText('Boss Loadout')).toBeVisible();
  await expect(page.getByText('Combat',{exact:true})).toBeVisible();
});

test('Pets retain purchase gate then separate Active, Owned and equipment storage',async({page})=>{
  await nav(page,/Pets/).click();
  await page.getByRole('button',{name:/Unlock in Store/}).click();
  await page.locator('.v44-product.selected').getByRole('button',{name:/Test Purchase/}).click();
  await page.evaluate(()=>localStorage.setItem('cbV44Pet',JSON.stringify({owned:true,equipped:false,collar:false,harness:false,boots:false})));
  await nav(page,/Pets/).click();
  await expect(page.getByRole('heading',{name:'Active Pet'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Owned Pets'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Pet Equipment Storage'})).toBeVisible();
  await page.getByRole('button',{name:/Bramblefox Cub/}).click();
  await expect(page.getByRole('button',{name:'Unequip'})).toBeVisible();
});

test('Community uses expandable friends, request lifecycle, showcase and trade builder',async({page})=>{
  await nav(page,/Community/).click();
  await page.locator('.cb-owner-friend-row summary').click();
  await page.getByRole('button',{name:'Send Friend Request'}).click();
  await page.getByRole('button',{name:'Requests'}).click();
  await expect(page.getByText(/Outgoing Friend Request/)).toBeVisible();
  await expect(page.getByText(/Awaiting friend's response/)).toBeVisible();
  await page.getByRole('button',{name:'Showcase'}).click();
  await expect(page.getByText('Selected Achievements')).toBeVisible();
  await expect(page.getByText('Showcased Loadout')).toBeVisible();
  await page.getByRole('button',{name:'Trading'}).click();
  await page.getByRole('button',{name:/New Trade Offer/}).click();
  await expect(page.getByRole('heading',{name:'New Trade Offer'})).toBeVisible();
  await expect(page.getByText(/Friend-authorized/)).toBeVisible();
});

test('Forge is present in primary navigation and renders controls',async({page})=>{
  await nav(page,/Forge/).click();
  await expect(page.getByText(/Forge/i).first()).toBeVisible();
  await expect(page.getByText('Forge controls unavailable.')).toHaveCount(0);
});
