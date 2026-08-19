# Cardbound Workflow State

- **Updated:** 2026-08-18
- **Repository:** `Setetchie/gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **Pull request:** #5, intentionally unmerged
- **Committed baseline:** `31062a0` (`docs: establish Cardbound decision governance for Codex`)
- **Current task ID:** `CB-PR5-WFGREP-002`
- **Current state:** `READY`
- **Current owner:** `CODEX`
- **Codex execution permission:** Granted for the workflow-selector repair task defined in `coordination/initiate/CURRENT.md`.
- **Historical CI evidence:** GitHub Actions run #74 failed `prototype-core`, `v44-ux`, `greenwake-progression`, `greenwake-terminology`, and `prototype-ui`; `v43-structure` was cancelled after its own bootstrap incompatibility and timeout.
- **Local worktree caution:** Corrective PR #5 application/test changes remain present locally and uncommitted. The current task must not modify, commit, discard, reset, rebase, or overwrite that repair diff.
- **Verified local validation evidence:** The complete local 1× gate is green at 37/37 Playwright tests in 17.4s. The corrective application/test diff hash recorded by the prior result is `22139e3be5df4fff8bb48d9438a229401f759714`.
- **Current task purpose:** Repair the two stale 50× workflow grep labels so the future stress workflow includes the renamed Sailing-routing and Woodcutting-unlock tests.
- **50× authorization:** NOT GRANTED. This task only makes the stress workflow ready for a later explicit 50× authorization.
- **Merge permission:** NO.
- **Synchronization:** GitHub is the ChatGPT ↔ Codex bridge. Every Codex task begins with branch/status/fetch and a safe fast-forward pull when needed, and ends with a structured result committed and pushed unless explicitly prohibited.
- **Last coordination result:** `coordination/results/CB-PR5-RUN74-001.md`.
- **Next action/owner:** CODEX executes `CB-PR5-WFGREP-002`, writes its result, returns ownership to CHATGPT, and stops before any 50× run.
