# AGENTS.md

## Purpose

This repository is developed with Codex, but product authority remains with Setetchie. Read this file before changing the repository, then consult `docs/DECISION_LEDGER.md` for the canonical decision state.

## Source-of-truth precedence

When sources disagree, use this order:

1. Setetchie's latest explicit instruction for the current task.
2. A `Current` decision in `docs/DECISION_LEDGER.md`.
3. An accepted decision in `docs/ARCHITECTURE_DECISIONS.md` that the ledger has not marked `Superseded`.
4. The newest continuity/handoff record whose claims do not conflict with items 1-3.
5. Current code, tests, and `README.md` as evidence of implementation state, not automatic product authority.
6. Older chats, extracts, notes, and historical documents as context only.

Do not silently resolve a conflict. Record it as `Open` in the ledger and ask Setetchie before implementing a product choice.

## Decision statuses

Every durable product or architecture decision must use exactly one status:

- **Current** — authoritative and safe to implement.
- **Superseded** — historical only; retain a pointer to the replacing decision and do not implement it.
- **Open** — unresolved; do not choose an outcome or implement behavior that depends on it without Setetchie's approval.

Never delete superseded decisions merely to make the documents appear consistent. Preserve the decision chain.

## Current stop point: PR #5

- Active branch: `agent/v44-ux-test-pass`
- Active pull request: PR #5, “v44 consolidated UX and systems test pass”
- PR #5 is the unmerged test build and must remain unmerged unless Setetchie gives a separate, explicit merge instruction.
- The last recorded validation stop is failed run #74. No corrective complete 1× pass has been recorded.
- Continue from the failure-remediation step. Do not treat the current branch as acceptance-verified or release-ready.
- Documentation-only migration work may be committed to this branch, but it must not alter app behavior.

## Mandatory validation sequence

For any corrective implementation on PR #5:

1. Identify and fix the known failures.
2. Run the complete validation suite once at **1×**.
3. Require the entire 1× run to pass. Partial success, selective reruns, or an interrupted run do not count.
4. Only after that complete green 1× result may a **50×** validation run begin.
5. If the 1× run fails, stop, fix the failures, and restart at step 2.
6. If code changes after the green 1× result, the gate resets and a new complete green 1× run is required before 50×.

Record the command, commit, result, and evidence link or artifact in the current handoff and decision ledger. Never run 50× speculatively.

## Change discipline

- Preserve `localStorage.cardbound` compatibility unless an explicit migration is approved.
- Follow the active runtime ownership and cleanup rules in `README.md`.
- Do not add another versioned render-wrapper layer when an existing owner module should be edited.
- Keep product-decision documentation separate from implementation evidence.
- Do not merge PR #5 as part of routine implementation, validation, cleanup, or documentation work.

## Continuity and handoff

Before ending a task that is incomplete, at risk of losing context, or moving to a new chat/task:

1. Update `docs/DECISION_LEDGER.md` for every decision learned, changed, superseded, or left open.
2. Create or refresh a concise Markdown handoff that states:
   - repository, branch, PR, and latest commit;
   - completed work and files changed;
   - exact current stop point;
   - validation commands/results and whether the 1× gate is green;
   - unresolved decisions and blockers;
   - the single next recommended action;
   - explicit prohibitions, especially “do not merge PR #5” and “do not run 50× before a complete green 1×.”
3. Address Setetchie by name in user-facing progress and handoff responses.
4. If responses stop using Setetchie's name, repeat prior conclusions, lose the exact stop point, or become noticeably delayed/fragmented, warn Setetchie that continuity is slipping and recommend starting a new task with the refreshed Markdown handoff.
5. Never claim continuity from memory when the repository records are missing or contradictory. State the uncertainty and reconcile it first.
