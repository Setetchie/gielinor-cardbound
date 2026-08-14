// Combat styles: unified Melee, Ranged, Magic progression (no Attack/Strength/Defence split).
(function(){
const oldCombat=s.skills.Combat||1,oldCombatXp=s.xp.Combat||0;
for(const k of ['Melee','Ranged','Magic']){if(s.skills[k]==null)s.skills[k]=oldCombat;if(s.xp[k]==null)s.xp[k]=oldCombatXp;}
const rangedIds=new Set(['oak_shortbow','willow_shortbow','maple_shortbow','magic_shortbow','rune_crossbow','dragon_crossbow','armadyl_crossbow','dragon_hunter_crossbow','webweaver','blowpipe','bowfa','twisted_bow']);
const magicIds=new Set(['staff_fire','iban_staff','ancient_staff','master_wand','staff_dead','trident','sanguinesti','shadow']);
const rangedGear=new Set(['ava_accumulator','ava_assembler','archer_helm','karil_coif','karil_top','karil_skirt','armadyl_chest','armadyl_skirt','masori_mask','masori_body','masori_chaps','zaryte_vamb','pegasian_boots','anguish','archers_ring','buckler','dragonfire_ward']);
const magicGear=new Set(['farseer_helm','ahrim_hood','ahrim_top','ahrim_skirt','ancestral_hat','ancestral_top','ancestral_bottom','tormented','eternal_boots','occult','magus_ring','arcane','malediction','book_darkness','imbued_god_cape']);
function styleFor(c){if(!c)return'Melee';if(rangedIds.has(c.id)||rangedGear.has(c.id)||c.slot==='ammo')return'Ranged';if(magicIds.has(c.id)||magicGear.has(c.id))return'Magic';return'Melee'}
for(const c of C){if(['Weapon','Armor','Accessory','Ammo'].includes(c.type)){c.combatStyle=styleFor(c);if(c.reqCombat){c.reqStyle=c.combatStyle;c.reqStyleLevel=c.reqCombat;delete c.reqCombat;}}}
function activeStyle(){const w=B[s.equipped.weapon];return styleFor(w)}
function stylePower(style){return 5+Object.entries(s.equipped).filter(([slot,id])=>id&&slot!=='tool').reduce((n,[,id])=>{const c=B[id];if(!c)return n;const cs=styleFor(c);return n+c.power*(cs===style?1:.25)},0)}
function combatLevelFor(style){return s.skills[style]||1}
function meetsStyle(x){if(x.reqStyle&&combatLevelFor(x.reqStyle)<x.reqStyleLevel)return false;return true}
const oldMeets=cb2Meets;cb2Meets=function(x){return oldMeets(x)&&meetsStyle(x)};
const oldReqText=cb2RequirementText;cb2RequirementText=function(x){if(x.reqStyle)return `${x.reqStyle} ${x.reqStyleLevel}`;return oldReqText(x)};
const oldFail=cb2FailText;cb2FailText=function(x){if(x.reqStyle)return `${x.reqStyle} level ${x.reqStyleLevel} required`;return oldFail(x)};
const oldEquip=equip;equip=function(id){const c=B[id];if(c?.reqStyle&&!meetsStyle(c))return toast(cb2FailText(c));oldEquip(id)};
rewardFor=function(a){if(a.kind==='Combat'||a.kind==='Slayer'){const style=activeStyle(),hp=a.hp||50,build=stylePower(style),lvl=combatLevelFor(style);return Math.max(2,Math.round((hp/8)*(1+build/120+lvl/250)))}const tool=B[s.equipped.tool];return Math.max(1,Math.round(a.base*(1+(tool?.power||0)/20)))};
cycleSeconds=function(a){if(a.kind==='Combat'||a.kind==='Slayer'){const style=activeStyle(),hp=a.hp||50,dps=Math.max(2.5,2.5+combatLevelFor(style)/12+stylePower(style)/18);return Math.max(3,Math.round(hp/dps))}return Math.max(4,Math.round(5+(a.reqLevel||1)/8))};
const baseAct=act;act=function(id){const a=A.find(x=>x.id===id);if(!a||!own(id)||!cb2Meets(a))return baseAct(id);if(a.kind==='Combat'||a.kind==='Slayer'){const n=rewardFor(a),style=activeStyle();s.points+=n;s.actions++;xp(style,Math.max(2,Math.round((a.hp||a.base)/4)));if(a.kind==='Slayer')xp('Slayer',Math.max(2,Math.round((a.hp||a.base)/4)));save();render();toast(`+${n} points • ${style} XP`);return}baseAct(id)};
// Idle settlement needs to award the active combat style rather than obsolete Combat XP.
settleIdle=function(show){if(!s.idle.activityId||!s.idle.lastTick)return{points:0,cycles:0};const a=A.find(x=>x.id===s.idle.activityId);if(!a||!own(a.id)){s.idle={activityId:null,lastTick:null,totalPoints:s.idle.totalPoints||0};save();return{points:0,cycles:0}}const now=Date.now(),elapsed=Math.min(now-s.idle.lastTick,8*60*60*1000),cycles=Math.floor(elapsed/(cycleSeconds(a)*1000));if(cycles<1)return{points:0,cycles:0};const pts=cycles*rewardFor(a),gain=cycles*Math.max(2,Math.round((a.hp||a.base)/4));s.points+=pts;s.actions+=cycles;if(a.kind==='Combat'||a.kind==='Slayer'){xp(activeStyle(),gain);if(a.kind==='Slayer')xp('Slayer',gain)}else xp(a.kind,gain);s.idle.totalPoints=(s.idle.totalPoints||0)+pts;s.idle.lastTick+=cycles*cycleSeconds(a)*1000;save();if(show&&pts)toast(`While away: +${pts.toLocaleString()} points • ${cycles} actions`);return{points:pts,cycles}};
// Replace Combat summary in Home with the three broad styles where possible.
const oldHome=home;home=function(){const html=oldHome();return html.replace(/Combat[^<]*<b>Lv\s*\d+<\/b>/i,`Melee <b>Lv ${s.skills.Melee}</b> • Ranged <b>Lv ${s.skills.Ranged}</b> • Magic <b>Lv ${s.skills.Magic}</b>`)};
// Add style selector/readout to Combat activity navigation. Style is determined by equipped weapon.
const oldActivityPage=activityPage;activityPage=function(){let html=oldActivityPage();if(cb2State.root==='Combat'||cb2State.root==='Slayer'){const st=activeStyle();html=html.replace('<div class="cb2-activity-nav">',`<div class="card cb2-style-panel"><b>Combat style: ${st}</b><div class="muted">Equip a melee, ranged, or magic weapon in Bank to switch style. ${st} Lv ${combatLevelFor(st)} • Style Power ${Math.round(stylePower(st))}</div></div><div class="cb2-activity-nav">`)}return html};
save();render();
})();