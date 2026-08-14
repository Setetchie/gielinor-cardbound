// UI fix: Combat is a parent category with separate Melee, Ranged, and Magic branches.
(function(){
if(!window.cbCombatMenu)window.cbCombatMenu={style:null};
const styles=['Melee','Ranged','Magic'];
function styleIcon(st){return st==='Melee'?'⚔️':st==='Ranged'?'🏹':'✨'}
function equippedWeaponStyle(){const w=B[s.equipped.weapon];return w?.combatStyle||'Melee'}
window.setCombatBranch=function(st){cbCombatMenu.style=st;render()};
window.backCombatBranch=function(){cbCombatMenu.style=null;render()};
function combatRoot(){return `${cbIdlePanel?cbIdlePanel():''}<div class="panel"><span class="eyebrow">COMBAT</span><h2>Choose a combat style</h2><p class="muted">Melee, Ranged, and Magic have separate levels and XP. Your equipped weapon determines the style used when fighting.</p><div class="cb2-root-grid">${styles.map(st=>`<button class="cb2-root-card" onclick="setCombatBranch('${st}')"><span>${styleIcon(st)}</span><b>${st}</b><small>Level ${s.skills[st]||1}</small></button>`).join('')}</div></div>`}
function branchHeader(st){const current=equippedWeaponStyle();return `<div class="panel"><div class="section-head"><button class="secondary" onclick="backCombatBranch()">← Combat</button><span class="pill">${styleIcon(st)} ${st} Lv ${s.skills[st]||1}</span></div><h2>${st} Combat</h2><p class="muted">${current===st?`Your equipped weapon is currently ${st}.`:`Equip a ${st.toLowerCase()} weapon in Bank to fight and train ${st}.`}</p></div>`}
function combatList(st){const current=equippedWeaponStyle();const acts=A.filter(a=>a.kind==='Combat');return `${branchHeader(st)}<div class="panel"><div class="cb2-activity-list">${acts.map(a=>{const unlocked=!!own(a.id),meets=cb2Meets(a),usable=current===st&&unlocked&&meets;return `<div class="cb2-activity-card ${a.rarity} ${unlocked?'':'locked'}">${cb2Img(a,'cb-activity-icon')}<div class="cb2-grow"><b>${a.name}</b><div class="muted">${a.hp||'?'} HP • ${rewardFor(a)} pts • ${cycleSeconds(a)}s<br>${unlocked?(meets?'Card unlocked':'Requirements not met'):'Card required'}</div></div><div class="cb2-actions"><button ${usable?'':'disabled'} onclick="act('${a.id}')">Once</button><button class="primary" ${usable?'':'disabled'} onclick="startIdle('${a.id}')">Idle</button></div></div>`}).join('')}</div></div>`}
const priorActivity=activityPage;
activityPage=function(){if(cb2State.root==='Combat'){return cbCombatMenu.style?combatList(cbCombatMenu.style):combatRoot()}return priorActivity()};
render();
})();