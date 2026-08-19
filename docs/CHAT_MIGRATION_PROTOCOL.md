# Chat Migration Protocol

**Status: Active project continuity protocol.**

This protocol applies to every ChatGPT project chat used to continue development of the Cardbound project.

## Purpose

Long project conversations can eventually become cumbersome to navigate and can increase the risk that older decisions, implementation state, or open work are missed. Project chats should migrate proactively rather than waiting for continuity to degrade.

## Migration trigger

The active assistant should monitor the practical health of the conversation. There is no requirement for an exact token/context percentage. Recommend migration when one or more of the following becomes noticeable:

- the thread has become unusually large or slow to work with;
- maintaining current project state requires repeated retrieval/reconciliation of old chat material;
- there is increasing risk of overlooking older decisions or contradicting established project state;
- the conversation contains enough completed and pending work that a clean handoff would materially improve reliability;
- tool/repository state has advanced far enough that the current chat contains substantial stale intermediate context.

Do **not** wait until continuity has already failed. Prefer an early warning.

## Required warning

When migration is advisable, tell the user clearly that **chat migration is recommended** and that a fresh project chat would be safer/more efficient.

## Before migration

Before asking the user to move, prepare or update a Markdown handoff document. The handoff should be based on current repository/tool state, not memory alone.

At minimum include:

1. Project/game identity and repository.
2. Current development stage/milestone.
3. Current app/build/version and test link/state where applicable.
4. Latest relevant branch/commit/PR state.
5. Completed work.
6. Work currently in progress.
7. Exact next actions.
8. Current testing status.
9. Known bugs/regressions.
10. Current UI/UX Review Board items and whether they are proposals, accepted, rejected, deferred, or implemented.
11. Accepted architecture/game-design decisions relevant to upcoming work.
12. Open design/balance questions that must not be silently finalized.
13. World/Visual/Audio Bible status.
14. Testing/release/marketing roadmap status where relevant.
15. Important source-of-truth project documents and which newer documents supersede stale prototype decisions.
16. Any active automations/tasks that matter to continuity.
17. Instructions for validating repository state before making new changes.
18. Whether the GitHub-hosted testing app needs publication, its current URL/build/version, and whether phone/external-tester access was verified.

Avoid copying obsolete chat discussion merely for completeness. Prefer the current accepted state and explicitly flag known stale/conflicting documentation.

## New-chat startup instructions

Every handoff Markdown file must tell the next chat to:

1. Read the handoff first.
2. Check the shared local repository and coordination mailbox at `C:\Studio_Dev\gielinor-cardbound` before assuming the handoff is still current; do not require a GitHub pull solely for handoff synchronization.
3. Use repository source-of-truth documents for accepted project decisions.
4. Continue the current milestone rather than restarting design from scratch.
5. Preserve the distinction between bugs, review proposals, accepted decisions, open balance questions, and later creative milestones.
6. Continue monitoring conversation health using this Chat Migration Protocol.
7. When the new chat itself becomes large/slow/risky, warn the user and create/update the next handoff Markdown file before migration.

This final requirement makes the protocol self-perpetuating across future project chats.

## Coordination versus tester hosting

Use `C:\Studio_Dev\gielinor-cardbound` and its `coordination` mailbox for ChatGPT ↔ Codex task handoffs. Keep the playable testing app hosted through GitHub for Setetchie and future external testers. A handoff must distinguish local completion from a published test build; publishing requires explicit task authorization plus a recorded commit, deployment result, visible version/build, test URL, and access check.

## Source-of-truth references

At the time this protocol was created, important planning sources include:

- `docs/DESIGN_PROPOSAL_BOARD.md`
- `docs/TESTING_RELEASE_MARKETING_ROADMAP.md`
- `docs/WORLD_BIBLE.md` (may contain older prototype decisions; reconcile against newer accepted design documentation)
- architecture/progress documentation present in the repository at migration time

The migration chat must inspect the latest repository rather than assuming this list remains exhaustive.

## Current review rule

During the current v42 product-owner UI/UX review, subjective design feedback is accumulated for a later explicitly approved implementation pass. Functional bugs may be handled separately. Future handoffs must preserve the current review rule until the project explicitly changes stages.
