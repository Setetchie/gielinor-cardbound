// v27: Sailing-only stable navigation. Uses its own UI state so other render wrappers cannot bounce it back to Skilling.
(function(){
const priorRender=render;
const priorSetSkill=window.cbSetSkill;
window.cbSailingStable={active:false,category:null};

const img=(c,cls='cb-sailing-img')=>{
  try{return typeof cardImage==='function'?cardImage(c,cls):`<span class="${cls}">${c?.icon||'⚓'}</span>`}
  catch{return `<span class="${cls}">${c?.icon||'⚓'}</span>`}
};
const tabs=['Home','Activity','Packs','Bank','Collection','Forge','Event'];
function shell(content){return `<div class="app"><div class="top"><div class="brand">⚔️ <b>Gielinor: Cardbound</b></div><div class="wallet"><span class="pill">🪙 ${s.points.toLocaleString()} points</span><span class="pill">🃏 ${C.filter(c=>own(c.id)).length}/${C.length}</span></div></div><div class="content">${content}</div><div class="tabs"><div>${tabs.map(t=>`<button class="tab ${s.tab===t?'active':''}" onclick="cbSailingStable.active=false;nav('${t}')">${{Home:'🏠',Activity:'⚔️',Packs:'🎁',Bank:'🏦',Collection:'🃏',Forge:'🔥',Event:'✦'}[t]}<br>${t}</button>`).join('')}</div></div></div>`}
function idle(){try{return typeof cbIdlePanel==='function'?cbIdlePanel():(typeof idlePanel==='function'?idlePanel():'')}catch{return''}}

window.cbOpenSailing=function(){
  cbSailingStable.active=true;cbSailingStable.category=null;s.tab='Activity';save();render();
};
window.cbSailingStableOpen=function(cat){cbSailingStable.active=true;cbSailingStable.category=cat;render()};
window.cbSailingStableBack=function(){if(cbSailingStable.category){cbSailingStable.category=null;render();return;}cbSailingStable.active=false;if(window.cbCoreUi){cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=null;}render()};
window.cbSetSkill=function(skill){if(skill==='Sailing')return cbOpenSailing();return priorSetSkill(skill)};

function facilitySummary(){
 const cards=C.filter(c=>c.type==='Sailing Facility'),owned=cards.filter(c=>own(c.id)).length;
 return `<div class="panel"><div class="section-head"><div><span class="eyebrow">SHIP FACILITIES</span><h3>${owned}/${cards.length} unlocked</h3></div></div><div class="cb-sailing-facilities">${cards.map(c=>`<div class="cb-sailing-facility ${c.rarity} ${own(c.id)?'':'locked'}">${img(c,'cb-sailing-facility-img')}<b>${c.name}</b><small>Sailing ${c.reqLevel||1}${own(c.id)?' • Owned':' • Card required'}</small></div>`).join('')}</div></div>`;
}
function home(){
 const cats=window.cbSailingCategories||['Port Tasks','Charting','Salvaging','Trawling','Combat','Trials'];
 return `${idle()}<div class="panel"><button class="secondary" onclick="cbSailingStableBack()">← Skilling</button><div class="section-head"><div><span class="eyebrow">SKILLING • SAILING</span><h2>Captain your ship</h2></div><span class="pill">Lv ${s.skills.Sailing||1}</span></div><p class="muted">Choose a Sailing method. Each activity needs its activity card, Sailing level, and required ship facilities.</p><div class="cb-sailing-categories">${cats.map(cat=>{const n=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat).length;return `<button class="cb-sailing-category" onclick="cbSailingStableOpen('${cat}')"><span>${{Port Tasks:'📜',Charting:'🗺️',Salvaging:'🪝',Trawling:'🐟',Combat:'💥',Trials:'🏁'}[cat]||'⚓'}</span><b>${cat}</b><small>${n} actions</small></button>`}).join('')}</div></div>${facilitySummary()}`;
}
function category(cat){
 const acts=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat);
 return `${idle()}<div class="panel"><button class="secondary" onclick="cbSailingStableBack()">← Sailing</button><div class="section-head"><div><span class="eyebrow">SAILING • ${cat.toUpperCase()}</span><h2>${cat}</h2></div><span class="pill">Lv ${s.skills.Sailing||1}</span></div><div class="cb2-activity-list">${acts.length?acts.map(a=>{
   const unlocked=own(a.id)>0;
   const meets=typeof cbSailingReqMet==='function'?cbSailingReqMet(a):(s.skills.Sailing||1)>=(a.reqLevel||1);
   const active=s.idle?.activityId===a.id;
   const req=(a.reqCards||[]).map(id=>B[id]?.name||id).join(', ');
   let pts='?';let secs='?';try{pts=rewardFor(a);secs=cycleSeconds(a)}catch{}
   return `<div class="cb2-activity-card ${a.rarity} ${unlocked?'':'locked'} ${active?'idle-selected':''}">${img(a,'cb-activity-icon')}<div class="cb2-grow"><b>${a.name}</b><div class="muted">Sailing ${a.reqLevel||1} • ${pts} pts • ${secs}s<br>${req?`Facility: ${req}<br>`:''}${!unlocked?'Activity card required':meets?'Ready':'Missing facility/level requirement'}</div></div><div class="cb2-actions"><button ${unlocked&&meets?'':'disabled'} onclick="act('${a.id}')">Once</button><button class="${active?'danger':'primary'}" ${unlocked&&meets?'':'disabled'} onclick="${active?'stopIdle()':`startIdle('${a.id}')`}">${active?'Stop':'Idle'}</button></div></div>`;
 }).join(''):'<div class="muted">No Sailing activities found in this category.</div>'}</div></div>`;
}

render=function(){
 if(s.tab==='Activity'&&cbSailingStable.active){
   try{document.getElementById('app').innerHTML=shell(cbSailingStable.category?category(cbSailingStable.category):home())}
   catch(err){document.getElementById('app').innerHTML=shell(`<div class="panel"><button class="secondary" onclick="cbSailingStableBack()">← Skilling</button><h2>Sailing</h2><p class="muted">Sailing UI error: ${String(err.message||err)}</p></div>`)}
   return;
 }
 priorRender();
 if(s.tab==='Activity'&&window.cbCoreUi?.activityRoot==='Skilling'&&!window.cbCoreUi?.skill){
   const root=document.querySelector('.cbcore-root-grid');
   if(root){root.querySelectorAll('[data-sailing-skill]').forEach(x=>x.remove());root.insertAdjacentHTML('beforeend',`<button data-sailing-skill class="cbcore-root-card" onclick="cbOpenSailing()"><span>⛵</span><b>Sailing</b><small>Level ${s.skills.Sailing||1}</small></button>`);}
 }
};
render();
})();