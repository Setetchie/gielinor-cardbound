# Cardbound Complete New-Chat Handoff — 2026-08-18

Setetchie, this is the comprehensive continuation checkpoint for a new ChatGPT or Codex task. It records repository governance, accepted product direction, PR #5 repair state, validation evidence, the interrupted 50× gate, coordination rules, prohibitions, and the exact next action.

## Start here in a new chat

Paste or attach this file, then use this instruction:

> Continue Cardbound from `docs/CARDBOUND_COMPLETE_NEW_CHAT_HANDOFF_2026-08-18.md`. Address me as Setetchie. Before doing any work, confirm the branch and worktree, fetch and safely fast-forward only when possible, then read `AGENTS.md`, `coordination/shared/PROTOCOL.md`, `coordination/shared/WORKFLOW_STATE.md`, `coordination/initiate/CURRENT.md`, `docs/DECISION_LEDGER.md`, and the authority documents relevant to the assigned task. Preserve all unrelated local work. Do not merge PR #5, force-push, reset, rebase, discard changes, invent product decisions, or cross a validation gate without explicit approval. The complete 1× gate is green, but the 50× gate is incomplete and PR #5 is not merge-ready. Follow the current GitHub-synchronized mailbox task and stop at its stated boundary.

## Executive status

- **Repository:** `Setetchie/gielinor-cardbound`
- **Local workspace:** `C:\Users\micha\Documents\gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **Upstream:** `origin/agent/v44-ux-test-pass`
- **Pull request:** #5, repeatedly recorded as open and intentionally unmerged
- **Current handoff baseline:** `e8ee58e` (`docs: claim comprehensive handoff task`)
- **Product authority:** Setetchie
- **Current acceptance state:** not release-ready and not eligible to merge
- **Repair state:** the approved run #74 corrective application/test diff exists locally and remains intentionally uncommitted
- **Complete 1× gate:** green, 37/37 Playwright tests in 17.4 seconds
- **50× gate:** incomplete; 650 confirmed passes, then the `greenwake-terminology` repetition hung without an assertion failure or final summary
- **Exact blocker:** a fresh, complete 50× gate has not finished successfully across every required shard
- **Next owner after this handoff:** `CHATGPT`, pending a new GitHub mailbox task and Setetchie’s approval

The branch/upstream relationship and commit are locally verifiable. PR #5’s open/unmerged status is durable repository-recorded state; this handoff task could not independently refresh PR metadata because the GitHub CLI was unavailable and unauthenticated web lookup did not expose the private/current PR context.

## Non-negotiable governance

1. Setetchie retains product, design, validation-gate, and merge authority.
2. Repository documentation—not chat memory—is the durable source of truth.
3. Read `docs/DECISION_LEDGER.md` before changing product behavior. Newer explicitly accepted decisions supersede conflicting older text.
4. Use ledger statuses exactly: `CURRENT`, `SUPERSEDED`, `OPEN`, `BALANCE`, `FUTURE`, and `REJECTED`.
5. Implement only `CURRENT` decisions in the specifically approved scope.
6. Never silently decide an `OPEN`, `BALANCE`, or `FUTURE` issue. Return it to Setetchie and record it durably.
7. Code and tests are implementation evidence, not product authority. Never weaken a test merely to get green; stale assertions may change only when accepted behavior changed, with equivalent or stronger coverage.
8. Preserve accepted regressions and `localStorage.cardbound` compatibility unless Setetchie explicitly changes them.
9. Never merge PR #5 without Setetchie’s explicit approval.
10. Do not reset, rebase, stash, discard, overwrite, or force-push unrelated work automatically.

## GitHub coordination protocol

GitHub is the automatic synchronization bridge between ChatGPT and Codex. The local repository is Codex’s engineering workspace.

The intended cycle is:

`ChatGPT → GitHub initiate task → Codex fetches/pulls safely → Codex works/tests locally → Codex writes result → Codex commits/pushes result → ChatGPT reviews → next task`

Before every Cardbound task, Codex must:

1. Confirm the current branch and run `git status`.
2. Fetch the configured upstream.
3. Compare local/upstream divergence and changed paths.
4. Pull with fast-forward-only semantics only if safe. If history diverges or remote changes conflict with local work, stop and report rather than resolving destructively.
5. Read, in order:
   - `AGENTS.md`
   - `coordination/shared/PROTOCOL.md`
   - `coordination/shared/WORKFLOW_STATE.md`
   - `coordination/initiate/CURRENT.md`
6. Execute only a task that is `READY`, owned by `CODEX`, and past every approval gate.
7. Claim it as `IN_PROGRESS`, retaining the same task ID, and push the claim before implementation.

Every task—including documentation-only, diagnostic, blocked, or no-op work—must finish with:

- `coordination/results/<TASK_ID>.md` containing structured evidence;
- an updated `coordination/shared/WORKFLOW_STATE.md`;
- a `COMPLETE` initiate record archived at `coordination/initiate/archive/<TASK_ID>.md`;
- ownership normally returned to `CHATGPT`;
- authorized commits pushed to the current branch.

Automatic synchronization never grants permission to merge, force-push, reset, rebase, discard work, invent decisions, authorize 50×, or infer merge approval.

## Durable authority map

Read only the documents relevant to the task, but use this precedence and routing map:

- `AGENTS.md` — repository execution rules, decision discipline, validation sequence, continuity, and mailbox behavior.
- `coordination/shared/PROTOCOL.md` — complete synchronization and task-state protocol.
- `coordination/shared/WORKFLOW_STATE.md` — concise live repository, validation, ownership, and next-action state.
- `coordination/initiate/CURRENT.md` — the only current executable task envelope.
- `docs/DECISION_LEDGER.md` — product-decision precedence and statuses.
- `docs/DESIGN_PROPOSAL_BOARD.md` — accepted/rejected design proposals and historical design evidence.
- `docs/V44_REVIEW_DECISIONS_AND_STAGE_BOARD.md` — v44 review decisions and stage status.
- `docs/v44-ux-test-contract.md` — current v44 behavioral/test contract.
- `docs/v43-first-test-pass-baseline.md` — v43 behavioral baseline retained inside v44.
- `docs/v43-decision-interface-coverage.md` — decision-to-interface coverage.
- `docs/v43-testing-navigation-scope.md` — navigation/testing scope.
- `docs/ARCHITECTURE_DECISIONS.md` — architectural authority and owner boundaries.
- `docs/TRADING_SYSTEM.md` — constrained trading authority.
- `docs/WORLD_BIBLE.md` — original-world/lore authority.
- `docs/ORIGINAL_VERTICAL_SLICE.md` — Greenwake Frontier vertical-slice authority.
- `docs/IP_CONVERSION_ROADMAP.md` — transition from prototype IP to original commercial IP.
- `docs/TESTING_PROCESS_BOARD.md` — testing process and evidence expectations.
- `docs/TESTING_RELEASE_MARKETING_ROADMAP.md` — release sequencing.
- `docs/CHAT_MIGRATION_PROTOCOL.md` — chat continuity conventions.

Older handoffs are historical evidence. This file supersedes them as the continuation checkpoint but does not supersede product decisions in the ledger.

## Project overview

Cardbound is a mobile-first collectible fantasy progression prototype moving toward fully original commercial IP. It is currently a direct static browser application served from `index.html`, with persistent state stored under `localStorage.cardbound`.

Legacy RuneScape/OSRS-derived prototype names and content remain development-only evidence and must be replaced before a commercial/public-store release. The working title remains Cardbound until clearance. Greenwake Frontier is the current original vertical-slice direction.

### Runtime structure

`index.html` loads a layered JavaScript runtime. Earlier foundation and feature modules include:

- `app.js`, `upgrade.js`, `progression-v2.js`, `content-expansion.js`
- `combat-styles.js`, `combat-menu-fix.js`, `image-fix.js`, `pack-flow.js`, `ui-v11.js`
- collection/foil layers such as `collection-odds-slayer.js`, `foils.js`, `foil-fragments.js`, and `new-card-overlay.js`
- content layers such as `sailing-content.js`, `gods-raids-v20.js`, and `tzhaar-expansion-v22.js`
- UI owners such as `core-ui-fix.js`, `bank-collection-v18.js`, `gods-raids-ui-v20.js`, `activity-filters-v21.js`, `home-groups-v23.js`, `sailing-idle-v34.js`, and `loadout-presets-v38.js`

Later v43/v44 modules include the original-mode bootstrap/content/UI, future shell, pack/gathering layers, the preserved Sailing owner, and `v44-ux-test-pass.js`.

### Architectural cautions

- Preserve the save schema and `localStorage.cardbound` compatibility.
- Avoid stacking extra render wrappers when an existing authoritative owner should be changed or delegated to.
- Respect current UI-owner boundaries.
- Sailing state and routing must remain with its accepted owner; do not create a second idle layer.
- When behavior changes are approved, update version/cache metadata as required by the architecture docs.
- Commercial-facing work must use original IP.

## Accepted product direction

The following is a compact continuation summary, not a replacement for the ledger:

- The product is an idle TCG/progression game designed mobile-first.
- Skills lead to subsets/mastery and activities; regions reveal horizontal alternatives rather than invalidating prior progression.
- Combat is one broad category. Encounter plus weapon/loadout determines style; separate top-level combat-skill categories are not current authority.
- Primary navigation is persistent and horizontal in the current v44 presentation.
- World navigation follows World → Region → Location → optional point of interest. Exploration preview belongs inside the selected exploration flow.
- Equipment is player-centered. Approved slots are Head, Body, Legs, Main Hand, Off Hand, Boots, Jewelry, and Cape/Back. There is no Gloves slot. Pet remains a separate player link/position. Loadouts must remain editable and equippable.
- Codex lands into Stats/Card Collection. Card Collection uses compact/icon-forward cards and meaningful detail, including pull rates and standard/foil ownership counts. Search, ownership filtering, and shredding remain functional contracts.
- Forge terminology and economy use universal Fragments for a random eligible unowned standard card, Star Fragments for a targeted eligible unowned standard card, and Prismatic Essence for foil treatment of an owned eligible card. Do not introduce bypasses.
- Packs use concise, tiered reveal flows.
- Current primary terminology is **Bank**, **Forge**, **Activities**, **Fragments**, **Prismatic Essence**, and **Star Fragments**. Original/lore modes must not rewrite current UI authority to obsolete labels such as Vault, Bindery, or Ventures.
- Raids should list name, region, tier, progress, and useful requirement details.
- Huntsmanship currently uses the Bramblefox chain for QA coverage.
- Pet QA may use a 50% fixture, but final pet architecture and exact values remain unresolved.
- Store QA uses $0 fixtures, visible/deep-linked purchase gates, and no pay-to-win progression.
- Ranger is the social/trading/showcase fixture.
- Notifications are centralized.
- Ascendant is a test fixture, not final product authority.
- Settings controls must work and persist or be clearly disabled.
- Developer tools include grant bindings/currencies and reset behavior.
- Trading is constrained to friends and must follow `docs/TRADING_SYSTEM.md`.

### Important unresolved authority

- `PET-001` remains `OPEN` for final pet architecture/details.
- `PET-002` remains `BALANCE` for exact pet values.
- `MON-002` remains `BALANCE` for exact idle limits and prices.
- The ledger contains roughly 300 recovered historical decisions that have not all been fully audited. Never assume recovered historical text is current without checking status and precedence.

## PR #5 and run #74 history

PR #5 remains intentionally unmerged. Historical GitHub Actions run ID `32073559950` (run #74) was the failed baseline that triggered the repair.

Passed in run #74:

- `greenwake-ip`
- `greenwake-content`
- `prototype-integrity`
- `ip-inventory`
- `prototype-progression`

Failed in run #74:

- `prototype-core`
- `v44-ux`
- `greenwake-progression`
- `greenwake-terminology`
- `prototype-ui`

`v43-structure` was not merely cancelled because another job failed. Its fixture required exactly `CARDBOUND_VERSION === 'v43'`, which was incompatible with the current v44 build, and it later exhausted its timeout.

The accepted diagnosis reduced the failures to three genuine regressions plus stale/fragile test assumptions:

1. Genuine Sailing routing regression.
2. Genuine Card Collection search/filter regression.
3. Genuine current-terminology regression caused by original mode rewriting primary labels.
4. Ambiguous persistent-navigation selectors.
5. Outdated assertions placing Gathering directly on Home.
6. Obsolete `WORN EQUIPMENT` wording/shape assumptions.
7. An obsolete v43 fixture hard-coding the exact runtime version string.

## Existing uncommitted corrective repair

The approved repair is present in the worktree but has not been committed. Preserve it exactly unless a future mailbox task explicitly authorizes changes.

### Application files

- `v44-ux-test-pass.js`
  - delegates Sailing to the authoritative preserved v43 owner instead of swallowing the route and falling back to generic Activity Groups;
  - restores Card Collection search and All/Owned/Missing filtering inside the compact v44 presentation;
  - retains compact/icon-forward cards and current detail behavior;
  - adds/retains the Huntsmanship `NEW` marker hook;
  - makes relevant settings functional while preserving Reveal All and Codex privacy behavior.
- `original-ui-v41.js`
  - stops original/Greenwake mode from rewriting current primary UI terms such as Bank, Forge, and Activities to Vault, Bindery, and Ventures;
  - retains original/lore terminology support where it remains valid.

### Test files

- `tests/smoke.spec.js`
- `tests/original.spec.js`
- `tests/v43-structure.spec.js`
- `tests/v44-ux.spec.js`

The test changes:

- scope persistent navigation to `.v44-nav` while retaining separate Home CTA/tile coverage;
- navigate Activities → Gathering before Gathering/Huntsmanship assertions;
- assert the current player-centered Equipped/loadout presentation, approved slots, absence of Gloves, and separate Pet position/link;
- cover compact Card Collection search/filter/detail behavior;
- assert current primary terminology;
- replace exact-v43 bootstrap coupling with current-build readiness and substantive v43 behavior coverage.

These changes were approved because the old assertions/fixture were stale under accepted v44 behavior. They are intended to preserve or strengthen behavioral coverage, not hide regressions.

### Continuity files also locally modified

- `docs/CARDBOUND_NEW_CHAT_HANDOFF_2026-08-18.md`
- `docs/DECISION_LEDGER.md`

These contain continuity/validation updates from the preceding repair work. They are also uncommitted and must not be casually overwritten or bundled into unrelated commits.

### Worktree fingerprint

At this handoff’s creation, the pre-existing modified paths were exactly:

```text
docs/CARDBOUND_NEW_CHAT_HANDOFF_2026-08-18.md
docs/DECISION_LEDGER.md
original-ui-v41.js
tests/original.spec.js
tests/smoke.spec.js
tests/v43-structure.spec.js
tests/v44-ux.spec.js
v44-ux-test-pass.js
```

The six-file application/test corrective diff hash recorded by the prior task is:

```text
22139e3be5df4fff8bb48d9438a229401f759714
```

The eight-file pre-existing diff was 90 insertions and 73 deletions when this task began. Recheck rather than assuming these values after any future synchronization.

## Validation evidence

### Mandatory validation order

For corrective work:

`diagnose → patch → complete 1× validation → if red, fix and restart the entire 1× → only when fully green, complete 50× validation`

Any later application/test code change resets the gate. Never combine partial stress runs into a green result.

### Complete 1× gate — GREEN

The full all-tests-once local command used a temporary Playwright configuration:

```powershell
npx playwright test --config=playwright.1x.config.js
```

Result:

- **37/37 passed**
- **17.4 seconds**
- `smoke`: 11
- `original`: 8
- `inventory`: 1
- `v43-structure`: 8
- `v44-ux`: 9

This was a complete all-tests-once pass and a superset of the named CI shards. The temporary configuration was cleaned up.

### Workflow selector correction — COMMITTED

Commit `17194ad` (`ci: fix renamed regression selectors`) corrected stale workflow grep labels:

- `Activity > Skilling` → `Activity > Sailing`
- `Greenwake next Woodcraft` → `Greenwake next Woodcutting`

The result is recorded in `coordination/results/CB-PR5-WFGREP-002.md`.

### 50× gate — NOT GREEN / INCOMPLETE

The result is recorded in `coordination/results/CB-PR5-STRESS50-003.md`.

The actual selected inventory was 1,850 executions (`37 × 50`), despite older workflow metadata describing 1,500 and describing v44 UX as 100 executions. The current suite has 9 v44 tests, so v44 alone represents 450 executions at 50×. Reconcile this metadata before reporting a future gate.

Confirmed complete repetitions:

| Shard | Result | Duration |
|---|---:|---:|
| `prototype-core` | 150/150 passed | 2.1m |
| `prototype-progression` | 150/150 passed | 1.9m |
| `prototype-ui` | 150/150 passed | 2.2m |
| `prototype-integrity` | 100/100 passed | 1.7m |
| `greenwake-ip` | 100/100 passed | 1.6m |
| **Confirmed total** | **650/650 passed** | — |

`greenwake-terminology` planned 100 executions and appeared to hang near completion. It produced no assertion failure, Playwright timeout, trace, or final summary. Three Node processes were idle with unchanged state for more than two minutes, so the run was interrupted. A focused one-iteration diagnostic of the same two tests then passed 2/2 in 2.1 seconds.

Current classification: likely runner/environment hang, not evidence of an application regression. It still invalidates the stress gate because the complete run did not finish.

The remaining shards—including later Greenwake shards, inventory, v43, and v44—were not completed in that attempt. Temporary dependencies/configuration/results/debug logs were cleaned up.

Observed warnings:

- `NO_COLOR`/`FORCE_COLOR` warnings were harmless.
- `npm audit` reported two high-severity findings; no audit fix was authorized or applied.

## Commit and coordination history

Recent relevant commits, newest first at handoff creation:

```text
e8ee58e docs: claim comprehensive handoff task
e8d9895 docs: record incomplete 50x stress gate
8f64a02 docs: claim 50x stress validation
0187622 coordination: hand PR5 stress gate to Codex
7b7c991 coordination: authorize PR5 50x stress gate
631ffc8 docs: record workflow selector repair
17194ad ci: fix renamed regression selectors
e2cd5fe docs: claim workflow selector repair
52008da coordination: transfer workflow selector task to Codex
d6c2d36 coordination: authorize PR5 workflow selector repair
045922b docs: record PR 5 verification result
3154015 docs: claim PR 5 verification task
7d5af45 coordination: assign PR5 run74 verification to Codex
c8c4985 docs: add GitHub coordination bridge
31062a0 docs: establish Cardbound decision governance for Codex
```

Key result records:

- `coordination/results/CB-PR5-RUN74-001.md`
- `coordination/results/CB-PR5-WFGREP-002.md`
- `coordination/results/CB-PR5-STRESS50-003.md`
- `coordination/results/CB-HANDOFF-004.md`

## Prohibited next actions

Until explicitly authorized by Setetchie through a valid mailbox task:

- Do not merge PR #5.
- Do not force-push.
- Do not reset, rebase, discard, stash, or overwrite the uncommitted repair.
- Do not modify application behavior or tests.
- Do not silently commit the pre-existing repair/continuity diff.
- Do not claim the 50× gate is green.
- Do not combine the 650 prior passes with a later partial run.
- Do not invent a product/design decision.
- Do not run dependency audit fixes merely because warnings exist.

## Exact next action

`CHATGPT` should review this handoff and the stress result, reconcile the expected 50× execution count with the current 37-test inventory, and prepare a new `READY` task owned by `CODEX` only after Setetchie explicitly approves the next gate.

The recommended engineering task is a **fresh complete 50× run from scratch** across all required shards, with per-shard line/JSON artifacts, an outer watchdog timeout, and process diagnostics sufficient to distinguish a runner hang from a test failure. It must not reuse the prior 650 passes. If any shard fails or hangs, stop at the first/root issue and report evidence; do not merge. If every shard finishes green, report the full result and wait for Setetchie’s explicit merge decision.

## New-chat continuity check

A new task is correctly oriented only if it can state all of the following before acting:

- branch `agent/v44-ux-test-pass` and PR #5 unmerged;
- the mailbox task ID, owner, state, gates, and stop boundary;
- Setetchie and the decision ledger remain authoritative;
- the repair is locally present and uncommitted;
- 1× is green at 37/37;
- 50× is incomplete, with 650 confirmed passes followed by a runner hang;
- no merge permission exists;
- unrelated local work must be preserved;
- the next action requires a new approved mailbox task.

If any of that context is missing or contradicted, stop, refresh this handoff and the mailbox state from GitHub, and ask Setetchie to reconcile the task before changing the repository.
