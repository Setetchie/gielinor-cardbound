// Divine Allegiance event + encounter-completion activities.
(function(){
const addCard=c=>{if(!B[c.id]){C.push(c);B[c.id]=c;}if(s.owned[c.id]==null)s.owned[c.id]=0;if(s.foils&&s.foils[c.id]==null)s.foils[c.id]=0;};
const GODS=[
{id:'god_saradomin',name:'Saradomin',icon:'☀️',theme:'Order',benefit:'Skilling point bonus',activity:'Restore sacred altars'},
{id:'god_zamorak',name:'Zamorak',icon:'🔥',theme:'Chaos',benefit:'Melee point bonus',activity:'Disrupt Saradominist patrols'},
{id:'god_guthix',name:'Guthix',icon:'🌿',theme:'Balance',benefit:'All skill XP bonus',activity:'Restore balance to Gielinor'},
{id:'god_armadyl',name:'Armadyl',icon:'🪽',theme:'Justice',benefit:'Ranged point bonus',activity:'Scout from the high places'},
{id:'god_bandos',name:'Bandos',icon:'💀',theme:'War',benefit:'Boss point bonus',activity:'Prove strength in battle'},
{id:'god_zaros',name:'Zaros',icon:'👁️',theme:'Ancient',benefit:'Magic & Slayer point bonus',activity:'Recover ancient knowledge'},
{id:'god_seren',name:'Seren',icon:'💎',theme:'Harmony',benefit:'Sailing & gathering bonus',activity:'Attune crystal waystones'}
];
for(const g of GODS)addCard({id:g.id,name:g.name,type:'God',slot:null,rarity:'Divine',icon:g.icon,power:0,divine:true});
window.cbGodData=GODS;
if(!s.gods)s.gods={active:[],favor:{},lastAction:0};s.gods.active=s.gods.active||[];s.gods.favor=s.gods.favor||{};
const stages=[{n:'Unaligned',min:0,m:1},{n:'Initiate',min:100,m:1.03},{n:'Devoted',min:300,m:1.06},{n:'Exalted',min:700,m:1.10},{n:'Chosen',min:1500,m:1.15}];
window.cbGodStage=id=>{const f=s.gods.favor[id]||0;return [...stages].reverse().find(x=>f>=x.min)||stages[0]};
window.cbGodAlign=function(id){if(!own(id))return toast('You need this God card first');const a=s.gods.active;if(a.includes(id)){a.splice(a.indexOf(id),1);save();render();return}if(a.length>=2)return toast('Only two divine allegiances may be active at once');a.push(id);save();render();toast(`Aligned with ${B[id].name}`)};
window.cbGodSwap=function(oldId,newId){if(!own(newId))return toast('You need that God card first');const i=s.gods.active.indexOf(oldId);if(i<0)return cbGodAlign(newId);const protectedFavor=(s.foils?.[oldId]||0)>0;if(!protectedFavor)s.gods.favor[oldId]=0;s.gods.active[i]=newId;save();render();toast(`${B[newId].name} aligned${protectedFavor?` • Foil ${B[oldId].name} preserved its favour`:` • ${B[oldId].name} favour reset`}`)};
window.cbGainFavor=function(id){if(!s.gods.active.includes(id)||!own(id))return toast('Align with this god first');const now=Date.now();if(now-(s.gods.lastAction||0)<1200)return toast('Complete each devotion action individually');s.gods.lastAction=now;const st=cbGodStage(id),gain=10+stages.indexOf(st)*2;s.gods.favor[id]=(s.gods.favor[id]||0)+gain;s.points+=Math.round(4*st.m);s.actions++;save();render();toast(`+${gain} ${B[id].name} favour`)};
window.cbGodBonus=function(a){let mult=1;for(const id of s.gods.active){const st=cbGodStage(id),g=B[id]?.name;if(st.min===0)continue;if(g==='Saradomin'&&['Woodcutting','Mining','Fishing'].includes(a.kind))mult*=st.m;if(g==='Zamorak'&&a.kind==='Combat'&&((B[s.equipped.weapon]?.combatStyle||'Melee')==='Melee'))mult*=st.m;if(g==='Guthix')mult*=1+(st.m-1)/2;if(g==='Armadyl'&&a.kind==='Combat'&&B[s.equipped.weapon]?.combatStyle==='Ranged')mult*=st.m;if(g==='Bandos'&&(a.type==='Boss'||a.kind==='Raid'))mult*=st.m;if(g==='Zaros'&&(a.kind==='Slayer'||B[s.equipped.weapon]?.combatStyle==='Magic'))mult*=st.m;if(g==='Seren'&&['Sailing','Woodcutting','Mining','Fishing'].includes(a.kind))mult*=st.m;}return mult};
const priorReward=rewardFor;rewardFor=function(a){return Math.max(1,Math.round(priorReward(a)*cbGodBonus(a)))};
// Divine cards are exceptionally rare bonus pulls. They do not replace the normal card in a pack.
const priorOpenPack=openPack;openPack=function(n){priorOpenPack(n);const chance={Beginner:0,Bronze:0,Rune:.0002,Dragon:.001,Raid:.004}[n]||0;if(Math.random()<chance){const g=GODS[Math.floor(Math.random()*GODS.length)],was=own(g.id);s.owned[g.id]=(s.owned[g.id]||0)+1;let foil=false;if(Math.random()<.0125){s.foils[g.id]=(s.foils[g.id]||0)+1;foil=true;}save();setTimeout(()=>toast(`${foil?'✨ FOIL ':''}DIVINE PULL: ${g.name}${was?'':' • NEW'}`),300)}};
// Raid/gauntlet encounter cards. Full activity requires every listed encounter card.
const encounters=[
['tekton','Tekton'],['vasa_nistirio','Vasa Nistirio'],['vespula','Vespula'],['ice_demon','Ice Demon'],['olm','Great Olm'],
['maiden_sugadinti','The Maiden of Sugadinti'],['pestilent_bloat','Pestilent Bloat'],['nylocas_vasilias','Nylocas Vasilias'],['sotetseg','Sotetseg'],['xarpus','Xarpus'],['verzik_vitur','Verzik Vitur'],
['akkha','Akkha'],['ba_ba','Ba-Ba'],['kephri','Kephri'],['zebak','Zebak'],['elidinis_warden','The Wardens']
];
for(const [id,name] of encounters)addCard({id,name,type:'Boss',slot:null,rarity:'Legendary',icon:'👑',power:0,kind:'Combat',hp:500});
const raids=[
{id:'raid_cox',name:'Chambers of Xeric',req:['tekton','vasa_nistirio','vespula','ice_demon','olm'],base:260,icon:'🐲'},
{id:'raid_tob',name:'Theatre of Blood',req:['maiden_sugadinti','pestilent_bloat','nylocas_vasilias','sotetseg','xarpus','verzik_vitur'],base:340,icon:'🩸'},
{id:'raid_toa',name:'Tombs of Amascut',req:['akkha','ba_ba','kephri','zebak','elidinis_warden'],base:320,icon:'🏺'},
{id:'fight_caves_full',name:'TzHaar Fight Cave',req:['jad'],base:180,icon:'🔥'},
{id:'inferno_full',name:'The Inferno',req:['zuk'],base:450,icon:'🌋'}
];
for(const r of raids){const c={id:r.id,name:r.name,type:'Raid',slot:null,rarity:'Legendary',icon:r.icon,power:0,kind:'Raid',base:r.base,diff:r.base,reqCards:r.req};addCard(c);if(!A.some(a=>a.id===r.id))A.push(c);}
window.cbRaidActivities=raids;
window.cbRaidReady=r=>own(r.id)>0&&r.req.every(id=>own(id)>0);
window.cbRaidMissing=r=>r.req.filter(id=>!own(id)).map(id=>B[id]?.name||id);
const priorAct=act;act=function(id){const r=raids.find(x=>x.id===id);if(r){if(!own(id))return toast('Raid activity card required');const missing=cbRaidMissing(r);if(missing.length)return toast(`Missing encounter cards: ${missing.join(', ')}`);const pts=rewardFor(A.find(a=>a.id===id));s.points+=pts;s.actions++;const style=B[s.equipped.weapon]?.combatStyle||'Melee';if(s.skills[style]!=null)xp(style,Math.max(10,Math.round(r.base/3)));save();render();toast(`Completed ${r.name} • +${pts} points`);return}return priorAct(id)};
const priorIdle=startIdle;startIdle=function(id){if(raids.some(r=>r.id===id))return toast('Raids, Fight Caves, and Inferno require active play');return priorIdle(id)};
save();
})();