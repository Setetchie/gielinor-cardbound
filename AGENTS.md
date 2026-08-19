# AGENTS.md

## Authority

Setetchie retains product authority. Repository documentation, not chat memory, is the durable source of truth. Before changing product behavior, read `docs/DECISION_LEDGER.md` and the relevant design, system, testing, and architecture documents it identifies.

When sources conflict, follow the ledger precedence. A newer explicitly accepted decision supersedes conflicting older text, which remains historical evidence. Do not change application behavior merely because an older document conflicts with a newer accepted decision.

## Decision discipline

Use the ledger statuses exactly: `CURRENT`, `SUPERSEDED`, `OPEN`, `BALANCE`, `FUTURE`, and `REJECTED`.

- Implement only `CURRENT` decisions within approved scope.
- Never silently finalize `OPEN`, `BALANCE`, or `FUTURE` matters. Return ambiguity to Setetchie in ChatGPT and record it in the ledger.
- Preserve accepted regression behavior and `localStorage.cardbound` compatibility unless explicitly changed.
- Treat code/tests as implementation evidence, not product authority. Never weaken tests merely to obtain green; change stale assertions only for accepted behavior while preserving equivalent coverage.
- Never merge a PR without Setetchie's explicit approval.

## Current engineering stop point

- Branch `agent/v44-ux-test-pass`; PR #5 remains intentionally unmerged.
- Failed run #74 is the historical CI stop: `prototype-core`, `v44-ux`, `greenwake-progression`, `greenwake-terminology`, and `prototype-ui` failed; `v43-structure` was cancelled after an independent bootstrap incompatibility and timeout.
- An uncommitted corrective application/test diff from the preceding task is present, with a reported complete local 1× result of 37/37 green. The 50× gate has not run.
- Current mailbox task `CB-PR5-RUN74-001` is `READY` and owned by `CHATGPT`; Codex must not extend, validate further, commit, discard, or merge that repair until ownership and the next gate are explicitly assigned.
- Governance documentation may change without changing app behavior. The branch is not acceptance-verified or release-ready until the remaining approved gates and review are complete.

## Mandatory validation sequence

For corrective work: diagnose → patch → complete 1× validation → if red, fix and restart the complete 1× → only after a completely green 1×, run 50× repetition/stress validation. Any later code change resets the gate. Record command, commit, result, and evidence. Never run 50× speculatively.

## Continuity

Before incomplete/context-sensitive work changes tasks, refresh the ledger and a Markdown handoff with repository, branch, PR, commit, changes, exact stop, validation evidence, unresolved decisions, prohibitions, and one next action. Address Setetchie by name. If continuity slips—forgotten decisions, repeated questions, contradictions, lost branch/PR/test state, repetition, fragmentation, or failure to use Setetchie's name—warn Setetchie and recommend a new task using the refreshed handoff.

## Persistent ChatGPT ↔ Codex coordination mailbox

Repository mailbox files in `C:\Studio_Dev\gielinor-cardbound\coordination` are the durable coordination authority and the shared local checkout is the synchronization bridge between ChatGPT and Codex. Both assistants can read and write this directory directly. GitHub remains the source-control, PR, and CI remote, but it is not required to transfer handoffs. At the beginning of every Codex task in this repository, before planning, editing, testing, or committing:

The playable testing app remains GitHub-hosted so Setetchie and outside testers can use a shared URL. Any task whose deliverable is a new or updated tester-visible build must explicitly authorize the required commit/push or deployment action and must record the published branch/build, deployment result, visible version, and test URL. Local files are not a substitute for publishing a tester build.

1. Confirm the current branch and run `git status`.
2. Read the shared local mailbox directly; do not fetch or pull merely to exchange a task or result between ChatGPT and Codex.
3. Fetch or pull the configured upstream only when the assigned work needs current remote branch, PR, or CI state. Before integrating upstream changes, compare divergence and changed paths. Fast-forward only when it cannot overwrite or conflict with local work; otherwise stop and report instead of resetting, rebasing, stashing, discarding, or auto-resolving.
4. Read `AGENTS.md`, `coordination/shared/PROTOCOL.md`, `coordination/shared/WORKFLOW_STATE.md`, and `coordination/initiate/CURRENT.md` completely when the latter exists.
5. Reconcile the task ID, state, owner, approval gates, allowed scope, prohibitions, and repository state with the user's current instruction. The user's latest explicit instruction from Setetchie may create/update a mailbox task, but do not otherwise infer an ownership transfer or approval.

Task state is exactly `READY`, `IN_PROGRESS`, or `COMPLETE`. Ownership is exactly `CHATGPT`, `CODEX`, `SETETCHIE`, or `UNASSIGNED`.

- `READY`: specified but not begun. Codex may claim it only when owner is `CODEX` and all approval gates are satisfied.
- `IN_PROGRESS`: claimed by the named owner. Before making task changes, Codex must update the initiate file and shared workflow state to `IN_PROGRESS`, retaining the same task ID.
- `COMPLETE`: all authorized work and required validation are finished, or the requested diagnostic/reporting stop has been reached. Completion requires a structured result file.
- A task owned by `CHATGPT`, `SETETCHIE`, or `UNASSIGNED` is not executable by Codex. Report the ownership gate and do not begin it.
- If chat and mailbox conflict, stop mutating, preserve evidence, address Setetchie by name, and request reconciliation. Product authority still follows the decision ledger.

Every Codex task, including documentation-only, diagnostic, blocked, or no-op tasks, must write or update `coordination/results/<TASK_ID>.md` before its final response. Use the result structure defined by the protocol. Update `coordination/shared/WORKFLOW_STATE.md` with the exact stop, validation evidence, and next owner/action.

After completing the result and workflow state, save them in the shared local directory so ChatGPT can read them immediately. Commit and push authorized task output only when the task or Setetchie explicitly requires it; a local handoff never requires a GitHub push. Keep application commits separate from coordination/result commits when practical. Stage explicit paths so unrelated work is never included. Ordinary synchronization never authorizes merge, force-push, rebase, reset, destructive conflict resolution, 50× testing, or a product decision. Unless explicitly instructed otherwise, return task ownership to `CHATGPT` on completion.

On `COMPLETE`, archive the final initiate record at `coordination/initiate/archive/<TASK_ID>.md`. Results remain at their stable path and may be snapshotted under `coordination/results/archive/` only when superseded. Never overwrite history for a different task ID. Do not put secrets, raw credentials, or large generated logs in the mailbox.
