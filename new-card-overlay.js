// Pack NEW overlays. Determines first ownership before adding each pulled card.
(function(){
const FOIL_CHANCE=0.0125;
function packThemeClass(name){return 'pack-'+name;}
function packIcon(name){return ({Beginner:'📜',Bronze:'🟤',Rune:'🔷',Dragon:'🐉',Raid:'👑'})[name]||'🎴';}
function img(c){return typeof cardImage==='function'?cardImage(c,'cb-pack-icon'):(typeof cb2Img==='function'?cb2Img(c,'cb-pack-icon'):`<div class="big-icon">${c.icon||'?'}</div>`)}
function newBadge(c){if(c.newFoil)return '<span class="new-card-overlay foil-new">✨ NEW FOIL ✨</span>';if(c.newCard)return '<span class="new-card-overlay">NEW CARD</span>';return ''}
openPack=function(n){
  settleIdle(false);const p=packs[n];if(s.points<p.cost)return toast('Not enough points');
  s.points-=p.cost;s.packs++;const q=[];
  for(let i=0;i<p.n;i++){
    const r=roll(p.o),pool=C.filter(c=>c.rarity===r),c=pool[Math.floor(Math.random()*pool.length)];
    const foil=Math.random()<FOIL_CHANCE;
    const hadNormal=own(c.id)>0,hadFoil=(typeof foilCount==='function'?foilCount(c.id):((s.foils&&s.foils[c.id])||0))>0;
    const newCard=!hadNormal,newFoil=foil&&!hadFoil;
    add(c.id,{foil});
    q.push({...c,count:own(c.id),foil,foilCount:typeof foilCount==='function'?foilCount(c.id):0,newCard,newFoil});
  }
  save();render();showPackOpening(n,q);
};
showPackOpening=function(name,cards){
  let idx=0,firstRevealed=false;const m=document.createElement('div');m.className='modal pack-modal';document.body.append(m);
  function draw(){
    const c=cards[idx],remaining=cards.length-idx-1,isFirst=idx===0,faceUp=!isFirst||firstRevealed;
    m.innerHTML=`<div class="pack-stage ${packThemeClass(name)}"><div class="pack-topline"><b>${packIcon(name)} ${name} Pack</b><span>${idx+1}/${cards.length}</span></div><div class="stack-wrap" id="packTap">${Array.from({length:Math.min(4,remaining)}).map((_,i)=>`<div class="card-back ghost" style="transform:translate(${(i+1)*4}px,${-(i+1)*4}px) rotate(${(i%2?1:-1)*(i+1)}deg);z-index:${i}"></div>`).join('')}<div class="reveal-card ${faceUp?'revealed':''} ${c.rarity} ${c.foil?'foil-card':''}" style="z-index:10">${faceUp?newBadge(c):''}<div class="card-face back-face"><div class="rune-mark">⚔️</div><div>GIELINOR</div><small>CARDBOUND</small><div class="tap-hint">Tap to reveal</div></div><div class="card-face front-face"><div class="rarity-tag">${c.rarity}</div>${c.foil?'<span class="foil-badge">FOIL</span>':''}${img(c)}<h2>${c.name}</h2><div class="card-type">${c.type}${c.slot?` • ${(typeof cbLabels!=='undefined'&&cbLabels[c.slot])||SLOT_LABELS[c.slot]||c.slot}`:''}</div>${c.power?`<div class="statline">Power +${c.power}${c.foil?' (+5% foil gear bonus)':''}</div>`:''}<div class="ownedline">Owned ×${c.count}${c.foil?` • Foil ×${c.foilCount}`:''}</div><div class="tap-hint">${idx===cards.length-1?'Tap for results':'Tap for next card'}</div></div></div></div><div class="pack-progress">${cards.map((_,i)=>`<span class="${i<idx?'done':i===idx?'current':''}"></span>`).join('')}</div><button class="secondary" onclick="document.querySelector('.pack-modal')?.remove()">Skip opening</button></div>`;
    m.querySelector('#packTap').onclick=()=>{if(idx===0&&!firstRevealed){firstRevealed=true;draw();return}if(idx<cards.length-1){idx++;draw()}else results()};
  }
  function results(){m.innerHTML=`<div class="pack-results ${packThemeClass(name)}"><h2>${packIcon(name)} ${name} Pack Results</h2><div class="results-grid">${cards.map(c=>`<div class="result-card ${c.rarity} ${c.foil?'foil-card':''}">${newBadge(c)}${c.foil?'<span class="foil-badge">FOIL</span>':''}${img(c)}<b>${c.name}</b><div class="muted">${c.rarity} • ${c.type}<br>Owned ×${c.count}${c.foil?` • Foil ×${c.foilCount}`:''}</div></div>`).join('')}</div><button class="primary wide" onclick="this.closest('.modal').remove()">Add to Bank</button></div>`}
  draw();
};
})();