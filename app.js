const R=['Common','Uncommon','Rare','Epic','Legendary'];
const raw=[
['bronze_sword','Bronze Sword','Weapon','Common','⚔️',2],['steel_sword','Steel Sword','Weapon','Common','⚔️',4],['mith_scim','Mithril Scimitar','Weapon','Uncommon','🗡️',8],['rune_scim','Rune Scimitar','Weapon','Rare','🗡️',16],['dragon_scim','Dragon Scimitar','Weapon','Epic','🗡️',28],['whip','Abyssal Whip','Weapon','Legendary','🪢',44],
['bronze_body','Bronze Platebody','Armor','Common','🛡️',2],['rune_body','Rune Platebody','Armor','Rare','🛡️',12],['fighter_torso','Fighter Torso','Armor','Epic','🛡️',20],['bandos','Bandos Chestplate','Armor','Legendary','🛡️',35],
['bronze_axe','Bronze Axe','Tool','Common','🪓',1],['rune_axe','Rune Axe','Tool','Rare','🪓',8],['dragon_axe','Dragon Axe','Tool','Epic','🪓',14],['bronze_pick','Bronze Pickaxe','Tool','Common','⛏️',1],['rune_pick','Rune Pickaxe','Tool','Rare','⛏️',8],['dragon_pick','Dragon Pickaxe','Tool','Epic','⛏️',14],['net','Small Fishing Net','Tool','Common','🎣',1],['harpoon','Harpoon','Tool','Rare','🎣',7],
['glory','Amulet of Glory','Accessory','Rare','📿',7],['berserker','Berserker Ring','Accessory','Epic','💍',12],['firecape','Fire Cape','Accessory','Legendary','🔥',18],
['goblin','Goblin','Monster','Common','👺',0],['cow','Cow','Monster','Common','🐄',0],['hill_giant','Hill Giant','Monster','Uncommon','🧌',0],['green_dragon','Green Dragon','Monster','Rare','🐉',0],['abyssal_demon','Abyssal Demon','Monster','Epic','👹',0],['graardor','General Graardor','Boss','Legendary','👑',0],
['normal_tree','Normal Tree','Skilling','Common','🌳',0],['oak_tree','Oak Tree','Skilling','Common','🌲',0],['willow_tree','Willow Tree','Skilling','Uncommon','🌿',0],['yew_tree','Yew Tree','Skilling','Rare','🌲',0],['magic_tree','Magic Tree','Skilling','Epic','✨',0],
['copper_rock','Copper Rock','Skilling','Common','🪨',0],['iron_rock','Iron Rock','Skilling','Common','🪨',0],['coal_rock','Coal Rock','Skilling','Uncommon','⬛',0],['mith_rock','Mithril Rock','Skilling','Rare','💠',0],['runite_rock','Runite Rock','Skilling','Epic','💎',0],
['shrimp_spot','Net Fishing Spot','Skilling','Common','🐟',0],['lobster_spot','Lobster Spot','Skilling','Uncommon','🦞',0],['harpoon_spot','Harpoon Spot','Skilling','Rare','🐠',0],['shark_spot','Shark Spot','Skilling','Epic','🦈',0]
];
const C=raw.map(x=>({id:x[0],name:x[1],type:x[2],rarity:x[3],icon:x[4],power:x[5]})),B=Object.fromEntries(C.map(c=>[c.id,c]));
const A=[['goblin','Combat',4,2],['cow','Combat',5,3],['hill_giant','Combat',14,12],['green_dragon','Combat',42,30],['abyssal_demon','Combat',90,55],['graardor','Combat',260,95],['normal_tree','Woodcutting',4,1],['oak_tree','Woodcutting',8,5],['willow_tree','Woodcutting',15,10],['yew_tree','Woodcutting',32,20],['magic_tree','Woodcutting',70,35],['copper_rock','Mining',4,1],['iron_rock','Mining',9,5],['coal_rock','Mining',17,10],['mith_rock','Mining',38,20],['runite_rock','Mining',85,36],['shrimp_spot','Fishing',4,1],['lobster_spot','Fishing',15,8],['harpoon_spot','Fishing',32,18],['shark_spot','Fishing',72,34]].map(x=>({id:x[0],kind:x[1],base:x[2],diff:x[3],...B[x[0]]}));
const packs={Beginner:{cost:500,n:3,o:[75,20,4.5,.5,0]},Bronze:{cost:1500,n:5,o:[65,25,8,1.8,.2]},Rune:{cost:5000,n:5,o:[38,36,19,6,1]},Dragon:{cost:15000,n:5,o:[18,32,30,16,4]},Raid:{cost:50000,n:7,o:[5,15,30,30,20]}};
const D={points:3000,owned:{bronze_sword:1,bronze_axe:1,bronze_pick:1,net:1,goblin:1,normal_tree:1,copper_rock:1,shrimp_spot:1},fragments:Object.fromEntries(R.map(r=>[r,0])),equipped:{weapon:'bronze_sword',armor:null,tool:'bronze_axe',accessory:null},skills:{Combat:1,Woodcutting:1,Mining:1,Fishing:1},xp:{Combat:0,Woodcutting:0,Mining:0,Fishing:0},tab:'Home',packs:0,actions:0};
let s;try{s=Object.assign(structuredClone(D),JSON.parse(localStorage.cardbound||'{}'));s.equipped=Object.assign({},D.equipped,s.equipped||{});s.fragments=Object.assign({},D.fragments,s.fragments||{})}catch{s=structuredClone(D)}
let bankFilters={type:'All',rarity:'All',status:'All',sort:'Name'};
const own=id=>s.owned[id]||0,save=()=>localStorage.cardbound=JSON.stringify(s),power=()=>5+Object.values(s.equipped).filter(Boolean).reduce((n,id)=>n+(B[id]?.power||0),0),need=a=>Math.max(1,Math.ceil(a.diff/2));
function roll(o){let x=Math.random()*100,n=0;for(let i=0;i<o.length;i++){n+=o[i];if(x<n)return R[i]}return R[0]}
function add(id){s.owned[id]=(s.owned[id]||0)+1}
function xp(k,n){s.xp[k]+=n;let req=20+s.skills[k]*s.skills[k]*8;while(s.xp[k]>=req){s.xp[k]-=req;s.skills[k]++;req=20+s.skills[k]*s.skills[k]*8}}
function nav(t){s.tab=t;save();render()}
function openPack(n){
  let p=packs[n]; if(s.points<p.cost)return toast('Not enough points');
  s.points-=p.cost;s.packs++;
  let q=[];
  for(let i=0;i<p.n;i++){let r=roll(p.o),pool=C.filter(c=>c.rarity===r),c=pool[Math.floor(Math.random()*pool.length)];add(c.id);q.push({...c,count:own(c.id)})}
  save();render();showPackOpening(n,q);
}
function showPackOpening(name,cards){
  let idx=0,revealed=false;
  const m=document.createElement('div');m.className='modal pack-modal';document.body.append(m);
  function draw(){
    const c=cards[idx];
    const remaining=cards.length-idx-1;
    m.innerHTML=`<div class="pack-stage">
      <div class="pack-topline"><b>${name} Pack</b><span>${idx+1}/${cards.length}</span></div>
      <div class="stack-wrap" id="packTap">
        ${Array.from({length:Math.min(4,remaining)}).map((_,i)=>`<div class="card-back ghost" style="transform:translate(${(i+1)*4}px,${-(i+1)*4}px) rotate(${(i%2?1:-1)*(i+1)}deg);z-index:${i}"></div>`).join('')}
        <div class="reveal-card ${revealed?'revealed':''} ${c.rarity}" style="z-index:10">
          <div class="card-face back-face"><div class="rune-mark">⚔️</div><div>GIELINOR</div><small>CARDBOUND</small><div class="tap-hint">Tap to reveal</div></div>
          <div class="card-face front-face">
            <div class="rarity-tag">${c.rarity}</div><div class="big-icon">${c.icon}</div>
            <h2>${c.name}</h2><div class="card-type">${c.type}</div>
            ${c.power?`<div class="statline">Power +${c.power}</div>`:''}
            <div class="ownedline">Owned ×${c.count}</div>
            <div class="tap-hint">${idx===cards.length-1?'Tap for results':'Tap for next card'}</div>
          </div>
        </div>
      </div>
      <div class="pack-progress">${cards.map((_,i)=>`<span class="${i<idx?'done':i===idx?'current':''}"></span>`).join('')}</div>
      <button class="secondary" onclick="document.querySelector('.pack-modal')?.remove()">Skip opening</button>
    </div>`;
    m.querySelector('#packTap').onclick=()=>{
      if(!revealed){revealed=true;draw();return}
      if(idx<cards.length-1){idx++;revealed=false;draw()} else showResults();
    };
  }
  function showResults(){
    m.innerHTML=`<div class="pack-results"><h2>${name} Pack Results</h2>
      <div class="results-grid">${cards.map(c=>`<div class="result-card ${c.rarity}"><div class="icon">${c.icon}</div><b>${c.name}</b><div class="muted">${c.rarity} • ${c.type}<br>Owned ×${c.count}</div></div>`).join('')}</div>
      <button class="primary wide" id="donePack">Add to Bank</button></div>`;
    m.querySelector('#donePack').onclick=()=>m.remove();
  }
  draw();
}
function act(id){let a=A.find(x=>x.id===id);if(!own(id))return;if(s.skills[a.kind]<need(a))return toast(`${a.kind} level ${need(a)} required`);let mult=a.kind==='Combat'?Math.max(.65,1+power()/120-a.diff/150):1+Object.values(s.equipped).filter(Boolean).map(x=>B[x]).filter(x=>x?.type==='Tool').reduce((m,x)=>Math.max(m,x.power),0)/20,n=Math.max(1,Math.round(a.base*mult));s.points+=n;s.actions++;xp(a.kind,Math.max(2,Math.round(a.base/2)));save();render();toast(`+${n} points`)}
function slotFor(c){return c.type==='Weapon'?'weapon':c.type==='Armor'?'armor':c.type==='Tool'?'tool':c.type==='Accessory'?'accessory':null}
function isEquipped(id){return Object.values(s.equipped).includes(id)}
function equip(id){let c=B[id],slot=slotFor(c);if(slot){s.equipped[slot]=id;save();render();toast(`${c.name} equipped`)}}
function unequip(slot){if(s.equipped[slot]){const n=B[s.equipped[slot]]?.name;s.equipped[slot]=null;save();render();toast(`${n||'Item'} unequipped`)}}
function shred(id){let c=B[id];if(own(id)<=1)return;s.owned[id]--;s.fragments[c.rarity]++;save();render()}
function craft(r,t){if(s.fragments[r]<10)return;let p=C.filter(c=>c.rarity===r&&(t==='Any'||c.type===t||(t==='Equipment'&&['Weapon','Armor','Tool','Accessory'].includes(c.type))));if(!p.length)return toast('No matching cards');s.fragments[r]-=10;let c=p[Math.floor(Math.random()*p.length)];add(c.id);save();render();toast(`Crafted ${c.name}`)}
function toast(x){let e=document.createElement('div');e.className='toast';e.textContent=x;document.body.append(e);setTimeout(()=>e.remove(),1400)}
function setBankFilter(k,v){bankFilters[k]=v;render()}
function filteredBank(){
  let arr=C.filter(c=>own(c.id)&&['Weapon','Armor','Tool','Accessory'].includes(c.type));
  if(bankFilters.type!=='All')arr=arr.filter(c=>c.type===bankFilters.type);
  if(bankFilters.rarity!=='All')arr=arr.filter(c=>c.rarity===bankFilters.rarity);
  if(bankFilters.status==='Equipped')arr=arr.filter(c=>isEquipped(c.id));
  if(bankFilters.status==='Unequipped')arr=arr.filter(c=>!isEquipped(c.id));
  arr.sort((a,b)=>{
    if(bankFilters.sort==='Power')return b.power-a.power||a.name.localeCompare(b.name);
    if(bankFilters.sort==='Rarity')return R.indexOf(b.rarity)-R.indexOf(a.rarity)||a.name.localeCompare(b.name);
    if(bankFilters.sort==='Quantity')return own(b.id)-own(a.id)||a.name.localeCompare(b.name);
    if(bankFilters.sort==='Type')return a.type.localeCompare(b.type)||a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
  return arr;
}
const home=()=>`<div class="hero panel"><div><span class="eyebrow">ADVENTURE LOG</span><h2>${C.filter(c=>own(c.id)).length}/${C.length} cards discovered</h2><p class="muted">Open packs, unlock activities, equip stronger cards, and recycle duplicates into new pulls.</p></div><div class="hero-power">⚔️<b>${power()}</b><span>Power</span></div></div><div class="grid stats-grid"><div class="panel"><h3>⚔️ Combat</h3>Level ${s.skills.Combat}<br><span class="muted">Build power ${power()}</span></div><div class="panel"><h3>🪓 Skills</h3><span class="muted">WC ${s.skills.Woodcutting} • Mining ${s.skills.Mining} • Fishing ${s.skills.Fishing}</span></div><div class="panel"><h3>🎁 Packs</h3><b>${s.packs}</b></div><div class="panel"><h3>🏃 Activities</h3><b>${s.actions}</b></div></div>`;
const activities=()=>['Combat','Woodcutting','Mining','Fishing'].map(k=>`<div class="panel"><div class="section-head"><h2>${k}</h2><span class="pill">Lv ${s.skills[k]}</span></div><div class="grid">${A.filter(a=>a.kind===k).map(a=>`<div class="card ${own(a.id)?'':'locked'} ${a.rarity}"><div class="icon">${a.icon}</div><b>${a.name}</b><div class="muted">${own(a.id)?`~${a.base}+ pts • Req ${need(a)}`:'Card required'}</div><button ${own(a.id)?'':'disabled'} onclick="act('${a.id}')">${own(a.id)?'Do Activity':'Locked'}</button></div>`).join('')}</div></div>`).join('');
const store=()=>`<div class="panel pack-banner"><span class="eyebrow">PACK SHOP</span><h2>Choose your booster</h2><p class="muted">Cards now open one at a time from a stacked booster reveal.</p></div><div class="grid pack-grid">${Object.entries(packs).map(([n,p])=>`<div class="card pack-card"><div class="pack-art">🎴</div><b>${n} Pack</b><div class="muted">${p.n} cards • ${p.cost.toLocaleString()} pts<br>Legendary ${p.o[4]}%</div><button class="primary" onclick="openPack('${n}')">Buy & Open</button></div>`).join('')}</div>`;
function equipmentSlots(){
  const labels={weapon:'Weapon',armor:'Body',tool:'Tool',accessory:'Accessory'};
  return Object.entries(labels).map(([slot,label])=>{let id=s.equipped[slot],c=id?B[id]:null;return `<button class="equip-slot ${c?c.rarity:''}" onclick="${c?`unequip('${slot}')`:`toast('Tap an item below to equip')`}"><span class="slot-label">${label}</span>${c?`<span class="equip-icon">${c.icon}</span><b>${c.name}</b><span class="muted">+${c.power} power • tap to unequip</span>`:`<span class="empty-slot">+</span><span class="muted">Empty</span>`}</button>`}).join('');
}
const bank=()=>{
  const items=filteredBank();
  return `<div class="panel"><div class="section-head"><div><span class="eyebrow">LOADOUT</span><h2>Equipment • Power ${power()}</h2></div></div><div class="equipment-grid">${equipmentSlots()}</div></div>
  <div class="panel bank-panel"><div class="section-head"><div><span class="eyebrow">BANK</span><h2>${items.length} shown</h2></div></div>
  <div class="bank-controls">
    <select onchange="setBankFilter('type',this.value)"><option ${bankFilters.type==='All'?'selected':''}>All</option>${['Weapon','Armor','Tool','Accessory'].map(x=>`<option ${bankFilters.type===x?'selected':''}>${x}</option>`).join('')}</select>
    <select onchange="setBankFilter('rarity',this.value)"><option ${bankFilters.rarity==='All'?'selected':''}>All</option>${R.map(x=>`<option ${bankFilters.rarity===x?'selected':''}>${x}</option>`).join('')}</select>
    <select onchange="setBankFilter('status',this.value)"><option ${bankFilters.status==='All'?'selected':''}>All</option><option ${bankFilters.status==='Equipped'?'selected':''}>Equipped</option><option ${bankFilters.status==='Unequipped'?'selected':''}>Unequipped</option></select>
    <select onchange="setBankFilter('sort',this.value)">${['Name','Power','Rarity','Quantity','Type'].map(x=>`<option ${bankFilters.sort===x?'selected':''}>${x}</option>`).join('')}</select>
  </div>
  <div class="bank">${items.length?items.map(c=>`<button class="slot ${c.rarity} ${isEquipped(c.id)?'equipped-bank':''}" onclick="equip('${c.id}')"><span class="bank-icon">${c.icon}</span><b>${c.name}</b><span class="muted">${c.type} • +${c.power}<br>x${own(c.id)}</span>${isEquipped(c.id)?'<span class="equipped-badge">EQUIPPED</span>':''}</button>`).join(''):'<div class="empty-bank">No cards match these filters.</div>'}</div></div>`;
};
const collection=()=>`<div class="panel"><h2>Collection</h2><span class="muted">Keep one copy permanently; shred extras for fragments.</span></div><div class="grid">${C.map(c=>`<div class="card ${c.rarity} ${own(c.id)?'':'locked'}"><div class="icon">${c.icon}</div><b>${own(c.id)?c.name:'???'}</b><div class="muted">${c.rarity} • ${c.type} • x${own(c.id)}</div>${own(c.id)>1?`<button class="danger" onclick="shred('${c.id}')">Shred duplicate</button>`:''}</div>`).join('')}</div>`;
const forge=()=>`<div class="panel"><h2>Fragment Forge</h2><span class="muted">10 same-rarity fragments craft a random card in your chosen category.</span></div>${R.map(r=>`<div class="panel"><h3>${r}: ${s.fragments[r]} fragments</h3><select id="${r}"><option>Any</option><option>Equipment</option><option>Weapon</option><option>Armor</option><option>Monster</option><option>Boss</option><option>Skilling</option></select> <button onclick="craft('${r}',document.getElementById('${r}').value)">Craft • 10</button></div>`).join('')}<div class="panel"><button onclick="s.points+=10000;save();render()">Developer +10,000 points</button> <button class="danger" onclick="if(confirm('Reset save?')){localStorage.removeItem('cardbound');location.reload()}">Reset</button></div>`;
function render(){let pages={Home:home,Activity:activities,Packs:store,Bank:bank,Collection:collection,Forge:forge},tabs=['Home','Activity','Packs','Bank','Collection','Forge'];document.getElementById('app').innerHTML=`<div class="app"><div class="top"><div class="brand"><span>⚔️</span><b>Gielinor: Cardbound</b></div><div class="wallet"><span class="pill">🪙 ${s.points.toLocaleString()}</span><span class="pill">💥 ${power()} power</span><span class="pill">🃏 ${C.filter(c=>own(c.id)).length}/${C.length}</span></div></div><div class="content">${pages[s.tab]()}</div><div class="tabs"><div>${tabs.map(t=>`<button class="tab ${s.tab===t?'active':''}" onclick="nav('${t}')">${{Home:'🏠',Activity:'⚔️',Packs:'🎁',Bank:'🏦',Collection:'🃏',Forge:'🔥'}[t]}<br>${t}</button>`).join('')}</div></div></div>`}
render();