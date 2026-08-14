// Foil variants: rare parallel pulls for every card. Foil gear gets +5% effective power; non-gear foils are cosmetic/collectible.
(function(){
if(!s.foils)s.foils={};
if(!s.equippedFoil)s.equippedFoil={};
const FOIL_RATE=0.0125; // 1.25% of pulled cards become foil
window.foilCount=id=>s.foils[id]||0;
window.isFoilEquipped=slot=>!!s.equippedFoil[slot];
const baseAdd=add;
add=function(id,opts){baseAdd(id);if(opts?.foil){s.foils[id]=(s.foils[id]||0)+1;}}
const baseOpenPack=openPack;
openPack=function(n){settleIdle(false);const p=packs[n];if(s.points<p.cost)return toast('Not enough points');s.points-=p.cost;s.packs++;const q=[];for(let i=0;i<p.n;i++){const r=roll(p.o),pool=C.filter(c=>c.rarity===r),c=pool[Math.floor(Math.random()*pool.length)],foil=Math.random()<FOIL_RATE;add(c.id,{foil});q.push({...c,count:own(c.id),foil,foilCount:foilCount(c.id)})}save();render();showPackOpening(n,q)};
const baseEquip=equip;
equip=function(id,foil){const c=B[id];if(!c?.slot)return;baseEquip(id);if(s.equipped[c.slot]===id)s.equippedFoil[c.slot]=!!foil&&foilCount(id)>0;save();render();};
const baseUnequip=unequip;
unequip=function(slot){baseUnequip(slot);delete s.equippedFoil[slot];save();};
// Apply foil bonus to equipped gear power.
const oldPower=power;
power=function(){return 5+Object.entries(s.equipped).filter(([,id])=>id).reduce((n,[slot,id])=>{const c=B[id];if(!c)return n;const mult=s.equippedFoil[slot]?1.05:1;return n+(c.power||0)*mult},0)};
if(typeof stPower==='function'){window.stPower=function(st){return 5+Object.entries(s.equipped).filter(([slot,id])=>id&&slot!=='tool').reduce((n,[slot,id])=>{const c=B[id];if(!c)return n;const styleMult=(c.combatStyle||'Melee')===st?1:.25,foilMult=s.equippedFoil[slot]?1.05:1;return n+(c.power||0)*styleMult*foilMult},0)}}
if(typeof stylePower==='function'){window.stylePower=function(st){return 5+Object.entries(s.equipped).filter(([slot,id])=>id&&slot!=='tool').reduce((n,[slot,id])=>{const c=B[id];if(!c)return n;const styleMult=(c.combatStyle||'Melee')===st?1:.25,foilMult=s.equippedFoil[slot]?1.05:1;return n+(c.power||0)*styleMult*foilMult},0)}}
// Enhance collection with normal + foil ownership.
const priorCollection=typeof cbCollection==='function'?cbCollection:null;
window.cbCollection=function(){
  const discovered=C.filter(c=>own(c.id)).length,foils=C.filter(c=>foilCount(c.id)).length;
  return `<div class="panel"><h2>Collection</h2><div class="muted">${discovered}/${C.length} cards discovered • ${foils}/${C.length} foil variants discovered</div><p class="muted">Foils have a ${(FOIL_RATE*100).toFixed(2)}% chance to replace a normal card pull. Foil equipment gets +5% power when equipped; monster, boss, and skilling foils are cosmetic/collection variants.</p></div><div class="cb-collection">${C.map(c=>{const normal=own(c.id),foil=foilCount(c.id);return `<div class="cb-collection-card ${c.rarity} ${normal?'':'locked'} ${foil?'foil-owned':''}">${normal?(typeof cardImage==='function'?cardImage(c,'cb-collection-icon'):''):'<span class="cb-unknown">?</span>'}<b>${normal?c.name:'Unknown'}</b><span class="muted">${c.rarity} • ${c.type}<br>Normal ×${normal} • ✨ Foil ×${foil}</span>${foil?`<span class="foil-badge">FOIL</span>`:''}</div>`}).join('')}</div>`
};
if(typeof collectionPage==='function')collectionPage=function(){return cbCollection()};
// Add foil styling to pack reveals/results after the existing pack flow renders.
const prevShow=showPackOpening;
showPackOpening=function(name,cards){prevShow(name,cards);const decorate=()=>{document.querySelectorAll('.pack-modal .reveal-card,.pack-modal .result-card').forEach((el,i)=>{const c=cards[i]||cards[0];if(c?.foil){el.classList.add('foil-card');const f=document.createElement('span');f.className='foil-badge';f.textContent='FOIL';el.appendChild(f)}})};requestAnimationFrame(decorate)};
save();render();
})();