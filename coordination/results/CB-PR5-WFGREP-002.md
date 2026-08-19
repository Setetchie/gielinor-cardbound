# Workflow Selector Repair Result

- **Task ID:** `CB-PR5-WFGREP-002`
- **Status:** `COMPLETE`
- **Owner:** `CHATGPT`
- **Completed:** 2026-08-18
- **Branch:** `agent/v44-ux-test-pass`
- **PR:** #5, open and unmerged

## Outcome

Corrected exactly the two stale regression workflow grep labels identified after the verified 37/37 1× gate. The future stress workflow now selects the renamed Sailing-routing and Woodcutting-unlock tests without broadening shard scope or removing coverage.

## Workflow file changed

- `.github/workflows/regression.yml`

## Selector changes

| Shard | Old selector | New selector |
|---|---|---|
| `prototype-core` | `app boots\|home shows\|Activity > Skilling` | `app boots\|home shows\|Activity > Sailing` |
| `greenwake-content` | `Greenwake packs\|Greenwake next Woodcraft` | `Greenwake packs\|Greenwake next Woodcutting` |

## Selection proof

The corrected `prototype-core` selector matches exactly:

- `app boots and exposes core globals`
- `home shows grouped activities including Sailing`
- `Activity > Sailing category navigation works`

The corrected `greenwake-content` selector matches exactly:

- `Greenwake packs are safe probability distributions`
- `Greenwake next Woodcutting unlock is level 15 Ironbark`

## Application and test changes

- Application changes: none.
- Test/fixture changes: none.
- Existing application/test repair diff hash remains `22139e3be5df4fff8bb48d9438a229401f759714`.

## Commands and validation

- Performed mandatory branch/status/fetch/divergence checks and safely fast-forwarded GitHub coordination commits.
- Inspected `.github/workflows/regression.yml`, the current test titles, the prior verification result, and current v43/v44 testing documents.
- Used PowerShell regex matching over the actual Playwright test titles to prove the exact selected sets above.
- Ran `git diff --check`: passed, with only informational Windows LF→CRLF notices.
- Reviewed the workflow diff: exactly two line replacements.
- Recomputed the six-file application/test repair diff hash: unchanged.
- Focused/full application tests: not run because this task changed workflow selectors only and did not alter executable application/test behavior.
- 50× stress gate: not run; authorization remains NO.

## Repository state

- Workflow commit: `17194ad` (`ci: fix renamed regression selectors`).
- Coordination claim commit: `e2cd5fe` (`docs: claim workflow selector repair`).
- Coordination completion commit: contains this result and is pushed separately after the workflow commit.
- Worktree: the pre-existing six application/test and two continuity-document modifications remain unstaged and uncommitted.
- Push status: workflow and coordination commits pushed normally; no force-push.
- PR status: PR #5 remains open and unmerged.

## Issues and questions

- Unresolved workflow-selector issues: none identified.
- Product/design questions: none introduced.
- Blockers: none. The stress workflow is selector-ready.

## Prohibitions honored

- No application behavior changed.
- No behavioral test coverage weakened or removed.
- No 50× run.
- No PR merge.
- No application/test repair commit.
- No reset, rebase, force-push, discard, or overwrite.

## Exact stop and recommended next action

Stop with the workflow selector-ready. Ownership returns to `CHATGPT`. Setetchie may explicitly authorize a new 50× stress task after reviewing this result; this completion does not itself authorize the run or merge.
