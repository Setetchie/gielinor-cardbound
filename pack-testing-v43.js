// v43 Region × rarity-tier pack presentation. Uses the current underlying pack odds engine as temporary test data.
(function(){
  'use strict';
  const legacyToDisplay={Beginner:'Greenwake Standard',Bronze:'Greenwake Tier II',Rune:'Greenwake Tier III',Dragon:'Greenwake Tier IV',Raid:'Legacy Raid'};
  function fmt(n){return Number(n||0).toLocaleString()}
  function packPage(){
    const tiers=[['Beginner','Standard','Baseline rarity weighting'],['Bronze','Tier II','Improved uncommon/rare weighting'],['Rune','Tier III','Stronger higher-rarity weighting'],['Dragon','Tier IV','Highest current regional rarity weighting']];
    return `<div class="panel pack-banner"><span class="eyebrow">REGION PACKS</span><h2>Greenwake Packs</h2><p class="muted">All normal Greenwake tiers draw from the same Greenwake + permanent Universal pool. Higher tiers cost more Pack Points for better rarity weighting; card count remains consistent where the final pack table specifies it.</p></div>
      <div class="cb-v43-region-tabs"><button class="active">Greenwake</button><button disabled>Next Region 🔒</button><button disabled>Future Region 🔒</button></div>
      <div class="cbcore-pack-grid">${tiers.map(([key,label,copy],i)=>{const p=packs[key];return `<div class="cbcore-pack pack-${key}"><div class="cbcore-pack-icon"><span class="pack-sigil">${i+1}</span><span class="pack-symbol">🎴</span></div><span class="eyebrow">GREENWAKE • RARITY TIER</span><h3>${label} Pack</h3><p class="muted">${copy}</p><div class="muted">Current prototype cost: ${fmt(p?.cost)} Pack Points<br>${p?.n||'?'} cards • Perfect/Foil chance uses the same baseline per card</div><button class="primary wide" onclick="openPack('${key}')">Buy & Open</button></div>`}).join('')}</div>
      <section class="panel"><span class="eyebrow">PACK RULES FOR TESTING</span><div class="cb-v43-checklist"><div>Universal Pack Points are the only Pack Point currency.</div><div>Region access is the acquisition gate; individual card use requirements do not prevent pulls.</div><div>Each card slot rolls rarity → eligible Binding → independent Perfect/Foil chance.</div><div>Normal packs use pure RNG; there is no unowned-card weighting.</div><div>Openings remain one pack at a time with Open Another, never Open ×10 / Open Max.</div></div><p class="muted">Exact tier names, costs and probabilities remain balancing/content-authoring work. The current underlying odds are prototype values.</p></section>`;
  }
  function boot(){if(typeof cbRegisterPage!=='function'){setTimeout(boot,30);return}cbRegisterPage('Packs',packPage);if(typeof showPackOpening==='function'&&!showPackOpening.cbV43Wrapped){const base=showPackOpening;const wrapped=function(name,cards){return base(legacyToDisplay[name]||name,cards)};wrapped.cbV43Wrapped=true;showPackOpening=wrapped;}render()}
  boot();
})();
