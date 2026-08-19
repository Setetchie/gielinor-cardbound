# ChatGPT ↔ Codex Repository Coordination Protocol

## Purpose

This mailbox provides durable, repository-local handoffs between ChatGPT, Codex, and Setetchie. Repository state, task authority, and results must survive chat changes.

The local repository is Codex's engineering workspace for editing, dependency use, commands, focused/regression tests, debugging, and diff review. GitHub is the synchronization bridge because ChatGPT cannot directly inspect Setetchie's local Windows checkout.

The intended cycle is:

`ChatGPT → GitHub initiate task → Codex fetches/pulls safely → Codex works/tests locally → Codex writes result → Codex commits/pushes result → ChatGPT reviews → next task`

## Mandatory task-start synchronization

Before reading the mailbox or beginning any task, Codex must:

1. Confirm the current branch.
2. Run `git status` and preserve the list of existing local changes.
3. Run `git fetch` against the configured upstream.
4. Compare local/upstream divergence and the paths changed upstream.
5. Pull using fast-forward-only semantics only when upstream is ahead and integration will not overwrite or conflict with local changes. If the remote is not ahead, no pull is necessary.
6. Stop and report when histories diverge, the upstream is missing, or remote changes conflict with local work. Never automatically reset, rebase, stash, discard, overwrite, or destructively resolve unrelated work.
7. Then read `AGENTS.md`, this protocol, `WORKFLOW_STATE.md`, and `coordination/initiate/CURRENT.md`.

A mailbox task is executable only when its state is `READY`, owner is `CODEX`, and every approval gate is satisfied. When claiming it, preserve the task ID, mark the initiate envelope `IN_PROGRESS`, and update `WORKFLOW_STATE.md` before implementation mutations.

## Mailboxes

- `coordination/initiate/CURRENT.md`: the single current task envelope.
- `coordination/initiate/archive/<TASK_ID>.md`: immutable completed or superseded task envelopes.
- `coordination/results/<TASK_ID>.md`: the current structured result for a task.
- `coordination/results/archive/`: superseded result snapshots when history is needed.
- `coordination/shared/WORKFLOW_STATE.md`: concise repository, PR, validation, ownership, and next-action state.

## Identity and state

Task IDs use `CB-<AREA>-<SEQUENCE>`, for example `CB-PR5-RUN74-001`. IDs never change or get reused.

Allowed owners: `CHATGPT`, `CODEX`, `SETETCHIE`, `UNASSIGNED`.

Allowed states:

- `READY`: fully specified, not started.
- `IN_PROGRESS`: actively owned and being executed.
- `COMPLETE`: authorized scope is finished and a result exists.

The owner and approval gates are independent. `READY` does not grant Codex permission when another owner is named or a gate is unsatisfied.

## Initiate envelope

Every current task records:

- Task ID, title, state, owner, requester, created/updated timestamps.
- Repository, branch, PR, and baseline commit.
- Authority/source documents.
- Objective and allowed scope.
- Explicit exclusions/prohibitions.
- Approval gates and prerequisites.
- Required validation and deliverables.
- Exact stop and next ownership transition.

ChatGPT normally prepares or revises a `READY` envelope. Setetchie grants approval and assigns ownership. Codex claims an executable envelope by changing its state to `IN_PROGRESS` before task mutations.

## Codex result

`coordination/results/<TASK_ID>.md` must contain:

- Task ID, final state, owner, timestamps, and branch.
- Outcome summary.
- Files created, modified, deleted, or explicitly left untouched.
- Application changes.
- Test/fixture changes.
- Commands run, focused-test results, and full validation results where applicable.
- Decisions used, assumptions, unresolved issues, and product/design questions.
- Warnings, blockers, and prohibited actions honored.
- Exact stop and recommended next action/owner.
- Worktree status, commit status, push status, and PR status.

For blocked or diagnostic-only work, record the evidence and exact stop even though no implementation was made. Use `COMPLETE` when the requested diagnostic/reporting scope is complete; create a new task ID for later implementation.

## Completion and archives

When a task completes:

1. Write its structured result.
2. Update `WORKFLOW_STATE.md`.
3. Set the initiate envelope to `COMPLETE` and, unless explicitly instructed otherwise, return ownership to `CHATGPT`.
4. Copy its final content to `coordination/initiate/archive/<TASK_ID>.md`.
5. Commit authorized task output and coordination/result records. Use explicit path staging and keep application commits separate from coordination/result commits when practical.
6. Push those commits to the current GitHub branch so ChatGPT can read the result without manual copying.
7. Replace `CURRENT.md` only when a new task is deliberately issued. Never silently start the next task.

When a task is superseded, preserve its envelope and result in the relevant archive and identify the superseding task ID.

## Conflict and safety rules

- Setetchie retains product and merge authority.
- `docs/DECISION_LEDGER.md` controls product-decision precedence.
- Never infer approval, ownership transfer, merge permission, or permission to cross a validation gate.
- Do not combine unrelated implementation with a documentation-only coordination task.
- Do not store secrets or bulky generated artifacts in coordination files; link concise durable evidence instead.
- Automatic synchronization does not authorize merging, force-pushing, rebasing, resetting, discarding unrelated changes, overwriting uncommitted work, inventing product/design decisions, authorizing 50× testing, or inferring merge approval.
- If push is rejected because the remote advanced, fetch and reassess. Do not force-push or rewrite history; stop and report any overlap or divergence.
