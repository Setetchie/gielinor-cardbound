# Current Initiate Task

- **Task ID:** `CB-PR5-RUN74-001`
- **Title:** PR #5 / run #74 corrective review and 1× verification
- **State:** `READY`
- **Owner:** `CODEX`
- **Requester:** Setetchie
- **Created:** 2026-08-18
- **Updated:** 2026-08-18
- **Repository:** `Setetchie/gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **PR:** #5, unmerged
- **Baseline commit:** `c8c4985`

## Authority

Read `AGENTS.md`, `coordination/shared/PROTOCOL.md`, `coordination/shared/WORKFLOW_STATE.md`, `docs/DECISION_LEDGER.md`, `docs/V44_REVIEW_DECISIONS_AND_STAGE_BOARD.md`, `docs/v44-ux-test-contract.md`, `docs/v43-first-test-pass-baseline.md`, and the current handoff before execution.

## Objective

Review the existing uncommitted PR #5 corrective application/test diff, confirm it matches the approved run #74 root-cause repair scope, and verify that the reported green 37/37 local run constitutes the complete required 1× validation gate.

## Confirmed repair scope

- Sailing routing under Activities.
- Compact v44 Card Collection search and ownership filtering.
- Current Activities/Bank terminology in original mode.
- Scoped persistent-navigation selectors and accepted Activities-first placement.
- Current Equipped/loadout assertions.
- Current-build-compatible v43 behavioral fixture.

## Required execution

1. Follow the repository coordination protocol and claim this task by marking it `IN_PROGRESS`.
2. Inspect the existing uncommitted corrective diff before changing anything.
3. Confirm each application/test change maps to the approved run #74 diagnosis and does not introduce unrelated product behavior.
4. Verify whether the reported `37/37` local result is the complete intended 1× Cardbound validation gate.
5. If the 37/37 run is incomplete, run the missing 1× coverage.
6. If any required 1× check fails, diagnose the first/root failure, make the minimum correct fix, and restart a fresh complete 1× validation.
7. Do not weaken behavioral coverage merely to obtain green results.
8. Do not run the 50× repetition/stress gate in this task.
9. Do not merge PR #5.
10. Do not commit/push the application repair changes unless the coordination protocol or this task explicitly requires a result snapshot; preserve application work for ChatGPT/Setetchie review after the verified 1× result.

## Required result

Write `coordination/results/CB-PR5-RUN74-001.md` with:

- task status;
- branch and PR state;
- files in the corrective diff;
- application fixes reviewed;
- test/fixture changes reviewed and why they are legitimate;
- whether 37/37 is the complete 1× gate;
- focused and full 1× validation results by shard/suite where applicable;
- warnings/flakiness;
- unresolved issues or product questions;
- `git diff --stat` summary;
- worktree/commit/push state;
- exact recommended next action.

Update `coordination/shared/WORKFLOW_STATE.md`, return ownership to `CHATGPT`, commit/push the coordination result, and stop.

## Gates and prohibitions

- 50× authorization: **NO**.
- Merge permission: **NO**.
- Product/design assumptions beyond documented accepted behavior: **NO**.
- Force-push/reset/rebase/discard unrelated work: **NO**.
