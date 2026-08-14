// v25: direct Sailing renderer. Keeps state as Skilling -> Sailing and bypasses legacy Sailing handoffs.
(function(){
const priorRender=render;
if(!window.cbSailingUi)window.cbSailingUi={category:null};
const img=(c,cls='cb-sailing-img')=>typeof cardImage==='function'?cardImage(c,cls):`<span>${c?.icon||'⚓'}</span>`;
function shell(content){const tabs=['Home','Activity','Packs','Bank','Collection','Forge','Event'];return `<div class="app"><div class="top"><div class="brand">⚔️ <b>Gielinor: Cardbound</b></div><div class="wallet"><span class="pill">🪙 ${s.points.toLocaleString()} points</span><span class="pill">🃏 ${C.filter(c=>own(c.id)).length}/${C.length}</span></div></div><div class="content">${content}</div><div class="tabs"><div>${tabs.map(t=>`<button class="tab ${t==='Event'?'cb20-event-tab':''} ${s.tab===t?'active':''}" onclick="nav('${t}')">${{Home:'🏠',Activity:'⚔️',Packs:'🎁',Bank:'🏦',Collection:'🃏',Forge:'🔥',Event:'✦'}[t]}<br>${t}</button>`).join('')}</div></div></div>`}
window.cbSetSkill=function(skill){
 if(skill==='Sailing'){
   cbCoreUi.activityRoot='Skilling';cbCoreUi.skill='Sailing';cbSailingUi.category=null;s.tab='Activity';save();render();return;
 }
 cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=skill;s.tab='Activity';save();render();
};
window.cbSailingOpen=function(cat){cbSailingUi.category=cat;render()};
window.cbSailingBack=function(){if(cbSailingUi.category){cbSailingUi.category=null;render();return;}cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=null;render()};
window.cbSailingExit=function(){cbSailingUi.category=null;cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=null;render()};
function idle(){return typeof cbIdlePanel==='function'?cbIdlePanel():(typeof idlePanel==='function'?idlePanel():'')}
function facilitySummary(){const cards=C.filter(c=>c.type==='Sailing Facility'),owned=cards.filter(c=>own(c.id));return `<div class="panel"><div class="section-head"><div><span class="eyebrow">SHIP FACILITIES</span><h3>${owned.length}/${cards.length} unlocked</h3></div></div><div class="cb-sailing-facilities">${cards.map(c=>`<div class="cb-sailing-facility ${c.rarity} ${own(c.id)?'':'locked'}">${img(c,'cb-sailing-facility-img')}<b>${c.name}</b><small>Sailing ${c.reqLevel||1}${own(c.id)?' • Owned':' • Card required'}</small></div>`).join('')}</div></div>`}
function sailingHome(){const cats=window.cbSailingCategories||['Port Tasks','Charting','Salvaging','Trawling','Combat','Trials'];return `${idle()}<div class="panel"><button class="secondary" onclick="cbSailingExit()">← Skilling</button><div class="section-head"><div><span class="eyebrow">SKILLING • SAILING</span><h2>Captain your ship</h2></div><span class="pill">Lv ${s.skills.Sailing||1}</span></div><p class="muted">Choose a Sailing method. Activities require their activity card plus the required boat or ship facility cards.</p><div class="cb-sailing-categories">${cats.map(cat=>{const count=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat).length;return `<button class="cb-sailing-category" onclick="cbSailingOpen('${cat}')"><span>${{Port Tasks:'📜',Charting:'🗺️',Salvaging:'🪝',Trawling:'🐟',Combat:'💥',Trials:'🏁'}[cat]||'⚓'}</span><b>${cat}</b><small>${count} actions</small></button>`}).join('')}</div></div>${facilitySummary()}`}
function categoryPage(cat){const acts=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat);return `${idle()}<div class="panel"><button class="secondary" onclick="cbSailingBack()">← Sailing</button><div class="section-head"><div><span class="eyebrow">SAILING • ${cat.toUpperCase()}</span><h2>${cat}</h2></div><span class="pill">Lv ${s.skills.Sailing||1}</span></div><div class="cb2-activity-list">${acts.map(a=>{const unlocked=own(a.id)>0,meets=typeof cbSailingReqMet==='function'?cbSailingReqMet(a):true,active=s.idle.activityId===a.id,req=(a.reqCards||[]).map(id=>B[id]?.name||id).join(', ');return `<div class="cb2-activity-card ${a.rarity} ${unlocked?'':'locked'} ${active?'idle-selected':''}">${img(a,'cb-activity-icon')}<div class="cb2-grow"><b>${a.name}</b><div class="muted">Sailing ${a.reqLevel||1} • ${rewardFor(a)} pts • ${cycleSeconds(a)}s<br>${req?`Facility: ${req}<br>`:''}${!unlocked?'Activity card required':meets?'Ready':'Missing facility/level requirement'}</div></div><div class="cb2-actions"><button ${unlocked&&meets?'':'disabled'} onclick="act('${a.id}')">Once</button><button class="${active?'danger':'primary'}" ${unlocked&&meets?'':'disabled'} onclick="${active?'stopIdle()':`startIdle('${a.id}')`}">${active?'Stop':'Idle'}</button></div></div>`}).join('')}</div></div>`}
render=function(){
 if(s.tab==='Activity'&&window.cbCoreUi?.activityRoot==='Skilling'&&window.cbCoreUi?.skill==='Sailing'){
   document.getElementById('app').innerHTML=shell(cbSailingUi.category?categoryPage(cbSailingUi.category):sailingHome());
   if(typeof cb21ApplyFilters==='function')setTimeout(cb21ApplyFilters,0);
   return;
 }
 priorRender();
 // Keep Sailing visible in the Skilling chooser, but never create a top-level Sailing state.
 if(s.tab==='Activity'&&window.cbCoreUi?.activityRoot==='Skilling'&&!window.cbCoreUi?.skill){
   const root=document.querySelector('.cbcore-root-grid');
   if(root&&!root.querySelector('[data-sailing-skill]'))root.insertAdjacentHTML('beforeend',`<button data-sailing-skill class="cbcore-root-card" onclick="cbSetSkill('Sailing')"><span>⛵</span><b>Sailing</b><small>Level ${s.skills.Sailing||1}</small></button>`);
 }
 document.querySelectorAll('[data-sailing-root]').forEach(x=>x.remove());
};
render();
})();