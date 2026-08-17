// v43 testing model: Gathering is the parent Skill; Woodcutting/Mining/Fishing are subsets.
(function(){
  'use strict';
  const SUBSETS=['Woodcutting','Mining','Fishing'];
  const REGION='Greenwake';
  const TEST_TARGETS={Woodcutting:{progress:100,complete:250},Mining:{progress:100,complete:250},Fishing:{progress:80,complete:200}};
  function ensure(){
    if(typeof s==='undefined'||!s)return false;
    s.skills=s.skills||{}; s.xp=s.xp||{};
    const legacyLevels=SUBSETS.map(k=>Number(s.skills[k]||1));
    const legacyXp=SUBSETS.map(k=>Number(s.xp[k]||0));
    if(!s.skills.Gathering)s.skills.Gathering=Math.max(1,...legacyLevels);
    if(s.xp.Gathering==null)s.xp.Gathering=Math.max(0,...legacyXp);
    s.subsetProgress=s.subsetProgress||{};
    s.regionParticipation=s.regionParticipation||{};
    s.regionParticipation[REGION]=s.regionParticipation[REGION]||{};
    SUBSETS.forEach(k=>{
      if(s.subsetProgress[k]==null)s.subsetProgress[k]=0;
      if(s.regionParticipation[REGION][k]==null)s.regionParticipation[REGION][k]=0;
      // Compatibility mirrors only: legacy modules still read subset level fields for requirements.
      s.skills[k]=s.skills.Gathering;
      s.xp[k]=0;
    });
    try{save()}catch{}
    return true;
  }
  function gatheringXp(n){
    n=Math.max(0,Number(n)||0); if(!n)return;
    s.xp.Gathering=(s.xp.Gathering||0)+n;
    let req=20+s.skills.Gathering*s.skills.Gathering*8;
    while(s.xp.Gathering>=req){s.xp.Gathering-=req;s.skills.Gathering++;req=20+s.skills.Gathering*s.skills.Gathering*8;}
    SUBSETS.forEach(k=>{s.skills[k]=s.skills.Gathering;s.xp[k]=0;});
  }
  ensure();
  const legacyXp=window.xp;
  window.xp=function(kind,n){
    if(!ensure())return typeof legacyXp==='function'?legacyXp(kind,n):undefined;
    if(SUBSETS.includes(kind)){
      n=Math.max(0,Number(n)||0);
      s.subsetProgress[kind]=(s.subsetProgress[kind]||0)+n;
      const cfg=TEST_TARGETS[kind];
      s.regionParticipation[REGION][kind]=Math.min(cfg.complete,(s.regionParticipation[REGION][kind]||0)+n);
      gatheringXp(n);
      try{save()}catch{}
      return;
    }
    return typeof legacyXp==='function'?legacyXp(kind,n):undefined;
  };
  window.cbGatheringV43={
    subsets:SUBSETS.slice(),region:REGION,targets:TEST_TARGETS,
    level:()=>Number((typeof s!=='undefined'&&s.skills&&s.skills.Gathering)||1),
    xp:()=>Number((typeof s!=='undefined'&&s.xp&&s.xp.Gathering)||0),
    mastery:k=>Number((typeof s!=='undefined'&&s.subsetProgress&&s.subsetProgress[k])||0),
    participation:k=>Number((typeof s!=='undefined'&&s.regionParticipation&&s.regionParticipation[REGION]&&s.regionParticipation[REGION][k])||0)
  };

  function bar(value,max){const pct=Math.max(0,Math.min(100,max?value/max*100:0));return `<div class="cb-v43-mastery-bar"><span style="width:${pct}%"></span></div>`;}
  function enhance(){
    if(!ensure()||!document.getElementById('app'))return;
    // Remove the temporary legacy-model warning now that v43 has a parent-Skill test model.
    document.querySelectorAll('.cb-v43-inline-note .cb-v43-pill').forEach(el=>{
      if(/data-model refactor pending/i.test(el.textContent||''))el.remove();
    });
    if(s.tab!=='Activity')return;
    const h2=document.querySelector('.content h2'); if(!h2)return;
    const title=(h2.textContent||'').trim();
    if(title==='Gathering'){
      const head=document.querySelector('.cb-v43-page-head'); if(!head||document.getElementById('cb-gathering-summary'))return;
      const box=document.createElement('section'); box.id='cb-gathering-summary'; box.className='panel cb-v43-gathering-summary';
      box.innerHTML=`<div class="section-head"><div><span class="eyebrow">PARENT SKILL</span><h3>Gathering • Level ${cbGatheringV43.level()}</h3></div><span class="cb-v43-pill">Shared XP</span></div><p class="muted">Woodcutting, Mining and Fishing do not have independent levels. Using any Gathering subset advances the shared Gathering level while also building that subset's permanent mastery and current-Region participation.</p><div class="cb-v43-mastery-grid">${SUBSETS.map(k=>{const c=TEST_TARGETS[k],v=cbGatheringV43.participation(k);return `<div><b>${k}</b><small>Mastery ${cbGatheringV43.mastery(k).toLocaleString()}</small>${bar(v,c.complete)}<small>${REGION}: ${v}/${c.complete} • progression threshold ${c.progress}</small></div>`}).join('')}</div><p class="muted cb-v43-test-note">Threshold values are provisional test values; the hierarchy, dual progression layers and completion-cap behavior are the locked structure.</p>`;
      head.insertAdjacentElement('afterend',box);
    }
    if(SUBSETS.includes(title)){
      const head=document.querySelector('.cb-v43-page-head'); if(!head||document.getElementById('cb-subset-summary'))return;
      const c=TEST_TARGETS[title],v=cbGatheringV43.participation(title);
      const box=document.createElement('section');box.id='cb-subset-summary';box.className='panel cb-v43-subset-summary';
      box.innerHTML=`<div class="section-head"><div><span class="eyebrow">GATHERING SUBSET</span><h3>${title}</h3></div><span class="cb-v43-pill">Gathering Lv ${cbGatheringV43.level()}</span></div><div class="cb-v43-stats"><div class="cb-v43-stat"><b>${cbGatheringV43.mastery(title).toLocaleString()}</b><small>Global subset mastery</small></div><div class="cb-v43-stat"><b>${v}/${c.complete}</b><small>${REGION} participation</small></div><div class="cb-v43-stat"><b>${c.progress}</b><small>Progression threshold • test</small></div><div class="cb-v43-stat"><b>${c.complete}</b><small>Region completion cap • test</small></div></div>${bar(v,c.complete)}<p class="muted">Activities in this subset use the shared Gathering level for requirements. Higher-tier activities improve this subset's established profile and modestly improve subset progression efficiency; they do not create a separate ${title} level.</p>`;
      head.insertAdjacentElement('afterend',box);
    }
  }
  const legacyRender=window.render;
  if(typeof legacyRender==='function')window.render=function(){const out=legacyRender.apply(this,arguments);queueMicrotask(enhance);return out;};
  document.addEventListener('DOMContentLoaded',()=>queueMicrotask(enhance));
})();
