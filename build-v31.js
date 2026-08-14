// Cardbound v32: Activity Sailing uses the exact same route as Home.
(function(){
window.CARDBOUND_VERSION='v32';
window.CARDBOUND_BUILD='2026-08-14.1642-MDT';
window.CARDBOUND_BUILD_NOTE='Activity Sailing now calls the working Home Sailing route';

const previousRender=render;
const sailingState={active:false,category:null};
const img=(c,cls='cb-activity-icon')=>{try{return typeof cardImage==='function'?cardImage(c,cls):`<span class="${cls}">${c?.icon||'⚓'}</span>`}catch{return `<span class="${cls}">${c?.icon||'⚓'}</span>`}};
const idle=()=>{try{return typeof cbIdlePanel==='function'?cbIdlePanel():(typeof idlePanel==='function'?idlePanel():'')}catch{return''}};
function tabs(){const list=['Home','Activity','Packs','Bank','Collection','Forge','Event'];return `<div class="tabs"><div>${list.map(t=>`<button class="tab ${s.tab===t?'active':''}" onclick="cb32CloseSailing();nav('${t}')">${{Home:'🏠',Activity:'⚔️',Packs:'🎁',Bank:'🏦',Collection:'🃏',Forge:'🔥',Event:'✦'}[t]}<br>${t}</button>`).join('')}</div></div>`}
function shell(body){return `<div class="app"><div class="top"><div class="brand">⚔️ <b>Gielinor: Cardbound</b> <span class="pill">v32</span></div><div class="wallet"><span class="pill">🪙 ${s.points.toLocaleString()} points</span><span class="pill">🃏 ${C.filter(c=>own(c.id)).length}/${C.length}</span></div></div><div class="content">${body}</div>${tabs()}</div>`}
window.cb32OpenSailing=function(){sailingState.active=true;sailingState.category=null;s.tab='Activity';save();render()};
window.cb32OpenSailingCategory=function(cat){sailingState.active=true;sailingState.category=cat;render()};
window.cb32BackSailing=function(){if(sailingState.category){sailingState.category=null;render();return;}sailingState.active=false;if(window.cbCoreUi){cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=null;}render()};
window.cb32CloseSailing=function(){sailingState.active=false;sailingState.category=null};
window.cbOpenSailing=window.cb32OpenSailing;
function sailingHome(){const cats=window.cbSailingCategories||['Port Tasks','Charting','Salvaging','Trawling','Combat','Trials'];const facilities=C.filter(c=>c.type==='Sailing Facility');const owned=facilities.filter(c=>own(c.id)).length;return `${idle()}<div class="panel"><button class="secondary" onclick="cb32BackSailing()">← Skilling</button><span class="eyebrow">SKILLING • SAILING</span><div class="section-head"><h2>Sailing</h2><span class="pill">Lv ${s.skills.Sailing||1}</span></div><p class="muted">Choose a Sailing method.</p><div class="cb-sailing-categories">${cats.map(cat=>`<button class="cb-sailing-category" onclick="cb32OpenSailingCategory('${cat}')"><span>${{Port Tasks:'📜',Charting:'🗺️',Salvaging:'🪝',Trawling:'🐟',Combat:'💥',Trials:'🏁'}[cat]||'⚓'}</span><b>${cat}</b><small>${A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat).length} actions</small></button>`).join('')}</div></div><div class="panel"><span class="eyebrow">SHIP FACILITIES</span><h3>${owned}/${facilities.length} unlocked</h3></div>`}
function sailingCategory(cat){const acts=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat);return `${idle()}<div class="panel"><button class="secondary" onclick="cb32BackSailing()">← Sailing</button><span class="eyebrow">SAILING • ${cat.toUpperCase()}</span><div class="section-head"><h2>${cat}</h2><span class="pill">Lv ${s.skills.Sailing||1}</span></div><div class="cb2-activity-list">${acts.map(a=>{const unlocked=own(a.id)>0;const meets=typeof cbSailingReqMet==='function'?cbSailingReqMet(a):(s.skills.Sailing||1)>=(a.reqLevel||1);const active=s.idle?.activityId===a.id;const req=(a.reqCards||[]).map(id=>B[id]?.name||id).join(', ');let pts='?';let secs='?';try{pts=rewardFor(a);secs=cycleSeconds(a)}catch{}return `<div class="cb2-activity-card ${a.rarity} ${unlocked?'':'locked'} ${active?'idle-selected':''}">${img(a)}<div class="cb2-grow"><b>${a.name}</b><div class="muted">Sailing ${a.reqLevel||1} • ${pts} pts • ${secs}s${req?`<br>Facility: ${req}`:''}<br>${!unlocked?'Activity card required':meets?'Ready':'Missing facility/level requirement'}</div></div><div class="cb2-actions"><button ${unlocked&&meets?'':'disabled'} onclick="act('${a.id}')">Once</button><button ${unlocked&&meets?'':'disabled'} class="${active?'danger':'primary'}" onclick="${active?'stopIdle()':`startIdle('${a.id}')`}">${active?'Stop':'Idle'}</button></div></div>`}).join('')||'<p class="muted">No activities found.</p>'}</div></div>`}
function addVersionInfo(){const content=document.querySelector('.content');if(!content||content.querySelector('[data-build-info]'))return;if(s.tab==='Home')content.insertAdjacentHTML('beforeend',`<div data-build-info class="panel" style="margin-top:12px"><span class="eyebrow">VERSION INFO</span><h3>Gielinor: Cardbound v32</h3><div class="muted">Build: ${CARDBOUND_BUILD}<br>${CARDBOUND_BUILD_NOTE}</div></div>`)}
function wireSailingTile(){
 if(s.tab!=='Activity'||window.cbCoreUi?.activityRoot!=='Skilling'||window.cbCoreUi?.skill)return;
 const grid=document.querySelector('.cbcore-root-grid');if(!grid)return;
 let btn=[...grid.querySelectorAll('button')].find(b=>b.textContent.includes('Sailing'));
 if(!btn)return;
 btn.removeAttribute('onclick');
 btn.onclick=function(ev){ev.preventDefault();ev.stopImmediatePropagation();if(typeof cbHomeGoSkill==='function')cbHomeGoSkill('Sailing');else cb32OpenSailing();return false;};
}
render=function(){if(s.tab==='Activity'&&sailingState.active){document.getElementById('app').innerHTML=shell(sailingState.category?sailingCategory(sailingState.category):sailingHome());return;}previousRender();wireSailingTile();addVersionInfo();};
render();
})();