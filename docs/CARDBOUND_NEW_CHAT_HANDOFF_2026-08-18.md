# Cardbound — New Chat Handoff & Progress Checkpoint

**Checkpoint date:** 2026-08-18  
**Repository:** `Setetchie/gielinor-cardbound`  
**Active work:** PR #5 — `v44 consolidated UX and systems test pass`  
**Branch:** `agent/v44-ux-test-pass`  
**Purpose:** Start a fresh ChatGPT conversation without losing accepted design decisions, test-review decisions, stage progress, or the current CI state.

## New-chat instruction

Upload or reference this file in the new chat and say:

> Continue Cardbound development from this handoff. First inspect PR #5, the current Design Proposal Board, v44 UX Test Contract, Architecture Decisions, Trading System, World Bible, and Testing/Release/Marketing Roadmap in the connected GitHub repository. Do not assume CI is green. Preserve the testing rule that every future validation cycle must pass one complete 1× test pass before any 50× repetition/stress pass is allowed.

The GitHub repository is authoritative for current code. This handoff is a checkpoint and index to the authoritative boards/documents.

---

# 1. Authoritative boards / documents

Do not recreate these from memory when the repository is available. Read them before making design or implementation changes.

- `docs/DESIGN_PROPOSAL_BOARD.md` — active source of truth for accepted design directions, review proposals, open balance questions, and creative milestones.
- `docs/v44-ux-test-contract.md` — accepted v44 hands-on test requirements and QA fixtures.
- `docs/v43-first-test-pass-baseline.md` — mandatory previous test-pass fixes that v44 must preserve.
- `docs/v43-decision-interface-coverage.md` — interface coverage for accepted decisions.
- `docs/v43-testing-navigation-scope.md` — future-menu/navigation testing scope.
- `docs/ARCHITECTURE_DECISIONS.md` — architectural source of truth.
- `docs/TRADING_SYSTEM.md` — trading rules and constraints.
- `docs/WORLD_BIBLE.md` — original-IP/world source of truth.
- `docs/ORIGINAL_VERTICAL_SLICE.md` — original vertical-slice content.
- `docs/IP_CONVERSION_ROADMAP.md` — original-IP conversion plan.
- `docs/TESTING_RELEASE_MARKETING_ROADMAP.md` — testing/release stages.

This checkpoint records the latest progress and adds the newest testing-process rule. It does not supersede those boards.

---

# 2. Current implementation / CI status

## PR #5

PR #5 is open, draft, mergeable, and **not merged**. It implements the consolidated v44 UX/systems test pass, including the accepted review changes and QA fixtures below.

The last inspected head before this checkpoint was `e85cf601f9bc37bdc7ad110537b89a23da2583da`. This handoff commit itself advances the branch, so always inspect the live PR head before testing or editing.

## Last completed acceptance attempt

GitHub Actions run ID `32073559950` / Run #74 completed unsuccessfully.

Passed regression shards:
- `greenwake-ip`
- `greenwake-content`
- `prototype-integrity`
- `ip-inventory`
- `prototype-progression`

Failed regression shards:
- `prototype-core`
- `v44-ux`
- `greenwake-progression`
- `greenwake-terminology`
- `prototype-ui`

`v43-structure` was cancelled after the run could no longer satisfy the final gate. The final 1,500-execution acceptance gate failed.

**Important:** The requested CI-fix investigation was stopped intentionally at this checkpoint. Do not claim these failures are patched. The next chat must inspect the failed job logs and patch actual root causes before rerunning validation.

---

# 3. Mandatory future testing policy — NEW LOCKED PROCESS RULE

Every future implementation/fix validation cycle must use a two-stage gate:

1. Make the intended fixes/changes.
2. Run **one complete 1× pass of the full relevant test suite/gate**.
3. The 1× pass must be **100% successful** before any repeated stress validation begins.
4. If any test fails in the 1× pass, **stop**. Fix the failure and restart validation with a fresh complete 1× pass.
5. Only after a completely clean 1× pass may the project run the required **50× repetition/stress pass**.
6. A failed 1× pass must never be followed by 50× testing merely to collect more failures.
7. Do not weaken coverage/assertions simply to make CI green. If an assertion is stale because an accepted design intentionally changed, update it to test the new accepted behavior while preserving equivalent behavioral coverage.
8. Do not merge/promote a build until the required gate for that stage is green.

This rule supplements the existing requirement that accepted builds receive 50× regression repetition. It changes the order to **1× clean qualification → 50× stress/acceptance**.

---

# 4. Accepted v44 UX / gameplay-interface decisions

These decisions are already represented in `DESIGN_PROPOSAL_BOARD.md` and/or `v44-ux-test-contract.md`; preserve them.

## Primary navigation
- One persistent horizontally scrollable primary navigation bar.
- Do not split primary destinations between upper and lower bars.
- The bar remains visible on every top-level destination, including Bank.
- Future menus must be represented in navigation/testing so placement and traversal can be evaluated, including Pets, Exploration/World, Settings/Options, Store, Community/social systems, Ascendants, etc.

## Activities / Skills / subsets
- Broad permanent Skills use subsets; subsets do not become separate permanent Skills.
- Parent Skill owns Skill XP/level; each subset has persistent Mastery/progression.
- Target non-combat flow: `Activities → Skill → subset mastery row → subset activities`.
- The subset Mastery/progression row itself is the navigation link; no redundant subset-selection menu.
- First subset in a Skill is a baseline/generalist profile. Later Regions/Locations unlock specialized subsets that improve one profile while sacrificing others.
- Do not explicitly label subsets as XP/Pack Point/Idle profiles; players infer profiles from activity values.
- Avoid long descriptions explaining obvious subset/activity structure.
- Comparable activity rows show: activity name, level requirement, current blocker (`Requirement not met`, `Binding not obtained`, etc.), parent-Skill XP/action, Pack Points/action, Idle Efficiency, and Time/action.
- Back navigation belongs at the top of drill-down pages before Skill information.

## Idle/activity feedback
- Routine activity-completion reward pop-ups render at the top of the visible viewport over all menus/navigation and auto-dismiss.
- Important summaries such as Welcome Back/offline settlement are a separate UI class and may require manual dismissal.
- During repeating idle activity, do not show `Next Activity`.
- Show XP/action, Points/action, effective XP/hour, effective Points/hour, Time/action, and live per-action progress.

## World / Exploration
- Exploration preview is shown inside the selected Exploration, not before the Exploration/Location choices.
- World remains useful for geography/discovery/lore/completion while repeatable activities remain Skill-first.

## Filters and lock states
- Filters/sorts/toggles across all menus must explain what they do.
- `Locked` means revealed content whose requirements are unmet, including unowned Binding and/or level/mastery/Region/equipment requirements.
- Undiscovered content is not merely treated as Locked.

---

# 5. Codex / Collection / Bank / equipment

## Codex
- Codex landing page includes overall summaries plus entry points for **Stats** and **Card Collection**.
- Stats and Card Collection each open a deeper dedicated space.
- Collection cards should be compact/icon-focused.
- Tapping a card shows details including pull rates, Standard count, and Foil count; when a Foil exists, feature/show the foiled version appropriately.
- Collection retains filtering and Shredding behavior; last-copy protection remains authoritative.

## Bank / equipment
- Tapping equipment in Bank opens item information and actions to equip to current equipment or a specific Loadout.
- Tapping currently equipped gear opens the same information with an Unequip option.
- Equipment screen is player-centered with approved slots surrounding a player model/avatar.
- Approved current test slots: **Head, Body, Legs, Main Hand, Off Hand, Boots, Jewelry, Cape/Back**.
- **Gloves are removed.**
- Equipped Pet has a separate visible position near the player model; tapping it navigates to Pets.

## Loadouts
- Loadout overview shows only player-given name and tag.
- Selecting a Loadout opens its detail/edit view.
- Loadout detail supports equipment replacement/editing and an **Equip Loadout** action.

---

# 6. Packs / Forge / fragments

## Packs
- Pack-selection cards show pack cost, cards obtained, plain-language rarity advantage, and the relevant percentage difference.
- Preserve restrained normal rarity reveal differences and strongest dramatic treatment for Perfect/Foil pulls.

## Forge
- Normal Fragment economy uses a universal standard Fragment currency direction; exact costs remain balance work.
- Standard Forge: random eligible **unowned** card from selected eligible tier/pool.
- Star Fragment: targeted selection of a specific eligible unowned card while preserving normal eligibility/progression gates.
- Prismatic resource remains for Perfect/Foil progression according to established rules.
- Currency never bypasses content eligibility.
- Forge result uses pack-like card presentation: back first, tap to reveal. No dramatic tier suspense is required because the player selected the Forge tier.
- QA/dev controls should grant standard Fragments, Prismatic resources, and Star Fragments for testing without bypassing eligibility rules.

---

# 7. Pets / Store / monetization test behavior

## Store
- Store is a top-level test destination.
- QA purchases are clearly **Test / $0** but should exercise actual entitlement/state behavior.
- QA products include Pet Expansion, Star Fragment purchase, Premium Upgrade package, and simulated rewarded-ad/Daily Focus activation.
- Settings/options shown as functional must actually work and persist; future placeholders should be disabled/labeled rather than silently doing nothing.

## Purchase-gated content UX
- Do not hide purchase-gated features completely.
- Before purchase, players can navigate to/discover the feature.
- Gated content is visibly disabled/grayed out with an explicit purchase requirement and a direct deep-link to the relevant Store product.
- Example: Pets opens, Pet Expansion content is grayed out with `Pet Expansion required` and a Store action.
- After a successful purchase, returning to the feature should immediately reflect entitlement without an app restart.
- If a purchase only improves existing free functionality, do not gray out the free/base functionality.

## Pets QA fixture
- Test Pet: **Bramblefox Cub**.
- Source: completed **Bramblefox Hunt**.
- QA acquisition rate: **50% per completed Hunt** to make acquisition easy to test.
- Pet Expansion must be owned before Pet content is usable.
- Include Pet-specific equipment and bonus surfaces for testing; QA values are not final balance.

## Monetization guardrails
- Monetization may reduce friction/expand convenience, not buy superior core progression efficiency.
- Optional rewarded ads/Daily Focus are preferred over forced interstitials/banners.
- Do not improve card rarity, foil, or Pet drop odds through paid systems.

---

# 8. Huntsmanship / Raids / Ascendants

## Huntsmanship QA
- Include creatures that allow testing Tracking → Stalking → Hunt plus Special Creature Hunts.
- **Bramblefox** is the primary full-chain fixture.
- Test multiple requirement/lock states.

## Raids
- Raid browser shows specific Raid name, originating Region, Tier, and completion/progress.
- Selecting a Raid opens detailed requirements evaluated against the player's current state with clear satisfied/not-satisfied states.

## Ascendant QA
- Include one clearly marked **Test Ascendant** with persistent Favor/progression.
- Include a short active choice/timing minigame to test entry, success/failure, retry, persistence, progression/rewards, and reset behavior.
- Test content is architecture/UX validation, not approval of the final Ascendant identity/minigame.

---

# 9. Social / notifications QA

## Dummy friend fixture
- Deterministic dummy Friend: **Test Ranger**.
- Test outgoing and incoming Friend Requests, accept/reject, multiple trade offers, accept/reject, counteroffer, countered counteroffer, timeout/expiration, state persistence, and eligibility restrictions.
- Showcase must be testable both ways: player views Test Ranger's Showcase and Test Ranger can view the player's selected Showcase.

## Notifications
- Notification bell is the central notification inbox.
- Bell shows unread indicator/badge.
- Tapping bell opens notification summaries; tapping a notification allows deeper inspection/deep-linking where appropriate.
- Routine activity-completion toasts do not flood the notification inbox.

---

# 10. Developer / QA utilities

Preserve/add utilities needed to repeatedly test states without grinding:
- Grant All Bindings.
- Grant Forge test currencies.
- Reset test fixtures/entitlements/progression enough to retest locked, missing, first-acquisition, purchase, Pet, Ascendant, and social states.
- QA tools must not redefine normal production eligibility/economy rules.

---

# 11. Broader product decisions that remain authoritative

- Cardbound is an **idle TCG mobile app first**.
- Routine gameplay remains idle-capable; recurring choice prompts are not required for normal efficiency.
- Bindings/cards unlock gameplay as well as collection progression.
- Commercial direction is fully original IP; do not reintroduce RuneScape/Jagex names/assets/dependencies into original mode.
- Current test-facing terminology includes Binder, Bindings, Codex, Bank, Forge, Huntsmanship, Ascendants, Perfect Bindings, universal normal Fragments, Prismatic Essence, and Star Fragments. Older `Vault`, `Bindery`, and `Essence Fragments` wording is historical/working terminology; follow `docs/DECISION_LEDGER.md`.
- Regions/Locations expand world, Skills/subsets, collection, and presentation; repeatable activities remain Skill-first.
- Trading remains constrained friend trading, not an open marketplace, and must obey the authoritative `TRADING_SYSTEM.md` rules.
- Paid expansion ownership must not be bypassed through trading or pack eligibility.
- Pets are gameplay drops after appropriate expansion eligibility, not direct paid Pet rewards.
- Original-mode save isolation and save compatibility rules remain important.
- Avoid accumulating competing global render/navigation override layers; prefer authoritative modules.

---

# 12. Stage / progress board checkpoint

## Completed / established
- Earlier clean baseline reached on Run #35 with the then-current 1,000-execution gate.
- R1 Activity/Sailing routing consolidation completed previously.
- R2/UI-router and later v43 work established the current hands-on review baseline.
- v43 first test-pass fixes are mandatory baseline behavior.
- Product-owner v44 review decisions were consolidated into PR #5 and `v44-ux-test-contract.md`.
- v44 dedicated UX/system regression coverage was added, raising the attempted stress gate to 1,500 executions.

## Current stage
- **v44 consolidated UX/systems implementation + regression repair.**
- PR #5 is not accepted/merged because Run #74 failed.
- CI repair was intentionally stopped to create this handoff.

## Immediate next actions for the new chat
1. Read `AGENTS.md`, `docs/DECISION_LEDGER.md`, this handoff, and the authoritative documents listed in Section 1.
2. Inspect live PR #5 head and pull raw logs for the five failed Run #74 shards.
3. Identify first actionable/root failure in each and group shared causes.
4. Patch source behavior when it violates accepted design; update stale tests only where accepted v44 behavior intentionally superseded an old assertion, without reducing coverage.
5. Run **one complete 1× qualification pass**. If anything fails, stop, patch, and restart the full 1× pass.
6. Only after the 1× pass is completely green, run the required **50× stress/acceptance pass**.
7. Do not merge/promote PR #5 without Setetchie's explicit approval.

---

# 13. Open / not-final reminders

Do not invent final values where the boards still mark them open. Examples include exact economy costs, final pack odds/prices, final Pet balance/drop rates outside QA fixtures, final Ascendant identities/minigames/bonuses, final monetization prices, final Daily Focus values/limits, final visual/audio content, and other balance/creative milestones.

QA fixtures and $0 purchases exist to test system behavior, not to lock commercial pricing or balance.

---

# Handoff rule

When a new accepted design decision, test finding, bug, superseded direction, or stage transition occurs, update the **appropriate authoritative board/document** rather than relying on chat history alone. Update this handoff only when another chat migration/checkpoint is needed.

## Governance migration checkpoint — 2026-08-18

- **Repository/branch/PR:** `Setetchie/gielinor-cardbound`; `agent/v44-ux-test-pass`; PR #5 remains unmerged.
- **Latest committed baseline:** `08bfb7d` (`docs: scaffold canonical decision ledger`). Governance edits made after this commit are currently uncommitted.
- **Completed:** Root `AGENTS.md` and `docs/DECISION_LEDGER.md` were aligned with the six-status governance model and explicit document precedence. Known Combat, Gloves, monetized idle-capacity, and terminology conflicts were reconciled; Pet/Companion detail remains open.
- **Exact stop:** Documentation governance is complete for the requested seed scope; PR #5 failure remediation has not begun.
- **1× gate:** Not run in this documentation-only task. Run #74 remains the last failed evidence.
- **50× gate:** Blocked until a complete green 1×.
- **Open decisions:** `PET-001`; remaining historical decision audit; missing provenance/dates for some older proposals.
- **Do not:** Change behavior as part of governance; merge PR #5; run 50×; infer unresolved Pet/Companion decisions.
- **Next action:** After Setetchie's approval, inspect the five failed Run #74 shard logs and diagnose root causes without changing code during the diagnostic pass.
