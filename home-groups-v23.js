// Home v23: compact grouped Combat + Skilling dashboard, with Sailing included.
(function(){
const priorRender=render;
function goRoot(root){s.tab='Activity';save();if(typeof cbSetActivityRoot==='function')cbSetActivityRoot(root);else render()}
function goSkill(skill){s.tab='Activity';save();if(skill==='Sailing'){if(window.cbCoreUi)cbCoreUi.activityRoot='Skilling';if(typeof cbSetSkill==='function')cbSetSkill('Sailing');else render();return}if(window.cbCoreUi)cbCoreUi.activityRoot='Skilling';if(typeof cbSetSkill==='function')cbSetSkill(skill);else render()}
window.cbHomeGoRoot=goRoot;window.cbHomeGoSkill=goSkill;
function levelRow(icon,name,level,onClick,sub='') {return `<button class="cb23-skill-row" onclick="${onClick}"><span class="cb23-icon">${icon}</span><span class="cb23-name"><b>${name}</b>${sub?`<small>${sub}</small>`:''}</span><span class="cb23-level">Lv ${level||1}</span><span class="cb23-arrow">›</span></button>`}
function build(){
 const combat=`<section class="panel cb23-group"><div class="cb23-group-head"><div><span class="eyebrow">COMBAT</span><h2>Combat Skills</h2></div><span class="cb23-group-icon">⚔️</span></div><div class="cb23-list">${levelRow('⚔️','Melee',s.skills.Melee,"cbHomeGoRoot('Melee')",'Close-range combat')}${levelRow('🏹','Ranged',s.skills.Ranged,"cbHomeGoRoot('Ranged')",'Bows, crossbows & thrown weapons')}${levelRow('✨','Magic',s.skills.Magic,"cbHomeGoRoot('Magic')",'Staves, spells & magic weapons')}${levelRow('☠️','Slayer',s.skills.Slayer,"cbHomeGoRoot('Slayer')",'Task and monster progression')}</div></section>`;
 const facilities=C.filter(c=>c.type==='Sailing Facility');
 const ownedFacilities=facilities.filter(c=>own(c.id)).length;
 const skilling=`<section class="panel cb23-group"><div class="cb23-group-head"><div><span class="eyebrow">SKILLING</span><h2>Gathering & Sailing</h2></div><span class="cb23-group-icon">🛠️</span></div><div class="cb23-list">${levelRow('🪓','Woodcutting',s.skills.Woodcutting,"cbHomeGoSkill('Woodcutting')")}${levelRow('⛏️','Mining',s.skills.Mining,"cbHomeGoSkill('Mining')")}${levelRow('🎣','Fishing',s.skills.Fishing,"cbHomeGoSkill('Fishing')")}${levelRow('⛵','Sailing',s.skills.Sailing,"cbHomeGoSkill('Sailing')",`${ownedFacilities}/${facilities.length} facilities unlocked`)}</div></section>`;
 const progress=`<section class="panel cb23-progress"><div><span class="eyebrow">PROGRESS</span><h3>Adventure Summary</h3></div><div class="cb23-progress-grid"><div><b>${s.packs||0}</b><small>Packs opened</small></div><div><b>${(s.actions||0).toLocaleString()}</b><small>Actions</small></div><div><b>${C.filter(c=>own(c.id)).length}/${C.length}</b><small>Cards</small></div><div><b>${s.foils?C.filter(c=>(s.foils[c.id]||0)>0).length:0}</b><small>Foils</small></div></div></section>`;
 return `<div class="cb23-home-groups">${combat}${skilling}</div>${progress}`;
}
function apply(){if(s.tab!=='Home')return;const content=document.querySelector('.content');if(!content||content.querySelector('.cb23-home-groups'))return;content.querySelector('.cbcore-combat-grid')?.remove();content.querySelector('.stats-grid')?.remove();content.querySelector('[data-sailing-home]')?.remove();const hero=content.querySelector('.hero');if(hero)hero.insertAdjacentHTML('afterend',build());else content.insertAdjacentHTML('beforeend',build());}
render=function(){priorRender();apply()};
render();
})();