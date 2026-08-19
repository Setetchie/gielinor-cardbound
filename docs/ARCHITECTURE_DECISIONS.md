# Cardbound Architecture Decisions

This document records accepted product/architecture decisions that must be incorporated at the appropriate acceptance-gated implementation stage. It supplements the refactor plan; accepted future-stage ideas do not interrupt the current stage merely because they were documented.

## Broad Skill architecture

**Status: Accepted / architecture prerequisite**

Permanent Skills should remain broad progression tracks. The target activity hierarchy is:

`Skill → Activity Family / Discipline → Tier → Activity Binding`

Families preserve distinct gameplay identities without requiring every specialization to become another permanent Skill.

### Combat

Combat should become one broad permanent Skill. Melee, Ranged, Magic, and appropriate specialized combat disciplines become Combat families/subcategories rather than separate permanent Skills.

Combat families retain meaningful differentiation through family-specific equipment, enemy weaknesses/resistances, encounter requirements, and other combat-only mechanics. The universal Skill/family architecture does not require non-combat activities to imitate combat weakness systems.

### Gathering example

Gathering can contain families such as Woodcutting, Mining/Prospecting, Fishing, and Foraging. Regions may introduce new Gathering families or higher tiers/techniques for families discovered earlier.

### Travel

Travel remains the broad progression track for trails/exploration, caravanning, Sailing, hazardous terrain, expeditions, and later travel disciplines. Sailing is a Travel family/discipline rather than a standalone permanent Skill in the target architecture.

## Universal activity equipment

**Status: Accepted architecture direction / future implementation**

Functional equipment is not combat-only. Major Skills and activity families may have collectible equipment that modifies appropriate activity outcomes, including:

- Skill or family XP
- Pack Point output
- regional Pack Point weighting
- idle characteristics
- activity-profile bonuses
- family-specific efficiency
- appropriate rare-event or specialization effects

Examples include lumberjack equipment for Woodcutting, prospecting/mining equipment for Gathering, fishing equipment, Travel equipment, and Combat equipment.

Equipment families do not need mechanically identical bonuses. Equipment should reinforce the different reward profiles and identities of activities.

## Equipment slot model

**Status: Accepted direction; detailed balance remains open**

Use a shared equipment grammar across broad Skills rather than a combat-only slot model.

### Specialization slots

- **Head** — Skill/family specialization.
- **Body** — major Skill/family specialization and set contribution.
- **Legs** — major Skill/family specialization and set contribution.
- **Main Hand** — weapon or activity tool.
- **Off Hand** — shield, book/tome, assisting implement, or secondary tool.

Main-hand equipment may be one-handed or two-handed. Two-handed weapons/tools occupy both hand slots and can trade configurability for stronger focused effects. One-handed equipment permits an assisting offhand.

Head + Body + Legs are the preferred core three-piece specialization-set structure. Weapons/tools and utility slots do not need to belong to the armor/clothing set for its core set bonus.

### Utility slots

- **Gloves**
- **Boots**
- **Jewelry**

Utility equipment should lean toward broad build-shaping modifiers rather than simply duplicating family-specific bonuses. Candidate modifier identities include XP, Pack Points, activity speed, efficient idle duration, regional weighting, rare-event/variance profiles, and similar horizontal tradeoffs.

Utility items may use opportunity costs where useful so that equipment does not converge on one item that simultaneously maximizes XP, Pack Points, speed, idle duration, and every other output. This supports deliberate builds that reinforce or compensate for an activity's underlying reward profile.

Regional utility items are allowed, but utility equipment should not be exclusively regional. Narrow regional effects may be stronger than comparable general-purpose effects because their applicability is restricted.

Exact slot bonuses, numerical modifiers, set-bonus values, and item distributions remain balance tasks.

### Cape / prestige slot

**Status: Accepted special slot direction**

Reserve Cape as a primarily prestigious/accomplishment-oriented equipment slot rather than another ordinary family armor piece.

Cape-slot rewards may represent major account, world, regional, collection, broad-Skill mastery, Ascendant/Favor, encounter, or other significant accomplishments. Broad-Skill mastery rewards should favor meaningful accomplishment across relevant families rather than merely reproducing a level-cap-per-skill cape structure.

Use original Cardbound accomplishment structures, terminology, iconography, visuals, unlock requirements, and effects. Do not reproduce recognizable third-party skill-cape/max-cape/completionist-cape progression structures.

Cape effects should generally reflect the accomplishment and remain complementary to normal specialization equipment rather than becoming mandatory replacements for family gear.

## Equipped loadouts

**Status: Accepted**

Each broad Skill maintains its own currently equipped loadout. Activity families do not require separate mandatory equipped inventories.

Changing from one family to another normally does not require equipment interaction. Inapplicable family-specific bonuses simply do not apply to the new activity. Players may deliberately change individual equipment or select a saved preset when they want to optimize.

Combat follows the same loadout principle even though style/family choice and enemy weaknesses can make equipment selection strategically more important.

## Saved loadout presets

**Status: Accepted**

Retain the existing saveable loadout/preset concept and generalize it beyond Combat when the architecture reaches the appropriate implementation stage.

Saved presets may specialize for a broad Skill, activity family, specific activity/encounter, boss, idle duration, or reward strategy. Presets reduce repetitive equipment selection but do not remove the player's equipment decision.

### No auto-equipping

**Status: Locked / accepted**

Do not automatically change equipment when the player changes Skill, family, activity, or encounter. The player must deliberately choose a saved preset or change equipment.

The product should preserve lightweight player input and strategic decision-making while avoiding mandatory equipment micromanagement for routine idle progression.

## Saved loadout capacity

**Status: Balance / monetization task; direction accepted**

Saved presets should use a finite **account-wide** capacity rather than separate monetized limits for every Skill.

Direction:

- players begin with a useful baseline number of saved presets;
- normal account/world progression unlocks additional capacity;
- free progression must provide enough capacity for ordinary specialization without creating deliberate inconvenience;
- optional monetization may provide additional permanent account-wide convenience slots beyond normal progression, subject to a reasonable cap;
- purchased slots provide organization/convenience only and no equipment power, stats, extra equipped slots, or otherwise inaccessible gear;
- do not sell the ability to equip appropriate gear;
- do not fragment monetization into separate paid Gathering/Combat/etc. preset capacities.

Exact starting capacity, progression unlock cadence, free endgame capacity, paid expansion sizes/pricing, and the final hard cap remain balancing tasks and should not be assigned final numbers prematurely.

## Convenience monetization and idle capacity

**Status: Accepted direction; exact economics remain open**

Cardbound may monetize permanent account-wide convenience upgrades, but purchases should reduce friction or expand convenience rather than purchase superior progression efficiency.

### Offline / idle capacity

A permanent account upgrade may extend the maximum duration for which an idle activity continues accumulating offline rewards before reaching its offline cap.

Guardrails:

- free players must receive a genuinely useful baseline offline accumulation window;
- paid idle capacity changes the maximum accumulation duration, not the reward rate during an equivalent period;
- two otherwise identical players completing the same activity for the same amount of time should not receive different XP/Pack Point rates merely because one purchased the idle-capacity upgrade;
- do not sell direct account-wide XP/hr, Pack Points/hr, activity-speed, pack-odds, equipment-power, or similar progression-rate multipliers as part of this convenience upgrade;
- normal progression may also extend idle capacity where appropriate;
- equipment may still deliberately modify idle characteristics as part of build strategy, including tradeoffs with speed, XP, Pack Points, or other activity-profile properties;
- monetized idle capacity should complement rather than replace those equipment/build decisions.

Exact free idle duration, progression-based extensions, purchased extension size, maximum cap, packaging, and pricing remain balance/economy tasks and should be chosen after activity-cycle pacing and expected player check-in cadence are better established.

### Account-upgrade packaging

Additional saved-loadout capacity and offline-capacity extensions may eventually be packaged as clear permanent account convenience upgrades rather than fragmented into many small purchases. Cosmetic/profile conveniences may also fit this category if developed later.

Any such package must preserve the core rule: **monetization may reduce friction or expand convenience; it should not purchase superior progression efficiency.**

## Rewarded ads / Daily Focus

**Status: Accepted direction; exact boost economy remains open**

If advertising is used, prioritize optional rewarded ads rather than forced interstitials or persistent banner advertising. Rewarded advertising should be a secondary convenience/temporary-optimization system and must not become the expected primary way to progress efficiently.

The preferred product framing is a limited **Daily Focus** system. A free player may voluntarily watch a rewarded ad to activate a Focus charge and deliberately choose from a small set of temporary activity profiles. Candidate Focus identities include:

- **XP Focus** — a modest temporary Skill XP modifier;
- **Pack Point Focus** — a modest temporary Pack Point modifier;
- **Regional Focus** — temporarily increases weighting toward the relevant/current region without directly improving pack rarity odds;
- **Idle Focus** — temporarily extends the applicable idle/offline accumulation window.

Activity-speed or rare-event Focus effects may be evaluated later but require stricter balance review because they can more directly alter progression efficiency or expected-value calculations.

### Rewarded-ad guardrails

- Focus activations are optional and limited; do not allow unlimited ad watching to become the optimal gameplay loop.
- Exact daily charges, boost percentages, durations, cooldowns, and eligibility remain balance/economy tasks.
- Prefer duration-based, easily understood effects rather than obscure action-count boosts.
- Where technically practical, a Focus activated before an idle session may continue to apply to eligible settled activity time so the player is not encouraged to reopen the game merely because an ad boost expired.
- Do not use forced ads after activities, during pack reveals, or as a condition for retaining rewards already earned.
- Do not use rewarded ads to directly improve pack rarity odds, reroll disappointing packs, upgrade card rarity, double pack contents, or otherwise compromise the integrity of pack outcomes.
- Rewarded-ad benefits must not unlock exclusive activities, cards, equipment, or permanent gameplay power.
- The UI should present Focus as an optional strategic choice, not as an alarm-driven requirement to maintain competitive efficiency.

### Ad-free account-upgrade relationship

A future permanent Account Upgrade may grant the same limited Daily Focus activations without requiring the purchaser to watch rewarded ads. The preferred fairness model is that free and upgraded players have access to the same daily Focus allowance/profile choices, while the upgraded player purchases removal of the advertising friction rather than additional daily progression boosts.

Do not automatically stack an upgraded player's ad-free Focus allowance with a second full allowance of rewarded-ad boosts unless a later economy review explicitly determines that doing so preserves the monetization guardrails.

## Equipment presentation and player avatar

**Status: Accepted direction / progressive presentation**

Equipment functionality must not depend on expensive character visualization. Card art, gameplay, equipment mechanics, and loadout usability have priority over wearable-character art.

Core equipment presentation should work through clear equipment slots/cards/icons. A lightweight static character, silhouette, or illustrated player-avatar presentation may occupy the center of the equipment view, but the equipment system must remain complete when an item has no wearable representation.

The player avatar, if/when expanded, represents the player rather than a fixed named story protagonist and must not introduce a separate RPG character-stat progression system. Authored story characters remain separate from the player representation.

### Progressive 2D visualization

The presentation layer may progressively support standardized layered 2D wearable art, prioritizing visually meaningful equipment such as:

- major Head/Body/Legs sets;
- weapons and activity tools;
- distinctive offhands;
- prestigious capes;
- selected Perfect/foil or exceptional equipment effects.

Gloves, jewelry, boots, and ordinary equipment do not require unique wearable art merely because they are functional cards. Wearable art is an enhancement, not a release dependency for equipment content.

Regional themes, prestige rewards, and subtle Perfect effects may enhance the character/equipment showcase using presentation assets that also support the broader regional UI-theme direction.

### Scope guardrail

Full 3D/360-degree equipment viewing, extensive character animation, physics, complex model rigging, or an MMO-style character creator are outside the core scope. They should not consume resources that would otherwise support cards, Bindings, activities, regions, packs, progression, encounters, balance, or other primary idle-TCG systems.

Priority order is:

`Cards and gameplay → equipment/loadout functionality → lightweight equipment presentation → optional enhanced 2D visualization`

## Stage dependencies

These decisions should influence the architecture reconciliation and later data/content work, but they should not destabilize the current R2 routing consolidation.

- **R2:** preserve compatibility with future Skill-owned equipment/loadout views while consolidating Home/Bank/Collection routing; do not implement the broad-Skill conversion or monetization systems here.
- **R3:** keep idle settlement generic enough to operate on broad Skill/family/activity metadata, future account-level idle-capacity rules, and temporary Focus modifiers without hard-coding purchase/ad behavior into activity definitions.
- **R4:** content registration should represent Skill, family, tier, Activity Binding, equipment applicability, equipment-slot role, utility profile, and activity profiles as data rather than proliferating specialized runtime modules.
- **R6 original-content vertical slice:** use the broad Skill/family architecture, universal equipment direction, prestige-slot direction, lightweight presentation hierarchy, convenience-monetization guardrail, and Daily Focus direction as target product structure.

### R2 routing ownership

**Status: Implemented architecture boundary**

The core UI router is the single destination registry and resolver. Home, Bank, and Collection/Codex page bodies register through `cbRegisterPage`; later accepted presentation layers replace a destination through the same interface. Unknown destinations resolve to Home. Feature layers must not create a competing page map or bypass the core resolver.

### R3 idle settlement ownership

**Status: Implemented architecture boundary**

`cbIdleEngine` is the single owner of idle scheduling, settlement entry, and foreground-resume dispatch. The historical `settleIdle`, `startIdle`, and `stopIdle` functions remain compatibility APIs for existing inline handlers and tests. Presentation layers may configure cadence and gain feedback through the engine, but must not add independent settlement intervals or visibility listeners. Reward calculations, offline caps, save fields, and activity eligibility remain behavior owned by the existing settlement functions until separately accepted changes replace them.

All implementation remains subject to targeted regression testing and the full acceptance gate at stage boundaries.
