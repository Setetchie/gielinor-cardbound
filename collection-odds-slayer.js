// Collection acquisition odds + Slayer level-1 onboarding.
(function(){
// OSRS allows Slayer to start at level 1 via assignments; Slayer-gated creatures begin later.
// Add low-level assignable monsters as Slayer cards so progression is never blocked at level 1.
const starters=[
  ['slayer_rat','Rat (Slayer task)','Common',2,2,'Rat.png'],
  ['slayer_spider','Spider (Slayer task)','Common',2,2,'Spider.png'],
  ['slayer_bat','Bat (Slayer task)','Common',8,8,'Bat.png'],
  ['slayer_bear','Bear (Slayer task)','Common',20,20,'Bear.png'],
  ['slayer_wolf','Wolf (Slayer task)','Common',11,11,'Wolf.png']
];
for(const x of starters){if(B[x[0]])continue;const c={id:x[0],name:x[1],type:'Monster',slot:null,rarity:x[2],icon:'',power:0,kind:'Slayer',base:Math.max(2,Math.round(x[4]/2)),diff:1,hp:x[4],reqSkill:'Slayer',reqLevel:1,slayerReq:1,image:x[5]};C.push(c);B[c.id]=c;A.push(c);if(s.owned[c.id]==null)s.owned[c.id]=0;}
// Give every existing/new player one entry-level Slayer activity card so Slayer can actually begin.
if(!s.slayerStarterGranted){s.owned.slayer_rat=Math.max(1,s.owned.slayer_rat||0);s.slayerStarterGranted=true;}
function rarityPoolSize(r){return C.filter(c=>c.rarity===r).length}
function cardPackOdds(c,n){const p=packs[n];if(!p)return 0;const ri=R.indexOf(c.rarity),pool=rarityPoolSize(c.rarity);if(ri<0||!pool)return 0;return (p.o[ri]/100)/pool;}
function atLeastOne(c,n){const p=packs[n],q=cardPackOdds(c,n);return p?1-Math.pow(1-q,p.n):0;}
function fmt(v){if(v<=0)return'—';const pct=v*100;return pct>=1?pct.toFixed(2)+'%':pct>=.01?pct.toFixed(3)+'%':pct.toFixed(4)+'%'}
function bestPack(c){return Object.keys(packs).map(n=>({n,ch:atLeastOne(c,n),slot:cardPackOdds(c,n)})).sort((a,b)=>b.ch-a.ch)[0]}
window.cbCardPackOdds=cardPackOdds;window.cbCardBestPack=bestPack;
function oddsHtml(c){const best=bestPack(c);return `<div class="cb12-odds"><b>Best pack: ${best?.n||'—'}</b><small>Chance per pack: ${best?fmt(best.ch):'—'}</small><details><summary>All pack chances</summary>${Object.keys(packs).map(n=>`<div><span>${n}</span><b>${fmt(atLeastOne(c,n))}</b><small>${fmt(cardPackOdds(c,n))} per card slot</small></div>`).join('')}</details></div>`}
function collectionV12(){return `<div class="panel"><span class="eyebrow">COLLECTION</span><h2>Card Collection</h2><div class="muted">${C.filter(c=>own(c.id)).length}/${C.length} discovered. Pack percentages account for the card's rarity odds and the number of cards currently in that rarity pool.</div></div><div class="cb-collection">${C.map(c=>`<div class="cb-collection-card ${c.rarity} ${own(c.id)?'':'locked'}">${typeof cardImage==='function'?cardImage(c,'cb-collection-icon'):`<span class="cb-unknown">?</span>`}<b>${c.name}</b><span class="muted">${c.rarity} • ${c.type}${c.combatStyle?` • ${c.combatStyle}`:''}<br>Owned ×${own(c.id)}</span>${oddsHtml(c)}</div>`).join('')}</div>`}
if(typeof cbCollection==='function')cbCollection=collectionV12;
if(typeof collectionPage==='function')collectionPage=collectionV12;
// Enhance Slayer page with onboarding explanation.
const priorActivity=activityPage;
activityPage=function(){const html=priorActivity();if(cb2State.root==='Slayer')return `<div class="panel cb12-slayer-help"><span class="eyebrow">SLAYER TRAINING</span><h3>Start at Slayer level 1</h3><p class="muted">Your starter Rat Slayer card is unlocked automatically. Slayer assignments can include ordinary monsters that have no Slayer level requirement; the level 5 Crawling hand is simply the first monster that specifically requires Slayer to damage.</p></div>${html}`;return html};
save();render();
})();