# Cardbound Testing Process Board

**Status:** Active testing-process source of truth.  
**Established:** 2026-08-18.

This board supplements `TESTING_RELEASE_MARKETING_ROADMAP.md`, the regression workflow, and version-specific test contracts. It exists so validation-process decisions are not lost in chat history.

## Locked validation sequence

Every future implementation/fix validation cycle uses this order:

1. Implement the intended change/fix.
2. Run **one complete 1× qualification pass** of the full relevant suite/gate.
3. Require **100% success** from the 1× pass.
4. If any test fails, stop. Diagnose and patch the failure, then restart with a fresh complete 1× qualification pass.
5. Only after a completely green 1× qualification pass may the **50× repetition/stress pass** run.
6. Do not run the 50× pass after a known failed 1× pass.
7. Do not weaken behavioral coverage to obtain a green result. Tests may be updated when an accepted design intentionally supersedes an old assertion, but equivalent behavioral coverage must remain.
8. Do not merge/promote a stage build until its required acceptance gate is green.

Short form: **Fix/change → 1× full clean qualification → 50× stress/acceptance → merge/promote.**

## Current v44 checkpoint

PR #5 (`agent/v44-ux-test-pass`) remains unmerged.

Last completed attempted stress gate: Run #74 / workflow run `32073559950`.

Passed shards:
- greenwake-ip
- greenwake-content
- prototype-integrity
- ip-inventory
- prototype-progression

Failed shards:
- prototype-core
- v44-ux
- greenwake-progression
- greenwake-terminology
- prototype-ui

`v43-structure` was cancelled. The final 1,500-execution acceptance gate failed.

The prior CI-fix investigation was intentionally stopped for chat migration before a corrective patch was completed. Therefore the next validation must **not** jump directly back to 50×. First patch the actual failures, then perform the new mandatory 1× qualification gate.

## Reporting standard

For each qualification/acceptance cycle, record:
- tested commit/build;
- suite/shard names;
- exact pass/fail/skipped/flaky counts;
- first actionable failure signature for failed tests;
- whether the run was 1× qualification or 50× stress/acceptance;
- whether the build is eligible to advance.
