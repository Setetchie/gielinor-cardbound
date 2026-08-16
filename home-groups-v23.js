// Home navigation helpers. Home page rendering is owned by core-ui-fix.js.
(function(){
function goRoot(root){s.tab='Activity';save();if(typeof cbSetActivityRoot==='function')cbSetActivityRoot(root);else render()}
function goSkill(skill){s.tab='Activity';save();if(window.cbCoreUi)cbCoreUi.activityRoot='Skilling';if(typeof cbSetSkill==='function')cbSetSkill(skill);else render()}
window.cbHomeGoRoot=goRoot;
window.cbHomeGoSkill=goSkill;
})();
