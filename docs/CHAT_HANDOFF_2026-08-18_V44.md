# Cardbound New-Chat Handoff — v44

**Handoff date:** 2026-08-18

**Repository:** `Setetchie/gielinor-cardbound`

**Active work:** PR #5 — `v44 consolidated UX and systems test pass`

**Branch:** `agent/v44-ux-test-pass`

## Start here

This file is the continuity document for the next ChatGPT conversation. Do not reconstruct the project from memory alone. Read the authoritative/supplemental boards in this order:

1. `docs/DESIGN_PROPOSAL_BOARD.md`
2. `docs/V44_REVIEW_DECISIONS_AND_STAGE_BOARD.md`
3. `docs/v43-first-test-pass-baseline.md`
4. `docs/v43-decision-interface-coverage.md`
5. `docs/v43-testing-navigation-scope.md`
6. `docs/TESTING_RELEASE_MARKETING_ROADMAP.md`
7. `docs/ARCHITECTURE_DECISIONS.md`
8. `docs/TRADING_SYSTEM.md`
9. `docs/WORLD_BIBLE.md`

The v44 review board is an authoritative extension of the main Design Proposal Board for decisions accepted during the latest hands-on review.

## Product direction that must not be lost

Cardbound is an original idle TCG/mobile-app project built around broad Skills, subset mastery, repeatable Activities, card collection, equipment, Regions/Locations, progression gates/Bindings, packs, Forge/Shredding, social/friends/trading/Showcase, Pets, Huntsmanship, Raids, Ascendants, and future expansion content. The current prototype still contains legacy placeholder material that must ultimately be replaced through original-IP/world/visual/audio work.

The current phase is **not** final content balancing. It is a deeper interface/navigation/system test pass so accepted structures can be exercised before later content production.

## Key latest accepted decisions

- One persistent horizontally scrollable primary navigation bar across all top-level pages.
- Codex contains high-level Stats + Card Collection entry points; each drills into deeper views.
- Every filter/sort must explain its function.
- Back control appears at the top of drill-down pages.
- Subset mastery rows are the links to activities; no redundant subset menu.
- Subsets have mastery, not separate permanent Skill levels.
- First subset is baseline/generalist; later Region-discovered subsets specialize by improving one reward profile while sacrificing others.
- Activity cards use consistent requirement/XP/Pack Points/Idle Efficiency/time information.
- Idle panel shows per-action and per-hour values plus current-action progress; no `Next Activity` for a repeating idle action.
- Routine activity reward popups appear at the top of the viewport over all UI and auto-dismiss; important summaries may require dismissal.
- Exploration preview belongs inside the selected Exploration.
- Equipment slots: Head, Body, Legs, Main Hand, Off Hand, Boots, Jewelry, Cape/Back; no Gloves.
- Player-centered equipped-gear view with Pet position/link.
- Bank gear tap → info + equip current/specific loadout; equipped gear tap → info + Unequip.
- Loadout overview shows name + tag; detail handles edit/equipment and has Equip action.
- Collection uses compact/icon-forward cards; tap for details/pull rates; show Standard/Foil counts and Foil treatment.
- Collection keeps filtering and Shredding.
- Universal normal Fragments; Prismatic Essence for Foil duplicate economy; Star Fragment for targeted forge.
- Forge reveal uses card-back → tap reveal presentation; random forge does not need extra dramatic rarity reveal.
- Pack cards show cost, cards obtained, rarity advantage, and comparative percentages.
- Raid browser shows specific Raid, Region, Tier, progress; detail evaluates requirements against current player state.
- Include deterministic dummy Friend for Friend Request, trading accept/reject/multiple offers/counters/counter-counter/timeout, and two-way Showcase testing.
- Include Huntsmanship test creatures for Tracking → Stalking → Hunt and Special Hunts.
- Include Dev/Test Grant All Bindings plus reset path.
- Include a very-common test Pet acquisition and Pet-specific equipment/bonuses.
- Include test Ascendant system and prototype minigame.
- Notification bell is the asynchronous notification inbox with unread/read, badge, details/deep-links, multiple notifications, and persistence.
- Settings audit: every visible control works, is clearly test-only, or is visibly disabled/not implemented; no silent dead toggles.
- Add Store top-level menu with `$0/Test` purchases for Pet Expansion, Star Fragment, Premium Upgrade, and Daily Focus/rewarded-ad simulation.
- Purchase-gated content remains discoverable but grayed/disabled before purchase, explains the required purchase, and deep-links directly to the relevant Store product. Return from purchase should unlock immediately without restart.

## Mandatory testing rule for all future runs

**This is now the standard gate and supersedes the previous repeat-first workflow:**

1. Fix/implement changes.
2. Run **one complete full test pass (1×)**.
3. Continue to **50× repetition/stress testing only if the 1× pass is completely green**.
4. If any 1× test fails, stop, fix it, and rerun a fresh 1× pass.
5. Do not weaken assertions to force green. Update stale tests only when accepted behavior intentionally changed, while preserving equivalent coverage.

## Current engineering status

The playable testing app remains hosted through GitHub for Setetchie and future external testers. ChatGPT ↔ Codex handoffs use the shared local directory, but tester-build updates require an explicitly authorized GitHub publication/deployment task with the hosted URL, pushed commit, visible build/version, deployment result, and phone-access verification recorded.

PR #5 remains **unmerged**.

Latest inspected workflow: **Cardbound Regression run #74 / run ID `32073559950`**.

Passed shards:
- `greenwake-ip`
- `greenwake-content`
- `prototype-integrity`
- `ip-inventory`
- `prototype-progression`

Failed shards:
- `prototype-core`
- `v44-ux`
- `greenwake-progression`
- `greenwake-terminology`
- `prototype-ui`

Cancelled:
- `v43-structure`

Overall 1,500-execution acceptance gate: **FAILED**.

No corrective patch after that failure should be assumed complete. No corrected 1× validation has been completed yet.

## Explicit stop point from previous chat

The product owner asked to **stop the current actions** and move to a new chat. Therefore:

- Do not assume the prior attempted CI diagnosis finished.
- Do not assume the five failures were patched.
- Do not rerun 50× first.
- Do not merge PR #5 yet.

## Next action in the new chat

Inspect the shared checkout at `C:\Studio_Dev\gielinor-cardbound` and its local coordination mailbox first. Query GitHub only for current PR #5 or workflow/CI state that is not available locally, then inspect the raw logs for the five failed run #74 jobs. Identify the first actionable failure/root cause in each. Patch the real regressions and update only stale assertions that conflict with accepted v44 behavior. Then run the mandatory **1× full pass**. Only after that is 100% green should the 50× validation run begin.

## Stage/progress snapshot

- Earlier architecture/structure work: completed through the v43 stable baseline.
- Product-owner UI/UX review: extensive decisions captured; v44 consolidated implementation started.
- v44 consolidated implementation: present on PR #5 but **not accepted as stable yet**.
- v44 automated validation: failed run #74; corrective cycle pending.
- v44 hands-on testing: blocked until a corrected build passes the required gates and is promoted.
- Friends & Family Alpha: not started; remains after the approved/stable UI/UX pass.
- R3/R4 deeper progression/world architecture: later stage.
- World/Visual/Audio Bible and final original identity work: later milestone before mass original-content production.
- Original vertical slice, Closed Alpha, native packaging, platform closed testing, beta/soft launch, full launch: future stages per roadmap.

## Process rule

New accepted decisions and bugs discovered during hands-on review must be captured automatically in the Design Proposal Board or its current authoritative extension and reflected in testing coverage when testable. Chat history is not the source of truth.
