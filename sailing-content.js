// Sailing expansion: facility-gated OSRS-inspired Sailing progression.
(function(){
if(s.skills.Sailing==null)s.skills.Sailing=1;if(s.xp.Sailing==null)s.xp.Sailing=0;
const addCard=c=>{if(!B[c.id]){C.push(c);B[c.id]=c;}if(s.owned[c.id]==null)s.owned[c.id]=0;};
const facility=(id,name,rarity,level,icon='⚓',category='Facility')=>({id,name,type:'Sailing Facility',slot:null,rarity,icon,power:0,reqSkill:'Sailing',reqLevel:level,sailingCategory:category});
const boats=[
 facility('sail_raft','Raft','Common',1,'🛶','Boat'),
 facility('sail_skiff','Skiff','Uncommon',15,'⛵','Boat'),
 facility('sail_sloop','Sloop','Epic',50,'🚢','Boat')
];
const hooks=[['bronze',15,'Common'],['iron',21,'Common'],['steel',27,'Uncommon'],['mithril',44,'Rare'],['adamant',59,'Epic'],['rune',74,'Epic'],['dragon',86,'Legendary']].map(([t,l,r])=>facility(`sail_hook_${t}`,`${t[0].toUpperCase()+t.slice(1)} salvaging hook`,r,l,'🪝','Salvaging'));
const cannons=[['bronze',28,'Uncommon'],['iron',35,'Uncommon'],['steel',47,'Rare'],['mithril',57,'Rare'],['adamant',69,'Epic'],['rune',80,'Epic'],['dragon',92,'Legendary']].map(([t,l,r])=>facility(`sail_cannon_${t}`,`${t[0].toUpperCase()+t.slice(1)} cannon`,r,l,'💣','Combat'));
const nets=[['rope',56,'Rare'],['linen',65,'Epic'],['hemp',76,'Epic'],['cotton',84,'Legendary']].map(([t,l,r])=>facility(`sail_net_${t}`,`${t[0].toUpperCase()+t.slice(1)} trawling net`,r,l,'🕸️','Trawling'));
const support=[
 facility('sail_iron_helm','Iron helm','Common',17,'⚙️','Core'),facility('sail_oak_mast','Oak mast & linen sails','Uncommon',24,'⛵','Core'),facility('sail_inoculation','Inoculation station','Rare',40,'🧪','Support'),facility('sail_salvage_station','Salvaging station','Rare',42,'🧰','Support'),facility('sail_wind_catcher','Wind catcher','Epic',53,'🌬️','Support'),facility('sail_mithril_helm','Mithril helm','Rare',55,'⚙️','Core'),facility('sail_adamant_keel','Adamant keel','Epic',66,'⚓','Core'),facility('sail_crystal_extractor','Crystal extractor','Legendary',73,'💎','Support'),facility('sail_gale_catcher','Gale catcher','Legendary',79,'🌪️','Support')
];
[...boats,...hooks,...cannons,...nets,...support].forEach(addCard);
const action=(id,name,category,level,rarity,base,seconds,reqCards=[],icon='🌊',extra={})=>({id,name,type:'Sailing',slot:null,rarity,icon,power:0,kind:'Sailing',base,diff:Math.max(1,Math.round(seconds)),reqSkill:'Sailing',reqLevel:level,sailingCategory:category,reqCards,...extra});
const acts=[
 action('sail_port_tasks','Courier Port Tasks','Port Tasks',1,'Common',6,8,['sail_raft'],'📜'),
 action('sail_charting','Sea Charting','Charting',1,'Common',7,10,['sail_raft'],'🗺️'),
 action('sail_bounty_tasks','Bounty Port Tasks','Combat',30,'Rare',24,16,['sail_skiff','sail_cannon_bronze'],'🎯'),
 action('sail_salvage_small','Small shipwreck','Salvaging',15,'Common',10,10,['sail_hook_bronze'],'🪝'),
 action('sail_salvage_fisher','Fisherman’s shipwreck','Salvaging',26,'Uncommon',16,11,['sail_hook_steel'],'🪝'),
 action('sail_salvage_barracuda','Barracuda shipwreck','Salvaging',35,'Rare',24,12,['sail_hook_mithril'],'🪝'),
 action('sail_salvage_large','Large shipwreck','Salvaging',53,'Rare',34,13,['sail_hook_mithril'],'🪝'),
 action('sail_salvage_pirate','Pirate shipwreck','Salvaging',64,'Epic',46,14,['sail_hook_adamant'],'🏴‍☠️'),
 action('sail_salvage_mercenary','Mercenary shipwreck','Salvaging',73,'Epic',58,15,['sail_hook_rune'],'⚔️'),
 action('sail_salvage_fremennik','Fremennik shipwreck','Salvaging',80,'Legendary',70,16,['sail_hook_rune'],'🛡️'),
 action('sail_salvage_merchant','Merchant shipwreck','Salvaging',87,'Legendary',85,17,['sail_hook_dragon'],'💰'),
 action('sail_trial_tempor','The Tempor Tantrum','Trials',30,'Rare',38,14,['sail_skiff','sail_iron_helm','sail_oak_mast'],'🏁'),
 action('sail_trial_jubbly','The Jubbly Jive','Trials',55,'Epic',62,13,['sail_skiff','sail_inoculation','sail_mithril_helm'],'🏁'),
 action('sail_trial_gwenith','The Gwenith Glide','Trials',72,'Legendary',88,12,['sail_skiff','sail_adamant_keel'],'🏁'),
 action('sail_trawl_rope','Deep Sea Trawling — Rope','Trawling',56,'Rare',34,13,['sail_net_rope'],'🐟'),
 action('sail_trawl_linen','Deep Sea Trawling — Linen','Trawling',65,'Epic',46,12,['sail_net_linen'],'🐠'),
 action('sail_trawl_hemp','Deep Sea Trawling — Hemp','Trawling',76,'Epic',60,11,['sail_net_hemp'],'🐟'),
 action('sail_trawl_cotton','Deep Sea Trawling — Cotton','Trawling',84,'Legendary',76,10,['sail_net_cotton'],'🐋'),
 action('sail_combat_bronze','Ship Combat — Bronze Cannon','Combat',28,'Uncommon',22,15,['sail_cannon_bronze'],'💥'),
 action('sail_combat_iron','Ship Combat — Iron Cannon','Combat',35,'Uncommon',28,14,['sail_cannon_iron'],'💥'),
 action('sail_combat_steel','Ship Combat — Steel Cannon','Combat',47,'Rare',38,13,['sail_cannon_steel'],'💥'),
 action('sail_combat_mithril','Ship Combat — Mithril Cannon','Combat',57,'Rare',50,12,['sail_cannon_mithril'],'💥'),
 action('sail_combat_adamant','Ship Combat — Adamant Cannon','Combat',69,'Epic',64,11,['sail_cannon_adamant'],'💥'),
 action('sail_combat_rune','Ship Combat — Rune Cannon','Combat',80,'Epic',80,10,['sail_cannon_rune'],'💥'),
 action('sail_combat_dragon','Ship Combat — Dragon Cannon','Combat',92,'Legendary',100,9,['sail_cannon_dragon'],'🔥')
];
for(const a of acts){addCard(a);if(!A.some(x=>x.id===a.id))A.push(a);}
// Guarantee a viable Sailing start for old and new saves.
for(const id of ['sail_raft','sail_port_tasks','sail_charting'])if(!own(id))s.owned[id]=1;
window.cbSailingCategories=['Port Tasks','Charting','Salvaging','Trawling','Combat','Trials'];
window.cbSailingReqMet=a=>(a.reqCards||[]).every(id=>own(id)>0)&&(s.skills.Sailing||1)>=(a.reqLevel||1);
window.cbSailingReqText=a=>{const missing=(a.reqCards||[]).filter(id=>!own(id)).map(id=>B[id]?.name||id);return missing.length?`Needs: ${missing.join(', ')}`:`Sailing ${a.reqLevel||1}`};
const oldAct=act;act=function(id){const a=A.find(x=>x.id===id);if(a?.kind==='Sailing'&&!cbSailingReqMet(a))return toast(cbSailingReqText(a));return oldAct(id)};
const oldIdle=startIdle;startIdle=function(id){const a=A.find(x=>x.id===id);if(a?.kind==='Sailing'&&!cbSailingReqMet(a))return toast(cbSailingReqText(a));return oldIdle(id)};
save();
})();