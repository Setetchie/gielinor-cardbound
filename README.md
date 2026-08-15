# Cardbound

Mobile-first collectible fantasy progression game prototype transitioning to a fully original commercial IP.

The playable prototype is served directly from `index.html` and stores progress locally in the browser via the existing `localStorage.cardbound` save object. The current playable content still contains legacy RuneScape/OSRS-derived prototype material; that material is development-only and is being systematically replaced before any commercial/public-store release.

## Original IP direction

- `docs/WORLD_BIBLE.md` — creative source of truth for the original Cardbound universe and Binding/Codex fiction.
- `docs/IP_CONVERSION_ROADMAP.md` — production plan for replacing legacy names, content, assets, encounters, and branding.
- **Cardbound is a working title until trademark/name clearance is completed.**
- No commercial build may ship with third-party game assets or player-facing legacy IP.

## Current systems
- Tiered booster packs, rarity rolls, foil cards, and new-card reveals
- Equipment bank, worn-equipment layout, and saved loadout presets
- Melee, Ranged, Magic, specialized monster-hunting, Woodcutting, Mining, Fishing, and Sailing prototype progression
- Live idle progress, per-cycle point/XP feedback, and next-activity ETA
- Duplicate shredding, rarity fragments, and foil fragments
- Searchable/filterable collection with missing-card and pack-odds views
- Allegiance event system
- Multi-encounter endgame and encounter-card requirements
- Mobile-first PWA with service-worker update handling

## Active runtime module order
`index.html` is the source of truth for the production script order. Do not re-add removed historical Sailing/build override files.

### Foundation
1. `app.js` — base cards, save state, packs, bank primitives, activities, rendering primitives
2. `upgrade.js` — expanded UI/content foundations
3. `progression-v2.js` — requirements, activity progression, HP and sprite metadata
4. `content-expansion.js` — expanded equipment/monster/skilling prototype content
5. `combat-styles.js` — Melee/Ranged/Magic progression and combat-style rewards
6. `combat-menu-fix.js` — combat-style activity navigation
7. `image-fix.js` — prototype image resolution; must be replaced before commercial build
8. `pack-flow.js` — pack opening interaction
9. `ui-v11.js` — retained UI behavior still required by current build

### Collection / foil systems
10. `collection-odds-slayer.js`
11. `foils.js`
12. `foil-fragments.js`
13. `new-card-overlay.js`

### Content systems
14. `sailing-content.js` — Sailing cards, facilities, requirements, actions
15. `gods-raids-v20.js` — legacy allegiance/endgame prototype data pending original-IP conversion
16. `tzhaar-expansion-v22.js` — legacy challenge encounter prototype data pending original-IP conversion

### Current UI owners
17. `core-ui-fix.js` — primary page shell plus authoritative Activity, combat, Skilling, and Sailing navigation/rendering
18. `bank-collection-v18.js` — Bank, worn equipment, Collection search/filter UI
19. `gods-raids-ui-v20.js` — legacy event/endgame UI pending terminology/content conversion
20. `activity-filters-v21.js` — long-list activity filters
21. `home-groups-v23.js` — grouped Home combat/skilling dashboard
22. `sailing-idle-v34.js` — generalized live idle settlement, feedback, and next-unlock ETA
23. `loadout-presets-v38.js` — saved equipment presets; consumes global build metadata instead of owning it

## Cleanup rules
- Preserve the existing `localStorage.cardbound` save schema unless a migration is explicitly added.
- Do not create another versioned file that wraps `render()` if the behavior belongs in an existing authoritative module.
- Prefer editing the current owner module listed above instead of adding another override layer.
- Do not create separate Sailing navigation state outside `cbCoreUi.skill = 'Sailing'`.
- Keep only one live idle timer/settlement layer.
- Every production build must update the visible version stamp and service-worker cache key.
- New content must follow the original-IP World Bible rather than add new third-party-derived material.

## Refactor plan
The cleanup phase is merging active render wrappers by responsibility while preserving current behavior:
1. ✅ Consolidate Activity + Sailing navigation/rendering into `core-ui-fix.js`.
2. **Next:** Consolidate Home/Bank/Collection page routing into a single UI router.
3. Consolidate idle settlement/progress into one gameplay module.
4. Consolidate content registration into data-focused modules.
5. Generate the complete IP conversion ledger.
6. Begin the original-content vertical slice.
7. Only then add major new combat mechanics/features.

## Commercial-release rule

The current legacy prototype is **not** the commercial build. Before store submission, the project must pass the release gates in `docs/IP_CONVERSION_ROADMAP.md`, including a clean automated IP audit, original asset provenance, final brand clearance, and physical-device testing.
