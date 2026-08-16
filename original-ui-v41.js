// Original-IP development UI adapter. Temporary until the unified router owns terminology natively.
(function(){
if(!window.CARDBOUND_ORIGINAL_MODE)return;
// The current vertical slice has Common/Uncommon/Rare cards only.
packs.Wayfarer.o=[76,20,4,0,0];
packs.Binder.o=[55,30,15,0,0];
packs.Frontier.o=[35,40,25,0,0];

const replacements=[
 [/Gielinor:\s*Cardbound/gi,'Cardbound'],[/GIELINOR/g,'THE REACH'],
 [/\bSlayer\b/g,'Huntsmanship'],[/\bWoodcutting\b/g,'Woodcraft'],
 [/\bBank\b/g,'Vault'],[/\bCollection\b/g,'Codex'],[/\bForge\b/g,'Bindery'],
 [/\bActivity\b/g,'Venture'],[/\bActivities\b/g,'Ventures']
];
function sanitize(root=document){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const n of nodes){let t=n.nodeValue;for(const [re,v] of replacements)t=t.replace(re,v);if(t!==n.nodeValue)n.nodeValue=t;}
  document.title='Cardbound — Greenwake Development';
  const stamp=document.getElementById('cardbound-build-stamp');
  const stampText='Cardbound v41-original • Greenwake Frontier';
  if(stamp&&stamp.textContent!==stampText)stamp.textContent=stampText;
}
const previousRender=render;
render=function(){previousRender();sanitize(document.getElementById('app')||document);};
const observer=new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1||n.nodeType===3)sanitize(n.nodeType===1?n:n.parentNode)});
observer.observe(document.body,{childList:true,subtree:true});
const style=document.createElement('style');style.textContent=`.cb-original-glyph{display:grid;place-items:center;width:52px;height:52px;font-size:34px;line-height:1}.cb-original-art{display:inline-grid;place-items:center}.cb-original-mode-banner{border:1px solid #6d593f;padding:8px 10px;border-radius:8px;margin-bottom:10px}`;document.head.appendChild(style);
queueMicrotask(()=>{render();const content=document.querySelector('.content');if(content&&!content.querySelector('.cb-original-mode-banner'))content.insertAdjacentHTML('afterbegin','<div class="cb-original-mode-banner"><b>Original-IP Development Mode</b><div class="muted">Greenwake Frontier vertical slice • placeholder glyph art only</div></div>');sanitize(document);});
})();