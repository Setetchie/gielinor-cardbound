// Pack opening flow: first card flips, later cards are already face-up and advance with one tap.
(function(){
showPackOpening=function(name,cards){
  let idx=0,firstRevealed=false;
  const m=document.createElement('div');m.className='modal pack-modal';document.body.append(m);
  function img(c){return typeof cardImage==='function'?cardImage(c,'cb-pack-icon'):(typeof cb2Img==='function'?cb2Img(c,'cb-pack-icon'):`<div class="big-icon">${c.icon||'?'}</div>`)}
  function draw(){
    const c=cards[idx],remaining=cards.length-idx-1,isFirst=idx===0,faceUp=!isFirst||firstRevealed;
    m.innerHTML=`<div class="pack-stage"><div class="pack-topline"><b>${name} Pack</b><span>${idx+1}/${cards.length}</span></div><div class="stack-wrap" id="packTap">${Array.from({length:Math.min(4,remaining)}).map((_,i)=>`<div class="card-back ghost" style="transform:translate(${(i+1)*4}px,${-(i+1)*4}px) rotate(${(i%2?1:-1)*(i+1)}deg);z-index:${i}"></div>`).join('')}<div class="reveal-card ${faceUp?'revealed':''} ${c.rarity}" style="z-index:10"><div class="card-face back-face"><div class="rune-mark">⚔️</div><div>GIELINOR</div><small>CARDBOUND</small><div class="tap-hint">Tap to reveal</div></div><div class="card-face front-face"><div class="rarity-tag">${c.rarity}</div>${img(c)}<h2>${c.name}</h2><div class="card-type">${c.type}${c.slot?` • ${(typeof cbLabels!=='undefined'&&cbLabels[c.slot])||SLOT_LABELS[c.slot]||c.slot}`:''}</div>${c.power?`<div class="statline">Power +${c.power}</div>`:''}<div class="ownedline">Owned ×${c.count}</div><div class="tap-hint">${idx===cards.length-1?'Tap for results':'Tap for next card'}</div></div></div></div><div class="pack-progress">${cards.map((_,i)=>`<span class="${i<idx?'done':i===idx?'current':''}"></span>`).join('')}</div><button class="secondary" onclick="document.querySelector('.pack-modal')?.remove()">Skip opening</button></div>`;
    m.querySelector('#packTap').onclick=()=>{
      if(idx===0&&!firstRevealed){firstRevealed=true;draw();return;}
      if(idx<cards.length-1){idx++;draw();}else results();
    };
  }
  function results(){m.innerHTML=`<div class="pack-results"><h2>${name} Pack Results</h2><div class="results-grid">${cards.map(c=>`<div class="result-card ${c.rarity}">${img(c)}<b>${c.name}</b><div class="muted">${c.rarity} • ${c.type}<br>Owned ×${c.count}</div></div>`).join('')}</div><button class="primary wide" onclick="this.closest('.modal').remove()">Add to Bank</button></div>`}
  draw();
};
})();