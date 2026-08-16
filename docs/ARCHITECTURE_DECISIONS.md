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

## Stage dependencies

These decisions should influence the architecture reconciliation and later data/content work, but they should not destabilize the current R2 routing consolidation.

- **R2:** preserve compatibility with future Skill-owned equipment/loadout views while consolidating Home/Bank/Collection routing; do not implement the broad-Skill conversion here.
- **R3:** keep idle settlement generic enough to operate on broad Skill/family/activity metadata.
- **R4:** content registration should represent Skill, family, tier, Activity Binding, equipment applicability, and activity profiles as data rather than proliferating specialized runtime modules.
- **R6 original-content vertical slice:** use the broad Skill/family architecture and universal equipment direction as target product structure.

All implementation remains subject to targeted regression testing and the full acceptance gate at stage boundaries.
