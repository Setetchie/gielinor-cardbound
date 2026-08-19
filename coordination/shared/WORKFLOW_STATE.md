# Cardbound Workflow State

- **Updated:** 2026-08-18
- **Repository:** `Setetchie/gielinor-cardbound`
- **Branch:** `agent/v44-ux-test-pass`
- **Pull request:** #5, intentionally unmerged
- **Committed baseline:** `31062a0` (`docs: establish Cardbound decision governance for Codex`)
- **Current task ID:** `CB-PR5-RUN74-001`
- **Current state:** `COMPLETE`
- **Current owner:** `CHATGPT`
- **Codex execution permission:** Task complete; no further execution permission is implied.
- **Historical CI evidence:** GitHub Actions run #74 failed `prototype-core`, `v44-ux`, `greenwake-progression`, `greenwake-terminology`, and `prototype-ui`; `v43-structure` was cancelled after its own bootstrap incompatibility and timeout.
- **Local worktree caution:** Corrective PR #5 application/test changes from the preceding task are present but uncommitted. This coordination task must not alter, validate further, commit, discard, or merge them.
- **Recorded local validation evidence:** A complete local 1× run previously reported 37/37 tests green. The 50× gate has not run.
- **Prohibitions:** Do not merge PR #5. Do not run 50×. Do not commit/push application repair changes in this review task.
- **Synchronization:** GitHub is the ChatGPT ↔ Codex bridge. Every Codex task begins with branch/status/fetch and a safe fast-forward pull when needed, and ends with a structured result committed and pushed unless explicitly prohibited.
- **Verified repair evidence:** The six-file application/test corrective diff has hash `22139e3be5df4fff8bb48d9438a229401f759714` and maps to the approved run #74 scope. The prior all-tests-once run covered all 37 Playwright tests and passed 37/37 in 17.4s; it is the complete 1× gate.
- **Workflow warning:** The future stress workflow has stale grep labels `Activity > Skilling` and `Greenwake next Woodcraft`, which omit the renamed Sailing-routing and Woodcutting-unlock tests. Correct them before relying on the 50× workflow, under a separately authorized task.
- **Last coordination result:** `coordination/results/CB-PR5-RUN74-001.md`.
- **Next action/owner:** ChatGPT/Setetchie reviews the verified repair and decides whether to authorize a separate workflow-grep correction and/or the 50× stress gate. No 50× or merge is authorized.
