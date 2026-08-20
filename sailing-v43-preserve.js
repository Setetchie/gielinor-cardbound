// Preserve first-pass Sailing category/navigation behavior inside the v43 grouped Activity shell.
(function(){
  'use strict';
  let active=false, category=null;
  const baseActivity=window.cbV43Activity;
  const baseRender=window.render;
  const icons={'Port Tasks':'📜',Charting:'🗺️',Salvaging:'🪝',Trawling:'🐟',Combat:'💥',Trials:'🏁'};
  function idle(){try{return typeof cbIdlePanel==='function'?cbIdlePanel():''}catch{return ''}}
  function img(a){try{return typeof cardImage==='function'?cardImage(a,'cb-activity-icon'):`<span class="icon">${a.icon||'⚓'}</span>`}catch{return '<span class="icon">⚓</span>'}}
  function actionCard(a){
    const unlocked=own(a.id)>0;
    const meets=typeof cbSailingReqMet==='function'?cbSailingReqMet(a):(s.skills.Sailing||1)>=(a.reqLevel||1);
    const selected=s.idle&&s.idle.activityId===a.id;
    const req=(a.reqCards||[]).map(id=>B[id]?.name||id).join(', ');
    let pts='?', secs='?'; try{pts=rewardFor(a);secs=cycleSeconds(a)}catch{}
    return `<div class="cb2-activity-card ${a.rarity||'Common'} ${unlocked?'':'locked'} ${selected?'idle-selected':''}" data-cb-content-id="activity:${a.id}">${img(a)}<div class="cb2-grow"><b>${a.name}</b><div class="muted">Requires Sailing Level ${a.reqLevel||1} • ${pts} pts / action • ${secs}s / action${req?`<br>Facility: ${req}`:''}<br>${!unlocked?'Activity Binding required':meets?'Ready':'Missing facility/level requirement'}</div></div><div class="cb2-actions"><button ${unlocked&&meets?'':'disabled'} class="${selected?'danger':'primary'}" onclick="${selected?'stopIdle()':`startIdle('${a.id}')`}">${selected?'Stop':'Idle'}</button></div></div>`;
  }
  function draw(){
    if(!active||s.tab!=='Activity')return;
    const content=document.querySelector('.content');if(!content)return;
    const lv=s.skills.Sailing||1;
    if(!category){
      const cats=window.cbSailingCategories||['Port Tasks','Charting','Salvaging','Trawling','Combat','Trials'];
      const facilities=C.filter(c=>c.type==='Sailing Facility'), ownedFacilities=facilities.filter(c=>own(c.id)).length;
      content.innerHTML=`${idle()}<div class="panel"><button class="secondary" onclick="cbV43SailingExit()">← Activity groups</button><span class="eyebrow">SAILING</span><div class="section-head"><h2>Sailing</h2><span class="pill">Lv ${lv}</span></div><p class="muted">Choose a Sailing method. The detailed first-pass Sailing hierarchy is preserved inside the broader v43 Activity structure.</p><div class="cb-sailing-categories">${cats.map(cat=>`<button class="cb-sailing-category" onclick="cbV43SailingCategory('${cat.replace(/'/g,"\\'")}')"><span>${icons[cat]||'⚓'}</span><b>${cat}</b><small>${A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===cat).length} actions</small></button>`).join('')}</div></div><div class="panel"><span class="eyebrow">SHIP FACILITIES</span><h3>${ownedFacilities}/${facilities.length} unlocked</h3></div>`;
    }else{
      const acts=A.filter(a=>a.kind==='Sailing'&&a.sailingCategory===category);
      content.innerHTML=`${idle()}<div class="panel"><button class="secondary" onclick="cbV43SailingCategory(null)">← Sailing</button><span class="eyebrow">SAILING • ${category.toUpperCase()}</span><div class="section-head"><h2>${category}</h2><span class="pill">Lv ${lv}</span></div><div class="cb2-activity-list">${acts.map(actionCard).join('')||'<p class="muted">No activities found.</p>'}</div></div>`;
    }
    if(typeof window.cbClearContentNew==='function')document.querySelectorAll('[data-cb-content-id]').forEach(()=>{});
  }
  window.cbV43Activity=function(view){
    if(view==='Sailing'){active=true;category=null;if(typeof baseActivity==='function')baseActivity('Sailing');queueMicrotask(draw);return;}
    active=false;category=null;return typeof baseActivity==='function'?baseActivity(view):undefined;
  };
  window.cbV43SailingCategory=function(cat){category=cat;render();};
  window.cbV43SailingExit=function(){active=false;category=null;if(typeof baseActivity==='function')baseActivity(null);};
  if(typeof baseRender==='function')window.render=function(){const out=baseRender.apply(this,arguments);queueMicrotask(draw);return out;};
})();
