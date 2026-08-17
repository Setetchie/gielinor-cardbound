# v43 decision-to-interface coverage

This file is an audit checklist for friends/family UI testing. It separates **locked structural decisions that should be represented in navigation/look-and-feel now** from **numbers/content authoring that may remain provisional**.

## First-pass regression baseline
- The structure test is additive: all accepted first-pass bug fixes and UI corrections remain mandatory baseline behavior.
- Use `docs/v43-first-test-pass-baseline.md` as the regression checklist for bootstrap/router stability, Greenwake load/save behavior, Activity/Combat fixes, Sailing routing/idle feedback, pack reveal/mobile fixes, equipment/Bank/Collection improvements, loadout/version handling, image consistency, and service-worker/cache hygiene.
- A new v43 destination is considered defective if it reintroduces one of those already-fixed problems, even when its new navigation itself works.

## Home / global shell
- Home is a high-level launcher, not the only place progression lives.
- Persistent utility access includes Notification Center and Settings/Options.
- Universal Pack Points are presented as one currency.
- Region/Location are world context and filters, not mandatory travel/navigation layers for ordinary play.

## Activities / Skills
- Combat is an overarching Skill; Melee/Ranged/Magic are styles/build contexts, not three independent Skills.
- Gathering is an overarching Skill with one shared level/XP track.
- Woodcutting, Mining and Fishing are Gathering subsets, not independent Skills.
- Each subset has a permanent global subset mastery/progression score.
- Each Region can track finite Regional Participation for authored relevant subsets, with a lower advancement threshold and higher 100%-completion cap.
- Higher-tier activities improve the established profile inside a subset; later Regions can also introduce entirely new subsets/profiles.
- Activity selection is Skill/subset-first, showing all unlocked Regions by default; Region is an optional filter, Location generally is not.
- Activity comparison/sorting is intended around level, XP, Pack Points, idle endurance and other applicable profile dimensions, ascending/descending.
- Discovered-but-locked content is visible with requirements; future unrevealed expansion content remains hidden.
- Newly revealed content receives a temporary NEW marker until viewed.

## Huntsmanship
- Tracking -> Stalking -> Hunting structure is visible.
- Tracking is the idle/endurance-focused profile and can use the full account idle cap.
- Stalking is XP-focused and uses a reduced idle duration.
- Hunting is larger Pack Point payout-focused and uses a reduced idle duration.
- Tracking selects Region and automatically rolls eligible generic/Special creatures.
- Special Creature discovery uses overall Special chance plus creature selection; Perfect creature Bindings improve tracking odds rather than the Hunt itself.
- Special Stalking is deterministic/no random escape and falls back to generic stalking after completion.
- Special Hunts require personally collected nontradeable Creature Bindings and use deeper Combat.

## Packs / collection acquisition
- Pack Points are universal across activities.
- Packs are Region-specific and have increasing rarity/tier options.
- Region pools include Region-specific cards plus the eligible universal pool.
- Pack opening is one pack at a time with Open Another, not Open X.
- Pack reveal starts on the first card back; tap advances through fronts; Reveal All is available.
- Perfect reveal sequence can be skipped by tapping; Reveal All Perfect behavior is configurable in Options.
- Codex acquisition guidance can deep-link to the recommended normal pack without changing odds.
- Navigation context is preserved when entering Packs from a Binding requirement.
- Pulling an originating-goal Binding can subtly show requirement completion/progress without interrupting Open Another.

## Codex
- Codex is the collection binder for genuinely obtained Bindings.
- Codex also houses achievements and valuable long-term progression records/statistics that do not have a better everyday home.
- Standard collection and Perfection remain separate completion concepts.
- Raid records include completion/current best attempt, clears and Mastery; significant achievements can record dates selectively.
- Statistics are summary-first with meaningful drill-downs.
- Achievements are contextual to revealed content; select secret achievements remain hidden.
- Long-term achievements use tiered chains; ordinary rewards auto-grant, major accomplishments get larger presentation.
- Performance records are selective; Raid fastest clear is one record and includes legitimate Mastery/build/active-assistance progression.

## Bank / equipment / loadouts
- Bank houses owned duplicates and equipment management.
- Final copy of a Binding cannot be Shredded or Traded away.
- Trading/Shredding operate on eligible duplicates, not collection ownership.
- Saved presets/loadouts are part of equipment strategy and Raid preparation.
- Raid combat styles reference preassigned saved presets rather than requiring manual mid-Raid equipment swapping.

## World / Regions / Locations / Exploration
- Exploration is the world-discovery activity for Locations and future Regions.
- Region topology is authored; routes can be linear, branching, converging and optional.
- Exploration map reveals progressively; future nodes are hidden until routes reveal them.
- Locations track discovery rather than their own completion percentage.
- Discovering a Location reveals its currently applicable content catalog; future Region/Skill-expansion content stays hidden until that expansion is revealed.
- Location reveal is a concise discovery presentation with scalable category summaries; it does not dump every requirement or deep-link category rows into gameplay menus.
- Revealed-but-unexplored destinations can show environmental previews but not gameplay content.
- Ordinary and Major Explorations are committed once started; the player cannot pause/cancel/switch activities until completion/checkpoint.
- Major Explorations use persistent stages with mandatory checkpoints; each next stage requires explicit start.
- Stage/checkpoint duration is authored within the lowest applicable idle cap rather than bypassing idle-cap rules.
- Active assistance can have stronger authored impact than ordinary activities; optional timed Exploration Events appear only while the app is open and expire without penalty.
- Events use Region/route-themed pools, lightweight choices and descriptive outcomes; they are primarily positive opportunities.
- Exploration can contain guaranteed one-time authored discoveries that cannot be permanently missed.
- Final Major Exploration is discovered through the Exploration graph; only then is the formal next-Region preparation checklist shown.
- Checklist evaluates prior account state retroactively and uses unique Binding counts, Skill levels, authored Regional Participation, Boss/Raid requirements and other authored prerequisites.
- Final Major Exploration belongs to the departing Region and discovers the next Region.
- By frontier reveal, all core Exploration paths have been organically revealed, though destination Location identities can remain unknown until explored.

## Region progression / completion
- Advancement and 100% Core Region Completion are separate authored sets.
- Collection progression is unique-Standard-Binding count-first; duplicates do not increase it.
- Region-specific and overall collection thresholds can both be used when they test different things.
- Mandatory collection thresholds leave a meaningful buffer below complete collection and do not require rarity quotas.
- Optional/DLC/future-expansion content does not move prior core progression/completion goalposts.
- 100% Core Region Completion can require full core Standard Binding collection, full authored subset participation caps, all core Explorations, applicable Boss/encounter clears and core Raid clears; Raid Mastery remains separate.
- Region Completion uses category-weighted progressive contribution with a shared baseline and authored adjustments.
- Tiered Minor/Standard/Major objective weights use fixed relative values; continuous objectives contribute proportionally.
- Definitive overall Region Completion percentage is withheld until the frontier/core topology is revealed; known progress is still visible earlier.
- 100% Region completion is Codex-first prestige with standardized recognition plus authored thematic rewards and optional modest utility.

## Raids
- Raids require personally collected specific content Bindings plus flexible build/Power readiness requirements.
- Specific prerequisite Creature/Activity Bindings cannot be substituted through trade; flexible equipment thresholds can use legitimate trade-granted equipment.
- Boss Bindings are normal Region-pack Creature Bindings and are nontradeable.
- Standard or Perfect ownership satisfies a Binding prerequisite; Perfect is never specifically mandatory.
- Perfect Raid Boss Bindings are cosmetic/prestige only for Raid performance.
- One Raid Token funds one complete Raid attempt; any required-section failure ends the attempt and the next Token restarts from section one.
- Successful section clears always grant persistent finite section Mastery, with section-appropriate benefits and cosmetic/prestige recognition at max.
- Fixed authored Raid core can contain controlled variation.
- Raid runs automatically using preassigned presets, with optional active assistance improving performance/speed but not directly multiplying Raid XP.
- Raid sections award appropriate incidental Skill XP but not independent resource loot; full clear provides the discrete Pack Point/reward payout.
- First-clear rewards are authored per Raid; no Raid-exclusive Bindings are required.
- Repeat rewards are deliberately restrained around existing systems: Pack Points, Raid Tokens, applicable DLC Pet chance and selectively appropriate existing resources.
- Raid Tokens can be tradeable under progression/value rules; a traded Token is usable but trade-locked and cannot circulate again.
- Major Raids are generally Region finales but placement/progression importance is authored; optional Raids can coexist.

## Community / Trading / Profile
- Non-unique display names use a separate unique Friend ID; display names are freely changeable.
- Friend search can use Display Name or exact Friend ID; Friend Requests require acceptance and expire after a longer window.
- Fixed reasonable Friend cap; no progression/monetization of friend slots.
- Basic presence only, privacy-toggleable; current gameplay activity is not exposed.
- Codex visibility supports Full Codex / Showcase Only / None-style modes.
- Showcase is a small fixed-slot curated set with light earned cosmetic customization.
- Profile icons and Titles are earned prestige cosmetics with no rarity/power.
- Activity/Creature/Perfect Bindings are nontradeable; eligible equipment and explicitly tradeable consumables use one-circulation/trade-lock safeguards.
- Trade flow supports viewing Friend collection/wishlist, value/eligibility validation, reservation of offered inventory, accept/reject/counter and a bounded counter chain.
- Traded functional Binding behavior remains distinct from genuine Codex ownership.
- Remove Friend / Block invalidates pending trades and releases reservations while completed history remains.

## Pets / DLC
- Pet system has a dedicated future-facing home so acquisition, Pet Journal and equipment placement can be evaluated now.
- Pets themselves are activity-earned where authored; Pet Equipment can enter applicable existing Region pack pools for DLC owners.
- DLC content/completion is separate from core Region completion and never lowers previously earned core completion.

## Ascendants / future systems
- Ascendants have a dedicated future-facing destination rather than being bolted onto an unrelated menu later.
- Challenges remain deliberately deferred future design space and should not be over-specified in the test build.

## Notifications / idle return / Options
- Global Notification Center is a utility, not a permanent primary bottom-navigation destination.
- Settings/Options contains notification category controls, pack-opening behavior, Region theme selection, return-summary behavior and Community/privacy controls.
- Returning after meaningful idle time can show a While You Were Away summary; short absences do not need a full recap.
- Idle summary communicates total time away, actual processed time and whether an activity-specific idle cap/checkpoint stopped progress.
- Effective idle duration is visible before starting applicable activities.
- Exploration optional Events use non-blocking toast + timed global indicator; mandatory checkpoints are persistent hard stops and can notify.

## Provisional test values
Exact economy/balance numbers may remain test-only: pack prices/odds, Region collection thresholds, subset participation targets, completion weight ratios, Raid Power thresholds, Raid Token values/drop rates, mastery curves, trade tolerance, Pet drop/XP curves, and reward quantities. Testers should evaluate the **hierarchy, terminology, placement, navigation, visibility and interaction pattern** independently of those provisional numbers.
