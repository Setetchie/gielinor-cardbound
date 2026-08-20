# Cardbound v45 Owner Test Feedback — 2026-08-19

## Test build

- **Visible version:** `Cardbound v45`
- **Build:** `2026-08-19.v45-owner-retest`
- **Published commit:** `3805b7c85942e0ee7751890d18433984a0005a36`
- **Tester URL:** `https://setetchie.github.io/gielinor-cardbound/`
- **Testing state:** `COMPLETE`
- **Completed:** 2026-08-20, by Setetchie's explicit instruction to push the discoveries and begin the next development phase.
- **Implementation rule:** The queue is frozen at `V45-OWNER-001`–`011`. Implement it only through a scoped implementation task with the required validation gates.

## Feedback queue

### V45-OWNER-001 — Home displays Gathering subsets as independent Skills

- **Reported:** 2026-08-19
- **Area:** Home / Skills hierarchy
- **Observation:** The Home page currently lists Woodcutting, Mining, and Fishing as Skills instead of listing Gathering as the parent Skill.
- **Required behavior:** Home should display Gathering as the Skill. Opening Gathering should reveal Woodcutting, Mining, and Fishing as its subsets/masteries. The Home summary must not present those Gathering subsets as independent Skills.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-002 — Combat masteries incorrectly link to separate activity lists

- **Reported:** 2026-08-19
- **Area:** Activities / Combat hierarchy
- **Observation:** Melee, Ranged, and Magic are currently presented as links to Combat activities.
- **Required behavior:** The Combat screen should display the overall Combat level/XP and the Melee, Ranged, and Magic mastery values, but those mastery entries must not open separate activity lists. Players select a Combat encounter/activity; the equipped weapon or active loadout determines whether the action uses Melee, Ranged, or Magic and which mastery progresses/applies.
- **Decision alignment:** Reinforces `COMBAT-002` in `docs/DECISION_LEDGER.md`.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-003 — Activity context controls scroll away

- **Reported:** 2026-08-19
- **Area:** Activity detail screens / sticky interface hierarchy
- **Observation:** The Back-to-menu control and overall parent-Skill information can scroll out of view on Activity screens.
- **Required behavior:** Every Activity detail/list screen should keep a compact contextual header persistently visible directly beneath the always-on-top app information and primary navigation. This contextual header must contain the appropriate Back-to-menu/parent control plus the overall parent-Skill level, current XP, and next-level XP. Activity rows scroll beneath it.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-004 — Active Bonuses expansion state and Combat summary

- **Reported:** 2026-08-19
- **Area:** Idle Activity bar / bonus presentation
- **Observation:** The Active Bonuses section does not remain expanded through idle action completions/transitions, and Combat presents ordinary equipment contributions too granularly.
- **Required behavior:** Persist the Active Bonuses expanded/collapsed state across idle cycles, re-renders, and transitions between idle activities. For Combat, show overall Power as the default aggregate bonus rather than repeating ordinary equipment Power line by line. List a separate bonus only when an item, Pet, Pet Equipment piece, effect, or condition provides a distinct bonus that cannot be represented by overall Power.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-005 — World map lacks free two-dimensional dragging

- **Reported:** 2026-08-19
- **Area:** World map / mobile interaction
- **Observation:** The map can currently be scrolled only along one axis at a time—left/right or up/down.
- **Required behavior:** The map canvas must support natural free panning with touch or pointer dragging in any direction, including diagonal movement. Movement should track the gesture simultaneously on both axes and remain bounded to the map canvas without dragging the surrounding page.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-006 — World map visual structure reference

- **Reported:** 2026-08-19
- **Area:** World map / visual design
- **Reference image:** `C:/Studio_Dev/.codex-remote-attachments/01a017f7-bdd4-7481-904a-d0df9a6879fd/deb512da-4638-4ae9-8cc6-148404d74fff/1-Photo-1.jpg`
- **Observation:** The current map does not resemble the desired expandable exploration-map presentation.
- **Required direction:** Use the supplied image as a layout/interaction reference: a large freely pannable map canvas, an obvious current location, connected neighboring location cells/nodes, progressive outward expansion, compact map controls, zoom in/out, and recentering. Cardbound should use its own original visual language and authored terrain rather than copying the reference application's assets.
- **Fog-of-war adaptation:** Preserve Cardbound's three states across the connected map: undiscovered locations/terrain under dense opaque clouds; discovered but unexplored areas visible through translucent clouds with location names hidden; explored areas fully revealed with their names and available connections/actions visible.
- **Relationship:** Extends `V45-OWNER-005`; free diagonal touch/pointer dragging remains required.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-007 — World needs Map and Location Exploration submenu

- **Reported:** 2026-08-19
- **Area:** World / navigation hierarchy
- **Observation:** World currently lacks a distinct submenu for its two primary functions.
- **Required behavior:** Add a World submenu with at least `Map` and `Location Exploration`. `Map` opens the freely pannable fog-of-war world map and should be the default World view. `Location Exploration` opens the available/discovered location-exploration list and its detail/start flow. Players must be able to switch between these views directly without navigating through a map node first.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-008 — Pack rarity frame is applied to the card back instead of each revealed card

- **Reported:** 2026-08-19
- **Area:** Packs / card reveal presentation
- **Observation:** The opening sequence applies rarity-colored edging to the initial card-back presentation rather than correctly styling each specific revealed card.
- **Required behavior:** Keep the unrevealed pack/card-back state visually neutral. Once a card turns or reveals, apply the rarity color to that individual card's front frame based on that card's own rarity. Every result in a multi-card pack must independently receive its correct frame; the first card/back must not supply or propagate one rarity color to the other results.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-009 — Codex ownership counters belong in the top corners

- **Reported:** 2026-08-19
- **Area:** Codex / Card Collection tiles
- **Observation:** Standard and Perfect/Foil ownership counts currently appear in the bottom corners of each card tile.
- **Required behavior:** Place the standard-card ownership count in the top-left corner and the Perfect/Foil ownership count in the top-right corner. Preserve the standard white treatment and distinct rainbow/premium treatment while keeping both counters legible over card artwork.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-010 — Forge currency model is incomplete and unclear

- **Reported:** 2026-08-19
- **Area:** Forge / duplicate currencies
- **Observation:** The Forge does not clearly implement the intended universal Fragment model, omits Pristine Fragments for Foil/Perfect cards, and does not explain or expose how Star Fragments are used while Forging.
- **Required behavior:** Normal-card duplicate conversion produces one universal `Fragments` currency rather than rarity-specific Fragment types. Foil/Perfect duplicate conversion must use the distinct `Pristine Fragments` currency. The Forge must display both balances where relevant and provide clear Star Fragment usage information and controls within the Forging flow, including what selecting a Star Fragment changes before the player confirms.
- **Balance boundary:** Exact duplicate-conversion yields, Forge costs, Star Fragment costs, and odds/effects remain `BALANCE` unless already resolved by an authoritative current decision. Do not invent values during corrective implementation.
- **Reconciliation required:** Reconcile this explicit owner terminology with any older `Prismatic Essence` references in the ledger/design documents when the test batch is implemented; this newer report is the intended player-facing direction but should be durably updated through the decision process rather than silently leaving conflicting terms.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

### V45-OWNER-011 — Trade requests do not expose their offer contents

- **Reported:** 2026-08-19
- **Area:** Community / Trading / Requests
- **Observation:** Trade entries appear without their card contents and cannot be selected to inspect the offer.
- **Required behavior:** Every incoming and outgoing trade request must display a useful summary and be selectable/expandable into a trade-detail view. The detail must identify the other player, request direction and status, the exact cards/quantities/variants the player gives, and the exact cards/quantities/variants the player receives. Incoming Accept/Reject/Counter controls and outgoing awaiting-response information belong with this inspected offer so the player can review the contents before acting.
- **Status:** `FROZEN FOR IMPLEMENTATION`.

## Frozen batch

- **Range:** `V45-OWNER-001`–`011`
- **State:** `FROZEN FOR IMPLEMENTATION`
- **Owner declaration:** On 2026-08-20, Setetchie declared the testing pass complete and instructed the team to push these discoveries and begin work on the main application content, including original naming, themes, design, and images.
- **Boundary:** Freezing this queue authorizes the next scoped planning/implementation phase. It does not by itself authorize merging, publishing a new tester build, inventing unresolved balance values, or silently choosing unresolved original-content scope.
