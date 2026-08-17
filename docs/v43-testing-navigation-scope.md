# v43 full testing navigation shell

This build moves the prototype from decision-only reconciliation into interface and traversal testing. It intentionally exposes future systems in their intended locations before all mechanics, balancing values, backend persistence, and content tables are final.

## Intended navigation now represented

- Home / Adventure Log: grouped entry points rather than legacy skill-by-skill naming.
- Activities: Combat as the overarching Skill; Gathering with Woodcutting/Mining/Fishing subsets; Sailing; Huntsmanship; Raids.
- World & Exploration: Region overview, Locations, ordinary Exploration and Major Exploration placement.
- Region Packs: Region-specific pack family with increasing rarity-weight tiers, backed temporarily by the existing prototype odds engine.
- Codex: existing Collection tab is relabeled to Codex in the shell to reflect its collection-binder/player-record role.
- Bank / Loadouts / Forge: existing prototype interfaces remain available for continued testing.
- Raids: preparation checklist, assigned-style readiness concept, section Mastery and reward philosophy.
- Pets: Pet DLC / Pet Journal placement, naming, XP behavior and Collar → Harness/Body → Feet equipment slots.
- Ascendants: correct top-level system naming, replacing old Event / Divine Allegiance terminology in the future-facing IA.
- Community: Friends, Trading and Profile/Showcase placement.
- Settings / Options: pack confirmation, Reveal All Perfect behavior, return summaries, Region themes, notification categories, Community privacy, and permanent premium package placement.
- Notification Center: global utility access plus Settings controls.

## Deliberately not blocking this testing pass

The following can remain TBD while navigation and information architecture are tested:

- exact Pack Point costs and pack rarity tables by Region
- exact Perfect/Foil baseline chance
- final Skill/subset names beyond already locked naming
- exact activity XP/Pack Point/idle profile numbers
- Region progression thresholds and completion weights
- exact Exploration durations, event timers and active-assistance multipliers
- Raid Power thresholds, Mastery caps and reward rates
- Huntsmanship Special Creature odds and rare-drop tables
- Pet XP curves, milestones, DLC price and drop rates
- premium-package price and exact bonus loadout count
- trade value tolerance percentage and final economy values
- final cosmetic rewards, titles, icons and theme treatments

These should be balanced after the app can be traversed and tested with the intended system structure visible.

## Important implementation note

The v43 shell is primarily an interface/testing layer over the current prototype. Some underlying mechanics and data are still legacy (for example individual Woodcutting/Mining/Fishing levels and the existing pack odds tables). UI labels and placement are intentionally ahead of those data-model refactors so friends/family testing can provide feedback using the intended terminology and navigation.
