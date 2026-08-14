// Cardbound v35: Sailing idle cycles settle live and show gain feedback.
(function(){
window.CARDBOUND_VERSION='v35';
window.CARDBOUND_BUILD='2026-08-14.1650-MDT';
window.CARDBOUND_BUILD_NOTE='Sailing idle cycles now show points + Sailing XP gain popups';

const previousRender=render;
function applyV35Info(){
  const old=document.querySelector('[data-build-info]');
  if(old)old.remove();
  if(s.tab==='Home'){
    const content=document.querySelector('.content');
    if(content)content.insertAdjacentHTML('beforeend',`<div data-build-info class="panel" style="margin-top:12px"><span class="eyebrow">VERSION INFO</span><h3>Gielinor: Cardbound v35</h3><div class="muted">Build: ${CARDBOUND_BUILD}<br>${CARDBOUND_BUILD_NOTE}</div></div>`);
  }
  const stamp=document.getElementById('cardbound-build-stamp');
  if(stamp)stamp.textContent='Cardbound v35 • 2026-08-14 16:50 MDT';
}
render=function(){previousRender();applyV35Info();};

let sailingTickBusy=false;
function liveSailingIdleTick(){
  if(sailingTickBusy||!s.idle?.activityId||!s.idle?.lastTick)return;
  const a=A.find(x=>x.id===s.idle.activityId);
  if(!a||a.kind!=='Sailing')return;
  sailingTickBusy=true;
  try{
    const beforeXp=s.xp?.Sailing||0;
    const beforeLevel=s.skills?.Sailing||1;
    const gained=settleIdle(false);
    if(gained&&gained.cycles>0){
      const perCycleXp=Math.max(2,Math.round((a.hp||a.base)/4));
      const xpGain=gained.cycles*perCycleXp;
      render();
      const lvlUp=(s.skills?.Sailing||1)>beforeLevel?` • Sailing Lv ${s.skills.Sailing}`:'';
      if(typeof toast==='function')toast(`+${gained.points.toLocaleString()} points • +${xpGain.toLocaleString()} Sailing XP${lvlUp}`);
    }else if(typeof cbUpdateIdleBar==='function'){
      cbUpdateIdleBar();
    }
  }catch(err){
    console.error('Sailing idle tick failed',err);
  }finally{sailingTickBusy=false;}
}
if(window.cb34SailingIdleTimer)clearInterval(window.cb34SailingIdleTimer);
if(window.cb35SailingIdleTimer)clearInterval(window.cb35SailingIdleTimer);
window.cb35SailingIdleTimer=setInterval(liveSailingIdleTick,500);

document.addEventListener('visibilitychange',()=>{if(!document.hidden)liveSailingIdleTick()});
window.addEventListener('focus',liveSailingIdleTick);
render();
})();