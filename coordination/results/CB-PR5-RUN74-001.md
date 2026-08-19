# PR #5 / Run #74 Verification Result

- **Task ID:** `CB-PR5-RUN74-001`
- **Status:** `COMPLETE`
- **Owner:** `CHATGPT`
- **Completed:** 2026-08-18
- **Branch:** `agent/v44-ux-test-pass`
- **PR:** #5, open and unmerged

## Outcome

Reviewed the existing uncommitted corrective diff against the accepted run #74 diagnosis and governing v43/v44 documents. The changes map to the approved repair scope and preserve or strengthen behavioral coverage. The previously reported 37/37 all-tests-once run is the complete 1× Cardbound gate because it executed every Playwright test once, a superset of all workflow shard selections.

No additional application/test changes or validation runs were required during this review. The application/test diff hash is `22139e3be5df4fff8bb48d9438a229401f759714`.

## Corrective files reviewed

Application:

- `v44-ux-test-pass.js`
- `original-ui-v41.js`

Tests:

- `tests/smoke.spec.js`
- `tests/original.spec.js`
- `tests/v43-structure.spec.js`
- `tests/v44-ux.spec.js`

Continuity records already present in the worktree:

- `docs/DECISION_LEDGER.md`
- `docs/CARDBOUND_NEW_CHAT_HANDOFF_2026-08-18.md`

## Application changes reviewed

- Sailing: v44 delegates Sailing to the preserved v43 owner while returning non-Sailing routes to v44 rendering. This retains the authoritative starter route, Port Tasks, and idle behavior.
- Card Collection: compact v44 cards retain detail behavior and regain usable search plus All/Owned/Missing filtering.
- Terminology: original mode no longer rewrites current Bank, Forge, Activities, or Activity UI authority terms; original-content/lore translation remains otherwise intact.
- Compatibility behavior: v44 exposes the existing NEW marker hook on Huntsmanship and functional persisted Reveal All/Codex privacy settings required by preserved v43 behavior.

No unrelated product decision, balance value, merge, or release behavior was introduced.

## Test and fixture changes reviewed

- Persistent-navigation actions are scoped to `.v44-nav`; separate Home CTA assertions remain.
- Sailing behavior assertions still exercise route navigation and Port Tasks.
- Gathering assertions navigate through accepted Activities placement before checking subsets/content.
- Equipment assertions cover the accepted player-centered Equipped presentation, all approved slots, no Gloves, Pet placement, and loadout availability/functionality.
- Card Collection assertions enter the compact collection, exercise Missing filtering, and preserve detail/pull-rate coverage with modal-scoped selectors.
- Original-mode assertions enforce current Activities/Bank terms and reject Ventures/Vault while retaining Greenwake/IP checks.
- v43 bootstrap now waits for current-build readiness plus required v43/v44 behavioral hooks instead of requiring version string `v43`.
- v43 behavioral coverage remains substantive across Gathering, World/Exploration, destinations, Codex/Bank, Settings, and NEW markers.

These are legitimate accepted-behavior updates, not weakened assertions.

## Commands and review evidence

- Task-start: branch/status, `git fetch origin`, divergence/path comparison, and safe `git pull --ff-only` of GitHub initiate commit `7d5af45`.
- Diff review: `git diff --stat`, `git diff --name-only`, and targeted `git diff` for all six corrective files.
- Gate review: inspected `.github/workflows/regression.yml`, `playwright.config.js`, `package.json`, and enumerated every `test(...)` declaration.
- Integrity: `git diff --check` passed; only informational Windows LF→CRLF notices appeared.

## Focused test evidence

The preceding corrective task recorded green focused checks for Sailing routing, original terminology, Bank/equipment, Card Collection search/filtering, v43 bootstrap/Gathering/Settings/NEW markers, and Codex detail behavior. No focused test was rerun because this task made no application/test changes.

## Complete 1× validation

Recorded command: `npx playwright test --config=playwright.1x.config.js`

Recorded result: **37/37 passed in 17.4s**.

| Suite | Tests | Result |
|---|---:|---|
| `tests/smoke.spec.js` | 11 | Green |
| `tests/original.spec.js` | 8 | Green |
| `tests/inventory.spec.js` | 1 | Green |
| `tests/v43-structure.spec.js` | 8 | Green |
| `tests/v44-ux.spec.js` | 9 | Green |

All workflow shards are covered: `prototype-core`, `prototype-progression`, `prototype-ui`, `prototype-integrity`, `greenwake-ip`, `greenwake-terminology`, `greenwake-progression`, `greenwake-content`, `ip-inventory`, `v43-structure`, and `v44-ux`.

## Warnings and unresolved issues

- No test flakiness was recorded in the 1× run.
- Playwright emitted harmless `NO_COLOR`/`FORCE_COLOR` warnings; Git emits Windows line-ending notices.
- Workflow grep `Activity > Skilling` no longer matches `Activity > Sailing category navigation works`.
- Workflow grep `Greenwake next Woodcraft` no longer matches `Greenwake next Woodcutting unlock is level 15 Ironbark`.
- The all-tests-once gate is complete, but the future 50× workflow would omit those two renamed tests until its grep labels are corrected.
- No unresolved product/design question was introduced. `PET-001` remains an existing ledger matter outside this task.

## Diff and repository status

- Corrective/continuity diff: 8 files, 90 insertions, 73 deletions.
- Worktree: the six application/test files and two continuity documents remain modified and uncommitted.
- Application commit status: not committed, as required by this review task.
- Coordination commit status: this result, workflow state, completed initiate, and archive are committed separately.
- Push status: coordination result commit pushed normally to the current branch; no force-push.
- PR status: PR #5 remains open and unmerged.

## Prohibitions honored

- No 50× run.
- No PR merge.
- No force-push, reset, rebase, discard, or overwrite.
- No application repair commit or push.
- No new product/design assumptions.

## Exact stop and recommended next action

Stop at the verified green 1× gate. ChatGPT/Setetchie should review this result and explicitly authorize a separate workflow-grep correction before any reliable 50× stress run, then separately authorize that 50× gate. Ownership has returned to `CHATGPT`.
