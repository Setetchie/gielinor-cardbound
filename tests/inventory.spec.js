const { test, expect } = require('@playwright/test');
const fs=require('fs');
const path=require('path');

test('export prototype runtime IP inventory', async ({ page }) => {
  await page.goto('/?test=inventory');
  await page.waitForLoadState('load');
  await page.waitForFunction(()=>typeof C!=='undefined'&&typeof A!=='undefined'&&C.length>50&&A.length>20);
  const inventory=await page.evaluate(()=>{
    const activityById=new Map(A.map(a=>[a.id,a]));
    const entries=C.map(c=>{
      const a=activityById.get(c.id);
      let domain='other';
      if(c.slot)domain='equipment';
      else if(c.type==='Monster'||c.type==='Boss')domain='monster';
      else if(c.type==='Skilling')domain='resource';
      else if(c.type==='Sailing Facility')domain='activity';
      else if(c.kind||a)domain='activity';
      else if(/God|Deity|Ascendant/i.test(c.type||''))domain='deity';
      return {
        legacyId:c.id,legacyName:c.name,domain,
        legacyType:c.type||null,legacyKind:(a||c).kind||null,legacyRarity:c.rarity||null,
        registryMetadata:window.cbContentRegistry?.metadata(c.id)||null,
        replacementId:null,replacementName:null,replacementConcept:null,
        artStatus:'needed',codeStatus:'legacy',clearanceStatus:'unreviewed',notes:''
      };
    });
    const activityOnly=A.filter(a=>!B[a.id]).map(a=>({
      legacyId:a.id,legacyName:a.name||a.id,domain:'activity',legacyType:a.type||null,legacyKind:a.kind||null,legacyRarity:a.rarity||null,
      replacementId:null,replacementName:null,replacementConcept:null,artStatus:'needed',codeStatus:'legacy',clearanceStatus:'unreviewed',notes:'Activity exists without a matching card registry entry.'
    }));
    const packEntries=Object.entries(packs).map(([id,p])=>({
      legacyId:`pack:${id}`,legacyName:`${id} Pack`,domain:'pack',legacyType:'Pack',legacyKind:null,legacyRarity:null,
      packDefinition:{cost:p.cost,cards:p.n,odds:[...p.o]},registryMetadata:null,
      replacementId:null,replacementName:null,replacementConcept:null,artStatus:'needed',codeStatus:'legacy',clearanceStatus:'unreviewed',notes:''
    }));
    const externalAssets=[...new Set(C.map(c=>c.image).filter(v=>typeof v==='string'&&/^https?:/i.test(v)))];
    return {generatedBy:'tests/inventory.spec.js',cardCount:C.length,activityCount:A.length,packCount:Object.keys(packs).length,entries:[...entries,...activityOnly,...packEntries],externalAssets};
  });
  fs.mkdirSync(path.join(process.cwd(),'test-results'),{recursive:true});
  fs.writeFileSync(path.join(process.cwd(),'test-results','ip-inventory.json'),JSON.stringify(inventory,null,2));
  expect(inventory.entries.length).toBeGreaterThan(50);
  expect(inventory.entries.filter(entry=>entry.domain==='pack')).toHaveLength(inventory.packCount);
  expect(new Set(inventory.entries.map(entry=>entry.legacyId)).size).toBe(inventory.entries.length);
});
