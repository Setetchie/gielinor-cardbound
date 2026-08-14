// Cardbound v34: Sailing idle cycles now settle live while the app is open.
(function(){
window.CARDBOUND_VERSION='v34';
window.CARDBOUND_BUILD='2026-08-14.1647-MDT';
window.CARDBOUND_BUILD_NOTE='Sailing idle cycles immediately award points and Sailing XP';

const previousRender=render;
function applyV34Info(){
  const old=document.querySelector('[data-build-info]');
  if(old)old.remove();
  if(s.tab==='Home'){
    const content=document.querySelector('.content');
    if(content)content.insertAdjacentHTML('beforeend',`<div data-build-info class="panel" style="margin-top:12px"><span class="eyebrow">VERSION INFO</span><h3>Gielinor: Cardbound v34</h3><div class="muted">Build: ${CARDBOUND_BUILD}<br>${CARDBOUND_BUILD_NOTE}</div></div>`);
  }
  const stamp=document.getElementById('cardbound-build-stamp');
  if(stamp)stamp.textContent='Cardbound v34 • 2026-08-14 16:47 MDT';
}
render=function(){previousRender();applyV34Info();};

let sailingTickBusy=false;
function liveSailingIdleTick(){
  if(sailingTickBusy||!s.idle?.activityId||!s.idle?.lastTick)return;
  const a=A.find(x=>x.id===s.idle.activityId);
  if(!a||a.kind!=='Sailing')return;
  sailingTickBusy=true;
  try{
    const gained=settleIdle(false);
    if(gained&&gained.cycles>0){
      // settleIdle already credits points, actions, Sailing XP, total idle points, and advances lastTick.
      render();
    }else if(typeof cbUpdateIdleBar==='function'){
      cbUpdateIdleBar();
    }
  }catch(err){
    console.error('Sailing idle tick failed',err);
  }finally{sailingTickBusy=false;}
}
if(window.cb34SailingIdleTimer)clearInterval(window.cb34SailingIdleTimer);
window.cb34SailingIdleTimer=setInterval(liveSailingIdleTick,500);

// Settle immediately when returning to the foreground as well.
document.addEventListener('visibilitychange',()=>{if(!document.hidden)liveSailingIdleTick()});
window.addEventListener('focus',liveSailingIdleTick);
render();
})();