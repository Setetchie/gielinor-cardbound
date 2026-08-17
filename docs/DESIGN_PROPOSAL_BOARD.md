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

Target hierarchy for non-combat activities: `Skill → Subset → Activity`.

The parent Skill owns the shared Skill level/XP progression. Subsets do **not** have independent player-facing Skill levels; each subset instead has its own persistent mastery/progression and Region-specific participation where applicable.

Gathering contains subsets such as Woodcutting, Mining, Fishing, and later appropriate gathering specializations. Other broad Skills may gain additional subsets as Regions/Locations are discovered.

Combat is a deliberate exception to player-selected family/style navigation. Combat is one broad Skill/category, and the player selects the enemy or encounter rather than selecting Melee, Ranged, or Magic as an activity subset. Target flow: `Activities → Combat → Enemy / Encounter → Start Combat`. Equipped weapon/loadout determines active combat style automatically.

### A2. Region-driven subset discovery — LOCKED / ACCEPTED

Do not unlock every subset in the starting Region. Later Regions/Locations should introduce genuinely new ways to use an existing broad Skill.

The **first subset in each Skill is the baseline/generalist subset**. It should provide a useful, reasonably balanced mix of the Skill's major reward profiles. For Gathering, Woodcutting is the working baseline example: before Mining or other Gathering subsets are discovered, Woodcutting provides a balanced mix of Gathering XP, Pack Points, and Idle Efficiency.

Later Regions/Locations unlock new subsets that create specialized profiles. A specialized subset improves meaningfully on one profile while giving up relative performance in one or more others. A Mountain Region may unlock Mining, whose activities can offer stronger Gathering XP than comparable Woodcutting activities while sacrificing Pack Points and/or Idle Efficiency.

Specialized subsets are horizontal strategic options, not universal upgrades. A later subset must not simply become better than the baseline in every major profile. Later Regions may both add higher-tier activities to existing subsets and introduce a new subset/profile.

### A3. Subset profile communication — LOCKED / ACCEPTED

Do **not** explicitly label subsets with mechanical profile names such as `Pack Point Profile`, `XP Profile`, or `Idle Profile`. Players should learn each subset's strategic profile from actual activity values and comparisons.

Do not add explanatory subset descriptions merely stating that a subset provides parent-Skill XP, is a baseline/generalist/specialized profile, offers linear upgrade activities, or otherwise narrates relationships that are obvious from the activity data. Reserve descriptive copy for meaningful lore/flavor or mechanics that cannot reasonably be inferred from the interface.

### A4. Subset mastery as navigation — LOCKED / ACCEPTED

Do not add a redundant intermediate menu whose only purpose is selecting a subset after the player has already opened its parent Skill. The parent Skill page shows each unlocked subset as an interactive mastery/progression row or bar. That row communicates subset identity and progression and is itself the link to that subset's activities. Use a clear interaction affordance such as a chevron.

Example: `Activities → Gathering → Woodcutting mastery row → Woodcutting Activities`. The activity page returns directly to the parent Skill with `← Back to Gathering`.

### A5. Standard activity information contract — LOCKED / ACCEPTED

Every normal comparable activity row/card should use the same core information hierarchy so players can compare activities without learning different layouts.

Mandatory baseline fields where applicable:

- **Activity name** — e.g. Iron Ore;
- **Level requirement** — using the parent Skill requirement;
- **Requirement state / lock reason** — clearly state `Requirement not met`, `Binding not obtained`, or each relevant blocker when multiple requirements are unmet;
- **Parent-Skill XP per action**;
- **Pack Points per action**;
- **Idle Efficiency**;
- **Time per action**.

XP shown on subset activities is the parent Skill's XP (e.g. Gathering XP), not separate Woodcutting/Mining/Fishing Skill XP. Subset progression remains Mastery/Regional Participation.

The same information order should be used across comparable subsets so the reward-profile tradeoffs are immediately visible. Avoid long descriptions explaining that activities award parent-Skill XP or progress linearly; the activity values, requirements, and progression UI should communicate that directly.

---

## B. World structure

### B1. Geography hierarchy — LOCKED / ACCEPTED

Use `World → Region → Location → optional Point of Interest`. Region is the major progression/theme chapter. Location is the player-facing term for named places inside a Region. Points of Interest are optional story/discovery details and should not become another mandatory navigation tier.

### B2. Role of Locations — LOCKED / ACCEPTED

Locations must have gameplay value beyond scenery. Repeatable activity navigation remains Skill-first. The World interface answers “what is here?” and supports geography, discovery, lore, regional completion, and backtracking opportunities.

### B3. Exploration reveal and Location discovery — LOCKED / ACCEPTED

Progress toward a Region's final Major Exploration must naturally reveal the remaining core Exploration paths, even if the player does not complete those paths before pursuing the Major Exploration. At/around the frontier reveal, the complete core Exploration structure becomes transparent enough for authoritative core Region completion information. All core paths are revealed, but unvisited destination Location identities can remain unknown.

### B4. Location reveal presentation — LOCKED / ACCEPTED

Completing an Exploration that discovers a Location triggers a dedicated, concise Location reveal rather than only a toast. It may show Location name, artwork/environment, short flavor text, and discovered content, but should not become an eligibility/requirements audit. Players traverse the appropriate gameplay menus afterward to determine individual requirements.

Newly revealed content receives a temporary `NEW` indicator in its normal system menu and the indicator clears when the player views it.

### B5. Exploration preview placement — LOCKED / ACCEPTED

An Exploration preview belongs **inside the selected Exploration**, not above/before the Location or Exploration-choice list. The player first chooses a specific Exploration, then sees that Exploration's preview/details such as environmental destination hint where appropriate, duration, checkpoints, requirements, allowed pre-start information, and Start Exploration action.

---

## C. Equipment and loadouts

### C1. Universal activity equipment — LOCKED / ACCEPTED

Equipment is not Combat-only. Major Skills/subsets can have collectible equipment appropriate to their activities. Equipment can affect XP, Pack Points, regional weighting, idle characteristics, activity profiles, subset efficiency, and specialization effects.

### C2. Equipment slots — LOCKED / ACCEPTED DIRECTION

Final current slot set for the test structure: **Head, Body, Legs, Main Hand, Off Hand, Boots, Jewelry, Cape/Back**. **Gloves are removed.** Main Hand may be one- or two-handed; a two-handed item occupies/disables Off Hand.

### C3. Per-Skill equipped loadouts — LOCKED / ACCEPTED

Each broad Skill maintains its own currently equipped loadout. Subsets do not require separate mandatory equipped inventories. Changing subset/activity does not auto-equip gear.

### C4. Saved presets — LOCKED / ACCEPTED

The Loadouts overview should be compact. Each saved loadout shows only its **player-given name** and **tag**. Selecting it opens a dedicated loadout detail/edit screen where the equipment configuration, name, tag, and other established loadout-management actions can be inspected/edited. Do not dump every item/bonus onto the loadout overview.

### C5. Equipment presentation — LOCKED / ACCEPTED DIRECTION

The equipped-gear screen is player-centered: a lightweight player model/avatar sits in the center and the approved gear slots surround it. Do not add extra conventional RPG slots merely to fill space.

The **equipped Pet** has a separate visible position near the player model. It is not a normal equipment slot. Tapping the Pet area navigates to the Pets interface, where the active Pet and Pet gear are managed.

---

## D. UI/UX and navigation

### D1. Single persistent primary navigation bar — LOCKED / ACCEPTED

Use **one persistent horizontally scrollable primary navigation bar**, rather than splitting primary destinations between an upper and lower navigation bar. Preserve the useful behavior of the current upper bar: players can swipe/scroll horizontally to reach additional destinations without wrapping into another navigation row.

The primary navigation bar must remain visible and functional on **every top-level destination**. Opening Bank, Codex, Packs, World, Activities, Pets, Settings, or any other top-level page must never remove, replace, hide, or structurally change the primary menu bar. The current behavior where entering Bank can make the menu bar disappear is a **BUG** and must be regression-tested.

### D2. Drill-down page order — LOCKED / ACCEPTED

Use: `Back navigation → Current Skill/subset information → filters/sorts/controls → content`. The Back control must be at the top of the page, before Skill information, and clearly state its destination.

### D3. Filters/sorts must explain themselves — LOCKED / ACCEPTED

Every filter, sort, toggle, and view control across Bank, Codex/Card Collection, Activities, Packs, equipment, Pets, World/Exploration, Huntsmanship, Raids, Trading, Stats, and future menus must communicate what it does without requiring experimentation. Sorting direction must be explicit, e.g. `XP — Highest to Lowest` rather than an unexplained symbol alone.

### D4. Available/Locked status semantics — LOCKED / ACCEPTED

- **All** = all currently revealed content in that menu.
- **Available** = revealed content for which all requirements are satisfied and which can be used/started now.
- **Locked** = revealed content that cannot currently be used because one or more requirements are unmet, including an unowned required Binding or an unmet level/mastery/Region/equipment prerequisite.

Locked does not include genuinely undiscovered/hidden content. Locked item details must state why the item is locked.

### D5. Activity loadout selection — LOCKED / ACCEPTED DIRECTION

Activity selection should expose the currently equipped loadout and let the player deliberately choose/apply a saved preset before starting. Changing activity does not automatically change equipment.

### D6. Routine activity-completion pop-ups — LOCKED / ACCEPTED

Routine timed **activity completion/reward notifications** are a lightweight auto-dismiss UI class, separate from important modal summaries.

When an activity action completes and shows what was received, the notification must:

- render at the **top of the visible viewport**, independent of the player's current scroll position;
- overlay all menus/page content, including the persistent primary navigation bar, so it is never hidden below content and never requires scrolling to see;
- summarize the rewards received from that completed action;
- **automatically disappear after a short readable period** without requiring a Continue/Dismiss action;
- avoid moving the underlying page or changing the player's scroll position;
- queue or aggregate cleanly if several routine activity notifications resolve close together rather than stacking into an unreadable pile.

Important summaries/events such as Welcome Back/offline-idle settlement, major discoveries, and other significant summaries are a different UI class and may require manual dismissal.

### D7. Avoid narrating obvious interface behavior — LOCKED / ACCEPTED

Across Skill/subset/activity screens, prefer showing decision-relevant data over explanatory prose that merely restates what the UI already demonstrates.

### D8. Active idle-status information — LOCKED / ACCEPTED

While a normal repeating activity is idling, do **not** show a `Next Activity` field. The player already knows the same activity repeats.

The active idle panel should instead show, where applicable:

- XP per action;
- Pack Points per action;
- effective XP per hour;
- effective Pack Points per hour;
- Time per action;
- a live current-action progress bar/timer that fills/resets per action.

Hourly figures should reflect the player's current effective setup/modifiers rather than only raw base values.

---

## E. Codex, collection, and account record

### E1. Codex role — LOCKED / ACCEPTED

The Codex is the player's permanent record/encyclopedia, not merely a renamed Collection screen. The Codex landing page presents high-level summaries and links to at least **Stats** and **Card Collection**. Selecting either opens its own deeper space.

### E2. Codex vs Bank — LOCKED / ACCEPTED

`Codex → Card Collection` answers: What cards have I discovered and how complete is my permanent collection? `Bank` answers: What copies/items do I currently possess and can actually manage/use?

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

Currency does not bypass content progression. Forge UI should distinguish eligible + unowned, already owned, and locked/ineligible with a clear reason.

---

## G. Monetization

### G1. Core monetization principle — LOCKED / ACCEPTED

Monetization may reduce friction or expand convenience; it should not purchase superior progression efficiency. Do not sell exclusive core activities, stronger cards, improved pack rarity odds, inaccessible equipment power, or direct account-wide progression-rate superiority.

### G2. Permanent idle/offline capacity — LOCKED / ACCEPTED DIRECTION

A permanent account convenience upgrade may extend maximum offline accumulation duration. Paid idle capacity changes the cap, not the reward rate for an equivalent period. Exact values remain balance tasks.

### G3. Account Upgrade packaging — LOCKED / ACCEPTED DIRECTION

Potential package may include longer offline accumulation capacity, additional saved-loadout capacity, ad-free Daily Focus access, and appropriate cosmetic/profile conveniences later.

### G4. Rewarded ads / Daily Focus — LOCKED / ACCEPTED DIRECTION

If advertising is used, prioritize optional rewarded ads, not forced interstitials or persistent banners. Preferred system: limited Daily Focus activations such as XP Focus, Pack Point Focus, Regional Focus, and Idle Focus, with exact values remaining open. Do not use ads to improve pack rarity odds or gate exclusive power/content.

---

## H. Packs, Raids, and progression-browser presentation

### H1. Reveal intensity — LOCKED / ACCEPTED DIRECTION

Common vs Uncommon should have minimal reveal differentiation beyond readable rarity text/frame treatment. High-tier cards may have increasingly notable reveal differences. Perfect/Foil cards receive the strongest reveal treatment.

### H2. Pack/card regional presentation — LOCKED / ACCEPTED

Pack icons and card identities remain tied to their pack tier/type and card identity. Regional unlocks primarily alter surrounding/background presentation rather than replacing universal object grammar.

### H3. Pack-selection information — LOCKED / ACCEPTED

Pack-selection cards should be concise. Each pack should show:

- Pack name;
- Pack cost;
- number of cards obtained;
- its rarity advantage in plain language, such as `Higher chance of Rare cards` or `Higher chance of Legendary cards`;
- the corresponding probability/percentage difference so players can see how much the chance changes, preserving the useful comparative clarity from the initial prototype pack presentation.

Do not clutter the pack-selection card with unrelated underlying mechanics.

### H4. Raid browser and requirement drill-down — LOCKED / ACCEPTED

The main Raids screen should show **specific Raids** with their Raid name, originating Region, Raid Tier, and player progress/completion status. Region and Tier together communicate world origin and broader progression/difficulty placement.

Selecting a Raid opens its dedicated detail screen. That screen shows the full Raid requirements and evaluates them against the player's current state with clear satisfied/not-satisfied indications, similar to the useful earlier Raids/Inferno requirement presentation. Revealed but ineligible Raids may appear Locked; undiscovered Raids follow their discovery rules rather than simply appearing as Locked.

---

## I. Testing and review continuity

### I1. Previous test fixes are mandatory baseline — LOCKED / ACCEPTED

Future test builds must preserve the accepted first-pass fixes and UI behavior documented in `v43-first-test-pass-baseline.md`. New structure work is additive; reintroducing an already-fixed first-pass issue is a regression.

### I2. v43 decision/interface coverage is a living test contract — LOCKED / ACCEPTED

`v43-decision-interface-coverage.md` and `v43-testing-navigation-scope.md` are living testing references. Future accepted structural/UI decisions must be added to the board and reflected in appropriate testing notes/coverage rather than remaining only in chat history.

### I3. Current manual UX test priorities — LOCKED / ACCEPTED

Current/next hands-on passes should explicitly evaluate the single persistent scrollable navigation bar (including Bank persistence), Back-control placement, parent Skill → subset mastery-row navigation, concise subset/activity presentation, the standard activity information contract, active idle-status information, activity-completion notification placement/auto-dismiss behavior, filter/sort explanations, Locked/Available semantics, Codex → Stats/Card Collection, World/Exploration preview placement, player-centered equipment + Pet link, compact Loadouts, Packs, Raid progression/requirements, social/trading/showcase flows, mobile ergonomics, screen density, unnecessary tap depth, idle-return behavior, and preservation of prior regression fixes.

### I4. Automated regression baseline — CURRENT VERIFIED STATE

The v43 structure-fidelity build passed the expanded **1,400-execution regression gate** before being merged to `main`. Future UI changes should extend/update tests where intended navigation changes make old assertions stale while preserving behavioral coverage.

### I5. Automatic review-note capture — LOCKED / ACCEPTED PROCESS

During the ongoing product-owner/manual UI review, newly accepted decisions, clarified behavior, and identified bugs should be **added to this Design Proposal Board automatically as they are agreed**, without requiring a separate reminder from the product owner. When a note affects testable behavior, it must also be carried into the living testing scope/coverage in the next implementation/test update. Chat history is not the authoritative storage location for accepted review findings.

### I6. Dummy Friend / social fixture for next test — LOCKED / ACCEPTED TEST REQUIREMENT

The next test build should include at least one clearly identified **dummy Friend/test account** with deterministic behavior and controlled inventory so the social systems can be exercised without a second real account.

The fixture must support testing:

- outgoing Friend Request to the dummy;
- incoming Friend Request from the dummy;
- accepting/rejecting Friend Requests;
- initiating trades in both relevant directions;
- accepted trades;
- rejected trades;
- multiple pending/concurrent offers without one overwriting another;
- counteroffers;
- countering a counteroffer;
- offer timeout/expiration and resulting non-actionable state;
- confirmation/state reset when terms change;
- persistence of Friend/trade state across navigation/reload where appropriate;
- controlled duplicate/card inventory sufficient to exercise actual trade eligibility, last-copy protection, rarity/value restrictions, and other established safeguards;
- **Showcase testing in both directions**: the player can view the dummy account's configured Showcase, and the dummy fixture can simulate viewing the player's currently selected Showcase so player-side Showcase configuration/visibility can be verified.

The dummy account is test infrastructure, not final player/content data.

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
- exact auto-dismiss duration/animation for routine activity-completion notifications;
- final visual art style and production pipeline;
- final audio style, music scope, SFX production pipeline, and implementation technology;
- final mobile packaging technology and deployment infrastructure;
- marketing budget, creator partners, and paid acquisition thresholds.

Any newly accepted product/design decision from ongoing review must be added here (or to a more authoritative dedicated document and referenced here) and reflected in the living testing notes/coverage when it affects testable behavior, so it does not remain only in chat history.