// v24: robust Sailing routing while keeping Sailing visually nested under Skilling.
(function(){
const priorRender=render;
const priorSetSkill=window.cbSetSkill;
const priorSailingBack=window.cbSailingBack;

window.cbSetSkill=function(skill){
  if(skill==='Sailing'){
    if(window.cbCoreUi){cbCoreUi.activityRoot='Sailing';cbCoreUi.skill=null;}
    if(window.cbSailingUi)cbSailingUi.category=null;
    s.tab='Activity';save();render();return;
  }
  return priorSetSkill(skill);
};

// Back from a Sailing method returns to Sailing home; Back from Sailing home returns to Skilling.
window.cbSailingBack=function(){
  if(window.cbSailingUi && cbSailingUi.category){cbSailingUi.category=null;render();return;}
  if(window.cbCoreUi){cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=null;}
  s.tab='Activity';save();render();
};
window.cbSailingExit=function(){
  if(window.cbCoreUi){cbCoreUi.activityRoot='Skilling';cbCoreUi.skill=null;}
  if(window.cbSailingUi)cbSailingUi.category=null;
  s.tab='Activity';save();render();
};

render=function(){
  priorRender();
  if(s.tab!=='Activity')return;
  // Sailing should only appear inside the Skilling chooser, never as a top-level activity.
  document.querySelectorAll('[data-sailing-root]').forEach(x=>x.remove());
  if(window.cbCoreUi?.activityRoot==='Skilling'&&!window.cbCoreUi?.skill){
    const root=document.querySelector('.cbcore-root-grid');
    if(root&&!root.querySelector('[data-sailing-skill]')){
      root.insertAdjacentHTML('beforeend',`<button data-sailing-skill class="cbcore-root-card" onclick="cbSetSkill('Sailing')"><span>⛵</span><b>Sailing</b><small>Level ${s.skills.Sailing||1}</small></button>`);
    }
  }
  // Fix the Sailing home back button produced by the older renderer.
  if(window.cbCoreUi?.activityRoot==='Sailing' && window.cbSailingUi && !cbSailingUi.category){
    const content=document.querySelector('.content');
    const back=content?.querySelector('button.secondary');
    if(back && back.textContent.includes('Activities')){
      back.setAttribute('onclick','cbSailingExit()');
      back.textContent='← Skilling';
    }
  }
};
render();
})();