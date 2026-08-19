# Current Initiate Task

- **Task ID:** `CB-PR5-WFGREP-002`
- **Title:** Repair stale 50× workflow selectors and verify stress-gate readiness
- **State:** `READY`
- **Owner:** `CODEX`
- **Requester:** Setetchie
- **Created:** 2026-08-18
- **Updated:** 2026-08-18
- **Repository:** `Setetchie/gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **PR:** #5, unmerged

## Authority

Read `AGENTS.md`, `coordination/shared/PROTOCOL.md`, `coordination/shared/WORKFLOW_STATE.md`, `coordination/results/CB-PR5-RUN74-001.md`, and the current v43/v44 testing documentation before execution.

## Objective

Correct the two stale workflow grep labels identified after the verified green 37/37 1× gate so the future 50× stress workflow includes the intended renamed tests.

## Required execution

1. Claim this task according to the coordination protocol.
2. Inspect the workflow definitions before editing.
3. Correct only the stale selectors/grep labels corresponding to:
   - old `Activity > Skilling` versus the current Sailing-routing test name;
   - old `Greenwake next Woodcraft` versus the current Woodcutting-unlock test name.
4. Preserve the existing behavioral coverage and shard structure; do not remove tests or broaden selectors merely to force matches.
5. Confirm the corrected workflow selects the intended tests.
6. Run `git diff --check` and any lightweight selector/workflow validation needed to prove the fix.
7. Do not modify application behavior in this task.
8. Do not run the 50× stress gate yet.
9. Do not merge PR #5.
10. Do not commit/push the existing uncommitted application/test repair diff as part of this workflow-only task.

## Required result

Write `coordination/results/CB-PR5-WFGREP-002.md` containing:

- exact workflow file(s) changed;
- old and new selectors/labels;
- proof the intended tests are selected;
- validation performed;
- worktree/application-diff preservation status;
- whether the 50× gate is now ready to be authorized;
- exact recommended next action.

Update `coordination/shared/WORKFLOW_STATE.md`, return ownership to `CHATGPT`, commit/push only the workflow/coordination changes appropriate to this task, and stop.

## Gates and prohibitions

- 50× authorization: **NO**.
- Merge permission: **NO**.
- Application behavior changes: **NO**.
- Weakening/removing behavioral coverage: **NO**.
- Force-push/reset/rebase/discard unrelated work: **NO**.
