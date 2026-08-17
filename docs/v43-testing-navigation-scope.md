# v43 full testing navigation shell

This build moves the prototype from decision-only reconciliation into interface and traversal testing. It intentionally exposes future systems in their intended locations before all mechanics, balancing values, backend persistence, and content tables are final.

The build is also required to preserve the accepted bug fixes and UI corrections from the first prototype test/regression pass. See `docs/v43-first-test-pass-baseline.md`. A new destination is not considered successful if adding it regresses an already-fixed behavior.

## Intended navigation now represented

- Home / Adventure Log: grouped entry points rather than legacy skill-by-skill naming.
- Activities: Combat as the overarching Skill; Gathering with Woodcutting/Mining/Fishing subsets; Sailing; Huntsmanship; Raids.
- Gathering test progression: one shared Gathering level/XP track, persistent subset mastery/progression for Woodcutting/Mining/Fishing, and current-Region participation with separate progression and completion thresholds. Legacy individual subset levels are compatibility mirrors only.
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

## First-pass behavior that is part of the baseline

The v43 test must retain the already-established fixes and polish for:

- bootstrap/navigation initialization and the consolidated top-level router;
- Greenwake/original-content load stability and save compatibility;
- corrected Combat/Activity grouping and authoritative render-source behavior;
- Sailing hierarchy/routing, live idle rewards and universal idle feedback;
- streamlined pack reveal behavior, differentiated pack visuals, `NEW` feedback, pack safety, and mobile result sizing/scrolling;
- corrected equipment layout, Bank/Collection search/filtering, loadout presets and build-version handling;
- unified imagery/card presentation where current prototype assets are still used;
- current service-worker/cache hygiene so testers actually receive the new shell.

`docs/v43-first-test-pass-baseline.md` is the explicit regression checklist for these items.

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

The v43 shell is a structure-fidelity testing layer over the current prototype. Gathering has been promoted to the intended parent-Skill model for this test pass, with its subsets using mastery/progression and Region participation rather than independent player-facing levels. Some other underlying mechanics and data remain legacy where replacing them is not necessary to test hierarchy/navigation (for example existing pack odds/content tables). Those legacy internals must not be presented as intended final design.
