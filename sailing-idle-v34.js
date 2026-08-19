// Cardbound v37: live idle progress, settlement, gain feedback, and next-activity ETA.
(function(){
// This enhancement module may load after newer content/build layers. Preserve
// the current build identity instead of downgrading the app back to v37.
if(!window.CARDBOUND_VERSION)window.CARDBOUND_VERSION='v37';
if(!window.CARDBOUND_BUILD)window.CARDBOUND_BUILD='2026-08-14.1654-MDT';
if(!window.CARDBOUND_BUILD_NOTE)window.CARDBOUND_BUILD_NOTE='Idle tracker now shows ETA to the next activity level unlock';

const previousRender=render;
function applyV37Info(){
  const old=document.querySelector('[data-build-info]');
  if(old)old.remove();
  if(s.tab==='Home'){
    const content=document.querySelector('.content');
    if(content)content.insertAdjacentHTML('beforeend',`<div data-build-info class="panel" style="margin-top:12px"><span class="eyebrow">VERSION INFO</span><h3>Cardbound ${CARDBOUND_VERSION}</h3><div class="muted">Build: ${CARDBOUND_BUILD}<br>${CARDBOUND_BUILD_NOTE}</div></div>`);
  }
  const stamp=document.getElementById('cardbound-build-stamp');
  if(stamp)stamp.textContent=`Cardbound ${CARDBOUND_VERSION} • ${CARDBOUND_BUILD}`;
}
render=function(){previousRender();applyV37Info();updateNextUnlockDisplay();};

function equippedCombatStyle(){return B[s.equipped?.weapon]?.combatStyle||'Melee';}
function xpPerCycle(a){return Math.max(2,Math.round((a.hp||a.base)/4));}
function gainText(a,gained,beforeLevels){
  const per=xpPerCycle(a), xpGain=gained.cycles*per;
  const bits=[`+${gained.points.toLocaleString()} points`];
  if(a.kind==='Combat'){
    const st=equippedCombatStyle();bits.push(`+${xpGain.toLocaleString()} ${st} XP`);
    if((s.skills?.[st]||1)>(beforeLevels[st]||1))bits.push(`${st} Lv ${s.skills[st]}`);
  }else if(a.kind==='Slayer'){
    const st=equippedCombatStyle();bits.push(`+${xpGain.toLocaleString()} ${st} XP`,`+${xpGain.toLocaleString()} Slayer XP`);
    if((s.skills?.[st]||1)>(beforeLevels[st]||1))bits.push(`${st} Lv ${s.skills[st]}`);
    if((s.skills?.Slayer||1)>(beforeLevels.Slayer||1))bits.push(`Slayer Lv ${s.skills.Slayer}`);
  }else{
    bits.push(`+${xpGain.toLocaleString()} ${a.kind} XP`);
    if((s.skills?.[a.kind]||1)>(beforeLevels[a.kind]||1))bits.push(`${a.kind} Lv ${s.skills[a.kind]}`);
  }
  return bits.join(' • ');
}

function trainingSkillFor(a){
  if(a.kind==='Combat')return equippedCombatStyle();
  if(a.kind==='Slayer')return 'Slayer';
  return a.kind;
}
function activityLevelReq(a,skill){
  if(skill==='Slayer')return a.slayerReq||((a.reqSkill==='Slayer')?a.reqLevel:null);
  if(['Melee','Ranged','Magic'].includes(skill))return a.reqStyle===skill?a.reqStyleLevel:(a.reqCombat||null);
  return a.reqSkill===skill?a.reqLevel:(a.kind===skill?(a.reqLevel||null):null);
}
function nextActivityFor(a){
  const skill=trainingSkillFor(a), lv=s.skills?.[skill]||1;
  const candidates=A.map(x=>({a:x,req:activityLevelReq(x,skill)})).filter(x=>x.req!=null&&x.req>lv);
  candidates.sort((x,y)=>x.req-y.req||x.a.name.localeCompare(y.a.name));
  return candidates[0]?{...candidates[0],skill}:null;
}
function xpNeededToLevel(skill,target){
  let lv=s.skills?.[skill]||1;
  if(target<=lv)return 0;
  let need=Math.max(0,(20+lv*lv*8)-(s.xp?.[skill]||0));
  for(let l=lv+1;l<target;l++)need+=20+l*l*8;
  return need;
}
function fmtDuration(totalSeconds){
  totalSeconds=Math.max(0,Math.round(totalSeconds));
  const d=Math.floor(totalSeconds/86400);totalSeconds%=86400;
  const h=Math.floor(totalSeconds/3600);totalSeconds%=3600;
  const m=Math.floor(totalSeconds/60),sec=totalSeconds%60;
  if(d)return `${d}d ${h}h ${m}m`;
  if(h)return `${h}h ${m}m`;
  if(m)return `${m}m ${sec}s`;
  return `${sec}s`;
}
function nextUnlockData(a){
  const nxt=nextActivityFor(a);
  if(!nxt)return null;
  const xpNeed=xpNeededToLevel(nxt.skill,nxt.req), per=xpPerCycle(a), secs=cycleSeconds(a);
  const cycles=Math.max(1,Math.ceil(xpNeed/per));
  const elapsed=Math.max(0,Date.now()-(s.idle?.lastTick||Date.now()));
  const into=elapsed%(secs*1000), firstRemain=Math.max(0,(secs*1000)-into)/1000;
  const eta=firstRemain+Math.max(0,cycles-1)*secs;
  return {skill:nxt.skill,name:nxt.a.name,level:nxt.req,xpNeed,cycles,eta};
}
function updateNextUnlockDisplay(){
  const idlePanel=document.querySelector('.cb-idle');
  if(!idlePanel||!s.idle?.activityId)return;
  const a=A.find(x=>x.id===s.idle.activityId);if(!a)return;
  let box=idlePanel.querySelector('[data-next-unlock]');
  if(!box){
    box=document.createElement('div');box.setAttribute('data-next-unlock','');box.className='cb-cycle-meta';box.style.marginTop='6px';
    idlePanel.appendChild(box);
  }
  const n=nextUnlockData(a);
  if(!n){box.innerHTML='<span>Next activity</span><span>All current level unlocks reached</span>';return;}
  box.innerHTML=`<span>Next activity: <b>${n.name}</b> at ${n.skill} Lv ${n.level}</span><span>~${fmtDuration(n.eta)} • ${n.xpNeed.toLocaleString()} XP remaining</span>`;
}

let idleTickBusy=false;
function liveIdleTick(){
  if(idleTickBusy||!s.idle?.activityId||!s.idle?.lastTick)return;
  const a=A.find(x=>x.id===s.idle.activityId);
  if(!a)return;
  if(a.noIdle||a.kind==='Divine'||a.kind==='Raid'||a.kind==='Challenge')return;
  idleTickBusy=true;
  try{
    const beforeLevels={...s.skills};
    const gained=settleIdle(false);
    if(gained&&gained.cycles>0){
      render();
      if(typeof toast==='function')toast(gainText(a,gained,beforeLevels));
    }else{
      if(typeof cbUpdateIdleBar==='function')cbUpdateIdleBar();
      updateNextUnlockDisplay();
    }
  }catch(err){console.error('Live idle tick failed',err);}
  finally{idleTickBusy=false;}
}

for(const key of ['cb34SailingIdleTimer','cb35SailingIdleTimer','cb36IdleTimer','cb37IdleTimer'])if(window[key])clearInterval(window[key]);
window.cb37IdleTimer=cbIdleEngine.configure({cadence:500,tick:liveIdleTick,resume:liveIdleTick});
window.addEventListener('focus',()=>cbIdleEngine.resume());
render();
})();
