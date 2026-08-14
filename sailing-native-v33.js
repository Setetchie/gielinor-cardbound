// Cardbound v33: native Sailing route inside the core Skilling state.
(function(){
window.CARDBOUND_VERSION='v33';
window.CARDBOUND_BUILD='2026-08-14.1644-MDT';
window.CARDBOUND_BUILD_NOTE='Sailing is now a native Skilling skill page';

if(!window.cbCoreSailing)window.cbCoreSailing={category:null};
const previousRender=render;
const previousSetSkill=window.cbSetSkill;

window.cbSetSkill=function(skill){
  if(skill==='Sailing'){
    if(window.cbCoreUi){cbCoreUi.activityRoot='Skilling';cbCoreUi.skill='Sailing';}
    cbCoreSailing.category=null;
    s.tab='Activity';save();render();return;
  }
  if(skill==null&&window.cbCoreUi?.skill==='Sailing')cbCoreSailing.category=null;
  return previousSetSkill(skill);
};
window.cbOpenSailing=function(){return cbSetSkill('Sailing')};
window.cb33SailingCategory=function(cat){cbCoreSailing.category=cat;render()};
window.cb33SailingBack=function(){if(cbCoreSailing.category){cbCoreSailing.category=null;render();return;}cbSetSkill(null)};

const img=(c,cls='cb-activity-icon')=>{try{return typeof cardImage==='function'?cardImage(c,cls):`<span class="${cls}">${c?.icon||'⚓'}</span>`}catch{return `<span class="${cls}">${c?.icon||'⚓'}</span>`}};
const idle=()=>{try{return typeof cbIdlePanel==='function'?cbIdlePanel():(typeof idlePanel==='function'?idlePanel():'')}catch{return''}};
function sailingBody(){
 const lv=s.skills.Sailing||1;
 if(!cbCoreSailing.category){
   const cats=window.cbSailingCategories||['Port Tasks','Charting','Salvaging','Trawling','Combat','Trials'];
   const facilities=C.filter(c=>c.type==='Sailing Facility');
   const owned=facilities.filter(c=>own(c.id)).length;
   return `${idle()}<div class="panel"><button class="secondary" onclick="cb33SailingBack()">← Skills</button><span class="eyebrow">SKILLING • SAILING</span><div class="section-head"><h2>Sailing</h2><span class="pill">Lv ${lv}</span></div><p class="muted">Choose a Sailing method.</p><div class="cb-sailing-categories">${cats.map(cat=>`<button class="cb-sailing-category" onclick="cb33SailingCategory('${cat}')"><span>${{Port Tasks:'📜',Charting:'🗺️',Salvaging:'🪝',Trawling:'🐟',Combat:'💥',Trials:'🏁'}[cat]||'⚓'}</span><b>${cat}</b><small>${A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat).length} actions</small></button>`).join('')}</div></div><div class="panel"><span class="eyebrow">SHIP FACILITIES</span><h3>${owned}/${facilities.length} unlocked</h3></div>`;
 }
 const cat=cbCoreSailing.category,acts=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat);
 return `${idle()}<div class="panel"><button class="secondary" onclick="cb33SailingBack()">← Sailing</button><span class="eyebrow">SAILING • ${cat.toUpperCase()}</span><div class="section-head"><h2>${cat}</h2><span class="pill">Lv ${lv}</span></div><div class="cb2-activity-list">${acts.map(a=>{const unlocked=own(a.id)>0;const meets=typeof cbSailingReqMet==='function'?cbSailingReqMet(a):lv>=(a.reqLevel||1);const active=s.idle?.activityId===a.id;const req=(a.reqCards||[]).map(id=>B[id]?.name||id).join(', ');let pts='?';let secs='?';try{pts=rewardFor(a);secs=cycleSeconds(a)}catch{}return `<div class="cb2-activity-card ${a.rarity} ${unlocked?'':'locked'} ${active?'idle-selected':''}">${img(a)}<div class="cb2-grow"><b>${a.name}</b><div class="muted">Sailing ${a.reqLevel||1} • ${pts} pts • ${secs}s${req?`<br>Facility: ${req}`:''}<br>${!unlocked?'Activity card required':meets?'Ready':'Missing facility/level requirement'}</div></div><div class="cb2-actions"><button ${unlocked&&meets?'':'disabled'} onclick="act('${a.id}')">Once</button><button ${unlocked&&meets?'':'disabled'} class="${active?'danger':'primary'}" onclick="${active?'stopIdle()':`startIdle('${a.id}')`}">${active?'Stop':'Idle'}</button></div></div>`}).join('')||'<p class="muted">No activities found.</p>'}</div></div>`;
}
function versionInfo(){const c=document.querySelector('.content');if(s.tab==='Home'&&c&&!c.querySelector('[data-build-info]'))c.insertAdjacentHTML('beforeend',`<div data-build-info class="panel" style="margin-top:12px"><span class="eyebrow">VERSION INFO</span><h3>Gielinor: Cardbound v33</h3><div class="muted">Build: ${CARDBOUND_BUILD}<br>${CARDBOUND_BUILD_NOTE}</div></div>`)}
render=function(){
  if(s.tab==='Activity'&&window.cbCoreUi?.activityRoot==='Skilling'&&window.cbCoreUi?.skill==='Sailing'){
    previousRender();
    const content=document.querySelector('.content');
    if(content)content.innerHTML=sailingBody();
    return;
  }
  previousRender();
  // Native tile behavior: no special Sailing state, just select the skill.
  if(s.tab==='Activity'&&window.cbCoreUi?.activityRoot==='Skilling'&&!window.cbCoreUi?.skill){
    const btn=[...document.querySelectorAll('.cbcore-root-grid button')].find(b=>b.textContent.includes('Sailing'));
    if(btn){btn.onclick=()=>cbSetSkill('Sailing');btn.setAttribute('onclick',"cbSetSkill('Sailing')");}
  }
  versionInfo();
};
render();
})();