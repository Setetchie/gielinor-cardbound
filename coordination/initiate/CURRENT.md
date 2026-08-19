# Current Initiate Task

- **Task ID:** `CB-PR5-RUN74-001`
- **Title:** PR #5 / run #74 corrective workflow
- **State:** `READY`
- **Owner:** `CHATGPT`
- **Requester:** Setetchie
- **Created:** 2026-08-18
- **Updated:** 2026-08-18
- **Repository:** `Setetchie/gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **PR:** #5, unmerged
- **Baseline commit:** `31062a0`

## Authority

Read `AGENTS.md`, `docs/DECISION_LEDGER.md`, `docs/V44_REVIEW_DECISIONS_AND_STAGE_BOARD.md`, `docs/v44-ux-test-contract.md`, `docs/v43-first-test-pass-baseline.md`, and the current handoff before execution.

## Objective

Preserve the diagnosed PR #5/run #74 repair scope and its validation sequence as a durable task. Do not execute it until ChatGPT/Setetchie explicitly transfers ownership to `CODEX` and confirms the next gate.

## Confirmed repair scope

- Sailing routing under Activities.
- Compact v44 Card Collection search and ownership filtering.
- Current Activities/Bank terminology in original mode.
- Scoped persistent-navigation selectors and accepted Activities-first placement.
- Current Equipped/loadout assertions.
- Current-build-compatible v43 behavioral fixture.

## Current evidence and exact stop

- Run #74 is the historical failed CI run.
- An uncommitted corrective application/test diff already exists from the preceding approved Codex task.
- A complete local 1× run was reported green at 37/37 tests.
- No 50× run has occurred.
- Stop here: coordination protocol only. Do not touch the repair diff in this task.

## Gates and prohibitions

- Ownership must become `CODEX` before Codex execution.
- Setetchie must explicitly choose the next action given the existing green local 1× evidence.
- Do not merge PR #5.
- Do not run 50× without explicit approval.
- Do not change application behavior under this coordination task.

## Required future deliverable

When this task is eventually executed or deliberately closed, write `coordination/results/CB-PR5-RUN74-001.md`, update shared workflow state, and archive this envelope.
