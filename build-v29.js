// Cardbound v29: verifiable build metadata + hardened Sailing entry point.
(function(){
window.CARDBOUND_VERSION='v29';
window.CARDBOUND_BUILD='2026-08-14.1629-MDT';
window.CARDBOUND_BUILD_NOTE='Sailing menu route + visible version info';

const previousRender=render;
if(!window.cbV29Sailing) window.cbV29Sailing={active:false,category:null};

function img(c,cls='cb-activity-icon'){
  try{return typeof cardImage==='function'?cardImage(c,cls):`<span class="${cls}">${c?.icon||'⚓'}</span>`}
  catch{return `<span class="${cls}">${c?.icon||'⚓'}</span>`}
}
function idle(){try{return typeof cbIdlePanel==='function'?cbIdlePanel():(typeof idlePanel==='function'?idlePanel():'')}catch{return''}}
function tabs(){const list=['Home','Activity','Packs','Bank','Collection','Forge','Event'];return `<div class="tabs"><div>${list.map(t=>`<button class="tab ${s.tab===t?'active':''}" onclick="cbV29Sailing.active=false;nav('${t}')">${{Home:'🏠',Activity:'⚔️',Packs:'🎁',Bank:'🏦',Collection:'🃏',Forge:'🔥',Event:'✦'}[t]}<br>${t}</button>`).join('')}</div></div>`}
function shell(body){return `<div class="app"><div class="top"><div class="brand">⚔️ <b>Gielinor: Cardbound</b> <span class="pill">${CARDBOUND_VERSION}</span></div><div class="wallet"><span class="pill">🪙 ${s.points.toLocaleString()} points</span><span class="pill">🃏 ${C.filter(c=>own(c.id)).length}/${C.length}</span></div></div><div class="content">${body}</div>${tabs()}</div>`}

window.cbV29OpenSailing=function(){
  cbV29Sailing.active=true;
  cbV29Sailing.category=null;
  s.tab='Activity';
  save();
  render();
};
window.cbV29OpenSailingCategory=function(cat){cbV29Sailing.active=true;cbV29Sailing.category=cat;render()};
window.cbV29BackSailing=function(){
  if(cbV29Sailing.category){cbV29Sailing.category=null;render();return;}
  cbV29Sailing.active=false;
  if(window.cbCoreUi){cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=null;}
  render();
};

function sailingHome(){
  const cats=window.cbSailingCategories||['Port Tasks','Charting','Salvaging','Trawling','Combat','Trials'];
  const facilities=C.filter(c=>c.type==='Sailing Facility');
  const ownedFacilities=facilities.filter(c=>own(c.id)).length;
  return `${idle()}<div class="panel"><button class="secondary" onclick="cbV29BackSailing()">← Skilling</button><span class="eyebrow">SKILLING • SAILING</span><div class="section-head"><h2>Sailing</h2><span class="pill">Lv ${s.skills.Sailing||1}</span></div><p class="muted">Choose a Sailing activity type.</p><div class="cb-sailing-categories">${cats.map(cat=>`<button class="cb-sailing-category" onclick="cbV29OpenSailingCategory('${cat}')"><span>${{Port Tasks:'📜',Charting:'🗺️',Salvaging:'🪝',Trawling:'🐟',Combat:'💥',Trials:'🏁'}[cat]||'⚓'}</span><b>${cat}</b><small>${A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat).length} actions</small></button>`).join('')}</div></div><div class="panel"><span class="eyebrow">SHIP FACILITIES</span><h3>${ownedFacilities}/${facilities.length} unlocked</h3></div>`;
}
function sailingCategory(cat){
  const acts=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat);
  return `${idle()}<div class="panel"><button class="secondary" onclick="cbV29BackSailing()">← Sailing</button><span class="eyebrow">SAILING • ${cat.toUpperCase()}</span><div class="section-head"><h2>${cat}</h2><span class="pill">Lv ${s.skills.Sailing||1}</span></div><div class="cb2-activity-list">${acts.map(a=>{const unlocked=own(a.id)>0;const meets=typeof cbSailingReqMet==='function'?cbSailingReqMet(a):(s.skills.Sailing||1)>=(a.reqLevel||1);const active=s.idle?.activityId===a.id;const req=(a.reqCards||[]).map(id=>B[id]?.name||id).join(', ');let pts='?';let secs='?';try{pts=rewardFor(a);secs=cycleSeconds(a)}catch{}return `<div class="cb2-activity-card ${a.rarity} ${unlocked?'':'locked'} ${active?'idle-selected':''}">${img(a)}<div class="cb2-grow"><b>${a.name}</b><div class="muted">Sailing ${a.reqLevel||1} • ${pts} pts • ${secs}s${req?`<br>Facility: ${req}`:''}<br>${!unlocked?'Activity card required':meets?'Ready':'Missing facility/level requirement'}</div></div><div class="cb2-actions"><button ${unlocked&&meets?'':'disabled'} onclick="act('${a.id}')">Once</button><button ${unlocked&&meets?'':'disabled'} class="${active?'danger':'primary'}" onclick="${active?'stopIdle()':`startIdle('${a.id}')`}">${active?'Stop':'Idle'}</button></div></div>`}).join('')||'<p class="muted">No activities found.</p>'}</div></div>`;
}

function addVersionInfo(){
  const content=document.querySelector('.content');
  if(!content||content.querySelector('[data-build-info]'))return;
  const panel=`<div data-build-info class="panel" style="margin-top:12px"><span class="eyebrow">VERSION INFO</span><h3>Gielinor: Cardbound ${CARDBOUND_VERSION}</h3><div class="muted">Build: ${CARDBOUND_BUILD}<br>${CARDBOUND_BUILD_NOTE}</div></div>`;
  if(s.tab==='Home')content.insertAdjacentHTML('beforeend',panel);
  const brand=document.querySelector('.brand');
  if(brand&&!brand.querySelector('[data-version-badge]'))brand.insertAdjacentHTML('beforeend',` <span data-version-badge class="pill">${CARDBOUND_VERSION}</span>`);
}
function hardenSailingTile(){
  if(s.tab!=='Activity'||window.cbCoreUi?.activityRoot!=='Skilling'||window.cbCoreUi?.skill)return;
  const grid=document.querySelector('.cbcore-root-grid');
  if(!grid)return;
  let btn=grid.querySelector('[data-v29-sailing]');
  const old=[...grid.querySelectorAll('button')].find(b=>b.textContent.includes('Sailing'));
  if(old&&!old.hasAttribute('data-v29-sailing'))old.remove();
  btn=grid.querySelector('[data-v29-sailing]');
  if(!btn){
    grid.insertAdjacentHTML('beforeend',`<button data-v29-sailing class="cbcore-root-card"><span>⛵</span><b>Sailing</b><small>Level ${s.skills.Sailing||1}</small></button>`);
    btn=grid.querySelector('[data-v29-sailing]');
  }
  btn.onclick=function(ev){ev.preventDefault();ev.stopPropagation();cbV29OpenSailing();};
}

render=function(){
  if(s.tab==='Activity'&&cbV29Sailing.active){
    document.getElementById('app').innerHTML=shell(cbV29Sailing.category?sailingCategory(cbV29Sailing.category):sailingHome());
    return;
  }
  previousRender();
  hardenSailingTile();
  addVersionInfo();
};
render();
})();