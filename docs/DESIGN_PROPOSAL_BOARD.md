# Cardbound Design Proposal Board

**Status:** Active product/design source of truth for accepted directions, review proposals, open balance questions, and later creative milestones.

This board reconciles the product decisions discussed during the recent architecture, world, monetization, equipment, release-planning, and UI-review sessions. It supplements `ARCHITECTURE_DECISIONS.md`, `WORLD_BIBLE.md`, `TESTING_RELEASE_MARKETING_ROADMAP.md`, `v43-decision-interface-coverage.md`, `v43-first-test-pass-baseline.md`, and `v43-testing-navigation-scope.md`. Where older prototype terminology conflicts with an accepted newer direction below, the newer accepted direction should be used for future implementation planning.

## Status vocabulary

- **LOCKED / ACCEPTED** — agreed direction; implementation may still belong to a later stage.
- **REVIEW PROPOSAL** — captured during hands-on review; do not implement until the UI/UX change pass is explicitly approved.
- **BUG** — functional defect; may be fixed separately from subjective design proposals.
- **OPEN / BALANCE** — direction exists but exact values/content are intentionally undecided.
- **CREATIVE MILESTONE** — requires dedicated naming/world/visual/audio work before content production.

---

## A. Broad Skill and activity architecture

### A1. Broad Skills with subsets — LOCKED / ACCEPTED

Use broad permanent Skills rather than making every specialization its own permanent Skill.

Target hierarchy for non-combat activities:

`Skill → Subset → Activity`

The parent Skill owns the shared Skill level/XP progression. Subsets do **not** have independent player-facing Skill levels; each subset instead has its own persistent mastery/progression and Region-specific participation where applicable.

Examples:

- **Gathering** contains subsets such as Woodcutting, Mining, Fishing, and later appropriate gathering specializations.
- Other broad Skills may gain additional subsets as Regions/Locations are discovered.

**Combat is a deliberate exception to player-selected family/style navigation.** Combat is one broad Skill/category, and the player selects the enemy or encounter rather than selecting Melee, Ranged, or Magic as an activity subset.

Target Combat flow:

`Activities → Combat → Enemy / Encounter → Start Combat`

The equipped weapon/loadout determines the active combat style automatically. Melee, Ranged, Magic, and any future combat-style classifications remain weapon/equipment/combat-calculation metadata used for weaknesses, resistances, bonuses, encounter requirements, and tactical decisions; they are **not separate player-selected Combat activities or permanent Skills**.

Combat equipment must carry explicit style metadata rather than relying on item names. The encounter UI should communicate the style derived from the current equipment and relevant enemy weaknesses/resistances/effectiveness, while allowing the player to deliberately change loadouts before starting. Changing encounters does not auto-equip a preferred style.

### A2. Region-driven subset discovery — LOCKED / ACCEPTED

Do not unlock every subset in the starting Region. Later Regions/Locations should introduce genuinely new ways to use an existing broad Skill.

The **first subset in each Skill is the baseline/generalist subset**. It should provide a useful, reasonably balanced mix of the Skill's major reward profiles rather than being intentionally poor at one dimension. For Gathering, Woodcutting is the working baseline example: before Mining or other Gathering subsets are discovered, Woodcutting provides a balanced mix of Gathering XP, Pack Points, and Idle Efficiency.

Later Regions/Locations unlock new subsets that create **specialized profiles**. A specialized subset should improve meaningfully on one profile while giving up relative performance in one or more others. Example: a Mountain Region may unlock Mining, whose activities can offer substantially stronger Gathering XP than comparable Woodcutting activities while sacrificing Pack Points and/or Idle Efficiency.

**Specialized subsets are horizontal strategic options, not universal upgrades.** A later subset must not simply become better than the baseline in every major profile because it was discovered later. The baseline subset should remain a meaningful option throughout progression.

Later Regions may do both: add higher-tier/new activities to existing subsets and introduce an entirely new subset/profile. This allows vertical content growth inside a subset without collapsing the horizontal choice between subsets.

A subset learned later may also reveal new activities/interactions in previously discovered Regions/Locations when appropriate.

### A3. Subset profile communication — LOCKED / ACCEPTED

Do **not** explicitly label subsets with mechanical profile names such as `Pack Point Profile`, `XP Profile`, or `Idle Profile`.

Players should learn each subset's strategic profile from the actual activity values and comparisons. Activity rows/cards must clearly expose the relevant outputs used for that choice, such as:

- parent-Skill XP;
- Pack Points;
- Idle Efficiency / idle characteristics;
- other profile-relevant outputs introduced by that Skill.

Sorting must allow those values to be ordered low-to-high or high-to-low where appropriate. Within a subset, later/higher-tier content can naturally outperform earlier content while retaining the subset's broader profile tendencies.

### A4. Subset mastery as navigation — LOCKED / ACCEPTED

Do not add a redundant intermediate menu whose only purpose is selecting a subset after the player has already opened its parent Skill.

The parent Skill page shows each unlocked subset as an interactive **mastery/progression row or bar**. That row communicates subset identity and progression and is itself the link to that subset's activities. Use a clear interaction affordance such as a chevron so the progression bar does not appear passive.

Example:

`Activities → Gathering → Woodcutting mastery row → Woodcutting Activities`

The activity page then returns directly to the parent Skill with `← Back to Gathering`.

---

## B. World structure

### B1. Geography hierarchy — LOCKED / ACCEPTED

Use:

`World → Region → Location → optional Point of Interest`

**Region** is the major progression/theme chapter. **Location** is the player-facing term for named places inside a Region; avoid presenting them as technical “sub-regions.” Points of Interest are optional story/discovery details and should not become another mandatory navigation tier.

### B2. Role of Locations — LOCKED / ACCEPTED

Locations must have gameplay value beyond scenery. They can provide world identity/geography, discovery progression, activity origins, creatures/Bindings, encounters/bosses, story/lore, regional/location collection completion, and latent interactions that become usable after later subset/knowledge unlocks.

Repeatable activity navigation remains Skill-first. A player should normally be able to reach an activity through its Skill/subset screen without commuting through World → Region → Location every time.

The World interface instead answers “what is here?” and supports geography, discovery, lore, regional completion, and backtracking opportunities.

### B3. Exploration reveal and Location discovery — LOCKED / ACCEPTED

Progress toward a Region's final Major Exploration must naturally reveal the remaining **core Exploration paths**, even if the player does not complete those paths before pursuing the Major Exploration. The Exploration graph should accomplish this through authored world structure rather than an artificial global reveal.

At/around the frontier reveal, the complete core Exploration structure becomes transparent enough for authoritative core Region completion information. All core paths are revealed, but unvisited destination Location identities can remain unknown.

For a revealed-but-unexplored path:

- the route is visible;
- the destination remains unidentified until the Exploration is completed;
- an environmental preview may communicate broad terrain/place character;
- gameplay content at that Location is not previewed through the route.

At the frontier, the UI may reveal the total number of core Locations even when some destination identities remain unknown. Optional/secret/non-core/future-expansion content remains outside those core totals.

### B4. Location reveal presentation — LOCKED / ACCEPTED

Completing an Exploration that discovers a Location triggers a dedicated, concise Location reveal rather than only a toast.

The reveal may show Location name, artwork/environment, short flavor text, and the content discovered there. It should **not** become an eligibility/requirements audit. Players traverse the appropriate Activity/Combat/Huntsmanship/etc. menus afterward to determine whether they meet individual requirements.

For content-dense Locations, summarize discovered content by category rather than dumping every item onto the reveal. The category summaries are informational and are **not deep-link shortcuts** into gameplay menus. The reveal may offer `View Location` and `Continue`.

Newly revealed content receives a temporary `NEW` indicator in its normal system menu and the indicator clears when the player views that item/content in the appropriate menu.

---

## C. Equipment and loadouts

### C1. Universal activity equipment — LOCKED / ACCEPTED

Equipment is not Combat-only. Major Skills/subsets can have collectible equipment appropriate to their activities. Equipment can affect suitable outcomes such as XP, Pack Points, regional weighting, idle characteristics, activity profiles, subset efficiency, and specialization effects.

### C2. Equipment slots — LOCKED / ACCEPTED DIRECTION

Specialization slots: Head, Body, Legs, Main Hand, Off Hand. Main Hand may be one- or two-handed; two-handed weapons/tools occupy both hand slots. Utility slots: Gloves, Boots, Jewelry. Special/prestige: Cape/back.

Utility items should emphasize horizontal build choices such as XP vs Pack Points, speed, idle duration, regional weighting, rare-event/variance profiles, etc., rather than simply duplicating Skill-specific armor bonuses. Exact bonuses remain open.

### C3. Per-Skill equipped loadouts — LOCKED / ACCEPTED

Each broad Skill maintains its own currently equipped loadout. Subsets do not require separate mandatory equipped inventories. Changing subset/activity does not auto-equip gear. Inapplicable bonuses simply do not apply. The player deliberately changes equipment or selects a saved preset.

### C4. Saved presets — LOCKED / ACCEPTED

Saved presets can specialize for a Skill, subset, activity, encounter/boss, idle strategy, XP strategy, Pack Point strategy, etc. No automatic equipment optimization/equipping when changing activities. Preset capacity is finite and account-wide; exact capacities/pricing remain balance tasks.

### C5. Equipment presentation — LOCKED / ACCEPTED DIRECTION

Core equipment functionality must work with slots/cards/icons and cannot depend on expensive character visualization. A lightweight static player avatar/silhouette/illustrated representation may be centered in the equipment view. Full 3D/360-degree viewing and MMO-style character creation are outside core scope.

---

## D. UI/UX and navigation

### D1. Single persistent primary navigation bar — LOCKED / ACCEPTED

Use **one persistent horizontally scrollable primary navigation bar**, rather than splitting primary destinations between an upper and lower navigation bar. Preserve the useful behavior of the current upper bar: players can swipe/scroll horizontally to reach additional destinations without wrapping into another navigation row.

Top-level destinations such as Home, Activities, World/Exploration, Packs, Codex, Bank/Loadouts, Raids, Pets, Ascendants, Community, Settings, and other approved primary destinations belong to this single navigation system. Utility actions such as Notifications may be represented compactly without creating a second primary-navigation tier.

### D2. Drill-down page order — LOCKED / ACCEPTED

Use a predictable hierarchy on drill-down screens:

`Back navigation → Current Skill/subset information → filters/sorts/controls → content`

The Back control must be at the **top of the page**, before Skill information. It should clearly state the destination, e.g. `← Back to Activity Groups` or `← Back to Gathering`.

### D3. Filters/sorts must explain themselves — LOCKED / ACCEPTED

Every filter, sort, toggle, and view control across Bank, Codex/Card Collection, Activities, Packs, equipment, Pets, World/Exploration, Huntsmanship, Raids, Trading, Stats, and future menus must communicate what it does without requiring experimentation.

Use consistent language and behavior for common concepts. Compact UI may use short descriptors, tooltips/info affordances, expandable explanations, or contextual helper text depending on screen size. Sorting must make direction clear, e.g. `XP — Highest to Lowest` rather than an unexplained symbol alone.

### D4. Available/Locked status semantics — LOCKED / ACCEPTED

Where content-status filtering applies:

- **All** = all currently revealed content in that menu.
- **Available** = currently revealed content for which all requirements are satisfied and which can be used/started now.
- **Locked** = currently revealed content that cannot currently be used because one or more requirements are unmet. This includes unowned required Binding/equipment/unlock conditions and owned/revealed content whose level, mastery, Region progression, equipment, or other prerequisite is not met.

**Locked does not include genuinely undiscovered/hidden content.** Locked item details should clearly state why the item is locked.

### D5. Activity loadout selection — LOCKED / ACCEPTED DIRECTION

Activity selection should expose the currently equipped loadout and let the player deliberately choose/apply a saved preset before starting. Changing activity does not automatically change equipment. Combat shows the style derived from equipment rather than asking for a separate Melee/Ranged/Magic activity choice.

---

## E. Codex, collection, and account record

### E1. Codex role — LOCKED / ACCEPTED

The **Codex is the player's permanent record/encyclopedia**, not merely a renamed Collection screen.

The Codex landing page presents high-level summaries and links to at least:

- **Stats** — overall account/game statistics and permanent records;
- **Card Collection** — collection completion and the permanent discovered-card catalog.

Selecting either opens its own deeper space. Stats can organize deeper records by relevant systems as those systems become functional. Card Collection opens the full collection grid/gallery with appropriate filters/sorts.

### E2. Codex vs Bank — LOCKED / ACCEPTED

`Codex → Card Collection` answers: **What cards have I discovered and how complete is my permanent collection?**

`Bank` answers: **What copies/items do I currently possess and can actually manage/use?**

Collection requirements are based on unique cards collected. Players cannot shred or trade their last copy of a card, so permanent collection ownership is not lost by normal duplicate-management actions.

---

## F. Forge / fragment economy

### F1. Universal normal Fragment currency — REVIEW PROPOSAL / ACCEPTED DIRECTION

Replace tier-specific normal fragment currencies with a single normal Fragments currency. Each forge tier/pool has a different Fragment cost. Exact costs remain an economy/balance task.

### F2. Standard Forge outcome — EXISTING INTENDED DESIGN / MUST PRESERVE

A standard Fragment forge produces a random eligible unowned card from the selected eligible tier/pool. The normal random pool excludes cards already owned.

### F3. Star Fragment targeted forge — EXISTING INTENDED DESIGN / MUST PRESERVE

The rarer Star Fragment allows the player to select the specific eligible unowned card rather than receiving a random one.

### F4. Forge eligibility — EXISTING INTENDED DESIGN / MUST PRESERVE

Currency does not bypass content progression. A card is forgeable only when its established pack/content eligibility requirements have been satisfied. Forge UI should distinguish eligible + unowned, already owned, and locked/ineligible with a clear reason.

---

## G. Monetization

### G1. Core monetization principle — LOCKED / ACCEPTED

Monetization may reduce friction or expand convenience; it should not purchase superior progression efficiency. Do not sell exclusive core activities, stronger cards, improved pack rarity odds, inaccessible equipment power, or direct account-wide progression-rate superiority as part of the accepted convenience model.

### G2. Permanent idle/offline capacity — LOCKED / ACCEPTED DIRECTION

A permanent account convenience upgrade may extend maximum offline accumulation duration. Paid idle capacity changes the cap, not the reward rate for an equivalent period. Exact values remain balance tasks.

### G3. Account Upgrade packaging — LOCKED / ACCEPTED DIRECTION

Potential package may include longer offline accumulation capacity, additional saved-loadout capacity, ad-free Daily Focus access, and appropriate cosmetic/profile conveniences later.

### G4. Rewarded ads / Daily Focus — LOCKED / ACCEPTED DIRECTION

If advertising is used, prioritize optional rewarded ads, not forced interstitials or persistent banners. Preferred system: limited Daily Focus activations such as XP Focus, Pack Point Focus, Regional Focus, and Idle Focus, with exact values remaining open. Do not use ads to improve pack rarity odds or gate exclusive power/content.

---

## H. Pack/card reveal presentation

### H1. Reveal intensity — LOCKED / ACCEPTED DIRECTION

Common vs Uncommon should have minimal reveal differentiation beyond readable rarity text/frame treatment. High-tier cards may have increasingly notable reveal differences. Perfect/Foil cards receive the strongest reveal treatment.

### H2. Pack/card regional presentation — LOCKED / ACCEPTED

Pack icons and card identities remain tied to their pack tier/type and card identity. Regional unlocks primarily alter surrounding/background presentation rather than replacing universal object grammar.

---

## I. Testing and review continuity

### I1. Previous test fixes are mandatory baseline — LOCKED / ACCEPTED

Future test builds must preserve the accepted first-pass fixes and UI behavior documented in `v43-first-test-pass-baseline.md`. New structure work is additive; reintroducing an already-fixed first-pass issue is a regression.

The baseline includes bootstrap/navigation stability, single-router ownership, load/save stability, Combat/Activity corrections, Sailing hierarchy/routing and idle rewards, universal idle feedback, pack reveal/mobile results behavior, differentiated pack visuals and NEW feedback, equipment layout, Bank/Collection search/filtering, loadout presets/version handling, imagery consistency, pack safety, and service-worker/cache hygiene.

### I2. v43 decision/interface coverage is a living test contract — LOCKED / ACCEPTED

`v43-decision-interface-coverage.md` and `v43-testing-navigation-scope.md` are living testing references. Future accepted structural/UI decisions must be added to the board and reflected in the appropriate testing notes/coverage rather than remaining only in chat history.

When a new system is not mechanically complete, its future-facing menu destination may still be represented for navigation/look-and-feel testing, provided placeholder/provisional behavior is clearly distinguished from final mechanics.

### I3. Current manual UX test priorities — LOCKED / ACCEPTED

The next hands-on testing passes should explicitly evaluate:

- the single horizontally scrollable primary navigation bar;
- Back-control placement and drill-down hierarchy;
- parent Skill → subset mastery-row navigation;
- whether activity values naturally communicate baseline vs specialized subset profiles without explicit profile labels;
- filter/sort explanations and consistent Locked/Available semantics;
- Codex landing page, Stats, and Card Collection traversal;
- World/Exploration, Location reveal, and NEW-content discoverability;
- Bank/equipment/loadouts, Packs, Raids, Pets, Ascendants, Community/Trading/Profile, Notifications, and Settings placement;
- mobile ergonomics, screen density, unnecessary tap depth, and idle-return behavior;
- preservation of every previously accepted first-pass regression fix.

### I4. Automated regression baseline — CURRENT VERIFIED STATE

The v43 structure-fidelity build passed the expanded **1,400-execution regression gate** before being merged to `main`. Future UI changes should extend/update tests where intended navigation changes make old assertions stale, while preserving behavioral coverage rather than simply weakening tests.

---

## J. Naming, brand, and original creative identity

### J1. Naming milestone — CREATIVE MILESTONE / ACCEPTED

Move World + Game + Studio/Company Naming ahead of expensive final logo/marketing production. Preferred title architecture to explore: `[WORLD NAME]: Cardbound`, with “Idle TCG” / “An Idle TCG Adventure” primarily as descriptor/store subtitle. `Cardbound` remains a working title until clearance.

### J2. World/Visual/Audio Bibles — CREATIVE MILESTONE

Before mass original-content production, formalize the world premise/name, broad Skill roster, Regions/Locations, subset unlock distribution, cultures/factions, Ascendants, history/story, naming conventions, visual grammar, equipment/card presentation, regional themes, and audio direction. Regions should be designed mechanically before being named/decorated.

---

## K. Testing, release, app stores, and marketing

### K1. Test progression — LOCKED / ACCEPTED ROADMAP

1. Product-owner UI/UX review.
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

### K2. Outside-test distribution — LOCKED / ACCEPTED DIRECTION

Friends & Family should eventually receive a dedicated stable test deployment/build with visible version identification while development can continue independently. Once native packaging exists, use TestFlight and Google Play testing tracks.

---

## L. Stage sequencing / project milestones

### L1. Near-term sequence — ACCEPTED

`current manual UX testing → capture accepted findings on board/testing notes → implement consolidated UX pass → update/extend regression coverage → run full regression gate → merge stable test build → deeper mechanics/content implementation`

### L2. R3/R4 dependencies

Idle settlement should remain generic enough for broad Skill/subset/activity metadata, account-level idle-cap rules, equipment modifiers, and temporary Focus modifiers. Content registration should represent Skill, subset, tier, Activity Binding, equipment applicability/slot role, utility profile, activity profile, Region, Location, and content eligibility as data rather than proliferating specialized runtime modules.

---

## M. Explicit open questions

These remain intentionally undecided and should not be silently assigned final values:

- final world/game/studio names and domains;
- final broad Skill roster;
- number/names/themes/order of Regions 2+;
- exact Region/Location where each later subset unlocks;
- final Ascendant names/domains/benefits;
- exact equipment bonuses/set bonuses;
- preset free/paid capacities and pricing;
- free/progression/paid idle-cap values;
- Daily Focus charges, percentages, durations, and cooldowns;
- universal Fragment tier costs and Star Fragment acquisition rate;
- final card/pack rarity/tier economy;
- exact numerical profiles/tradeoffs for baseline and specialized subsets;
- final visual art style and production pipeline;
- final audio style, music scope, SFX production pipeline, and implementation technology;
- final mobile packaging technology and deployment infrastructure;
- marketing budget, creator partners, and paid acquisition thresholds.

Any newly accepted product/design decision from ongoing review must be added here (or to a more authoritative dedicated document and referenced here) and reflected in the living testing notes/coverage when it affects testable behavior, so it does not remain only in chat history.