// Cardbound v36: live idle progress, settlement, and gain feedback for every idle-capable activity.
(function(){
window.CARDBOUND_VERSION='v36';
window.CARDBOUND_BUILD='2026-08-14.1651-MDT';
window.CARDBOUND_BUILD_NOTE='All idle activities now settle live and show points + XP feedback';

const previousRender=render;
function applyV36Info(){
  const old=document.querySelector('[data-build-info]');
  if(old)old.remove();
  if(s.tab==='Home'){
    const content=document.querySelector('.content');
    if(content)content.insertAdjacentHTML('beforeend',`<div data-build-info class="panel" style="margin-top:12px"><span class="eyebrow">VERSION INFO</span><h3>Gielinor: Cardbound v36</h3><div class="muted">Build: ${CARDBOUND_BUILD}<br>${CARDBOUND_BUILD_NOTE}</div></div>`);
  }
  const stamp=document.getElementById('cardbound-build-stamp');
  if(stamp)stamp.textContent='Cardbound v36 • 2026-08-14 16:51 MDT';
}
render=function(){previousRender();applyV36Info();};

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

let idleTickBusy=false;
function liveIdleTick(){
  if(idleTickBusy||!s.idle?.activityId||!s.idle?.lastTick)return;
  const a=A.find(x=>x.id===s.idle.activityId);
  if(!a)return;
  // Manual-only systems should never enter the regular idle state, but explicitly ignore them if they do.
  if(a.noIdle||a.kind==='Divine'||a.kind==='Raid'||a.kind==='Challenge')return;
  idleTickBusy=true;
  try{
    const beforeLevels={...s.skills};
    const gained=settleIdle(false);
    if(gained&&gained.cycles>0){
      render();
      if(typeof toast==='function')toast(gainText(a,gained,beforeLevels));
    }else if(typeof cbUpdateIdleBar==='function'){
      cbUpdateIdleBar();
    }
  }catch(err){console.error('Live idle tick failed',err);}
  finally{idleTickBusy=false;}
}

for(const key of ['cb34SailingIdleTimer','cb35SailingIdleTimer','cb36IdleTimer'])if(window[key])clearInterval(window[key]);
window.cb36IdleTimer=setInterval(liveIdleTick,500);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)liveIdleTick()});
window.addEventListener('focus',liveIdleTick);
render();
})();