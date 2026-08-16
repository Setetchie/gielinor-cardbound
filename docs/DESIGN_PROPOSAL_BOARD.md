# Cardbound Design Proposal Board

**Status:** Active product/design source of truth for accepted directions, review proposals, open balance questions, and later creative milestones.

This board reconciles the product decisions discussed during the recent architecture, world, monetization, equipment, release-planning, and v42 UI-review sessions. It supplements `ARCHITECTURE_DECISIONS.md`, `WORLD_BIBLE.md`, and `TESTING_RELEASE_MARKETING_ROADMAP.md`. Where older prototype terminology conflicts with an accepted newer direction below, the newer accepted direction should be used for future implementation planning.

## Status vocabulary

- **LOCKED / ACCEPTED** — agreed direction; implementation may still belong to a later stage.
- **REVIEW PROPOSAL** — captured during hands-on review; do not implement until the UI/UX change pass is explicitly approved.
- **BUG** — functional defect; may be fixed separately from subjective design proposals.
- **OPEN / BALANCE** — direction exists but exact values/content are intentionally undecided.
- **CREATIVE MILESTONE** — requires dedicated naming/world/visual/audio work before content production.

---

## A. Broad Skill and activity architecture

### A1. Broad Skills with families/subsets — LOCKED / ACCEPTED

Use broad permanent Skills rather than making every specialization its own permanent Skill.

Target hierarchy for non-combat activities:

`Skill → Activity Family / Discipline → Tier → Activity Binding`

Examples:

- **Gathering** may contain Woodcutting, Fishing, Prospecting/Mining, Foraging, and other appropriate families.
- **Travel** contains exploration/trails and later-discovered travel families such as Sailing, caravanning, hazardous travel, and Expeditions where appropriate.

**Combat is a deliberate exception to player-selected family/style navigation.** Combat is one broad Skill/category, and the player selects the enemy or encounter rather than selecting Melee, Ranged, or Magic as an activity family.

Target Combat flow:

`Activities → Combat → Enemy / Encounter → Start Combat`

The equipped weapon/loadout determines the active combat style automatically. Melee, Ranged, Magic, and any future combat-style classifications remain weapon/equipment/combat-calculation metadata used for weaknesses, resistances, bonuses, encounter requirements, and tactical decisions; they are **not separate player-selected Combat activities or permanent Skills**.

Combat equipment must carry explicit style metadata rather than relying on item names. The encounter UI should communicate the style derived from the current equipment and relevant enemy weaknesses/resistances/effectiveness, while allowing the player to deliberately change loadouts before starting. Changing encounters does not auto-equip a preferred style.

### A2. Region-driven family discovery — LOCKED / ACCEPTED

Do not unlock every family in the starting region. Later Regions should introduce genuinely new ways to interact with the world.

A family learned in a later Region may reveal new activities in previously discovered Regions/Locations. Example direction: Prospecting learned later can reveal previously unusable deposits in Greyvein Delve; Sailing learned later can reveal routes from Tidecross Haven.

Sailing should not be assumed to unlock in Region 1 merely because the prototype currently contains Sailing content. Its final unlock Region remains a World Bible/progression-matrix decision, likely Region 2 or 3 depending on final world design.

---

## B. World structure

### B1. Geography hierarchy — LOCKED / ACCEPTED

Use:

`World → Region → Location → optional Point of Interest`

**Region** is the major progression/theme chapter. **Location** is the player-facing term for named places inside a Region; avoid presenting them as technical “sub-regions.” Points of Interest are optional story/discovery details and should not become another mandatory navigation tier.

### B2. Role of Locations — LOCKED / ACCEPTED

Locations must have gameplay value beyond scenery. They can provide:

- world identity and geography;
- discovery progression;
- activity origin/habitat;
- creature/Binding origins;
- encounters and bosses;
- story/lore and NPC anchors;
- regional/location collection completion;
- latent interactions that become usable after later family/knowledge unlocks.

Repeatable activity navigation remains Skill-first. A player should normally be able to reach an activity through its Skill/family screen without commuting through World → Region → Location every time.

The World interface instead answers “what is here?” and supports geography, discovery, lore, regional completion, and backtracking opportunities.

### B3. Greenwake Frontier — WORKING / EXISTING FIRST REGION

Current working first Region: **Greenwake Frontier**.

Existing working Locations include:

- Waystone Outpost
- Bramblewood
- Greyvein Delve
- Glasswater Run
- Tidecross Haven
- Oldwatch Ruins

These names remain subject to the final naming/clearance process. Greenwake should establish foundational Bindings, basic Gathering, basic Combat, and basic Travel/exploration without introducing every family.

### B4. Regional themes — LOCKED / ACCEPTED

Unlocking Regions should progressively change the atmosphere of the application while preserving the fundamental UI grammar. Regional presentation may influence backgrounds, accents, dividers, textures, Skill headers, map presentation, pack-opening environments, and subtle ambient effects.

Pack/card type, tier, rarity, and Perfect visual grammar remain recognizable and consistent across Regions; regional backgrounds/themes should not make universal objects unreadable.

---

## C. Equipment and loadouts

### C1. Universal activity equipment — LOCKED / ACCEPTED

Equipment is not Combat-only. Major Skills/families can have collectible equipment appropriate to their activities, such as lumberjack gear for Woodcutting, prospecting gear, Fishing gear, Travel gear, and Combat gear.

Equipment can affect suitable outcomes such as XP, Pack Points, regional weighting, idle characteristics, activity profiles, family efficiency, and specialization effects.

### C2. Equipment slots — LOCKED / ACCEPTED DIRECTION

Specialization slots:

- Head
- Body
- Legs
- Main Hand
- Off Hand

Main Hand may be one- or two-handed. Two-handed weapons/tools occupy both hand slots. Head + Body + Legs are the preferred core three-piece specialization-set structure.

Utility slots:

- Gloves
- Boots
- Jewelry

Utility items should emphasize horizontal build choices such as XP vs Pack Points, speed, idle duration, regional weighting, rare-event/variance profiles, etc., rather than simply duplicating Skill-specific armor bonuses.

Special/prestige slot:

- Cape/back slot primarily represents accomplishments, mastery, regional/world achievements, Favor/Ascendant achievements, collection milestones, encounters, and other prestige.

Prestige capes must use original Cardbound accomplishment structures and should not reproduce recognizable RuneScape skill/max/completionist cape systems.

Exact bonuses and numerical balance remain open.

### C3. Per-Skill equipped loadouts — LOCKED / ACCEPTED

Each broad Skill maintains its own currently equipped loadout. Families do not require separate mandatory equipped inventories.

Changing family/activity does **not** auto-equip gear. Inapplicable bonuses simply do not apply. The player deliberately changes equipment or selects a saved preset.

### C4. Saved presets — LOCKED / ACCEPTED

Saved presets can specialize for a Skill, family, activity, encounter/boss, idle strategy, XP strategy, Pack Point strategy, etc.

No automatic equipment optimization/equipping when changing activities.

Preset capacity is finite and account-wide. Players receive a useful baseline and can unlock more through progression. Optional paid expansion may add capped account-wide convenience slots but cannot add equipment power or inaccessible gear. Exact capacities/pricing remain balance tasks.

### C5. Equipment presentation — LOCKED / ACCEPTED DIRECTION

Core equipment functionality must work with slots/cards/icons and cannot depend on expensive character visualization.

A lightweight static player avatar/silhouette/illustrated representation may be centered in the equipment view. The avatar represents the player, not a fixed named protagonist, and does not create a second RPG-stat progression system.

Progressively support layered 2D wearable art for visually meaningful gear: major sets, weapons/tools, distinctive offhands, prestige capes, and selected exceptional/Perfect effects.

Full 3D/360-degree viewing, complex rigging/physics, extensive animation, or MMO-style character creation are outside core scope.

Priority:

`Cards/gameplay → equipment/loadout functionality → lightweight equipment presentation → optional enhanced 2D visualization`

---

## D. Activity + loadout UX

### D1. Activity loadout selection — REVIEW PROPOSAL / EXPECTED FIRST UI PASS

Activity selection should expose the currently equipped loadout and let the player deliberately choose/apply a saved preset before starting.

Conceptual flow:

`Activity details/rewards → Current Loadout → Change Loadout (optional) → Start Activity`

Changing activity does not automatically change equipment. The UI should warn/communicate when equipped family-specific bonuses are inapplicable and allow the player to decide whether to switch.

For Combat, the selected weapon/loadout also determines the active combat style. Encounter selection must not ask the player to separately choose Melee/Ranged/Magic; instead, show the derived style and its effectiveness against the selected enemy and allow a deliberate loadout change if desired.

The equipment/loadout screen and activity-loadout interaction should be redesigned functionally during the first approved UI/UX implementation pass; final original gear art comes later in the Visual Bible/content-art stage.

---

## E. Forge / fragment economy

### E1. Universal normal Fragment currency — REVIEW PROPOSAL / ACCEPTED DIRECTION

Replace tier-specific normal fragment currencies with a **single normal Fragments currency**. Each forge tier/pool has a different Fragment cost. Exact costs remain an economy/balance task.

### E2. Standard Forge outcome — EXISTING INTENDED DESIGN / MUST PRESERVE

A standard Fragment forge produces a **random eligible unowned card** from the selected eligible tier/pool.

The normal random pool excludes cards already owned.

### E3. Star Fragment targeted forge — EXISTING INTENDED DESIGN / MUST PRESERVE

The rarer **Star Fragment** allows the player to select the specific eligible unowned card rather than receiving a random one. Star Fragments function as scarce targeted collection completion/bad-luck protection.

### E4. Forge eligibility — EXISTING INTENDED DESIGN / MUST PRESERVE

Currency does not bypass content progression. A card is forgeable only when its established pack/content eligibility requirements have been satisfied. Forge should use those individual card/content requirements rather than inventing a generic independent Forge progression gate unless intentionally designed later.

Forge UI should distinguish:

- eligible + unowned;
- already owned;
- locked/ineligible, with a clear reason.

Conceptual rule:

`eligible cards by normal content requirements → remove owned cards → random Fragment forge OR targeted Star Fragment forge`

---

## F. Monetization

### F1. Core monetization principle — LOCKED / ACCEPTED

**Monetization may reduce friction or expand convenience; it should not purchase superior progression efficiency.**

Do not sell exclusive core activities, stronger cards, improved pack rarity odds, inaccessible equipment power, or direct account-wide progression-rate superiority as part of the accepted convenience model.

### F2. Permanent idle/offline capacity — LOCKED / ACCEPTED DIRECTION

A permanent account convenience upgrade may extend maximum offline accumulation duration.

Paid idle capacity changes the **cap**, not the reward rate for an equivalent period. Free players must have a genuinely useful baseline. Normal progression and equipment may also modify idle characteristics where appropriate.

Exact free duration, progression extensions, paid extension, cap, packaging, and price remain balance tasks.

### F3. Account Upgrade packaging — LOCKED / ACCEPTED DIRECTION

Potential permanent account convenience package may include:

- longer offline accumulation capacity;
- additional saved-loadout capacity;
- ad-free Daily Focus access;
- appropriate cosmetic/profile conveniences later.

Do not fragment every Skill into separate paid preset capacities.

### F4. Rewarded ads / Daily Focus — LOCKED / ACCEPTED DIRECTION

If advertising is used, prioritize **optional rewarded ads**, not forced interstitials or persistent banners.

Preferred system: limited **Daily Focus** activations. A free player voluntarily watches a rewarded ad and chooses a temporary profile. Candidate profiles:

- XP Focus;
- Pack Point Focus;
- Regional Focus;
- Idle Focus.

Activity-speed and rare-event Focus effects require stricter later balance review.

Guardrails:

- limited daily activations; no unlimited ad-watching optimal loop;
- no forced ads after activities or during pack reveals;
- no ad required to retain an already-earned reward;
- no direct improved pack rarity odds, pack rerolls, rarity upgrades, or doubled pack contents;
- no exclusive cards/activities/equipment/permanent power;
- prefer understandable duration-based effects;
- where practical, activated Focus can apply to eligible offline settlement rather than forcing reopenings when a timer expires.

A future Account Upgrade may provide the **same limited Daily Focus allowance without ads**, buying removal of advertising friction rather than an additional full stack of daily progression boosts.

Exact charges, percentages, durations, cooldowns, and economics remain open.

---

## G. Pack/card reveal presentation

### G1. Reveal intensity — LOCKED / ACCEPTED DIRECTION

Common vs Uncommon should have minimal reveal differentiation beyond readable rarity text/frame treatment. High-tier cards may have increasingly subtle-to-notable reveal differences. **Perfect/Foil cards receive the fully dramatic reveal treatment** because of their rarity and gameplay benefit.

Avoid making every ordinary rarity reveal excessively animated; preserve escalation so exceptional pulls feel exceptional.

### G2. Pack/card regional presentation — LOCKED / ACCEPTED

Pack icons and card icons/art identities remain tied to their pack tier/type and card identity. Regional unlocks primarily alter the surrounding/background presentation rather than replacing the universal object grammar.

---

## H. UI review process — LOCKED / ACCEPTED

### H1. v42 review mode

During the current product-owner review, subjective UI/UX feedback is collected on this board and **not implemented until explicit approval to begin the change pass**.

True bugs are tracked separately and may be fixed without waiting for subjective-design batch approval.

Legacy RuneScape names/icons/assets are known placeholders. Do not spend review effort merely reporting their existence unless they affect usability/layout. Final replacement belongs to original-IP conversion, naming, World Bible, and Visual Bible work.

### H2. Current known v42 bug — BUG / HIGH PRIORITY

**Bank bottom-navigation responsive defect:** opening Bank causes the bottom navigation to expand/change layout and pushes Forge off-screen. Expected behavior is a consistent navigation layout with all primary destinations accessible regardless of active page.

### H3. Review focus

Current testing should emphasize Home information hierarchy, navigation, activity flow, idle presentation, Bank/equipment, Collection, Packs, screen density, mobile ergonomics, and unnecessary tap depth.

---

## I. Naming, brand, and original creative identity

### I1. Naming milestone — CREATIVE MILESTONE / ACCEPTED

Move **World + Game + Studio/Company Naming** ahead of expensive final logo/marketing production.

Preferred title architecture to explore:

**`[WORLD NAME]: Cardbound`**

with **“Idle TCG”** / **“An Idle TCG Adventure”** functioning primarily as a descriptor/store subtitle rather than necessarily part of the legal title.

`Cardbound` remains a working title until clearance.

### I2. Naming order

Explore:

`Brand personality → World-name candidates → shortlist → game-title combinations → studio/company candidates → web/store/trademark screening → domain/social strategy → final selection → logo/Visual Bible`

The studio/company name may tie into the world name or be independent so it can support unrelated future products.

Before commercial commitment, screen serious candidates against general web results, game/app storefronts, relevant trademark databases, domains, and social handles; obtain professional trademark advice when appropriate.

### I3. World Bible — CREATIVE MILESTONE

Before mass original-content production, formalize:

- final world premise/name;
- broad Skill roster;
- launch-region count and regional archetypes;
- Region → Location progression matrix;
- Skill/family unlock distribution;
- cultures/factions;
- Ascendant pantheon;
- major history/story;
- naming conventions for Regions, Locations, creatures, equipment, materials, facilities, etc.

Regions should be designed mechanically before being named/decorated: each should have a reason to exist, new family/technique contributions, signature mechanics/content, and ways to create new opportunities in earlier Regions.

### I4. Visual Bible — CREATIVE MILESTONE

Define original visual grammar before mass asset production:

- card types and frames;
- rarity hierarchy;
- Perfect/Foil treatment;
- pack tiers/types;
- equipment silhouettes and illustration style;
- regional visual themes;
- creature-family art direction;
- Ascendant presentation;
- UI materials/typography/icon language;
- equipment/player-avatar presentation.

Prototype a representative small card/art set before producing hundreds of assets. Include ordinary/rare creatures, Activity Bindings, equipment pieces/set, one- and two-handed tools, offhand, prestige cape, Legendary/Ascendant, normal vs Perfect, and multiple regional examples.

Individual final equipment/card names and art should then be generated from mechanical + world constraints rather than one-for-one renames of prototype items.

### I5. Audio Bible / Sound Direction — CREATIVE MILESTONE / ACCEPTED

Audio is part of the intended final experience, but it should reinforce the idle-TCG experience rather than become a heavy production dependency.

Use three primary layers:

- **Regional music/ambience:** Regions may have distinct musical and ambient identities that reinforce regional UI themes. Ambient layers can use environmental texture instead of requiring continuous dense music.
- **UI/gameplay SFX:** tactile feedback for activity start/completion, equipment/loadout changes, discovery, forging, Fragment rewards, pack acquisition, and other meaningful interactions.
- **Pack/card reveal audio:** audio intensity follows the accepted reveal hierarchy. Common/Uncommon remain restrained; higher rarities gain increasingly distinctive cues; Legendary/Ascendant outcomes may use recognizable buildup; Perfect Bindings receive the strongest audiovisual reveal.

Star Fragment targeted forging should have a distinct and more significant sonic identity than an ordinary random Fragment forge.

The game must remain fully understandable and usable while muted; no essential information should be communicated by sound alone.

Provide separate settings for at least **Music** and **Sound Effects**, and evaluate a separate **Ambient Audio** setting during implementation. Mobile audio behavior should avoid unnecessarily disrupting external audio where the platform allows appropriate handling.

Voice acting is **not a launch requirement**. Large-scale voiced dialogue should not be assumed because of cost, localization, download-size, and content-maintenance implications. Limited voice work for exceptional future content may be evaluated later.

Ascendants may use recurring sonic motifs or instrument identities to reinforce their domains without requiring a separate full soundtrack for each Ascendant.

Develop the Audio Bible alongside the World and Visual Bibles once Regions, tone, Ascendants, rarity presentation, and original visual identity are sufficiently established.

For the first original vertical slice, prototype a representative audio package before scaling production: one Greenwake/regional music or ambience direction, core UI sounds, activity start/completion, equipment/loadout feedback, pack opening, ordinary card reveal, high-rarity reveal, Perfect reveal, normal Fragment forge, Star Fragment targeted forge, and Location/Region discovery.

Use the vertical slice to determine whether the final soundscape should lean more atmospheric, magical, tactile/TCG-like, restrained, or another coherent direction before producing audio across the full world.

---

## J. Testing, release, app stores, and marketing

### J1. Test progression — LOCKED / ACCEPTED ROADMAP

1. Product-owner v42 UI/UX review.
2. Approved UI/UX implementation pass.
3. Friends & Family Alpha (~5–10).
4. R3/R4 progression + World/Visual/Audio Bible work.
5. Original vertical slice.
6. Closed Alpha (~25–100).
7. Native mobile packaging/store preparation.
8. TestFlight / Google Play closed testing.
9. Larger Closed Beta.
10. Public beta / soft launch.
11. Full launch.
12. Scale creator/paid marketing based on retention evidence.

### J2. Outside-test distribution — LOCKED / ACCEPTED DIRECTION

Do not use the constantly changing main development URL as the permanent outside-testing process. Friends & Family should eventually receive a dedicated stable test deployment/build with visible version identification while development can continue independently.

Once native packaging exists, use TestFlight for Apple external testing and Google Play testing tracks for Android rather than manual binary distribution.

### J3. Marketing — LOCKED / ACCEPTED DIRECTION

Begin audience building before launch once the game has a final identity and enough original visuals to present it without relying on RuneScape-derived assets.

Potential early content: card-frame concepts, original creature/equipment reveals, Region art, pack-opening presentation, development clips, progression demonstrations, and beta signup/wishlist material.

RuneScape/OSRS-adjacent creators may be a useful seed audience because of progression/collection overlap, but marketing must clearly present an **original** game rather than an unofficial RuneScape game. Broaden to idle/incremental, TCG/CCG, collection, indie, and mobile creators.

Do not wait for organic traction before doing any marketing, but do not scale paid acquisition until retention data suggests acquired players are worth scaling. Prefer authentic creator early access/fit over rigid sponsorship scripts.

### J4. Store publication — ACCEPTED ROADMAP

Do not submit the current RS-placeholder web prototype to production stores. Native/mobile packaging and store-account preparation should occur after a sufficiently original/stable vertical slice and before larger closed beta.

Apple preparation includes Developer Program/App Store Connect, final identity/bundle ID, signing/build pipeline, privacy/age/store metadata, compliant digital-purchase implementation, rewarded-ad/privacy requirements, TestFlight, App Review, and current-policy revalidation.

Android preparation includes Play Console, App Bundle/signing, Data Safety/privacy/content rating/store assets, compliant billing/ads, testing tracks, and current-policy revalidation.

Studio/company vs individual publishing identity should be considered before production store infrastructure is finalized.

---

## K. Stage sequencing / project milestones

### K1. Near-term sequence — ACCEPTED

`R2 complete → product-owner v42 review → collect board feedback → explicitly approve UI/UX change batch → implement/test UI changes → Friends & Family Alpha → continue R3/R4 → naming + World Bible + Visual Bible + Audio Bible → original vertical slice → broader testing`

R2 is complete. Do not begin subjective UI proposal implementation merely because an item appears on this board; wait for explicit approval of the UI change pass.

### K2. R3/R4 dependencies

R3 idle settlement should remain generic enough for broad Skill/family/activity metadata, account-level idle-cap rules, equipment modifiers, and temporary Focus modifiers without hard-coding ad/purchase behavior into activity definitions.

R4 content registration should represent Skill, family, tier, Activity Binding, equipment applicability/slot role, utility profile, activity profile, Region, Location, and content eligibility as data rather than proliferating specialized runtime modules. Combat content additionally needs explicit weapon/style and encounter weakness/resistance metadata without requiring separate style-selection activities.

---

## L. Explicit open questions

These remain intentionally undecided and should not be silently assigned final values:

- final world/game/studio names and domains;
- final broad Skill roster;
- number/names/themes/order of Regions 2+;
- exact Region where Sailing and other later families unlock;
- final Ascendant names/domains/benefits;
- exact equipment bonuses/set bonuses;
- preset free/paid capacities and pricing;
- free/progression/paid idle-cap values;
- Daily Focus charges, percentages, durations, and cooldowns;
- universal Fragment tier costs and Star Fragment acquisition rate;
- final card/pack rarity/tier economy;
- final visual art style and production pipeline;
- final audio style, music scope, SFX production pipeline, and implementation technology;
- final mobile packaging technology and deployment infrastructure;
- marketing budget, creator partners, and paid acquisition thresholds.

Any newly accepted product/design decision from ongoing review should be added here (or to a more authoritative dedicated document and referenced here) so it does not remain only in chat history.
