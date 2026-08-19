# Current Initiate Task

- **Task ID:** `CB-PR5-PUBLISH-006`
- **Title:** Publish validated PR #5 corrective changes and verify CI
- **State:** `IN_PROGRESS`
- **Owner:** `CODEX`
- **Requester:** Setetchie
- **Created:** 2026-08-18T22:31:21-06:00
- **Updated:** 2026-08-18T22:31:21-06:00
- **Repository:** `Setetchie/gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **PR:** #5, open draft and intentionally unmerged
- **Baseline commit:** `935345757707de34017abb43f3d511f9d322ecbe`

## Authority and prerequisites

- Setetchie's explicit instruction: `Approve next PR stage`.
- Complete 1× gate: 37/37 green.
- Fresh complete 50× gate `CB-PR5-STRESS50-005`: 1,850/1,850 green with no failures, flakes, retries, skips, or hangs.
- `AGENTS.md`, shared coordination protocol/state, comprehensive handoff, Decision Ledger, and current testing authority documents.

## Objective and allowed scope

Commit the six validated corrective application/test files separately from governance/coordination documentation, push the existing PR #5 branch, and verify the resulting GitHub CI checks. Record exact commits, push state, PR head, CI result, and the next review boundary.

Validated corrective paths:

- `original-ui-v41.js`
- `v44-ux-test-pass.js`
- `tests/original.spec.js`
- `tests/smoke.spec.js`
- `tests/v43-structure.spec.js`
- `tests/v44-ux.spec.js`

Governance/coordination documentation may be committed separately where it accurately records the already-authorized local mailbox and GitHub tester-hosting workflow. Stage explicit paths only.

## Exclusions and prohibitions

- Do not merge PR #5 or mark it ready for review.
- Do not publish or update the tester-visible GitHub app.
- Do not include `node_modules`, logs, `test-results`, validation artifacts, or unrelated untracked files.
- Do not reset, rebase, stash, discard, overwrite, force-push, weaken tests, or alter application/test behavior beyond the already validated corrective diff.
- If CI fails, diagnose and report; do not patch without a new authorized scope.

## Required validation and deliverables

- Preserve the exact validated six-file corrective diff.
- Commit the corrective diff with explicit staging.
- Commit approved governance/coordination records separately with explicit staging.
- Push `agent/v44-ux-test-pass` normally, never force-push.
- Verify PR #5 head and all resulting GitHub checks.
- Write `coordination/results/CB-PR5-PUBLISH-006.md`, update shared workflow state, archive this envelope, and return ownership to `CHATGPT`.

## Exact stop

Stop after the pushed PR head's GitHub checks reach a terminal result and the local handoff records that result. Report the next review action without merging, changing draft status, or publishing the tester app.
