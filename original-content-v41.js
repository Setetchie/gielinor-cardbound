// Cardbound v41: Greenwake original-IP development content layer.
(function(){
if(!window.CARDBOUND_ORIGINAL_MODE)return;
window.CARDBOUND_VERSION='v41-original';
window.CARDBOUND_BUILD='2026-08-14.2028-MDT';
window.CARDBOUND_BUILD_NOTE='Greenwake original-IP vertical slice development mode';
window.CARDBOUND_ORIGINAL_REGION='Greenwake Frontier';

const cards=[];
const add=(id,name,type,slot,rarity,icon,power=0,extra={})=>cards.push({id,name,type,slot,rarity,icon,power,original:true,...extra});
// Equipment: deliberately original IDs/names and no external image references.
add('field_blade','Field Blade','Weapon','weapon','Common','⚔️',3,{combatStyle:'Melee'});
add('ironbound_buckler','Ironbound Buckler','Armor','shield','Common','🛡️',2,{combatStyle:'Melee'});
add('wayfarer_mail','Wayfarer Mail','Armor','body','Common','🥋',3,{combatStyle:'Melee'});
add('wayfarer_greaves','Wayfarer Greaves','Armor','legs','Common','🦵',2,{combatStyle:'Melee'});
add('ashwood_bow','Ashwood Bow','Weapon','weapon','Common','🏹',3,{combatStyle:'Ranged'});
add('field_quiver','Field Quiver','Ammo','ammo','Common','➶',2,{combatStyle:'Ranged'});
add('trailhide_jerkin','Trailhide Jerkin','Armor','body','Common','🦺',3,{combatStyle:'Ranged'});
add('trailhide_leggings','Trailhide Leggings','Armor','legs','Common','🥾',2,{combatStyle:'Ranged'});
add('binder_rod','Binder Rod','Weapon','weapon','Common','🪄',3,{combatStyle:'Magic'});
add('emberglass_focus','Emberglass Focus','Accessory','shield','Common','🔮',2,{combatStyle:'Magic'});
add('sigilweave_robe','Sigilweave Robe','Armor','body','Common','🥻',3,{combatStyle:'Magic'});
add('sigilweave_wraps','Sigilweave Wraps','Armor','legs','Common','✨',2,{combatStyle:'Magic'});
add('woodcutter_hatchet',"Woodcutter's Hatchet",'Tool','tool','Common','🪓',2,{profession:'Woodcraft'});
add('delvers_pick',"Delver's Pick",'Tool','tool','Common','⛏️',2,{profession:'Mining'});
add('reedline_rod','Reedline Rod','Tool','tool','Common','🎣',2,{profession:'Fishing'});
add('deckhands_kit',"Deckhand's Kit",'Sailing Facility',null,'Common','⚓',0,{reqSkill:'Sailing',reqLevel:1,sailingCategory:'Core'});
add('salvage_winch','Salvage Winch','Sailing Facility',null,'Uncommon','🪝',0,{reqSkill:'Sailing',reqLevel:15,sailingCategory:'Salvaging'});
add('trawl_rig','Trawl Rig','Sailing Facility',null,'Rare','🕸️',0,{reqSkill:'Sailing',reqLevel:25,sailingCategory:'Trawling'});
add('charting_table','Charting Table','Sailing Facility',null,'Rare','🗺️',0,{reqSkill:'Sailing',reqLevel:35,sailingCategory:'Charting'});

// Creature cards.
[
 ['bramble_rat','Bramble Rat','Common','🐀',8,'Briarborn'],['thornback_boar','Thornback Boar','Common','🐗',18,'Fangkin'],['briarling','Briarling','Uncommon','🌿',30,'Briarborn'],['mossfang_wolf','Mossfang Wolf','Uncommon','🐺',42,'Fangkin'],
 ['shardcrawler','Shardcrawler','Common','🪲',14,'Deepkin'],['gloom_bat','Gloom Bat','Common','🦇',20,'Deepkin'],['stonehide_mauler','Stonehide Mauler','Rare','🪨',85,'Deepkin'],['reedjaw','Reedjaw','Common','🐊',24,'Tideborn'],['tideclaw','Tideclaw','Uncommon','🦀',40,'Tideborn'],['warden_of_oldwatch','Warden of Oldwatch','Rare','🗿',180,'Hollowed']
].forEach(([id,name,rarity,icon,hp,family])=>add(id,name,id==='warden_of_oldwatch'?'Boss':'Monster',null,rarity,icon,0,{hp,family}));

// Resource/node cards. Internal kinds remain migration-compatible while display labels are original.
[
 ['greenwake_sapling','Greenwake Sapling','Common','🌱','Woodcutting',1,5,3],['ironbark_tree','Ironbark Tree','Common','🌳','Woodcutting',15,10,8],['whisperwillow','Whisperwillow','Uncommon','🌿','Woodcutting',30,18,14],['gloamwood_tree','Gloamwood Tree','Rare','🌲','Woodcutting',50,32,22],
 ['softstone_outcrop','Softstone Outcrop','Common','🪨','Mining',1,5,3],['ironvein','Ironvein Deposit','Common','⛰️','Mining',15,10,8],['gloam_ore','Gloam Ore Seam','Uncommon','⬛','Mining',30,18,14],['starshard_node','Starshard Node','Rare','💠','Mining',55,36,24],
 ['silverfin_shoal','Silverfin Shoal','Common','🐟','Fishing',1,5,3],['reedscale_pool','Reedscale Pool','Common','🐠','Fishing',15,10,8],['glasswater_eel','Glasswater Eel Run','Uncommon','〰️','Fishing',30,18,14],['tideglass_school','Tideglass School','Rare','🐬','Fishing',50,32,22]
].forEach(([id,name,rarity,icon,kind,level,base,diff])=>add(id,name,'Skilling',null,rarity,icon,0,{kind,reqSkill:kind,reqLevel:level,base,diff,displaySkill:kind==='Woodcutting'?'Woodcraft':kind}));

// Huntsmanship contract cards (internal Slayer key retained only as a temporary save/runtime compatibility key).
[
 ['hunt_frontier_vermin','Frontier Vermin','Common','🎯',1,8,10,['bramble_rat']],
 ['hunt_fang_and_thorn','Fang and Thorn','Uncommon','🐾',5,14,18,['thornback_boar','mossfang_wolf']],
 ['hunt_deep_delve','Deep Delve','Rare','🕯️',12,24,35,['gloom_bat','stonehide_mauler']],
 ['hunt_oldwatch_disturbance','Oldwatch Disturbance','Rare','🏚️',20,42,70,['warden_of_oldwatch']]
].forEach(([id,name,rarity,icon,level,base,diff,reqCards])=>add(id,name,'Huntsmanship Contract',null,rarity,icon,0,{kind:'Slayer',reqSkill:'Slayer',reqLevel:level,slayerReq:level,base,diff,reqCards,displaySkill:'Huntsmanship'}));

// Sailing action cards.
[
 ['greenwake_harbor_deliveries','Harbor Deliveries','Port Tasks',1,'Common',6,8,['deckhands_kit'],'📜'],
 ['greenwake_coastal_soundings','Coastal Soundings','Charting',5,'Common',8,10,['deckhands_kit'],'🧭'],
 ['greenwake_driftwood_recovery','Driftwood Recovery','Salvaging',15,'Uncommon',14,11,['salvage_winch'],'🪵'],
 ['greenwake_glasswater_trawling','Glasswater Trawling','Trawling',25,'Rare',22,12,['trawl_rig'],'🐟'],
 ['greenwake_outer_reach_survey','Outer-Reach Survey','Charting',35,'Rare',30,13,['charting_table'],'🗺️']
].forEach(([id,name,cat,level,rarity,base,diff,reqCards,icon])=>add(id,name,'Sailing',null,rarity,icon,0,{kind:'Sailing',reqSkill:'Sailing',reqLevel:level,sailingCategory:cat,base,diff,reqCards}));

// Replace live registries only after all prototype content modules have registered.
C.splice(0,C.length,...cards);
for(const k of Object.keys(B))delete B[k];
for(const c of C)B[c.id]=c;
A.splice(0,A.length);
for(const c of C){
  if(c.kind&&['Combat','Woodcutting','Mining','Fishing','Slayer','Sailing'].includes(c.kind))A.push(c);
}
// Creature combat activities use the creature card itself.
for(const c of C.filter(c=>c.type==='Monster'||c.type==='Boss')){
  A.push({...c,kind:'Combat',base:Math.max(4,Math.round((c.hp||10)/5)),diff:Math.max(1,Math.round((c.hp||10)/4)),reqLevel:1,reqSkill:null});
}
// Keep only original pack identities.
for(const k of Object.keys(packs))delete packs[k];
packs['Wayfarer']={cost:400,n:3,o:[76,20,3.5,.5,0]};
packs['Binder']={cost:1400,n:5,o:[60,28,10,2,0]};
packs['Frontier']={cost:4500,n:5,o:[38,38,19,5,0]};

// Clean and seed the isolated original-mode save once.
const originalIds=new Set(C.map(c=>c.id));
if(!s.originalModeInitialized){
  s.points=3000;s.packs=0;s.actions=0;
  s.owned={};
  ['field_blade','woodcutter_hatchet','delvers_pick','reedline_rod','deckhands_kit','bramble_rat','greenwake_sapling','softstone_outcrop','silverfin_shoal','hunt_frontier_vermin','greenwake_harbor_deliveries','greenwake_coastal_soundings'].forEach(id=>s.owned[id]=1);
  s.equipped=Object.fromEntries(SLOT_ORDER.map(k=>[k,null]));s.equipped.weapon='field_blade';s.equipped.tool='woodcutter_hatchet';
  s.skills={...s.skills,Combat:1,Melee:1,Ranged:1,Magic:1,Woodcutting:1,Mining:1,Fishing:1,Slayer:1,Sailing:1};
  s.xp={...s.xp,Combat:0,Melee:0,Ranged:0,Magic:0,Woodcutting:0,Mining:0,Fishing:0,Slayer:0,Sailing:0};
  s.idle={activityId:null,lastTick:null,totalPoints:0};
  s.fragments=Object.fromEntries(R.map(r=>[r,0]));
  s.foilFragments=Object.fromEntries(R.map(r=>[r,0]));
  s.tab='Home';s.originalModeInitialized=true;
}else{
  for(const id of Object.keys(s.owned||{}))if(!originalIds.has(id))delete s.owned[id];
  for(const slot of SLOT_ORDER)if(s.equipped?.[slot]&&!originalIds.has(s.equipped[slot]))s.equipped[slot]=null;
}
for(const c of C)if(s.owned[c.id]==null)s.owned[c.id]=0;

// No external asset URLs in original mode: emoji placeholders are intentionally local-only until owned art lands.
window.cardImage=function(c,cls='cb-icon'){return `<span class="cb-img-wrap cb-original-art"><span class="${cls} cb-original-glyph" role="img" aria-label="${c.name}">${c.icon||'✦'}</span></span>`};
try{cb2Img=cardImage}catch{};try{cbImg=cardImage}catch{};

window.cbSailingCategories=['Port Tasks','Charting','Salvaging','Trawling'];
window.cbSailingReqMet=a=>(a.reqCards||[]).every(id=>own(id)>0)&&(s.skills.Sailing||1)>=(a.reqLevel||1);
window.cbSailingReqText=a=>{const missing=(a.reqCards||[]).filter(id=>!own(id)).map(id=>B[id]?.name||id);return missing.length?`Needs: ${missing.join(', ')}`:`Sailing ${a.reqLevel||1}`};
window.cbOriginalLabel=k=>({Woodcutting:'Woodcraft',Slayer:'Huntsmanship',Bank:'Vault',Collection:'Codex',Forge:'Bindery',Activity:'Venture'}[k]||k);

// Patch requirement helper for Huntsmanship contracts with required creature bindings.
const baseMeets=window.cb2Meets||((x)=>!x.reqSkill||(s.skills[x.reqSkill]||1)>=(x.reqLevel||1));
window.cbOriginalMeets=function(a){return baseMeets(a)&&(a.reqCards||[]).every(id=>own(id)>0)};
try{cb2Meets=cbOriginalMeets}catch{};

save();
})();