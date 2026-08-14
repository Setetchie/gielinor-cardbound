// v22: Move Sailing beneath Skilling in the Activity hierarchy.
(function(){
const priorRender=render;
const priorSetSkill=window.cbSetSkill;
window.cbSetSkill=function(skill){if(skill==='Sailing'){cbCoreUi.activityRoot='Skilling';cbCoreUi.skill='Sailing';if(window.cbSailingUi)cbSailingUi.category=null;render();return}return priorSetSkill(skill)};
render=function(){
  priorRender();
  if(s.tab!=='Activity')return;
  // Remove any old top-level Sailing button.
  document.querySelectorAll('[data-sailing-root]').forEach(x=>x.remove());
  // Add Sailing to the Skilling skill chooser.
  if(window.cbCoreUi?.activityRoot==='Skilling'&&!window.cbCoreUi?.skill){
    const root=document.querySelector('.cbcore-root-grid');
    if(root&&!root.querySelector('[data-sailing-skill]'))root.insertAdjacentHTML('beforeend',`<button data-sailing-skill class="cbcore-root-card" onclick="cbSetSkill('Sailing')"><span>⛵</span><b>Sailing</b><small>Level ${s.skills.Sailing||1}</small></button>`);
  }
  // If Sailing is selected under Skilling, hand off to the existing Sailing UI.
  if(window.cbCoreUi?.activityRoot==='Skilling'&&window.cbCoreUi?.skill==='Sailing'){
    cbCoreUi.activityRoot='Sailing';cbCoreUi.skill=null;
    render();
  }
};
render();
})();