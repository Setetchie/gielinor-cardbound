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
- Failed run #74 is the last recorded stop. No corrective complete green 1× pass is recorded.
- Failed: `prototype-core`, `v44-ux`, `greenwake-progression`, `greenwake-terminology`, `prototype-ui`; `v43-structure` was cancelled.
- Governance documentation may change without changing app behavior. The branch is not acceptance-verified or release-ready.

## Mandatory validation sequence

For corrective work: diagnose → patch → complete 1× validation → if red, fix and restart the complete 1× → only after a completely green 1×, run 50× repetition/stress validation. Any later code change resets the gate. Record command, commit, result, and evidence. Never run 50× speculatively.

## Continuity

Before incomplete/context-sensitive work changes tasks, refresh the ledger and a Markdown handoff with repository, branch, PR, commit, changes, exact stop, validation evidence, unresolved decisions, prohibitions, and one next action. Address Setetchie by name. If continuity slips—forgotten decisions, repeated questions, contradictions, lost branch/PR/test state, repetition, fragmentation, or failure to use Setetchie's name—warn Setetchie and recommend a new task using the refreshed handoff.
